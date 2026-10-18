/**
 * The DOM half of the host contract (D3): every selector or attribute the
 * host itself writes.
 *
 * The host's class names carry a build-time hash and change with every release,
 * so the skin keys on these instead; interface text changes with the language,
 * so it is never matched either (D3). What each literal means and what reads it
 * is the table in packages/contracts/src/table.ts; the build holds the two files
 * together, so a literal cannot appear here without an entry there.
 *
 * Everything here is a promise the host makes today and the skin relies on.
 * What the skin itself writes stays with the feature that writes it.
 */

/* ---------- the chat area ---------- */

/** One per flow block: a new block means this piece of the stream moved on. */
export const FLOW_BLOCK_SELECTOR = '[data-chat-flow-key]'
/** The chat column. */
export const CHAT_FLOW_SELECTOR = '[data-chat-flow]'
/**
 * One tool call's row. It lives inside the assistant block, so it does not
 * have to arrive as a new flow block of its own.
 */
export const CHAT_CALL_SELECTOR = '[data-chat-call-id]'
/** One thinking row; its phase is its data-state attribute. */
export const THINK_ROW_SELECTOR = '[data-variant="think"]'
/**
 * The rendered reasoning text inside a thinking row, whatever the host's body
 * wrapper is called: the module slides it inside the window it gives that body.
 */
export const REASONING_TEXT_SELECTOR = '[data-markdown-variant]'
/**
 * The phase of a row that has one: a thinking row, and a tool call's own view
 * (the page's own phase is `data-phase`, D3). The values are the host's —
 * `running` while that piece of work is under way.
 */
export const ROW_PHASE_ATTRIBUTE = 'data-state'
/** The phase value while the model is still thinking, or a call is still running. */
export const RUNNING_STATE = 'running'
/** The markdown layer marks the container with this while an assistant message streams. */
export const STREAMING_SELECTOR = '[data-streaming]'
/** The same contract as an attribute name: the reveal watches it appearing and going. */
export const STREAMING_ATTRIBUTE = 'data-streaming'
/**
 * TextShimmer's swept element: while it is attached, that piece of content
 * is still moving. Both names are read, because an older host build writes
 * the old one (data-text-shimmer).
 */
export const SHIMMER_ATTRIBUTE = 'data-shimmer'
export const SHIMMER_LEGACY_ATTRIBUTE = 'data-text-shimmer'
/** The two shimmer attributes in selector form. */
export const SHIMMER_SELECTOR = `[${SHIMMER_ATTRIBUTE}], [${SHIMMER_LEGACY_ATTRIBUTE}]`
/** The chat column's scroller; the host hangs its own follow off it. */
export const CONVERSATION_SCROLL_SELECTOR = '[data-conversation-scroll]'
/** Present while the host's follow is on; its absence is how the follow reads as off. */
export const FOLLOWING_TAIL_ATTRIBUTE = 'data-chat-following-tail'
/** The same contract in selector form. */
export const FOLLOWING_TAIL_SELECTOR = '[data-chat-following-tail]'
/** How close to the end counts as reading the tail: the host's own threshold. */
export const FOLLOW_THRESHOLD_PX = 25
/**
 * The live turn's status line — the host's "deep diving" row — mounted as the
 * chat flow's last row while the session runs, with its own label and its own
 * ticking clock.
 */
export const CHAT_RUNNING_SELECTOR = '[data-chat-running]'
/** The composer area: a pointer or key inside it is the reader typing, not taking the scroll over. */
export const COMPOSER_SELECTOR = '[data-composer-seat]'
/** The composer's editable surface (contenteditable); the caret motion is drawn for it. */
export const COMPOSER_INPUT_SELECTOR = '[data-composer-input]'
/** The card the input sits in; the send flight lifts a copy of the whole card. */
export const COMPOSER_CARD_SELECTOR = '[data-composer-card]'
/** The draft's own scroll area inside that card. */
export const COMPOSER_SCROLL_SELECTOR = '[data-input-scroll]'
/** The echo bubble the host mounts the moment a submission goes through. */
export const SUBMISSION_ECHO_SELECTOR = '[data-submission-echo]'
/**
 * A plain text box inside the composer seat: a question card's answer box
 * (under [data-question-key]) and a queued message's inline editor (under
 * [data-queue-dock]). Both are textareas, in the main session and in the
 * sidebar's subagent sessions alike.
 */
