import { SIDEBAR_RESIZE_HANDLE_SELECTOR } from '@dsh-claude-style/contracts/dom'
import { cacheFirstMatch, findSidebarRoot, findSidebarToggle } from '@dsh-claude-style/engine/host'
import { PART_ATTR } from '../../constants'
import type { HostContext } from '@dsh-claude-style/engine/host'
import type { FeatureUi } from '../../core/feature'
import type manifest from './sidebar-width.manifest'

/**
 * The sidebar column's width, taken over from the host's drag (D43).
 *
 * The host keeps the column between its own 264px and 420px in the layout
 * store (`setSidebar` → `clampWidth(px, 264, 420)`, re-clamped by
 * `computeColumns`), and no rule carries either bound: `min-width` and
 * `max-width` stay 0 and none on both the frame's column and the panel. A
 * stylesheet can therefore only paint the column narrower than the store's
 * number — the grid track keeps the store's width and the handle keeps its
 * `left`, which leaves a strip of frame surface and a handle standing where the
 * column's edge no longer is.
 *
 * So the gesture is taken over whole: the pointerdown is stopped before the
 * host's own handler sees it, and the three places the host writes per frame —
 * the frame's first grid track, the root's inline width, the handle's inline
 * `left` — are written here instead. A drag below the collapse width lets go
 * and presses the host's toggle, so the rail keeps its own animation.
 *
 * The host re-renders the column from the store it never hears this gesture
 * through, hence `sync`: a pass that reads the store's number back corrects it.
 */

/** The narrowest the column may be dragged, against the host's own 264. */
const MIN_WIDTH = 215
/** The widest, which is the host's own ceiling. */
const MAX_WIDTH = 420
/**
 * How far past the floor the pointer goes before the release folds the column.
 * Measured from the floor rather than as a width of its own: the column stands
 * still at the floor while the pointer travels, so a width threshold deep below
 * it asks the reader to drag a stretch that shows no sign of being read.
 */
/** How far past the floor the column dims: the throw is about to fold it. */
const DIM_OVERDRAG = 90
/** How far past the floor the fold lands, the pointer still being down. */
const FOLD_OVERDRAG = 100
/** How far right of the window's own left edge a folded column comes back out. */
const REOPEN_X = 110
/** The freshest pointer positions the browser offers, one per input report. */
const MOVE_EVENT: 'pointerrawupdate' | 'pointermove' =
  'onpointerrawupdate' in window ? 'pointerrawupdate' : 'pointermove'

/** The frame the host lays the three columns out in; its inline grid carries the width. */
const FRAME_SELECTOR = `[${PART_ATTR}~="layout-frame"]`
/** The host's mark on a folded frame, whose geometry is the host's own. */
const COLLAPSED_ATTRIBUTE = 'data-sidebar-collapsed'
/** The skin's mark while the skin owns the gesture (sidebar-width.css). */
const DRAGGING_ATTRIBUTE = 'data-dsh-claude-sidebar-dragging'
/**
 * The collapse toggle wherever the shell keeps it. The caption-strip shells fix
 * it out of the top row's own cell, where the sidebar contract names it, so the
 * seat falls back to the part alone; a fold that cannot press it is no fold.
 */
const findAnyToggle = cacheFirstMatch<HTMLButtonElement>('[data-dsh-claude-part~="sidebar-toggle"]')
/** The skin's mark while a release would fold the column instead of keeping it. */
const FOLDING_ATTRIBUTE = 'data-dsh-claude-sidebar-folding'

