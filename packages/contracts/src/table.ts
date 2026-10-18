/**
 * The host contract as one table (D3): the literals in packages/contracts/src/dom.ts,
 * each with what the skin reads it for and how the contract test checks it on
 * a live host (D66).
 *
 * The table is build and test data rather than runtime data: the browser bundle
 * carries the literals alone, so the notes cost the page nothing. The build
 * holds the two lists together — every exported literal of the DOM contract has
 * to appear here, and every id has to be named by a feature manifest (D72) — so
 * a selector cannot enter the skin without a note and an owner, and a host
 * upgrade can be audited from this list alone.
 *
 * The host build these entries were checked on is the one the service shapes
 * name (packages/contracts/src/services.ts, 0.2.1-alpha.1), and the lane's
 * `contract` scenario walks every `probe` below against a live host (D3, D66).
 */
import { ACCOUNT_TRIGGER_SELECTOR, CHAIN_OVERLAY_FALLBACK_ATTRIBUTE, CHAT_CALL_SELECTOR, CONTEXT_METER_FILL_SELECTOR, EXPANDED_ATTRIBUTE, ROW_PHASE_ATTRIBUTE, CHAT_FLOW_SELECTOR, CHAT_RUNNING_ICON_SELECTOR, CHAT_RUNNING_SELECTOR, CHAT_TURN_ATTRIBUTE, COMPOSER_CARD_SELECTOR, COMPOSER_INPUT_SELECTOR, COMPOSER_PLACEHOLDER_SELECTOR, COMPOSER_SCROLL_SELECTOR, COMPOSER_SELECTOR, COMPOSER_STACK_SELECTOR, COMPOSER_STATS_SELECTOR, COMPOSER_STAT_SELECTOR, COMPOSER_TEXTAREA_SELECTOR, COMPOSER_VARIANT_ATTRIBUTE, CONVERSATION_HEADER_SELECTOR, CONVERSATION_HEADER_SLOT_SELECTOR, CONVERSATION_SCROLL_SELECTOR, CONVERSATION_SESSION_ATTRIBUTE, CONVERSATION_SESSION_SELECTOR, DARK_THEME_ATTRIBUTE, DIALOG_TRIGGER_SELECTOR, DISCLOSURE_HEADER_SELECTOR, DISCLOSURE_ROW_SELECTOR, FLOW_BLOCK_SELECTOR, FLOW_KIND_ATTRIBUTE, FOLLOWING_TAIL_ATTRIBUTE, FOLLOWING_TAIL_SELECTOR, FOLLOW_THRESHOLD_PX, FOLD_SKIPPED_CONTROL_SELECTOR, FOLD_TOGGLE_SELECTOR, FOOTER_ACTIONS_SELECTOR, FOOT_AREA_SELECTOR, FOREGROUND_SELECTOR, FRAME_TOP_CLEARANCE_PROPERTY, FULLSCREEN_ATTRIBUTE, HEADER_CORNER_SELECTOR, HEADER_TITLE_ROW_SELECTOR, HEADER_TITLE_SELECTOR, HEADER_UTILITIES_SELECTOR, MENU_LIST_SELECTOR, MENU_ROLE_SELECTOR, MOBILE_PORTRAIT_SELECTOR, MOBILE_STATS_SELECTOR, PEER_SHEET_SELECTOR, PERMISSION_TRIGGER_SELECTOR, PHASE_ATTRIBUTE, PLATFORM_ATTRIBUTE, PROCESS_ACTIVITY_SELECTOR, PROCESS_BODY_SELECTOR, PROCESS_CONTENT_SELECTOR, PROCESS_EXPANDED_MODE_ATTRIBUTE, PROCESS_GROUP_SELECTOR, RIGHTBAR_COLUMN_SELECTOR, RIGHTBAR_TOGGLE_SELECTOR, ROOT_SLOT_SELECTOR, RUNNING_STATE, SETTINGS_BUTTON_SELECTOR, SHIMMER_ATTRIBUTE, SHIMMER_LEGACY_ATTRIBUTE, SHIMMER_SELECTOR, SIDEBAR_SEARCH_SLOT_SELECTOR, SIDEBAR_SLOT_SELECTOR, SKIN_CENTER_ATTRIBUTE, SLOT_ANCHOR_SELECTOR, STREAMING_ATTRIBUTE, STREAMING_SELECTOR, SUBMISSION_ECHO_SELECTOR, THINK_ROW_SELECTOR, TURN_RAIL_CURRENT_SELECTOR, TURN_RAIL_INSET, TURN_RAIL_MARK_SELECTOR, TURN_RAIL_PITCH, TURN_RAIL_SCROLLER_SELECTOR, TURN_RAIL_SELECTOR, UNTAGGED_SHEET_SELECTOR, USER_ROW_KIND, VIEW_TABS_STRIP_SELECTOR, WINDOWS_MENU_SELECTOR, WINDOWS_TITLEBAR_ATTRIBUTE, ASSISTANT_STEP_KIND, TOOL_CALL_KIND, CHAT_GROUP_PART_ATTRIBUTE, CHAT_GROUP_PART_REASONING, PROCESS_HEADER_LABEL_SELECTOR, CHAT_RUNNING_TEXT_SELECTOR, REASONING_TEXT_SELECTOR, SIDEBAR_BRAND_SELECTOR, SIDEBAR_TOGGLE_SELECTOR, DS_BOT_SURFACE_ATTRIBUTE, DS_BOT_RETURN_SELECTOR, DS_BOT_ACCOUNT_SELECTOR, DS_BOT_ACCOUNT_MENU_SELECTOR, DS_BOT_AGENT_ITEM_SELECTOR, DS_BOT_SIDEBAR_TOP_SELECTOR, SIDEBAR_RESIZE_HANDLE_SELECTOR, SIDEBAR_ROOT_SELECTOR } from './dom'