export const COMPOSER_TEXTAREA_SELECTOR = '[data-composer-seat] textarea'
/** The host puts this on every process group. */
export const PROCESS_GROUP_SELECTOR = '[data-step-process]'
/** The host puts this on every process group's body. */
export const PROCESS_BODY_SELECTOR = '[data-step-process-body]'
/** The content layer inside a process group's body; that layer is the one that scrolls. */
export const PROCESS_CONTENT_SELECTOR = '[data-step-process-content]'
/** On a process group's root while this tier does not cap the body (detailed, fully expanded). */
export const PROCESS_EXPANDED_MODE_ATTRIBUTE = 'data-group-expanded-mode'
/** On every chat row: the turn the row belongs to. */
export const CHAT_TURN_ATTRIBUTE = 'data-chat-turn'
/** On a settled user row; the submission hold keys on its arrival. */
export const USER_ROW_KIND = 'user'
/** The kind attribute itself, whose values say what a flow row is. */
export const FLOW_KIND_ATTRIBUTE = 'data-chat-flow-kind'
/** The kind of an assistant step's row: its thinking or its output. */
export const ASSISTANT_STEP_KIND = 'assistant-step'
export const TOOL_CALL_KIND = 'tool-call'
/**
 * Which part of an assistant step a row holds: the host splits a step into its
 * thinking and its output and writes the part on the row.
 */
export const CHAT_GROUP_PART_ATTRIBUTE = 'data-chat-group-part'
/** The part value of a step's thinking row. */
export const CHAT_GROUP_PART_REASONING = 'reasoning'
/**
 * The words of a process group's header: the one child of the control the host
 * does not mark decorative (its icon and chevron sit in an aria-hidden span).
 */
export const PROCESS_HEADER_LABEL_SELECTOR = ':scope > :not([aria-hidden="true"])'
/**
 * The words of the live turn's running row: the shimmered child of its content
 * span. Reading it as the child that is not decorative would name whichever of
 * the span's children comes first, and the skin's waiting line and the lines
 * third-party plugins insert stand in that same span beside the host's whale.
 */
export const CHAT_RUNNING_TEXT_SELECTOR = `:scope > span > [${SHIMMER_ATTRIBUTE}], :scope > span > [${SHIMMER_LEGACY_ATTRIBUTE}]`
/**
 * The host's own running indicator — the whale tail it leads the row with —
 * beside the skin's waiting line. It carries no attribute of its own, so the
 * stable part of its hashed class name is matched (D3), scoped to the running
 * row so no other row's icon can be hit.
 */
export const CHAT_RUNNING_ICON_SELECTOR = '[data-dsh-claude-part~="running-icon"]'
/**
 * The turn rail (ui-chat's TurnNavigator): a nav at the conversation's
 * right edge with one mark per turn, absent below two turns and hidden
 * when the conversation is narrow. It is the one nav in the chat frame.
 */
export const TURN_RAIL_SELECTOR = `${CONVERSATION_SCROLL_SELECTOR} nav[data-dsh-claude-part~="rail-frame"]`
/** The rail's own scroller, its first child: the marks scroll inside it. */
export const TURN_RAIL_SCROLLER_SELECTOR = ':scope > [data-dsh-claude-part~="rail-scroller"]'
/**
 * One mark: a button carrying its position in the rail's list, not its
 * turn number. The rail renders only the marks near its scroll position.
 */
export const TURN_RAIL_MARK_SELECTOR = 'button[data-index]'
/** The mark of the turn at the reading position. */
export const TURN_RAIL_CURRENT_SELECTOR = 'button[data-index][aria-current="true"]'
/**
 * The rail's fixed pitch and its inset at each end (TurnNavigator's
 * TURN_SPACING_PX and RAIL_INSET_PX): its scroller's content is
 * `count × pitch + 2 × (inset − pitch / 2)` pixels tall.
 */
