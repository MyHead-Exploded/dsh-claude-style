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
 * `left` — are written here instead.
 *
 * The bounds and the state machine are Claude's own, read out of its shipped
 * bundle (Claude Desktop 2.42304.0: `shared-common-mcp-msg-2` for the numbers,
 * `shared-19` for the gesture) and then confirmed frame by frame against the
 * running app:
 *
 * - the floor is 200 (`MIN`), the constant ceiling 420 (`MAX`), and the ceiling
 *   that holds in practice keeps 330px for the content column:
 *   `clamp(⌊innerWidth⌋ − 330, 200, 420)`;
 * - a drag past the floor's half — 100px — folds the column on the spot, with
 *   the button still down, and a drag back over that line brings it out again;
 *   one anchor serves the whole gesture, so the width resumes at the floor and
 *   only follows once the candidate passes it;
 * - a release within 3px of the pointerdown is a press on the collapse toggle,
 *   not a resize;
 * - nothing eases the follow. Measured against the running app the column's
 *   width matches the pointer position to 0.54px rms, and a release never
 *   jumps.
 *
 * The host re-renders the column from the store it never hears this gesture
 * through, hence `sync`: a pass that reads the store's number back corrects it.
 */

/** The narrowest the column may be dragged, which is also the fold line's own datum. */
const MIN_WIDTH = 200
/** The widest, on a wide enough viewport. */
const MAX_WIDTH = 420
/** The content column's reserve: the ceiling leaves this much of the window to it. */
const VIEWPORT_RESERVE = 330
/**
 * How far the pointer travels before a release counts as a resize rather than a
 * press on the toggle. It decides only that, the way Claude's own `aj` leaves
 * the geometry alone: the width answers the pointer from the first move on.
 */
const DRAG_DEAD_ZONE = 3
/** Where a drag folds the column: half the floor, read against the candidate width. */
const FOLD_WIDTH = MIN_WIDTH / 2
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

/** The widest the column may stand on this viewport. */
function ceiling() {
  return Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, Math.floor(window.innerWidth) - VIEWPORT_RESERVE))
}

export function install(ctx: HostContext, ui: FeatureUi<typeof manifest>) {
  let frame: HTMLElement | null = null
  let root: HTMLElement | null = null
  let handle: HTMLElement | null = null
  let observer: MutationObserver | null = null
  /** The width the reader last chose; the host forgets it at every fold. */
  let width = MIN_WIDTH
  /** The width the pointer has asked for, waiting for the pass that writes it. */
  let pending: number | null = null
  /** Whether the pointer travelled past the dead zone, so a release resizes rather than folds. */
  let moved = false
  /** Whether the column stands folded right now, so the width write stands down. */
  let folded = false
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
    moved = false
    folded = false
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
    window.removeEventListener(MOVE_EVENT, onPointerMove as EventListener, true)
    window.removeEventListener('pointerup', onPointerUp, true)
    window.removeEventListener('pointercancel', stopGesture, true)
  }

  /**
   * Press the host's collapse toggle once: the column folds, or comes back out
   * of the fold. The rail's geometry, its travel and its handle are the host's;
   * the width to return to is this one's own, held across the fold.
   */
  function pressToggle() {
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
    moved = false
    folded = false
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
    // The dead zone decides what a release means and nothing else.
    if (Math.abs(event.clientX - startX) > DRAG_DEAD_ZONE) moved = true
    // One anchor for the whole gesture: the candidate is the width at
    // pointerdown plus the pointer's travel, so a fold and the return out of it
    // never re-base the follow.
    const candidate = Math.round(startWidth + (event.clientX - startX))
    const nowFolded = candidate < FOLD_WIDTH
    if (nowFolded !== folded) {
      folded = nowFolded
      pressToggle()
    }
    // Folded, the column's geometry belongs to the host's rail: writing a width
    // here would fight the layout that just replaced it.
    if (!folded) want(Math.min(ceiling(), Math.max(MIN_WIDTH, candidate)))
  }

  function onPointerUp(event: PointerEvent) {
    if (!dragging || event.pointerId !== pointerId) return
    const pressed = !moved
    stopGesture()
    // A press rather than a resize: the handle doubles as the collapse toggle,
    // which is the affordance Claude's own handle carries.
    if (pressed) pressToggle()
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
    frame = null
    root = null
    handle = null
    delete ui.sidebarWidth
  }
}