/**
 * The page state an entry is checked in (D66): the empty page, the moment a
 * submission goes through, an answer streaming in, a settled conversation of two
 * turns, the host's own account menu open, or the host's dark flip. `any` holds
 * everywhere the page is served.
 */
type HostDomProbeState = 'any' | 'hero' | 'sending' | 'streaming' | 'conversation' | 'menu' | 'dark'

/**
 * How the literal is checked:
 *
 * - `selector` — it matches at least `min` elements (default 1).
 * - `attribute` — some element carries it.
 * - `property` — the document element resolves it as a custom property.
 * - `global` — the dotted path resolves on the page.
 * - `value` — the string appears as the value of some attribute.
 * - `rail-geometry` — the rail's marks and its scroller's content height agree
 *   with `turn.rail-pitch` and `turn.rail-inset`.
 * - `none` — no page form: a number, a value only another platform writes, or a
 *   literal of a plugin this instance does not install. The behaviour scenarios
 *   and the unit tests hold these; the contract test reports them by id so a
 *   host upgrade still walks the whole list.
 */
type HostDomProbeKind = 'selector' | 'attribute' | 'property' | 'global' | 'value' | 'rail-geometry' | 'none'

/** How the contract test checks one entry against a live host. */
interface HostDomProbe {
  state: HostDomProbeState
  kind: HostDomProbeKind
  /** At least how many matches a selector needs; defaults to 1. */
  min?: number
  /** The entry a relative selector or a geometry check is resolved against. */
  within?: string
}

/**
 * One entry of the table: the literal the host writes, and what the skin reads
 * it for.
 */
interface HostDomEntry {
  /** Stable id; a feature manifest names it (D72) and the contract test reports by it. */
  id: string
  /** The literal, as the host writes it. */
  value: string
  /** How the contract test checks it (D66). */
  probe: HostDomProbe
  /** What the host means by it, and what reads it. */
  use: string
  /**
   * Set on an entry no feature reads: the plugin's own shell does, through the
   * core and shared modules (the boot graph, stylesheet parking, the peer
   * verdict, the yield). Every other entry is named by a feature manifest.
   */
  owner?: 'core'
}