export const TURN_RAIL_PITCH = 10
export const TURN_RAIL_INSET = 6
/** A process group's header control. */
export const PROCESS_ACTIVITY_SELECTOR = 'button[data-process-activity]'
/** A fold: the host's DisclosureRow, and every other control that opens and closes something. */
export const DISCLOSURE_ROW_SELECTOR = '[data-disclosure-row]'
/**
 * The header a newer host build wraps around a DisclosureRow's own row and its
 * accessory: the body then stands beside this wrapper. An older build writes
 * no wrapper and sets the body beside the row itself.
 */
export const DISCLOSURE_HEADER_SELECTOR = '[data-disclosure-header]'
/**
 * On a row the host lets the reader open and fold: present while it stands
 * open. A thinking row is folded when this is absent.
 */
export const EXPANDED_ATTRIBUTE = 'data-expanded'
export const FOLD_TOGGLE_SELECTOR = '[aria-expanded]'
/** Controls whose opening is skipped whole: a turn's header and its trigger notice. */
export const FOLD_SKIPPED_CONTROL_SELECTOR = '[data-turn-process], [data-turn-trigger]'

/* ---------- the frame around the chat ---------- */

/** The shown conversation column, and the session id it carries. */
export const CONVERSATION_SESSION_SELECTOR = '[data-phase="active"] [data-conversation-session]'
export const CONVERSATION_SESSION_ATTRIBUTE = 'data-conversation-session'
/** The page's own phase: `hero` before a session is chosen, `active` once one is shown. */
export const PHASE_ATTRIBUTE = 'data-phase'
/** The composer card and the stack of cards above it. */
export const COMPOSER_STACK_SELECTOR = '[data-dsh-claude-part~="composer-stack"]'
/** The placeholder the host's own editor draws inside the draft. */
export const COMPOSER_PLACEHOLDER_SELECTOR = '[data-composer-placeholder]'
/**
 * The statistics in the composer stack. Both markers are read (D3), because an
 * older host build writes only the container; the context panel repeats the
 * figures
 */
export const COMPOSER_STATS_SELECTOR = '[data-composer-stats]'
export const COMPOSER_STAT_SELECTOR = '[data-composer-stat]'
/**
 * The statistics strip a mobile plugin draws in the same band as the host's dock
 * (dsh-pocket marks its own strip `data-mobile-nav="stats"`). It is not the
 * host's, so no rule in this package hides it: the composer pass measures it and
 * lifts the dock's line above the band it took.
 */
export const MOBILE_STATS_SELECTOR = '[data-mobile-nav="stats"]'
/**
 * The portrait adaptation a mobile remote plugin applies to the desktop GUI
 * (dsh-remote-web-ui marks the body `dsh-remote-portrait`). Not the host's
 * either: its rules float the composer's controls with transforms of their
 * own, so the composer pass reads this mark and hands it to the stylesheet as
 * the skin's own attribute, and the phone rules that place those controls
 * stand aside from it.
 */
export const MOBILE_PORTRAIT_SELECTOR = 'body.dsh-remote-portrait'
/**
 * The filled arc of the context meter: the circle the host gives a dash array
 * (its track circle carries none). The skin paints it with the colour the
 * occupancy fell on
 */
export const CONTEXT_METER_FILL_SELECTOR = '[data-dsh-claude-context-meter] circle[stroke-dasharray]'
/** The composer variant the host puts on the card (`hero` / `default`). */
export const COMPOSER_VARIANT_ATTRIBUTE = 'data-composer-variant'
/**
 * The host's own access-mode trigger inside its permission slot, skipping the
 * skin's own control: the skin's elements carry the `dsh-claude-` namespace as
 * whole class tokens, so no substring match is involved (D3).
 */
export const PERMISSION_TRIGGER_SELECTOR = '[data-slot="conversation.input.permission"] button:not([class^="dsh-claude-"], [class*=" dsh-claude-"])'
/** A host button that opens a dialog: the model and effort pickers in the composer stack. */
export const DIALOG_TRIGGER_SELECTOR = 'button[aria-haspopup="dialog"]'
/** The sidebar footer block; the skin's account entry lives inside it. */
export const FOOT_AREA_SELECTOR = '[data-dsh-claude-part~="foot-area"]'
/**
 * The host's own sidebar search: a button and an input in the workspace
 * section's header. The skin's box stands in for it, and the `icon` style
 * leaves the host's button in place with its click taken over, so both read
 * this slot.
 */
