import { SIDEBAR_RESIZE_HANDLE_SELECTOR } from '@dsh-claude-style/contracts/dom'
import { findSidebarRoot, findSidebarToggle } from '@dsh-claude-style/engine/host'
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
/** The width a drag lets go at, folding the column instead of narrowing it. */
const COLLAPSE_BELOW = 100

/** The frame the host lays the three columns out in; its inline grid carries the width. */
const FRAME_SELECTOR = `[${PART_ATTR}~="layout-frame"]`
/** The host's mark on a folded frame, whose geometry is the host's own. */
const COLLAPSED_ATTRIBUTE = 'data-sidebar-collapsed'
/** The skin's mark while the skin owns the gesture (sidebar-width.css). */
const DRAGGING_ATTRIBUTE = 'data-dsh-claude-sidebar-dragging'

export function install(ctx: HostContext, ui: FeatureUi<typeof manifest>) {
  let frame: HTMLElement | null = null
  let root: HTMLElement | null = null
  let handle: HTMLElement | null = null
  let observer: MutationObserver | null = null
  /** The width the reader last chose; the host forgets it at every fold. */
  let width = MIN_WIDTH
  let dragging = false
  let pointerId = -1
  let startX = 0
  let startWidth = 0
  let disposed = false

  /**
   * The frame's own grid with its first track set: the host's other two tracks
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
    if (frame.hasAttribute(COLLAPSED_ATTRIBUTE)) return
    // The host unmounts the handle while the column is folded and mounts a new
    // one on the way out, so the seat is re-read whenever this one is gone.
    if (handle === null || !handle.isConnected) handle = frame.querySelector<HTMLElement>(SIDEBAR_RESIZE_HANDLE_SELECTOR)
    const wanted = `${width}px`
    if (root.style.width !== wanted || trackWidth() !== wanted) writeWidth(width)
    else if (handle !== null && handle.style.left !== wanted) handle.style.left = wanted
  }

  function stopGesture() {
    dragging = false
    pointerId = -1
    frame?.removeAttribute(DRAGGING_ATTRIBUTE)
    window.removeEventListener('pointermove', onPointerMove, true)
    window.removeEventListener('pointerup', stopGesture, true)
    window.removeEventListener('pointercancel', stopGesture, true)
  }

  /** Fold the column: the host's toggle is pressed, and its own rail animation runs. */
  function fold() {
    findSidebarToggle()?.click()
  }

  function onPointerDown(event: PointerEvent) {
    const target = event.target
    if (dragging || frame === null || root === null) return
    if (!(target instanceof Element) || target.closest(SIDEBAR_RESIZE_HANDLE_SELECTOR) === null) return
    // The host's own handler must not see this: it clamps to its store's floor
    // and writes the same three places, and two writers would fight over them.
    event.stopImmediatePropagation()
    event.preventDefault()
    dragging = true
    pointerId = event.pointerId
    startX = event.clientX
    startWidth = root.getBoundingClientRect().width
    frame.setAttribute(DRAGGING_ATTRIBUTE, '')
    window.addEventListener('pointermove', onPointerMove, true)
    window.addEventListener('pointerup', stopGesture, true)
    window.addEventListener('pointercancel', stopGesture, true)
  }

  function onPointerMove(event: PointerEvent) {
    if (!dragging || event.pointerId !== pointerId) return
    event.stopImmediatePropagation()
    event.preventDefault()
    const reached = Math.round(startWidth + (event.clientX - startX))
    if (reached < COLLAPSE_BELOW) {
      stopGesture()
      fold()
      return
    }
    width = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, reached))
    writeWidth(width)
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