export const HOST_DOM: HostDomEntry[] = [
  { id: 'chat.flow-block', value: FLOW_BLOCK_SELECTOR, probe: { state: 'conversation', kind: 'selector' }, use: 'a flow block: a new one is this piece of the stream moving on, and a direct call\u2019s own block is the box its row takes in the list' },
  { id: 'chat.flow', value: CHAT_FLOW_SELECTOR, probe: { state: 'conversation', kind: 'selector' }, use: 'the chat column: the root every chat-area behaviour scopes to' },
  { id: 'chat.call', value: CHAT_CALL_SELECTOR, probe: { state: 'conversation', kind: 'selector' }, use: 'one tool call row: structure the follow watches for' },
  { id: 'chat.think-row', value: THINK_ROW_SELECTOR, probe: { state: 'conversation', kind: 'selector' }, use: 'one thinking row, folded and quoted by its phase' },
  { id: 'chat.reasoning-text', value: REASONING_TEXT_SELECTOR, probe: { state: 'streaming', kind: 'selector' }, use: 'the Markdown the host renders, which a thinking row\'s reasoning body wraps and the window slides' },
  { id: 'chat.think-running', value: RUNNING_STATE, probe: { state: 'streaming', kind: 'value' }, use: 'the phase value while the model is still thinking' },
  { id: 'chat.phase', value: ROW_PHASE_ATTRIBUTE, probe: { state: 'conversation', kind: 'attribute' }, use: 'the phase of a thinking row or a tool call\u2019s own view; the fold opens a thinking row while it reads `running`, and the follow notices one leaving it' },
  { id: 'chat.streaming', value: STREAMING_SELECTOR, probe: { state: 'streaming', kind: 'selector' }, use: 'the markdown container while an answer streams' },
  { id: 'chat.streaming-attribute', value: STREAMING_ATTRIBUTE, probe: { state: 'streaming', kind: 'attribute' }, use: 'the same mark as an attribute name, watched appearing and going' },
  { id: 'chat.shimmer', value: SHIMMER_SELECTOR, probe: { state: 'streaming', kind: 'selector' }, use: 'TextShimmer still sweeping: that content is still moving' },
  { id: 'chat.shimmer-attribute', value: SHIMMER_ATTRIBUTE, probe: { state: 'streaming', kind: 'attribute' }, use: 'the shimmer mark as an attribute name, in the fold\u2019s mutation filter' },
  { id: 'chat.shimmer-legacy-attribute', value: SHIMMER_LEGACY_ATTRIBUTE, probe: { state: 'any', kind: 'none' }, use: 'the shimmer mark an older host build writes; the current one writes data-shimmer' },
  { id: 'chat.scroller', value: CONVERSATION_SCROLL_SELECTOR, probe: { state: 'conversation', kind: 'selector' }, use: 'the session scroller the host hangs its own follow off' },
  { id: 'chat.following-tail', value: FOLLOWING_TAIL_SELECTOR, probe: { state: 'streaming', kind: 'selector' }, use: 'present while the host follow is on; the scroll owner hands it back through it' },
  { id: 'chat.following-tail-attribute', value: FOLLOWING_TAIL_ATTRIBUTE, probe: { state: 'streaming', kind: 'attribute' }, use: 'the same mark as an attribute name' },
  { id: 'chat.follow-threshold', value: String(FOLLOW_THRESHOLD_PX), probe: { state: 'any', kind: 'none' }, use: 'how close to the end counts as reading the tail, by the host\u2019s own line' },
  { id: 'chat.running', value: CHAT_RUNNING_SELECTOR, probe: { state: 'streaming', kind: 'selector' }, use: 'the live turn\u2019s status line at the end of the flow, which the status feature pins while the reader is at the tail' },
  { id: 'composer.seat', value: COMPOSER_SELECTOR, probe: { state: 'hero', kind: 'selector' }, use: 'the composer seat: a pointer or key inside it is the reader typing' },
  { id: 'composer.input', value: COMPOSER_INPUT_SELECTOR, probe: { state: 'hero', kind: 'selector' }, use: 'the editable draft: caret motion and the send flight read it' },
  { id: 'composer.card', value: COMPOSER_CARD_SELECTOR, probe: { state: 'hero', kind: 'selector' }, use: 'the composer card the send flight lifts a copy of' },
  { id: 'composer.scroll', value: COMPOSER_SCROLL_SELECTOR, probe: { state: 'hero', kind: 'selector' }, use: 'the draft\u2019s own scroll area inside the card' },
  { id: 'composer.textarea', value: COMPOSER_TEXTAREA_SELECTOR, probe: { state: 'any', kind: 'none' }, use: 'a question card\u2019s answer box or a queued message\u2019s inline editor; neither is on the page of a plain turn' },
  { id: 'composer.echo', value: SUBMISSION_ECHO_SELECTOR, probe: { state: 'sending', kind: 'selector' }, use: 'the echo bubble mounted the moment a submission goes through' },
  { id: 'composer.stack', value: COMPOSER_STACK_SELECTOR, probe: { state: 'hero', kind: 'selector' }, use: 'the card with the todo, goal and queue cards stacked above it' },
  { id: 'composer.placeholder', value: COMPOSER_PLACEHOLDER_SELECTOR, probe: { state: 'hero', kind: 'selector' }, use: 'the placeholder the host\u2019s own editor draws inside the draft' },
  { id: 'composer.stats', value: COMPOSER_STATS_SELECTOR, probe: { state: 'any', kind: 'none' }, use: 'the container the host marked around its statistics before it marked each figure; the skin reads whichever is there' },
  { id: 'composer.mobile-stats', value: MOBILE_STATS_SELECTOR, probe: { state: 'any', kind: 'none' }, use: 'the statistics strip a mobile plugin draws in the dock\u2019s own band; the composer pass lifts its line above whatever height this strip has, and the lane\u2019s stand-in page carries one for the statsPosition case' },
  { id: 'composer.mobile-portrait', value: MOBILE_PORTRAIT_SELECTOR, probe: { state: 'any', kind: 'none' }, use: 'the portrait adaptation a mobile remote plugin applies to the desktop GUI; the composer pass turns it into the skin\u2019s own mark, which keeps the phone rules from stacking with that layer\u2019s own transforms' },
  { id: 'composer.stat', value: COMPOSER_STAT_SELECTOR, probe: { state: 'conversation', kind: 'selector' }, use: 'one figure of the host\u2019s statistics in the composer stack, which the context panel repeats' },
  { id: 'composer.variant', value: COMPOSER_VARIANT_ATTRIBUTE, probe: { state: 'hero', kind: 'attribute' }, use: 'which composer the host rendered: the hero\u2019s or the conversation\u2019s' },
  { id: 'composer.access-trigger', value: PERMISSION_TRIGGER_SELECTOR, probe: { state: 'hero', kind: 'selector' }, use: 'the host\u2019s access-mode trigger inside its permission slot' },
  { id: 'composer.dialog-trigger', value: DIALOG_TRIGGER_SELECTOR, probe: { state: 'conversation', kind: 'selector' }, use: 'a host button that opens a dialog (the context meter and the statistics pills); the context panel tells a figure\u2019s own trigger by it. The newer host keeps none on the hero page, where the composer stands without a reading' },
  { id: 'composer.meter-fill', value: CONTEXT_METER_FILL_SELECTOR, probe: { state: 'conversation', kind: 'selector' }, use: 'the filled arc of the context meter: the circle the host gives a dash array, painted with the colour the occupancy fell on' },
  { id: 'composer.fallback-panel', value: CHAIN_OVERLAY_FALLBACK_ATTRIBUTE, probe: { state: 'any', kind: 'none' }, use: 'the host\u2019s panel that replaces the composer card, which the mascot stands on' },
  { id: 'process.group', value: PROCESS_GROUP_SELECTOR, probe: { state: 'conversation', kind: 'selector' }, use: 'every process group root: auto-fold and the fold glide work on it' },
  { id: 'process.body', value: PROCESS_BODY_SELECTOR, probe: { state: 'conversation', kind: 'selector' }, use: 'a group\u2019s capped body, with its own scrollbar' },
  { id: 'process.content', value: PROCESS_CONTENT_SELECTOR, probe: { state: 'conversation', kind: 'selector' }, use: 'the layer inside a body that actually changes size' },
  { id: 'chat.assistant-step-kind', value: ASSISTANT_STEP_KIND, probe: { state: 'conversation', kind: 'value' }, use: 'the kind of an assistant step\u2019s row; inside a process group it is a thought or an output in the header\u2019s figures' },
  { id: 'chat.tool-call-kind', value: TOOL_CALL_KIND, probe: { state: 'any', kind: 'none' }, use: 'the kind of a tool call\u2019s row, counted as a tool in the header\u2019s figures; the lane\u2019s processSummary scenario holds it' },
  { id: 'chat.group-part', value: CHAT_GROUP_PART_ATTRIBUTE, probe: { state: 'conversation', kind: 'attribute' }, use: 'which part of an assistant step a row holds, which tells a thought from an output' },
  { id: 'chat.group-part-reasoning', value: CHAT_GROUP_PART_REASONING, probe: { state: 'conversation', kind: 'value' }, use: 'the part value of a step\u2019s thinking row' },
  { id: 'process.header-label', value: PROCESS_HEADER_LABEL_SELECTOR, probe: { state: 'conversation', kind: 'selector', within: 'process.activity' }, use: 'the words of a process group\u2019s header, which the counted summary stands in for' },
  { id: 'chat.running-text', value: CHAT_RUNNING_TEXT_SELECTOR, probe: { state: 'streaming', kind: 'selector', within: 'chat.running' }, use: 'the words of the live turn\u2019s running row, which the waiting line stands in for beside the host\u2019s whale' },
  { id: 'chat.running-icon', value: CHAT_RUNNING_ICON_SELECTOR, probe: { state: 'streaming', kind: 'selector', within: 'chat.running' }, use: 'the host\u2019s own running indicator at the head of the live turn\u2019s row, which the waiting line hides under the Claude brand and stands its own loader in for' },
  { id: 'process.expanded-mode', value: PROCESS_EXPANDED_MODE_ATTRIBUTE, probe: { state: 'any', kind: 'none' }, use: 'on a group root while the tier does not cap the body; the lane\u2019s tiers all cap it' },
  { id: 'process.activity', value: PROCESS_ACTIVITY_SELECTOR, probe: { state: 'conversation', kind: 'selector' }, use: 'a process group\u2019s header control' },
  { id: 'chat.turn-attribute', value: CHAT_TURN_ATTRIBUTE, probe: { state: 'conversation', kind: 'attribute' }, use: 'the turn a chat row belongs to' },
  { id: 'chat.user-row', value: FLOW_KIND_ATTRIBUTE, probe: { state: 'conversation', kind: 'attribute' }, use: 'what a flow row is; `user` marks a settled user row' },
  { id: 'chat.user-kind', value: USER_ROW_KIND, probe: { state: 'conversation', kind: 'value' }, use: 'the kind value of a settled user row, whose arrival stands the stream glide down' },
  { id: 'fold.disclosure', value: DISCLOSURE_ROW_SELECTOR, probe: { state: 'conversation', kind: 'selector' }, use: 'a DisclosureRow: the fold glide presses its own body' },
  { id: 'fold.disclosure-header', value: DISCLOSURE_HEADER_SELECTOR, probe: { state: 'any', kind: 'none' }, use: 'the header a host build wraps around a DisclosureRow’s row and its accessory, which the fold glide and the entrance fade step out of to reach the body; the build the CI lane pins writes none, so the page has no form to require, and the reasoningStream scenario holds the thinking row’s door on whichever shape it meets' },
  { id: 'fold.expanded', value: EXPANDED_ATTRIBUTE, probe: { state: 'any', kind: 'none' }, use: 'present only while an expandable row stands open, so a settled page carries none of them; the fold reads it to tell a thinking row that already stands as its phase asks from one it still has to press' },
  { id: 'fold.toggle', value: FOLD_TOGGLE_SELECTOR, probe: { state: 'any', kind: 'selector' }, use: 'any other control that opens and closes something' },
  { id: 'fold.skipped', value: FOLD_SKIPPED_CONTROL_SELECTOR, probe: { state: 'conversation', kind: 'selector' }, use: 'a turn\u2019s header and trigger notice: skipped whole' },
  { id: 'turn.rail', value: TURN_RAIL_SELECTOR, probe: { state: 'conversation', kind: 'selector' }, use: 'the host\u2019s turn rail, which the skin\u2019s navigator replaces in place' },
  { id: 'turn.rail-scroller', value: TURN_RAIL_SCROLLER_SELECTOR, probe: { state: 'conversation', kind: 'selector', within: 'turn.rail' }, use: 'the rail\u2019s own scroller, whose content height gives the mark count' },
  { id: 'turn.rail-mark', value: TURN_RAIL_MARK_SELECTOR, probe: { state: 'conversation', kind: 'selector', within: 'turn.rail', min: 2 }, use: 'one rail mark, keyed by position in the rail\u2019s list' },
  { id: 'turn.rail-current', value: TURN_RAIL_CURRENT_SELECTOR, probe: { state: 'conversation', kind: 'selector', within: 'turn.rail' }, use: 'the mark of the turn at the reading position' },
  { id: 'turn.rail-pitch', value: String(TURN_RAIL_PITCH), probe: { state: 'conversation', kind: 'rail-geometry' }, use: 'the rail\u2019s fixed pitch, which the skin\u2019s own rail matches' },
  { id: 'turn.rail-inset', value: String(TURN_RAIL_INSET), probe: { state: 'any', kind: 'none' }, use: 'the rail\u2019s inset at each end, read by the same geometry check as turn.rail-pitch' },
  { id: 'conversation.session', value: CONVERSATION_SESSION_SELECTOR, probe: { state: 'conversation', kind: 'selector' }, use: 'the shown conversation column' },
  { id: 'conversation.session-attribute', value: CONVERSATION_SESSION_ATTRIBUTE, probe: { state: 'conversation', kind: 'attribute' }, use: 'the session id the column carries' },
  { id: 'header.row', value: HEADER_TITLE_ROW_SELECTOR, probe: { state: 'conversation', kind: 'selector' }, use: 'the header\u2019s title row: the line the title, the utilities and the corner seat share, and what the band placement measures against' },
  { id: 'header.title', value: HEADER_TITLE_SELECTOR, probe: { state: 'conversation', kind: 'selector' }, use: 'the session title\u2019s own breadcrumb; the desktop caption row lifts it when it fits' },
  { id: 'header.utilities', value: HEADER_UTILITIES_SELECTOR, probe: { state: 'conversation', kind: 'selector' }, use: 'the header\u2019s utilities cluster (the workspace opener, the overflow menu, the bottom-panel toggle), lifted with it' },
  { id: 'header.corner', value: HEADER_CORNER_SELECTOR, probe: { state: 'conversation', kind: 'selector' }, use: 'the corner seat beside the utilities, carrying the right-sidebar toggle' },
  { id: 'header.element', value: CONVERSATION_HEADER_SELECTOR, probe: { state: 'any', kind: 'none' }, use: 'the conversation header, resolved with closest() from the title row; queried document-wide the substring names a dozen other bars' },
  { id: 'header.view-tabs', value: VIEW_TABS_STRIP_SELECTOR, probe: { state: 'conversation', kind: 'selector' }, use: 'the view-tab strip inside the header, whose box the band placement keeps clear of' },
  { id: 'shell.phase', value: PHASE_ATTRIBUTE, probe: { state: 'any', kind: 'attribute' }, use: 'the page\u2019s phase: hero before a session is chosen, active once one is shown' },
  { id: 'shell.foot-area', value: FOOT_AREA_SELECTOR, probe: { state: 'any', kind: 'selector' }, use: 'the sidebar footer block the account entry lives in' },
  { id: 'shell.sidebar-search', value: SIDEBAR_SEARCH_SLOT_SELECTOR, probe: { state: 'any', kind: 'selector' }, use: 'the host\u2019s own sidebar search: the skin\u2019s box stands in for it, and the `icon` style leaves the host\u2019s button in place and takes its click over' },
  { id: 'shell.sidebar-root', value: SIDEBAR_ROOT_SELECTOR, probe: { state: 'any', kind: 'selector' }, use: 'the sidebar column\u2019s own box, whose right edge the surface switch lines up with in the desktop caption strip' },
  { id: 'shell.sidebar-brand', value: SIDEBAR_BRAND_SELECTOR, probe: { state: 'any', kind: 'selector' }, use: 'the wide brand in the sidebar\u2019s top row, which the collapsed rail lacks: the search box and the web\u2019s surface switch follow it' },
  { id: 'shell.sidebar-toggle', value: SIDEBAR_TOGGLE_SELECTOR, probe: { state: 'any', kind: 'selector' }, use: 'the collapse toggle at the top row\u2019s end; the surface switch goes before it on the web and clears it in the desktop caption strip' },
  { id: 'shell.sidebar-resize', value: SIDEBAR_RESIZE_HANDLE_SELECTOR, probe: { state: 'any', kind: 'selector' }, use: 'the strip that starts a drag of the sidebar column at its right edge; the skin takes the gesture over there, so the host never clamps it to its own floor' },
  { id: 'shell.menu', value: MENU_ROLE_SELECTOR, probe: { state: 'menu', kind: 'selector' }, use: 'an open host menu: the foreground, and where the account rows go' },
  { id: 'shell.menu-list', value: MENU_LIST_SELECTOR, probe: { state: 'menu', kind: 'selector' }, use: 'the host menu\u2019s own list element' },
  { id: 'shell.foreground', value: FOREGROUND_SELECTOR, probe: { state: 'menu', kind: 'selector' }, use: 'everything that counts as foreground: a modal dialog or an open menu' },
  { id: 'shell.account-trigger', value: ACCOUNT_TRIGGER_SELECTOR, probe: { state: 'any', kind: 'none' }, use: 'the host\u2019s own account trigger in the footer, marked with the sign-in state; the web build mounts no account menu there, so the skin\u2019s account surface builds itself' },
  { id: 'shell.settings-button', value: SETTINGS_BUTTON_SELECTOR, probe: { state: 'any', kind: 'selector' }, use: 'the host\u2019s settings button the account menu rows open' },
  { id: 'shell.footer-actions', value: FOOTER_ACTIONS_SELECTOR, probe: { state: 'any', kind: 'selector' }, use: 'the footer\u2019s action list the drawer mirrors' },
  { id: 'shell.slot-anchor', value: SLOT_ANCHOR_SELECTOR, probe: { state: 'any', kind: 'selector' }, use: 'a slot anchor; its children are the host\u2019s real entries' },
  { id: 'shell.root-slot', value: ROOT_SLOT_SELECTOR, probe: { state: 'any', kind: 'selector' }, use: 'the root slot: the shell frame is its own element child, and the three columns are what the part walk reads inside it (D3)', owner: 'core' },
  { id: 'shell.sidebar-slot', value: SIDEBAR_SLOT_SELECTOR, probe: { state: 'any', kind: 'selector' }, use: 'the sidebar\u2019s slot anchor: the region the part walk reads the sidebar\u2019s own class names in (D3)', owner: 'core' },
  { id: 'shell.header-slot', value: CONVERSATION_HEADER_SLOT_SELECTOR, probe: { state: 'any', kind: 'selector' }, use: 'the conversation header\u2019s slot anchor: the region the part walk reads the header\u2019s class names in (D3)', owner: 'core' },
  { id: 'shell.rightbar-column', value: RIGHTBAR_COLUMN_SELECTOR, probe: { state: 'any', kind: 'selector' }, use: 'the right sidebar\u2019s own column, marked by the host; the docked panels the skin draws as cards are read here (D3)', owner: 'core' },
  { id: 'shell.rightbar-toggle', value: RIGHTBAR_TOGGLE_SELECTOR, probe: { state: 'any', kind: 'none' }, use: 'the right panel\u2019s own collapse control, present only while that panel is open; the skin\u2019s own button in the header\u2019s row presses it and it steps aside, because its own subtree is transformed and clipped' },
  { id: 'shell.windows-titlebar', value: WINDOWS_TITLEBAR_ATTRIBUTE, probe: { state: 'any', kind: 'none' }, use: 'the Windows caption row is on this page: only the desktop shell writes it' },
  { id: 'shell.windows-menu', value: WINDOWS_MENU_SELECTOR, probe: { state: 'any', kind: 'none' }, use: 'the desktop shell\u2019s own seat in the Windows caption row, where its native menu draws; the row\u2019s content starts after it, and only the desktop shell mounts it' },
  { id: 'shell.platform', value: PLATFORM_ATTRIBUTE, probe: { state: 'any', kind: 'none' }, use: 'which platform the shell runs on; the host marks `darwin` on the desktop and plain web never sets it' },
  { id: 'shell.fullscreen', value: FULLSCREEN_ATTRIBUTE, probe: { state: 'any', kind: 'none' }, use: 'the macOS window is fullscreen, so its traffic lights are away; only the desktop shell writes it' },
  { id: 'shell.top-clearance', value: FRAME_TOP_CLEARANCE_PROPERTY, probe: { state: 'any', kind: 'none' }, use: 'the caption strip\u2019s height, which the band layout reads; only the desktop shell declares it' },
  { id: 'shell.skin-center', value: SKIN_CENTER_ATTRIBUTE, probe: { state: 'any', kind: 'none' }, use: 'another skin owns the page; this theme yields (D74). The host\u2019s skin center writes it, and the web profile mounts none', owner: 'core' },
  { id: 'shell.dark-theme', value: DARK_THEME_ATTRIBUTE, probe: { state: 'dark', kind: 'attribute' }, use: 'the host flipped its own light/dark theme' },
  { id: 'boot.graph', value: '__DSH_BOOT__', probe: { state: 'any', kind: 'global' }, use: 'the boot graph, naming every client entry before any of them runs', owner: 'core' },
  { id: 'boot.peer-entry', value: 'dsh-chat-ux', probe: { state: 'any', kind: 'none' }, use: 'the peer plugin\u2019s entry id inside the boot graph, read to stand the chat features down (D74); this instance does not install it', owner: 'core' },
  { id: 'boot.peer-sheet', value: PEER_SHEET_SELECTOR, probe: { state: 'any', kind: 'none' }, use: 'the peer plugin\u2019s own stylesheet, the other half of that verdict; this instance does not install it' },
  { id: 'ds-bot.entry', value: 'ds-bot', probe: { state: 'any', kind: 'none' }, use: 'ds-bot\u2019s entry id inside the boot graph: the page has its Bot surface to give way to (D74); this instance does not install it', owner: 'core' },
  { id: 'ds-bot.surface', value: DS_BOT_SURFACE_ATTRIBUTE, probe: { state: 'any', kind: 'none' }, use: 'ds-bot\u2019s Bot surface is painted, so this theme gives the page way (D74); this instance does not install it', owner: 'core' },
  { id: 'ds-bot.saved-mode', value: 'ds-bot:surface', probe: { state: 'any', kind: 'none' }, use: 'the local storage key holding ds-bot\u2019s mode, read before its browser half runs so the first frame already belongs to the right owner (D74); this instance does not install it', owner: 'core' },
  { id: 'ds-bot.global', value: 'dshBot', probe: { state: 'any', kind: 'none' }, use: 'the registry ds-bot puts on `window` while its browser half runs; from then on its own attribute answers the verdict, before then its saved mode does (D74)', owner: 'core' },
  { id: 'ds-bot.return', value: DS_BOT_RETURN_SELECTOR, probe: { state: 'any', kind: 'none' }, use: 'ds-bot\u2019s button back to its Bot surface, which the switch\u2019s Chat side presses; this instance does not install it' },
  { id: 'ds-bot.account', value: DS_BOT_ACCOUNT_SELECTOR, probe: { state: 'any', kind: 'none' }, use: 'ds-bot\u2019s account button, which the switch\u2019s Code side opens to reach the Agent mode item; this instance does not install it' },
  { id: 'ds-bot.account-menu', value: DS_BOT_ACCOUNT_MENU_SELECTOR, probe: { state: 'any', kind: 'none' }, use: 'ds-bot\u2019s account menu, kept out of sight while the switch presses its item; this instance does not install it' },
  { id: 'ds-bot.agent-item', value: DS_BOT_AGENT_ITEM_SELECTOR, probe: { state: 'any', kind: 'none' }, use: 'the one item after the account menu\u2019s last separator, ds-bot\u2019s switch to Agent mode; this instance does not install it' },
  { id: 'ds-bot.sidebar-top', value: DS_BOT_SIDEBAR_TOP_SELECTOR, probe: { state: 'any', kind: 'none' }, use: 'the top row of ds-bot\u2019s own sidebar, where the switch sits on the web while the Bot surface is painted; this instance does not install it' },
  { id: 'head.untagged-sheets', value: UNTAGGED_SHEET_SELECTOR, probe: { state: 'any', kind: 'none' }, use: 'every untagged stylesheet, which the host\u2019s claim sweep would otherwise take; read in the boot sweep, before the host tags its sheets, and the smoke\u2019s sibling cases hold it', owner: 'core' },
  { id: 'api.highlight', value: 'CSS.highlights', probe: { state: 'any', kind: 'global' }, use: 'the swept-text registry the token reveal needs; a browser without it gets no engine' },
  { id: 'api.highlight-constructor', value: 'Highlight', probe: { state: 'any', kind: 'global' }, use: 'the constructor that registry is built from' },
  { id: 'api.window-controls', value: 'navigator.windowControlsOverlay', probe: { state: 'any', kind: 'none' }, use: 'the desktop caption-button overlay, read to place the title bar band; a web page never has it' },
]