export const SIDEBAR_SEARCH_SLOT_SELECTOR = '[data-slot="sidebar"] [data-dsh-claude-part~="search-slot"]'
/** The sidebar's own column box, whose width follows the collapse and the reader's drag. */
export const SIDEBAR_ROOT_SELECTOR = '[data-slot="sidebar"] > [data-dsh-claude-part~="sidebar-root"]'
/**
 * The host's resize handle for that column: an 8px strip standing on the
 * column's right edge, whose inline `left` is the column's width, and the only
 * thing that starts a drag of it. It is a child of the layout frame, and the
 * host unmounts it while the column is folded.
 */
export const SIDEBAR_RESIZE_HANDLE_SELECTOR = '[data-side="sidebar"]'
/** The wide brand in the sidebar's top row; the collapsed rail has none. */
export const SIDEBAR_BRAND_SELECTOR = '[data-slot="sidebar"] [data-dsh-claude-part~="logo-row"] > [data-dsh-claude-part~="brand-button"]'
/**
 * The sidebar's collapse toggle, inside the top row. The desktop shells fix it
 * into the caption strip; the web leaves it the row's last cell.
 */
export const SIDEBAR_TOGGLE_SELECTOR = '[data-slot="sidebar"] [data-dsh-claude-part~="logo-row"] > [data-dsh-claude-part~="sidebar-toggle"]'
/** The host's own composer is replaced by a panel of its own choice; this is that panel's seat. */
export const CHAIN_OVERLAY_FALLBACK_ATTRIBUTE = 'data-chain-overlay-fallback'
/** The host's own open menus and modal dialogs: the foreground the skin must not walk over. */
export const FOREGROUND_SELECTOR = '[role="dialog"][aria-modal="true"], [role="menu"]'
/** The host's menu card and its list, which the skin injects a row into. */
export const MENU_ROLE_SELECTOR = '[role="menu"]'
export const MENU_LIST_SELECTOR = '[role="presentation"]'
/** The host's account trigger in the sidebar footer. */
export const ACCOUNT_TRIGGER_SELECTOR = '[aria-haspopup="menu"][data-signed-out]'
/**
 * The popup-opening control in the footer's settings area, which the account
 * menu rows open. The older host puts its settings dialog trigger there
 * (`aria-haspopup="dialog"`); the newer one puts the account menu's own trigger
 * (`aria-haspopup="menu"`), so the value is not part of the contract.
 */
export const SETTINGS_BUTTON_SELECTOR = '[data-dsh-claude-part~="settings-area"] button[aria-haspopup]'
/** The sidebar's action list, whose entries the skin mirrors into its drawer. */
export const FOOTER_ACTIONS_SELECTOR = '[data-dsh-claude-part~="footer-actions"]'
/** A slot anchor; its children are the host's real entries. */
export const SLOT_ANCHOR_SELECTOR = '[data-slot]'
/**
 * The three slot anchors the skin's part walk reads as regions (D3): each names
 * a host subtree the skin restyles, and the walk enters a region where its
 * anchor matches rather than climbing to the document for every element.
 */
export const SIDEBAR_SLOT_SELECTOR = '[data-slot="sidebar"]'
export const CONVERSATION_HEADER_SLOT_SELECTOR = '[data-slot="conversation.header"]'
/** The root slot: the shell frame is its own element child, and the three columns are inside. */
export const ROOT_SLOT_SELECTOR = '[data-slot="root"]'
/** The right sidebar's own column: the host marks it, and its docked panels are the skin's cards. */
export const RIGHTBAR_COLUMN_SELECTOR = '[data-rightbar-col]'
/**
 * The right panel's own collapse control, inside the chrome strip that panel
 * draws at its top-right. It exists only while that panel is open, and it hangs
 * from a transformed, clipped subtree, where a fixed box would be measured from
 * the panel and cut at its edge: the skin draws its own control in the header's
 * row and presses this one instead.
 */
export const RIGHTBAR_TOGGLE_SELECTOR = '[data-sidebar-right-open] [data-sidebar-right-toggle]'

/* ---------- the conversation header's own row ---------- */