export function install(ctx: HostContext, ui: FeatureUi<typeof manifest>) {
  let frame: HTMLElement | null = null
  let root: HTMLElement | null = null
  let handle: HTMLElement | null = null
  let observer: MutationObserver | null = null
  /** The width the reader last chose; the host forgets it at every fold. */
  let width = MIN_WIDTH
  /** The width the pointer has asked for, waiting for the pass that writes it. */
  let pending: number | null = null
  /** Whether the pointer stands past the floor right now, so the release folds the column. */
  /** Whether the throw has folded the column while the pointer stays down. */
  let foldedHeld = false
  /** Whether the column is dimmed right now. */
  let dimmed = false
  let dragging = false
  let pointerId = -1
  let startX = 0
  let startWidth = 0
  let disposed = false

  /**
   * The pointer's own width, held until the pass writes it.
   *
   * A drag re-lays the whole shell out — the middle column re-wraps to its new
   * width — and the page has other readers of that layout. Writing here, in the
   * pointer's own turn, puts this write in front of the next pass's measures and
   * each of those reads then forces the layout to settle; the frame pays for it
   * twice. Held to the pass, the reads happen first and the shell lays out once
   * (D40). Moves that land on the width already asked for cost nothing, which
   * is what the last stretch of a drag through the clamped end is made of.
   */
  function want(next: number) {
    if (next === width) return
    width = next
    writeWidth(next)
  }

  /** The frame's own grid with its first track set: the host's other two tracks
   * are carried over as they stand, so a column at its right edge, or one the
   * reader docked, keeps its own width and its `minmax(0px, 1fr)` middle.
   */
  function grid(first: number) {
    const rest = (frame?.style.gridTemplateColumns ?? '').replace(/^\s*\S+\s*/, '')
    return `${first}px ${rest === '' ? 'minmax(0px, 1fr) minmax(0px, 0px)' : rest}`
  }

  function writeWidth(next: number) {
    if (frame === null || root === null) return
    frame.style.gridTemplateColumns = grid(next)
    root.style.width = `${next}px`
    if (handle !== null) handle.style.left = `${next}px`
  }

  /** The box the gesture needs, found once and re-found when the shell replaces it. */
  function attach() {
    const nextRoot = findSidebarRoot()
    const nextFrame = nextRoot === null ? null : nextRoot.closest<HTMLElement>(FRAME_SELECTOR)
    if (nextFrame === null || nextRoot === null) return
    frame = nextFrame
    root = nextRoot
    handle = frame.querySelector<HTMLElement>(SIDEBAR_RESIZE_HANDLE_SELECTOR)
    observer?.disconnect()
    observer = new MutationObserver(sync)
    observer.observe(frame, { attributes: true, attributeFilter: ['style', COLLAPSED_ATTRIBUTE] })
    observer.observe(root, { attributes: true, attributeFilter: ['style'] })
    writeWidth(width)
  }

  /** The frame's own first grid track, which is the column's width as laid out. */
  function trackWidth() {
    const track = /^\s*(\S+)/.exec(frame?.style.gridTemplateColumns ?? '')
    return track === null ? '' : track[1]
  }

  /**
   * The reader's own width, put back on a page that renders the host's.
   *
   * Both places the host lays the column out from are compared: the root's
   * inline width, and the frame's first grid track. The host recomputes that
   * track from its own store on anything that moves the columns — opening the
   * right sidebar writes the store's number back while the root keeps this
   * one's, which would leave the track wider than the panel it holds.
   *
   * The folded rail is left alone: its 56px track, its cleared inline width and
   * its unmounted handle are the host's, and the width to come back to is held
   * across the fold. A write of this one's own reaches here too and stops at
   * the comparison.
   */
  function sync() {
    if (disposed) return
    if (frame === null || !frame.isConnected || root === null || !root.isConnected) attach()
    if (frame === null || root === null) return
    if (frame.hasAttribute(COLLAPSED_ATTRIBUTE)) {
      pending = null
      return
    }
    // The host unmounts the handle while the column is folded and mounts a new
    // one on the way out, so the seat is re-read whenever this one is gone.
    if (handle === null || !handle.isConnected) handle = frame.querySelector<HTMLElement>(SIDEBAR_RESIZE_HANDLE_SELECTOR)
    if (pending !== null) {
      const asked = pending
      pending = null
      writeWidth(asked)
      return
    }
    const wanted = `${width}px`
    if (root.style.width !== wanted || trackWidth() !== wanted) writeWidth(width)
    else if (handle !== null && handle.style.left !== wanted) handle.style.left = wanted
  }

  function stopGesture() {
    foldedHeld = false
    dimmed = false
    dragging = false
    pointerId = -1
    // The last move is written now: a pass may not come for a pointer that has
    // stopped, and the column must not rest a frame short of where it was left.
    if (pending !== null) {
      const asked = pending
      pending = null
      writeWidth(asked)
    }
    frame?.removeAttribute(DRAGGING_ATTRIBUTE)
    frame?.removeAttribute(FOLDING_ATTRIBUTE)
    window.removeEventListener(MOVE_EVENT, onPointerMove as EventListener, true)
    window.removeEventListener('pointerup', onPointerUp, true)
    window.removeEventListener('pointercancel', stopGesture, true)
  }

  /** Fold the column: the host's toggle is pressed, and its own rail animation runs. */
  function fold() {
    (findSidebarToggle() ?? findAnyToggle())?.click()
  }

  function onPointerDown(event: PointerEvent) {
    const target = event.target
    if (dragging || frame === null || root === null) return
    if (!(target instanceof Element)) return
    const grabbed = target.closest<HTMLElement>(SIDEBAR_RESIZE_HANDLE_SELECTOR)
    if (grabbed === null) return
    // The host's own handler must not see this: it clamps to its store's floor
    // and writes the same three places, and two writers would fight over them.
    event.stopImmediatePropagation()
    event.preventDefault()
    dragging = true
    // The pointer is held by the handle for the rest of the gesture, so a drag
    // that outruns the column — or leaves the window — keeps arriving here.
    grabbed.setPointerCapture?.(event.pointerId)
    pointerId = event.pointerId
    startX = event.clientX
    startWidth = root.getBoundingClientRect().width
    frame.setAttribute(DRAGGING_ATTRIBUTE, '')
    window.addEventListener(MOVE_EVENT, onPointerMove as EventListener, true)
    window.addEventListener('pointerup', onPointerUp, true)
    window.addEventListener('pointercancel', stopGesture, true)
  }

  function onPointerMove(event: PointerEvent) {
    if (!dragging || event.pointerId !== pointerId) return
    event.stopImmediatePropagation()
    event.preventDefault()
    // Folded by the throw while the button is still down: dragging back out of
    // the window's own edge brings the column back, and the drag carries on.
    if (foldedHeld) {
      if (event.clientX > REOPEN_X) reopen(event.clientX)
      return
    }
    const reached = Math.round(startWidth + (event.clientX - startX))
    const past = MIN_WIDTH - reached
    if (past >= FOLD_OVERDRAG) {
      foldedHeld = true
      dimmed = true
      frame?.setAttribute(FOLDING_ATTRIBUTE, '')
      want(MIN_WIDTH)
      fold()
      return
    }
    // The dim goes up just before the fold, so the throw reads as one move.
    const dimming = past >= DIM_OVERDRAG
    if (dimming !== dimmed) {
      dimmed = dimming
      if (dimming) frame?.setAttribute(FOLDING_ATTRIBUTE, '')
      else frame?.removeAttribute(FOLDING_ATTRIBUTE)
    }
    want(Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, reached)))
  }

  /** Out of the fold: the toggle is pressed again and the drag resumes at the floor. */
  function reopen(at: number) {
    foldedHeld = false
    dimmed = false
    frame?.removeAttribute(FOLDING_ATTRIBUTE)
    fold()
    startX = at
    startWidth = MIN_WIDTH
  }

  function onPointerUp(event: PointerEvent) {
    if (!dragging || event.pointerId !== pointerId) return
    stopGesture()
  }

  window.addEventListener('pointerdown', onPointerDown, true)
  ui.sidebarWidth = { sync }

  return () => {
    disposed = true
    stopGesture()
    observer?.disconnect()
    observer = null
    window.removeEventListener('pointerdown', onPointerDown, true)
    frame?.removeAttribute(DRAGGING_ATTRIBUTE)
    frame?.removeAttribute(FOLDING_ATTRIBUTE)
    frame = null
    root = null
    handle = null
    delete ui.sidebarWidth
  }
}