/**
 * The header's title row: the line the title cluster, the utilities and the
 * corner seat share. The band placement measures against it, because the
 * title's own box moves with the placement. Rows of the same shape sit in the
 * sidebar's panels, so a reader takes the one carrying a title or the
 * utilities rather than the first match.
 */
export const HEADER_TITLE_ROW_SELECTOR = '[data-dsh-claude-part~="title-row"]'
/**
 * The session title's breadcrumb nav: the words themselves, not the flex
 * cluster that lays them out (the cluster stretches, so it says nothing about
 * where the title ends).
 */
export const HEADER_TITLE_SELECTOR = '[data-dsh-claude-part~="header-title"]'
/** The header's utilities cluster: the workspace opener, the overflow menu, the bottom-panel toggle. */
export const HEADER_UTILITIES_SELECTOR = '[data-dsh-claude-part~="header-utilities"]'
/** The corner seat beside the utilities, carrying the right-sidebar toggle. */
export const HEADER_CORNER_SELECTOR = '[data-dsh-claude-part~="header-corner"]'
/**
 * The conversation header itself, resolved with `closest` from the title row:
 * the same substring names a dozen other bars (the sidebar's action row, the
 * background-task chip), so it is never queried document-wide.
 */
export const CONVERSATION_HEADER_SELECTOR = '[data-dsh-claude-part~="conversation-header"]'
/** The view-tab strip inside the header, whose box the band placement keeps clear of. */
export const VIEW_TABS_STRIP_SELECTOR = '[data-dsh-claude-part~="view-tabs"]'

/* ---------- the document, the shell and the browser API ---------- */

/** The shell's window marks: the Windows caption row, the platform, and fullscreen. */
export const WINDOWS_TITLEBAR_ATTRIBUTE = 'data-windows-titlebar'
/**
 * The desktop shell's own seat in the Windows caption row, where its native
 * menu is drawn: the row's content starts to the right of it.
 */
export const WINDOWS_MENU_SELECTOR = '[data-windows-menu]'
export const PLATFORM_ATTRIBUTE = 'data-platform'
export const FULLSCREEN_ATTRIBUTE = 'data-fullscreen'
/** The host's declared caption-strip height, as a custom property on the document element. */
export const FRAME_TOP_CLEARANCE_PROPERTY = '--dsh-frame-top-clearance'
/** The skin center's stamp on the document element: another skin owns the page (D74). */
export const SKIN_CENTER_ATTRIBUTE = 'data-dsh-skin'
/** The host's own light/dark flip, written on `<body>`. */
export const DARK_THEME_ATTRIBUTE = 'data-ds-dark-theme'
/** A sibling plugin's stylesheet in `<head>`, read to tell that plugin is on the page. */
export const PEER_SHEET_SELECTOR = 'style[data-plugin-css="dsh-plugin-msg-nav/style.css"]'
/** Every untagged stylesheet in `<head>`: the host's claim sweep would otherwise take a sibling's. */
export const UNTAGGED_SHEET_SELECTOR = 'style:not([data-plugin])'

/* ---------- ds-bot (Fei2411/DeepSeek-Bot) ---------- */

/**
 * On `<body>` while ds-bot's Bot surface is painted: its shell group writes
 * the motion level there and deletes it when the group withdraws for the
 * shell's own interface (its Agent mode).
 */
export const DS_BOT_SURFACE_ATTRIBUTE = 'data-bt-motion'
/** In Agent mode, ds-bot's one control on the shell's own page: the footer button back to its Bot surface. */
export const DS_BOT_RETURN_SELECTOR = '.bt-return'
/** ds-bot's account button, which opens its menu on the Bot surface. */
export const DS_BOT_ACCOUNT_SELECTOR = '.bt-account'
/** That menu, portalled into `<body>` while open. */
export const DS_BOT_ACCOUNT_MENU_SELECTOR = '.bt-account-menu'
/** The menu's last group, after its last separator: the one item that switches to Agent mode. */
export const DS_BOT_AGENT_ITEM_SELECTOR = '.bt-account-menu > .bt-menu-sep:last-of-type ~ [role="menuitem"]'
/** The top row of ds-bot's own sidebar: its brand, search and new buttons. */
export const DS_BOT_SIDEBAR_TOP_SELECTOR = '.bt-side-top'
