# Changelog

All notable changes to `dsh-claude-style` are documented here, newest first.

## [Unreleased]

[中文](#cn-unreleased) | [English](#en-unreleased)

<h3 id="cn-unreleased">新增功能</h3>

- **侧栏的宽度与收张按 Claude 的读数来**：左侧边栏能拖到 200px（宿主自己的下限是 264px）；上限随窗口走，取 clamp(⌊窗口宽度⌋ − 330, 200, 420)px，正文列因此始终留出 330px。拖动中候选宽度低于 100px（下限的一半）时侧栏当场收起，回拖过这条线又当场弹出，收起与展开各是一次版式交换，内容以 300ms 淡入落下；在把手上按下并松开（位移不超过 3px）就是收张开关；收起再展开回到你上一次拖到的那一档。

### 体验优化

- **右侧栏的收起键站到顶栏右端**：面板打开时，头部那一行的右端出现一枚收起按钮，面板里原来那一枚让位；按下它面板收起，宿主的打开按钮回到原处。宿主那枚搬不出来——它挂在带 transform 且被裁剪的子树里，fixed 定位会被量到面板的坐标、再被面板的边裁掉。
- **设置页的说明改成一句话，能省的就省**：此前有的写着整段——把开关两种状态各自的样子、每个选项分别是什么都讲一遍——有的只有一句，有的干脆不写；现在每条说明只说这一项给你什么，标题与选项已经说清的那几行只剩标题与控件。
- **拖动侧栏时每帧只写一次宽度**：指针的原始上报按设备速率到达，此前每收到一个就写一次外壳的网格轨道，正文跟着重排一次；现在一个绘制帧只写一次，写的是这一帧最新的那一档宽度，松手时把尚未写出的那次补上。在内容多的页面上，拖动的边缘因此不再落后于指针。

### 移除

- **功能一览与设置说明两份文档移除了**：插件做什么由 README 的展示图与设置页本身说明，逐功能的清单与六个分页的设置表不再维护；清单里为中英文描述留的那一格也随之取消，加一个功能只写它的代码与开关行。

### 其他变更

- **README 收成展示文案**：中英两份都以截图与动画帧为主，预览各配一行说明，安装收成两个命令块，鸣谢由四段正文改成四条；读者要的细节留在文档表指向的几份文件里。

<h3 id="en-unreleased">New Features</h3>

- **The width and the folding follow Claude's own readings**: the left column drags down to 200px against the host's 264px, and its ceiling follows the window — clamp(⌊viewport⌋ - 330, 200, 420)px, which leaves the content column 330px. A drag below 100px, half the floor, folds the column on the spot and a drag back over that line brings it out again, each of the two being one layout swap with the body fading in over 300ms; a press and release on the handle (under 3px of travel) is the collapse toggle itself, and expanding the column comes back to the width you last dragged to.

### Improvements

- **The right panel's collapse control stands at the top bar's right end**: while the panel is open, a collapse button appears at the right end of the header's row and the panel's own copy steps aside; pressing it closes the panel and the host's open button returns. The host's own control cannot be moved there — it hangs from a transformed, clipped subtree, where a fixed box is measured from the panel and cut at its edge.
- **Settings descriptions say one clause, and only where it adds something**: a line that used to spell out both states of a switch and every choice beside it now says only what the setting gives the reader, and a row whose title and choices already say it carries no line at all.
- **The sidebar's drag writes its width once per frame**: the pointer's raw reports arrive at the device's own rate, and every one of them used to write the shell's grid track, re-wrapping the content behind it; a pass now carries a single write of the latest width, with the last one written on release. On a page with content in it the edge no longer trails the pointer.

### Removals

- **The feature list and the settings documents are removed**: what the plugin does is told by the README's screenshots and the settings page itself, so the per-feature list and the six-tab settings table are no longer maintained; the manifest's field for a two-language description goes with them, and a new feature is its code and its settings rows alone.

### Chores

- **The READMEs are presentation copy**: both languages lead with the screenshots and the animation frames, one line explains each preview, installation is two command blocks, and the acknowledgements are four bullets instead of four paragraphs; the detail a reader needs stays in the files the documentation table points at.

## [0.16.3] - 2026-10-18

[中文](#cn-0.16.3) | [English](#en-0.16.3)

<h3 id="cn-0.16.3">新增功能</h3>

- **Beam 的模型行画出厂商组合标**：目录里 `opencode-go/beam-free` 这类标识现在认领 Reflection 的组合标。字标是厂名的，模型名里从不写它，字标因此站在名字前面；标记在浅色画布上用厂商自己的品牌色，深色画布上随标签文字。
- **侧栏的宽度与收张按 Claude 的读数来**：左侧边栏能拖到 200px（宿主自己的下限是 264px）；上限随窗口走，取 clamp(⌊窗口宽度⌋ − 330, 200, 420)px，正文列因此始终留出 330px。拖动中候选宽度低于 100px（下限的一半）时侧栏当场收起，回拖过这条线又当场弹出，收起与展开各是一次版式交换，内容以 300ms 淡入落下；在把手上按下并松开（位移不超过 3px）就是收张开关；收起再展开回到你上一次拖到的那一档。

### 体验优化

- **一次改写或折叠作废的淡入片段改由一趟原地压缩收走**：此前每摘掉一段都要搬动它后面的全部片段，一批里作废的片段一多，这一趟就按片段数的平方增长；现在一趟写完。读者看到的样子不变。
- **流式期间写回的 tokens 把工具调用算进去**：调用的参数从不出现在页面上，一个只调工具的步骤因此原先停在结算值不动，现在每出现一行调用就按一行计，纯文字的字重也降到更接近实际的比例；计数挂在页面结构上，不再为此每帧扫一遍对话。
- **等待行换词不再强制页面同步重算样式与布局**：换词需要的宽度改由渲染本身的布局经尺寸观察得到，旧词离场、新词进场与宽度过渡都在随后一帧起步，看到的动作不变；本机桌面端跑 `/perf-stream 150 tps=1000`（主会话加两个子智能体）、对话涨到约 435 个节点的 215 次换词里，标签上的布局读取为 0 次，改动前每次换词要强制重算两次，每次 13.5–44 ms。
- **过程组较多的会话切换时，摘要一次量完**：16 个过程组的一次切换里最长强制布局从约 360 毫秒降到约 40 毫秒，切换耗时从约 0.58 秒降到约 0.33 秒。
- **等待行加载点换动作时先出后进**：离场的那组点各自在折返处淡出，最后一颗走完新的那组才从头开始、各自淡入，18×14 的小框里不再有 400–650 ms 同时挤着两组共六七颗点。

### 问题修复

- **用量面板里热力格的日期提示不再把面板撑出横向滚动条**：提示胶囊按自己当时的宽度决定贴向格子的哪一边，靠近两端的格子不再把它带出面板边缘，悬停时面板本身也不再横向滚动。
- **设置页里刚改动的开关不再先跳回原值**：改动交给宿主的这段时间里，宿主重读设置文档不会再把页面上的值盖回改动之前，控件停在读者按下的那一档，宿主给出答复时再按答复校正。
- **关闭「聊天区滚动动画」后，进行中的状态行留在文档里**：此时滚动整份交回宿主，这一行不再停在输入框上方，读者往回翻看时它随内容一起滚走。
- **窗口很窄时，思考强度按钮留在输入卡片里**：它在模型按钮旁边借的那点宽度改为从模型名的截断里出，输入卡片不再因此横向滚动，按钮也不会画到侧栏上方。
- **等待行加载点沿直线往返时走的是简谐运动**：三颗点在两端停顿、穿过中点最快，经过中点时缩到最小；此前它们匀速往返。

### 其他变更

- **内置文档与注释里重复的那一份清掉了**：每个功能签名上一律重复的三行参数注释、每个 `copy.ts` 里同一句「One key of this feature's own copy」、以及散在各处的「此前是怎么做的」「实测读到多少」一律删去；`constants.ts` 叠放的两段模块注释合成一段（顺带修掉一处注释里多出的星号），`shared/activity-phrase.ts` 的长注释压到约定长度并引用 D70，`docs/SETTINGS.md` 与英文版里三段与功能一览逐字相同的说明改成指向那一条。代码行为不变。
- **两道检查各补上一处**：750 行停线开始管单元测试文件（一个测试文件长过停线，就是一份文件装了几个题目）；整份文档查找的登记规则写明单元测试不在其内，测试里的文档跑在测试浏览器上，不花读者一分钱。`packages/contracts/src/timing.ts` 的 `host.column-observer` 添上持有它的那份单元测试，构建里「一条时刻假设要么点名场景、要么点名单元测试」的后半句从此有实例。

<h3 id="en-0.16.3">New Features</h3>

- **Beam rows draw the vendor lockup**: an id such as `opencode-go/beam-free` now claims Reflection's lockup. The wordmark is the vendor's, which the catalog's name never spells, so it leads the label; the mark wears the vendor's own brand colour on the ivory canvas and the label's ink on the warm black one.
- **The width and the folding follow Claude's own readings**: the left column drags down to 200px against the host's 264px, and its ceiling follows the window — clamp(⌊viewport⌋ - 330, 200, 420)px, which leaves the content column 330px. A drag below 100px, half the floor, folds the column on the spot and a drag back over that line brings it out again, each of the two being one layout swap with the body fading in over 300ms; a press and release on the handle (under 3px of travel) is the collapse toggle itself, and expanding the column comes back to the width you last dragged to.

### Improvements

- **The fade segments one rewrite or fold invalidates are taken out in a single in-place compaction**: taking one out used to move every segment after it, so a batch that invalidated many grew with the square of the segment count; one pass now writes them out. Nothing on screen changes.
- **The written-back tokens count the tool calls while an answer streams**: a call's arguments never appear on the page, so a step that only called tools used to stand still at the settled number; each call row now counts once, and the per-character share of plain text is closer to what the provider bills. The count rides on the page structure rather than a per-frame sweep of the conversation.
- **The waiting line swaps its words without forcing a synchronous style and layout pass**: the width a swap needs is heard from the render's own layout through a size observer, and the old words leaving, the new ones arriving and the width travel all start on the frame after, looking the same as before; on this machine's desktop app a `/perf-stream 150 tps=1000` run (one main session and two subagents) made 215 swaps up to about 435 conversation nodes with no layout read on the label, where each swap used to force two passes of 13.5–44 ms.
- **A conversation with many process groups switches with its summaries measured once**: across a 16-group switch the longest forced layout falls from about 360 ms to about 40 ms and the switch from about 0.58 s to about 0.33 s.
- **The waiting line's loader changes motion one set at a time**: the set leaving fades each dot out where it turns, and only once the last one has gone does the next set start from the top and fade its dots in, so the 18×14 box no longer crowds six or seven dots from two motions together for 400–650 ms.

### Bug Fixes

- **A heat cell's day tip no longer pushes the usage panel into a horizontal scrollbar**: the pill lines up with the side its own width needs, so a cell near either end keeps it inside the panel and hovering no longer scrolls the panel sideways.
- **A control just changed in the settings page no longer snaps back first**: while the change is crossing to the host, a re-read of the settings document no longer puts the pre-change value back on the page — the control stays where the reader left it and follows the host's answer when it arrives.
- **With the chat-area scrolling animation off, the running status line keeps its document place**: the host owns the scroll then, so the line no longer rests above the composer and wheels away with the content as you read back.
- **With a very narrow window the reasoning-effort trigger stays inside the composer card**: the room it borrows beside the model trigger now comes out of the model name's truncation, so the card no longer scrolls sideways and the trigger is never drawn over the sidebar.
- **The waiting line's loader dots walk their lines in simple harmonic motion**: each one rests at either end and is fastest through the middle, where it is smallest; they used to walk at a constant speed.

### Chores

- **The built-in documents and comments lose the copy that stood twice**: the three parameter lines every feature's signature repeated, the same "One key of this feature's own copy" line in every `copy.ts`, and the scattered notes about how the code used to work and what a measurement once read are gone; `constants.ts`'s two stacked module comments are one (and a stray asterisk in one of them is fixed), `shared/activity-phrase.ts`'s long comment is down to the length the conventions set with D70 cited, and the three paragraphs in `docs/SETTINGS.md` and its English twin that repeated the feature list word for word now point at it. No behaviour changes.
- **Two checks each gain one thing**: the 750-line stop line now covers unit test files (a test file past the line is one file holding several subjects), and the whole-document lookup register says plainly that a unit test stands outside it, since a test's document runs in the test browser and costs no reader anything. `packages/contracts/src/timing.ts`'s `host.column-observer` names the unit test that holds it, so the second half of "an assumption names a scenario or a unit test" has an instance.

## [0.16.2] - 2026-10-17

[中文](#cn-0.16.2) | [English](#en-0.16.2)

<h3 id="cn-0.16.2">新增功能</h3>

- **侧栏里进行中的对话标记可以换回滚动的圆环**：「动效」页新增「进行中的对话」一行，两张卡片带出「呼吸灯」（默认）与「滚动圆环」两档（设置项 `ongoingIndicator` 的取值为 `breathe` 与 `ring`）；侧栏里正在跑的那一行立刻换过来，动画设为「减弱」时两档都停住。

### 体验优化

- **上下文弹层里的数字改为连续计数**：弹层里那一列数字接到新读数时从眼前的数计数到新值，与输入卡片下面那一行同一套动作，不再逐字弹入；弹层每次打开都从当时的读数写起。
- **流式输出时，写回的 tokens 随文字上涨**：会话数字里写回的那一数在答案流式输出期间按已经到达的文字估算着上涨，不再等整段答案写完才跳一次；这一步结算时换成提供方给出的真实值，读入的 tokens、缓存命中率与计量饼的占用都不动。
- **流式输出时，上下文计量饼不再拖慢页面**：计量饼需要的两种颜色改在每一帧开头读取，回答流式输出期间不再让页面额外重算一次样式（本机实测：皮肤每次更新页面的耗时从约 37 毫秒降到约 14 毫秒，其中上下文组件从约 27 毫秒降到不足 1 毫秒）。
- **推理强度滑块不再在每次更新里重排页面**：滑块轨道与滑钮的宽度改在每一帧开头读取，卡片收起时也不再让页面额外排一次版（本机实测：推理强度选择器在每次更新里的耗时从约 18 毫秒降到约 1 毫秒）。
- **长对话流式输出时，消息折叠与推理窗口不再拖慢页面**：折叠用户消息所需的气泡查找、推理窗口所需的高度与样式读取，都改在每一帧开头完成，写入阶段不再让页面额外重算样式与布局（本机桌面端实测：消息折叠每次更新从约 6.8 毫秒降到不足 0.1 毫秒，推理窗口每帧从约 5 到 14 毫秒降到约 0.1 毫秒）。
- **计数中的上下文数字与等待计时不再让整页重算样式**：状态行与上下文弹层里随流式输出上涨的数字、等待行的计时，都改为原地改写文字，页面上其他插件的 `:has()` 规则不再因此在每一帧重算整页样式（本机桌面端实测：流式输出期间每帧少付约 10 毫秒的样式重算）。

### 问题修复

- **搜索面板的分类页签，按下哪一枚滑块就滑向哪一枚**：点「会话」「项目」这些分类时，背后的滑块在按下的一刻出发，不再等到列表下一次重绘才移动。
- **思考行回放推理时不再拖慢页面**：推理窗口里的文字每 0.84 秒平滑上移一步，一步追到最新一行，正在思考的回合里页面保持流畅（本机实测：修复前单帧最长 470 毫秒、主线程阻塞 406 毫秒，修复后 29 秒内没有超过 100 毫秒的帧）。
- **推理窗口的高度跟着文字一起长**：正在思考的回合里，推理每写出新的一段，窗口就在同一帧长到文字自己的高度，最新的几行不再被下缘裁住、等到下一个节拍才露出来；长到上限高度之后照旧按原来的节拍上移。

<h3 id="en-0.16.2">New Features</h3>

- **The sidebar's mark for a running conversation can be the turning ring again**: the Motion tab gains Ongoing conversations, whose two cards offer Breathing light (the default) and Turning ring (the `ongoingIndicator` setting is `breathe` or `ring`); the running row changes at once, and with Animation set to Reduced both stand still.

### Improvements

- **The context popover's figures count to their readings**: a row's number travels from the value on show to a new reading, the same motion the line under the input card makes, instead of each character popping in; a panel that opens writes the reading of the moment where it stands.
- **The tokens written back climb while an answer streams**: the session numbers' written-back figure grows with the text that has arrived instead of standing still until the answer ends, and takes the provider's own number once that step settles; the tokens read in, the cache-hit share and the meter's occupancy stay as they were.
- **The context meter's pie no longer slows the page while an answer streams**: the two colours the pie is drawn in are read at the start of each frame, so a streaming answer no longer makes the page recompute its styles a second time (measured locally: each of the skin's page updates went from about 37 ms to about 14 ms, the context component's share from about 27 ms to under 1 ms).
- **The reasoning-effort slider no longer lays the page out again on each update**: the widths of its track and knob are read at the start of each frame, so the slider no longer costs the page an extra layout, its card closed or open (measured locally: the effort picker's share of each update went from about 18 ms to about 1 ms).
- **Message folding and the reasoning window no longer slow the page while a long conversation streams**: finding the bubble a user message folds on, and reading the reasoning window's heights and styles, happen at the start of each frame, so the writes that follow no longer make the page recompute its styles and layout a second time (measured locally on the desktop app: each message-fold update went from about 6.8 ms to under 0.1 ms, the reasoning window's frame work from about 5–14 ms to about 0.1 ms).
- **Counting context figures and the wait timer no longer make the whole page recompute its styles**: the figures that rise with a streaming answer on the status line and in the context panel, and the wait line's timer, rewrite their text in place, so another plugin's `:has()` rules on the page no longer recompute the whole page's styles every frame (measured locally on the desktop app: about 10 ms less style recalculation per frame while an answer streams).

### Bug Fixes

- **The search palette's filter highlight follows the tab pressed**: the sliding background starts toward a pressed category — Sessions, Projects and the rest — within the press itself, instead of waiting for the list to be drawn again.
- **Replaying the reasoning in the thinking row no longer slows the page**: the text in the reasoning window glides up one step every 0.84 seconds, each step reaching the newest line, and the page stays smooth while the model thinks (measured locally: the longest frame went from 470 ms with 406 ms of main-thread blocking to no frame over 100 ms across 29 seconds).
- **The reasoning window grows with its text**: while the model reasons, the window takes the text's own height within the frame the text arrives, so the newest lines are no longer held behind its lower edge until the next beat; once the window reaches the cap it steps up on the same clock as before.

## [0.16.1] - 2026-10-17

[中文](#cn-0.16.1) | [English](#en-0.16.1)

<h3 id="cn-0.16.1">新增功能</h3>

- **读者自己发出的长消息可以收起来**：一条比对话装得下的更长的消息收在一个上限高度里，下缘渐隐，气泡下面多出一个「展开全文」；按下它整条消息放回来，再按收起，按过之后这条消息在本次会话里保持读者选的样子。消息一出现就收，宿主那一条即时回显也一样，之后换成正式那一条时仍然收着；附件、时间与复制按钮都不受影响。设置页把「自动开合与卷帘门」关掉时这项跟着关掉。
- **新会话页有了水波纹字符背景**：页面背景是一片每秒重绘两次的数字与字母，被缓缓漂移的云层遮住；点击页面荡开水波，波速在点击处最快、越远越慢，被扫过的字符显现出来，波前染蓝、尾迹留灰并淡去。设置页「外观」页首页版面下新增同名开关，默认关闭、标题旁带「实验性」标记，设置存为 `homeRipple`；宿主半边是旧版本时（更新插件后没有重启宿主），这一项改动保存不下来，重启宿主后恢复正常。
- **设置页「通用」多了页面缩放**：整页按 0.8x、1x、1.25x、1.5x 绘制，界面、文字与控件一起变大或变小，窗口尺寸不变、页面按缩放之后剩下的空间重新排布，「随系统」保持系统与 DSH 给出的尺寸；设置页自己也按同一倍数绘制，档位可以在这一页上直接比出来。贴着输入区展开的模型、努力度与权限弹层仍与各自的按钮对齐。设置存为 `pageZoom`。
- **代码字体先试 Anthropic Mono**：把 Anthropic 的等宽字体装进系统或放进 `$DSH_HOME/dsh-claude-style/fonts/` 之后，代码块、行内代码与等宽标签都由这款字体绘制；没有这份文件时仍用随包分发的 JetBrains Mono，中文照旧落到系统中文字体。字体文件只在仓库里提供，npm 包不带。

### 体验优化

- **页面缩放的标题旁标出「实验性」**：设置页「通用」页的「页面缩放」一行带上一枚实验性标签，与插件页标记实验性插件的那一枚相同。
- **深色弹层的边只剩边框本身**：皮肤自建的弹层卡片与它重绘的账户菜单、首页选择器不再在边框外侧铺一道 3px 的黑色沉降，卡片的外缘就是那道高光边线，两层投影照旧。
- **工作台首页的问候语与用量面板之间只剩一个列间距**：标题块不再为下方预留 30px，面板随之整体上移 30px，问候语与面板之间只留首屏列自己的 10px 间距；经典版面上问候语与输入卡片之间的那份间距保持原样。
- **主题风格的两张卡片左图右文**：Claude 卡片是星芒标志加 Claude 文字标志，DeepSeek 卡片是它的标志与文字合成的一件图形，均沿用插件已有的图形资源，不再另写文字。
- **「动画」设为「减弱」时，动效页的预览卡仍能分清两档**：状态行画法、光标动画、新文字淡入与消息气泡动画的卡片各停在一帧——扫光的高光带停在字中、光标带滑行拖尾、末几个字停在渐淡的各档、气泡停在长大或升起的途中；卡片略变暗，行下方写明这一项此时不生效，选择仍可修改。
- **上下文占用那一环改成一枚饼**：已占用与未占用画成两段同心扇区，少数的那一块撑到画布半径、多数的那一块往里收一档，收多少随占用比例变化——越接近对半越小，15% 与 85% 互为镜像，对半时是两枚等大的半圆。两块之间是一道 1.2px 宽的缝，由两条描边各让一半：占用那块的一条从满宽收到 0，未占用那块的一条反过来，读数跨过对半时两边都不跳；撑出去的那一块压在上面。色带照旧按占用取色，读数与这一块同色；触发按钮的位置与高度、输入行给它留的宽度都不变，饼比原来那枚图标大一圈、与它同中心。
- **独立成行的数字改成从当前读数计数到新读数**：每个数字都留在原位连续增长（或减少）到新值，答案流式输出期间接连更新时后一次从当时显示的值接着走，切换会话时也从上一段的数字计数到新一段的。缓存命中那一截的色带只染数字与百分号，「缓存命中」四个字留在这一行自己的颜色。
- **五个开关改成直接装卸**：关闭输入框插入符动效、吉祥物、模型选择器、侧栏账号区或输入区重绘范围时，对应功能自己的监听、尺寸观察者与每帧同步一并撤掉，宿主原来的界面随即回来；重新打开就在原位装回并重画，不用刷新页面。Ctrl+, 打开设置的快捷键改由设置页承担，关掉侧栏账号区之后仍然可用。
- **远程页面上的设置也能改**：宿主把它信任的地址上打开的页面当成同一个使用者的页面，经局域网地址或隧道打开的页面现在与运行 DSH 的电脑上那一页读写同一份设置，任意一边改动，另一边不需要刷新就会跟上；设置页不再带着说明行把控件全部禁用。

### 问题修复

- **长消息的起飞带着消息自己的字**：折叠收住的长消息在飞行时，替身从第一帧起就显示这条消息的开头，也就是它落到那一行里显示的内容；盒子从输入框自己的高度收拢到折好之后的高度，读者看到的是消息从输入框里出来、一边飞一边收成它自己的样子。
- **另一款皮肤作画时本主题整页让出，设置页也随主题撤下**：页面上的侧栏、对话、输入区与设置页一起离场，只留那款皮肤与宿主自己的界面；在皮肤中心里本插件那一行选回本主题，这些内容与读者存下的偏好一起回来。
- **深色模式下分段控件的滑块有了底色**：设置页的页签与并排开关、经典首页的权限分段这几处同一种控件，当前项在深色里读得出来——滑块比它的底座亮一档，不再与底座同色；浅色与 DeepSeek 深色配色下同样成立。

### 其他变更

- **用户消息的两处宿主查询移进引擎层**：气泡的查找（按是否真的刷上底色逐层向下）与用户行的选择器此前分别写在 chat-send 与 scroll-owner 里，折叠消息也要用它们；现在都放在 `packages/engine/src/chat-dom.ts`，两处改为引用，颜色分量与透明度的读取也一并搬过去。读者看到的行为不变。

<h3 id="en-0.16.1">New Features</h3>

- **A long message the reader sent can be folded away**: a message taller than the conversation can spare is held under a cap with its bottom edge softened, and the skin draws a Show the whole message control under the bubble; pressing it hands the whole message back and pressing it again folds it, and after that the message keeps what he chose for the rest of the session. The fold lands as soon as the message does — the host's own echo included — and stands when the durable row takes its place; the attachments, the time and the copy action are untouched. Turning the chat area's folding off turns this off with it.
- **The new-conversation page gets a ripple glyph background**: the page's background is a field of digits and letters redrawn twice a second under a slowly drifting cloud; a press sends out waves that are fastest at the click and slow with distance, and the characters a wave passes show, blue at its front and grey in its wake before fading. A switch of the same name sits under the home layout on the Appearance tab, off until it is turned on and marked experimental, stored as `homeRipple`; with an older host half still running (the plugin updated without restarting the host), a change to it does not save until the host restarts.
- **The settings page's General tab gains page zoom**: the page is drawn at 0.8x, 1x, 1.25x or 1.5x — the interface, its text and its controls growing or shrinking together while the window keeps its size and the page lays itself out in the room left over — and Follow the system keeps the size the system and DSH give it; the settings page is drawn at the same scale, so a level can be compared on it. The model, reasoning-effort and permission popovers that open off the composer stay on their own triggers. The setting is stored as `pageZoom`.
- **Code is drawn in Anthropic Mono first**: once Anthropic's mono face is installed on the system or dropped into `$DSH_HOME/dsh-claude-style/fonts/`, code blocks, inline code and the mono labels take it; without the file the JetBrains Mono copy the package carries still answers, and Chinese text keeps falling through to the system's Chinese faces. The face is served from this repository only, not from the npm package.

### Improvements

- **Page zoom is labelled experimental**: the row on the settings page's General tab carries the experimental tag, the same one the plugin page marks an experimental package with.
- **A dark popover's edge is its border again**: the skin's own popover cards and the account menu and hero-row pickers it repaints no longer lay a 3px black falloff outside the border, so the card's outer edge is the highlight line itself and the two drops stay as they were.
- **The studio home's greeting and usage panel sit one column gap apart**: the headline block no longer reserves 30px below itself, so the panel moves up by 30px and only the hero column's own 10px gap stands between them; the classic layout keeps the spacing under its greeting.
- **The theme style cards read mark left, word right**: the Claude card carries the starburst beside the Claude wordmark and the DeepSeek card its mark and word as one lockup, both from the plugin's own artwork instead of typed text.
- **While Animation is Reduced the Motion tab's cards still tell their two choices apart**: the status paint, caret, text fade and message entrance cards each hold one frame — the sweep's band parked mid-word, the caret with its glide trail, the last characters on their fading steps, the bubble part-grown or part-risen; the cards dim and the row says the choice takes no effect now, while it stays editable.
- **The context meter's ring is a pie**: the occupied share and the rest are two sectors on one centre. The smaller share keeps the box's radius and the larger one steps in by up to 1.3px, easing to nothing as the split comes even — so 15% and 85% mirror each other and an even split is two half discs of one radius. The 1.2px seam between them is shared by two strokes, the occupied sector's running from its whole width down to nothing and the plate's the mirror, so no edge jumps as the reading crosses the even split, and the part that stands out is painted last. It still takes the colour band its occupancy falls on, and the reading beside it is painted the same colour. The trigger keeps its box, its height and the room the row keeps for it, and the pie is one pixel larger than the old icon on each side, centred on it.
- **The line of numbers counts to a new reading from the one it shows**: each figure stays where it is and grows (or falls) continuously to its new value, a reading that lands while the count is in flight carries on from the value on show, and another session's numbers are counted to from the ones the line was showing. The cache share's colour band marks its figure and percent sign alone, the words before them keeping the line's own tone.
- **Five switches now install and remove their feature whole**: turning off the composer caret motion, the mascot, the model picker, the sidebar account area or the composer restyle's scope takes that feature's listeners, size observers and per-frame work off the page with the host's own interface coming back, and turning it on again installs it in place and repaints without a reload. The Ctrl+, shortcut for settings now belongs to the settings page, so it keeps working with the sidebar account area switched off.
- **Settings can be changed from a remote page**: the host treats a page opened at an address it trusts as the same reader's page, so a page reached through a LAN address or a tunnel now reads and writes the same settings document as the page on the computer running DSH — a change made on one side reaches the other without a reload, and the settings page no longer opens with a notice and every control disabled.

### Bug Fixes

- **A folded message's flight carries the message's own words**: the stand-in of a long message the fold holds shows the message from its own first line — what the row holds — from its first frame, and its box closes from the composer's own height down to the folded one, so the reader watches his message leave the composer and settle into the shape it lands in.
- **With another skin painting the page this skin hands over the whole page, its settings page included**: the sidebar, the conversation, the composer and the settings page all leave together, and the skin and the host paint the page alone; picking this plugin's row in the skin center brings them back together with the preferences the reader saved.
- **The segmented controls' slider carries a fill in dark mode**: the settings page's tabs and paired switches and the classic home's permission presets show which item is current, the pill sitting one step lighter than its groove instead of the same grey; the light and DeepSeek dark palettes read the same way.

### Chores

- **Two host reads of a user message moved into the engine**: the bubble lookup (walking down to the first element that really paints a fill) and the user row selector lived in chat-send and scroll-owner; the message fold needs both, so they now stand in `packages/engine/src/chat-dom.ts` and the two former homes read them from there, with the colour-part and alpha reads moved along. Nothing the reader sees changes.

## [0.16.0] - 2026-10-16

[中文](#cn-0.16.0) | [English](#en-0.16.0)

<h3 id="cn-0.16.0">体验优化</h3>

- **用量记录的体积缩到约四成**：记录里一天的量按路由存放（模型，以及没有归到任何模型的余量），当天总量由这些路由相加得出，小时直方图只记非零的格子，日志已不在的会话不再存指纹。用本机上这一份记录量：146 KB 降到 57 KB，一趟只剩解析与写回；与记录一致的那一趟不再写盘。
- **界面每帧少做整份文档的查找**：查不到东西的查找此前每趟刷新都重新走一遍整份文档，而绝大多数页面上这些座位本来就不存在——会话页没有首屏根，对话框没打开时没有设置导航列。现在这类「什么都没找到」的答案在页面结构变化之前一直有效；设置页的导航格、侧栏的已归档清单清理、账户卡片的清理都收窄到它们各自所在的侧栏里。在 28568 个节点的页面上量同一个回合：插件发出的整份文档查找从 584 次降到 395 次，其中首屏根的查找从 273 次降到 26 次。
- **长对话里收走状态行的那一趟不再按对话长度平方增长**：宿主一次交还多行时，插件要把每一行还站着的状态线摘掉，此前每条站着的线都要在一份运行行清单里从头找一遍。现在这份清单改作一次集合，摘除的一趟随行数线性走完。
- **滚动动效的断言不再随机器快慢变化**：跟随的追赶与流式滑行此前在几个钟点上各读一次距离，忙碌的机器上读到的差值不同；现在探针从滑行开始的那一帧起逐帧记下距离，断言改成这条记录的不变式——开头离终点很远、每一帧只朝终点靠近、中间至少经过两个不同的值、末帧落在终点、结尾连续若干帧都停在终点。阈值与帧数住进 `packages/testing/bounds.json`，`scripts/lint.mjs` 新增一条规则：台账里每条边界都要有名字、有限的值与理由，被检查读到的名字必须在台账里，台账里没人读的条目要被拿掉。
- **账户页脚那一块不再靠 `!important` 取胜**：`packages/client/src/features/account/account-footer.css` 里那 79 处 `!important` 去掉了，主机账户行、账户菜单、头像与皮肤画布、抽屉里的行与悬停这些都改为按选择器本身的权重压过去——皮肤的选择器本来就带 `body[data-dsh-claude-style]`，比宿主那些单个类名的规则重。这些声明此前压在宿主账户菜单元素上，那个形态的走查读不到，所以从没被判定过是否必要。`importance` 场景重新走了一遍：每一处都判定过，没有一处多余，十六处仍然必要（压的是宿主的内联样式）；账户菜单那四条选择器因此从「够不到」登记表里划掉。顺带把账户菜单与首页两个菜单的行样式合成一处按两个标记写（此前两处一模一样，去掉了 `!important` 才看得出重复），首页那份只留自己独有的禁用态与选中标记。页面外观不变：外观快照五十个页面状态逐项一致，账户与首页相关用例全过。
- **页脚接管那一块也不再靠 `!important`**：`packages/client/src/features/account/footer-takeover.css` 里那 43 处 `!important` 去掉了——页脚各容器归零、镜像条目塌缩、侧栏收成细轨时的账号按钮与弹层、以及细轨里隐藏设置入口的那些规则，改为按选择器本身的权重压过去（这份表排在自己的基础规则之后，且每条都点名了细轨、页脚与它要的那一行）。`importance` 场景重走：422 处声明全部判定过，没有一处多余，十六处仍然必要；台账随之写下 422 条。外观快照五十个页面状态逐项一致。
- **状态行里的说法改为放不下才截断**：模型自己写的推理从句、命令调用声明的说明、正在操作的文件名此前都按字数上限截断（分别 40、40、32 字），宽窗口里也照样在同一个字数上断开，读者看到的是一句被切掉的话。现在这三种说法整句带到这一行，放得下多少由这一行的宽度决定：宿主那一行的内容盒此前不设宽度上限，长说法会顶着计时与徽标一直伸出对话列；它现在取所在行的宽度，说法在自己的盒子里截断并画省略号，加载点、计时与徽标留在原处。
- **状态行里的从句不再被名字里的点号截断**：这一行从推理正文里取模型自己那句话时，句子在哪里断开此前由一张手写的收尾标点表决定，于是文件名、版本号与缩写里的点号都被当成句末——正在读 `app.js` 的说法写成「Reading app」，正在看 `package.json` 写成「Checking package」，缩写处更只剩下一个字母。现在句子的边界交给页面自己的句子规则，说法从分词一直带到这一句真正结束的地方；同时助动词与分词之间的一两个词（now、currently、still、just 等）与完成进行时（I have been checking）也能读出来，此前这些句子整句读不出，这一行只会退回「正在思考」。否定的句子与还没动手的打算照旧不读。
- **状态行里的从句站到下一次意图到达为止**：模型在快速输出时每秒写下好几个句子，从句与从句之间那几拍（推理读作「正在思考」，或刚起一步还没写下什么）此前会把刚说出的从句顶掉，读者看到的是一句话闪一下就退回「正在思考」，再闪一下又说下一句。现在模型自己那句从句在下一次意图到达之前一直站着——新的从句、调用自带的说法，或写回答、调用工具这类状态一到才改口；「精确状态行」关掉时不读从句，这一条不适用。一个说法锁一秒的规则不变，这条锁也因此落在说法上而不是落在行上：宿主在步骤之间重建那一行时，这一轮站着的说法与它的锁跟着这一轮走，不会重新从零开始。
- **状态行与过程组标题的扫光改用宿主自己的做法**：高光带由一层带遮罩的窗口与其中一份着色的文字副本反向平移组成，两半都是位移动画，由合成器播放，不再每帧重绘；节奏、步进、0.3 秒的起始延迟与遮罩都与宿主的行一致。回合进行中的页面上不再有运行中的绘制型动画。
- **深色下的边框改为一层高光**：`--dsw-alias-border-l1`/`-l2`/`-l3` 的深色取值从 `#242320`/`#2e2c29`/`#3a3833` 三个实色改为同一个透明白在 `.09`/`.18`/`.30` 三档，卡片、面板、代码块与小徽标的外缘因此读作顶光打出的倒角高光，而不是需要在每种底色上重新配色的轮廓线；浅色的三档仍是暖色实色。
- **弹层的边缘留在边框上，深色在外侧多一道沉降**：皮肤自建的弹层卡片与宿主自己的账户菜单、首页选择器不再把边线挪进投影——线仍是卡片自己的边框（浅色用边框色，深色用深色阶梯那格高光），排布读到的那只盒子和开启动画缩放的绘制路径因此与从前一致；深色在外侧加一道 3px 暗色沉降，把受光的边与近黑画布隔开；投影同时收成 `0 8px 24px` + `0 2px 6px`，深色加深到 `rgba(0,0,0,.65)` / `rgba(0,0,0,.45)`。
- **侧栏与对话栏之间的分割线收到发丝细边**：这条线从 1px 改为 0.5px（Windows 桌面顶栏里它的延续段同步改），在高分屏上正好是一个物理像素，与产品自身的取值一致；Markdown 表格外框与轨迹胶囊原本就是 0.5px，其余单向细线仍是 1px。
- **用户消息气泡改用写定的一对底色**：`--dsw-specific-bubble` 在 Claude 配色下不再借用按钮悬浮灰，改为浅色 `#f0f0ef`、深色 6% 白；深色此前没有取值，会回落到宿主自己的深蓝，现在这一格由本插件写定。浅色没有采用产品自己那格偏蓝的底片——它贴在这张暖色画布上会发蓝，改用皮肤已有的中性底衬（表头同值）；设置页的消息气泡演示读同一个令牌，随之一起变。
- **流式输出的平滑跟随交给显卡来画**：输出期间滚动位置由宿主自己的跟随写到末尾，皮肤不再逐帧改写位置，只把新长出的内容从下缘滑上来，状态行停在原处不动。宿主的跟随在整段输出里保持开启，回到底部按钮不再需要藏起来。在本机同一段快速输出里量：最新内容落后于静止位置的距离中位数从 31 像素降到 26–28 像素，最大值从 73 像素降到 62 像素，每 4 秒的布局次数从 49 次降到 44–45 次。
- **弹层里的分隔线统一成宿主那一根，并由一处决定**：宿主菜单自己画的 `[role="separator"]` 与皮肤自己建的分隔（模型选择器的页脚分隔、供应方标题那条线）现在都是同一根 0.5px 的 `--dsw-alias-border-l2`，写成零高度盒子上的上边框而不是半个像素高盒子的底色，线因此属于排版而不是随开启缩放改变厚度；那条通用的规则落在共享外壳里，皮肤自己的卡片与它重绘的两个宿主菜单一起受它管辖（此前只有账户与首页两个菜单各写一份 1px），模型选择器的两个页脚上边框也从 1px 收到 0.5px。

### 问题修复

- **删除对话不再带走它的用量**：面板的账此前每趟都从现存的会话日志重算，日志一删，那个会话的日子就从「全部」里消失。现在本地的这本账记在插件自己的目录里，日志已不在的会话照旧留着它结算过的日子，面板继续给出这些日子的 tokens、模型排行与小时分布；早先留在折算缓存里的日子在首次读取时迁移过来。
- **用量记录不再被覆盖掉**：记录解析不了时改名为 `usage.json.corrupt-<时间戳>` 留在插件目录里，再从会话日志重建；同一个 `$DSH_HOME` 下开着几个实例时，每次写回先合并磁盘上的那一份，另一个实例记下的会话不会被盖掉；旧的折算缓存在记录写成功之后删除。
- **侧栏页脚的插件条目全部收进账号区**：动作槽里的条目与别的插件直接挂在页脚上的卡片（用量卡片这一类）都收进账号弹层，卡片保持它自己的样子，侧栏底部只剩账号这一行，条目自带的行内样式一并让位；`importance` 台账随之记到 424 处。
- **带供应商命名空间的模型标识也认得出厂商标**：网关把模型标识写成 `cn:hy3` 这类带前缀的形状时，混元系列的模型行照常画出厂商组合标，模型列表的第一级也一并给出它的说明文案。规则的分段起点改为任何不是字母或数字的字符，`shy-mt2` 这类标识仍不被认领。
- **同一处分段起点下的其余模型也认得出厂商标**：`kimi-k3`、`minimax-m3` 这一类带服务方命名空间的标识此前也不被认领，`o3` 那一条只认冒号以外的分隔符；现在 K3、M3 与 o 系列的规则与混元那条读同一个分段起点。`nova` 那条补上分段边界，`sensenova-6.8-flash-lite` 不再被判成 Amazon Nova、标记也不再插进模型名中间。
- **Claude 品牌下的扫光不再是蓝色**：宿主在运行行上把扫光换成 DeepSeek 的蓝色，状态行的高光因此一直是蓝的；现在 Claude 品牌下状态行、过程组标题与宿主自己的调用行都用同一道暖色高光（暗色为 `#faf9f5` 的 45%，亮色为 `#141413` 的 30%），DeepSeek 品牌下仍是宿主的颜色。
- **在侧边栏或旁边的子代理转录里滚动、点击，不再让主会话停止跟随**：只有落在主会话滚动区里的滚轮、按压与拖动，以及没有焦点时按下的滚动键，才算读者离开了末尾；之前页面上任何一处的滚轮或点击都会让主会话停在原处，流式输出不再往下跟。
- **状态行不再把引用里的话当成模型在做的事**：模型在推理里引用它读到的一句话，或者在推理里讨论这一行自己那个等待词时，这一行会把那段引用连同后半句一起说成自己的动作。现在引号里（「」『』“”与英文双引号）的内容不参与从句判定，从句也不在那里断开：模型引用什么，读者不会在状态行上看到它被说成模型在做的事；模型自己那一句里带引号的部分照旧原样带出。顺带把中文的「正在」判定撤掉：它与这一行的等待词同形，没有词表能把「正在读取 app.js」与一句关于这一行的话分开，中文推理回到说等待词。

### 其他变更

- **样式表里判断「谁包含谁」的规则改为读一处标记**：此前 16 条规则用 `:has()` 问浏览器「这个元素的子树里有没有那个部件或标记」，页面下方每次变化这些规则都要重新匹配。现在盖部件的同一趟走查顺带把答案写成一处标记，规则只读这处标记；页面上的 `:has()` 只剩进入作用域的两处与跟随焦点状态的一处。构建同时开始拒绝在 `:has()` 里读属性、核对每个标记都有声明的来源、并核对声明里的部件名。
- **每趟刷新与每一帧上的整份文档查找改走记下的答案**：界面切换的横带每趟刷新要问八次「对方的控件在不在」「侧栏的切换键在不在」「窗口菜单在不在」，聊天跟随每帧要问一次「宿主还在流式输出吗」，桌面端的页头每趟刷一次「窗口菜单在哪」——这些座位在多数页面上根本不存在，而每次问都要把整份文档走一遍。这一次改掉九处（界面切换七处、页头一处、聊天跟随一处）：这些答案由宿主访问模块记住，页面结构变了才重新查找；聊天跟随改在消息列里读那个标记，与它自己的另一处读法一致。剩下的四十六处逐条登记在册并写明缘由，脚本会拒绝新增的查找，也会拒绝与代码对不上的登记。
- **检查接受的数值成了一份会被核对的记录**：一个检查失败时，最省事的回应是把表达式里那个数字放宽，而这一步此前不留痕迹。现在两个通道里每个检查所决定的数字字面量都写进 `packages/testing/check-numbers.json`（`npm run checks:numbers` 生成），闸门与云端核对这份记录：改动一个检查接受的数值，记录跟着变，放宽因此在 diff 里看得见。需要理由的边界本身继续住在 `packages/testing/bounds.json` 里，每条带 `reason`，检查读它。
- **每处保留下来的 `!important` 都记下它压过谁**：重要性走查此前只回答「去掉它画出的样子变不变」，现在把判定为需要的每一处写进 `packages/testing/importance-ledger.json`——在哪个页面形态上判定需要，以及去掉重要性之后接过这个属性的候选（元素自己的行内样式、宿主的 `!important`、宿主权重更高的规则、皮肤的另一条规则）。走查把该处的重要性单独去掉，按属性展开的每一条长属性读页面退回的值，再逐个拿走其余候选：值动了的那些就是它压过的。台账里新出现或不再需要的条目会让走查失败，`DSH_IMPORTANCE_LEDGER=write` 从一次运行重写它，差别在 diff 里读。本次十六处里三处认出了对手，其余记作未认出（走查读不到那个候选）。
- **构建要求每一处 `!important` 都有页面上的依据**：重要性走查现在把读到的每一处声明都写进 `packages/testing/importance-ledger.json`——判定为需要的连同它压过的候选，页面形态够不到的连同判定它的结果（从未匹配到元素、只在短暂标记下生效、第三方应答、伪元素读不到计算值）。样式表构建核对这份台账：产物里任何一处 `!important` 不在台账里就直接构建失败，并指出是哪些声明。
- **检查用的边界集中到一张表，每条带理由**：跟随末尾允许落后多少、长会话里一帧最长多少、长时间任务一共允许多少，这些「量出来的读数」的上限此前写在各自模块的常量里，现在住在 `packages/testing/bounds.json`，检查经 `packages/testing/bounds.cjs` 读它。放宽一个边界因此是这一个文件里的一行，理由就在旁边；余下的边界随迁移继续搬进来。
- **其余十个读数上限也搬进边界表**：门闩滚动与落定的等待、门户两侧取样的帧数、跟随末尾的贴齐余量、行与栏是否成一条线的容差、动效落定的等待、远端页面跟随本机改动的时限、设置快捷方式与设置对话框的等待、状态行换词的间隔——这些常量原来各自写在场景模块里，现在住在 `packages/testing/bounds.json`，理由照抄它们原本的注释，场景经 `packages/testing/bounds.cjs` 读。
- **宿主那张菜单卡片的查找收进一处**：账户菜单每趟刷新都要问「宿主开着的那张菜单在哪」，此前它把页面上 `[role="menu"]` 全查一遍再逐个挑出不是本插件的那张。现在这条查询由宿主访问模块记住答案（菜单是节点来了又走，答案只在页面结构变化后重查），登记表里这一条欠账随之划掉。英雄首页那一处同样的查询留给下一轮改用同一处访问器。
- **英雄首页那张选择器卡的触发点也记住答案**：输入卡片上那个工作区触发点与首页那一行是同一个选择器的两种入口，每趟刷新都要在整份文档里找一遍；现在由一处记住的查找（结构变化才重查）供着。登记表里这一条从三处降到两处，剩下的两处要的是活清单而不是单个元素，理由写在登记里。
- **首页那张宿主菜单卡也走同一条查找**：英雄首页把卡片落位前要问「宿主开着的那张菜单卡在哪」，此前它自己在整份文档里查 `[role="menu"]` 并挑出不是本插件的那张；现在改用宿主访问模块里记住答案的那一处（打开一张菜单会把外壳里别的菜单折起，所以开着的宿主卡片就是这一张）。登记表里这条从两处降到一处——剩下那一处要的是活清单（首页那一行可能同时开着多个选择器）。
- **两份决定草稿的现状跟上已落地的部分**：整份文档的查找记账现存四十三处，`importance` 台账覆盖全部五百三十九处 `!important` 且构建要求每一处都在册，边界表已有十四条由 `packages/testing/bounds.cjs` 供各场景读取，检查表达式里的其余数字由 `check-numbers.json` 记录并核对。
- **侧栏分区的标题改由总线登记表供着**：工作区视图每趟刷新都要在整份文档里查一遍分区标题，再挑出带列表区的那个；现在标题清单由观察总线按选择器登记、随页面变化增量维护（D40），每趟刷新只在清单里挑一次，标题与布局都不变时不再走文档。登记表里这一条欠账划掉，现存四十二处。
- **登记一处查不到的原因，免得下一轮重走**：首页那一行「开着的选择器」看的是宿主写在常驻节点上的 `aria-expanded`，而观察总线的登记表跟的是节点增删——改用它会把已经关掉的选择器继续算作开着（冒烟里八条检查当场这么判）。这一处的理由因此改写清楚：要的是「属性一变就作废」的答案，得由它自己的读取或当趟已经拿着的行来给。
- **对手分类按走查自己的口径补齐两处，并记下试过的死路**：判定为需要的依据里包含「去掉重要性之后有过渡开始」，分类现在也把这一条算作「这个候选正托着值」；同一条规则里与简写并排写的长属性（`border` 旁边的 `border-color`）此前被整条跳过，现在也是候选。两处补齐没有改变本次的归属数（仍是十六处里三处），台账的说明把试过的三条死路一并写下：过渡、同规则长属性、以及只看第一个匹配元素。
- **冒烟的静置判定补上「没有还在跑的有限动画」**：此前只等「连续若干帧没有新的一趟」加「一段时间没有新的趟」，进场、换词、淡入这类动画还在飞的时候读数照样被采走。现在两者之外再要求页面上没有仍在运行的有限动画（无限循环的那种不算：正在进行的会话灯与扫光本来就不落地）。整条冒烟 50/50 通过，耗时未变（93.7 秒）。
- **外观层与它的闸门落地**：冒烟走查的每个页面状态现在按部件记一份计算值快照（只收与字体无关的属性：颜色、边框、圆角、阴影、层叠与溢出），第一版覆盖五十个页面状态、十二个部件；快照进版本管理，`npm run verify` 的 `appearance` 闸门把这次走查读到的值与它逐项比对。`scripts/ci-scope.mjs` 增加一条拒绝：`packages/testing/appearance.json` 变了而 `packages/client/src` 没变的推送不通过——快照是页面的样子，只随画它的样式表移动；云端两个工作流都接上了这条。顺带把「工作树改了哪些路径」的读取收进 `scripts/shared/changed-paths.mjs`，此前它有两份。
- **方向记录改成一条方向一页**：每条方向只写它回答的背景、决定、由此而来的后果与重审条件，文件路径、函数名、数值与计数由代码注释、`ARCHITECTURE.md` 与测试承担，因此一次不改变方向的代码重构不再让方向记录过时；`docs/adr/README.md` 与作废编号的清册由 `npm run docs:index` 生成，编号作废之后不再复用。

<h3 id="en-0.16.0">Improvements</h3>

- **The usage record shrinks to about two fifths of its size**: a day is stored per route (a model, plus the remainder no model claimed), the day's own total is the sum of those routes, the hour histogram keeps its non-zero slots alone, and a session whose log is gone no longer carries a fingerprint. Measured on this machine's own record: 146 KB becomes 57 KB, and a pass pays for parsing and writing alone; a pass that matches the record writes nothing.
- **Fewer whole-document lookups per frame**: a lookup that found nothing used to walk the whole document again on every pass, while on most pages the seat it asks for is simply absent — a conversation page carries no hero root, and the settings navigation column does not exist until the dialog opens. That "nothing matched" answer now stands until the page's structure changes; the settings navigation cell, the sidebar's archived-list sweep and the account card's sweep are scoped to the sidebar they live in. Measured over one turn on a page of 28568 nodes: the skin's whole-document lookups fall from 584 to 395, and its hero-root lookups from 273 to 26.
- **The pass that takes the state lines down no longer grows with the square of the conversation**: when the host hands back several rows at once, the skin takes the status line off every row that still stands, and each standing line used to search the running-row list from the start. That list is a set now, so the pass walks it once per line.
- **The scroll motion assertions no longer move with the machine**: the follow's catch-up and the stream glide each took a distance reading at a few clock points, and those readings differ on a busy machine; the probe now records the distance frame by frame from the frame the walk starts, and the checks ask that recording's invariants instead — the run starts far off the end, every frame closes on it, at least two different values lie between the two ends, the last frame is at the end, and the frames it ended on all still read the end. The thresholds and frame counts live in `packages/testing/bounds.json`, and `scripts/lint.mjs` gained a rule: every bound in the table carries a name, a finite value and a reason, a name a check reads has to be in the table, and an entry nothing reads comes out.
- **The account footer no longer wins with `!important`**: the 79 `!important` declarations in `packages/client/src/features/account/account-footer.css` are gone, and the host account row, the account menu, the avatar and skin canvas, and the drawer's rows and hover states are now carried by the selectors' own weight — every skin selector starts with `body[data-dsh-claude-style]` and outweighs the host's single-class rules. Those declarations sat on host account-menu elements, which the walk's page states never reach, so none had ever been judged. The `importance` scenario was walked again: every declaration decided, none superfluous, the sixteen still needed beating a host inline style, and the four account-menu selectors struck out of the unreachable registry. The account menu's rows and the home page's two menus now state their row style once, for both markers together (the two copies were identical and only the dropped weight made that visible); the home sheet keeps what is its own — the disabled state and the selected mark. The pages look the same: the appearance snapshot matches across all fifty page states and the account and home cases pass.
- **The footer takeover no longer wins with `!important` either**: the 43 `!important` declarations in `packages/client/src/features/account/footer-takeover.css` are gone — the footer containers collapsing to zero, the mirrored entries folding away, the account button and popover in the collapsed rail, and the settings entry hidden there are now carried by the selectors' own weight (this sheet loads after the base rules it stands over, and every selector names the rail, the footer and the row it means). The `importance` scenario was walked again: 422 declarations, every one decided, none superfluous, the sixteen still needed unchanged, and the ledger now records those 422. The appearance snapshot matches across all fifty page states.
- **The status line cuts a wording only where it no longer fits**: the clause the model's own reasoning hands the line, the description a command call declares, and the name of the file a call works on were each cut at a character cap (40, 40 and 32 characters), so on a wide window a reader still saw a sentence broken at the same count. All three are now carried whole, and how much of one shows is the line's own width: the host's content box had no width bound, so a long wording ran past the conversation column with the clock and the badge behind it; it now takes the width of the row it stands in, and the wording is clipped with an ellipsis inside its own box while the loader, the clock and the badge keep their places.
- **The status line's clause is no longer cut at a dot inside a name**: where a sentence ended used to be decided by a hand-written table of closing punctuation, so the dot in a file name, a version number or an abbreviation read as the end of one — the clause about reading `app.js` said "Reading app" and the one about `package.json` said "Checking package", and an abbreviation left a single letter behind. Where a sentence ends is now the page's own sentence rules, so a clause runs from the participle to the place the sentence really ends. The one or two words that may stand between an auxiliary and its participle (now, currently, still, just …) and the perfect continuous (I have been checking) are read too; those sentences used to hand the line nothing and it fell back to "Thinking…". A negated clause and a plan the model has not started are still passed over.
- **The status line's clause stands until the next intent arrives**: a model writing fast ends several sentences a second, and the stretches between its clauses — the reasoning reading as the bare thinking state, or a step that has written nothing yet — used to take the clause that had just been said off the line, so the reader saw a clause flash, fall back to "Thinking…", and flash again with the next one. The model's own clause now stands until the next intent arrives: a newer clause, a call's own words, or a state such as writing or running a tool. With the Precise status line switched off no clause is read and none of this applies. The one-second lock on a wording is unchanged, and it now rests on the wording rather than on the row: when the host builds a fresh row between steps, the wording that turn stood on and its lock travel with the turn instead of starting over.
- **The status line's and the process group header's sweep now use the host's own construction**: the highlight is a masked window and a tinted copy of the words moving in opposite directions, both translations the compositor plays, so no frame is repainted for it; the period, the steps, the 0.3 s start delay and the mask match the host's rows. A page with a turn running no longer has any paint-driven animation running.
- **The dark border is now a highlight**: the dark values of `--dsw-alias-border-l1`/`-l2`/`-l3` move from the opaque `#242320`/`#2e2c29`/`#3a3833` to one translucent white at `.09`/`.18`/`.30`, so the edge of a card, a panel, a code block or a small badge reads as a chamfer catching the top light instead of a contour that has to be re-picked for every fill under it; the three light rungs stay the warm opaque ladder.
- **A popover's edge stays its own border, with a dark falloff outside it in dark**: the skin's own popover cards, the host's account menu and the hero row's pickers no longer move the line into the shadow — it is the card's border as it always was (the border token in light, the dark ladder's highlight in dark), so the box the placement reads and the paint path the opening animation scales are the ones they have always had. Dark gains a 3px dark falloff outside it that separates the lit edge from the near-black canvas, and the drop tightens to `0 8px 24px` plus `0 2px 6px`, deepening in dark to `rgba(0,0,0,.65)` / `rgba(0,0,0,.45)`.
- **The split between the sidebar and the conversation becomes a hairline**: the line drops from 1px to 0.5px, its continuation through the Windows caption row with it, which lands on a single device pixel on a retina display and is the width the product itself states; the Markdown table frame and the trajectory chip already took 0.5px, and every other single-direction rule stays 1px.
- **The reader's message bubble takes a stated pair of fills**: under the Claude palette `--dsw-specific-bubble` no longer borrows the button-hover grey and states `#f0f0ef` in light and a 6% white lift in dark, a dark cell the skin left unset before, so the bubble no longer fell through to the host's own deep blue. The light half is not the product's own cool plate, which reads blue on this warm canvas, but the skin's existing neutral (the value the table header wears); the settings page's demonstration bubble reads the same token and moves with it.
- **The smooth follow while streaming is drawn by the graphics card**: while a reply streams, the host's own follow writes the position to the end and the skin no longer rewrites it frame by frame; it only slides the newly grown content up from the bottom edge, with the status line standing still. The host's follow stays on through the whole reply, so its back-to-end button no longer has to be hidden. Measured on this machine over the same fast stream: the newest content trails its resting place by a median of 26–28 px instead of 31 px and at most 62 px instead of 73 px, and layouts per 4 seconds fall from 49 to 44–45.
- **One separator line in a popover, decided in one place**: the host menu's own `[role="separator"]` and the separators the skin builds (the model picker's footer divider and its provider-header rule) are now the same 0.5px `--dsw-alias-border-l2`, drawn as a top border on a zero-height box rather than the background of a half-pixel box, so the line belongs to the layout instead of changing thickness with the card's opening scale. The general rule lives in the shared shell and covers the skin's own cards together with the two host menus it repaints — before it, only the account and hero menus each stated a 1px line — and the two menu footers drop from a 1px to a 0.5px top border.

### Bug Fixes

- **Deleting a conversation no longer takes its usage with it**: the panel's own account was folded again from the stored logs on every pass, so a log deleted took that session's days out of the all-time figures. The local account now lives in the plugin's own directory, and a session whose log is gone keeps the days it settled on — the panel still gives those days' tokens, its model ranking and its hour histogram. The days an earlier build kept in its fold cache are migrated on the first read.
- **The usage record is no longer overwritten**: a record that does not parse is kept in the plugin's directory as `usage.json.corrupt-<stamp>` before it is rebuilt from the session logs; with several instances open under one `$DSH_HOME`, every write first merges the copy on disk, so a session another instance recorded is not lost; the old fold cache is deleted once the record is written.
- **Every plugin entry in the sidebar footer is collected into the account area**: the action slot's entries and a card another plugin mounted into the footer itself — the usage card is one — both stand in the account popover, the card keeping its own markup, and the footer keeps the account row alone; an entry's own inline style gives way with them; the importance ledger records 424 declarations with them.
- **A model id carrying its provider's namespace resolves its vendor lockup**: an id spelled `cn:hy3` draws the Hunyuan lockup on its row and gets its description line in the picker's first level. A rule's segment start now accepts any character outside a letter or a digit, and an id such as `shy-mt2` stays unclaimed.
- **The remaining models under that same segment start resolve their vendor lockup**: an id carrying its serving provider's namespace was unclaimed for the K3 and M3 lines too, and the o-series rule read only a slash or a hyphen before `o`; the K3, M3 and o-series rules now read the segment start the Hunyuan rule reads. The `nova` rules gain a segment boundary, so `sensenova-6.8-flash-lite` is no longer claimed as Amazon Nova and its lockup no longer lands in the middle of the name.
- **The sweep under the Claude brand is no longer blue**: the host retints the sweep on its running row to DeepSeek blue, so the status line's highlight was always blue; under the Claude brand the status line, the process group header and the host's own call rows now share one warm highlight (45% of `#faf9f5` in dark, 30% of `#141413` in light), and the DeepSeek brand keeps the host's colour.
- **Scrolling or clicking in the sidebar or a subagent transcript beside the conversation no longer stops the main conversation from following**: only a wheel, press or drag inside the main conversation's scroller, or a scroll key pressed with nothing focused, counts as the reader leaving the end; before, a wheel or click anywhere on the page left the main conversation where it was and the stream stopped being followed.
- **The status line no longer reads a quotation as the model's own work**: when the model quoted a sentence it had read, or discussed this line's own waiting word while thinking, the line carried that quotation and the rest of the sentence as the model's own doing. What stands inside a quotation (「」『』“” and the English double quote) now takes no part in reading a clause, and a clause does not end inside one: a reader never sees the model's quotation stated as its work, while a quoted part of a clause the model does state is still carried as written. The Chinese 「正在」 reading is withdrawn with it — it shares its shape with this line's own waiting word, and no local word list tells 「正在读取 app.js」 from a sentence about the line — so reasoning in Chinese stands on the waiting word again.

### Chores

- **Rules asking whether one element holds another read one mark again**: sixteen rules used to ask the browser, through `:has()`, whether an element's subtree carried a part or a mark, and every change below one of them re-matched those rules. The pass that marks the parts now writes that answer as one attribute, and the rules read it; the two `:has()` entries into scope and the one following focus state remain. The build refuses a `:has()` that reads an attribute, holds every mark read to a declared relation, and checks the part names those relations name.
- **Whole-document lookups in a pass or a frame now read a kept answer**: the interface switch's band asked eight times a pass whether the other side's controls, the sidebar's collapse toggle and the window menu were on the page, the chat follow asked once a frame whether the host was still streaming, and the desktop header band asked once a pass where the window menu stood — seats most pages do not have at all, each question walking the whole document. Nine of them go (seven in the switch, one in the band, one in the follow): the host access module keeps those answers until the page's structure changes, and the follow reads its mark inside the message column, as its own other reading already did. The forty-six that remain are recorded one by one with the reason each stays, and the lint step refuses a new lookup as well as a record the code no longer matches.
- **The numbers a check accepts are a record the gates verify**: when a check failed, the cheapest answer was to loosen whichever number stood in its expression, and that edit left no trace. Every numeric literal a check in either lane decides on is now written into `packages/testing/check-numbers.json` (`npm run checks:numbers` writes it), and the gates and the cloud verify that record: change what a check accepts and the record moves with it, so a loosened bound is visible in the diff. The bounds that need a reason keep living in `packages/testing/bounds.json`, each with its `reason`, and the checks read them from there.
- **Every `!important` that stays now records what it beats**: the importance walk used to answer only whether the page still paints the same without it; it now writes each declaration it proved necessary into `packages/testing/importance-ledger.json` — the page state that decided it, and the candidates that take the property over once its importance is gone (the element's own inline style, the host's `!important`, a host rule of higher weight, another skin rule). The walk drops that one importance, reads the value the page falls back to over every longhand the property stands for, and takes each other candidate away in turn: the ones that move the value are what it beats. A declaration that appears or stops being needed fails the walk, and `DSH_IMPORTANCE_LEDGER=write` rewrites the record from a run so the difference is read in the diff. Three of this run's sixteen attributed an opponent; the rest are recorded as unattributed, the walk finding no candidate it can scan.
- **The build requires page evidence for every `!important`**: the importance walk now writes every declaration it read into `packages/testing/importance-ledger.json` — the ones it proved necessary together with what each beats, and the ones no page state could reach together with the verdict that says so (never matched an element, only in force under a transient mark, a third-party answer, an unreadable pseudo-element). The stylesheet build verifies that record: any `!important` in the output that is not in the ledger fails the build, naming the declarations.
- **The bounds a check compares against now live in one table, each with its reason**: how far behind the tail the scroller may lag, the longest frame a long session may take, how much long-task time a turn may spend — the limits on measured readings used to sit as constants in each module, and now live in `packages/testing/bounds.json`, read through `packages/testing/bounds.cjs`. Loosening one is a line in that file with its reason beside it; the remaining bounds move in as the migration continues.
- **The other ten reading limits moved into the bounds table**: the wait for a door to roll and land, the frames sampled on each side of the doors, the slack that still counts as pinned to the row, the tolerance for a control reading as on the column's line, the wait for motion to settle, how long a remote page may take to follow a local change, the waits for the settings shortcut and dialog, and the gap the state line's wording leaves — each was a constant in a scenario module and now lives in `packages/testing/bounds.json` with the reason its own comment gave, read through `packages/testing/bounds.cjs`.
- **The lookup for the host's open menu card moved into one place**: the account menu asked every pass where the host's open menu was, scanning every `[role="menu"]` on the page and picking the one that is not the skin's own. That lookup now goes through the host access module, which keeps the answer until the page's structure changes (a menu is a node arriving and leaving), and the ledger entry recording it as debt is struck out. The hero menu's own query of the same kind moves onto the same accessor next.
- **The hero picker's card trigger keeps its answer too**: the workspace trigger on the composer card and the hero row are two views of the same picker, and the pass looked it up across the whole document every time; a kept lookup (re-asked only when the page's structure changes) serves it now. The ledger entry for that file drops from three lookups to two, and the two that remain want a live list rather than one element — the reason is written in the record.
- **The hero page reads the host's open menu card through the same lookup**: before placing its own card the hero asked where the host's open menu was, scanning the whole document for `[role="menu"]` and picking the one that is not the skin's; it now uses the accessor that keeps that answer (opening one menu folds the shell's others, so the open host card is that one). The ledger entry for the file drops from two lookups to one — the one left wants a live list, since the hero row may hold more than one open picker.
- **Both decision drafts' standing sections follow what has landed**: the whole-document lookup record stands at forty-three sites, the `!important` ledger covers all five hundred and thirty-nine declarations with the build requiring each to be in it, the bounds table holds fourteen values read through `packages/testing/bounds.cjs`, and the remaining numbers in check expressions are recorded and verified in `check-numbers.json`.
- **The sidebar's section labels come from the bus registry now**: the workspace view looked up every section label across the whole document each pass and then picked the one carrying a list area; the labels are now kept by the observation bus per selector and maintained incrementally as the page changes (D40), so a pass picks from the list without walking the document, and the ledger entry recording it as debt is struck out — forty-two sites remain recorded.
- **Why one lookup cannot move is written down, so the next pass does not walk the same road**: the hero row's open pickers turn on the host's `aria-expanded` on nodes that stay mounted, while the bus's registry follows node additions — moving it there keeps counting a picker that has closed (eight smoke checks said exactly that). The reason in the record now says what this site needs instead: an answer invalidated by an attribute change, from a reader of its own or from the row the pass already holds.
- **The opponent classification now matches the walk's own criteria in two places, and the dead ends are written down**: a declaration counts as necessary when dropping its importance starts a transition, and the classification counts that as the candidate holding the value too; a longhand written beside a shorthand in the very rule under test (`border-color` next to `border`) used to be skipped with the whole rule and is a candidate now. Neither changed today's tally (three of sixteen), and the ledger's note records the three dead ends tried: transitions, same-rule longhands, and reading only the first matching element.
- **The smoke walk's settle rule now requires that no finite animation is still running**: it used to wait only for a run of frames without a new pass plus a stretch of wall clock without one, so a reading could be taken while an entrance, a wording swap or a fade was still in flight. It now also requires that every finite animation the page runs has finished — an endless one is no such thing, since the running session's pulse and the sweeps never land. The whole smoke walk passes, 50 of 50, in the same time (93.7 s).
- **The appearance layer and its gates land**: every page state of the smoke walk now records what its parts compute to (font-independent properties only — colours, borders, radii, shadows, layering and overflow), the first version covering fifty page states and twelve parts; the snapshot is committed, and `npm run verify`'s `appearance` gate compares the walk's own reading against it item by item. `scripts/ci-scope.mjs` gained one refusal: a push where `packages/testing/appearance.json` changed and nothing under `packages/client/src` did — the snapshot is what the pages look like and only moves with the sheets that draw them; both cloud workflows carry the check. The reading of which paths the working tree changed moved into `scripts/shared/changed-paths.mjs`, which had two copies of it.
- **A direction is one page**: each record carries the background it answers, the decision, what follows from it and what would make it worth revisiting, while file paths, function names, values and counts live in the code comments, ARCHITECTURE.md and the tests, so a refactor that keeps the direction leaves no record stale; `npm run docs:index` writes `docs/adr/README.md` and the register of void numbers, and a void number is never reused.

## [0.15.0] - 2026-10-15

[中文](#cn-0.15.0) | [English](#en-0.15.0)

<h3 id="cn-0.15.0">新增功能</h3>

- 设置页「动效」页新增「新文字淡入」一行：流式回答里新出现的字符是否先淡后实（约 0.12 秒）由它决定，两档各带一张预览卡，同一句样品在卡里逐字到达，「淡入」那张每个字先落到最淡的一档再亮起来，「直接出现」那张把字一个个直接交出来；这一项默认关闭，关闭时新到的字符立即是本色。
- 设置页「动效」页新增「消息气泡动画」一行：自己发的消息落到对话里时怎么出现由它决定，两张卡片各演各的——「在原地长出来」让气泡在自己的位置上从零长到满（只改大小，旁边的东西不动），「从输入框飞上来」是原来那一下，输入框卡片被抬到消息那一行。默认仍是飞上来。
- 设置页「输入区」页「重绘模型选择器」下面多一项「模型描述」，默认开启：开着时一级列表的每个模型名下面写一行说明，关掉后每一行只剩模型名。

### 体验优化

- 侧栏里对话的状态标记换了一副样子：正在进行的对话不再转圈，改成一盏呼吸的灰灯，实心圆点每 2.4 秒从半亮到全亮一个来回，位置与大小都不动；空闲对话的空心圆与它同样 6px，圈线是 1px 发丝、颜色更淡，两枚标记只靠实心与空心区分，已归档列表里的那枚空心圆跟着一起改，两栏的标题仍从同一处开始。设置的「动画效果」选「减弱」时灯停在最亮的那一帧。
- 设置页「动效」页「光标动画」的两张预览卡改成逐字打出 `Hello World!`，光标跟着这行字往前走：打字期间一直亮着，打完停住才按原生节奏闪，与真光标一致——真光标每移动一次就把闪的节奏从头开始，打字时看不到它灭。两档的分别在于光标怎么到达下一个位置：「开」的那张滑过去，「关」的那张直接跳过去。
- 设置页「动效」页里，状态行与消息气泡动画各自得到一个开关，原先统管这两者的「聊天区动画效果」不再管它们；两张画法卡片移到各自开关下面，作为不带标题与说明的子选项，与开关之间不再有分隔线，开关关闭时置灰。「聊天区动画效果」改名为「聊天区滚动动画」并搬到「动效」页，只管跟随末尾、行与过程组的开合、文件操作行这三样。
- 设置页的「状态行描述」从「对话」页搬到「动效」页，落在状态行动画的开关与它的画法卡片之间，改名「精确状态行」并由分段控件改成开关：开着时状态行写具体在做什么，关掉只写状态本身，早先存下的「简洁 / 精确」照旧读得出来；开着时预览卡轮换的三条样例改成「正在阅读README.md」「Checking out current tree」「正在思考」。
- 状态行换词时不再空一拍：旧词向上淡出、模糊的同时，新词从下方升入，两段动画重叠着走完，整次换词收在 0.2 秒内，途中行里始终有字，计时仍贴着词尾。
- 每趟刷新少做整份文档的查找：侧栏搜索的位置与宿主搜索按钮、工作区分区的标题、输入区的首屏阶段标记都改为记住上一次的答案，宿主没有换掉那个元素就不再重新查找。同一条流式回答期间量了同一个回合：整份文档的查找从 2792 次降到 2026 次，其中查不到任何东西的从 1516 次降到 1351 次。
- 状态行开头的加载点现在跟着这一轮在做什么换动作：模型思考时三颗点照旧弹跳，这一轮改去写回答或调用工具时它们各沿一条直线来回——三条直线彼此相差 120°、其中一条反着走，球在两端最大、过中点最小，去程与回程一样长；两套动作之间不硬切：旧的那一列各自淡出、新的那一列各自淡入，每颗球都在自己动作里的那一拍上开始——跳球从落地回弹那一刻开始淡出、到最高点淡完，从最高点开始淡入、到落地淡完；走路从线的一端开始淡出、到中点淡完，从中点开始淡入、到另一端淡完，没有哪颗球被挪到别的动作的位置上；一个动作站满 2 秒才允许下一套接手，这段时间里来了又走的状态不打扰它。

### 问题修复

- 侧边栏的工作区名字过长时让位给行尾的悬停操作（名字以省略号收尾），工作区菜单与新建会话两个按钮始终留在栏内并可点击。
- 侧栏品牌标识悬停时不再浮出一块陶土色底板：它此前被列在「发送」按钮这类填充式 CTA 的规则里，靠一条按类名匹配的排除条件才没被填色；排除条件换掉之后，悬停底色落到了品牌按钮上。品牌按钮从这两条规则里移出，它的外观由自己那条规则给全，深色下也不再多出一块底板。
- 工作区树模式下，行的层级缩进回来了：每一层比它的上一层再向右让出 `depth * 12px`，扁平列表与按工作区分组的列表都保持原来的 6px。
- 侧栏收起成图标栏后，「进行中 / 已归档」控件与已归档列表随分区标题一起离开页面，宿主自己的分区按钮留在原处；侧栏重新展开时两者照旧回来。
- 「停止生成」按钮里的方块在任何显示缩放下都落在圆环正中：125% 与 150% 这类非整数缩放下，它不再偏出半个像素。

<h3 id="en-0.15.0">New Features</h3>

- The Motion tab gains a New-text fade row, deciding whether the characters arriving in a streaming answer start faint and settle over about 0.12 s; its two cards each hold the same sample line arriving character by character, the Fade in card landing each character at its faintest step before it brightens and the Appears at once card handing each one over as it is. The row ships off, and with it off arriving characters are solid at once.
- The Motion tab gains a Message bubble animation row, deciding how a message the reader sends arrives in the conversation: its two cards each show their own answer, Grows into its place taking the bubble from nothing at its own corner while nothing beside it moves, and Flies up from the composer carrying the answer that was already there. The row ships on the flight.
- The Composer tab gains a Model descriptions switch under Redraw the model picker, on by default: while it is on each model in the picker's first level carries a line under its name saying what the model is, and off leaves every row with the model's name alone.

### Improvements

- A conversation's status mark in the sidebar is drawn differently: a running conversation breathes instead of spinning, a lit grey dot whose light rises from half to full and back once every 2.4 seconds while it neither moves nor changes size, and an idle conversation keeps a hollow circle of the same 6px with a 1px hairline stroke in the quieter neutral, so the two marks differ by fill alone; the archived list's circle follows them and both lists still start their titles at the same place. Under the Animation setting's Reduced the light holds its brightest frame.
- On the Motion tab's Composer caret motion row, both preview cards now type `Hello World!` out character by character with the caret following the line: it stays lit for the whole time the line is being typed and blinks on the native cycle once the line stands, matching the drawn caret, which restarts its blink on every move and is therefore never seen dark while typing. The two cards differ in how the caret reaches each new place: it glides there, or arrives at once.
- On the Motion tab the waiting line and the message bubble animation each carry a switch of their own, and the chat-area switch no longer governs either of them; the preview cards stand under their switch as a sub-option that carries no title or description and no dividing line from the switch, and greys out while the switch is off. The chat-area switch is now Chat-area scrolling animation, moved to the Motion tab, and governs following the end, rows and groups folding, and the file operation rows.
- The Waiting-line detail row moves from the Conversation tab to the Motion tab, standing between the waiting line's switch and its paint cards: it is now Precise status line and an on/off switch, where on writes the specifics of a moment and off the bare states alone, with a value an earlier build stored as Simple or Precise still reading; with it on, the preview card takes turns between three samples: 正在阅读README.md, Checking out current tree and 正在思考.
- The status line hands its wording over without standing empty in between: the words leaving fade and blur upward while the ones arriving rise from below, the two halves travelling together and the change done inside 0.2 s, with words in the line throughout and the clock still sitting right after them.
- A pass now re-reads fewer things across the whole document: the sidebar search's box and the host's search button, the workspace section's label and the composer's hero-phase marker are all kept from the pass before while the host has not replaced the element. Measured over one streaming turn: document-wide queries fall from 2792 to 2026, and those that match nothing from 1516 to 1351.
- The loader at the head of the status line now changes with what the turn is doing: the three dots bounce while the model thinks, and once the turn writes or works they each walk a line of their own — three lines 120° apart with one of them run the other way, the dot largest at either end and smallest as it crosses the middle, going out and coming back over the same stretch of time; the two motions never cut: the lane leaving fades each of its dots out where its own motion next turns back — off the floor for a bounce, off a far end for a walk — and the lane arriving fades each of its dots in where that motion next carries it, each fade over one of its own legs, so no dot is ever moved to a pose its motion does not carry; a motion stands for 2 s before the next may take it over, so a state that comes and goes inside that stretch leaves it standing.

### Bug Fixes

- A workspace name too long for the sidebar now yields to the hover actions at the end of its row (the label ends in an ellipsis), so the workspace menu and the new-session button stay inside the column and stay clickable.
- The sidebar brand mark no longer floats a clay plate under the pointer: it was listed among the filled CTAs beside the Send button, kept unpainted only by an exclusion written against a host class name, and once that exclusion went the hover fill landed on the brand button. The brand button leaves those two rules; its look comes from its own rule alone, and the dark theme no longer gains a plate either.
- In the workspace tree a row's level indentation is back: each level stands `depth * 12px` further right than its parent, while the flat list and the group-by-workspace list keep the 6px they have today.
- With the sidebar collapsed to its icon rail, the In progress / Archived control and the archived list leave the page along with the section's heading, so the host's own section buttons stay clear; both return when the sidebar is wide again.
- The square inside the Stop button sits centred in its ring at every display scaling: at fractional scalings such as 125% and 150% it no longer lands half a pixel off.

## [0.14.2] - 2026-10-15

[中文](#cn-0.14.2) | [English](#en-0.14.2)

<h3 id="cn-0.14.2">体验优化</h3>

- 端到端通道让每个场景声明的浏览器开关真正生效：远端设置走查改用一台带名字映射（`--host-resolver-rules`）的浏览器，不论整条通道是否共用一个浏览器都跑到底。
- 重要性台账记下两种判定都算数的记录（`either`）：一行只在某一帧里存在，或由宿主的运行平台决定画不画，这一趟抓到与否都算数，检查不再要求把它划掉；台账同时按云端与本机两次判定重算。

### 问题修复

- 侧边栏的工作区名字过长时让位给行尾的悬停操作（名字以省略号收尾），工作区菜单与新建会话两个按钮始终留在栏内并可点击。

<h3 id="en-0.14.2">Improvements</h3>

- The end-to-end lane honours the browser switches a scenario declares: the remote-settings walk opens its page under the mapped name whether or not the lane shares one browser between scenarios.
- The importance ledger records the rows the walk cannot decide either way (`either`) — a row that lives inside one animation frame, or one the host's own platform decides to draw: whether this run catches it is right both ways, so the check no longer asks for it to be struck. The list is recomputed from the cloud run and this machine's run together.

### Bug Fixes

- A workspace name too long for the sidebar now yields to the hover actions at the end of its row (the label ends in an ellipsis), so the workspace menu and the new-session button stay inside the column and stay clickable.

## [0.14.1] - 2026-10-15

[中文](#cn-0.14.1) | [English](#en-0.14.1)

<h3 id="cn-0.14.1">体验优化</h3>

- 会话切换更顺滑：皮肤在使用中会反复翻转的页面标记（首页形态、页头提升、页签栏置顶、竖屏适配、阅读暂停、输入区随页签隐藏，以及上下文圆盘的尺寸读数）从 `<body>` 下移到最近的公共祖先元素上。此前这些属性上悬挂着一千二百余条选择器，每写一次整个文档都要重新参与样式匹配；实测改版后，会话之间、会话与首页之间的切换对 `<body>` 的属性与内联样式写入降为零，样式失效范围收敛到对应子树。
- 测试入口按档给结论：`npm run verify` 不带参数时同时跑那批检查、构建与工作树改动触及的单元测试，本机 5 秒上下返回；`--full` 加上整份冒烟，页面按 `--jobs` 一起驱动（看动效的页面一次两个），整份冒烟由 251 秒降到 50 秒上下；端到端通道的场景也并发起跑，整条通道共用一个浏览器、每个场景一份临时 home。
- `npm run verify` 在走整份冒烟与端到端通道那一档之前打印一句「请确认你正处于发布流程。」：这一档就是云端的发布闸门，起跑前先让发起的人确认自己在发布流程里。
- 皮肤不再按宿主类名的片段匹配界面：`core/parts.ts` 每次页面结构变化时把宿主自己声明的类名（`_2H3hWW_root` 这类带哈希的名字）读成自己的部件名，写在元素上，样式表只按 [data-dsh-claude-part] 整词匹配。原来 45 个样式表里的 565 处子串选择器与 31 处 TypeScript 子串查询全部改完：匹配变得精确（`row` 不再命中 `grow`，`rail` 不再命中 `trailing`），宿主改名时对应的规则直接静默而不误伤邻居，别的插件也不会再被这些规则扫到。
- 输入光标的测量移到帧的读阶段，探针读数按内容、光标位置、End 倾向、复制样式与字体代次缓存，输入框自身的盒子每次测量只读一次；同一次会话切换（3 轮，与 `@linxin666/dsh-web-all` 同装）中本插件的盒模型读取由 470 至 680 毫秒降到 297 至 402 毫秒。
- 工作区段落在当前视图上悬停时恢复的三个属性、以及工作区段按钮悬停时的文字颜色，去掉多余的 `!important`：它们所在的规则本来就比被压过的规则多一个伪类，靠层叠顺序就能赢。`importance` 场景逐条丢弃实测之后，577 处 `!important` 里只有这 4 处可以去掉，其余 16 处被证明需要，余下的在走查的页面形态里从未匹配到元素、只在短暂标记下生效或属于第三方应答。
- 进程摘要的隐藏量宽元素按措辞与字体缓存，同一句措辞不再重写它并为它触发布局：该项在会话切换中的盒模型读取由 3 轮 11 次、94.5 毫秒降为零。
- 滑动高亮与推理档位按钮的定位改在读阶段取读数：`createSlidingPill` 分出 `measure` 与 `sync` 两个入口，会话标签、权限分段、工作区分段、搜索过滤条与设置分段五处分别在各自阶段调用；同一次会话切换（3 轮，与 `@linxin666/dsh-web-all` 同装）中本插件在自身写入之后发生的盒模型读取由 231 次、370 至 578 毫秒降到 245 次、178 至 214 毫秒，单次由 1.6 至 2.5 毫秒降到 0.73 至 0.87 毫秒。
- 输入框之外也被读取的三个取值——渐隐带高度、数字入场参数与用量色调——移到输入框门控之外（features/composer/vars.css）：等待行与面板在输入框重绘关闭时同样拿到这些值。
- 等待行的三个圆点在关键帧里不再写圆角：那些取值在 4px 的盒子上每一帧都取整到圆点本就带的同一条曲线，去掉之后动画只含 `scale` 与 `translate`，圆点不再逐帧重绘。
- 权限菜单的选中标记改用只写存在的写法，状态未变时不再落笔：一次生成期间该属性的写入由每秒 7.7 次降为 0.1 次。
- 实时匹配表按批次扫描新增节点，同一批次里已被更早的载体带进来的节点不再单独匹配与查询：一次生成期间每秒新增的 13.2 个节点中有 9.2 个属于这种重复，扫描次数由每秒 13.2 次降为 4.0 次。

### 问题修复

- 手机远程访问（`@linxin666/dsh-remote-web-ui` 的竖屏适配）下，输入区底行不再错位：发送与停止按钮回到输入行内并完整落在卡片里；档位选择器与上下文圆环之间只隔 16px，和桌面一致；模型名称在行内还有空间时完整显示，只有真的放不下才以省略号收尾。上下文圆环的预留宽度变化时（流式输出期间也会发生），档位选择器当帧就跟着重新定位，不再停在旧位置。
- 工作区分栏控件回到原样：进行中时它让位给「工作区」标题，指针进入该段才浮现，切到已归档才常驻。此前按类名片段定位列表区域时，片段同时命中了列表区域的外层容器，区间标记因此落在会话树自身的容器上，样式表里那对交叉淡入的两条规则都读不到它。现在按部件读列表区域，标记重新落在整个区段的根元素上。
- 首页用量面板回来了：英雄页的根元素在中间列里，不在会话滚动区之内，按会话区域登记「root」这个局部名就读不到它，页面布局与工作室标记因此双双落空。该名字改为整页读取，规则再用宿主自己的 data-phase 限定到英雄页。
- 宿主菜单卡片的部件重新写上：皮肤给菜单卡片打上自己的标记之后，只重读了那个元素本身，卡片里的行没有重读，于是账号弹层与英雄页的两个选择弹层按宿主原本的样子绘制，账号弹层因此出现了滚动条。元素因标记或类名变化成为区域锚点时，整棵子树一并重读。同一处顺带修正：账号弹层里选中行读的是侧栏的部件名，改为菜单区域自己的名字。
- 部件落定之后多跑一遍标记：菜单卡片的样式决定了卡片的实际高度，而卡片的位置是量出高度之后才写下的，标记与位置因此在同一帧里互相追赶。写下新部件的那一批结束后主动请求再走一遍，下一遍不再写任何部件，遍历随即停下。

### 移除

- `npm run session` 随它的会话工作树机制一并移除：会话直接在仓库主树开工，改动在主树提交与推送，`session/` 分支、`finish` 与 `sweep` 子命令不再存在。

### 其他变更

- 文档里带单位的数值不再进闸门：`scripts/doc-numbers.mjs` 留着按需运行（`npm run docs:numbers`），lint 不再核对它，`docs/STYLE.md` 里与样式表逐字对应的几何与时长因此不再让推送失败。
- `npm run verify` 先跑云端快档那批检查（lint、特性清单、决策索引、变更记录、AGENTS 表），推送前的一次运行与云端判定同一批内容。
- 端到端通道不带 `--scenario` 时走 `packages/contracts/src/timing.ts` 那张表里除停放的两个统计场景之外的全部条目，新加入表的场景默认进入云端判定，停放名单与场景表对不上时运行直接终止。
- 发版工作流在把这一版转正之前跑完快档那批检查、Windows 上的完整冒烟与端到端通道，与 pull request 判定的内容一致。
- 一次运行期间 `npm run dev` 的重建换掉了构建产物时，这次运行不写结论并判定为不通过，结论只对它真正跑过的那份产物成立。
- 持续集成先由一个任务按改动的路径定下范围：只改了文档、语言包或工作流的推送跳过读页面的通道，改动落在一个功能目录内时冒烟只走那个目录的用例，其余改动才走完整冒烟；端到端的行为场景与截图捕获按矩阵分成四份并行跑，构建的慢步骤按树内容的散列在运行之间取回，每个分钟级的步骤都有时限，分支规则只登记一个汇总任务。

<h3 id="en-0.14.1">Improvements</h3>

- Smoother conversation switches: the page marks the skin flips during normal use (the home layout's hero mark, the header band lift, the titlebar tabs, the mobile portrait adaptation, the reader's scroll hold, the composer hiding with the conversation tab, and the context meter's measured numbers) moved from `<body>` to the nearest element that ancestors every styled target. Over twelve hundred selectors used to hang off those body attributes, so every write re-matched the whole document; measured on this build, a switch between conversations or between a conversation and the home page now writes zero attributes and zero inline styles on `<body>`, and style invalidation stays inside the subtree that changed.
- The test entry answers by tier: a bare `npm run verify` runs the checks, the build and the tests the working tree's change reaches at once and answers in about five seconds on this machine; `--full` adds the whole smoke walk, whose pages are driven `--jobs` at a time (the motion ones two at a time), taking that walk from 251 s to about 50 s; the end-to-end lane's scenarios likewise run several at once, over one browser for the whole lane and a scratch home each.
- `npm run verify` prints 请确认你正处于发布流程。 before a request that walks the whole smoke and the end-to-end lane's default table, so whoever starts the release gate's minutes confirms the release process is what they are in.
- The skin stops matching the interface by fragments of the host's class names: `core/parts.ts` reads the local part of every hashed host class name (`_2H3hWW_root` and the like) into the skin's own part name, writes it onto the element on each structural change, and the stylesheets match one whole [data-dsh-claude-part] token. All 565 substring selectors across 45 stylesheets and all 31 TypeScript substring queries are gone: a match is exact (`row` no longer takes `grow`, `rail` no longer takes `trailing`), a host rename leaves the rule quiet instead of wrong, and no other plugin's class names are swept up.
- The composer caret's measurement runs in the frame's read phase, and what its probe yields is remembered per content, caret offset, End leaning, copied styles and face generation, so the input's own box is read once per measurement; across one conversation switch (3 rounds, with `@linxin666/dsh-web-all` installed) the plugin's box readings fall from 470–680 ms to 297–402 ms.
- The three properties that bring the workspace segment group back on hover, and the segment button's hover ink, drop their `!important`: the rules already carry one pseudo-class more than the rule they beat, so the cascade settles it. Dropping each one on the real page showed four of the skin's 577 `!important` declarations to be unnecessary; sixteen are proven needed, and the rest never match an element in the walk's page states, hold only under a transient mark, or answer another plugin.
- The process summary's hidden measuring span is cached by wording and face, so a repeated sentence neither rewrites it nor lays it out again: its box readings across a conversation switch fall from 11 calls and 94.5 ms per 3 rounds to none.
- The sliding highlight and the reasoning-level trigger take their readings in the read phase: `createSlidingPill` splits into `measure` and `sync`, called from the conversation tabs, the permission segments, the workspace segments, the search filter bar and the settings segments in their own phases; across one conversation switch (3 rounds, with `@linxin666/dsh-web-all` installed) the plugin's box readings taken after its own writes fall from 231 calls and 370–578 ms to 245 calls and 178–214 ms, each from 1.6–2.5 ms to 0.73–0.87 ms.
- The three sets of values the rest of the page reads — the fade band's height, the digits' entrance and the usage tones — move outside the composer gate (features/composer/vars.css), so the wait row and the panels hold them with the composer restyle off as well.
- The waiting line's three dots no longer write a corner radius in their keyframes: on a 4px box every one of those stops clamps to the same curve the dot already carries, and without them the animation carries only `scale` and `translate`, so the dots stop repainting every frame.
- The permission menu's check mark uses a presence-only write and leaves the attribute alone while its state matches: across one streaming turn its writes fall from 7.7 to 0.1 per second.
- The live-match registry scans a batch's added nodes once, so a node an earlier carrier in the same batch already holds is neither matched nor searched again: across one streaming turn 9.2 of the 13.2 nodes added per second are such repeats, and the scans fall from 13.2 to 4.0 per second.

### Bug Fixes

- On a phone via the mobile remote plugin (`@linxin666/dsh-remote-web-ui`, portrait adaptation) the composer's bottom line no longer slips out of place: the send and stop buttons sit back on the input's own line and inside the card, the tier trigger stands 16px from the context ring as it does on a desktop, and the model name is shown whole whenever the row has room for it, ending in an ellipsis only when it does not. When the room the context ring reserves changes — which also happens while an answer streams — the tier trigger is placed again in that same frame instead of holding its old position.
- The workspace section's segmented control behaves as before: in 进行中 it steps aside for the plain 工作区 heading and returns when the pointer enters the section, and it stays put in 已归档. Locating the list area by a class-name fragment also took that area's own outer container, so the view mark landed on the conversation tree's container instead of the section root and neither half of the stylesheet's cross-fade could read it. The list area is now read by its part, and the mark rides the section root again.
- The home page's usage panel is back: the hero page's root sits in the centre column rather than inside the conversation's scroll region, so registering the host's `root` local name with that region never wrote it, and the page's layout and the studio mark both fell through. The name is read page-wide now, and a rule narrows it to the hero page with the host's own data-phase.
- A host menu card's parts are written again: when the skin stamped its own mark on the card, only that element was re-read and the rows inside it were not, so the account card and the hero page's two pickers drew the host's own way — which is where the account card's scrollbar came from. An element that becomes a region's anchor through a stamp or a class rewrite now has its whole subtree re-read. The selected row in the account card read the sidebar's part name; it reads the menu region's own name now.
- A batch that writes part marks asks for one more pass: a menu card's height is what its styled rows draw, and the card's position is written from a measurement taken before those rows were marked, so the two chased each other inside one frame. The next pass writes nothing — every mark already holds — and the walk settles.

### Removals

- `npm run session` goes with the session-worktree mechanism it drove: a session works in the repository's main tree and pushes from there, and the `session/` branch with the `finish` and `sweep` subcommands is gone.

### Chores

- A number with a unit in a document is no longer a gate: `scripts/doc-numbers.mjs` stays for running on demand (`npm run docs:numbers`), and lint no longer checks it, so the geometry and timing in `docs/STYLE.md` that mirror the stylesheets no longer fail a push.
- `npm run verify` starts with the checks the cloud's fast tier runs (lint, the feature list, the decisions index, the changelog and the AGENTS table), so the run before a push judges the same set.
- The end-to-end lane without `--scenario` walks every entry of the table in `packages/contracts/src/timing.ts` but the two parked statistics scenarios, so a scenario added to the table is judged in the cloud by default, and a parked name the table does not hold stops the run.
- The release workflow runs the fast tier's checks, the full smoke on Windows and the end-to-end lane before it promotes a version, the same set a pull request is judged on.
- A run whose build output a rebuild behind `npm run dev` swapped files no verdict and reads as failed, so a recorded verdict belongs to the output that run actually drove.
- Continuous integration now settles its scope first, from the paths a push changed: a push holding only documents, locale files or the workflow skips the lanes that read a page, a change inside one feature directory walks that directory's smoke cases, and anything else walks the whole smoke. The end-to-end behaviour scenarios and screenshot captures run as four parallel shards, the build's slow steps are restored from a cache keyed on the tree's hash, every minutes-long step carries a limit, and a branch rule names a single aggregate job.

## [0.14.0] - 2026-10-14

[中文](#cn-0.14.0) | [English](#en-0.14.0)

<h3 id="cn-0.14.0">新增功能</h3>

- 「侧栏」页多出「封号彩蛋」一行，选「关闭」后账号行只显示名字，设置项 `banLocale` 多了取值 `off`。
- 和 [ds-bot](https://github.com/Fei2411/DeepSeek-Bot) 同时安装时，侧栏顶端多出一个聊天 / 代码切换：聊天是 ds-bot 的 Bot 界面、本主题整个让开，代码是宿主自己的界面、由本主题绘制；没装 ds-bot 时页面上没有它。
- 「对话」页新增「状态行描述」（设置项 `statusDetail`，取值 `precise`（默认）与 `simple`），「精确」让命令调用说出模型为自己写下的描述。
- 运行行现在说出具体的文件名，推理里出现英文进行时从句时写出模型自己那句话。
- 设置页多出「动效」分页，其中「状态行动画」用两张实时预览的卡片代替文字，一档是现在这道扫光，另一档让状态行的文字本身流动着变色；设置项 `statusMotion` 的取值为 `sweep`（默认）与 `wash`。

### 体验优化

- 同一个文件在同一个过程组里的多次读取、编辑与写入读成一行：图标与标题跟着最后一次操作换新，行尾的 `+n -m` 是这些改动的累计值并随每次改动逐位翻页，展开读到全部改动；只被读取过的文件展开读到这次读取的窗口。
- 设置页过长的描述统一改写为简洁风格：一句说清这项设置管什么、各档位做什么，中英两版同步。
- 每帧那一趟刷新不再为已知的宿主节点重新查询整份文档：输入卡片与它的占位、运行行、思考行、标题行、对话框、页脚、会话根、模型槽与上下文表盘都从观察总线按选择器登记的活清单里读，宿主换掉节点时才重解一次。会话越长，每帧的查询开销越不再跟着页面规模走。
- 状态行换词时说法盒子的宽度是一次移动：盒子先按住当前宽度再写上目标宽度，由滑动高亮那一对时长与曲线（约 0.24 秒）带过去，旁边的计时随盒子滑到新位置。
- 运行行的换词按 transitions.dev 的「Thinking states」合成：离场与入场同时进行，扫光带全程亮着而不从头再扫，行由一个隐藏测量层按住宽度与高度，换词期间旁边的计时不会被挤动，新词从下方升入也不会让整行变高。
- 只落在对话消息列里的变更批次（流式输出就是这种）只叫醒读消息列的功能，页头、视图标签、侧边栏页脚、模型与档位选择器不再跟着跑一趟；任何读到整页的信号（语言、偏好、时钟、功能自己排的一帧）照旧触发完整一趟。
- 只在另一项打开时才起作用的设置行现在随父项一起变灰、不能操作（重绘模型选择器与重绘权限控件随「重绘对话框」，对话统计信息位置随重绘覆盖对话页，封号彩蛋随「折叠侧栏设置区」），变灰的行仍显示你设的值，说明下面用强调色写明它在等哪一项。
- 滚动与窗口尺寸变化重新定位浮层时，一帧只派发一次（原来是每个滚动事件一次）；关闭着的模型卡与档位卡不再读宿主触发器的盒子，上下文数字行的合身测量只在输入卡片宽度变化时重做。
- 「标题进入顶栏」放进设置页的「对话」页，只在 Windows 桌面端的窗口里可改，在别的页面变灰、仍显示你设的值，并在下面注明它只在哪个窗口生效；「动画效果」从「通用」挪到「动效」，「首页版面」挪到「外观」，「封号彩蛋」挪到「侧栏」并挂在打开它的账号弹层那一行下面，「搜索框样式」与「对话统计信息位置」的说明写出每个选项的效果。
- 「光标动画」从三档简化为开与关，从「对话」页挪到「动效」页，两档各用一张预览卡呈现：开的那张光标在样例行上来回滑动，关的那张停在行首闪烁；早先存下的「只在移动时」读作开。已经用预览卡呈现选项的行（状态行动画、光标动画）不再带文字说明。
- 皮肤里所有动效的时长、曲线、位移与模糊改由 `packages/client/src/theme/tokens.json` 的 `motion` 一组统一给出，同一作用的数值合成一档，`docs/STYLE.md` 的动效表由同一份数据生成，构建拒绝样式表里直接写出的时长与曲线、内容重复的关键帧，以及没有读者认领的动效令牌。
- 流式回答里新文字的淡入改按文本节点增量比较：一条回答里追加字符时不再把整条回答重拼成字符串、也不再逐字符重比，成本随本批新增的字符走；markdown 中途改写标记的那一段仍按原来的窗口判定，超过预算或刚被折叠重排过就保持本色。
- 状态行与过程组头部同读宿主 `TextShimmer` 的一档：1.5 秒一趟、`steps(48, end)`、每趟最后三分之一歇停，状态行的色带改用宿主的扫光色与 20% 带宽。
- 长会话里跟着会话长度增长的三处记账收敛：进程组表头的摘要共用一条尺寸订阅（原来一组一条），思考行的清单由变更批次增量登记（滚动不再扫整份文档），进程组跟随不再有常驻的定时器——页面上没有进程组时就没有任何定时查询。
- 宿主账户行被宿主换掉时，旧行上的四个监听与这一代登记的记录一起收走，不再留到整代拆除；账户菜单的绑定保持一次只有一张卡。
- 模型、推理等级、权限、账号几张弹层卡片与新会话页的菜单从各自按钮所在的一角、由略小的尺寸长出来（约 0.25 秒，不再上移），收起时更快（约 0.12 秒）。
- 封号彩蛋整页打开时从中心略小处放大淡入（约 0.25 秒），按页上的按钮或 Esc 关掉时缩回去淡出（约 0.12 秒）再离开页面。
- 设置页的开关按下后圆钮越过终点再弹回（约 0.35 秒），只有按过的开关这样动，打开设置页或换回某个分页时各个开关都静止在原位。
- 设置页切分页时新的一页从它在分页条上所在的一侧滑入并穿过一点模糊，被换下的那一页朝另一侧滑出（约 0.25 秒），滑出的那张静止副本读屏与 Tab 键都碰不到。
- 首页打开时品牌标志先升起、问候语晚一拍跟上，两者都从下方 12 像素处穿过一点模糊落到原位（约 0.5 秒）。
- 设置页在极窄宽度下保持可读：一行放不下全部分页时分页条换到第二行，每个分页标签始终完整显示在一行上；一行的文字空间不足时，开关、分段选择器等控件移到文字下方独占一行，说明文字保持整行排版。
- 上下文占用的色带移到四成到八成，并改用一组低饱和度的色标：占用四成以下保持绿色，四成到八成之间依次经过浅绿、黄与橙，八成起为红色。
- 工作室首页的用量面板：占位的底色淡去、数字从模糊里显出来，热力图的格子渐变到各自的颜色，模型列表与图表整体淡入（约 0.3 秒）。
- 等待行的「暂未响应」徽标从左下方滑上这一行，同时从无到有弹出来（约 0.5 秒），模型一开口就缩回消失（约 0.12 秒）。
- Claude 品牌下，轮次进行中那一行开头是主题自己的三枚 4px 加载点（各弹起 8 像素并在离地时压扁，半秒一次，错开周期依次起跳）；DeepSeek 品牌下宿主的鲸鱼尾照旧，读屏播报也不变。
- 「外观」页的「主色」改名「强调色」并挪到「配色」下方，配色选「跟随宿主」时它变灰、不能操作。
- 工作台首页的权限控件此前和经典首页一样是一排 Read / Edit / Auto / Yolo 分段按钮，与它那身对话式的单行输入卡片并不相称；现在工作台首页与对话页一致：输入区里是一枚写着当前档位的按钮，点开是一张档位卡片，滑块式分段只留在经典首页。工作台首页还没选工作区时，按钮停在新会话的默认档位上、不接收点击，点它和点输入框一样打开工作区选择。
- 中文界面下内置 Auto review 档位此前显示英文名，因为宿主的档位文案表里这一条两种语言都是英文；现在它读「自动审查」，其它档位仍读宿主自己的中文名，界面语言不是中文时照旧读 Auto review。
- 轮次进行中那一行等待时只说品牌自己的那一个词：Claude 品牌下是皮肤自己的「正在思考」，DeepSeek 品牌下是宿主自己的「深度求索中」；模型思考与读不出状态两种情形共用这一个词，读不出状态不再换一次说法。
- 「动效」页两张状态行动画卡片里的预览说法改为这一行真正会用的两个：当前品牌的等待词与「正在调用工具」；换词动作与两档画法照旧。

### 问题修复

- 推理等级滑杆的方向在档位未按强度下发的模型上不再反向：宿主把 `reasoning.efforts` 记为从弱到强，而 Qoder 的 Qwen3.8-Max 发来「极高、低、中、关闭思考」、Raccoon 与 MiniMax 发来「高、关闭思考」，滑杆照下发顺序画，最右端便落在最弱的档位上——这些模型上停止思考被读成了最强。现在能判定强度的档位按强度排列，判不出强度的档位留在供应商给出的位置。
- 修复 Firefox 下鼠标停留在上下文用量圆环时统计弹层反复闪烁的问题：返回入口会取消待执行的关闭任务，鼠标仍在入口上时弹层保持展开。
- 思考行自动收起与读者的点开收起在两种宿主结构上都找得到展开体，因此都逐帧滚动；新增的展开体淡入并上移两个像素进入。
- 开着「悬停自动展开弹层」时，悬停态下按同一个入口不再收起刚展开的弹层（侧栏账号入口、权限选择器、模型选择器、档位选择器、首页那一行的两个选择器与输入框右侧的上下文圆环），收起交给鼠标离开入口与卡片。
- 「状态行描述」在中文界面补回中文的标题、描述与两个档位名：这一行的文案没有进文案文档，中文界面一直读英文兜底。
- 同一运行行中有可见替代文字且宿主文案被外部隐藏时，主题等待行自动让位，接管结束后恢复，其他聊天动效继续运行。
- 钉住的位置比末尾所有可能的停靠位置都高，跟随末尾期间输入框上方那一行每一帧都停在同一处，推理一段段到达也不再上下抖动。
- 功能被关掉或整代被换下之后，它留下的挂在宿主节点上的监听、观察总线订阅、排队帧与定时器一并收走：宿主账户菜单每次打开不再留住上一张已经卸载的卡片，会话数字的圆环与弹层不再累积旧的挂载代，输入卡片选择器关掉时不再把 mousemove 留在文档上，模型档位滑块按住时被拆下也不再留下 pointerup，进程组表头的摘要不会在拆除后重建并永久订阅宽度，思考窗与折叠回滚不再在拆除后继续排帧。
- 卷帘门在末尾展开、收起的整个过程中，只要读者没有自己往回翻看，输入框上方那一行都停在原处不动。
- 被合并掉的调用连同宿主给它留的间距一起离开页面，过程组里各行的间距保持一致。
- 状态行的扫光层始终挂在承载文字的那个副本上，扫光带贴着字形扫过。
- 飞行的气泡每一帧都从它按住的那一行重新取落点与高度、底色按画面上的颜色写定（半透明气泡令牌只与画布合成一次），真实行等它站上去并连着几帧不动之后才显形、显形瞬间两者对齐到同一像素，淡出期间它始终钉在那一行上；等待本身有上限，页面一直在动也不会把消息一直扣着。
- Windows 桌面端飞行的气泡全程是气泡自己的颜色，与 web 端一致；这条色带同时是窗口的拖拽区，飞行期间在那一块按下鼠标也不再拖动窗口。
- 换词时钉住的宽度与要去的宽度都按布局实际的宽度取，盒子稳住不动，计时只随说法变长而移动。
- 飞行的竖直阻尼比回到 0.75，落定的那点回落又回来了。

### 其他变更

- 36 段登记在册的复制代码全部清零：分段控件、品牌图蒙版、弹层暗色卡片与表单盒型等收进共享样式表，脚本与测试工具的公共启动代码收进 `scripts/shared/` 与 `packages/testing/`，jscpd 基线文件随之删除，lint 对任何新复制段直接拒绝。
- 压过宿主界面的 z-index 改由 `packages/client/src/theme/tokens.json` 的 `layer` 一组给出，`docs/STYLE.md` 里的层级表由同一份数据生成，构建拒绝样式表里 9 以上的 z-index 字面值与 TS 里内联写出的层级。
- npm 包不再携带 source map 与 `docs/decisions/` 决策文档，包体积从 2.3 MB 降到 1.6 MB。
- 新增 `npm run session`：会话在自己的工作树与 `session/` 分支上开工、收尾与清理，`node_modules/` 经联接复用主树；并行会话的改动、测试锁与云端失败归属不再互相交叉。
- 冒烟架、临时宿主、脚本化模型、端到端通道与三个在线探针全部住进 `packages/testing/`，共用一套 Playwright 浏览器栈，`scripts/` 只剩构建与文档工具。
- 构建对浏览器半边源码的检查改在 TypeScript 语法树上进行（`scripts/source-tree.mjs`）：样式表读到的 `data-dsh-*` 属性必须真的有代码写入，经变量、联合类型与辅助函数转手也追得到，注释里的同名写法不再误报；流式淡入的 24 条 `::highlight()` 规则与首页热度图的四档规则由构建按 `constants.ts` 里的取值写出，步数、档数与规则出自同一处。
- 三个微型功能并入它们服务的功能——选区镜像与输入框的空白提示并入输入区、首页问候语并入首页版面、亮暗切换的过渡抑制并入设置页——功能数量从 28 降到 25。
- 端到端通道多一个长会话场景：先积累八轮对话，再在页内探针下流过一整条回答，逐帧记下帧间隔与长时间任务，并把每帧耗时的 p50、p95、最大值与页面节点数写进断言说明；本机两次运行读到 p50 31.5 毫秒、p95 156 至 187 毫秒、最大 156 至 218 毫秒、长时间任务合计 289 至 978 毫秒、约 1900 个节点（无显示加速的无头浏览器，读数随同机其他负载浮动）。
- 重要性走查里标为动画中间帧的那一组记录改成「抓到与否都算数」：这一类选择器只在动画播放的那几帧存在，走查在固定时刻读页面，同一次改动可能这一趟读到、下一趟读不到，原来会把其中一次读不到判成「从未匹配」、把读到判成「该划掉」，两边都会失败；换字退场的那个类补进这一组。
- `importance` 场景在走查里多审两件事：走遍所有页面形态都没匹配到元素的选择器即失败，到不了的选择器逐条登记在 `packages/testing/importance-unreachable.json`、每条写明缘由且登记表只许变短；同一轮走查去掉八处多余的 `!important`，端到端通道的设置层每次运行前回到运行前的副本。
- 文档里带单位的数值必须有出处：能由令牌或常量给出的一律读它，读不到的登记在 `scripts/doc-numbers.mjs` 的来源表里，数值失去出处时 `npm run lint` 与云端闸门报出。
- `docs/SETTINGS.md` 与 `docs/SETTINGS.en.md` 只留设置页自己的内容——六个分页与各档、设置项之间的依赖、跨功能的几段说明——动效各自做什么由链接指向功能一览。
- `docs/STYLE.md` 只留视觉规则与三张由令牌表生成的对照表，精灵的网格、格宽与帧号由 `packages/client/src/features/mascot/sheets.ts` 与精灵样式表持有。
- 决策的「决定」一节限定篇幅：一条不超过三百字、一节不超过三千字，「现状」不超过六百字，由 `npm run lint` 判定。
- `AGENTS.md` 的命令清单改由 `npm run agents` 从 `package.json` 与各脚本自己的首行生成，云端闸门用 `npm run agents:check` 核对。
- 端到端通道的两个发送场景在替身离场之后再读一次页面自己继续采样的帧：真行是否显形、替身是否落在它身上改按这一段帧判定，慢跑机器上不再把尚未显形的行当成不可见。
- 闸门的发起时机写明：本机默认不起闸门，开发期间的判断来自构建与在线页面；一次运行只属于推送之前那一段，取覆盖这次改动的最小集合。

<h3 id="en-0.14.0">New Features</h3>

- The Sidebar tab gains an Account-hold easter egg row, with Off the account row is a plain name, and the `banLocale` setting gains the value `off`.
- With [ds-bot](https://github.com/Fei2411/DeepSeek-Bot) installed too, the top of the sidebar carries a Chat / Code switch: Chat is ds-bot's Bot surface with the theme standing aside, Code is the host's own interface painted by the theme, and without ds-bot the page carries none.
- The Conversation tab gains Waiting-line detail (setting `statusDetail`, `precise` (the default) or `simple`), where Precise has a command call say the description the model declared for it.
- The running line names the file a call works on and writes the model's own words when the reasoning carries an English present-continuous clause.
- The settings page gains a Motion tab whose Waiting-line animation setting picks the paint with two live previews instead of text — the highlight band the line sweeps today, or a colour wash that moves through the letters; the `statusMotion` setting is `sweep` (the default) or `wash`.

### Improvements

- The calls on one file inside one process group stand as a single row: its icon and title move on with the file's last operation, its `+n -m` tail counts those changes and turns character by character as each one lands, and opening the row reads every change — or the window a read-only file was read at.
- The settings page's over-long descriptions are rewritten in a concise style — one sentence naming what the setting governs and what each tier does — with the Chinese and English copies kept in step.
- A pass no longer queries the whole document for host nodes it already knows: the composer cards and their placeholders, the running rows, the thinking rows, the title row, the dialogs, the footer, the conversation root, the model slot and the context meter are read from live per-selector registries on the observation bus, and only a node the host replaced is resolved again. The longer a session runs, the less a frame's query cost follows the size of the page.
- The wording box's width is now one move — pinned at the width it stands at, written with the width it heads for, and carried there over the sliding highlight's own time and curve (about 0.24 s) — so the clock travels to its new place with it.
- The running line's wording swap runs transitions.dev's "Thinking states": the two halves move at once, the sweeping highlight stays lit through the swap, and a hidden sizer holds the width and height, so the clock is never shoved aside and the copy rising from below never makes the line taller.
- A change confined to the conversation column — streaming, above all — wakes only the features that read it: the header, the view tabs, the sidebar footer and the model and effort pickers no longer take a pass of their own. Any signal that reads the whole page (a language, a preference, the clock, a frame a feature asks for) still runs the full pass.
- Settings rows that only work while another setting is on grey out and take no input with it — the model picker and the permission control with the composer restyle, the statistics position with the restyle covering the conversation, the easter egg with the sidebar settings — and a greyed row still shows the value you set, with a line in the accent colour saying what it waits for.
- Scrolling or resizing now re-places fixed popovers once a frame instead of once per event; a shut model or effort card stops reading its trigger's box, and the inline context line is measured for fit only when the card's width has changed.
- Header in the title bar lives on the settings page's Conversation tab, taking input on the Windows desktop window alone and greying out on every other page — still showing the value you set, with a note naming the window it acts in; Animation moves from General to Motion, Home layout to Appearance, the Account-hold easter egg to Sidebar under the row of the account popover it opens from, and Search box style and Conversation statistics position now say what each choice does.
- Composer caret motion drops its third tier for On and Off and moves from the Conversation tab to the Motion tab, each choice a preview card — the caret gliding along a sample line, or standing at its head blinking; a stored Explicit moves reads as On. A row whose preview cards already present the choice (the waiting-line animation, the caret) carries no description.
- Every duration, curve, distance and blur in the skin comes from the `motion` group of `packages/client/src/theme/tokens.json`, one value per role, with the style guide's motion table generated from the same data and the build refusing a duration or curve written straight into a stylesheet, keyframes that repeat one the skin has, and a motion token nothing reads.
- The fade over newly arrived characters in a streaming answer now compares text nodes incrementally: an append no longer rejoins the whole answer into a string nor walks it character by character, so the cost follows the batch. A markdown rewrite in the middle is still judged by the same window, and a rewrite past its budget or one that just reflowed from a fold stays solid.
- The line and a process group's header share the host's own `TextShimmer` gear — 1.5 s a pass, `steps(48, end)`, the band resting the last third — and the line's band takes the host's shimmer tint at 20% width.
- Three books that grew with a long session are now bounded: the process headers' summaries share one size subscription instead of one per group, the thinking rows are registered incrementally from change batches rather than scanned for on every scroll, and the process-group follow keeps no timer when the page holds no process group.
- When the host replaces its own account row, the four listeners on the old row leave with this generation's record of it instead of waiting for the teardown; the account menu still holds one card's binding at a time.
- The model, reasoning, permission and account cards and the new-conversation page's menus grow out of the corner nearest their button from a little smaller (about 0.25 s, with no rise) and close faster (about 0.12 s).
- The account-hold page grows out of the centre as it fades in (about 0.25 s), and a control on it or Esc shrinks it back as it fades (about 0.12 s) before it leaves the page.
- A settings switch now runs its knob past the end and settles back (about 0.35 s), and only a switch the reader has pressed moves — opening the page or coming back to a tab shows every switch at rest.
- Changing settings tabs slides the new one in from the side it sits on along the strip, through a short blur, while the one it replaces slides out the other way (about 0.25 s); the page sliding out is a still copy that neither a screen reader nor the Tab key reaches.
- Opening the home page raises the brand mark and then, a beat behind, the greeting, each from 12px below through a short blur (about 0.5 s).
- The settings page stays readable at very narrow widths: the tab strip wraps onto a second line when one line no longer holds every tab, each label always whole on one line, and a row whose text runs out of room drops its control — a switch, a segmented control — onto a line of its own under the text.
- The context-occupancy colour band moves to two fifths through four fifths in a set of low-chroma tones: the reading stays green below two fifths, runs through light green, yellow and orange in between, and is red from four fifths on.
- The studio home's usage panel fades its placeholders out while the figures come out of a blur, shades the heat map's cells into their own colours and fades the model list and chart in (about 0.3 s).
- The waiting line's "No response yet" badge slides onto the line from below and to the left while it pops out of nothing (about 0.5 s) and shrinks away as soon as the model speaks (about 0.12 s).
- Under the Claude brand the head of the running row carries the skin's own three 4px dots, each rising 8px and flattening as it leaves the floor, half a second a bounce with the three staggered into a wave; under the DeepSeek brand the host's whale tail stands as before, and the screen-reader announcement is unchanged.
- The Appearance tab's Primary colour row is renamed Accent colour and moves under Colours, greying out and taking no input while Colours is set to Follow the host.
- The studio home's permission control was the same Read / Edit / Auto / Yolo segment row the classic home wears, which sat oddly with its conversation-style single-line card; it now matches the conversation: one button naming the current tier, opening a card of tiers, with the slider-style segment row left to the classic home. Before a workspace is picked the button rests on the preset a new session starts in and takes no input, so pressing it opens the workspace picker the same as pressing the input box.
- Under a Chinese interface the built-in Auto review tier showed its English name, the host's own tier dictionary carrying that entry in English in every language; it now reads 自动审查, while the tiers the host names in Chinese keep their own words and every other interface language still reads Auto review.
- While a turn runs, the line stands on one word per brand: the skin's own "Thinking…" under the Claude brand and the host's own "Deep diving" under the DeepSeek brand, and a model thinking and a turn whose state cannot be read use that one word, so a wait no longer changes wording.
- The two Waiting-line animation cards on the Motion tab take turns between two wordings the line really uses — the current brand's waiting word and "Running tools…" — with the same swap and the same paints.

### Bug Fixes

- The effort slider no longer runs the wrong way on models whose levels arrive out of order: the host records `reasoning.efforts` from weakest to strongest, while Qoder's Qwen3.8-Max sends xhigh, low, medium, none and Raccoon and MiniMax send high, none, and the slider drew that order as it came, so the right end landed on the weakest level — on these models switching thinking off read as the strongest setting. Levels whose strength is known are now sorted by strength, and a level whose strength is unknown stays where the provider put it.
- Fix the context statistics popover repeatedly flickering while the pointer rests on the context ring in Firefox: returning to the trigger cancels the pending close, and the popover stays open while the trigger is hovered.
- A thinking row's automatic fold and a reader's own press find the expanded body on both host shapes, so both roll frame by frame; an inserted body fades in and rises two pixels.
- With popovers opening on hover, a press on the trigger no longer folds the popover the pointer just opened — on the sidebar account entry, the permission, model and effort pickers, the home row's two pickers and the context ring beside the composer — leaving the pointer's departure to close it.
- Waiting-line detail reads in Chinese on a Chinese interface — title, description and both tier names: the row's copy never entered the copy document, so a Chinese interface read the English fallbacks.
- The theme yields its waiting line when a visible sibling replaces externally hidden host wording, restores it when the takeover ends, and keeps other chat animations running.
- The pin stands above every place the scroll end can come to rest, so the line above the composer holds the same spot in every frame while the tail is followed and no longer shakes with each piece of reasoning.
- Turning a feature off or replacing a generation now takes its listeners on host-owned nodes, its observation-bus subscriptions, its queued frames and its timers with it: the host account menu no longer keeps every card it has already unmounted, the conversation meter and panel no longer stack bindings from earlier generations, switching the model picker off no longer leaves a document mousemove behind, dropping the effort slider mid-drag no longer leaves pointerup bound, a process header's summary is not rebuilt and subscribed after its teardown, and the reasoning window and fold roll stop queueing frames once the feature is gone.
- While a fold rolls open or shut at the tail, the line above the composer holds its place, unless the reader has scrolled back.
- A merged-away call leaves the page together with the spacing the host gave it, and the rows of a process group keep one even spacing.
- The sweeping highlight rides the copy holding the words, so the band sweeps across the glyphs themselves.
- The flying bubble takes its landing spot and height again every frame from the row it holds, its fill is written as the colour the screen paints (a translucent bubble token composites over the canvas once), and the real row is shown only once the stand-in is on it and the row has held still for several frames — the two are the same pixel then, and through the fade the stand-in stays pinned to the row; the wait is bounded, so a page that keeps moving never holds the message back.
- On the Windows desktop app the flying bubble keeps the bubble's own colour all the way, alike on the web, and the band — also the window's drag region — no longer turns a press there into a window drag during the flight.
- The pin and the width it heads for are the widths the layout really holds, so the box holds its place through a swap and the clock moves only as the wording grows.
- The flight's vertical damping ratio is 0.75 again, and the drop back into place is back with it.

### Chores

- The 36 tracked copied stretches are gone — the segment controls, the masked brand-mark idiom, the dark popover card and the form-control boxes now live in shared sheets, and the scripts' and testing tools' bootstrap moved into `scripts/shared/` and `packages/testing/`; the jscpd baseline is deleted with them and lint refuses any new copied stretch.
- A z-index that has to clear the host's interface comes from the `layer` group of `packages/client/src/theme/tokens.json`, the layer table in `docs/STYLE.md` is generated from the same data, and the build refuses a z-index literal above 9 in a stylesheet and a stacking level written inline in TypeScript.
- The npm package no longer carries source maps or the `docs/decisions/` documents, taking it from 2.3 MB to 1.6 MB.
- New `npm run session`: a session opens, finishes and sweeps its own worktree on a `session/` branch, reusing the main tree's `node_modules/` through a junction; parallel sessions' edits, test locks and cloud-failure ownership no longer cross.
- The smoke harness, the scratch host, the scripted model service, the end-to-end lane and the three live probes all live in `packages/testing/` on one Playwright stack, leaving `scripts/` with the build and document tools.
- The build's checks on the browser half's source read its TypeScript syntax tree (`scripts/source-tree.mjs`): every `data-dsh-*` attribute a stylesheet reads must really be written by code, found through a variable, a union or a helper parameter, and the same spelling in a comment no longer trips the check; the 24 `::highlight()` rules behind the streaming fade and the home heat grid's four levels are written by the build from `constants.ts`, so the counts and the rules have one source.
- Three micro-features fold into the features they serve — the window-blur selection mirror and the composer's idle hint into the composer, the home greeting into the home layout, the theme flip's transition suppression into the settings page — taking the feature count from 28 to 25.
- The end-to-end lane gains a long-session scenario: it grows eight turns first, then streams one more answer under an in-page probe that records frame intervals and long tasks, and prints the p50, p95 and worst frame times with the page's node count in the check details. Two local runs read p50 31.5 ms, p95 156 to 187 ms, worst 156 to 218 ms, 289 to 978 ms of long tasks and about 1900 nodes on a headless browser without display acceleration, the readings moving with other load on the machine.
- The groups of the importance walk marked as animation frames are now read as "counted whether or not the walk catches them": such a selector exists only inside an animation, the walk reads the page at fixed moments, and the same change may be caught in one run and missed in the next — which used to fail the run either way, as "never matched" when missed and as "strike this off" when caught. The swap's exit class joins that group.
- The `importance` scenario audits two more things in its walk: a selector that matches no element in any page state fails it, and the selectors the walk cannot reach are recorded with their reasons in `packages/testing/importance-unreachable.json`, a record that may only shrink; the same walk proved eight `!important` declarations redundant and took them out, and the end-to-end lane's settings layer returns to its pre-run copy.
- A number a document states now has a home: a value a token or a constant holds is read from there, the few a reader needs are registered with their source in `scripts/doc-numbers.mjs`, and `npm run lint` and the cloud gates fail when one loses it.
- `docs/SETTINGS.md` and `docs/SETTINGS.en.md` carry the settings page's own content — the six tabs and their tiers, the dependencies between rows, the cross-cutting notes — and link to the feature list for what each effect does.
- `docs/STYLE.md` keeps the visual rules and the three tables generated from the token table, with the sprites' grids, cell sizes and frame numbers held in `packages/client/src/features/mascot/sheets.ts` and the mascots' stylesheets.
- A decision's 决定 section is held to a length — one bullet of at most 300 characters, a section of at most 3000, a 现状 line of at most 600 — enforced by `npm run lint`.
- `AGENTS.md`'s command list is generated by `npm run agents` from `package.json` and each script's own header line, and checked in the cloud with `npm run agents:check`.
- The end-to-end lane's two send scenarios read the frames the page keeps sampling once the stand-in has left: whether the real row appeared, and whether the stand-in sat on it, are judged on that stretch, so a slow runner no longer calls a row that had not appeared yet invisible.
- The occasion for a gate run is stated plainly: no gate starts on this machine by default, work in progress runs on the build and the live page, and a run belongs to the stretch before a push over the smallest set covering that change.

## [0.13.3] - 2026-10-12

[中文](#cn-0.13.3) | [English](#en-0.13.3)

<h3 id="cn-0.13.3">新增功能</h3>

- 选完 Claude 或 DeepSeek 主题风格后，侧栏顶部、新会话页与账号行的兜底头像只能挂这两家的标志；设置页「外观」里现在可以填自己的品牌名称、上传标志图片与文字标志（PNG / SVG / WebP，不超过 2 MB），选择图片保留原色或按文字颜色着色，并指定一个主色替换按钮、选中标记、链接与焦点环的颜色。图片存在 DSH 主目录的 `dsh-claude-style/brand/` 下，由宿主半边新增的 `/dsh-claude-style/brand`、`/brand/mark`、`/brand/wordmark` 三条私有路由读写；设置项新增 `brandName`、`brandInk`、`brandAccent`。

### 问题修复

- 等待行曾连带隐藏 dsh-status-rotator 等插件插入的状态行；现在只隐藏宿主文案，第三方状态行保持可见。

<h3 id="en-0.13.3">New Features</h3>

- With the Claude or DeepSeek theme style chosen, the top of the sidebar, the new-conversation page and the account row's fallback picture could only carry those two brands' marks; the Appearance tab now takes your own brand name, a mark and a wordmark image (PNG / SVG / WebP, up to 2 MB), a choice between the images' own colours and the text colour, and an accent colour for buttons, selected marks, links and focus rings. The images live under `dsh-claude-style/brand/` in the DSH home directory, read and written through three new private routes of the host half — `/dsh-claude-style/brand`, `/brand/mark` and `/brand/wordmark`; the settings gain `brandName`, `brandInk` and `brandAccent`.

### Bug Fixes

- The waiting line hid status lines inserted by plugins such as dsh-status-rotator; it now hides only the host wording and leaves third-party status lines visible.

## [0.13.2] - 2026-10-11

[中文](#cn-0.13.2) | [English](#en-0.13.2)

<h3 id="cn-0.13.2">新增功能</h3>

- 设置页「侧栏」多了一行「左侧栏布局」：「宽松」是现在的样子，「紧凑」把左侧栏的间距收小——上侧各行（新会话、插件、自动化任务，以及搜索框独立成行时的那一行）到工作区之间的空隙、工作区标题自身的上下留白、对话行的高度与行间距、两个分区之间的间隔，以及账号区的内边距与它那一行的上下边距。控件的形状、字号、图标与配色不变。新增一项偏好 `sidebarLayout`（默认 `relaxed`），把它解析到 `<body data-dsh-claude-sidebar-layout>`；宿主半边由共享的偏好表生成，因此该键也会出现在 DSH 的设置文档里。

### 体验优化

- 同一个文件在一段过程里被改了几次，聊天区就并排列出几行，改动越密集越难看出这个文件一共改了多少。现在同一个文件在同一个过程组里的多次编辑与写入读成一行：这一行是这一组里最早的那一次改动，行尾的 `+n -m` 是这些改动的累计值，每到达一次改动就滚动一次，展开这一行读到的是全部改动；只改动过一次的文件保持原样，失败与中断的行仍各自保留裁决信息。
- 「模型正在做什么的那一行」在跟随末尾时停在输入框上方：这一行的固定此前挂在「轮次状态行」这一个开关上，而它属于运行中的这一行本身。现在它随「聊天区动画效果」这一开关，与这一行的说法、扫光同一处；读者自己接管滚动，或跟随的滑行正持有位置时，它照旧让开，回到文档位置随内容走。
- 首页用量面板的用量热力图，格子悬停提示原本写的是那天的消息条数，现在改成那天的 Token 用量（「9月9日 — 15.9k Token」），与格子深浅取自同一个数字；两份数据来源都带每天的 Token 合计，提示不再随来源换口径。
- 侧栏搜索框选「独立在品牌行下方」时，那一行自己还留着 8 像素的左右内边距，盒子因此比下面的「新会话」等行窄 16 像素；现在这一行不再留内边距，盒子的左右边框与下面各行的宽度落在同两条边上。
- 侧栏「新会话」一行右侧的快捷键提示原本是等宽字体的普通文字（Ctrl + N），现在与搜索框的按键同一套样式：每个键一个 20 像素圆角键帽、1 像素描边、12 像素次级文字，两个键之间的「+」不再出现。
- 样式表里写死的颜色改读令牌：强调色按钮上的文字取填充自己的前景令牌（原先写死纯白，换成浅色填充后对比度没有保障），设置页里插件图标的底色取主文字令牌（原先写死十六进制）。docs/STYLE.md 的形状一节补上实际使用的圆角与描边，并写明它们来自被复制的那枚宿主控件。

### 问题修复

- 会话很多时，用量汇总与内容搜索读日志会让宿主进程持续占住一个核心：它们经 `sessionQuery.readSession` 按 id 读，而这一版会为了定位一个 id 先把整份会话存档列一遍（列一次要打开并解压每个存档的头部帧），改动过的会话越多就越慢，首次运行或任何一次会话变动都按变更个数叠加。现在两处都改走宿主的观察接口 `sessionQuery.observeSession`，它只观察这一份存档、不先列档，读 N 个会话就是 N 次观察、零次列档（观察的租约在事件到手后立即释放）；只发布 `readSession` 的宿主退回按 id 读，仍然照常工作。按大小与修改时间的增量缓存不变，没有变动的会话照旧跳过，用量数字与负载结构不变。
- 删除会话的请求体超过上限时，客户端原先只看到连接被重置；现在先答 400，这条应答送出之后再结束连接。
- 成本计量账本里出现不是真实日期的键时，合并原先按字符串把它当成最新的一天，本地折算出的所有日子与它们的会话一起消失，首页模型图表还会读到一个非法日期而报错；现在这类键在读取时被跳过，其余日子照常合并。
- 机器上没有成本计量插件时，用量汇总的来源原先报成 cost-meter+local；现在报 local，与「哪个来源作答」的定义一致。
- 峰谷目录的 24 小时定时器原先在页面问过一次之后一直拉取到进程退出，设置里关掉峰谷功能也停不下来；现在连续 48 小时没有请求就自己停下，下一次请求再启动。
- 宿主没有网页服务器服务时，插件原先静默地一条路由也没注册，卸载时又按每一条记一次失败；现在报告一次缺少的服务，路由的撤销表里只留真正的撤销函数。
- 会话内容检索里，整份列举取代在途的尾扫时，旧的一轮结束会把新一轮的状态一起清掉，于是可以再起第三轮并发地读同一批会话；现在只有仍然是最新的一轮才清状态。
- 关闭状态的弹层卡片原先只把不透明度降到 0，卡片里的按钮仍然留在 Tab 顺序里，键盘读者会停在完全看不见的行上；现在关闭的卡片同时移出绘制、命中与焦点顺序，开关的淡入淡出照旧。
- 进行中那一行：皮肤把宿主自己的文字藏起来之后，画的替身又标着「装饰」，读屏在这一行上收不到「模型正在做什么」「暂未响应」和计时；现在替身是这一行的可读文字，宿主自己的实时区域照旧播报。
- 把「动画效果」设为减弱之后，工作强度滑杆顶档的点阵仍按运行时写下的动画时长闪一次；现在这一档不写动画的周期与相位，点阵静止。
- 几个控件对读屏说不出自己是什么：会话统计那一行只有数字与箭头，工作强度与模型触发器从不报告菜单是否展开，设置页的开关没有名字，权限弹层的当前档位只有勾号，输入输出箭标进了名称。现在统计行有自己的名称、两个触发器跟着菜单报告展开状态、开关取所在行的标题为名、权限弹层的当前档位写 aria-checked、箭标对读屏隐藏。
- 手机宽度下输入卡片下方那一行与手机插件自己画的度量条落在同一条 28 像素带里，两行文字叠在一起（权限标签上压了 52 像素、模型标签上压了 21 像素）；现在输入区会量出那条度量条的高度，把这一行连同上下文圆环整体抬起同样的距离，度量条出现与消失时分别抬起与落回。

### 安全

- 宿主没有 connection 服务时，私有路由的回退栅栏原先只看请求方自己写的 Host 头，局域网连接谎报 localhost 即通过；现在先看连接的对端地址，回环地址之外一律拒绝。冒烟的宿主半边新增一条检查：局域网连接加回环 Host 必须被拒。
- 删除会话时「目录留在会话根目录内」的判定改为比较解析符号链接之后的路径：会话根目录下有指向别处的项目目录链接时，删除不再跟着链接走到根目录之外。

### 移除

- 「轮次状态行」整体移除：这一项把宿主的过程控件搬到自己那一轮工作的末尾，并为进行中、已停止与失败的轮次换上插件自己画的火花与文字（用时、输出 tokens、当前动作）。宿主早已把运行中的状态做成对话末尾自己的一行（小鲸鱼、说法与计时），过程控件只在轮次结束之后出现，于是这条状态条只剩停止与失败两种情形还在渲染，画法又与那一行不同。现在宿主自己的控件留在它原来的位置与写法上：已停止与失败的轮次显示宿主自己的「已停止」「处理失败」，用时与输出 tokens 不再显示；设置页「对话」页的「轮次状态行」一行随之消失，早先存下的取值不再被读取。

### 其他变更

- 模型标志的 `cap` 高度回退原先写在同一规则里的两条 `height`，端到端的 `!important` 审计因此整条跳过这条规则；现在两条高度分处两条规则，规则的每一处权重都受审计。
- 两处内部记录的清理：滚动主人记「哪个来源在滑这一格」的表改用弱引用键，弹簧自己走完之后不再把已经分离的对话子树留在内存里；页脚接管挂在宿主自己的账号行与菜单上的监听随功能的拆卸一并摘下，反复开关不再叠加。

<h3 id="en-0.13.2">New Features</h3>

- The settings page's Sidebar tab gains a Sidebar layout row: Relaxed is how the sidebar looks now, and Compact takes its spacing down — the gap between the top rows (New session, Plugins, Automation tasks, and the search box's own row when it stands alone) and the workspace, the workspace heading's own margins, the conversation rows' height and spacing, the distance between two sections, and the account area's padding and row margins. Control shapes, type sizes, icons and colours are unchanged. A new preference, `sidebarLayout` (default `relaxed`), resolves onto `<body data-dsh-claude-sidebar-layout>`; the host half is generated from the shared preference table, so the key appears in DSH's own settings document too.

### Improvements

- A file changed several times in one piece of work was listed as one row per change, so a dense stretch of edits made it hard to see how much the file had changed in total. The edits and writes of one file inside one process group now stand as a single row: the earliest of them carries the total of those changes in its `+n -m` tail, rolls once per change as each one lands, and opens onto every change. A file changed once is drawn as before, and a failed or interrupted row keeps its own verdict.
- The line saying what the model is doing now holds its place above the composer while the conversation follows its tail: that hold used to hang on the Turn status line switch, a switch for a line of its own. It rides the Chat-area animations switch now, together with the line's wording and sweep, and it still steps aside — keeping its document place — while the reader owns the scroll or the follow's glide holds the position.
- On the home page's usage panel, the heat map's cell tip used to name the day's messages; it now names the tokens that day spent ("Sep 9 — 15.9k tokens"), the same figure the cell's shade is bucketed from. Both sources behind the grid carry a per-day token total, so the tip no longer changes its reading with the source.
- With the sidebar search box on Standalone, its own row still carried 8px of inline padding, which made the box 16px narrower than the New session row under it; the row adds no padding now, so the box's two edges stand where the rows under it stand.
- The shortcut hint at the right of the sidebar's New session row was plain monospace text (Ctrl + N); it now wears the search box's own key caps — one 20px cap per key with a 1px hairline and 12px secondary text — and the `+` between the two keys is gone.
- Literals in the stylesheets read tokens: the label on a filled accent button takes the fill's own foreground token (it was a hard-coded white, which promised nothing once a palette turns the fill light), and the settings page's plugin mark takes the primary label token (it was a hard-coded hex). The shape section of docs/STYLE.md records the radii and strokes actually in use, with the host control each copy came from.

### Bug Fixes

- With many sessions the usage roll-up and the content search pinned a core while reading logs: they read by id through `sessionQuery.readSession`, which locates that id by listing the WHOLE stored corpus first (a listing opens and decompresses every stored session's header), so the pass grew with the number of changed logs on a first run and after any session change. Both now read through the host's observation entry point `sessionQuery.observeSession`, which resolves the one session without listing the corpus: N sessions cost N observations and no listings, each lease released as soon as its events are in hand. A host publishing only `readSession` falls back to the per-id read and keeps working. The size and modification time cache is unchanged, unchanged logs are still skipped, and the usage figures and payload shape are untouched.
- A session deletion whose body went past the limit left the client with a reset connection; the 400 is answered first now, and the connection is ended once that answer has gone out.
- A key in the cost meter's ledger that is not a real date used to become the newest day by string comparison, which dropped every day the local fold contributed, along with its sessions, and left the home page's model chart formatting an invalid date; such a key is skipped as the ledger is read now, and the rest of the days merge as before.
- With no cost-meter plugin on the machine, the usage roll-up reported its source as cost-meter+local; it reports local now, which is what "which source answered" means.
- The peak-rate catalog's daily timer kept reaching the source until the process exited once a page had asked, and switching the peak-rate feature off did not stop it; it stands down after 48 hours with no request now, and the next request starts it again.
- A host without a web server service registered no route in silence and then logged one failure per route as it unloaded; the missing service is reported once now, and the route disposers hold the real disposals alone.
- In session content search, when a full listing replaced a tail-only pass in flight, the older pass's end cleared the newer pass's state, which let a third pass read the same sessions alongside it; only the pass that is still current clears the state now.
- A closed popover card only dropped its opacity, so the buttons inside stayed in the tab order and a keyboard reader landed on rows nothing was drawing; a closed card leaves the paint, hit-testing and the tab order together now, and the open and close fades are unchanged.
- On the live turn's running row, the skin hid the host's own words and marked its replacement decorative, so a screen reader received neither what the model is doing, nor the wait badge, nor the clock; the replacement is the row's readable text now, and the host's own live region still announces the row.
- With Animation set to Reduced, the reasoning-effort slider's top-rung matrix still flashed once per block on the duration written at run time; that duration and phase are not written in this setting now, and the matrix stands still.
- Several controls could not say what they were: the conversation-statistics line held only figures and arrows, the effort and model triggers never reported whether their menu was open, the settings page's switches had no name, the permission popover marked its current tier with a check mark alone, and the input and output arrows joined a name. The line carries its own name now, both triggers report the open state with their menu, a switch takes its row's title as its name, the permission popover's current tier writes aria-checked, and the arrows are hidden from a reader.
- At phone width the line under the composer card and the statistics strip a mobile plugin draws of its own shared one 28px band, so the two rows of text printed over each other (52px of glyph-on-glyph on the permission label, 21px on the model label); the composer now measures that strip and lifts the line, the context ring with it, by the strip's own height, taking it up and letting it back down as the strip comes and goes.

### Security

- With no `connection` service on the host, the private routes' fallback fence read only the Host header the requester writes, so a LAN client claiming `localhost` passed. The peer address of the connection is checked first now, and anything outside loopback is refused. The host half's smoke run carries the check: a LAN connection claiming a loopback Host is refused.
- The session deletion's "directory stays inside the sessions root" check compares resolved paths now: with a project directory inside the root linked elsewhere, the removal no longer follows the link out of the root.

### Removals

- The Turn status line feature is removed: it moved the host's process control to the end of the turn's work and drew the plugin's own spark and text — elapsed time, output tokens, what the model was doing — for a running, stopped or failed turn. The host has long since drawn the running status as its own row at the end of the conversation (whale, wording and clock), and its process control appears only once the turn has closed, so the plugin's line was left rendering the stopped and failed cases alone, in a look of its own. The host's control now stays where the host puts it and reads as the host writes it: a stopped or failed turn shows the host's own Stopped / Failed with no elapsed time or output tokens, and the Turn status line row leaves the Conversation tab of the settings page, with any stored value no longer read.

### Chores

- The model mark's `cap`-height fallback was two `height` declarations in one rule, which made the end-to-end `!important` audit skip that rule whole; the two heights sit in two rules now, so every weight in them is audited.
- Two internal records are released properly: the scroll owner's table of which source is easing a container uses weak keys now, so a spring that arrives on its own no longer keeps a detached conversation subtree in memory, and the footer takeover's listeners on the host's own account row and menu come off with the feature's teardown instead of stacking on every switch.

## [0.13.1] - 2026-10-10

[中文](#cn-0.13.1) | [English](#en-0.13.1)

<h3 id="cn-0.13.1">问题修复</h3>

- 装了 0.12.3 或 0.13.0 之后 DSH 起不来（「The application could not start or stopped unexpectedly」），禁用本插件也一样，只有退回 0.12.2 才能启动：这两版把宿主本体 `@deepseek-ai/dsh` 写成了运行时依赖，安装本插件时把宿主的整份运行时闭包拉进 profile 的 node_modules（282 个 `@deepseek-ai/*` 包、lockfile 从 2,522 行长到 11,466 行），与宿主自己那份并存；其他插件按名字导入宿主包时落到这一份新副本上，版本或导出对不上就在冷启动时抛出。现在这条声明去掉了，装本插件不再多装任何宿主包，其他插件照旧从宿主那份解析；本插件运行时要用的宿主包（设置表单的 schema 工厂、加载器递过来的部件与 React）声明在 peerDependencies 里，另有一份 devDependency 供类型检查与测试使用。构建新增一条拒绝：`package.json` 的 `dependencies` 里出现 `@deepseek-ai/*` 即失败。

<h3 id="en-0.13.1">Bug Fixes</h3>

- DSH would not start after installing 0.12.3 or 0.13.0 ("The application could not start or stopped unexpectedly"); disabling this plugin did not help either, and only going back to 0.12.2 did. Those two versions declared the host itself, `@deepseek-ai/dsh`, as a runtime dependency, so installing the plugin pulled the host's whole runtime closure into the profile's node_modules (282 `@deepseek-ai/*` packages; the lockfile grew from 2,522 to 11,466 lines) beside the host's own copy. Another plugin importing a host package by name landed on that new copy, and a version or export that did not line up threw during a cold start. That declaration is gone: installing this plugin adds no host package, and other plugins resolve against the host's copy as before. The host packages this plugin does use at runtime — the schema factory behind the settings form, the parts the loader hands over, and React — are declared in peerDependencies, with a devDependency copy for the type check and the tests. The build now refuses `@deepseek-ai/*` in `dependencies`.

## [0.13.0] - 2026-10-10

[中文](#cn-0.13.0) | [English](#en-0.13.0)

<h3 id="cn-0.13.0">体验优化</h3>

- 会话的统计与 Token 用量现在默认「收进上下文」：这些数字就在输入区上下文圆环那张弹层里，输入卡片下面只留那个圆环，不再多出一行；想一眼看到全部读数的人仍可在设置页「对话」页把「对话统计信息位置」改回「独立成行」。已有安装的设置不会被改写，这一项没设过的人升级后看到的是新默认。

### 问题修复

- 收起侧栏后，「新会话」那枚加号圆片不再比同一栏的其它图标靠左：宿主把这一格换成一枚 36 像素的图标按钮并让它里面的东西居中，而它自己那个图标座位在收起状态下是空的（图标已隐藏、文字宽度为 0），却仍占着这一行的一份宽度，把圆片顶到栏内中线左边 7 像素；现在这一格交出座位，圆片与上面的收起按钮、下面的插件与搜索图标落在同一条中线上。
- 手机宽度下，统计数字收进上下文弹层时那枚圆环不再跑出输入卡片：铺在工具栏行上的那条 dock 一直带着桌面端那份左右留白（给权限档位与模型、推理等级两块让出位置），它比这一宽度下的卡片还宽，把贴着它右缘的圆环一起顶出卡片、顶到窗口外；这一宽度下那份留白让位，圆环回到卡片右端、落在推理等级按钮之后。

<h3 id="en-0.13.0">Improvements</h3>

- The session statistics and the token usage now live Inside the context popover by default: the figures are in the panel the composer's context ring opens, and the input card keeps only the ring below it rather than a line of its own. A reader who wants every reading at a glance can still set Conversation statistics position back to On its own line on the settings page's Conversation tab. Settings already stored are not rewritten: an installation that never set this preference shows the new default after the upgrade.

### Bug Fixes

- With the sidebar collapsed, the New session chip no longer stands left of the column's other icons: the host turns that cell into a 36px icon button and centres what is inside it, while its own icon seat is empty in that state (the icon is hidden, the label is 0 wide) and still took a share of the flex row, pushing the chip 7px left of the column's centre line. The seat now gives up its share, and the chip lines up with the collapse toggle above it and the plugin and search icons below.
- At a phone's width the context ring no longer leaves the input card when the numbers live in the context popover: the dock laid over the toolbar row kept the desktop reserve that clears the permission preset and the model and reasoning-level controls, which is wider than the card at that width, and it carried the ring pinned to its right edge out of the card and past the window. The reserve now stands down at this width, and the ring returns to the card's right end, after the reasoning-level control.

## [0.12.3] - 2026-10-10

[中文](#cn-0.12.3) | [English](#en-0.12.3)

<h3 id="cn-0.12.3">体验优化</h3>

- 推理回放窗口在宿主两版之间都能用：此前它按较新宿主才写的推理正文槽位找要裁剪的盒子，装在钉住那一版宿主上时找不到，推理期间读者看到的还是整段长文。现在窗口从宿主渲染出来的 Markdown 本身认起，往上取第一个真有盒子的祖先来裁剪，滑动的仍是这段 Markdown。
- 推理回放窗口不再先按固定高度裁剪再换回整段：此前的窗口一直是四行高，推理写满四行之后文字在窗口里往上滚，推理一停窗口撤下，整段文字接管这一行——窗口的高度与推理最终占的高度不是一回事，切换的那一下整块内容会跳一次。现在窗口跟着推理长高，长到它最终能占的高度（宿主给过程组正文的那个上限，标准档 400px）就停在那个高度上，文字这时才每 0.84 秒往上走两行，走到最新一行停住，上下边缘也在这时才渐隐；推理没长满之前，文字照平时那样一行行往下读，不再被渐隐遮住。

### 问题修复

- 0.12.2 起，设置里存着早先「聊天区动画效果」档位（「增强」「重绘」「关闭」）的读者，宿主不再拒绝启动本插件：0.12.2 把这一项改回开关，宿主按开关核对配置，读到早先存下的档位名即判定配置无效，整个插件不启动——插件列表里显示「启动失败」，用量面板、消息搜索、模型说明、随包字体与按需加载的各项功能全部失效，设置里也没有 Claude Style 页。现在这一项同时接受开关值与早先的档位名，存着「增强」「重绘」的照旧开着，存着「关闭」的照旧关着；已经处在「启动失败」的桌面端重启一次即恢复。
- 手机宽度（390px 及以下）的输入区不再让上下文计量环压住右边的推理等级按钮：此前环按右端定位、等级按钮也按右端排，两者叠在一起，环还常常被挤出卡片；现在这一档为环留出它占的宽度，等级按钮落在它左边，卡片上的三个控件都不再越界。
- 装了壁纸插件（dsh-plugin-wallpaper-engine）时，配色留在 Claude 也能看到壁纸，文字照样清楚：此前皮肤把不透明画布直接画在窗口、侧栏与对话列上，壁纸被整片盖住；只让开外壳之后，会话正文、表格、侧栏条目与标题栏又直接压在花壁纸上读不清，设置窗口也变成透明。现在壁纸在播时外壳让开，整个窗口铺一层画布色遮罩——浅色是 86% 的象牙白，深色是 82% 的暖黑——侧栏、标题区、会话与底部读数落在同一块底子上；输入卡下面垫一块同宽的画布色托盘，滚过去的正文不会从统计行底下透出来；设置窗口、弹层、卡片与引导层照旧不透明。壁纸关掉后画布原样回来；配色选「跟随宿主」时的共存不变。
- 经局域网地址或隧道打开的页面（例如手机经 dsh-pocket 访问）不再回到出厂外观：此前这种页面上的主题风格、配色、吉祥物等全部按默认值显示，设置页一改动就报「设置存储服务异常」；现在页面显示 DSH 当前的设置，在运行 DSH 的电脑上改动后不需要刷新就跟上，设置页开头说明改动要在那台电脑上做，控件全部禁用。

<h3 id="en-0.12.3">Improvements</h3>

- The reasoning's streamed window works across both host versions: it used to look for the reasoning body through a slot only the newer host writes, so on the pinned host it found no box to clip and the reader saw the whole reasoning grow. It now reads the host's rendered Markdown itself and clips the nearest ancestor that has a box, sliding that Markdown inside it.
- The reasoning's replay window no longer clips to a fixed height and then hands the row back to the whole text: the window stood four lines tall, the text scrolled up inside it once it filled those lines, and the whole reasoning took the row over the moment the reasoning stopped — the window's height and the height the reasoning ended at were two different things, and that switch moved the block. The window now grows with the reasoning and stops at the height it will end up occupying (the host's own cap on a process group's body, 400px in the Standard tier), and only there does the text step up two lines every 0.84 s behind the softened edges, stopping at the newest line. Below that cap the reasoning is read line by line as it is written, with nothing faded.

### Bug Fixes

- Since 0.12.2 the host no longer refuses to start the plugin for a reader whose settings still hold an earlier "Chat-area animations" choice ("enhanced", "redraw" or "off"): 0.12.2 turned that preference back into a switch, the host checked the stored config against a switch, judged the earlier choice name invalid and started nothing of the plugin — the plugin list showed it as failed to start, and the usage dashboard, message search, model copy, bundled fonts and every on-demand feature stopped working, with no Claude Style page in Settings. The preference now takes both the switch value and the earlier choice names: "enhanced" and "redraw" stay on, "off" stays off; a desktop already showing the failure recovers after one restart.
- On a phone-width composer (390px and under) the context meter no longer sits over the reasoning-level button at the row's right end: the meter is positioned from that end and so was the button, so the two overlapped and the meter was often pushed out of the card; the row now reserves the width the meter takes, the button lands before it, and all three controls stay inside the card.
- With the wallpaper plugin (dsh-plugin-wallpaper-engine) installed, the wallpaper now shows under the Claude palette and the text stays legible: the skin used to paint opaque canvases over the window, the sidebar and the conversation column and covered the wallpaper whole, and once the shell gave way the transcript, tables, sidebar entries and the title bar sat straight on a busy wallpaper while the settings window went transparent. While a wallpaper is up the shell now gives way and one mask in the canvas colour covers the window — ivory at 86% in light, warm black at 82% in dark — so the sidebar, the header, the transcript and the figures at the bottom read on the same ground; a canvas-coloured tray the width of the composer card keeps the transcript scrolling under the dock row from showing through; the settings window, popovers, cards and overlays keep their fill. The canvases return once the wallpaper goes; coexisting under "follow the host" is unchanged.
- A page opened through a LAN address or a tunnel (a phone reaching DSH through dsh-pocket, for example) no longer falls back to the default look: such a page showed the theme style, colours, mascot and every other setting at their defaults, and any change on the settings page reported that the settings store was unavailable. The page now shows the settings DSH holds and follows changes made on the computer running DSH without a reload, and its settings page opens with a line saying changes are made on that computer, its controls disabled.

## [0.12.2] - 2026-10-10

[中文](#cn-0.12.2) | [English](#en-0.12.2)

<h3 id="cn-0.12.2">新增功能</h3>

- 设置页「侧栏」页新增「侧栏搜索」下的「搜索框样式」三档：「覆盖品牌」（默认）把搜索框放进品牌行、指针移到侧栏上时盖过品牌；「独立」在品牌行下方给它自己一行并一直显示；「图标」不画插件自己的搜索框，保留 DSH 自己的搜索按钮，只把单击接管过来，点它打开本插件的面板。切换不需要刷新页面。
- 写在输入卡片下面那一行数字重新有了自己的弹层：这一行此前只显示六个读数，宿主统计行上那些明细（模型用时、工具调用用时、首 token 平均、输出速度，以及缓存命中、未缓存输入、缓存读取、写回、输出这些用量行）在「写在单独一行」这一档下无处可看。现在这一行本身就是宿主那张上下文弹层的第二个触发口——按一下这些数字，弹层就在这一行上方打开，内容仍是同一份：宿主自己的上下文行加上这一段会话的数字明细，两种位置下都由同一份数据填充；按一下再收起，回车与空格同样开合、Esc 收起，弹层开着时这一行自己也报出展开状态。悬停开合仍只归计量环那条路径：指针停在数字上不展开弹层。窗口尺寸或输入区变化时弹层照旧重新量位置。
- 设置页「对话」页新增「对话统计信息位置」：会话统计与 Token 用量此前只有一个去处——输入区上下文圆环的弹层。现在默认把它们写在输入卡片下面单独一行：轮数与步数、输出速度、读入与写回的 tokens、缓存命中率，末尾就是那个圆环，宿主统计行上的图标一个都不出现；也可以选「收进上下文」，回到弹层那一份。这一行里的数字一有变化就逐个字符重新入场（每走一个步骤、流式输出期间都在动，没变的数字保持不动），缓存命中率与圆环按各自的无极色阶取色（命中率九成的红到 99% 的深绿，占用两成的绿到四成的红，两个色标之间由浏览器在 OKLCH 里插值）。窗口窄到这一行放不下时它按固定顺序让位——先去缓存那截的字样，再去轮数与步数，再去圆环旁的数字（环留下），然后把读入与写回合成一个合计并去掉箭头，最后把数字折叠成 k / M / B——数字不再挤在一起互相压字，窗口宽回来时按同一顺序退回。这一项从此有自己的设置，不再与「重绘权限控件」共用一个开关；设置表单多了一个字段，正在运行的宿主重启一次才会提供它。
- 设置对话框「Claude Style」页的标题行右端新增一枚 GitHub 标识，按一下在新的标签页里打开插件仓库（https://github.com/Nwflower/dsh-claude-style）。标识的颜色取次一级的文字色，深浅两套配色各自跟随；指针移上去底部铺一层悬停底色、图形加深，键盘焦点落到它上面时出现一圈强调色描边，读屏念出「在 GitHub 上打开本插件」。插件页上那一份沿用宿主自己的标题行，不加这枚标识。

### 体验优化

- 中文界面下权限选择器的档位名改用宿主自己的中文名：分段控件上的当前档位与弹层里的每一行此前写死为皮肤的 Claude 英文名（Read only / Accept edits / Full access），中文界面里只有名字下面那行说明是中文；现在界面语言是中文时这几处读宿主 `permission.access` 文案表里的原文——「仅可查看」「工作区内修改」「完全权限」，宿主调整自己的用词时皮肤跟着变；切成别的界面语言仍是皮肤的名称。
- 侧栏搜索的会话内容搜索从秒级等待变成即答：每个会话的语料（读者的消息与助手的回答）此前只留在宿主进程内存里，宿主每次重启后的第一次搜索都要把全部会话日志重读一遍——本机 260 个会话约 30 秒；现在它落一份 `$DSH_HOME/cache/dsh-claude-style/search/<会话 id>.json`，重启后只读这些文件，约 1.4 秒，存档会话里只有修订号变过的才重读，宿主开着的会话按事件序号只读新增的那一段。查询本身也从整篇正则扫描改成小写子串查找，本机 260 个会话、8252 条消息的语料上单次查询 5–20 毫秒（此前约 0.5 秒）。语料缓存按需构建：只有读者真的搜索时才会读日志、才会落盘。在一台还没有缓存的机器上，第一次搜索仍要读完全部会话日志一次。
- 会话数字那一行不再用 · 把各段隔开：轮数与步数、输出速度、读入与写回的 tokens、缓存命中率之间此前各插一个 · 符号，行一窄就要多让一档；现在这些符号去掉，各段只靠行自己的间距分开（间距从 6px 放到 10px），一行能容下的数字更多，抄出来也是一段干净的话。端到端通道与冒烟用例各新增一条读数：那一行的 DOM 里一个 · 都不出现。
- 搜索面板里点开一条内容命中，现在落到那条消息所在的一轮，不再只停在这个会话的开头：面板按命中消息的事件序号，从会话的整篇轮次大纲里找出它属于哪一轮，等这一轮进了已加载窗口再经宿主的刻度定位。会话历史很长时，定位前会先把这一轮的记录翻页读进来；找不到对应轮次时停在会话本身，与从前一样。
- 过程组的标题不再只写「执行了命令，已读取文件，已调用工具等」，改写这一组装了什么：「执行 2 次思考，调用 1 次工具」。没有的项不写，数字随内容增加逐位滚动（160 ms，减弱动效时直接落位），这一段还在进行时整行带着与宿主同样的扫光；控件的可访问名字始终是这句完整的话，读屏念到的与看到的一致。标题放不下整句时（窗口窄，或这一行本身不长）改用简洁写法「思考×2 · 工具×1」，位置宽回来再换回整句——两种写法都不会被省略号截断。能否放下按标题所在容器给它的宽度判断，不按它当前有多宽。计数按过程组内部每一行的种类算：带 `data-chat-group-part="reasoning"` 的助手步算思考、其余助手步算输出、工具调用算工具、命令与其它记录算记录，工具行内部的调用不重复计入。
- 轮次进行中，对话末尾那一行不再固定写「深度求索中，用时 N 秒 ···」，而是说出这一轮此刻在做的事：「正在思考」「正在准备工具调用」「正在调用工具」「正在写回答」，后面跟着这一轮已用的时间（用宿主自己的时间单位）。读不出状态时（模型还没写出任何内容、也没有工具在跑）回到宿主自己的「深度求索中」——这正是读者那一刻在宿主界面上看到的同一句话；模型连续 10 秒没有开口时，计时后面再挂出「暂未响应」。说法换掉时走一段三段式交替（transitions.dev 的「Text states swap」）：旧的那句一边模糊一边向上淡出，淡出之后才换成新的，新的一句从下方升上来；「动画」设为「减弱」时直接换掉，不做这三段。这一行带扫光，宿主的小鲸鱼与读屏播报照旧，关闭「聊天区动画效果」后宿主原来的写法原样回来。轮次状态行里的同一句说法与这一行共用一处（`shared/turn-activity.ts`）：正在思考、正在准备工具调用、正在调用工具、正在写回答现在读的是同一份文案。
- 模型推理期间，思考行里的推理文字不再一行行把整列对话往下推着长：它停在四行高的窗口里，上下边缘渐隐，文字每 0.84 秒往上走两行（0.5 秒滑过去、曲线 cubic-bezier(0.22, 1, 0.36, 1)），走到最新一行就停住，读者始终看得见推理的结尾。这一套来自 transitions.dev 的「Reasoning stream」，按实时文字改写：不克隆、不循环。推理一停（或读者把这一行收起），窗口撤下、位移归零，读者打开这一行读到的是完整文本；「动画」设为「减弱」时不设窗口。端到端通道新增 `reasoningStream` 场景：在真实宿主上核对窗口高度与遮罩、每一步的位移与过渡、位移从不越过内容末尾（实测走到 211px 正好等于文本 303px 减窗口 92px），以及推理结束后窗口撤下、完整文本 303px 铺开。
- 设置页的「品牌标识」改名为「主题风格」，并从「外观」页移到「通用」页最前面：这一项选的是整套品牌标识与配色色系，此前排在「外观」页首位，而同页的配色、字体与吉祥物都只改一样东西；现在它与用户名、动画效果这些通用项排在一起，「外观」页只剩配色、字体、吉祥物与出现位置。可选的品牌、存下的设置值与切换后的效果都不变。

### 问题修复

- DeepSeek 品牌下侧栏品牌区的 HARNESS 徽标重新显示：皮肤此前把宿主标志里的胶囊徽标与徽标上的字形一并隐藏，品牌区只剩下鲸鱼与 deepseek 字样；现在宿主的整幅标志（鲸鱼、deepseek 字样与 HARNESS 徽标）原样保留，徽标沿用 DeepSeek 蓝的胶囊底与反白字形。Claude 品牌下品牌区照旧画皮肤自己的标。
- 输入行右端的上下文计量环不再跟着宿主的行高、空隙与药丸宽度跑偏：把数字收进上下文弹层那一档下，皮肤把卡片下面那一条 dock 盖到输入行上，此前是按「行高 28px、这一行距容器底 4px、给行尾留出计量环自身的宽度 +8px」这几个写死的数放它——它们都属于宿主，卡片的空隙或行高不同，计量环与读数就整体离开那一行（0.2.0-rc.2 的 macOS 端实测偏 4 CSS px，与本机相差一个空隙），药丸比宿主停放的那个节点宽时行尾的文字还会被药丸底色压住。现在行高与空隙由 composer 每次经过从输入行自己量出来（`--dsh-claude-meter-row-offset`、`--dsh-claude-meter-row-height`），留出的宽度按「停放节点与触发按钮两个盒子并起来」再 +8px 算，量在行或容器尺寸变化时做；端到端通道新增 `statsOverlay` 场景：卡片下方的空隙分别改成 0 与 16px 后 dock 的两个盒子边仍与输入行逐边相同（量出的空隙跟着由 4px 变 0 与 16px），再把触发按钮在停放节点里左移 14px，断言行尾文字与药丸左缘仍留 8px。
- 进行中的状态行只在插件自己跟随末尾时停在输入框上方：此前只要宿主还报着「跟随在开」，读者往上翻看历史时这一行仍按固定位置浮在输入框上方、压住正在读的内容，直到宿主自己发现读者离开末尾。现在读者接管滚动（滚轮、触摸、拖动滚动条、滚动键、页内查找，以及对话导航跳到某一轮）期间，这一行的固定整个让开，随内容一起走；读者自己回到底部后跟随继续，这一行也回到输入框上方。端到端通道新增 `readerScroll` 场景：轮次进行中滚一次滚轮，读者滚动之前该行 158 帧停在 426px，之后 382 帧无一处停在固定位置、全部随内容移动。
- 侧栏搜索的内容匹配不再搜进注入上下文与推理过程：`user/message` 里由宿主注入的环境快照、Skill 目录、AGENTS.md 与压缩检查点此前一并进了语料，于是搜到的「会话」里出现读者从没打过、模型也没答过的字；现在只收人类发出的消息（按事件自带的 `source.kind === 'user'`）与助手回答里的文本块，推理块、工具调用与工具结果都不进。实测同一条会话里，只出现在 Skill 目录里的字符串与只出现在推理块里的字符串都从命中列表里消失，读者自己发的原文仍照常命中。
- 会话数字的入场动画不再把整屏内容顶来顶去：数字一变化，新字符就从自己位置下方 8px 滑入，而这一行与对话共用宿主同一个滚动容器——滑入的那几像素越过输入区底边，把容器的可滚动高度顶大 3px（实机测得 1649 → 1652），末尾跟随随即补偿，输入卡片与上方对话跟着上下跳一次，动画落回时再跳一次；流式输出期间每个数字都在动，这一跳就一直重复。现在这一行把自己裁掉（`overflow: clip`），入场留在行内，容器的可滚动高度不再跟着数字变化。端到端通道的 `statsPosition` 场景新增一条读数：在同一帧里写一次数字、量容器可滚动高度的增量，必须是 0（改前为 3）。
- 会话数字那一行不再把上方的对话推来推去：窗口窄到这一行放不下时，它按台阶让位，第三个台阶让出的是计量环旁的数字，而那个数字正是宿主触发按钮的高度——按钮一矮，输入区底部这一行就跟着矮，上方的对话按这一行排、并把末尾钉在它上面，于是数字每跨过这一档，整屏内容就上下跳一次，来回两下。现在让位只让出宽度：触发按钮保持一行的高度（20px 行高加宿主自己的上下各 1px），圆环留在原位，行高不随台阶起落变化，对话也不再移动。端到端通道的 `statsPosition` 场景新增一条读数：在同一帧里量「让出读数」与「读数在位」两种情况下这一行的高度，两者必须相同。

### 移除

- 「聊天区动画效果」不再是三档，也不再是两档分段控件，而是一个开关：开启时播放本插件的这一套，关闭时把聊天区交回宿主。上一版接在「重绘」档上的会话视图（插件自己渲染的对话区：链路折叠与计数行、推理卡片、逐词淡入、按宿主「工作步骤展示」分档的收拢、子会话的第二份视图）整体移除，那套实现来自 dsh-better-display 的整份移植，读者装上那个插件就能得到同样的界面，本插件再维护一份的代价大于收益。此前存下「重绘」或「增强」的读者照旧开着这一项，存下「关闭」的照旧关着，不需要重新设置。同时移除的还有：插件自己的「工作步骤展示」桥接、只为阅读视图装上的宿主内部开发依赖与 TSX 工具链、端到端场景 reader / readerOpen / readerTurnNav / stepDisplay 与冒烟用例 chat-reader。搬到开关下的两处视觉仍出自那个实现，它的许可说明留在第三方声明里。搜索面板点开内容命中仍在会话里落到那一轮，改经宿主的刻度跳转。

### 其他变更

- 端到端通道与 `packages/testing/dsh-web.cjs` 起的临时宿主随启动它的进程一起结束：此前启动进程被强制终止或抛出未捕获的错误时，`dsh web` 实例留在后台继续占用端口与 `$DSH_HOME`，它的目录随后被删掉时还会持续占满一个以上的 CPU 核心；现在启动进程无论以哪种方式结束，宿主都在随后一秒内退出。

<h3 id="en-0.12.2">New Features</h3>

- The Sidebar tab gains a Search box style choice under Sidebar search: Cover the brand (the default) keeps the box in the brand row, standing over the brand while the pointer is over the sidebar; Standalone gives it a row of its own under the brand row, shown always; Icon draws no box of the plugin's and keeps DSH's own search button in place with only its click taken over, so pressing it opens this plugin's palette. Switching needs no reload.
- The line of numbers under the input card has its own popover again: that line showed six readings, while the detail the host's statistics row carries — model time, tool time, first-token average, output speed, and the usage rows for cache hits, uncached input, cache reads, cache writes and output — had nowhere to be read with the statistics asked onto a line of their own. The line is now the second trigger of the host's context panel: pressing the figures opens that panel above the line, holding the same session's data — the host's own context rows followed by the numbers' own detail rows, filled from one source in either position; pressing again puts it away, Enter or Space does the same from the keyboard, Escape closes it, and the line reports its own expanded state while the panel stands. Opening and closing on hover stays the ring's own path: resting a pointer on the figures never unfolds the panel. The panel re-takes its placement when the window or the composer changes.
- The settings page's Conversation tab gains Conversation statistics position: the session statistics and the token usage used to have one place to live — the popover of the composer's context ring. By default they now stand on a line of their own below the input card: the turns and steps, the output speed, the tokens read in and written back and the cache-hit share, with the ring itself at the end and none of the host row's icons; Inside the context popover is still available for the panel's own set. A figure on that line re-enters character by character whenever it moves (every step and all through a streaming answer, while the figures that did not move stay still), and the cache share and the ring each take their own colour band (the share from red in the nineties to dark green at 99%, the occupancy from green at a fifth to red at two fifths, mixed between stops by the browser in OKLCH). A window too narrow for the whole line makes it give way in a fixed order — first the cache share's words, then the turns and steps, then the number beside the ring (the ring stays), then the tokens read in and written back as one total without the arrows, and last the counts folded into k / M / B — so figures never crowd each other or draw over one another, and the same order gives them back as the window grows. The row answers to a setting of its own from now on rather than sharing the permission control's switch, and the settings form carries one more field, which a running host serves after a restart.
- The Claude Style page in the settings dialog now ends its heading row with a GitHub mark; pressing it opens the plugin's repository (https://github.com/Nwflower/dsh-claude-style) in a new tab. The mark takes the secondary label ink, following each palette; the pointer gets the skin's hover plate with a darker mark, the keyboard gets an accent focus ring, and the accessible name reads "Open the plugin on GitHub". The copy on the plugin's own page keeps the host's heading and carries no mark.

### Improvements

- On a Chinese interface the permission selector names its tiers in the host's own Chinese words: the trigger's current tier and every popover row used to read the skin's fixed Claude names (Read only / Accept edits / Full access) with only the description line under each name in Chinese; with the interface in Chinese those names now come from the host's `permission.access` dictionary — 仅可查看 / 工作区内修改 / 完全权限 — so the skin follows the host when it rewords them, while any other interface language still reads the skin's names.
- The sidebar search's session-content search answers at once instead of after a wait: each session's corpus (the reader's messages and the model's answers) used to live in the host process's memory alone, so the first search after every host restart re-read every session log — about 30 seconds for 260 sessions on this machine. It now keeps one `$DSH_HOME/cache/dsh-claude-style/search/<sessionId>.json`, which a restart reads back in about 1.4 seconds; a stored session is re-read only when its revision moved, and a session the host holds open contributes only the events appended since the last fold. The query itself reads lowercased text instead of scanning with a regular expression: 5–20 ms per query over 260 sessions and 8252 messages on this machine, against about 0.5 s before. The cache is built on demand — logs are read, and files written, only when the reader actually searches, and the first search on a machine with no cache still reads every session log once.
- The line of session numbers no longer separates its groups with ·: a · stood between the turns and steps, the output speed, the tokens read in and written back and the cache-hit share, and a narrow line gave up a step sooner for them. Those glyphs are gone, the groups stand apart by the line's own gap alone (widened from 6px to 10px), the line fits more figures, and copying it out leaves a clean sentence. The end-to-end lane and the smoke each gain a reading: the line's DOM carries not one ·.
- Picking a content hit in the search palette now lands on the turn holding that message instead of stopping at the top of the session: the palette reads the message's event sequence, finds the turn it belongs to in the session's whole-log outline, and positions there through the host's marks once that turn is in the loaded window. On a long history the turn's records are paged in first; when no turn can be found the reader stops at the session itself, as before.
- A process group's header no longer reads as the host's list of activities ("ran a command, read a file, called a tool, …"): it says what the group holds — "2 thoughts, 1 tool call". Empty figures are left out, each number rolls as the work grows (160 ms, set at once under reduced motion), the whole line sweeps the way the host's words do while that piece of work runs, and the control's accessible name is that sentence, so what a screen reader announces matches what is on screen. A header without the room for the sentence (a narrow window, a short row) falls back to the compact figures, `Thinking×2 · Tools×1`, and takes the sentence back when the room returns — neither wording is cut off with an ellipsis. The room is read from what the header's own container gives it rather than from how wide it happens to be. The counts come from each row the group holds: an assistant step carrying `data-chat-group-part="reasoning"` counts as a thought, any other assistant step as an output, a tool call as a tool, and commands and other records as records; a tool row's own inner calls are not counted twice.
- While a turn runs, the line at the end of the conversation no longer reads a fixed "Deep diving for N s ···": it says what that turn is doing now — "Thinking…", "Preparing a tool call…", "Running tools…", "Writing…" — with the time the turn has taken beside it in the host's own units. Where no state can be read (the model has written nothing and no tool is running) it falls back to the host's own "Deep diving", which is the very line the reader sees in the host's interface at that moment; once the model has been silent for ten seconds "No response yet" appears beside the clock. A wording that changes runs transitions.dev's "Text states swap": the old one blurs and fades upward, the text changes once it has gone, and the new one rises from below — with Animation set to Reduced the wording is written at once and none of the three phases runs. The line sweeps, the host's whale and its screen-reader announcement stay, and switching Chat-area animations off brings the host's own wording back as it was. The turn status line reads the same four states from one place (`shared/turn-activity.ts`).
- While the model reasons, the reasoning text in its thinking row no longer grows line by line and pushes the whole conversation down: it stands in a window four lines tall with a softened edge at each side, and the text steps up two lines every 0.84 s (half a second of travel on cubic-bezier(0.22, 1, 0.36, 1)), stopping at the newest line so the reader always sees how the reasoning ends. This comes from transitions.dev's "Reasoning stream", read as live text: no copy and no wrap. Once the reasoning stops — or the reader folds the row — the window comes off and the offset returns to zero, leaving the whole text for the reader who opens the row; with Animation set to Reduced the window is never set. The lane gains a `reasoningStream` scenario: on the real host it checks the window's height and mask, the offset and the transition of each step, that the offset never passes the content's end (measured 211px, exactly the text's 303px less the window's 92px), and that the window comes off afterwards leaving the whole 303px of text.
- The settings page's Brand mark is renamed Theme style and moves from the top of the Appearance tab to the top of the General tab: the row picks the whole brand mark and colour family, and it used to lead a tab whose other rows — Colours, Typefaces, Mascot — each change one thing; it now stands with the general choices, while the Appearance tab keeps Colours, Typefaces, Mascot and Where it appears. The brands on offer, the stored values and what a switch does are unchanged.

### Bug Fixes

- The sidebar's brand area shows the HARNESS badge again under the DeepSeek brand: the skin used to hide the host mark's pill badge together with the letterforms inside it, leaving the whale and the deepseek wordmark alone; the host's whole lockup — whale, deepseek wordmark and HARNESS badge — now stands as it is drawn, the badge keeping its blue pill and reversed-out letters. The Claude brand still draws the skin's own mark.
- The context meter at the composer row's right end no longer drifts with the host's own row height, gap or pill width: with the numbers asked into the context popover the skin lays the dock under the card over the toolbar row, and it used to place it from fixed numbers — a 28px row, 4px above the containing block's bottom, and the meter node's own width plus 8px kept free at the row's end. All of them belong to the host, so a card leaving a different gap under that row, or a taller row, carried the ring and its reading off the row entirely (4 CSS px off on a macOS host running 0.2.0-rc.2, whose gap differs from this machine's by exactly that), and a pill wider than the node the host parks it in let the ring's hover face cover the row's own text. The composer pass now measures the row's height and gap from the row itself (`--dsh-claude-meter-row-offset`, `--dsh-claude-meter-row-height`) and computes the room as the union of the parked node and the trigger button, plus 8px, re-reading both when the row or the stack changes size. The end-to-end lane gains a `statsOverlay` scenario: with the card's gap under that row moved to 0 and to 16px the dock's box still matches the row's edge for edge (the measured gap follows, 4px to 0 and to 16px), and a trigger shifted 14px left inside its parked node still keeps 8px between that node's row text and the pill's left edge.
- A running turn's status line rests above the composer only while the plugin's own follow is the one moving the position: as long as the host still reported its follow as on, scrolling back through the history left the line floating at the pinned place over the content being read until the host noticed the reader had left the tail. The line's pin now stands down for the whole time the reader owns the scroll — wheel, touch, a drag of the scrollbar, the scroll keys, in-page find, and a jump to a turn — and travels with the content instead; once the reader comes back to the bottom the follow resumes and the line rests above the composer again. The end-to-end lane's new `readerScroll` scenario scrolls the wheel once during a live turn: 158 frames at 426px before the reader's wheel, and 382 frames after it with no frame at the pinned place and every frame moving with the content.
- The sidebar search's content match no longer reaches into injected context and reasoning: the environment snapshots, Skill catalog, AGENTS.md and compaction checkpoints the host injects as `user/message` used to enter the corpus, so "session" hits carried text the reader never sent and the model never answered. Only the reader's own messages (by the event's own `source.kind === 'user'`) and the text blocks of assistant answers are collected now; reasoning blocks, tool calls and tool results stay out. On a real session, a string that exists only in the Skill catalog and one that exists only in a reasoning block both left the hit list, while the reader's own words still match.
- The session numbers' entrance no longer shoves the whole column around: every time a figure moves, its new characters slide up from 8px below their place, and the line shares the host's one scroll container with the conversation — those few pixels reach past the composer's bottom edge and grow that container's scrollable height by 3px (1649 to 1652, measured on a live host), which the tail pinning answers by moving the input card and the conversation above it once, and once more when the entrance settles. With figures moving all through an answer, that movement repeated for as long as the answer streamed. The line now clips itself (`overflow: clip`), so the entrance stays inside the row and the container's scrollable height no longer follows the numbers. The end-to-end lane's `statsPosition` scenario gains a reading: within one frame it writes a figure once and measures how much the container's scrollable height grew, which must be 0 (it was 3).
- The line of session numbers no longer shoves the conversation above it around: when a window is too narrow for the whole line, the line gives way one step at a time, and the third step gives up the number beside the context ring — the very number that makes the host's trigger as tall as it is. A shorter trigger made the composer's bottom row shorter, and since the conversation above is laid out from that row and pins its tail to it, every crossing of that step moved the whole column, once each way. The step now gives up width alone: the trigger keeps its one-line height (a 20px line inside the host's own 1px padding), the ring stays where it was, the row's height no longer follows the ladder, and the conversation stays put. The end-to-end lane's `statsPosition` scenario gains a reading: within one frame it measures that row with the reading given up and with the reading back, and the two must match.

### Removals

- Chat-area animations is no longer three-way, nor a two-way segmented control, but a switch: on plays this plugin's set, off hands the conversation back to the host. The conversation view the Redraw tier used to hand the area to (the plugin's own rendering of the conversation — folded chains with their counted rows, reasoning cards, the per-word fade, the fold ranges that followed the host's Work details setting, a second view for a sidebar child session) is removed whole: that implementation was a full port of dsh-better-display, and a reader who installs that plugin gets the same interface, so a second copy kept here cost more than it returned. A reader who had stored Redraw or Enhanced keeps the setting on, and one who had stored Off keeps it off, with nothing to reconfigure. Also removed: the plugin's own Work details bridge, the host-internal development dependencies and the TSX toolchain that only the reading view needed, the end-to-end scenarios reader / readerOpen / readerTurnNav / stepDisplay and the smoke case chat-reader. The two pieces of that look which moved under the switch are still derived from that implementation, so its notice stays in the third-party notices. Picking a content hit in the search palette still lands on the turn holding that message, through the host's own marks.

### Chores

- The scratch hosts that the end-to-end lane and `packages/testing/dsh-web.cjs` start now end with the process that started them: a launcher that was killed or died on an uncaught error used to leave its `dsh web` instance running in the background, holding its port and `$DSH_HOME`, and spinning more than one CPU core once that directory was deleted; now the host exits within a second however the launcher ends.

## [0.12.1] - 2026-10-09

[中文](#cn-0.12.1) | [English](#en-0.12.1)

<h3 id="cn-0.12.1">新增功能</h3>

- 「聊天区动画效果」的「重绘」档换上插件自己的会话视图：它直接占据宿主「对话」视图的位置，标签条上不再多出一个标签，宿主转到「对话」的跳转同样落到它；档位离开「重绘」时宿主的「对话」原样回来。轮次进行中，新出现的一段思考把同一条链上此前的思考、正文与工具收成一行（思考×N · 输出×M · 工具×K），数字随内容跳变，用户插话重新开一条链，收拢走收缩、计数、停顿、展开四段时序；轮次成功结束后过程与中间叙述收起、只留最终回答与它的复制、分叉、反馈操作，失败、中断与等待批准的轮次保持展开，读者选中文字期间推迟折叠，历史轮次随时可以点开。思考在卡片里按阅读节奏滑动跟随，卡片只放思考的文字，读者滚回末尾即重新跟随；收进折叠的思考每段只占一行，写作「思考 · 内容」并带着思考卡片的边框，与中间输出一眼分开，按一下边框随全文展开；正文由宿主的 Markdown 渲染，新出现的词逐个淡入；工具行写出目标、改动行数与慢调用的计时，展开后是宿主自己的工具详情、输入与原始记录。轮次进行中的每一种状态（等待模型、思考、输出、准备与使用工具、等你操作）都由最新一条消息下面同一行说出；等待模型时这一行计时，过 10 秒标出「暂未响应」，进行中的过程也从这一行展开与收起。页面上装有 dsh-better-display 的阅读视图时这一份不登记；桌面端随带的 0.2.0 宿主与 npm 上的 0.2.1 宿主都能读。「动画」设为「减弱」时一律直接落位。
- 模型选择器的每一行标出该模型此刻的倍率：峰价、谷价与限时活动三种状态各有自己的图标，颜色区分贵与便宜，倍数后面跟着距离切换还有多久，鼠标停在徽章上读到「此刻的判定 · 多久后转为哪个状态」的完整一句，距切换不足一分钟时读 `<1m`。判定按各家供应商自己发布的作息表与自己的时区做（工作日窗口之外、周末与法定节假日整日算谷价，跨零点的窗口归它开始的那一天，夏令时切换按真实时刻计算，落进夏令时空档的窗边落在跳变那一刻）；没有作息表的模型不显示徽章，把标准费率整天在走的供应商按其作息表显示。限时活动按文档声明的日期与时刻边界起止（结束时刻就是切换那一刻，已经结束的活动不会再生效）。作息表来自公开目录 offpeakclock.com 的一份快照：宿主半边取一次、在 `$DSH_HOME/cache/dsh-claude-style/peakrate.json` 留一份缓存、每 24 小时刷新一次，经 `/dsh-claude-style/peakrate` 下发（`POST` 强制重拉），连不上时按插件包里带的那份判定；浏览器半边只在功能装上时读一次，第三方地址不经过页面。构建核对匹配表里每一行点到的那条作息确实在包内快照里、且属于同一个供应方，对不上即构建失败。设置页「输入区」页新增「峰谷电表」子项，关闭后各行的徽章消失，模型选择器关闭时该项目变灰不可操作。

### 体验优化

- 设置页「对话」页的「聊天区动画效果」从开关改成三档分段控件：关闭、增强、重绘。「关闭」把聊天区交回宿主；「增强」是原来的全套动效（跟随、自动开合与卷帘门、新文字淡入、文件变更行、聊天气泡动效）；「重绘」交给另一套动效，接上的是聊天气泡动效与插件自己的阅读视图。旧版本存下的开关取值照旧生效（开 = 增强，关 = 关闭），不需要重新设置。
- 页面启动时插件占用的主线程时间减少：设置页、内容搜索、吉祥物、发送动效、对话导航、上下文弹层与封号彩蛋这七个首屏可以缺席的功能离开 `lib/client.js`，各自成为一个块，由插件已有的资产路由 `/dsh-claude-style/assets/` 提供，页面被接管后立即请求、到达后安装。在本地临时宿主上实测（两种产物各载入 20 次取中位数）：`lib/client.js` 从 776 KB 降到 712 KB，前 3 秒的主线程长任务从 713 ms 降到 648 ms，皮肤生效时刻从导航后 298 ms 提前到 280 ms；七个块经 brotli 压缩后共 33 KB，比主产物晚约 5 ms 到达。块与它的 source map 各自按自身内容的哈希命名，浏览器不会把旧的 map 当成新的那份；构建拒绝主产物与块同时携带同一个模块（构建期生成的模块也在其中，它经共享表读主产物里的那一份）。插件更新后页面换代时，块已经在磁盘上：构建把主产物写在最后，先写新资产、再写清单、最后删清单里没有的文件。
- 设置页「侧栏」页新增「面板悬浮卡片」开关：开启（默认）时右侧栏停靠的面板仍是悬浮卡片——四周留 8px、16px 圆角、1px 描边与投影；关闭后停靠的面板铺满整列、贴住四边，分栏时每栏铺满各自那一栏，两栏之间只留宿主的接缝线。切换不需要刷新页面。
- 模型选择器每一行的说明改由一张按名字模式认领的有序规则表得出：带上日期后缀、把官方点号写成连字符或下划线（`glm-5-3-flashx`）或换一个售卖方前缀，仍然读到同一句；`k3-256k`、`ernie-5`、`minimax-m3-1m`、`deepseek-v41-flash` 这类目录拼法各自落到所在产品线的规则上，不必再逐条登记。带版本数字或最高级的说明写成锚定该版本的规则（`glm-5.3`、`gpt-5.4`、`qwen3.8-max`、`step-3.7-flash`、`celeris-1` 等），同产品线的其他版本读到线级文案；目录里现有的 25 个模型 id 里，除 Grok 与 ERNIE 两行按另一条记录改写外，其余解析出的句子与改动前逐条相同。
- 「重绘」档里轮次进行中的那条状态行（「正在思考」「正在使用工具」这些）上下各收进 30px，贴着最新一条消息读，不再像独占一行。实测：该行与上方轮次之间原有的 26px 空隙收掉，行内文字与它的下一条内容之间的距离也少 30px；这一行仍按内容居中，高度不变。为了让它在压上去时不露出旧内容的接缝，这一行补了一圈底色投影，并抬到上方内容之上。
- 「重绘」档的思考卡片只留思考本身：参考实现搬来的「思考 · 第 N 步」抬头、「暂停跟随 / 跟随最新」与「完整阅读 / 收起」两个按钮，以及为展开态在会话里量出的阅读高度都不再出现，卡片的边框里就是思考的文字，高度由预览高度与内容决定。跟随仍按阅读节奏走，滚回卡片末尾就重新跟随，而上一版要靠按钮点回来的那一步现在由滚动自己完成；展开一段思考仍是从折叠里那行文字点开，于是每段思考在折叠里保持一行，读全文按一下即可。
- 「重绘」档的一轮过程现在按宿主「工作步骤展示」的当前档位成形，两侧设置不再各行其是：插件不新增自己的档位控件，只读宿主 `ui-chat` 命名空间的档位并在每次有轮次开始时重读，读不到时按网页端缺省档「详细」。「简洁」把整条链收成一行，中间输出的正文也进这一行的计数；「标准」收拢最后一段思考之前的全部步骤，中间输出随最后一段思考留在行外；「详细」把结尾的中间输出留成自己的一行、收拢它之前的全部步骤；「完全展开」与「详细」同形，另外把收进折叠的思考画成整张推理卡片（全文，而不是「思考 · 内容」一行），工具仍由读者自己按开。宿主自己的设置行仍是唯一控件，插件不代写。
- 模型选择器里 Grok 与 ERNIE 两行的说明改写：Grok 的规则从匹配 4.5 改成匹配 Grok 4 整条产品线，`grok-4`、`grok-4.5`、`grok-4-2026` 这些拼法读到同一句「全球最智能的模型之一，支持原生工具使用以及实时搜索功能。」；ERNIE 5 一行改成「2.4 万亿参数的原生全模态大模型。」，不再列激活比例与上下文长度。
- 插件的样式表以压缩后的文本随包发出：注释与排版只留在源文件里，整张样式表从 349 KB 降到 208 KB，`lib/client.js` 从 712 KB 降到 570 KB。页面画出的样子不变：端到端通道把压缩前后的两份样式表放到同一个页面上，22 个页面状态逐元素比对计算值，全部一致。压缩还把 `!important` 审计过去豁免的一部分规则变成可以逐条判定的（同一个属性写两遍的规则，压缩后只剩一条声明）：判定之后，输入区停止按钮、侧栏进行中指示与聊天区跟随尾部上页面并不需要的 46 处 `!important` 从源样式表里去掉了。审计也随之收紧：处在条件不成立的 `@media` / `@supports` 里的规则不再参与判定，它们的 `!important` 不会因为页面当时不在那个条件里就被判成多余。在本地临时宿主上实测（两种产物各载入 20 次、做两轮，取中位数）：插件包的求值时间从约 9.0 ms 降到约 8.3 ms；启动阶段的其余计时差别落在两轮之间的波动以内。

### 问题修复

- 长会话里流式输出期间的卡顿减少：跟随在每一批文字到达时都要问的几个问题不再落到整个文档上——会话的滚动容器与消息列读一次后保留（换会话、切「轨迹」页签时旧节点会从文档里移除，届时重新读取），流式标记改在消息列里查找，宿主「回到底部」按钮的存在本身就是「跟随已关闭」的判据，而同一帧里读到的高度只读一次，交给收回宿主写下的末尾、判断是否继续滑行这两处共用。在 120 轮、4286 个节点的临时会话上实测：插件发出的文档级查询从 3263 次降到 2762 次（−15%），整页最长的一次停顿从 270ms 降到 234ms；文档越大，省下的每次全页样式重算越多。
- 模型选择器里当前在用的模型、当它所属的供应商不在第一级列表里时，会单独占一级列表最下面一行——这一行过去绕过了其余各行共用的行构造，因此没有峰谷徽章，也没有厂商标志与说明；现在它与列表里的每一行走同一个构造，徽章、标志、说明和行高内边距都一致。
- 「重绘」档里收进折叠的一段思考，展开后再点它的文字没有反应，只能点右侧的折角按钮才能收起。文字上的点击此前只在收起时挂着，展开后整行文字只剩选择文字的作用。现在文字两态都可点：收起时点它展开，展开时点它收起；一次以选中文字收尾的落点不改开合，选中文字期间推迟折叠的行为照旧。
- 进行中的状态行不再随流式内容上下跳动。此前该行只在宿主自己的「跟随还开着」标记下钉住，而流式期间跟随的滑动会把滚动位置停在末尾之前，宿主把这次写入读成读者离开了末尾并摘掉标记，于是每一片内容到达时该行退回文档流、被内容底部推下去，滑动追上来再把它拉回：视口 1280×600 下实测，标记缺席的 115 帧里该行顶边在 447px 与 573px 之间移动，而钉住位是 426px。现在滑动持有位置期间在聊天列上写下自己的标记，该行按宿主标记或滑动标记任一钉住，内容突发的追加不再带动它：同一场景里标记缺席的 112 帧内顶边恒为 426px。往回翻看历史时两个标记都不在，该行照常留在文档位置，不会浮在读者正在读的内容上。
- 「重绘」档里轮次状态行的文字在长短之间切换时，被替换下去的那一段会暂时折成两行、溢出状态行的高度（视口 1280×900 实测：状态行高始终 32px，而退出中的文字片段为 84×48px）。原因是两层文字在替换的同一帧里用新文字的宽度排布了旧文字：状态行按隐藏的丈量层取宽，绝对定位的文字层虽然被同一层撑开，浏览器在这一帧仍把旧文字按它原来的窄宽度断行。现在丈量层与被替换的两层都不换行，文字生长期间各行始终单行，状态行高度不再跳变。
- 修复 **重新编译后设置页等延后功能从设置里消失、要重新开关插件才回来**：构建原先先写 `lib/client.js`、几秒之后才重写 `lib/assets/`，而客户端热重载只认主产物，页面在新块落盘之前就换代，按当时那份清单请求新块得到 404，延后的功能各报告一次并退役。现在资产按「先写新文件、再写清单、最后删清单里没有的文件」落盘，`lib/client.js` 写在最后：换代的那一代要的块已经在磁盘上、也已经在清单里。

### 其他变更

- 开发机上新增构建标记 `DSH_CLAUDE_STYLE_DEBUG=1`：链接安装的检出重建时，资产清单继续带着上一代仍然存在的条目并保留它们的文件，宿主在启动时读到旧主产物的页面不会因为一次重建丢掉延后的功能。发布构建与持续集成里这个标记不生效，清单就是这一次构建自己的资产；构建日志会说明当前处于哪一档。
- 构建把 Deepy 帧图的矢量化结果与资产的 brotli 压缩结果按输入哈希缓存在 `.debug/build-cache/`，只改 TypeScript 后的重建从约 14 秒降到约 1.7 秒，`lib/` 与不带缓存时逐字节相同；新增 `npm run dev`，监听构建读取的目录，每次保存后重新构建（带 `DSH_CLAUDE_STYLE_DEBUG=1`），构建失败时保留上一次的 `lib/` 并继续监听。

<h3 id="en-0.12.1">New Features</h3>

- The Redraw tier of Chat-area animations swaps in the plugin's own conversation view: it takes the place of the host's Chat view itself, no extra tab appears in the strip, and whatever the host sends to Chat lands on it; leaving the Redraw tier brings the host's Chat back as it was. While a turn runs, a new thought folds the thinking, output and tools before it in the same chain into one row (Thinking×N · Output×M · Tools×K) whose figures roll as the work grows, a message from the reader starts a new chain, and each fold runs a shrink, count, pause, reveal sequence. Once a turn completes, its process and interim narration fold away and the final answer stays with its copy, branch and feedback actions; a failed, stopped or waiting turn stays open, a text selection holds the fold, and any past turn opens again. Thinking glides inside its card at reading pace, the card holds the thought's text alone, and scrolling it back to its end resumes the follow; a thought inside a fold takes one line, reading "Thinking · …" inside the thinking card's frame so it never passes for interim output, and a press grows the frame to its whole text; the answer is the host's own Markdown with each new word fading in; a tool row names its target, the lines it changed and how long a slow call has run, and opens onto the host's own tool view, its input and the raw record. Every live state of a running turn (waiting on the model, thinking, writing, preparing and using a tool, waiting for you) is said by one line under the newest message; while the model is silent the line times the wait and marks it "No response yet" past 10 seconds, and the running process opens and closes from it. With dsh-better-display's reading view on the page this one does not register; it reads both the 0.2.0 host the desktop ships and the 0.2.1 host on npm. With Animation set to Reduced everything lands at once.
- Every row of the model picker now carries the rate in force for that model: peak, off-peak and a dated promotion each get their own mark, the colour separates expensive from cheap, the multiplier is followed by how long it lasts, hovering the badge reads one line — the judgement now, and what it becomes and when — and a switch under a minute away reads `<1m`. The judgement is made from each provider's own published schedule in that provider's own time zone (outside the weekday windows, and on weekends and public holidays in full, the rate is off-peak; a window crossing midnight belongs to the day it starts; a daylight-saving change is resolved against real instants, so a window edge inside a skipped hour falls at the transition), and a model with no schedule published carries no badge while a provider billing a flat standard rate all day keeps the badge its schedule describes. A dated promotion runs between the day and instant bounds the document states (its closing instant is the switch itself, so an expired promotion never applies again). The schedules come from one snapshot in the public offpeakclock.com catalog: the host half fetches it, keeps a copy in `$DSH_HOME/cache/dsh-claude-style/peakrate.json`, refreshes every 24 hours and serves it over `/dsh-claude-style/peakrate` (`POST` fetches again first), and falls back to the copy shipped in the package when it cannot be reached; the browser half reads it once when the feature installs, and the third-party address never goes through the page. The build checks that every row of the mapping table names a profile the shipped snapshot yields and belongs to the same provider, and fails on a row that does not. The Composer settings tab gains a Peak rate meter sub-row under the model picker: off removes the badges, and turning the picker off greys the row out.

### Improvements

- The Conversation tab's Chat-area animations row is a three-way segmented control now — Off, Enhanced and Redraw — in place of its switch. Off hands the conversation back to the host; Enhanced is the set that was there before (the follow, the automatic folding with its rolling door, the text fade, the file change rows and the send flight); Redraw hands the area to a second set, whose members are the send flight and the plugin's own reading view. A switch value stored by an earlier build keeps its meaning (on reads as Enhanced, off as Off), so nothing has to be set again.
- Less main-thread time at page start: seven features the first frames can do without — the settings page, content search, the mascot, the send animation, the conversation navigator, the context popover and the account-hold easter egg — leave `lib/client.js` for chunks of their own, served by the plugin's existing asset route `/dsh-claude-style/assets/`, requested as soon as the page is taken and installed on arrival. Measured on a local scratch host (20 page loads of each build, medians): `lib/client.js` falls from 776 KB to 712 KB, main-thread long tasks in the first 3 s from 713 ms to 648 ms, and the skin takes the page 280 ms after navigation instead of 298 ms; the seven chunks are 33 KB brotli-compressed and arrive about 5 ms after the bundle. A chunk and its source map are each named by their own content, so the browser never reads an older map as the current one; the build refuses a module the bundle and a chunk would both carry, generated modules included — those are read from the bundle's own copy through the shared table. After an update the chunks are already on disk when a page swaps to the new bundle, because the build writes the new assets first, the manifest next, the files it does not name last, and the main bundle after all of them.
- The Sidebar tab gains a Float docked panels switch: on (the default) keeps the right sidebar's docked panels as floating cards — 8px inside the column, a 16px radius, a hairline and an elevation; off fills the column and hugs its edges, each pane filling its own column when the dock is split, with only the dock's own resting line left on the seam. Switching needs no reload.
- Every model row's description now comes from one ordered table of name-pattern rules: a dated suffix, a separator spelled differently (`glm-5-3-flashx`) or another reseller's prefix still reads the line's own sentence, and catalog spellings such as `k3-256k`, `ernie-5`, `minimax-m3-1m` and `deepseek-v41-flash` land on their product line's rule without an entry of their own. Copy carrying a version's numbers or a superlative sits on a rule anchored to that version (`glm-5.3`, `gpt-5.4`, `qwen3.8-max`, `step-3.7-flash`, `celeris-1` and the rest), while another version of the same line reads the line-level copy; of the 25 model ids the catalog names, every one but the Grok and ERNIE rows another record rewrites resolves to the same sentence as before.
- In the Redraw tier the live status line ("Thinking", "Using a tool" and the rest) comes in by 30px above and below, so it reads with the newest message instead of as a row of its own. Measured: the 26px gap it used to leave to the turn above is gone, and the distance from its text to whatever follows it drops by 30px as well; the line stays centred in its own height, which is unchanged. A base-coloured shadow now runs under and over the line where it draws over the content above, so the older content never shows at its edge.
- A thinking card in the Redraw tier now holds the thought and nothing else: the "Thinking · Step N" heading, the Pause following / Follow latest and Read in full / Collapse controls that came with the ported implementation, and the reading height it measured against the conversation while expanded are gone, so the card's frame is the thought's text with its height set by the preview and the text itself. The follow still runs at reading pace, and scrolling the card back to its end resumes it — the step the buttons used to do is now the scroll's own. Opening a thought still starts from its line inside a fold, so each thought keeps one line there and a press reads it in full.
- In the Redraw tier a turn's process now takes the shape of the host's Work details setting, so the two settings stop disagreeing: the plugin adds no tier control of its own — it reads the host's `ui-chat` value, re-reads it whenever a turn opens, and falls back to the Web client's default, Detailed, when the host serves none. Compact gathers a whole chain into one row, the intermediate output's own text included in that row's figures; Standard gathers everything before the last thought and leaves the intermediate output outside it, beside that thought; Detailed keeps the trailing intermediate output as its own row and gathers what came before; Verbose matches Detailed and draws a thought inside a fold as its whole reasoning card instead of the one-line "Thinking · …", with tools still opened by the reader alone. The host's own settings row stays the only control: the plugin never writes the value.
- Two lines of the model picker's copy are rewritten: Grok's rule now claims the whole Grok 4 line rather than the 4.5 build, so `grok-4`, `grok-4.5`, `grok-4-2026` and the rest read one sentence — one of the most intelligent models in the world, with native tool use and real-time search — and the ERNIE 5 row now reads a native omni-modal model with 2.4 trillion parameters, without the activation share or the context length.
- The plugin's stylesheet ships minified: comments and formatting stay in the source files, the sheet falls from 349 KB to 208 KB and `lib/client.js` from 712 KB to 570 KB. Nothing it paints changes: the end-to-end lane puts the sheet before and after minifying on the same page and compares computed values element by element across 22 page states, all identical. Minifying also brings rules the `!important` audit used to exempt within reach of it (a rule declaring one property twice keeps a single declaration once minified): judged one by one, the 46 `!important`s the page never needed — on the composer's stop button, the sidebar's ongoing indicator and the chat area's follow tail — leave the source sheets. The audit tightens with it: a rule inside a `@media` or `@supports` condition the page is not in is no longer judged, so its `!important` cannot be called redundant for a condition that keeps it out of the cascade. Measured on a local scratch host (two rounds of 20 page loads of each build, medians): evaluating the plugin's bundle takes about 8.3 ms instead of about 9.0 ms; the other startup timings move by less than they vary between rounds.

### Bug Fixes

- Less jank while an answer streams in a long session: the questions the follow asks on every batch of arriving text no longer go to the document — the conversation's scroller and its message column are read once and kept (a session switch or the Trajectory tab removes the old node, and the reading is taken again), the streaming mark is looked for inside the message column, and the presence of the host's back-to-end button is itself the reading that its follow is off. What a frame does read it reads once and shares between taking back the end the host wrote and deciding whether to keep walking. Measured on a 120-turn, 4286-node scratch conversation: the plugin's document-level queries fall from 3263 to 2762 (−15%) and the page's longest single stall from 270ms to 234ms; the larger the document, the more each avoided whole-page style recalculation is worth.
- In the model picker, the model in force gets a row of its own at the bottom of level 1 when its provider is not listed there. That row was built apart from every other row, so it carried no peak rate badge, no vendor mark and no description line; it now goes through the same row builder as the rest of the list, with the same badge, mark, description and row metrics.
- In the Redraw tier a thought inside a fold could only be closed from the chevron button: once its line was open, a press on the text itself did nothing, because the text carried a click only while closed and left the whole line to text selection afterwards. The text now toggles in both states — closed, a press opens it, open, a press closes it again — while a press that ended as a selection changes nothing, and a selection still holds the fold off as before.
- The live turn's status line no longer moves with the streaming answer. It was pinned only under the host's own following mark, and while an answer streams the follow's glide holds the scroll position short of the end; the host reads that write as the reader leaving the tail, takes the mark away, and the row falls back into the flow, where each burst pushes it down and the glide pulls it back (measured at 1280×600: with the mark off, the row's top travelled between 447px and 573px in 115 frames, while the pin sits at 426px). The glide now writes its own mark on the chat column while it holds a position, and the row is pinned under either mark, so a burst costs it nothing: in the same scenario the row's top stayed at 426px in all 112 frames the host's mark was off. Scrolled away from the tail neither mark is present, so the row keeps its document place instead of floating over what the reader went back to read.
- In the Redraw tier a turn's status label briefly broke onto two lines while the text changed — the leftover half hung out of the row (measured at a 1280×900 viewport: the status row stayed 32px tall while the outgoing segment measured 84×48px). Two layers of text replace each other, and in the same frame the old text was laid out at the new text's width: the row takes its width from a hidden sizer, and the absolutely positioned copies are widened by it, yet the browser still broke the old text at its earlier, narrower width in that frame. The sizer and both copies now keep to one line, so a growing label stays on one line and the row keeps its height.
- Fix **the settings page and the other deferred features vanishing from a rebuild until the plugin was switched off and on**: the build wrote `lib/client.js` first and replaced `lib/assets/` seconds later, and since the client half of hot reload watches only the bundle, a page swapped to the new bundle before its chunks were on disk, asked for them under the previous manifest, got a 404, and each deferred feature reported once and retired. New asset files now land first, the manifest after them, the files it does not name last, and `lib/client.js` is written after all of them: the generation a page swaps to finds its chunks already on disk and already in the manifest.

### Chores

- New build flag for a linked checkout, `DSH_CLAUDE_STYLE_DEBUG=1`: a rebuild keeps the entries an earlier build shipped and their files, so a page that booted the previous bundle does not lose the deferred features to a rebuild. The flag is inert in a release build and in CI, where the manifest carries exactly this build's assets; the build log says which mode ran.
- The build caches the Deepy sheets' vectors and the assets' brotli payloads in `.debug/build-cache/` under the hash of their inputs, so a rebuild after a TypeScript-only change drops from about 14 s to about 1.7 s while `lib/` stays byte-identical to an uncached build; the new `npm run dev` watches what the build reads and rebuilds on every save (with `DSH_CLAUDE_STYLE_DEBUG=1`), keeping the previous `lib/` and watching on when a build fails.

## [0.12.0] - 2026-10-07

[中文](#cn-0.12.0) | [English](#en-0.12.0)

<h3 id="cn-0.12.0">新增功能</h3>

- 桌面端把会话标题与标题行里的控件抬进窗口顶端的标题栏：标题靠左、控件靠右排在窗口按钮之前，标题行剩下的内容左移并上提到标题下面；放不下的一侧留在原来的行里。

### 体验优化

- **插件主文件缩小一半**：浏览器每次启动都要读取并解析的插件主文件此前是 1.6 MB（1,619,502 字节），现在压缩后是 0.8 MB（816,520 字节）。
- 右侧栏停靠的面板改成一枚悬浮卡片：四周各留 8px、16px 圆角、1px 描边与宿主面板自己的投影，列后面的画布从缝隙里透出来；分栏后每一栏的面板各有一枚卡片，拖出来的浮动面板保持宿主自己的窗口样式。
- **小鲸鱼的帧图改为矢量取用**：Deepy 的 18 张帧图此前由浏览器在某个动作第一次出现时下载 PNG、在画布上重建成矢量、再存进 Cache API；现在构建期就把它们转成矢量，按内容哈希长期缓存。第一次播放不再有重建的停顿，观感与之前一致；随包携带的帧图从 426 KB 变为 658 KB（brotli 后）。
- **浏览器里的侧栏品牌行**：非桌面外壳（浏览器页面）下侧栏品牌行是这一列的第一行，列顶部只有 6px 内边距，logo 贴着窗口上沿；品牌左侧也比「新会话」的加号圆片靠左 8px。现在浏览器页面给这一行加 8px 顶部边距，品牌带上这一行自己的 8px 左内边距，鲸鱼/星芒的左缘与加号圆片的左缘对齐。桌面外壳（Windows 标题栏、macOS）与折叠后的窄栏不变。
- **进行中的状态行不再随内容上下跳动**：宿主把「深度求索中」这一行画成聊天流的最后一行，答案流式追加时它跟着内容底部一起被推下去、跟随的滑动再把它拉回来，盯着末尾看时就是不停跳动。现在只要读者的跟随还开着，这一行就钉在输入框上方（输入框高度 + 上方的渐隐带 + 宿主的 16px 正文内边距），也就是跟随追上时它本来停的位置：突发的追加不再带动它，往回翻看历史时它照常留在文档位置，不会浮在读者正在读的内容上。
- 分栏的右侧栏：两栏各自仍是独立的圆角卡片，中间那条分栏线不再画（拖动时的提示照旧），两栏之间的距离从 16px 收到 6px，每栏到列边的距离从 8px 收到 6px。
- 手机宽度下的输入框下沿：权限选择器收起下三角，权限与模型选择器按窄屏上限截断，上下文只留圆环不显示数字；那一行同时不再溢出卡片——模型名随行收缩、输入框下方的停靠层不再保留桌面那两份留白，圆环因此回到卡片里、也不再压在推理等级上。
- 输入框下沿的权限档位：按钮不再画下三角（任何宽度都是），档位名过长时在按钮内截断；已经打开的档位卡在布局移动时会重新贴回它的触发按钮，而不再留在原处。
- 宿主的「回到底部」按钮改到输入框上方的正中：它原先长在对话栏右缘，正好压在站在输入卡片上的吉祥物身上；按钮仍是宿主的那个，皮肤只挪位置。

### 问题修复

- **启动之后才选的皮肤也会接手页面**：页面载入后才在皮肤中心选中别的皮肤时，本主题不让出页面，两套视觉叠在一起。现在无论页面启动时归谁，皮肤到来就让出、离开就接回，都不需要刷新。
- 右侧栏「开始」页的项目一屏放不下时，整列被上下同时裁掉，既看不到第一项也滚不到最后一项；现在这一列自己滚动，列表短时依旧居中。
- **发送时飞行的气泡从第一帧就是气泡的颜色**（#29）：替身此前带两层底色——输入卡片的底色压在上面、气泡的底色在下面——随形状一起互相过渡；形状早已收成气泡，上层还没退完，读者看到的气泡先发白，在 DeepSeek 档下正是 Claude 档那条灰气泡的样子，过半秒才变蓝。现在底色画在那层始终等于形状的壳上，按下那一刻起就是目标气泡自己的颜色，没有哪一层能落在形状后面。卡片的描边与阴影照旧随形状收掉，并在形状归位的那一刻写定、撤掉各自的动画，不会在收窄完成后多留一帧。
- 成本计量插件停止写入后，用量面板把它覆盖的历史（8/24 起 26 天、11.23B Token）整份丢掉，改由会话日志现折，面板只剩日志还在的那部分（13 天、6.47B）；现在两个来源按日期合并，账本认识的天仍用账本的数，只有它没覆盖的日期由折算补上，面板恢复完整历史。
- **与壁纸插件共存**：0.11.1 在启动时已有壁纸渲染（`body[data-we-wallpaper]`）的页面上整页让出，「与其他主题插件同时使用」里壁纸透过侧栏与玻璃弹层的效果随之失效。现在只为皮肤中心的皮肤（`html[data-dsh-skin]`）让路，壁纸在渲染时本主题照常工作。对外契约：不再读取 `body[data-we-wallpaper]`。
- **发送的替身不再在真实消息行缺席时淡出**：宿主的回显气泡只活约 159 毫秒，真实消息行要一秒以上才挂上，而替身按自己的时间表在 400 毫秒落地淡出，那一段里目标位置空着——读者看到刚发出的气泡淡成页面背景，随后整条又冒出来。现在降落前先确认有一条行在页面上可以交接：没有就把替身停在原地（保持可见、继续跟随目标位置），真实行一到立刻交接；宿主始终没挂上行时按 2.5 秒兜底把页面交还宿主。
- **设置页不再多出一层内边距**：皮肤自己的设置页带了 24px 横向内边距，而宿主的选项列本来就有 24px，于是整页比其余设置页（宿主自己的与别的插件的）向右缩进 24px、顶部也多 20px。现在横向不留内边距，顶部只留宿主行自己的 16px，标题与第一行文字和其余设置页在同一条竖线上。
- **吉祥物的分段控件回到右侧**：吉祥物这一行此前固定把控件排到文字下面（与品牌卡片同一套排法）。现在控件与文字同占一行、靠右对齐，只有在放不下时才落到下一行并从左边开始——判定用文字列的最小宽度（220px），控件本身不收缩。
- **欢迎语与账号区跟随登录的 DeepSeek 账号**：此前这两处只显示自定义用户名或本机系统用户名，登录账号的昵称从不出现；现在桌面端登录后显示账号昵称，自定义用户名仍然优先，账号资料读不到时才回退到 HDSL 昵称与本机系统用户名。
- 顶栏里的对话 / 轨迹标签条：标题与控件分列两侧时，标签条改取两者之间余下空当的中线（原先按窗口居中，两侧有内容后看着偏左）；鼠标在对话区时标签条重新能唤起（本表自己的静置透明度带 !important，唤起规则少了它就一直压不过去，网页端同样受影响）。
- 顶栏里的会话标题不再过早截断：标题的可用宽度改为直接留出标签条自身的宽度与两侧的空隙，而不是去读标签条「按窗口居中」时的位置——标签条随后会被推到标题与控件之间的中线，那个位置本来就会被放弃，标题因此在小一半的宽度上就开始省略号。标题同时下移 2px，在标题栏里读起来才是垂直居中。
- 用对话导航跳到某一轮之后，新输出不再把位置拖回页底：跳转算读者自己选定的阅读位置，接管与滚轮相同，跟随与流式滑行在这一期间让开，读者自己回到页底时解除。

### 其他变更

- **公开路由变化**：`GET /dsh-claude-style/deepy/<动作>.png` 不再提供，帧图改由 `GET /dsh-claude-style/assets/<内容哈希>.svg` 提供；品牌标志、厂商组合标与螃蟹帧图同样由这份构建清单决定内联进产物还是走这条路由（小鲸鱼的 18 张帧图走路由）。更新插件后需要重启宿主，早于本次构建的宿主半边没有这条路由，小鲸鱼不会出现（控制台提示一次）。
- **附带 source map**：npm 包里新增 `lib/client.js.map`，浏览器开发者工具里的报错位置与断点能对应到插件源码。
- **Anthropic 字体的投放点迁到宿主目录**：把两款 Anthropic 字体复制进插件包 `fonts/` 目录后界面仍用替代字体，那个位置已不再被读取。现在的投放点是 `$DSH_HOME/dsh-claude-style/fonts/`（没有设置 `DSH_HOME` 时是 `~/.dsh/dsh-claude-style/fonts/`）：放在这里的文件优先于包内的同名文件，缺失时照旧 404 回退到系统字体与替代字体。随包分发的四款字体与它们的授权文件改由构建写入 `lib/fonts/`，仓库里的字体文件移到了 `packages/assets/src/fonts/`，两款 Anthropic 字体在其 `anthropic/` 子目录里，仍然不随 npm 包分发。

<h3 id="en-0.12.0">New Features</h3>

- On the desktop the conversation's title and the header's controls rise into the window's own caption row — the title at the left, the controls at the right before the window buttons — and what is left of the title row closes up to the left and rides up under the title. A side without room stays in the header's own row.

### Improvements

- **The plugin's main file is half the size**: the file the browser reads and parses on every start was 1.6 MB (1,619,502 bytes); minified it is now 0.8 MB (816,520 bytes).
- A panel docked in the right sidebar is a floating card: 8px inside the column on every side, a 16px radius, a 1px hairline and the host's own panel elevation, with the column's canvas showing through the gap. Each column of a split dock gets its own card, and a panel pulled out of the sidebar keeps the host's own floating window.
- **Deepy's frames are taken as vectors**: the whale's 18 sheets used to be downloaded as PNGs the first time an animation appeared, rebuilt into a vector on a canvas and kept in the Cache API; the build now produces the vectors and they are cached for good under their content hash. The first play no longer pauses to rebuild and the whale looks the same; the sheets that ship with the package go from 426 KB to 658 KB (brotli).
- **The sidebar brand row in a browser**: without a desktop shell the brand row is the column's first row, so 6px of column padding was the whole inset and the logo sat against the window's top edge; the brand also started 8px left of the New session plus chip. A browser page now gives that row 8px of top margin and the brand the row's own 8px leading inset, so the whale or starburst's left edge lands on the chip's. The desktop shells (Windows titlebar, macOS) and the collapsed rail are unchanged.
- **The running status line no longer rides the content**: the host draws its "deep diving" row as the chat flow's last row, so every burst of a streaming answer pushes it down and the follow's glide drags it back, which reads as continuous jumping at the tail. While the reader's follow is on, the row is now pinned above the composer — the composer's height, the fade band above it and the host's 16px transcript padding — which is where it already comes to rest once the glide has caught up: a burst no longer moves it, and scrolled back through history it keeps its document place instead of floating over what the reader went back to read.
- In a split right sidebar each pane stays its own rounded card: the line the dock draws between them is gone (the drag highlight stays), the gap between the two comes in from 16px to 6px, and each pane now sits 6px from the column's edge instead of 8px.
- The composer's bottom line at a phone's width: the permission control drops its chevron, the permission and model controls truncate at narrow-screen caps, and the context meter keeps the ring without its number. The row no longer runs past the card either — the model name shrinks with it and the dock line under the card gives up the two desktop-sized reserves — so the ring lands inside the card instead of under the reasoning level.
- The permission tier control on the composer's bottom line drops its chevron at every width, not just on a phone, and a long tier name truncates inside the button. An open tier card is also placed again when the layout under it moves, instead of hanging where its trigger used to be.
- The host's back-to-end button now sits centred above the composer. Its shipped place is the conversation column's right edge, which is where the mascot stands on the composer card; the button stays the host's own and only its placement is the skin's.

### Bug Fixes

- **A skin picked after the page loaded takes the page too**: picking another skin in the Skin Center once the page had loaded left this theme on the page, two looks painted over each other. Now the theme gives the page up when a skin arrives and takes it back when the skin leaves, whichever way the page booted, without a reload.
- The right sidebar's start page clipped its entries at both ends once the list outgrew the pane, hiding the first rows with no way to scroll; the column scrolls now, and still centers the list while it fits.
- **The flying bubble is the bubble's colour from the first frame** (#29): the stand-in carried two fills — the composer card's over the bubble's — cross-fading as the shape narrowed, and the shape was already a bubble while the upper fill was still there, so the reader saw a pale bubble (in the DeepSeek palette, the colour the grey bubble has under Claude) that only turned blue half a second later. The fill is now painted on the one layer that is the shape at every step, so it is the destination bubble's own colour from the moment of the press and no fill can fall behind the shape. The card's hairline and shadow still leave with the shape, written and cancelled on the frame the shape settles rather than lingering a frame past it.
- Once the cost-meter plugin stopped writing, the usage panel discarded the whole history the ledger covered (11.23B tokens over 26 days from 8/24) and fell back to folding the session logs, which left it with only the part the logs still held (6.47B over 13 days); the two accounts now merge by date, the ledger keeps the days it knows and the fold fills only the dates past its newest, so the panel shows the whole history again.
- **Sharing the page with a wallpaper plugin**: 0.11.1 gave the whole page up when a wallpaper was already rendering at boot (`body[data-we-wallpaper]`), which lost the wallpaper showing through the sidebar and the glass popovers described under Alongside other theme plugins. Now only a Skin Center skin (`html[data-dsh-skin]`) makes the theme yield; while a wallpaper renders the theme keeps working. External contract: `body[data-we-wallpaper]` is no longer read.
- **The stand-in no longer fades out with no message row to land on**: the host's echo bubble lives about 159 ms while the real row takes over a second to mount, and the stand-in faded out on its own 400 ms schedule — with nothing at the destination, the reader watched the bubble they had just sent fade into the page and then the whole message pop back. The hand-over now waits until there is a row on the page to take the message: the stand-in holds where it is (visible, still following the destination) and hands over the moment the row mounts, with a 2.5 s backstop that gives the page back to the host if no row ever comes.
- **The settings page no longer adds an inset of its own**: the skin's page carried 24px of side padding while the host's options column already has 24px, which set the whole page — and its top, by another 20px — 24px inside the host's own pages and other plugins'. The page now keeps no side padding and only the host row's own 16px on top, so its heading and first row line up with every other page's.
- **The mascot's segmented control is back on the right**: the mascot row used to stack its control under the text, the layout the brand cards use. The control now shares the row and sits at its right edge, and drops to a line of its own starting at the left only when it no longer fits — decided by the text column's minimum width (220px), since the control itself never shrinks.
- **The welcome line and the account area follow the signed-in DeepSeek account**: both used to show the custom username or the local system user, never the signed-in account's nickname; on the desktop they now show the account nickname, a custom username still wins, and the HDSL name and the local system user remain the fallbacks for a profile that cannot be read.
- The Chat / Trajectory strip in the caption row: with the title and the controls standing on either side, the strip now takes the middle of the room left between them (it was centred on the window, which reads off-centre once both sides carry something), and hovering the conversation brings it back — the sheet's own resting opacity is stated with !important, so the reveal rule needed it too, on the web as much as on the desktop.
- The session title in the caption row no longer truncates early: its room is now the space up to the controls with the tab strip's own width and the air on both sides reserved, rather than the strip's window-centred position — the strip is then pushed to the middle between the title and the controls, so that position was one it was about to leave and the title began ellipsizing at half the width it had. The title also sits 2px lower, which is what reads as vertically centred in the caption row.
- After a jump to a turn from the conversation navigator, new output no longer drags the position back to the end: the jump counts as the reader choosing where to read, so it holds the conversation the way his own wheel does — the follow and the stream glide stand down until he comes back to the end himself.

### Chores

- **Public route change**: `GET /dsh-claude-style/deepy/<animation>.png` is gone; the frames are served by `GET /dsh-claude-style/assets/<content hash>.svg`, and the brand marks, the vendor lockups and the crab's sheets follow the same build manifest, which decides per file between an inline form and that route (the whale's 18 sheets take the route). Restart the host after updating: a host half older than this build has no such route and the whale will not appear (one console message).
- **Source map included**: the npm package now carries `lib/client.js.map`, so error locations and breakpoints in the browser's developer tools map back to the plugin's sources.
- **The Anthropic fonts are dropped into the harness home now**: copying the two Anthropic faces into the plugin package's `fonts/` directory left the look-alike faces in place, because that location is no longer read. The drop point is `$DSH_HOME/dsh-claude-style/fonts/` (`~/.dsh/dsh-claude-style/fonts/` when `DSH_HOME` is unset): a file there wins over a bundled face of the same name, and a missing one still answers 404 and falls back to the system and the look-alike faces. The four faces the package ships, with their licences, are written to `lib/fonts/` by the build, and the repository's font files moved to `packages/assets/src/fonts/`, the two Anthropic ones under its `anthropic/` directory and still outside the npm package.

## [0.11.1] - 2026-10-06

[中文](#cn-0.11.1) | [English](#en-0.11.1)

<h3 id="cn-0.11.1">新增功能</h3>

- **与皮肤中心交接**：DSH 皮肤中心把本主题列为可选皮肤。选中它即把整页交给本插件，换选其他皮肤、官方默认或壁纸在跑时页面自动交还，无需刷新。判定读皮肤中心注入服务端 HTML 的 `html[data-dsh-skin]` 与壁纸插件的 `body[data-we-wallpaper]`，两者任一存在即让路：让路期间不挂样式表、不安装功能、不占用任何文档属性，只保留设置页与偏好。构建在 `body` 上盖 `data-dsh-claude-style-handoff` 标记自己支持让路。

<h3 id="en-0.11.1">New Features</h3>

- **Skin center handoff**: the DSH Skin Center offers this theme as a selectable skin. Selecting it hands the whole page to this plugin; selecting another skin, the official default, or a running wallpaper takes the page back without a reload. The verdict reads the `html[data-dsh-skin]` attribute the Skin Center injects into the served document and the wallpaper plugin's `body[data-we-wallpaper]`; either one means yielding, and while yielded the theme mounts no stylesheet, installs no feature and claims no document attribute, keeping only its settings page and preferences. A build stamps `data-dsh-claude-style-handoff` on `body` to say it can do this.

**Full Changelog**: [v0.11.0...v0.11.1](https://github.com/Nwflower/dsh-claude-style/compare/v0.11.0...v0.11.1)

## [0.11.0] - 2026-10-06

[中文](#cn-0.11.0) | [English](#en-0.11.0)

<h3 id="cn-0.11.0">新增功能</h3>

- **对话导航**：对话区右侧的轮次短横线改由插件绘制，间距与展开后的列表行高一致。鼠标碰到它立刻展开成一张列表，每一轮一行，写着开启这一轮的那条消息，每一行正好落在它那条短横线原来的位置上，正在读的那一轮保持原位；滚轮上下翻，点一行页面滑到那一轮（只滑最后一小段，约三分之一秒），还没加载的早期对话先加载再跳；指针停在列表上时，对话区顶部的对话 / 轨迹标签照常显示。Alt+↑ / Alt+↓ 跳到上一轮或下一轮，连按会接着走，输入框里有草稿时不接管；跳到的那一轮开头闪一条短横线。同时装着 dsh-plugin-msg-nav 时 Alt+↑ / Alt+↓ 留给它。设置页「对话」页新增「对话导航」开关，默认开启，关闭后恢复系统原来的轮次短横线与悬停预览。

### 体验优化

- **聊天区跟随的滑动更平稳**：流式输出时每来一行，画面滑完都会多跳一下（约 1.7 像素）；代码块这样的大块内容到达时，滚动一下子就冲到最快。现在滑动从静止平稳起步、停下时不再跳动；最新一行被压在屏幕下缘的时间按回放测算少了约四分之一到三分之一（一行一行输出时 533 → 400 毫秒，快速输出时 1350 → 1000 毫秒）。超过 1200 像素的距离不再一帧跳过去，而是先到离目标 1200 像素处，再滑完剩下的一段。
- **聊天气泡动效落地更平滑**：飞行结束的那一刻，气泡里的文字会瞬间变深、像换了字重。现在落地时真实气泡在飞行的气泡下面先显示出来，飞行的那份在 0.16 秒内淡出，文字是逐渐变清晰的；上浮的终点也正好落在气泡上，不再差出一两个像素。

### 问题修复

- **流式输出时画面不再忽而一下子顶上去、忽而往回掉**：正文变长时，聊天区有时一下子跳到最底，有时底部的状态行先往下掉一截再滑回来——宿主自己的贴底与插件的平滑跟随在同一帧里先后改写滚动位置，宿主那一下总是后写、直接画了出来，下一批文字到达时插件又把已经显示出来的位置拉回去。现在宿主的贴底在画出来之前就交给平滑跟随，正文变长时画面只会平稳上移；在本地一段带停顿的模拟输出里，停顿后头几行直接跳到最底的情况从每段都有变为没有，位置往回退的帧数为零。切换会话之后同样如此。
- **聊天气泡飞行时的底色跟着变成气泡的颜色**：输入框的底色画在卡片里层时（首页的输入框就是这样），飞起来的气泡一路保持输入卡片的白底，接上真实气泡的那一刻才突然换成气泡的颜色，工具栏那一行背后还会先露出一条气泡色。现在底色从输入框所在的那一块开始，随形状一起渐变成气泡的颜色，到终点时正好铺满整个气泡。
- **切换会话与新建会话不再卡住**：装着本插件时，点开另一条会话或新建会话，页面会僵住一到两秒，长对话里尤其明显。原因是选中文字的配色作用于整个页面，浏览器每一轮样式重算都要为页面上每个元素算一次选中样式；现在这套配色只作用于对话正文与输入框里承载文字的块级元素（段落、列表、标题、引用、代码）。实测单次切换的样式重算从 0.9–2.4 秒降到 0.11–0.51 秒（未装插件时约 0.05 秒）；侧栏、设置页与弹层里的选中配色回到宿主默认。
- **装卸或更新别的插件之后，本插件的界面不再失去样式**：此前别的插件加载、重新加载或更新之后，本插件的整个界面有时会变回宿主原本的样子，插件的标记却还留在页面上。现在无论别的插件如何装卸，本插件的外观都保持不变。
- **同时装着的别的插件不再丢失样式**：一个插件自己挂上去、没有归属标记的样式表，会被下一个加载的插件记在自己名下，并在那个插件重新加载时被删掉——同时装着的表情包插件就曾这样整份失去样式，只能刷新页面恢复。现在这类样式表在本插件看到它的当时就被标记为无主，之后任何插件的加载、重新加载与更新都不再碰它。
- **小鲸鱼帧图顶端的灰线消失**：Deepy 演某几段动画时，帧图最上方有时会闪出一条约 1 像素高的灰线，站在哪里、窗口多大不同就时有时无。现在任何站位、任何一段动画都不再出现，小鲸鱼的样貌与动作不变。
- **子智能体工作室的节点详情小窗不再把会话统计与 Token 用量带走**：打开工作室、点开一个子智能体的节点详情小窗之后，输入区上下文面板里的「会话统计」与「Token 用量」两段画到了那个小窗下面，没有底色地压在对话内容上，上下文面板只剩宿主自己的三行。现在两段仍留在上下文面板里。

<h3 id="en-0.11.0">New Features</h3>

- **Conversation navigator**: the turn marks at the conversation's right edge are drawn by the plugin, spaced at the height of the list they open into. Reaching them with the pointer opens that list at once, one row per turn carrying the message that started it, each row exactly where its mark was and the turn being read left in place; the wheel scrolls the list and a click glides the page to the turn (only the last stretch, about a third of a second), loading earlier history first when it is not loaded yet; the Chat / Trajectory tabs at the top of the conversation stay up while the pointer is on the list. Alt+↑ / Alt+↓ jump to the previous or the next turn and keep stepping when repeated, leaving the keys alone while the composer holds a draft; the turn you land on flashes a short line over its start. With dsh-plugin-msg-nav installed too, Alt+↑ / Alt+↓ stay with it. A Conversation navigator switch on the settings page's Conversation tab, on by default; off restores the host's own turn marks and hover preview.

### Improvements

- **The chat-area follow glides more evenly**: every streamed line ended its glide with an extra hop of about 1.7px, and a large block such as a code block set the scroll off at full speed at once. The glide now builds up from rest and comes to a stop without a hop, and the newest line spends a quarter to a third less time under the bottom edge on a replayed stream (line-by-line output 533 → 400 ms, fast output 1350 → 1000 ms). A distance past 1200px is no longer covered in one frame: the position goes to 1200px short of the target and glides the rest.
- **The send flight lands more smoothly**: the moment the flight ended, the bubble's words darkened at once, as if their weight had changed. The real bubble now shows underneath the flying one as it lands, and the flying copy fades out over 0.16 s, so the words sharpen into place; the rise also ends exactly on the bubble rather than a pixel or two past it.

### Bug Fixes

- **Streaming no longer jerks the chat area up or drops it back**: as the reply grew, the chat area sometimes jumped straight to the end and sometimes the status line at the bottom dropped a step before gliding back — the host's own pin to the end and the plugin's glide both wrote the scroll position in the same frame, the host's write always came last and was painted, and the next piece of text had the glide pull an already painted position back. The host's pin is now handed to the glide before it paints, so a growing reply only ever moves the view up smoothly; on a local simulated stream with pauses, the first lines after a pause no longer jump to the end (previously they did in every burst), and no frame moves the position backwards. The same holds after switching sessions.
- **The send flight's fill turns into the bubble's colour on the way**: where the composer paints its fill on an inner layer (as the home page's composer does), the flying bubble kept the composer's white all the way and switched to the bubble's colour only as it met the real bubble, with a strip of bubble colour showing early behind the toolbar row. The fill now starts on the part of the card the composer paints and changes into the bubble's colour along with the shape, covering the whole bubble when it arrives.
- **Switching and starting sessions no longer stalls**: with the plugin installed, opening another conversation or starting a new one froze the page for a second or two, worst in long conversations. The selection colours applied to the whole document, so every style pass had the browser compute selection styling for every element on the page; they now apply to the blocks that carry text in the conversation and in the composer — paragraphs, lists, headings, quotes, code. Measured on one switch, style recalculation went from 0.9–2.4 s to 0.11–0.51 s (about 0.05 s with the plugin off); selection colours in the sidebar, settings and popovers go back to the host's own.
- **Loading, reloading or updating another plugin no longer strips this plugin's styling**: after another plugin was loaded, reloaded or updated, the whole interface could fall back to the host's own look with this plugin's markers still on the page. The plugin's appearance now survives any other plugin being loaded, reloaded or removed.
- **Another plugin installed beside this one no longer loses its styling**: a stylesheet a plugin mounts without an ownership tag is taken into whichever package loads next and deleted when that package reloads — the meme plugin lost its entire styling that way, and only a page refresh brought it back. Such a sheet is now marked as unowned the moment this plugin sees it, and no plugin's load, reload or update touches it afterwards.
- **A grey line no longer flashes along the top of Deepy's frames**: while some animations played, a line about one pixel tall could appear at the top of the frame and vanish again, depending on where the whale stood and how large the window was. It no longer appears in any position or animation, and the whale looks and animates exactly as before.
- **A node detail in the subagent studio no longer takes the session statistics and the token usage with it**: with the studio open and a subagent node's detail popped up, the session statistics and the token usage sections drew under that popup with no surface of their own, over the conversation, leaving the composer's context panel with only the host's three rows. Both sections stay in the context panel now.

**Full Changelog**: [v0.10.6...v0.11.0](https://github.com/Nwflower/dsh-claude-style/compare/v0.10.6...v0.11.0)

## [0.10.6] - 2026-10-05

[中文](#cn-0.10.6) | [English](#en-0.10.6)

<h3 id="cn-0.10.6">新增功能</h3>

- **聊天气泡动效**：提交消息的那一下，输入卡片原样浮起一份，一边飞一边把多余的收掉——工具栏左右两组贴着最近的角缩小、淡出，描边与阴影跟着形状收回，草稿里的字跟着变窄的形状一行一行重新排——落地时正好就是那条真实气泡；真实气泡在飞行期间藏着，落定后原位出现。设置页的「动画效果」选了「减弱」、两端不在同一屏、或起点读不到（快捷键与程序化提交）时都不飞；页面切到后台时另有定时器兜底，藏起来的消息一定会放出来。与对话区其他动画一起合并在设置页「对话」页的「聊天区动画效果」开关里，默认开启。
- **文件变更行**：从 run_code 程序里派发出去的写入与编辑按直接调用的样子显示——行尾带 `+n -m`，展开是改动卡片，路径可点开文件；失败与中断的行保留裁决信息、不再给路径链接，状态另有给读屏的说明。改动内容无法从参数推出的调用保留系统的输入 / 输出卡片。与对话区其他动画一起合并在设置页「对话」页的「聊天区动画效果」开关里，默认开启。
- **新到的文字先淡后实**：流式回答里新出现的字符从两成不透明度开始，约 0.12 秒内坐实到它自己的颜色，并按到达次序略作错开，读起来像文字正被写下。整段一次到达的内容（切会话、翻历史）、一次几千字的突发、以及刚被折叠重排过的文字都保持本色；主线程忙不过来时它自己让路，闲下来再继续。与对话区其他动画一起合并在设置页「对话」页的「聊天区动画效果」开关里，默认开启。
- **折叠不再瞬间切换，展开体像卷帘门一样拉下来**：读者点开或收起一行（工具卡片、思考行、命令卡片）或一个过程组时，高度逐帧变化，下方内容被真的推开或收回。门只走读者看得见的那一段，两千像素的展开体和两万像素的展开体在眼前的速度一样；展开体里是多张卡片时（代码卡片加输出卡片）整扇门一起走，不会先挤没能缩的那一张。主线程卡住时门停一下再接着走，不会跳变；读者自己滚动离开底部之后，收尾不会把他拽回去。它与其他对话区动画一起挂在「聊天区动画效果」这个开关上（默认开启），关掉后读者点开收起恢复系统原来的瞬开瞬收。
- **思考行与过程组自动开合**：模型还在思考时思考行自动开着，思考停下就收回去；运行中的过程组自动展开，这一段过程结束再收起，组体展开时组头的标签仍带实时细节的流光。读者自己按过的行或组，在当时的阶段里不再被改动；「详细」与「完全展开」两档不收纳组体，插件不碰它们。与对话区其他动画一起合并在设置页「对话」页的「聊天区动画效果」开关里，默认开启。
- **输入框插入符动效**：输入框里的光标改由插件自己绘制，移动时带一段位移过渡；提问卡片的作答框与排队消息的行内编辑框同样覆盖。设置页的「对话」页新增三档：每一格（默认，连打字也滑）、只在移动时（方向键与点击才滑，打字瞬时）、关闭（完全不动手，用浏览器自己的光标）。任何一次测量失败都会把原生光标还回来，不会出现光标看不见的情况。
- **聊天区跟随交给系统自己的跟随，封顶的工作过程不再掉队**：思考行收起、工具调用行出现这些结构时刻，贴着底部的读者现在被交还给系统自己的跟随，内容成片到达时不再停在离底部几十像素的地方；「标准」与「简洁」档里封顶的过程组（思考与工具输出收在一个带滚动条的组体里）同样补到底部，最新两行不再长期悬在下方。补到底部是按曲线走完的：零散到达的字收得住尾巴，一次涌进上百个 token 那样的厚块则以一段恒定速度滑过去，再落到末尾——流式输出时新加的一行把上文顶起来是平滑的，不再几十像素一下地跳。流式输出期间主滚动条的跟随也交给同一条曲线：系统原来是把末尾一帧写到位，现在这段位移由插件接管并滑过去；输出很快时最新几行会短暂拖在屏幕下缘之外，流一停就滑到位。读者自己发出的消息不受这条曲线影响：宿主把新消息滚进视野的那一下照旧一步到位，插件在消息到达前后短暂让开。读者自己滚动离开底部之后，插件不再插手，直到他自己回到底部。与对话区其他动画一起合并在设置页「对话」页的「聊天区动画效果」开关里，默认开启。
- **与 dsh-chat-ux 共存**：本机同时装着 [dsh-chat-ux](https://github.com/alm-allen/dsh-chat-ux) 时，上面这几项整体让位——那个插件实现了同一批交互，两套同时生效会互相拦点击、抢同一批按钮、往宿主同一个座位键位按同一优先级注册。设置页的「对话」页把「聊天区动画效果」与「输入框插入符动效」两行的控件禁用，控件本身仍显示你自己设的值，下面另起一行用强调色写明「该选项由 dsh-chat-ux 管理」；你的设置不会被改写，那个插件中途装卸也照常跟随。它不在时这些交互按本插件自己的开关运行。

### 体验优化

- **权限菜单在窗口上方放不下时改为在控件下方展开**：权限分段控件的卡片固定朝上展开，窗口很矮时它的上缘顶出屏幕外，最上面几项点不到。现在上方容不下整张卡片时，它在控件下方展开。
- **上述动效跟随「动画效果」设置**：卷帘门过渡、聊天气泡动效、新文字淡入、插入符的滑动与闪烁、组头的流光此前只认系统的「减少动态效果」：设置页选「减弱」关不掉它们，选「总是」在系统开着减弱时也照样不动。现在它们读的是设置页解析出的那一档。

### 问题修复

- **「更多模型」的二级弹层在指针离开后收拢**：指针从「更多模型」挪到一级列表的模型行上之后，二级弹层在宽限期结束后收起，一级弹层保持不动。修复前只要指针还在一级弹层里它就永远挂着，遮住一级列表。
- **模型选择器打开二级弹层的瞬间即定位**：此前打开动作先定位后标记打开，而定位只认已标记打开的卡片，于是二级弹层沿用上一次的位置（连同上一次的窗口宽度算出的坐标），要等下一次指针事件才可能被纠正。现在先标记打开再定位，每次打开都落在当前位置。
- **插入符拆除后在途的那一帧不再落笔**：瞬落一帧之后恢复过渡属性的那次补写走的是一处未登记的帧，插件拆除时取消不到它，时机凑巧时它会在拆除之后对已收回的图层写入一次。现在这帧与队列帧一样登记在案，拆除时一并取消，回调也不再越过拆除线。
- **「文件变更行」的开关此前不起作用**：关掉它之后，run_code 程序里派发出去的写入与编辑仍然按新的样式显示。现在关掉即交还系统原来的行，打开即时接管，不需要刷新页面。
- **拖入附件后，输入区工具栏打开的面板不再被附件区域遮住**：附件存在时，从输入区工具栏按钮打开的面板（模型选择、思考强度等）中间被上方那块附件区域盖住一大截，只在卡片上方和输入框下方各露出一条边，面板里的行点不到。现在这类面板完整显示。
- **侧栏账号区因故障停用后，设置快捷键不再失灵**：插件的侧栏账号区出错退役后，按 Ctrl+,（macOS 为 ⌘,，网页版宿主为 Ctrl+Alt+,）什么都不打开。现在按键交还宿主，宿主自己的设置快捷键照常打开设置。

### 其他变更

- **昵称与封号页语言只存在设置里**：早先在宿主半边不认这两个字段时存进浏览器本地的值，会在打开页面后写进插件设置，本地那份随后删除；此后两项与其他设置一样只保存在宿主的设置表单里。

<h3 id="en-0.10.6">New Features</h3>

- **Send flight**: on submission the composer card lifts as it is and sheds what is extra on the way — the toolbar's two groups shrink and fade into their nearest corners, the hairline and shadow shrink with the shape, the words in the draft re-flow into the narrowing shape a line at a time — landing exactly on the real bubble, which hides while the flight is up and reappears in place when it lands. Nothing flies when the animation choice is Reduced, when the two ends are not on one screen, or when the origin cannot be read (a shortcut or a programmatic submission); a timer releases a hidden message if the page is in the background. It rides the Chat-area animations switch on the settings page's Conversation tab, on by default.
- **File change rows**: a write or edit dispatched from inside a run_code program is shown like a directly called one — the row carries the `+n -m` tail, expands into the diff card and its path opens the file; a failed or interrupted row keeps its verdict, drops the path link and announces its state to a screen reader. A call whose changed text cannot be derived from its arguments keeps the host's IN/OUT card. It rides the Chat-area animations switch on the settings page's Conversation tab, on by default.
- **New text fades in**: characters arriving in a streaming answer start at a fifth opacity and settle to their own colour in about 0.12 s, staggered slightly by arrival order, so the text reads as being written. A block arriving whole (a session switch, a page of history), a burst of thousands of characters and text that just reflowed from a fold all stay solid; when the main thread is too busy the fade gives way and resumes once it is free. It rides the Chat-area animations switch on the settings page's Conversation tab, on by default.
- **Folds no longer snap: a body rolls down like a door**: opening or closing a row (a tool card, a thinking row, a command card) or a process group now moves the height frame by frame, really pushing the content below away or pulling it back. The door only rolls the stretch the reader can see, so a two-thousand-pixel body and a twenty-thousand-pixel one move at the same speed in front of him; a body holding several cards (a code card plus an output card) rolls as one door rather than squeezing away the card that can shrink. A stalled main thread does not make it jump — the door pauses and carries on — and a reader who scrolled away from the bottom is not pulled back when the fold settles. It rides the Chat-area animations switch together with the entrance fade of an expanded body (on by default); with that switch off, a reader's own press snaps open and shut the way the host does it.
- **Thinking rows and process groups open and close by themselves**: a thinking row opens while the model reasons and folds back when it stops; a running process group opens and folds back once that piece of work ends, its header keeping the live-detail sweep while the body is open. A row or group the reader pressed himself keeps what he chose for that phase, and the Detailed and Fully expanded tiers — which do not cap a body — are never touched. It rides the Chat-area animations switch on the settings page's Conversation tab, on by default.
- **Composer caret motion**: the composer's text caret is drawn by the plugin and glides between positions; a question card's answer box and a queued message's inline editor are covered as well. The Conversation tab gains a three-way choice — Every move (the default, typing included), Explicit moves (an arrow key or a click glides, a keystroke lands instantly) and Off. A measurement that fails hands the native caret back, so a caret is never lost.
- **The chat area's scroll goes back to the host's own follow, and a capped piece of work no longer lags behind**: at the structural moments — a thinking row folding, a tool call row arriving — a reader sitting at the bottom is now handed back to the host's own follow instead of being left tens of pixels short by the burst of content; a process group capped in the Standard and Compact tiers (thinking and tool output kept in one scrolling body) is caught up the same way, so the last two lines no longer hang below the fold. Catching up runs on a curve: a trickle of characters settles softly, and a thick burst — a hundred-odd tokens arriving at once — glides at one steady speed before landing, so while text streams a new line pushes the text above it up smoothly instead of in forty-pixel steps. While content streams, the main scroller's follow runs along the same curve: where the host wrote its end in one frame, that displacement is now taken over and walked, so with a fast stream the newest lines trail just below the fold and slide into place once it stops. A message the reader sends is not affected by that curve: the host's scroll to bring it into view lands at once, and the plugin stands down around the arrival. Once the reader scrolls away from the bottom himself, the plugin stays out of it until he returns. It rides the Chat-area animations switch on the settings page's Conversation tab, on by default.
- **Coexisting with dsh-chat-ux**: with [dsh-chat-ux](https://github.com/alm-allen/dsh-chat-ux) installed on the same machine these effects stand down whole — that plugin implements the same interactions, and two copies intercept each other's clicks, press the same controls and register the same seat key at the same priority. The settings page's Conversation tab disables the Chat-area animations and Composer caret motion rows while each one goes on showing the value you set, with a line underneath in the accent colour reading "Managed by dsh-chat-ux"; your settings are not rewritten, and the hand-over follows that plugin being loaded or removed mid-session. With it gone they run on this plugin's own switches as usual.

### Improvements

- **The permission menu opens below the control when it does not fit above**: the permission control's card always unfolded upward, so in a short window its top edge ran off-screen and the first rows could not be clicked. It now opens below the control when the card does not fit above.
- **Those animations follow the Animation setting**: the rolling door, the send flight, the token fade, the caret's glide and blink and the header's live-detail sweep used to read the system's reduced-motion query alone, so Reduced on the settings page did not stop them and Always did nothing while the system asked for reduced motion. They now read the resolved choice.

### Bug Fixes

- **The More-models card folds once the pointer leaves**: moving the pointer from the More-models cell onto a model row of the first level now folds the second level after the grace, the first level staying put. Before, it hung open as long as the pointer stayed anywhere in the first level, covering its list.
- **The model picker places its second level at the moment it opens**: the open path used to place the card before marking it open, and the placement only reads cards marked open — so the card kept its previous position (with coordinates computed for the previous window width) until some later pointer event corrected it. It is marked open first and placed after, so every open lands on the current position.
- **The caret's teardown no longer leaves a frame that still draws**: the one-off frame that hands the transition back after an instant landing was untracked, so the teardown could not cancel it and, given the right timing, it fired after the teardown and wrote into a layer that had already been released. It is tracked like the queue's frame now — cancelled with the rest, and its callback stands down past the teardown.
- **The File change rows switch did nothing**: with it off, a write or edit dispatched from inside a run_code program still drew the new row. Off now hands the host's own row back and on takes it over, without a reload.
- **A panel opened from the composer's toolbar is no longer covered by the attachment area**: with an attachment in the composer, a panel opened from a toolbar button — the model picker, the reasoning-effort slider — lost its middle to the attachment area above it and showed only a strip above the card and another below the input box, so none of its rows could be clicked. Such panels now draw in full.
- **The settings shortcut keeps working after the sidebar account area is switched off by a fault**: once the plugin's sidebar account area failed and retired, Ctrl+, (⌘, on macOS, Ctrl+Alt+, in the web host) opened nothing. The keys now go back to the host, and the host's own settings shortcut opens the settings as usual.

### Chores

- **The nickname and the account-hold page's language live in the settings alone**: a value kept in the browser's local storage while the host half did not know these fields yet is written into the plugin settings when the page opens, and the local copy is removed afterwards; from then on both are saved in the host's settings form like every other setting.

**Full Changelog**: [v0.10.5...v0.10.6](https://github.com/Nwflower/dsh-claude-style/compare/v0.10.5...v0.10.6)

## [0.10.5] - 2026-10-04

[中文](#cn-0.10.5) | [English](#en-0.10.5)

<h3 id="cn-0.10.5">新增功能</h3>

- **配色与字体可以交给宿主，与壁纸等主题插件一起使用**：插件以前总是改写宿主的颜色与字体，并在侧栏、对话区刷上实色底，和 dsh-wallpaper-engine 这类同样改写宿主颜色的主题插件同时启用时，壁纸被盖住，谁的颜色生效还取决于加载先后。设置页新增「配色」与「字体」两项，各有「Claude」与「跟随宿主」两档，默认仍是 Claude。选「跟随宿主」后，插件不再改写宿主的颜色或字体，也不再给侧栏、对话区刷底色，只保留布局和控件；插件自己画的弹层、卡片与选择器改用宿主的颜色，同时启用壁纸插件时随它的玻璃效果变成半透明，弹层还会模糊背后的画面以保证文字清楚。选 Claude 时外观与以前完全一致。
- **接管宿主界面的功能都能单独关闭**：权限分段控件、侧栏搜索、进行中 / 已归档视图、轮次状态行与对话 / 轨迹标签条以前没有开关，不想要其中一项就只能停用整个插件。现在每一项都有自己的开关，关闭后宿主原来的界面立刻回来，再打开立刻生效，都不需要刷新页面。
- **设置页分为五个分页**：设置项以前排成一整列。现在顶部的分页条把它们分进「通用」「外观」「输入区」「侧栏」「对话」五页；「快捷供应商」紧跟在「重绘模型选择器」下面、两项之间不画分隔线，模型选择器关闭时变灰不可操作，「出现位置」在吉祥物关闭时同样变灰。
- **吉祥物可以单独选择，像素螃蟹也随智能体的工作换动画**：吉祥物以前由品牌决定，螃蟹只站在工作台首页，只会偶尔掏出电脑敲一阵代码。现在设置页的「吉祥物」可选「跟随品牌」（默认，Claude 品牌下是螃蟹、DeepSeek 品牌下是 Deepy）、「螃蟹」「Deepy」或「关闭」，「出现位置」可选只在首页，或首页与对话页都出现（默认）。螃蟹和 Deepy 一样站在两种首页版面与对话页的输入区上沿，随工作状态换动画：思考时头顶冒出思考泡泡，写回答与调用工具时敲电脑，三个会话同时工作时戴上安全帽，子代理运行时戴耳机或挥手指挥，等你操作时头顶亮起感叹号，压缩上下文时被压扁，完成时蹦跳，失败时双眼打叉、发抖，闲置一分钟后睡着，有动作时惊醒；闲着时偶尔东张西望、挥挥钳子，或者掏出电脑敲一阵代码。点它的左半边或右半边会被戳得往一侧躲，连点四下会被挠痒，按住拖动会被拎起来。螃蟹的帧图随插件内联，约 20 KB。

### 体验优化

- **设置项说明改为只说行为**：设置页十项的说明以前夹带设计缘由（进度圈为什么不停、彩蛋页为什么不跟随界面语言），动辄两三行。现在每条说明只说这一项改什么、各档分别是什么效果；「修改品牌标识」「重绘设置弹层」等动宾式或与其他条目不一致的标题一并统一为名词短语。
- **Windows 桌面端的顶栏不再是一条单独的色带**：顶栏以前刷着侧栏的颜色，横贯整个窗口，右上角最小化、最大化、关闭三个按钮还托在一块同色的矩形上，打开设置时周围都被遮罩盖暗，只有这块矩形不变。现在顶栏透明，侧栏和主界面各自通到窗口顶端，两者之间的分隔线从顶到底连成一条，主界面左上角的圆角去掉；三个按钮直接落在页面上，打开设置时随页面一起变暗，悬停高亮照常。macOS 与 Web 端不变。

### 问题修复

- **小鲸鱼不再把阴影画在目标、待办与排队卡片上**：DeepSeek 品牌下，小鲸鱼被叠在输入卡片上方的目标、待办与排队卡片顶起时，它身下阴影的末端落在那张卡片的最上缘。现在小鲸鱼抬高 3 像素，阴影落在卡片上，卡片上不再压着一道暗色。
- **侧栏搜索框与它下面的按钮等高、间距一致，桌面端也不再被顶栏盖住**：搜索框以前比「新会话」「插件」这些行高出 4 像素，与它们相隔也只有 4 像素，排在这一列里比其余各行都松。现在搜索框与各按钮同为 28 像素高，与「新会话」的间隔为 6 像素，与各按钮之间的间隔相同；Windows 桌面端那一行为此少抬高 4 像素，搜索框整块落在顶栏下方，不再被截去上缘。
- **模型选择器右端不再被上下文计量环压住**：在「轨迹」或「上下文」标签页停留后切换对话，模型选择器最右端的档位文字会落在计量环上，并一直保持到上下文数字再次变化；现在回到对话页就恢复两者的间距。

### 其他变更

- **设置的保存字段新增九项**：插件的设置表单新增 `palette`、`typeface`、`mascot`、`mascotScope`、`permissionsControl`、`workspaceView`、`sidebarSearch`、`turnStatus`、`viewTabs`。宿主半边是旧版本时（更新插件后没有重启宿主），这几项改动保存不下来，重启宿主后恢复正常。

<h3 id="en-0.10.5">New Features</h3>

- **Colours and typefaces can be left to the host, so the skin works alongside wallpaper and other theme plugins**: the plugin always rewrote the host's colours and fonts and painted solid canvases under the sidebar and the conversation, so next to a theme plugin that rewrites the same colours, such as dsh-wallpaper-engine, the wallpaper was covered and whose colours won depended on load order. The settings page adds Colours and Typefaces, each with Claude and Follow the host; Claude stays the default. Under Follow the host the plugin rewrites neither the host's colours nor its fonts and paints no canvas under the sidebar or the conversation, keeping only its layout and controls; its own popovers, cards and pickers take the host's colours, turn translucent with a wallpaper plugin's glass, and blur what lies behind them so their text stays readable. Under Claude the look is exactly as before.
- **Every feature that takes over the host's interface can be switched off on its own**: the permission control, the sidebar search, the In progress / Archived view, the turn status line and the Chat / Trajectory tabs had no switch, so dropping one meant disabling the whole plugin. Each now has its own switch; off brings the host's original back at once, on brings the feature back at once, with no reload either way.
- **The settings page is split into five tabs**: the settings used to run down one column. A tab strip at the top now sorts them into General, Appearance, Composer, Sidebar and Conversation; Quick providers sits right under Redraw the model picker with no divider between the two, and greys out while the picker is off, as Where it appears does while the mascot is off.
- **The mascot is chosen on its own, and the pixel crab follows the agent's work too**: the brand used to decide the mascot, and the crab stood on the Studio home page alone, now and then pulling out its laptop to type. The settings page's Mascot now offers Follow the brand (the default: the crab under Claude, Deepy under DeepSeek), Crab, Deepy or Off, and Where it appears offers the home page alone or the home page and conversations (the default). Like Deepy, the crab stands on the composer of both home layouts and of the conversation, and changes its animation with the work: a thought bubble while the model thinks, typing on its laptop while it writes and calls tools, a hard hat with three sessions at work, headphones or conducting while subagents run, an exclamation mark while it waits on you, squashed while the context is compacted, hopping when a turn finishes, crossed eyes and a shake when something fails, asleep after a quiet minute and startled awake at the next move; between jobs it now and then looks around, waves a claw, or pulls out its laptop to type for a while. A click on its left or right half pokes it aside, four quick clicks tickle it, and pressing it and pulling lifts it. The crab's sheets ride the bundle, about 20 KB.

### Improvements

- **Settings descriptions now state behavior only**: the ten settings rows used to mix design rationale into their descriptions (why the progress ring never stops, why the easter egg ignores the interface language) and ran two to three lines each. Every description now says only what the setting changes and what each option does; verb-form or inconsistent titles such as the brand and sidebar-footer rows are unified to noun phrases.
- **The Windows titlebar is no longer a band of its own**: the caption row was painted in the sidebar colour across the whole window, and the minimize, maximize and close buttons sat on a block of that colour, which stayed bright while the settings mask darkened everything around it. The row is transparent now: the sidebar and the main area each run to the top of the window, the divider between them runs top to bottom in one line, and the main area loses its rounded top-left corner; the three buttons sit on the page itself, dim with it under the settings mask, and keep their hover highlight. macOS and the web build are unchanged.

### Bug Fixes

- **Deepy no longer paints its shadow across the goal, todo and queue cards**: under the DeepSeek brand, when the goal, todo or queue cards pushed the whale up off the composer card, the tail of the shadow under it landed on the top edge of that card. The whale now sits 3px higher: the shadow rests on the card instead of a dark band being stamped across it.
- **The sidebar search box matches the height and the rhythm of the rows under it, and no longer hides under the desktop titlebar**: the box stood 4px taller than New session, Plugins and the rows below them, and sat 4px from New session, which left the top of the list looser than the rest of it. The box is 28px like those rows now, 6px above New session, the same step the rows take among themselves; on the Windows Desktop that row rises 4px less, which keeps the whole box below the titlebar instead of cutting its top edge.
- **The right end of the model trigger no longer sits under the context meter**: after a spell on the Trajectory or Context tab, switching conversations brought the right end of the model trigger under the occupancy ring, and it stayed there until the reading moved again; coming back to the conversation now restores the clearance between the two.

### Chores

- **Nine new stored settings**: the plugin's settings form gains `palette`, `typeface`, `mascot`, `mascotScope`, `permissionsControl`, `workspaceView`, `sidebarSearch`, `turnStatus` and `viewTabs`. With an older host half still running (the plugin updated without restarting the host), changes to these do not save until the host restarts.

**Full Changelog**: [v0.10.4...v0.10.5](https://github.com/Nwflower/dsh-claude-style/compare/v0.10.4...v0.10.5)

## [0.10.4] - 2026-10-03

[中文](#cn-0.10.4) | [English](#en-0.10.4)

<h3 id="cn-0.10.4">体验优化</h3>

- **没有 Anthropic 字体时，界面与正文换成外观相近的字体**：没有把 Anthropic Sans / Serif 装进系统或放进插件 `fonts/` 目录时，界面以前落到 Segoe UI、苹方这类系统字体，对话正文落到 Georgia，字形和排版都和原样差得远。现在插件自带 Inter 与 Noto Serif（SIL OFL 1.1）代替两款 Anthropic 字体，它们的字高、字宽与原字体相差不到百分之二，换字体时文字不会重新换行，粗体用的是字体本身的字重。两款字体只含 Anthropic 字体覆盖的拉丁字符，中文照旧使用系统中文字体；npm 包因此大约增加 214 KB。已经启用 Anthropic 字体的环境不受影响。
- **品牌标识改为大卡片选择**：设置页的品牌选项由分段小按钮改为一排大卡片，每张卡片放对应的品牌标识（Claude 的陶土星芒、DeepSeek 的蓝鲸），当前品牌的卡片带品牌色描边；后续新增品牌只需添一张卡片。
- **设置页同时出现在设置对话框与插件页**：0.1.7 起这页只显示在插件页内。现在设置对话框恢复「Claude Style」标签页，两处渲染同一份页面、共用同一份偏好存储，一边改动另一边即时跟上；旧版宿主不受影响，仍只有设置对话框一处。

### 问题修复

- **简洁用量模式下的统计弹层不再出现空置半行与多余分组**：宿主「性能与用量」设置选为简洁时，上下文弹层以前把四个数字拆在「会话统计」和「Token 用量」两个小标题下，三项指标占两行、一项指标占一行，各自留下一处空白格。现在简洁模式下移除分组小标题，总用时、首 token 平均、输出速度与缓存命中四个指标合并为整齐的 2×2 排版。
- **其他插件放进输入框的模型菜单恢复上下排列**：同时启用 `dsh-thinking-effort` 这类自带模型菜单的插件时，菜单里的各个供应商分组以前被挤成一行横排。现在分组按原样上下排列。
- **macOS 桌面端的封号彩蛋页不再重复出现窗口按钮**：macOS 桌面壳的窗口左上角是系统画的三个红黄绿按钮，彩蛋页以前又画了一套最小化 / 还原 / 关闭，页面上于是出现两排按钮。现在这页不画自己那套，星芒标与字标、「退出登录」直接排进系统标题栏那一行，并让开左侧的三个按钮；按住这一行的空白处仍然可以拖动窗口。
- **其他插件的弹层与标签保持原有的形状**：其他插件的元素只要类名里带 `badge` 或 `tag`，以前都会被改成胶囊圆角。额度插件的弹层因此变成四角极圆的方圆形，标题和底部按钮被切掉一角，弹层里各段的分隔线也弯成弧形。现在胶囊圆角只用在宿主自己的徽标与标签上（轨迹标签、自定义模型行的标签、提问里的「推荐」、快捷键按键等），而且两端是正圆弧，不再略方。

<h3 id="en-0.10.4">Improvements</h3>

- **Without the Anthropic fonts, the interface and conversation text use close look-alikes**: when Anthropic Sans and Serif were neither installed on the system nor dropped into the plugin's `fonts/` directory, the interface used to fall back to system fonts such as Segoe UI or PingFang and the conversation body to Georgia, far from the intended letterforms and layout. The plugin now ships Inter and Noto Serif (SIL OFL 1.1) in their place; their letter heights and widths are within two percent of the Anthropic fonts, so text does not rewrap when one replaces the other, and bold text uses the fonts' own weights. Both carry only the Latin characters the Anthropic fonts cover, so Chinese text keeps using the system's Chinese fonts; the npm package grows by about 214 KB. Setups that already have the Anthropic fonts are unaffected.
- **The brand choice is now a row of large cards**: the settings page's brand option changes from small segments to large cards, each carrying the brand's own mark (Claude's clay starburst, DeepSeek's blue whale) with the active card outlined in the brand accent; a new brand is one more card.
- **The settings page now shows in both the settings dialog and the plugin page**: since 0.1.7 it lived only on the plugin page. The settings dialog keeps its "Claude Style" tab again — both render the same page against the same preference store, so a change in one appears in the other at once. Older hosts are unaffected and keep the dialog tab as the only seat.

### Bug Fixes

- **The stats popover under compact usage no longer shows half-empty rows and redundant groups**: when the host's performance and usage setting was set to compact, the context popover previously split the four figures under "Session statistics" and "Token usage" headings, leaving awkward empty slots in two separate grids. The compact mode now removes the section headings and places total time, average TTFT, output speed, and cache hit share together into a clean 2x2 layout.
- **A model menu another plugin puts in the composer stacks its groups again**: with a plugin that brings its own model menu, such as `dsh-thinking-effort`, the menu's provider groups used to be squeezed into one horizontal row. They stack top to bottom as the plugin draws them now.
- **The account-hold page on the macOS Desktop no longer draws a second set of window buttons**: the top-left of a macOS Desktop window belongs to the system, which paints the three red-yellow-green buttons; the page used to draw its own minimize, maximize and close as well, so the window showed two rows of buttons. It draws none of its own now — the starburst and wordmark and the Sign out button take their place in the titlebar row, clear of the three buttons on the left, and the window is still dragged by the empty part of that row.
- **Other plugins' popovers and tags keep their own shape**: any element of another plugin whose class name contained `badge` or `tag` used to be turned into a pill. A quota plugin's popover became a squarish blob with very round corners, its title and bottom buttons clipped at the corners and the dividers between its sections bent into arcs. The pill radius now applies only to the host's own badges and tags (trajectory tags, the custom model row tag, the Recommended mark in a question, shortcut key caps and the like), and their ends are true round arcs instead of slightly squared ones.

**Full Changelog**: [v0.10.3...v0.10.4](https://github.com/Nwflower/dsh-claude-style/compare/v0.10.3...v0.10.4)

## [0.10.3] - 2026-10-01

[中文](#cn-0.10.3) | [English](#en-0.10.3)

<h3 id="cn-0.10.3">体验优化</h3>

- **上下文弹层与计量环右缘对齐**：宿主把弹层从计量环的左缘往下放，输入行右端按这个位置只够把它挤到窗口右缘，和圆环错开一截。现在弹层的右缘与计量环的右缘齐平，窗口宽度变化、页面滚动与弹层自身高度变化时都重新量。
- **用量面板的数字与模型列表写法统一**：概览页「Token 总量」一格与热力图提示原来写「1.0M」「2.00B」「963.6K」，现在与模型列表一样写「1M」「2B」「963.6k」——最多一位小数、整数不带 `.0`、`k` 小写，单位按四舍五入后的值取，刚过百万的读数不再出现「1000k」。轮次状态行的输出 tokens 也走这一套写法。
- **首页工作区弹层改到控件正上方**：hero 行的工作区与预设两个弹层原来贴在控件右侧、底边与控件齐平；现在与输入框上的模型、推理档位弹层同一种摆法，与控件右缘对齐、在控件上方留 6px 展开，上方空间不够时翻到控件下方。快捷供应商弹层一直与触发控件右缘对齐，却从左下角放大展开，现在与模型弹层一样从右下角展开。
- **「性能与用量」选简洁档时，上下文弹层里仍有四个数字**：以前简洁档下弹层里只有宿主自己的上下文明细，会话的用时与速度一概看不到。现在简洁档补上总用时（模型用时加工具调用用时）、首 token 平均、输出速度与缓存命中比例；详细档给出宿主那两组全部的行，与之前一致。

### 问题修复

- **推理档位触发控件收起后不再回来**：切到不带档位的模型再切回来，或离开再回到带输入框的页面，模型名右边只剩一块空位，档位名与可点的控件都看不见了。现在触发器重建后回到模型名旁边，档位照常可选。
- **输入框下方那一行里上下文计量环偏高**：同一行里模型名、推理档位与权限控件的中心都在一条线上，只有计量环与它的读数高出 2 像素。现在计量环与这一行其余控件同线。

### 其他变更

- **两份 README 改成同一套骨架**：英文版删去功能清单与「停用与卸载」两节，小鲸鱼 Deepy 的八张动图移进预览一节，安装步骤两份都读作插件页、终端、插件市场三步。0.10.2 条目里提到的「特点」一节随这次改动不再存在。
- **发行包不再包含 README 截图**：`package.json` 的 `files` 只带 `docs/STYLE.md` 与 `docs/architecture.md` 两篇文档，八张截图留在仓库里。npm 包解包体积由 3.24 MiB 降到 2.47 MiB，下载体积由 1.89 MB 降到 1.07 MB；GitHub 与 npm 页面上的 README 图片照常显示。

<h3 id="en-0.10.3">Improvements</h3>

- **The context popover now lines its right edge up with the meter**: the host hangs the panel from the meter's LEFT edge, and at the end of the composer row that position only fits by parking the panel against the window's right margin, well clear of the ring. The panel's right edge now sits on the ring's, re-read on window resizes, page scrolls and changes to the panel's own height.
- **The usage panel's numbers now read the way the model list writes them**: the Overview tab's Total tokens cell and the heat grid's tips used "1.0M", "2.00B" and "963.6K"; they now print "1M", "2B" and "963.6k" like the model list — one decimal at most, a whole number without its ".0", a lowercase k, and the unit picked on the rounded value, so a count just past a million never reads "1000k". The turn status line's output tokens print through the same formatter.
- **The home page's workspace popover now opens over its control**: the hero row's workspace and preset cards used to sit beside their control, bottom-aligned with it; they now take the placement the composer's model and effort popovers use — right-aligned with the control and opening 6px above it, flipping below when the viewport leaves no room. The quick-provider popover, which has always been right-aligned with its trigger, scaled in from its bottom-left corner; it now grows from the bottom-right one, like the model picker.
- **The context popover keeps four figures under the compact "performance & usage" row**: with the compact row the popover used to carry the host's context rows and nothing about the session. It now adds the total time (the model's time plus the tool calls'), the first-token average, the output speed and the cache-hit share; the detailed row keeps the host's whole set, exactly as before.

### Bug Fixes

- **The reasoning-effort control no longer stayed away once taken down**: switching to a model without levels and back, or leaving a page with the input area and returning, left an empty slot beside the model name — no level name, nothing to click. The trigger now returns beside the model name, and the levels are selectable again.
- **The context meter rode high in the composer's control row**: the model name, the effort level and the permission control shared one centre line while the ring and its reading sat 2px above it. The meter now sits on the same line as the rest of the row.

### Chores

- **Both READMEs now share one skeleton**: the English one drops its feature list and its "Disabling and uninstalling" section, Deepy's eight GIFs move into the preview, and installation reads as three steps — plugin page, terminal, plugin market — in both languages. The "Features" section the 0.10.2 entry names no longer exists as of this change.
- **The npm package no longer carries the README screenshots**: `package.json`'s `files` now ships only the two documents under `docs/` (`STYLE.md` and `architecture.md`), leaving the eight screenshots in the repository. The unpacked package drops from 3.24 MiB to 2.47 MiB and the tarball from 1.89 MB to 1.07 MB, while the README keeps showing its images on GitHub and npm.

**Full Changelog**: [v0.10.2...v0.10.3](https://github.com/Nwflower/dsh-claude-style/compare/v0.10.2...v0.10.3)

## [0.10.2] - 2026-09-30

[中文](#cn-0.10.2) | [English](#en-0.10.2)

<h3 id="cn-0.10.2">新增功能</h3>

- **设置页新增「动画效果」，三档可选**：「随系统」跟随 Windows 自己的「显示动画」设置（原来的行为）；「减弱」把动画停在代表帧上、界面的过渡压到瞬时；「总是」无论系统怎么设置都播放动画。系统设置中途变化时立即按新值生效。后台任务的转圈在三种设置下都照常转动，停住的圈读起来像坏了而不是安静。

### 体验优化

- **小鲸鱼 Deepy 的帧图改为浏览器端矢量化播放**：每张动画表图第一次被用到时，在页面里把 PNG 像素重建成 SVG（按颜色合并同行游程）再播放——浏览器按显示尺寸栅格化矢量，内存里只留显示大小的小图（原先整张大位图常驻，18 张全解码的理论上限约 144 MB），且任意屏幕缩放比例下都锐利。转换结果以表图自己的内容戳为键缓存，一张表只有自己的像素变了才重转；转换失败的表按原 PNG 播放，与之前行为一致。实测每张表的一次性转换约 50–95 毫秒，生成的矢量与原图逐像素一致。
- **流式输出期间界面的每帧开销约减半**：一轮功能刷新的实测中位耗时从 6.6 毫秒降到 3.0 毫秒（p90 从 9.4 降到 3.2，同页同法对比）。三处改动：思考档位开关的摆放原来每轮都「写外边距再读位置」强制两次重排，现在只在档位文字变化时量一次、位置值不变不写（该功能单轮耗时 2.24 → 0.007 毫秒）；上下文计量环的宽度原来每轮读取（流式期间等于每轮一次强制布局），现在只在百分比读数或重绘范围变化时量；其余功能的刷新维持「只读必要节点、只写变化值」。
- **小鲸鱼 Deepy 的播放交给浏览器的动画引擎**：换帧从「每 50 毫秒一次定时器改写 background-position（每帧一次主线程重绘）」改为「胶片条 transform 平移 + WAAPI steps 关键帧」——循环动画播放期间主线程完全没有 JS 运行，换帧只走合成器。状态机、减弱动态效果下的静止帧、点击戳刺与抬起反应的行为不变；冒烟测试核对帧在前进、且不唤醒任何界面刷新。
- **DeepSeek 档的亮色背景蓝更淡**：亮色画布由 `#F7FAFF` 换成 `#FAFBFF`，侧栏 `#F7F9FF`，各层底色、分段控件与开关底板、表头、滚动条按同样的幅度调淡，整页的蓝现在只是白底上的一层色调。暗色配色不变。
- **会话的数字收进上下文弹层，输入行不再挂那行小字**：输入卡片下方原来那行「2 轮 158 步 · 242 tok/s · 32M tok · 缓存命中 99%」及其悬停展开的卡片一并去掉；这些数字（模型用时、工具调用用时、首 token 平均、输出速度，以及缓存命中、未缓存输入、缓存读取、输出）现在追加在上下文计量环的弹层里，排在宿主自己的上下文明细下方，弹层开着的时候跟着会话实时更新。该弹层改为悬停弹起（跟随「悬停打开弹层」偏好，指针离开即收起），点击打开也照旧可用；它本来是「啪」地出现，现在与皮肤自建的卡片一样淡入上浮。数字还没到时，那块位置先按同样的高度占住（两个小标题下面是与真实行等高的占位条），不会出现弹层先矮后高；占位最多保留 2 秒，之后让位给宿主自己画的版面。

### 问题修复

- **已归档列表的会话标题不再默认是黑色**：静止时与进行中的会话一样用次级灰，只有指针停在行上或键盘焦点进入行时才是主文字色。
- **桌面端封号彩蛋页不再重复出现窗口按钮，Claude 标贴着顶栏**：Windows 桌面壳的最上面一行是系统层，它自己画了最小化、最大化、关闭三个按钮；彩蛋页以前又画了一套，顶栏上于是出现两排按钮。现在这页不画自己那套，星芒标与字标、「退出登录」直接排进系统顶栏那一行，那一行也跟着页面换成象牙白或暖黑；按住这一行的空白处仍然可以拖动窗口。
- **封号彩蛋页在 DeepSeek 档下也显示 Claude 标**：以前选 DeepSeek 时页面上只剩「Claude」文字、旁边的星芒被去掉；这页复刻的是 Claude 自己的界面，现在两档都画完整的 Claude 字标。
- **账号弹层不再先贴着底部出现再往上跳**：宿主的账号卡片挂载时只带它自己那三行，皮肤的行晚一帧进入，卡片随之变高，宿主再晚一帧按新的高度重新摆位。此前这次重新摆位发生在卡片已经淡入到约三分之一的时候，于是看到的是它先停在偏下的位置、再跳上去。现在卡片在皮肤的行走位完成之前不上色，入场动画从它最终的高度与位置开始播放。

### 移除

- **删除 Anthropic 品牌档**：设置页「修改品牌标识」只剩 DeepSeek 与 Claude 两档；已经存过 `anthropic` 的设置读作 Claude（这一档的标识与配色本来就与 Claude 相同）。

### 其他变更

- **README 的小鲸鱼介绍附上动图**：「特点」里小鲸鱼 Deepy 一条下面加了八张 GIF，分别是空闲、思考、写回答与调用工具、指挥子代理、等你操作、失败、完成与睡着。仓库里的 Deepy 展示页因体积过大（约 7.6 MB）移除，全部 20 个动画的 GIF 仍在 `showcase/gifs/`。

<h3 id="en-0.10.2">New Features</h3>

- **A new Animation setting with three choices**: Follow the system keeps Windows' own "show animations" setting in charge (the previous behaviour); Reduced holds every animation on its still frame and takes the interface's transitions down to nothing; Always plays them whatever the system says. A change to the system setting lands immediately. The background-work ring turns in all three, since a still ring reads as broken rather than as calm.

### Improvements

- **Deepy's animation sheets now play as vectors generated in the browser**: the first time an animation is wanted, its sheet's PNG pixels are rebuilt as SVG (same-color runs of a row merged into one path per color) and that vector is what plays — the browser rasterizes it at the size the whale is drawn, so memory holds only that small image (the sheets used to stay decoded whole, with a theoretical ceiling around 144 MB for all eighteen), and the whale is sharp at every display scale. Generated vectors are cached under each sheet's own content stamp, so a sheet is re-converted only when its own pixels change; a sheet that decodes but does not convert plays as the PNG it came from, exactly as before. Measured locally: a one-time 50–95 ms per sheet, and the generated vector is pixel-identical to the source.
- **The per-frame cost of streaming is roughly halved**: a measured feature-refresh pass went from a 6.6 ms median to 3.0 ms (p90 from 9.4 to 3.2, same page, same method). The effort control's placement used to force two reflows per pass (write a margin, read the box back); it now measures only when the level's label changes and writes only moved values (that feature alone went from 2.24 ms to 0.007 ms a pass). The context meter's width used to be read every pass — a forced layout each pass while streaming — and is now re-measured only when the percentage reading or the restyle scope changes.
- **Deepy now plays on the browser's animation engine**: frame changes move from a 50 ms timer rewriting background-position (a main-thread repaint per frame) to a filmstrip translated by WAAPI steps keyframes — while a loop plays, no JS runs on the main thread at all and frames composite instead of repaint. The state machine, the still frames under reduced motion, and the poke/lift reactions behave exactly as before; the smoke suite checks that frames advance without waking a single skin pass.
- **A paler blue behind the DeepSeek brand's light palette**: the light canvas moves from `#F7FAFF` to `#FAFBFF`, the sidebar to `#F7F9FF`, and the raised layers, segmented-control and switch plates, table headers and scrollbars step back with them, so the blue now reads as a tint on white. The dark palette is unchanged.
- **The session's numbers moved into the context popover, and the composer row no longer carries them**: the "2 turns 158 steps · 242 tok/s · 32M tok · Cache hit 99%" line under the input card and the card it opened on hover are both gone; those numbers (model time, tool-call time, average time to first token, output speed, and cache hits, uncached input, cache reads, output) are appended to the context meter's popover, under the host's own context rows, and follow the session while that popover stays open. The popover now opens on hover — following the "open popovers on hover" preference, and folding away when the pointer leaves — while a click still opens it, and it fades and rises in the way the skin's own cards do instead of popping. Until the numbers arrive, that block holds their height (bars as tall as real rows, under the two real headings), so the popover never opens short and grows; the place is held for at most 2 seconds, after which the host's own layout stands.

### Bug Fixes

- **Archived conversations no longer rest in black**: an archived title sits in the same grey as the host's own session rows and takes the primary ink only while the pointer is on its row or the keyboard focus is in it.
- **The account-hold page on the Desktop no longer draws a second set of window buttons, and its Claude lockup sits on the titlebar row**: the top row of a Windows Desktop window belongs to the system, which paints minimize, maximize and close there; the page used to draw its own three as well, so the titlebar showed two rows of buttons. It draws none of its own now — the starburst and wordmark and the Sign out button take their place in that row, the row takes the page's ivory or warm black, and the window is still dragged by the empty part of it.
- **The account-hold page shows the Claude lockup under the DeepSeek brand too**: choosing DeepSeek used to leave the bare "Claude" text with the starburst dropped; the page reproduces Claude's own screen, so both brands now draw the full Claude lockup.
- **The account popover no longer appears against the bottom edge and jumps up**: the host mounts its card with its own three rows and places it from that geometry, the skin's rows arrive a frame later so the card grows, and the host re-places it a frame after that. That re-placement used to land when the card had already faded to about a third, so it read as appearing low and then jumping. The card now stays unpainted until the skin's rows are in it and its placement has settled, and the entrance animation plays from its final height and place.

### Removals

- **The Anthropic brand choice is deleted**: the settings page's Brand mark row offers DeepSeek and Claude only, and a stored `anthropic` reads as Claude, whose marks and palette it already shared.

### Chores

- **The README's Deepy entry now shows it moving**: eight GIFs sit under the Deepy item in Features — idle, thinking, answering and calling tools, conducting subagents, waiting on you, failed, finished and asleep. The repository's Deepy showcase page is removed for its size (about 7.6 MB); GIFs of all 20 animations remain in `showcase/gifs/`.

**Full Changelog**: [v0.10.1...v0.10.2](https://github.com/Nwflower/dsh-claude-style/compare/v0.10.1...v0.10.2)

## [0.10.1] - 2026-09-28

[中文](#cn-0.10.1) | [English](#en-0.10.1)

<h3 id="cn-0.10.1">其他变更</h3>

- **README 预览换成 Claude 与 DeepSeek 两套配色的截图**：原来只有一组亮暗首页截图，现在两套配色各有工作台首页与一段 Markdown 对话（标题、列表、任务清单、表格、代码高亮、引用）的亮暗截图，共八张；截图里的工作区、会话、用量与昵称都是示例数据。
- **README 新增鸣谢**：注明像素小鲸鱼 Deepy 的动画帧图出自 calmly-eating-bugs 绘制的 Deepy 小鲸鱼主题包、经作者许可随插件分发，并附上作者贡献到仓库 `showcase/` 目录的展示页与 GIF 原件入口。展示页只在 GitHub 仓库里，npm 包的内容与体积不受影响。

<h3 id="en-0.10.1">Chores</h3>

- **README previews now show both the Claude and the DeepSeek palettes**: the single light/dark pair of the home page gives way to eight shots, each palette showing the Studio home page and a Markdown conversation (headings, lists, task lists, a table, highlighted code, a quote) in light and dark; the workspaces, sessions, usage and nickname in them are sample data.
- **README acknowledgements**: Deepy's animation frames are credited to the Deepy whale theme pack drawn by calmly-eating-bugs and shipped by the author's permission, with pointers to the showcase page and GIF originals the author contributed under the repository's `showcase/` folder. The showcase lives only in the GitHub repository; the npm package's contents and size are unchanged.

**Full Changelog**: [v0.10.0...v0.10.1](https://github.com/Nwflower/dsh-claude-style/compare/v0.10.0...v0.10.1)

## [0.10.0] - 2026-09-28

[中文](#cn-0.10.0) | [English](#en-0.10.0)

<h3 id="cn-0.10.0">新增功能</h3>

- **DeepSeek 品牌下，输入框上站着像素小鲸鱼 Deepy**：品牌选 DeepSeek 时，螃蟹换成小鲸鱼 Deepy，动画逐帧取自 Deepy 主题包（每帧 50 毫秒）。它在首页（经典与工作台两种版面）站在输入卡片上沿、靠右；进入对话后站在整块输入区的上沿，要你批准、回答问题或审阅计划时站到那块面板上。只有主对话区有它，侧栏里的子代理对话没有。它的动作跟着智能体走：没事时呼吸、眨眼，偶尔东张西望或喷水；模型思考时冒思考云；写回答或调用工具时敲代码，两个会话同时在干活时戴耳机，三个以上戴安全帽砌砖；一个子代理在跑时戴耳机，两个以上指挥小鲸鱼分身；压缩上下文时吸入碎片；等你操作时摇感叹号铃铛；工具调用或这一轮失败时冒烟、眼冒金星；一轮或一次压缩结束时空翻撒彩纸。首页上它看整个工作区：按同时在干活的会话数挑动作，有会话在等你时摇铃，别的会话在后台做完时庆祝。闲下来后一分钟没动鼠标、没按键就睡着，再动一下就惊醒。点脸或尾巴会被戳得晃动，连点四下被挠痒痒，按住往外拖被拎起来。系统要求减少动态效果时每个状态停在一张代表帧上，点它才动。本机实测，小鲸鱼动着时页面主线程每秒多用约 13 毫秒（没有它时约 1–3 毫秒），换帧不触发皮肤的整页刷新，页面切到后台时停止换帧。插件新增公开路由 `GET /dsh-claude-style/deepy/<动作>.png` 提供帧图（共约 0.4 MB，浏览器在某个动作第一次出现时才下载）；更新插件后要重启宿主，小鲸鱼才会出现。

### 体验优化

- **品牌标识的「关闭」改名为 DeepSeek，整套配色换成 DeepSeek 蓝色系**：设置页「修改品牌标识」原来的「关闭」现在明确写作 DeepSeek（设置值由 `off` 改为 `deepseek`，已经存下的 `off` 照样读作 DeepSeek）。选它时强调色由陶烬橙换成 DeepSeek 的品牌蓝 `#4D6BFE`，主按钮、开关、勾选、焦点框、链接与轮次状态行都跟着变；亮色画布从偏黄的象牙白换成带一点天蓝的亮白 `#F7FAFF`（侧栏 `#F3F7FE`），暗色画布从暖黑换成蓝黑 `#13161D`，边框、各级灰色文字、弹层与菜单卡片、搜索面板、分段控件、表头与滚动条一并换成冷色，用户消息气泡带一点蓝，行内代码用正文颜色。侧栏与首页照旧显示宿主自己的 DeepSeek 鲸鱼与字标，并画成 DeepSeek 蓝；账号行没有头像时、进行中与结束轮次的状态行，原来的 Claude 标也换成 DeepSeek 的鲸鱼标（进行中时摇摆着游动）。Claude 与 Anthropic 两档的样子不变。
- **已归档列表里删除被拒时弹出提示说明原因**：此前点「删除」被拒绝时界面毫无反应，只在控制台记一条警告。现在会弹出宿主自己的 Toast：会话仍被应用占用时提示「会话仍被本应用占用，重启后再删除」，其余拒绝提示「删除失败：原因」，行保持原样。

<h3 id="en-0.10.0">New Features</h3>

- **Deepy the pixel whale on the composer under the DeepSeek brand**: with the DeepSeek brand chosen, the crab gives way to Deepy, whose frames come from the Deepy theme pack one for one (50 ms a frame). On the home page (Classic and Studio alike) it stands on the composer card's top edge near its right end; in a conversation it stands on top of the whole input area, and while you are asked to approve something, answer a question or review a plan it stands on that panel. Only the main conversation carries it; the sidebar's subagent chats do not. What it does follows the agent: between jobs it breathes and blinks, now and then looking around or spouting; a thought cloud while the model thinks; typing while it writes an answer or calls tools, headphones when two sessions work at once and a hard hat from three; headphones for one running subagent and a squad of little whale clones to conduct for two or more; inhaling the fragments during a context compaction; an exclamation bell while something waits on you; smoke and dizzy stars when a tool call or the turn fails; a flip and confetti when a turn or a compaction finishes. On the home page it reads the whole workspace: how many sessions are working picks the animation, a session waiting on you rings the bell, and one finishing in the background is celebrated. A minute with no work and no pointer movement or key presses puts it to sleep, and the next one wakes it with a start. Clicking its face or tail pokes it, four quick clicks tickle it, and pressing and pulling lifts it. With reduced motion requested each state holds one frame, and it moves only when clicked. Measured here, the animating whale adds about 13 ms of main-thread work a second (the page idles at 1–3 ms without it); a frame change wakes none of the skin's page passes, and frames stop while the page is in the background. A new public route, `GET /dsh-claude-style/deepy/<animation>.png`, serves the frames (about 0.4 MB in all, each animation fetched the first time it plays); after updating the plugin, restart the host for the whale to appear.

### Improvements

- **The brand mark's "Off" is now DeepSeek, with the whole palette in DeepSeek blue**: the settings page's Brand mark row now names its first choice DeepSeek (the setting's value changes from `off` to `deepseek`, and a stored `off` still reads as DeepSeek). It trades the ember orange accent for DeepSeek's brand blue `#4D6BFE` across primary buttons, switches, checks, focus rings, links and the turn status line; the yellowish ivory light canvas gives way to a white with a touch of sky blue, `#F7FAFF` (sidebar `#F3F7FE`), and the warm-black dark canvas to a blue-black `#13161D`, with the hairlines, grey inks, popover and menu cards, search palette, segmented controls, table headers and scrollbars turning cool, user bubbles taking a touch of blue and inline code set in the body ink. The sidebar and the home page keep the host's own DeepSeek whale and wordmark, painted DeepSeek blue; the account row's picture without an avatar and the status line of running and ended turns trade the Claude mark for DeepSeek's whale (which sways as it swims while the turn runs). The Claude and Anthropic choices look as before.
- **A Toast now explains a refused delete on the archived list**: a delete the host half refuses used to do nothing visible, leaving one console warning. The host's own Toast now rises: when the conversation is still held open by the app it reads "The conversation is still held open by this app; restart it, then delete again", and every other refusal reads "Delete failed: \<reason\>". The row stays put.

**Full Changelog**: [v0.9.1...v0.10.0](https://github.com/Nwflower/dsh-claude-style/compare/v0.9.1...v0.10.0)

## [0.9.1] - 2026-09-27

[中文](#cn-0.9.1) | [English](#en-0.9.1)

<h3 id="cn-0.9.1">问题修复</h3>

- 修复 **已归档列表里的会话删不掉**：点「删除」后宿主半边只删存储目录、不动归档记录，存储目录已经不在的会话更是直接被拒——列表那一行永远留着，重载页面后还在。现在删除成功时宿主半边在同一请求里把该会话从归档集合里移除；归档集合里存储目录已消失的条目（幽灵）也按删除成功处理并移出归档集合，浏览器随即重拉一次会话列表基线，已删除的会话不会再靠旧摘要顶在已归档列表或会话树里。旧版宿主半边对目录缺失的会话回 404 时，浏览器同样移除该行。

<h3 id="en-0.9.1">Bug Fixes</h3>

- **Fixed archived sessions refusing to disappear when deleted**: the delete button removed the stored directory while the archive record kept the id, and a session whose directory was already gone was refused outright — the row stayed on the list and survived a page reload. A successful delete now also drops the session from the archive set in the same request, an archive entry whose stored directory has vanished is answered as deleted and leaves the set, and the browser re-pulls the session baseline right after, so a deleted session no longer lingers on the archived list or in the session tree on a stale summary. Against an older host half that still answers 404 for a missing directory, the browser removes the row just the same.

**Full Changelog**: [v0.9.0...v0.9.1](https://github.com/Nwflower/dsh-claude-style/compare/v0.9.0...v0.9.1)

## [0.9.0] - 2026-09-26

[中文](#cn-0.9.0) | [English](#en-0.9.0)

<h3 id="cn-0.9.0">新增功能</h3>

- **侧栏搜索框与搜索面板**：鼠标移到侧栏上时，左上角的品牌标志淡出、换成一个淡入的搜索按钮（右端标出宿主的搜索快捷键），点它在窗口上方打开搜索面板；宿主的搜索快捷键（桌面端 Ctrl+K，Web 端 Ctrl+Alt+K，在设置里改过的以改后的为准）也打开这个面板，侧栏「工作区」标题行原来的搜索图标不再显示。面板打开与关闭时连同背后的遮罩一起淡入淡出。面板能搜历史会话、项目、插件、当前会话可用的 Skill 与快捷键。会话按标题、所属工作区名和对话内容搜：你和模型说过的每句话都算（工具调用的参数与子代理会话不算），句子中间的几个中文字也能搜到，不分大小写，空格多几个少几个都行；行下显示命中的那一句，命中的字加粗。插件新增只读的私有路由 `/dsh-claude-style/session-search` 供面板查询，与其他私有路由一样先过宿主的请求校验；宿主进程启动后第一次打开面板时它会把全部会话读一遍（本机 128 个会话约 16 秒，这期间面板显示「正在搜索」），之后每次查询约 0.1 秒。顶部的「全部 / 会话 / 项目 / 插件 / Skill / 快捷键」切换分类；搜索框为空时列出最近的五个会话和「新会话 / 插件 / 设置 / 键盘快捷键」几个操作。↑↓ 选择，Enter 打开，Tab 与 Shift+Tab 切换分类，Esc 关闭。选中会话即打开该会话；选中项目在这个工作区开一个新会话；选中插件打开它在插件页的详情；选中 Skill 把 `/名称 ` 放到当前会话输入框的开头；选中快捷键打开宿主的快捷键列表，并筛到这一条。侧栏收起成窄条时没有搜索框。
- **进行中、已停止与失败的轮次改用 Claude Code 式的状态行**：原来宿主把「深度求索中，用时 N 秒」「已停止」「处理失败」排在这一轮的最前面，工作过程往下越排越长、状态却停在上方。现在这一行跟在这一轮工作的末尾（这一轮的页脚、排队中的消息仍在它下面），画成 Claude Code 的样子。进行中是一个转动的火花标记加「用时 · 输出 tokens · 当前动作」，例如「34秒 · 1.2k tokens · 思考中…」，当前动作依次有等待模型、思考中、思考了 N 秒、输出中、准备调用工具与运行工具中；停止或失败后火花静止，文字为「已停止 · 17秒 · 179 tokens」「处理失败 · 12秒 · 300 tokens」这样，历史里的这些轮次也一样。tokens 是这一轮已完成各步上报的输出用量，正在输出的那一步结束后计入。正常结束的一轮仍是宿主原来的「用时 N 秒」，在原来的位置，折叠与展开照旧。

### 体验优化

- **像素螃蟹改用 Claude Code 的原版动画**：工作台首页输入卡片上的螃蟹原来是按 Claude Code 的样子手绘的十一个姿势；现在换成 Claude Code 自己的敲代码动画，逐帧照搬（43 帧、每帧 80 毫秒，约 3.4 秒）：眨眼、掏出笔记本电脑放到卡片边沿、跳一下侧过身敲一阵键盘、收起电脑转回正面，像素边缘清晰。电脑仍用随主题变化的灰色，触发方式（点击、指针移开、闲置时隔二三十秒自己来一次，减少动态效果时只认点击）不变。
- **对话中输入框的发送键改成 Claude Code 的回车图标**：原来是等宽字体里的「↵」字符，有内容时变成陶土橙；现在是按 Claude Code 画的回车箭头（上沿一小段、沿右侧向下、再沿底边向左到箭头），线条清晰，输入框有内容时用正文墨色，空着时仍是浅灰。
- **桌面端侧栏的品牌行上移 10px**：桌面端的侧栏从 40px 高的标题栏下方开始，品牌标志因此比 Web 端低出一截；现在品牌行（连同其下的新会话、插件与会话列表）上移 10px，悬停时换上的搜索框仍整个露在标题栏下方，与标题栏里的收起按钮也不重叠。Web 端不变。
- **用量面板的倍数趣味行从二十九本书扩到六十五本**：书单补入《黄色壁纸》《变形记》《化身博士》《野性的呼唤》《时间机器》《绿野仙踪》《黑暗之心》《浮士德》《螺丝在拧紧》《伊索寓言》《彼得·潘》《君主论》《隐形人》《安徒生童话》《世界大战》《善恶的彼岸》《白牙》《沉思录》《格林童话》《格列佛游记》《瓦尔登湖》《鲁滨逊漂流记》《神曲》《包法利夫人》《查拉图斯特拉如是说》《奥德赛》《双城记》《远大前程》《理想国》《罪与罚》《利维坦》《安娜·卡列尼娜》《卡拉马佐夫兄弟》《堂吉诃德》《基督山伯爵》《悲惨世界》，长度都是全文以 o200k_base 分词器实测的值（英文原著或通行英译本，《浮士德》为德文原文）。书单仍从《道德经》排到《追忆似水年华》，用量越过的书更密，趣味行落到的那本书离实际用量更近。

### 问题修复

- 修复 **开启「自动弹出弹层」后进入封号彩蛋页会立刻退出**：桌面端从账号菜单点开彩蛋页时，全窗浮层让指针「离开」菜单，悬停收起随后代宿主菜单按下的 Escape 被插件的键盘路由当成了用户按键，约 0.1 秒就把刚打开的彩蛋页关掉。现在这次代发的 Escape 只送达宿主菜单：彩蛋页开着时悬停收起同时停摆，页面保持打开，退出后侧栏与账号菜单恢复进入前的样子。
- 修复 **启用皮肤后带输入框的会话页上快捷键失灵**：皮肤常驻页面的模型选择器、推理强度与权限弹层卡片在关闭时仍标注 `role="menu"`，宿主据此把快捷键仲裁给一个看不见的「前景菜单」，连按 Esc 停止智能体、Ctrl+W 关闭页面与标签页菜单的 Esc 都不再生效（Web 端受影响的面更宽）。现在这一角色标注随卡片开合写入与撤销：卡片打开时才存在，快捷键的仲裁恢复如常。

<h3 id="en-0.9.0">New Features</h3>

- **A sidebar search box and search palette**: while the pointer is over the sidebar, the brand mark at its top left fades out into a search button (the host's search shortcut shown at its right end), and pressing it opens a search palette near the top of the window; the host's search shortcut (Ctrl+K on the desktop, Ctrl+Alt+K on the web, or whatever it has been rebound to in settings) opens the same palette, and the search icon the sidebar's Workspace heading used to carry is gone. The palette fades in and out together with the mask behind it. The palette searches past sessions, projects, plugins, the skills the current session offers and keyboard shortcuts. Sessions match by title, by workspace name and by what was said in them: every message between you and the model counts (tool-call arguments and subagent sessions do not), a few Chinese characters from the middle of a sentence match, case does not matter and neither do extra spaces; the matching line shows under the row with the match in bold. The plugin adds a read-only private route, `/dsh-claude-style/session-search`, for these queries, behind the host's request check like its other private routes; the first time the palette opens after the host process starts, the route reads every session once (about 16 s for 128 sessions here, while the palette shows "Searching…"), and each query after that takes about 0.1 s. The palette has All / Sessions / Projects / Plugins / Skills / Shortcuts across the top to narrow the list; with the box empty it lists the five most recent sessions and the New session, Plugins, Settings and Keyboard shortcuts actions. ↑↓ moves, Enter opens, Tab and Shift+Tab switch the category, Esc closes. Picking a session opens it; a project starts a new session in that workspace; a plugin opens its details on the plugins page; a skill puts `/name ` at the head of the current session's input; a shortcut opens the host's shortcut list filtered to that entry. The collapsed sidebar rail has no search box.
- **A Claude Code style status line for running, stopped and failed turns**: the host used to put "Deep diving for N s", "Stopped" and "Failed" at the very top of the turn, so the work grew downward while its status stayed above it. The line now follows the end of the turn's work (the turn's footer and queued messages still sit below it) and looks like Claude Code's. While the turn runs it is a turning spark, then elapsed time · output tokens · what the model is doing, for example "34s · 1.2k tokens · Thinking…", the action being one of waiting for the model, thinking, thought for N s, writing, preparing a tool call and running tools; once the turn is stopped or fails the spark stands still and the line reads like "Stopped · 17s · 179 tokens" or "Failed · 12s · 300 tokens", for such turns in the history too. The token count is the output usage the turn's finished steps report; the step still streaming joins it once it finishes. A turn that finishes normally keeps the host's own "Took N s" in its place, and folding works as before.

### Improvements

- **The pixel crab plays Claude Code's own animation**: the crab on the Studio home page's composer card used to be eleven hand-drawn poses after Claude Code's; it now plays Claude Code's own laptop animation frame for frame (43 frames of 80 ms, about 3.4 s) — a blink, a laptop pulled out onto the card's edge, a hop into a side-on stance to type away, the laptop put away as it turns back — with crisp pixel edges. The laptop keeps its theme-following grey, and what sets it off (a click, the pointer leaving it, on its own every half minute or so, only a click under reduced motion) is unchanged.
- **The in-conversation composer's send button uses Claude Code's return glyph**: it used to be the "↵" character from the monospace font, turning clay once there was text; it is now Claude Code's drawn return arrow (a short stub along the top, down the right side, back along the bottom to the arrowhead) in crisp strokes, in the body ink once the box holds text and still pale grey while it is empty.
- **The desktop sidebar's brand row sits 10px higher**: the desktop sidebar starts below the 40px titlebar, which left the brand mark lower than on the web; the brand row (and the New session, Plugins and session list below it) now rises 10px, with the search box that takes its place on hover still wholly below the titlebar and clear of the collapse button there. The web build is unchanged.
- **The usage panel's yardstick line grows from twenty-nine to sixty-five books**: the list adds The Yellow Wallpaper, Metamorphosis, The Strange Case of Dr Jekyll and Mr Hyde, The Call of the Wild, The Time Machine, The Wonderful Wizard of Oz, Heart of Darkness, Faust, The Turn of the Screw, Aesop's Fables, Peter Pan, The Prince, The Invisible Man, Andersen's Fairy Tales, The War of the Worlds, Beyond Good and Evil, White Fang, Meditations, Grimms' Fairy Tales, Gulliver's Travels, Walden, Robinson Crusoe, The Divine Comedy, Madame Bovary, Thus Spoke Zarathustra, The Odyssey, A Tale of Two Cities, Great Expectations, The Republic, Crime and Punishment, Leviathan, Anna Karenina, The Brothers Karamazov, Don Quixote, The Count of Monte Cristo and Les Misérables, each sized by feeding its full text to the o200k_base tokenizer (the English original or the standard English translation; Faust in the German original). The list still runs from Tao Te Ching to In Search of Lost Time; with the books set closer together, the one the line lands on sits nearer the real usage.

### Bug Fixes

- **Fixed the account-hold easter egg closing itself right after it opened while "Open popovers on hover" is on**: on the desktop, opening the page from the account menu made the full-window overlay "leave" the menu, and the hover close that followed pressed Escape on the host's behalf — which the skin's keyboard routing took for the user's own key and dismissed the page about 0.1 s in. That dispatched Escape now reaches only the host's menu, the hover close stands down while the page is open, and the sidebar and its account menu come back as they were once the page is dismissed.
- **Fixed shortcuts going dead on conversation pages with an input box while the skin is enabled**: the model picker, reasoning-effort and permission popover cards the skin keeps in the page carried their `role="menu"` mark while closed, so the host arbitrated its shortcuts to an invisible "foreground menu" — pressing Esc twice to stop the agent, Ctrl+W to close a page and the Esc of the tab menu all stopped working (the Web build loses a wider set of them). The mark now rides the card's open state: it exists only while a card is open, and shortcut arbitration goes back to normal.

**Full Changelog**: [v0.8.0...v0.9.0](https://github.com/Nwflower/dsh-claude-style/compare/v0.8.0...v0.9.0)

## [0.8.0] - 2026-09-26

[中文](#cn-0.8.0) | [English](#en-0.8.0)

<h3 id="cn-0.8.0">体验优化</h3>

- **对话 / 轨迹 / 上下文切换时高亮块平滑滑动**：切换视图时，高亮块此前在原标签上淡出、在新标签上淡入；现在同一块高亮从原标签滑到新标签，宽度随标签文字一起变化，标签文字颜色同步过渡。滑动不受系统「减少动态效果」设置影响，Windows 关掉了「在 Windows 中显示动画」时照样滑动。
- **权限分段、进行中 / 已归档与设置页分段控件的高亮块同样滑动**：只读 / 编辑 / 自动 / Yolo、侧栏的进行中 / 已归档，以及设置页里的各组分段控件，切换时高亮块都从原来那一段滑到新的一段，与对话视图标签同一套动画。
- **页面持续变化时插件的每帧开销大幅下降**：流式输出、打字机效果这类每帧都改动页面内容的场景，插件样式表此前让浏览器每帧的样式重算从 1.6ms 涨到 11–18ms，每帧主线程总耗时 14–23ms，超过一帧 16.7ms 的预算而掉帧；现在同一场景下样式重算为每帧 1.9–2.7ms，总耗时 5–7ms（本机无界面 Chrome 实测）。界面外观不变。
- **工作区选择菜单改为 Claude Code 的文件夹菜单样式**：菜单此前每行前面都有一个文件夹图标，行距与档位菜单的两行条目一样宽；现在是一张窄卡片，纯文字行排得更紧，文件夹图标与「添加工作区…」前的加号都不画，当前工作区仍以强调色勾号标出。档位菜单保持原样。
- **用量面板的倍数趣味行从十一本书扩到二十九本**：标尺书单补入《道德经》《爱丽丝漫游奇境》《圣诞颂歌》《弗兰肯斯坦》《道林·格雷的画像》《福尔摩斯冒险史》《哈克贝利·费恩历险记》《简·爱》《德古拉》，以及四大名著、《三体》三部曲、《活着》《平凡的世界》等中文书目，整份书单从《道德经》（约 7.6K tokens）排到《追忆似水年华》。书长改用真实口径：公有领域原书按全文以 o200k_base 分词器实测，仍在版权期的书目按出版字数以同一分词器实测的比例折算，几本英文经典的长度也按实测值更新。英文界面的这一行改为 “You've used ~N× the tokens in <书名>.”，此前的 “~N× more tokens than” 读起来是多出 N 倍，与实际倍数差了一倍。
- **账号弹层卡片改用象牙白底色**：浅色模式下，账号弹层与宿主账号菜单此前是纯白卡片，和界面其余部分的暖色调不一致；现在与主画布同为象牙白 `#FCFCFB`，靠细边框和阴影与侧栏区分。暗色模式不变。

### 问题修复

- 修复 **侧栏「已归档」显示「没有已归档的会话」**：插件启动时宿主的归档数据往往还没到，列表就一直停在空白；现在列表跟随宿主的归档记录与会话列表实时更新，启动后、在别处归档或取消归档后都立刻反映。列表收录的会话与宿主自带「仅已归档」筛选一致（不含子代理会话与已不存在的会话），每行显示宿主给出的标题，不再出现成片的「未命名会话」；会话多时列表在侧栏内滚动，不再被截在窗口底部。
- 修复 **点击已归档行没有任何反应**：现在与宿主会话树里点已归档会话一样，窗口顶部弹出宿主自己的提示「已归档对话暂时无法查看，请取消归档后查看」。
- 修复 **英文界面下「排队发送」「插话发送」按钮的外观与中文界面不一致**：英文界面下，回复进行中且草稿非空时，这两个按钮此前不显示强调色，悬停时也没有底色；现在与中文界面一致。输入框里各按钮改为按它们在宿主界面中的位置识别，不再依赖按钮文字，宿主改动按钮文案或切换界面语言都不影响样式。

### 其他变更

- **页面标出正在运行的构建**：`<body>` 上的 `data-dsh-claude-style` 属性现在写着已加载的包的构建编号（`npm run build` 会打印同一个编号），报告问题时即使页面经过多次热重载、从未刷新，也能说清运行的是哪一版。

<h3 id="en-0.8.0">Improvements</h3>

- **The Chat / Trajectory / Context highlight slides between tabs**: switching views used to fade the highlight out on the old tab and in on the new one; now one highlight slides from the old tab to the new one, resizing to the new label as it goes, while the labels' colours cross over. The slide ignores the system's reduced-motion setting, so it still plays with Windows' "Show animations in Windows" turned off.
- **The permission segments, Active / Archived and the settings page's segmented controls slide their highlight too**: Read / Edit / Auto / Yolo, the sidebar's Active / Archived, and every segmented control on the settings page now slide the highlight from the old segment to the new one, with the same motion as the conversation view tabs.
- **Much lower per-frame cost while the page keeps changing**: when content changes every frame (streaming output, a typewriter effect), the plugin's stylesheet used to raise the browser's style recalculation from 1.6ms to 11–18ms per frame, for 14–23ms of main-thread work per frame — over the 16.7ms frame budget, so frames dropped. The same scenario now costs 1.9–2.7ms of style recalculation and 5–7ms in total per frame (measured locally in headless Chrome). Nothing on screen looks different.
- **The workspace picker takes the look of Claude Code's folder menu**: every row used to carry a folder glyph and was spaced like the preset menu's two-line entries; it is now a narrow card of plain text rows set closer together, with no folder glyph and no plus sign on "Add workspace…", and the current workspace keeps the accent check. The preset menu is unchanged.
- **The usage panel's yardstick line grows from eleven to twenty-nine books**: the list adds Tao Te Ching, Alice's Adventures in Wonderland, A Christmas Carol, Frankenstein, The Picture of Dorian Gray, The Adventures of Sherlock Holmes, Adventures of Huckleberry Finn, Jane Eyre and Dracula, plus the Chinese classics — the Four Great Classical Novels, the Three-Body trilogy, To Live and Ordinary World — with the whole list spanning Tao Te Ching (~7.6K tokens) to In Search of Lost Time. Book lengths now carry a real basis: public-domain originals are measured by feeding their full text to the o200k_base tokenizer, and in-copyright titles are their published word counts at the ratio that tokenizer measures, with several English classics' lengths updated to the measured values. The English line now reads "You've used ~N× the tokens in <book>."; the former "~N× more tokens than" said N times more, one whole book off the real multiple.
- **The account popover's card takes the ivory canvas fill**: in light mode the account popover and the host's account menu were pure white cards, out of tone with the warm rest of the interface; they now share the main canvas's ivory `#FCFCFB`, set off from the sidebar by their hairline and shadow. Dark mode is unchanged.

### Bug Fixes

- Fixed **the sidebar's Archived view reading "No archived conversations"**: the host's archive data usually arrives after the plugin starts, and the list stayed empty. The list now follows the host's archive record and session list live, so it fills in after startup and reflects archiving or unarchiving done anywhere. It holds the same conversations as the host's own "Archived only" filter (no subagent sessions, no sessions that no longer exist), each row carries the host's title instead of a run of "Untitled conversation", and a long list scrolls inside the sidebar instead of being cut off at the bottom of the window.
- Fixed **clicking an archived row doing nothing**: it now raises the host's own notice at the top of the window, "Archived sessions cannot be opened. Unarchive it to view.", the same one the host's session tree shows for an archived session.
- Fixed **the Queue message and Steer message buttons looking different in the English UI**: in English, with a reply running and a non-empty draft, these two buttons showed no accent colour and no hover fill; they now match the Chinese UI. The composer's buttons are now recognised by where they sit in the host's markup rather than by their text, so a host wording change or a switch of the UI language leaves their styling intact.

### Chores

- **The page states which build it is running**: the `data-dsh-claude-style` attribute on `<body>` now carries the build id of the loaded bundle (`npm run build` prints the same id), so a bug report can name the exact build even after hot reloads that never reloaded the page.

**Full Changelog**: [v0.7.2...v0.8.0](https://github.com/Nwflower/dsh-claude-style/compare/v0.7.2...v0.8.0)

## [0.7.2] - 2026-09-25

[中文](#cn-0.7.2) | [English](#en-0.7.2)

<h3 id="cn-0.7.2">新增功能</h3>

- **账号位置的头像改为玩家自己的皮肤**：启动器记下了玩家导入的皮肤，宿主半边把那张规范化贴图以只读路由发给浏览器，浏览器按启动器账号列表相同的裁法取头部——脸的 8×8 贴图块按盒子的 1/18 内缩，帽子层铺满整个盒子。头部按**方形**绘制，不用账号头像那条路径的圆形遮罩：它画到盒子边缘，任何圆角都会切掉它的像素。没有头像、头像文件已删、图取不到时显示 Claude 徽标。
- **权限档位改为跟随宿主目录**：权限控件（输入框分段控件与它的弹层）不再写死四档，段位与行都按宿主的 `permissionPresets` 目录构建——目录里有的档位才画，宿主没提供的整条不出现，第三方插件注册的档位因此成为一等公民：auto mode 插件的 `auto-mode` 会以 **Auto mode** 出现在弹层里，并在分段控件里占用 **Auto** 那一格（部署同时提供宿主内置 Auto review 时，内置档退居弹层、把格子让给部署自己的自动档）。档位名与说明仍由皮肤给（皮肤不认识的档位用宿主自己的名字与说明，机器值不上屏），行保持纯文字——预设声明的 `icon` 也不画，档位列表读起来是一份清单。切换仍走宿主的 `/permission <preset>`。

### 体验优化

- **工作台首页在还没选工作区时也显示用量面板与权限分段**：刚打开、尚无会话的首页此前只有问候语和输入框；现在用量面板照常出现在两者之间，输入框下方显示 Read / Edit / Auto / Yolo 分段，停在新会话的默认权限上，点它和点输入框一样打开工作区选择。
- **工作台首页「先选工作区」的虚线框只框住单行输入框**：虚线框此前连同输入框下方的工具行一起框进去，比输入框高出一截；现在虚线画在单行输入框本身，指针移上去时变色的提示不变。

### 问题修复

- 修复 **选中划过行内代码时代码段显示为一块偏浅的独立高亮**：芯片的半透明底色画在选中高亮之上，把芯片内的选中色混浅了一档；现在芯片内的选中色预先抵消这层罩色，整段选区呈现统一的选中色，聚焦与失焦、深色与浅色下一致。
- 修复 **窗口较矮时工作台首页被用量面板撑出窗口**：面板放不下时整页向下延伸，问候语被顶出窗口上沿；现在面板在问候语与输入框之间自己滚动，底边渐隐，滚到底时渐隐消失，问候语、上下文行与输入框都留在窗口内。

<h3 id="en-0.7.2">New Features</h3>

- **The account row's mark becomes the player's own skin**: the launcher stores every imported skin as a normalized texture atlas, and the host half serves it over a read-only route. The browser crops the head the way the launcher's own account list does — the face's 8×8 texel block inset by 1/18 of the box, with the hat layer over the whole box. The head is drawn **square** rather than under the round mask the avatar-photo path uses, because it reaches the box's edges and any rounding would shave its pixels off. With no picture, a deleted file, or a picture that cannot be served, the Claude mark shows.
- **The permission ladder now follows the host catalog**: the permission control (the composer's segmented group and its popover) no longer hardcodes four tiers. Both the segments and the rows are built from the host's `permissionPresets` catalog, so a deployment offers exactly the tiers it configures and a tier no one serves is absent rather than drawn dead. A tier a third-party plugin registers is therefore a first-class entry: the auto mode plugin's `auto-mode` appears as **Auto mode** in the popover and takes the **Auto** slot of the segmented group (when the deployment also serves the host's built-in Auto review, that one stays in the popover and the slot goes to the deployment's own tier). Names and descriptions still come from the skin — a tier it does not know reads with the host's own name and description, never with its machine id — and the rows stay text-only: a preset's declared `icon` is not drawn either, so the ladder reads as one list. Switching still goes through the host's `/permission <preset>`.

### Improvements

- **The Studio home shows the usage panel and the permission segments before a workspace is picked**: a fresh home with no session yet showed only the greeting and the input box; the usage panel now sits between them as usual, and the Read / Edit / Auto / Yolo segments show under the input box, resting on the preset a new session starts in — pressing them opens the workspace picker, the same as pressing the input box.
- **The Studio home's dashed "pick a workspace" ring outlines the single-line input box alone**: the ring used to take in the toolbar row under the input box and stood a row taller than it; it is now drawn on the input box itself, and still changes colour under the pointer.

### Bug Fixes

- Fixed **inline code showing a separate, lighter highlight when selected**: the chip's translucent wash painted over the selection and lightened it inside the chip; the in-chip selection paint now pre-compensates for that wash, so a selection crossing inline code is one even colour, focused or blurred, dark or light.
- Fixed **the usage panel pushing the Studio home past a short window**: when the panel did not fit, the whole page grew downward and the greeting ran off the top; the panel now scrolls between the greeting and the composer with its bottom edge fading out (the fade lifts at the end of the scroll), and the greeting, the context row and the input box stay in the window.

**Full Changelog**: [v0.7.1...v0.7.2](https://github.com/Nwflower/dsh-claude-style/compare/v0.7.1...v0.7.2)

## [0.7.1] - 2026-09-25

[中文](#cn-0.7.1) | [English](#en-0.7.1)

<h3 id="cn-0.7.1">体验优化</h3>

- **默认首页版面改为工作台**：没在设置里选过版面时，新会话页用工作台版面——问候在左上、输入卡片贴住窗口底边、中间是用量面板、卡片上沿站着像素螃蟹，也就是 Claude Code 自己的首页。经典版面仍可在设置页随时切回，已经选过版面的不受影响。

<h3 id="en-0.7.1">Improvements</h3>

- **Studio is the default home layout**: without a layout chosen in the settings, the new-conversation page opens in the Studio layout — the greeting at the top left, the composer on the window's bottom edge, the usage panel in between and the pixel crab on the card, Claude Code's own home. Classic stays one switch away in the settings page, and a layout already chosen is kept.

**Full Changelog**: [v0.7.0...v0.7.1](https://github.com/Nwflower/dsh-claude-style/compare/v0.7.0...v0.7.1)

## [0.7.0] - 2026-09-25

[中文](#cn-0.7.0) | [English](#en-0.7.0)

<h3 id="cn-0.7.0">新增功能</h3>

- **两套首页版面，设置页随时切换**：新增「首页版面」设置项。**经典**沿用居中大标题加输入卡片；**工作台**把标题移到左上角并固定为一句「What's up next, 用户名？」（无衬线小字，与品牌标记同一行），输入框改用对话内的单行样式贴住窗口底部、上方一行细边框上下文胶囊，标题与一块 480px 窄栏用量面板贴着输入框左缘排布——概览页签是六个数字格（会话数、消息数、Token 总量、活跃天数、高峰时段、最常用模型）与 26 周按天热力图（等分列方格、蓝色数据色阶）；模型页签是每天一根按模型颜色自下而上堆叠的柱子，下面跟一份模型排行（色块、模型名、输入与输出、占比，超过六行折成「再显示 N 个」，展开后末尾是「收起」），柱与色块共用同一套按名次取色的蓝色色阶；右上角的「全部 / 30 天 / 7 天」范围切换过滤数字格（含高峰时段）、趣味行与模型排行，热力图与柱状图保持自身窗口；所选范围内的用量超过一本书时，热力图下方出现倍数趣味行：书从《动物农场》到《追忆似水年华》共十一本，每次回到新会话页随机换一本，范围内用量还不到这本书时退到已经超过的最长那本。面板只在新会话页出现，进入对话后自动消失。
- **用量数据在本机汇总**：新增只读路由 `GET /dsh-claude-style/usage`（与用户名路由同一同源护栏）。装了 `dsh-cost-meter` 时直接读它的账本缓存（只读），否则读本机会话日志自行汇总，并按日志文件增量缓存——冷启动首次约两秒，之后每次启动约 3 毫秒。两种来源都给出每个模型的四类 token 与每天按模型拆分的 token（`models` 与 `days[].models`），模型页签的柱状图与排行读它们；账本按「提供方:模型」记账，同一模型经不同提供方的用量合成一行。账本不记小时，读账本时其余数字先出，高峰时段随后由本机会话日志按天算出补上。汇总不可用（旧宿主半边或汇总失败）时，面板改用宿主会话列表自带的投影值出数。
- **面板先画骨架再填数**：数字到达前先画好外框、占位数字、空热力格与模型行的占位条，到达后只替换文字、格子颜色与条长，整个版面不跳动；取不到数据的格子画破折号，不画零。
- **输入卡片上的像素螃蟹**：工作台版面的新会话页上（经典版面没有），输入卡片上沿靠右站着 Claude Code 的像素螃蟹。点它一下、指针从它身上移开时、以及页面开着时每隔 25–45 秒，它照 Claude Code 的样子敲一次代码：半转身眨眼，掏出笔记本电脑放到卡片边上，侧身敲一会儿键盘，收起电脑转回正面，约三秒；系统要求减少动态效果时（例如 Windows 关掉了「在 Windows 中显示动画」），只有点它才播放。只有螃蟹本身接收指针，电脑挥动的空白处不挡点击。
- **热力图的日期提示**：指针停在热力图的某一天上，立刻浮出 Claude Code 样式的深色提示，写着日期和当天的消息数（如「9月9日 — 15,955」）；靠两端的几列提示贴着格子外沿，不会伸出面板。会话列表兜底来源没有按天的消息数，此时提示写当天的 Token。概览的数字格同时改用 Claude Code 的叫法：消息数、Token 总量、最常用模型（模型名不加粗）。
- **经典首页的问候更多了**：经典版面的大标题不再每个时段只有一句，早上、午间、下午、晚上、深夜各有一组问候，另有几句不分时段；每次回到新会话页随机换一句，同一次停留里不会跳动。
- **接入 HDSL 启动器的账号信息**：由 HDSL 启动的实例，昵称与头像会优先取启动器里的账号。昵称按「自定义昵称 → 官方账号昵称 → HDSL 昵称 → 上次探测到的系统用户名 → 系统用户名 → `User`」回退，头像按「官方账号头像 → HDSL 头像 → Claude 徽标」回退。宿主半边新增两条只读私有路由，与用户名路由同级过宿主请求栅栏：`GET /dsh-claude-style/hdsl` 回账号元数据（不含头像文件的绝对路径），`GET /dsh-claude-style/hdsl-skin.png` 回头像图片。契约版本读不到或不认识时整组忽略；头像文件被删除时回落到徽标。

<h3 id="en-0.7.0">New Features</h3>

- **Two home layouts, switchable in the settings page**: a new Home layout preference. **Classic** keeps the centered headline over the composer card; **Studio** pins the greeting to the top left as one fixed line ("What's up next, <user>?", in the sans UI face on the brand mark's line), docks the composer in the conversation's single-line form at the window's bottom edge with a row of hairline context chips above it, and sets the greeting and a 480px usage panel against the composer's left edge — an Overview tab with six stat cells (sessions, messages, total tokens, active days, peak hour, favorite model) and a twenty-six-week per-day heat grid of square cells in equal columns, and a Models tab stacking each day's per-model tokens into one bar over a ranked model list (swatch, model name, input and output, share; past six rows it folds behind a "show more" row, and the open list ends in a "show less" row), both reading the same rank-ordered blue ramp. The All / 30d / 7d range pills filter the tiles (the peak hour included), the multiplier line and the model list while the grid and the chart keep their own windows, and once the picked range's total passes one book a multiplier line appears under the grid — eleven books from Animal Farm to In Search of Lost Time, a fresh one drawn each time the new-conversation page comes back, stepping down to the longest book the range has passed when it has not reached the drawn one. The panel appears on the new-conversation page only and steps away once a session is open.
- **The usage numbers are folded locally**: a new read-only route, `GET /dsh-claude-style/usage`, behind the same same-origin fence as the username route. With `dsh-cost-meter` installed it reads that plugin's ledger cache (read-only); otherwise the host half folds the local session logs itself and caches the result incrementally per log file — about two seconds on the first cold pass, about 3 ms per start afterwards. Both sources answer each model's four token buckets and each day's per-model tokens (`models` and `days[].models`), which the Models tab's chart and ranking read; the ledger books usage per provider and model, and one model served by several providers is one row. The ledger keeps no hours, so with it the other figures land first and the peak hour follows a moment later, folded per day from the local session logs. When the fold cannot answer (an older host half or a failed pass), the panel falls back to the projection block each host session row carries.
- **The panel draws its skeleton before its numbers**: the frame, number placeholders, an empty heat grid and stand-in share bars come first; arriving values replace only the text, the cell colours and the bar lengths, so nothing shifts. A figure no source can answer is a dash, never a zero.
- **A pixel crab on the composer card**: on the new-conversation page of the Studio layout (the Classic layout has none), Claude Code's pixel crab stands on the composer card's top edge near its right end. When it is clicked, when the pointer leaves it, and every 25–45 seconds while the page is in view, it plays Claude Code's laptop routine — a half turn and a wink, a laptop brought out onto the card's edge, a spell of typing side-on, and the laptop put away as it turns back, about three seconds; with reduced motion requested (Windows' "Show animations in Windows" turned off, for one) only a click plays it. Only the crab itself takes the pointer, so the room the laptop swings through never blocks a click.
- **Day tips on the heat grid**: resting the pointer on a day of the heat grid shows Claude Code's dark tip at once, with the date and that day's messages ("Sep 9 — 15,955"); over the columns at either end the tip lines up with the cell's outer edge and stays inside the panel. The session list's fallback has no per-day message count, and its tips name the day's tokens instead. The Overview tiles take Claude Code's names as well: Messages, Total tokens and Favorite model (the model name at regular weight).
- **More greetings on the classic home page**: the classic headline no longer has one line per time of day — morning, midday, afternoon, evening and night each have a pool, plus a few lines for any hour; a fresh line is drawn each time the new-conversation page comes back and holds still while you stay.
- **HDSL launcher accounts are picked up**: an instance started by HDSL prefers the launcher's account for both the nickname and the picture. The nickname falls back through the custom nickname → the signed-in account's name → the HDSL account name → the last probed system user → the system user → `User`; the picture through the account's avatar → the HDSL avatar → the Claude mark. The host half gains two read-only private routes behind the same request fence as the username route: `GET /dsh-claude-style/hdsl` answers the account metadata (never the avatar file's absolute path) and `GET /dsh-claude-style/hdsl-skin.png` answers the image. A contract version that is missing or unknown voids the whole group, and a deleted avatar file falls back to the mark.

<h3 id="cn-0.7.0">体验优化</h3>

- **同时只开一张弹层卡片**：悬停或点击打开模型选择器、推理强度、权限、账户抽屉、会话统计卡片、工作台新会话页的工作区菜单时，之前打开的那张卡片立即收起，两张卡不再叠在同一角；宿主自带的工作区菜单与账户菜单一并参与。
- **悬停停留由 50ms 延长到 100ms**：指针以平常速度扫过触发器不再展开卡片——工作台版面把上下文行贴在输入卡片正上方，此前指针移向输入框时几乎每次都会展开工作区菜单；停在触发器上仍然立即展开。模型选择器的收起宽限与会话统计卡片的展开停留保持各自的例外值。

<h3 id="en-0.7.0">Improvements</h3>

- **One popover card at a time**: opening the model picker, the reasoning-effort card, the permission menu, the account drawer, the session-stats card or the studio new-conversation page's workspace menu now folds whatever card was up before it, so two panels no longer stack over one corner; the host's own workspace and account menus join on the same terms.
- **The hover dwell goes from 50 ms to 100 ms**: a pointer crossing a trigger at an ordinary pace no longer unfolds a card — the studio layout sets the context row directly above the composer card, where a pointer on its way to the input used to unfold the workspace menu almost every time — while a pointer parked on the trigger still opens at once. The model picker's close grace and the stats card's open dwell keep their own values.

<h3 id="cn-0.7.0">问题修复</h3>

- 修复 **浅色模式下聊天记录顶部「加载更早」按钮几乎看不见**：浅色下的实色悬停底改为浅灰，按钮文字对比度从 2.6:1 回到 4.7:1，深色不变；同族令牌下的工作区重命名输入框在浅色里也不再是深色方块。
- 修复 **设置页「账号与余额」的「充值」按钮文字与底色几乎同色**：统一的链接色不再覆盖这类实心按钮链接，按钮恢复自身配色（浅色 3.1:1，深色 6.1:1），旁边的「查询用量」回到描边按钮样式。
- 修复 **实心主按钮悬停时底色跳出陶土色系**：悬停色与底色现在同族，悬停不再跳到冷灰或近白。
- 修复 **工作区选择器弹层打开时先跳到触发器下方再弹回**：弹层从打开的第一帧起就停在触发器旁边的正确位置，不再有可见的跳动。
- 修复 **切换到 Yolo 或 Auto 后权限停留在原档位**：皮肤此前通过模拟点击被隐藏的宿主访问按钮、再按文字寻找弹层里的档位行来完成这两个档位的切换，输入栏被锁定或按钮处于禁用状态时这条路径点不动，点确认后预设也不变化。现在任何档位都直接请求宿主的 `/permission` 命令完成切换（与官方弹窗确认后走的是同一条写入路径），点击后权限立即生效，皮肤控件与宿主按钮同步显示新档位；切换请求失败时控件按各功能失败隔离规则交还宿主按钮，不再无声无息。
- 修复 **权限弹层随重建在页面里残留**：宿主重渲染换掉控件容器后，下一次重建会往页面里追加一颗新弹层，旧弹层失去引用后永远留在文档里（长时间使用的页面上数到过 38 颗）。现在每次安装弹层先清扫文档里已有的弹层，功能卸载时一并扫除，页面上始终只有当前这一颗。
- 修复 **已归档行的时间被操作按钮顶离右缘**：取消归档与删除按钮此前以透明常驻占位，时间只能停在按钮预留区的左边，悬停时三样挤在一行。现在与官方会话行同一机制：静止时按钮不占位，时间与行右缘对齐；悬停（或键盘聚焦行）时时间让位隐藏，两颗按钮出现在原位置。按钮隐身期间也不再响应落在那片区域上的点击。
- 修复 **页面加载后第一次修改设置提示「设置存储不可用，改动不会被保存」**：设置表单现在会等宿主的命名空间登记完成后再绑定，登记晚到时也会在到达后立即绑定并读回取值，第一次修改即可保存。
- 修复 **新会话页把鼠标从预设模式快速移到工作文件夹时两个弹层同时打开并闪烁**：一行里的两个选择器（工作文件夹与预设模式）现在只会有一个打开，移到另一个触发器时先收起前一个，两个弹窗不再同时出现、也不再闪动；悬停离开收起的是悬停打开的那一个。

<h3 id="en-0.7.0">Bug Fixes</h3>

- Fix **the "load earlier" button at the top of the transcript being nearly invisible in light mode**: the light-mode solid hover fill is now a light gray, returning the button's contrast from 2.6:1 to 4.7:1 (dark unchanged); the workspace rename field on the same token family is no longer a dark block in light mode either.
- Fix **the "Top up" button in Settings → Account & balance showing its label in the same colour as its fill**: the shared link ink no longer overrides filled-button anchors, so the button keeps its own ink (3.1:1 light, 6.1:1 dark) and the neighbouring "View usage" returns to the outlined treatment.
- Fix **a filled primary button's hover fill jumping out of the accent family**: the hover now stays in the fill's family instead of jumping to a cold gray or near-white.
- Fix **the workspace picker card jumping below its trigger and back as it opens**: the card holds its correct position beside the trigger from the first frame it appears, with no visible jump.
- Fix **the preset staying on its old tier after switching to Yolo or Auto**: the skin drove these two tiers by synthetically clicking the hidden host access button and then locating the tier row by label in the opened menu; with the input bar locked or the trigger disabled that path pressed nothing, and the preset never changed after confirming. Every tier is now requested directly through the host's `/permission` command — the same write path the official dialog's confirmation ends in — so the switch takes effect immediately and the skin control and the host button agree on the new tier; a failed request retires the control through the per-feature failure isolation rule instead of passing silently.
- Fix **the permission popover stranding in the document across rebuilds**: when a host re-render replaced the control's container, the next rebuild appended a fresh popover while the previous one lost its only reference and stayed in the document forever (38 were counted on a long-lived page). Each install now sweeps every popover already in the document before appending its own, teardown sweeps the rest, and exactly one popover remains.
- Fix **the archived rows' time being pushed off the row's right edge by the action buttons**: the unarchive and delete buttons reserved their place while transparent, so the time stopped where their reserved space began and hover crowded all three onto one line. The rows now follow the host's own session rows' mechanism: at rest the buttons occupy nothing and the time right-aligns with the row; on hover (or while the row holds keyboard focus) the time steps aside and the two buttons take its place. The invisible buttons also stop answering clicks aimed at that area.
- Fix **the first settings change after a page load reporting "The settings store is unavailable, so changes will not be saved."**: the settings form now waits for the host's namespace registration before binding, binds as soon as a late registration arrives and reads the value back, so the first change saves.
- Fix **both popovers on the new-conversation page opening at once, and flickering, when the pointer moved quickly from the preset mode to the workspace folder**: only one of the row's two pickers (the workspace folder and the preset mode) is open at a time — moving to the other trigger folds the first, so the two cards no longer appear together or flicker, and a hover-leave folds the picker the hover opened.

**Full Changelog**: [v0.6.4...v0.7.0](https://github.com/Nwflower/dsh-claude-style/compare/v0.6.4...v0.7.0)

## [0.6.4] - 2026-09-24

[中文](#cn-0.6.4) | [English](#en-0.6.4)

<h3 id="cn-0.6.4">问题修复</h3>

- 修复 **刚启动、账号抽屉还没展开过时，页脚里的插件条目一直留在账户行旁边**：隐藏页脚条目与把条目镜像进抽屉原本挤在同一次调用里，而抽屉没打开时这次调用会提前返回，于是宿主重新渲染出来的插件图标继续画在侧栏底部、紧挨账户行，直到抽屉被展开过一次才被标记隐藏——这正是该现象只在首次启动后出现的原因。现在隐藏条目每次同步都跑，只有镜像需要抽屉容器。
- 修复 **底栏统计弹层偶尔只剩一段（只显示会话统计，或只显示 Token 用量）**：皮肤按标签文字区分宿主的两颗药丸，读取窗口又只有 300 毫秒，而宿主的两个面板按它自己的提交节奏挂载，晚到一步就丢掉那一段。现在按面板自身的标记判定类型，等待拉长到 800 毫秒、读失败时重试一次；药丸按钮每一步都从 DOM 重新取，窗口内还会再按一次——宿主重渲染换掉节点时，按旧节点等于没按；首次只读到一段时安排一次补读把缺的那段补上，卡片只增不减，已经打开的卡片不会被一次失败的读取改小。会话本身没有计时数据时宿主也不渲染计时面板，此时只有 Token 用量是正确的。
- 修复 **0.1.7-rc.2 里工作区会话行的状态圈消失**：新宿主把会话行的前导座位交给槽位出口渲染，座位里因此始终有一个 `div[data-slot]` 包裹层（`display: contents`），座位不再是空元素，画在 `:empty` 上的圆圈就不再出现。圆圈现在也挂在空的槽位出口上；座位里带运行状态点时仍由状态点自己绘制。
- 修复 **账户抽屉收起时它的行与图标停在账户行上方**：自建抽屉的内容要在收起状态下预先对账（镜像行只在收起时同步、展开时冻结），所以收起时面板连同齿轮图标一直挂在账户行正上方，此前只用透明度隐藏，内容仍留在绘制与命中树里。收起状态改用 `visibility` 隐藏（保留布局，关闭的淡出照常），展开时恢复可见。

<h3 id="en-0.6.4">Bug Fixes</h3>

- Fix **the footer's plugin entries staying beside the account row after a fresh start until the drawer has been opened once**: hiding the entries and mirroring them into the drawer shared one call that returned early while no drawer was up, so the plugin icons the host re-rendered stayed painted at the sidebar's bottom next to the account row until the drawer had been opened once — which is why the symptom only appeared after a fresh start. The hiding now runs on every sync; only the mirroring needs the drawer's container.
- Fix **the stats card occasionally showing only one section (session statistics alone, or Token usage alone)**: the skin told the host's two pills apart by their label text and read with a 300 ms window, while the host mounts its panels on its own commit — one late panel lost that section. The read now identifies each panel by its own marker, waits up to 800 ms and retries once; it re-resolves the pill from the DOM at every step and presses the live node again while the window lasts, because a press on a node the host has since re-rendered goes nowhere; and a card that did come up short schedules one late re-read that fills the missing section in, so the card only ever grows and a failed read never shrinks a card already on screen. A session with no timing data renders no timing panel in the host either, where Token usage alone is correct.
- Fix **the workspace session rows' status circle disappearing on 0.1.7-rc.2**: the newer host renders the row's leading seat through a slot outlet, so the seat always carries a `div[data-slot]` anchor (`display: contents`) and is never empty — the circle drawn on `:empty` stopped appearing. The circle now hangs on the empty outlet anchor as well; a seat carrying the running status dot still keeps the dot's own paint.
- Fix **the account drawer's rows and icons parked above the account row while it is closed**: the self-built drawer's content is reconciled while closed by design (the mirror sync only runs then and freezes while open), so the panel and its gear icon sit right above the account row; opacity alone left that content in the paint and hit-test tree. The closed state now hides it with `visibility` (layout kept, closing fade intact) and the open state restores it.

**Full Changelog**: [v0.6.1...v0.6.4](https://github.com/Nwflower/dsh-claude-style/compare/v0.6.1...v0.6.4)

## [0.6.1] - 2026-09-24

[中文](#cn-0.6.1) | [English](#en-0.6.1)

<h3 id="cn-0.6.1">新增功能</h3>

- **适配 DSH 0.1.7 内置自动审查（Auto review）**：分段控件与权限菜单增加审查模式，分段控件显示为 `Auto`、弹层与当前状态显示为 `Auto review`；原 `Auto`（完全权限）更名为 `Yolo`；选择审查模式或完全权限时均正常调起宿主风险确认对话框。审查档位跟随宿主的权限目录：只有宿主的 `permissionPresets` 目录携带 `auto`（内置自动审查已启用）时才显示，目录变化时随之增减；目录读不到时整个权限控件交还宿主的访问模式按钮。
- **已归档会话的删除按钮恢复可用**：宿主没有给浏览器半边提供删除会话的接口（工作区控制器只有归档与取消归档，agent 协议里的会话删除由宿主委托给持有存储的 ACP agent），插件此前调用第三方插件的路由，该插件不在环境里时点下去没有任何反应。现在由插件的宿主半边新增私有路由 `POST /dsh-claude-style/session-delete` 删除本机会话目录：只接受 POST 与同源请求，id 必须匹配宿主自身的会话 id 形状，正在打开的会话拒绝删除，目录解析后必须留在会话根目录内。

<h3 id="en-0.6.1">New Features</h3>

- **Support DSH 0.1.7 built-in Auto review**: add review mode to the permission segmented control and popover, displayed as `Auto` in segments and `Auto review` in the menu and current status; rename the former `Auto` (Full access) segment to `Yolo`; selecting either review mode or Full access drives the host's risk confirmation dialog. The review tier follows the host's permission catalog: it appears only while the host's `permissionPresets` catalog carries `auto` (the built-in auto review is enabled), and tracks catalog changes; when the catalog cannot be read, the whole permission control hands the host's access-mode button back.
- **The archived rows' delete button works again**: the host gives the browser half no way to delete a session (the workspace controller only archives and unarchives, and the agent protocol's session delete is the host delegating to an ACP agent that owns the storage), so the skin used to call a third-party plugin's route and did nothing when that plugin was absent. The plugin's host half now serves a private route, `POST /dsh-claude-style/session-delete`, which removes the local session directory: POST and same-origin requests only, the id must match the host's own session id shape, an open session is refused, and the resolved directory must stay inside the sessions root.

**Full Changelog**: [v0.6.0...v0.6.1](https://github.com/Nwflower/dsh-claude-style/compare/v0.6.0...v0.6.1)

## [0.6.0] - 2026-09-24

[中文](#cn-0.6.0) | [English](#en-0.6.0)

<h3 id="cn-0.6.0">问题修复</h3>

- 修复 **会话切换或卸载时因移动 React 插槽节点导致浏览器卡死与 DOM 异常**：停止将 `conversation.composer.dock` 容器内的会话统计药丸与上下文计量器通过 DOM 操作移入工具栏行，改为纯样式定位覆盖，保留节点在 React 虚拟树中的原生父子归属，消除 `Node.removeChild: The node to be removed is not a child of this node` 抛错与死循环卡死。
- 修复 **权限控件或会话统计出错时整个输入区样式被一并关闭**：出错只关掉权限控件本身，交还宿主的访问模式按钮、统计弹窗与统计行，输入区其余样式照常。

### 移除

- **移除 0.1.5 及更早宿主的适配**：偏好读写只走宿主官方的 `configForms` 表单，删掉插件自建的 `/prefs` 路由；最低宿主版本提高到 0.1.7。

### 其他变更

- **内部结构整理，行为无变化**：输入区的布局工作收进独立的 composer 特性，推理强度滑块的点阵与账号行各自拆成独立碎片，重复的宿主查询与残留节点清理合并成共用函数；调度器不再点名具体特性。
- **回归脚本共用一套无头浏览器启动**：smoke / probe / probe-timing / shoot 的浏览器配置目录改放 `.debug/`，调试端口由浏览器自选，`--cdp-port` 参数取消；probe 打开已有会话，跳过「新会话」。

<h3 id="en-0.6.0">Bug Fixes</h3>

- Fix **browser freezes and DOM exceptions during session switching or unmounting caused by moving React slot nodes**: stop moving the session stats pills and context meter out of the `conversation.composer.dock` container via DOM manipulation into the toolbar row; position them via CSS overlay instead, preserving native parent-child relationships in the React virtual tree and eliminating `Node.removeChild: The node to be removed is not a child of this node` crashes and freeze loops.
- Fix **the whole composer restyle switching off when the permission control or the session stats fail**: a failure now switches off only the permission control, which hands back the host's access-mode button, statistics dialogs and statistics row, while the rest of the composer keeps its styling.

### Removals

- **Remove the adaptation for hosts 0.1.5 and earlier**: preference reads and writes go only through the host's `configForms` form, dropping the plugin's own `/prefs` route; the minimum host version rises to 0.1.7.

### Chores

- **Internal restructuring, no behavior change**: the composer's layout work moves into a composer feature of its own, the reasoning-effort slider's dot matrix and the account rows move into fragments of their own, and repeated host lookups and leftover-node sweeps merge into shared helpers; the scheduler no longer names individual features.
- **One headless-browser launcher for the regression scripts**: smoke / probe / probe-timing / shoot keep the browser profile under `.debug/` and let the browser pick its own debugging port (the `--cdp-port` option is gone); probe opens an existing session and skips "New session".

**Full Changelog**: [v0.5.3...v0.6.0](https://github.com/Nwflower/dsh-claude-style/compare/v0.5.3...v0.6.0)

## [0.5.3] - 2026-09-23

[中文](#cn-0.5.3) | [English](#en-0.5.3)

<h3 id="cn-0.5.3">新增功能</h3>

- **账号区改为在宿主账号弹层里追加插件自己的行**：宿主自带的账号行就是入口（不再隐藏、不再由插件代为接管），弹层里依次是账号头部、其它插件的页脚条目与宿主自己的设置 / 意见反馈 / 退出登录；宿主没有账号区的环境（Web、0.1.5）先由插件自建账号区，再追加同样的行。宿主行的文案、顺序与点击行为保持原样。

### 体验优化

- **账号弹层外观统一**：卡片改用纯白背景（暗色保持原样）、宽度与侧栏一致，并去掉底部的横向滚动条；宿主账号菜单套用插件的行、图标、分隔线与悬停底色。
- **桌面 Windows 标题栏模式下对话 / 轨迹控件居中常显**：控件移到标题栏那一行（与新会话按钮同一行）并保持可见，点击不再被标题栏的拖拽区域吞掉。

### 问题修复

- 修复 **关闭插件或关掉「折叠侧栏设置区」后，桌面端自带的账号区没有还原**：交出页脚时摘掉插件打在宿主账号行上的标记，宿主行恢复自带的外观与点击。
- 修复 **Ctrl+, 无法打开设置**：该组合键重新由插件接管（宿主文案一直宣传它，宿主自身没有绑定）。
- 修复 **收起侧栏后新会话按钮在顶栏出现横贯的悬停底色**：收起状态交由宿主自己的图标控件承载，插件不再绘制悬停底色。

### 移除

- **移除设置行的 Ctrl+, 提示文案**：设置行保留，点击仍可打开设置。

<h3 id="en-0.5.3">New Features</h3>

- **The account area now appends the plugin's own rows into the host's account popover**: the host's own account row is the entry (it is no longer hidden or taken over), and the popover lists the account header, the other plugins' footer entries and the host's own Settings / Feedback / Sign out; on a host without an account area (Web, 0.1.5) the plugin builds one first and appends the same rows. The host's own rows keep their copy, order and click behavior.

### Improvements

- **One look for the account popover**: the card now uses a pure white background (dark keeps its own), spans the sidebar's width, and no longer draws a horizontal scrollbar at its foot; the host's account menu takes the plugin's row, icon, separator and hover treatment.
- **Centred, always-visible Conversation / Trajectory control in the desktop Windows titlebar**: the control moves onto the titlebar row (the same row as the New session button), stays visible, and its clicks are no longer swallowed by the titlebar's drag region.

### Bug Fixes

- Fix **the desktop's own account area not coming back after the plugin is disabled or "Collapse the sidebar settings area" is turned off**: handing the footer back drops the plugin's marker from the host's account row, which returns to its shipped look and click behavior.
- Fix **Ctrl+, no longer opening settings**: the key combination is handled by the plugin again (the host's copy advertises it, while the host itself binds nothing).
- Fix **a full-width hover plate on the New session button in the titlebar once the sidebar is collapsed**: the collapsed state is carried by the host's own icon control, and the plugin no longer paints a hover plate there.

### Removals

- **Remove the settings row's Ctrl+, hint text**: the row stays and a click still opens settings.

**Full Changelog**: [v0.5.2...v0.5.3](https://github.com/Nwflower/dsh-claude-style/compare/v0.5.2...v0.5.3)

## [0.5.2] - 2026-09-23

[中文](#cn-0.5.2) | [English](#en-0.5.2)

<h3 id="cn-0.5.2">新增功能</h3>

- **冒烟测试新增 `desktop` 桌面端页脚用例**：覆盖 0.1.7 桌面端页脚接管、抽屉镜像与账号资料首帧读取。

### 问题修复

- 修复 **切到插件页后档位触发器浮在页面上**：座位消失时隐藏触发器并归还预留边距。
- 修复 **窗口宽度变化时档位触发器慢半拍**：随 resize 与卡片尺寸变化和 CSS 同帧重定位。
- 修复 **按住滑块拖出卡片边界时卡片提前收起**：悬停关闭改看物理按住，松开按键才收起。
- 修复 **模型名、档位与后续控件间距忽大忽小**：统一到该行自身的 12px 节奏。
- 修复 **桌面端 Ctrl+, 弹出账号菜单而非设置**：快捷键与抽屉设置行共用入口，改为驱动宿主菜单。
- 修复 **账号抽屉的登出图标跑到左上角**：图标位自己作定位参照，按宿主尺寸绘制。
- 修复 **登录时账号资料请求被中止**：等服务就绪并订阅账号状态流，只在首帧、登录与登出读取。
- 修复 **桌面端从抽屉打不开设置**：设置行只认宿主设置按钮，桌面端让位给镜像的宿主设置行。
- 修复 **宿主账号行叠在皮肤账号行上**：选择器穿过插槽锚点整行隐藏。

### 其他变更

- **内部结构拆分，行为无变化**：超限碎片按 D13 约定拆开，调度器改由 `entry.js` 的 FEATURES 表统一安装与 pass 序。

<h3 id="en-0.5.2">New Features</h3>

- **New `desktop` footer smoke-test case**: covers 0.1.7 desktop footer takeover, drawer mirroring and the first account-profile read.

### Bug Fixes

- Fix **the effort trigger lingering on the plugins page**: hide it with its seat and give the reserved margin back.
- Fix **the effort trigger lagging on window resize**: reposition it in the same frame as CSS on resize and card-size changes.
- Fix **the card closing while the slider is still held**: hover-close now tracks the physical press and closes only on release.
- Fix **uneven spacing between model, effort and later controls**: unify them on the row's own 12px rhythm.
- Fix **Ctrl+, opening the account menu instead of settings on desktop**: the shortcut and drawer row now share one entry that drives the host menu.
- Fix **the sign-out icon landing in the drawer's top-left corner**: the icon slot is now the positioning context and draws at the host's size.
- Fix **the account profile request being aborted at sign-in**: wait for the service and subscribe to the account state stream, reading only on first frame, sign-in and sign-out.
- Fix **settings not opening from the drawer on desktop**: the settings row accepts only the host settings button and yields to the mirrored host row on desktop.
- Fix **the host account row stacking over the skin's row**: the selector now reaches through the slot anchor and hides the whole row.

### Chores

- **Internal restructuring, no behavior change**: oversized fragments were split per D13, and the scheduler now installs and orders passes from a FEATURES table in `entry.js`.

**Full Changelog**: [v0.5.1...v0.5.2](https://github.com/Nwflower/dsh-claude-style/compare/v0.5.1...v0.5.2)

## [0.5.1] - 2026-09-23

[中文](#cn-0.5.1) | [English](#en-0.5.1)

<h3 id="cn-0.5.1">新增功能</h3>

- **冒烟测试 `npm run smoke`**：零依赖检查宿主路由栅栏与浏览器半边的启动、空闲、teardown 不变量。
- **账号行显示真实头像与昵称**：桌面端登录后取官方资料，正圆头像与昵称以 60 秒轮询保持新鲜。
- **账号抽屉接管宿主账号菜单**：动态镜像宿主菜单条目并直连官方行为。

### 体验优化

- **档位名换档改成交换动画**：旧名向上模糊淡出、新名自下模糊淡入，拖动中也逐档滚动。
- **档位两端文案随语境本地化**：中文显示「更快 / 更强」，英文仍是 `Faster` / `Smarter`。
- **最高档的点阵动画改为纯哈希粒子**：无排序方向，羽流形状由逐块静态透明度承担。
- **座位里模型与档位两枚触发器靠拢**：名字与档位之间只剩 4px。
- **推理等级拆成独立触发器与弹层**：新碎片 `effort-picker.js` 只向 `ui.model` 要座位、档位与提交。
- **推条手感三处打磨**：圆角收小、按住放大 10%、档位点加阻尼。
- **推理推条换脸成 Claude Desktop 同款**：填充段 + 档位刻点 + 胶囊旋钮，最高档触发点阵动画。
- **输入框底部阴影改由座位自绘横条与渐变**：座位高度即横条高度，不再逐态重写卡片阴影。
- **模型介绍文案整体校订一轮**：修中英语义冲突与生硬措辞，统一单位与术语。

### 问题修复

- 修复 **0.1.7 设置页选项能显示但存不进去**：命名空间改从 `configForms` 已服务的名单挑选，失败回落自建路由。
- 修复 **斜杠命令 / @ 提及菜单打开时回车直接发送**：删除皮肤对回车的拦截，交给宿主处理。
- 修复 **关掉插件或热重载后皮肤又画了回来**：teardown 取消排队中的那一帧，之后的 `schedule()` 一律不生效。
- 修复 **一个特性出错导致整张皮半挂**：teardown 最先注册，每个特性单独安装与同步、失败即退役。
- 修复 **调度器空闲时仍每帧跑 pass**：账号行按需重建、排序只挪错位项，空闲 pass 降为 0。
- 修复 **非桌面端把「在应用中打开」菜单收进抽屉**：改按账号标签匹配触发器。
- 修复 **「设置」行变成账号名并弹出账号菜单**：只接受带 `aria-haspopup="dialog"` 的按钮。
- 修复 **图标型登出按钮没被排除**：同时读 `aria-label` / `title` / 类名，并跳过宿主账号区。
- 修复 **设置存储误报不可用**：读路径不再做可用性判定，仅写入失败才提示。
- 修复 **松开推条后旋钮弹回原档位再跳回**：等待回声期间不跟随滞后快照，超时或换梯后恢复。
- 修复 **松手瞬间档位名连跳两下**：footer 只换推条以外的节点，且先提交再只画一次。
- 修复 **拖动时滑块冲出终点线并与填充脱开**：位移改用独立 `translate` 属性，填充右端改为直角。
- 修复 **点击两档之间可能让档位选择器崩溃**：目录未 settle 期间不摘触发器也不关卡片。
- 修复 **点击滑槽其他位置时滑块瞬移**：把按下与拖动拆成两个状态，按下时仍有过渡动画。

### 安全

- **用户名、昵称、头像与插件条目不再拼进 HTML**：一律以文本写入，头像改用真正的 `<img>`。
- **设置与用户名路由不再对任何人敞开**：先过宿主请求栅栏，并限制内容类型、体积与数组长度。

<h3 id="en-0.5.1">New Features</h3>

- **Smoke test `npm run smoke`**: a dependency-free check of the host route fence and the browser half's boot, idle and teardown invariants.
- **The account row shows the real avatar and nickname**: on desktop sign-in it reads the official profile and keeps the round avatar and nickname fresh by polling every 60s.
- **The account drawer takes over the host account menu**: it mirrors the host menu's entries and drives the official actions directly.

### Improvements

- **Effort-name changes now swap**: the old name blurs upward while the new one blurs in from below, scrolling step by step while dragging.
- **Effort end labels are localized**: Chinese now shows localized labels, English stays `Faster` / `Smarter`.
- **The apex dot animation is now pure hashed particles**: no ordering or direction, with the plume shape carried by per-block static opacity.
- **The model and effort triggers in the seat move closer**: only 4px is left between the model name and the effort name.
- **Reasoning effort splits into its own trigger and popover**: the new `effort-picker.js` asks `ui.model` only for the seat, effort and commit.
- **Three slider feel tweaks**: smaller corners, a 10% scale-up while held, and damping around each step.
- **The effort slider is restyled to match Claude Desktop**: fill, step ticks and a capsule knob, with the apex step triggering the dot animation.
- **The composer's bottom shadow now comes from the seat's own bar and gradient**: the seat height is the bar height, no per-state card shadows.
- **The model descriptions got a full copy-editing pass**: fixing CN/EN conflicts and awkward wording, unifying units and terms.

### Bug Fixes

- Fix **settings showing but not saving on 0.1.7**: the namespace is now picked from the namespaces `configForms` serves, falling back to the plugin route.
- Fix **Enter sending half-typed text while the slash or @ menu is open**: the skin's Enter interception is removed and the host handles it.
- Fix **the skin repainting itself after disable or hot reload**: teardown cancels the queued frame and later `schedule()` calls no longer take effect.
- Fix **one failing feature leaving the whole skin half-mounted**: teardown registers first, and each feature installs and syncs alone, retiring on failure.
- Fix **the scheduler running a pass every frame while idle**: the account row rebuilds only on change and sorting moves only misplaced entries, so idle passes drop to 0.
- Fix **the "Open in app" menu being pulled into the drawer on non-desktop**: triggers are now matched by the account label.
- Fix **the settings row turning into the account name and opening the account menu**: it now accepts only buttons with `aria-haspopup="dialog"`.
- Fix **icon-only sign-out buttons not being excluded**: it now reads `aria-label` / `title` / class names and skips the host account area.
- Fix **settings storage falsely reporting unavailable**: the read path no longer judges availability, only a failed write warns.
- Fix **the knob snapping back to the old step after release**: it no longer follows the lagging snapshot while waiting for the echo, resuming on echo, ladder change or timeout.
- Fix **the effort name jumping twice on release**: the footer now replaces only non-slider nodes, and commit happens before a single paint.
- Fix **the knob overshooting the track end and detaching from the fill while dragging**: position now uses the standalone `translate` property and the fill's right end is square.
- Fix **clicking between two steps sometimes crashing the effort picker**: while the catalog has not settled it no longer removes the trigger or closes the card.
- Fix **the knob teleporting when clicking elsewhere on the track**: press and drag are split into two states, so a press still animates.

### Security

- **Usernames, nicknames, avatars and plugin entries are no longer spliced into HTML**: all are written as text and the avatar uses a real `<img>`.
- **The settings and username routes are no longer open to anyone**: they pass the host request fence and cap content type, body size and array length.

**Full Changelog**: [v0.5.0...v0.5.1](https://github.com/Nwflower/dsh-claude-style/compare/v0.5.0...v0.5.1)

## [0.5.0] - 2026-09-22

[中文](#cn-0.5.0) | [English](#en-0.5.0)

<h3 id="cn-0.5.0">新增功能</h3>

- **插件页有了自己的图标**：`package.json` 填陶烬橙星芒的相对路径，构建期复制到 `lib/`。
- **插件卡片有了本地化的标题与描述**：`locale/*.json` 提供 `meta.title` 与描述，`exports` 用通配避免降级。
- **侧栏「工作区」改成进行中 / 已归档分段控件**：驱动宿主筛选并从树里读回选中态，归档行挂删除按钮。

### 体验优化

- **推理等级改成一级弹层底部的推条**：无极滑动、松手对齐最近档位，键盘可用，二级弹层只剩「更多模型」。
- **`model-picker.js` 拆出两块回到停止线内**：推条与文案解析各成新碎片，二级档位状态一并删除。
- **推条的滑槽与旋钮几乎等高**：滑槽从 6px 细线改为 14px 圆角槽，对齐 Claude 真机比例。
- **弹层悬停时间统一**：停留 50ms 打开、离开 100ms 关闭，统计卡片仍 300ms 打开。
- **「更多模型」二级弹层收口**：底对齐、不重复供应商、没得列就整行去掉，不支持思考时不画推条。

### 问题修复

- 修复 **真圆被画成鹅卵石**：给六处真圆与滑槽补上 `corner-shape: round`。
- 修复 **全屏面板下顶栏标签与后台任务数浮在面板之上**：该行 `z-index` 从 100 降到 9。
- 修复 **热重载后模型选择器失去点击效果**：弹层节点重建判据改为「为空或已脱离文档」，并重置渲染签名。
- 修复 **热重链后宿主半边资产路由整代失联**：改为无条件经 `ctx.inject(['webServer'])` 注册路由。
- 修复 **推条拖动掉帧、不跟手**：拖动位移并入每帧一次 rAF，并对同值写入加护栏。
- 修复 **二级弹层悬停打开后不随指针移开收起**：一级弹层委托 `mouseover`，指针离开入口即收起。
- 修复 **切换档位后模型选择器一段时间不可用**：只在解析不出席位且无分组时才显示加载行。
- 修复 **composer 获焦时 `ui.heroMenu.close` 抛错**：调用前补存在性护栏。
- 修复 **0.1.7 上上下文标记被落在第二层**：新增 `mergeContextMeterIntoRow()` 归位到模型触发器右侧。
- 修复 **composer 底行三种控件字型不一**：统一为同一字体、13px、500 字重、20px 行高。
- 修复 **统计句盒子横跨半个行**：改用 `flex: 0 1 auto` 与自动外边距，盒子贴合文字。
- 修复 **0.1.7 上设置静默失效**：宿主半边导出 `Config`，设置按宿主世代分流到官方表单或旧注册制。
- 修复 **统计卡片内容缺块、关不掉、易误触发**：只认真实点击，悬停需停留 300ms，并按世代清扫遗留卡片。
- 修复 **软链安装下 schemastery 解析不到**：改按 harness 自己的解析基准取 schemastery。
- 修复 **0.1.7 上输入框的「＋」失去皮肤样式与位置**：标签列表补子串匹配，恢复 24px 与顺序。
- 修复 **侧栏两行形状不一致**：统一度量、静止透明 / hover 才铺底色，图标盒统一为 20px。
- 修复 **侧栏两行图标 hover 转 90°**：加 `transition: transform .25s`，指针离开自动转回。

### 移除

- **模型行的厂商字体整块移除**：字体资产、子集化脚本、令牌与 `@font-face` 一并删除。

<h3 id="en-0.5.0">New Features</h3>

- **The plugins page gets its own icon**: `package.json` points at the clay starburst's relative path, copied into `lib/` at build time.
- **The plugin card gets localized title and description**: `locale/*.json` supplies `meta.title` and description, exported via a wildcard to avoid a downgrade.
- **The sidebar "Workspaces" title becomes an Active / Archived segmented control**: it drives the host filter and reads selection back from the tree, with a delete button on archived rows.

### Improvements

- **Reasoning effort becomes a slider at the bottom of the first-level popover**: it slides freely and snaps on release, is keyboard-accessible, and the submenu holds only "More models".
- **`model-picker.js` splits into two fragments and returns under the stop line**: the slider and copy lookup become new fragments, and the submenu effort state is removed.
- **The slider track and knob are now nearly the same height**: the track goes from a 6px line to a 14px rounded groove, matching Claude's real proportions.
- **Popover hover timing is unified**: 50ms dwell to open and 100ms to close, while the stats card keeps its 300ms open dwell.
- **The "More models" submenu is tightened up**: bottom-aligned, no repeated providers, hidden when empty, and no slider when the model lacks reasoning.

### Bug Fixes

- Fix **circles rendering as pebbles**: six true circles and the slider track now declare `corner-shape: round`.
- Fix **the header preset label and background-task count floating above a fullscreen panel**: that row's `z-index` drops from 100 to 9.
- Fix **the model picker losing its click effect after hot reload**: popover nodes now rebuild when null or detached, and the render signature is reset.
- Fix **host-side asset routes losing a whole generation after a hot re-chain**: routes now always register through `ctx.inject(['webServer'])`.
- Fix **the effort slider dropping frames and lagging while dragging**: moves are batched into one rAF per frame and same-value writes are guarded.
- Fix **the submenu staying open after the pointer moves away**: the first-level popover delegates `mouseover` and closes it once the pointer leaves the entry.
- Fix **the model picker being unusable for a while after an effort change**: the loading row shows only when no seat and no groups can be resolved.
- Fix **`ui.heroMenu.close` throwing on every composer focus**: an existence guard now precedes the call.
- Fix **the context meter dropping to a second layer on 0.1.7**: a new `mergeContextMeterIntoRow()` returns it to the model trigger's right.
- Fix **the composer's bottom-row controls using different type**: they now share one font at 13px / 500 / 20px line height.
- Fix **the stats sentence box spanning half the row**: `flex: 0 1 auto` with auto margins now shrink-wraps it to the text.
- Fix **settings silently failing on 0.1.7**: the host half exports `Config` and splits settings by host generation between the official form and the old registry.
- Fix **the stats card missing content, refusing to close and misfiring**: it now accepts only trusted clicks, needs a 300ms dwell, and sweeps stale cards per generation.
- Fix **schemastery not resolving under a symlinked install**: it is now resolved from the harness's own resolution base.
- Fix **the composer "+" losing its skin styling and position on 0.1.7**: substring label matches restore its 24px size and order.
- Fix **the sidebar's two rows not matching**: shared metrics, transparent until hover, and a uniform 20px icon box.
- Fix **the sidebar rows' icons rotating 90° on hover**: add `transition: transform .25s` so they turn back on pointer leave.

### Removals

- **The model row's vendor font is removed entirely**: the font asset, subsetting script, token and `@font-face` are all deleted.

**Full Changelog**: [v0.4.0...v0.5.0](https://github.com/Nwflower/dsh-claude-style/compare/v0.4.0...v0.5.0)

## [0.4.0] - 2026-09-21

[中文](#cn-0.4.0) | [English](#en-0.4.0)

<h3 id="cn-0.4.0">新增功能</h3>

- **快捷供应商多选弹层**：设置页新增多选弹层，勾选者的模型直接列进一级弹层，按供应商分组、组名领在分隔线前。
- **当前模型行**：供应商改由自己的分隔线承载，席位不在已列供应商时在列表末尾补一行；二级弹层高度随内容自适应。
- **重做模型选择器开关**：设置页新增开关（默认开），关掉后交回宿主自己的模型菜单，只影响弹层。
- **首页目录与预设弹层**：改用皮肤弹层样式，触发器展开时给卡片打标记并重绘。
- **Popovers 规范**：`docs/STYLE.md` 新增「多选一弹层」的卡片、行、分隔与页脚度量表及类名匹配纪律。
- **hero 弹层位置**：改从触发器旁边弹出、底边对齐并向上生长，视口不够时翻到左侧，滚动缩放时重算。
- **首页弹层纳入自动弹出**：悬停触发器即展开、移开即收起，与对话框重绘门控一致。
- **快捷供应商清单**：官方服务始终不列入，残留的已下线供应商带「已移除」标记，取消勾选即从存储清除。
- **焦点收起弹层**：`focusin` 落进对话卡片时关闭权限、模型、会话统计、账户抽屉、hero 菜单与快捷供应商弹层。

### 体验优化

- **一级弹层滚动区**：只滚动模型列表，分隔线与「推理程度 / 更多模型」钉在卡片底部，高度随内容自适应。
- **自动弹出三档**：关闭 / 仅账号区 / 全部（默认全部），旧布尔值读取时归一。
- **弹层度量统一**：账户抽屉、会话统计与权限弹层对齐规范的行高、圆角、间距、最小宽度与 `z-index`。

### 问题修复

- 修复 **热重载重复渲染**：账户区与模型席位改为 DOM 幂等，更新前清扫上一代同名节点。

### 其他变更

- **清理开发期痕迹**：删除未调用的 `applyBrand`、未用参数与过时注释，行为无变化。

<h3 id="en-0.4.0">New Features</h3>

- **Quick-provider multi-select popover**: pick providers in settings and their models list directly in the first-level popover, grouped with the provider name leading each divider.
- **The current-model row**: the provider now rides its own divider; a seat outside the listed providers gets one appended at the end.
- **Redo model picker toggle**: a new setting (on by default) hands the model seat and both popovers back to the host's own menu.
- **Hero directory and preset popovers**: restyled to the skin's popover language via a marker set when the trigger reports `aria-expanded="true"`.
- **Popover spec**: `docs/STYLE.md` gained card, row, divider and footer metrics plus the class-name matching rules.
- **Hero popover placement**: it now opens beside the trigger, growing upward, flipping left when space is short, and repositions on scroll or zoom.
- **Hero popovers follow auto-popover**: hovering the trigger opens them and leaving closes them, gated like the composer restyle.
- **Quick-provider list**: official services never appear, and a removed provider stays flagged until unchecked and cleared from storage.
- **Focus closes popovers**: a `focusin` inside the chat card dismisses the permission, model, stats, account, hero-menu and quick-provider popovers.

### Improvements

- **First-level popover scroll region**: only the model list scrolls while the divider, reasoning effort and "More models" stay pinned at the card bottom.
- **Auto-popover has three levels**: Off / Account area only / All (default All), with old booleans normalized on read.
- **Popover metrics unified**: the account drawer, session stats and permission popover now share the spec's row height, radius, spacing, min width and `z-index`.

### Bug Fixes

- Fix **Duplicate renders on HMR**: the account area and model seat are now DOM-idempotent, sweeping the previous generation's nodes before updating.

### Chores

- **Dev leftovers removed**: deleted the unused `applyBrand`, an unused parameter and stale comments, with no behavior change.

**Full Changelog**: [v0.3.2...v0.4.0](https://github.com/Nwflower/dsh-claude-style/compare/v0.3.2...v0.4.0)

## [0.3.2] - 2026-09-21

[中文](#cn-0.3.2) | [English](#en-0.3.2)

<h3 id="cn-0.3.2">新增功能</h3>

- **会话统计跟随自动弹出**：与账户、模型、权限三个弹层对齐，关闭开关后悬停不再弹出。
- **更多模型弹层收紧**：列间距、分组间距与分组标题上边距各收到 4px。
- **锁定标不再回退**：没有规则命中的模型不画标，未用到的品牌一并删除。
- **新增 `longcat` 品牌**：补 `mimo` → `xiaomimimo` 规则，OpenCode 的 MiMo 与 LongCat 现在命中。
- **OpenAI 标不可见**：vendoring 清掉本地资产里带 `fill` 的内联 style，再补 `currentColor`。
- **更多模型排序**：行内边距收到 3px，同供应商模型按 id 升序排列。
- **锁定标多处修正**：Meta 漂移、混元高光与 `hy-mt2` 解析，新增 Gemma / Nano Banana 两个品牌。
- **厂商锁定标合成**：按 Lobe 的合成比例生成 `combine/<厂商>.svg`，图标与字标合为一件图形，自建字标与供应商图标删除。
- **Claude 行锁定标**：改画 Claude 自己的字标，`anthropic` 仍作 `anthropic` 路由兜底。
- **新增家族规则**：`gemma` 与 `nano-?banana` 各补一条官网口径文案，不再掉到档位规则。
- **Fable 与 Mythos 规则**：两条各用官网定位句，不再掉到兜底文案。

### 问题修复

- 修复 **过时模型说法**：修正 DeepSeek 下线版本、Grok 4.5、文心 5.0 与 `kimi-for-coding` 的过时文案。
- 修复 **插件加载即崩**：清掉对已删除 `WORDMARK_SVGS` 的加载期引用，并补一条加载校验脚本。
- 修复 **锁定标占位不显示**：把根的绘制属性重新包一层 `<g>`，并去掉会变提示的 `<title>`。
- 修复 **当前模型行丢供应商**：格式定为 `模型 (供应商)`，描述只在第一级显示，一级那行补上描述。
- 修复 **冷启动后选择器空等**：会话一解析出来就预热模型目录，把等待挪进启动过程。
- 修复 **Grok 行显示 xAI 标识**：`brands.models` 改指 Grok 自己的标记，provider 分组标题仍用 xAI。
- 修复 **当前模型行显示 id 串**：改用与其他行同一套外显名与厂商标记逻辑，无名字才退回 id。

### 其他变更

- **抽出 `model-brand.js`**：把品牌判定整块搬进新碎片，`model-picker.js` 回落到停止线以内。
- **字标扫描改预置数组**：加载时构建词表，并新增 `scripts/probe-timing.cjs` 分项计时。
- **模型简介按官网重写**：19 条精确条目与 54 条家族规则逐条对齐官网，家族文案不写最高级与版本数字。
- **文案改按线映射**：DeepSeek 删除旧版精确条目，改为 Flash / Pro / 其余三条线级文案。
- **去掉档位前缀**：不再用「旗舰档：」等自家定位话术，改用厂商自己的定位句。
- **描述不再重复模型名**：共 50 条去掉「X 系列：」式开头。
- **规格条目补用途**：10 条只剩参数与价格的条目按「面向…的…」形状并回官网用途句。

<h3 id="en-0.3.2">New Features</h3>

- **Session stats follow auto-popover**: it now matches the account, model and permission popovers, so with the setting off hover no longer opens it.
- **More-models popover tightened**: column, group and group-title spacing all reduced to 4px.
- **No lockup fallback**: a model with no matching rule draws no mark, and unused brands are dropped.
- **New `longcat` brand**: plus a `mimo` → `xiaomimimo` rule, so OpenCode's MiMo and LongCat now resolve.
- **Invisible OpenAI mark**: vendoring now strips inline `fill` styles from local assets and adds `currentColor`.
- **More-models ordering**: row padding reduced to 3px and each provider's models sort by id.
- **Multiple lockup fixes**: Meta drift, Hunyuan highlight and `hy-mt2` lookup, plus the Gemma and Nano Banana brands.
- **Combined vendor lockups**: `combine/<vendor>.svg` is generated from Lobe's own ratios, merging icon and wordmark; hand-built wordmarks and provider icons are gone.
- **Claude row lockup**: it now draws Claude's own wordmark, with `anthropic` kept as the fallback for the `anthropic` route.
- **New family rules**: `gemma` and `nano-?banana` each get an official one-liner instead of falling through to tier rules.
- **Fable and Mythos rules**: each uses its official positioning line instead of the generic fallback.

### Bug Fixes

- Fix **Stale model claims corrected**: retired DeepSeek versions move to line mapping, and Grok 4.5, ERNIE 5.0 and `kimi-for-coding` follow official naming.
- Fix **the plugin crashing on load**: the load-time reference to the removed `WORDMARK_SVGS` is gone, with a load-check script added to catch it.
- Fix **lockups reserving space but not showing**: root paint attributes are re-wrapped in a `<g>` and the tooltip-making `<title>` is dropped.
- Fix **the current-model row losing its provider**: the label is now `model (provider)`, descriptions show only at the first level, and that row gained one.
- Fix **the model picker waiting seconds after a cold start**: the catalog is warmed as soon as a session resolves, folding the wait into startup.
- Fix **the Grok row showing xAI's mark**: `brands.models` now points at Grok's own, while provider group headers still use xAI.
- Fix **the current-model row showing an id string**: it now uses the same display-name and brand logic as other rows, falling back to the id only when unnamed.

### Chores

- **`model-brand.js` extracted**: the whole brand-resolution block moved into a new fragment, bringing `model-picker.js` back under the size limit.
- **Wordmark scan prebuilt into an array**: the word list is built at load time, plus a new `scripts/probe-timing.cjs` for per-stage timings.
- **Model blurbs rewritten from vendor sites**: 19 exact entries and 54 family rules now match official pages, with no superlatives or version numbers in family copy.
- **Copy mapped by line, not version**: DeepSeek's old exact entries are gone, replaced by Flash, Pro and a shared line-level blurb.
- **Tier prefixes removed**: our own "flagship tier:" framing is gone in favour of vendor positioning.
- **Blurbs no longer repeat the model name**: 50 entries dropped the "X series:" prefix.
- **Spec-only blurbs gained a purpose**: 10 entries that had only specs now lead with the official use case.

**Full Changelog**: [v0.3.1...v0.3.2](https://github.com/Nwflower/dsh-claude-style/compare/v0.3.1...v0.3.2)

## [0.3.1] - 2026-09-21

[中文](#cn-0.3.1) | [English](#en-0.3.1)

<h3 id="cn-0.3.1">新增功能</h3>

- **声明最低运行时**：`package.json` 新增最低宿主版本，仓库根新增 `screenshots.json` 供商店取图。
- **Gemini 行改用 Google Sans Flex**：子集随包分发，家族名改为 `Google Sans Flex Picker`，按 `data-brand` 挂载。

### 问题修复

- 修复 **贴图时 hint 发黑跑位**：给 hero 兜底节点补上宿主的定位与墨色，hint 回到输入框首行。
- 修复 **聚焦底纹盖住输入框**：底纹从 rail 移到卡片，与 hero 卡片同一位置。
- 修复 **封号彩蛋语言选不动**：`banLocale` 走浏览器本地兜底，宿主不认该键时先本地保存渲染，待其重启后补写。

### 其他变更

- **亮暗切换先色后样**：翻转瞬间抑制过渡并取消进行中的绘制动画，约 0.3s 后恢复。
- **composer 形态改属性**：由 JS 写 `data-composer-variant`，CSS 直接读，降低流式重算开销。
- **设置页 Tab 图标**：用 CSS 蒙版把通用齿轮换成 Claude 星芒，亮暗各自取色。
- **亮色背景层级调优**：一级 `#FCFCFB`、二级 `#FBFBF9`、三级 `#F9F9F6`，设置面板对齐画布。
- **去 AI 化与精简**：清理临时调试日志与历史规划文档，移除残留编号与重复注释，精简 README。

<h3 id="en-0.3.1">New Features</h3>

- **Minimum runtime declared**: `package.json` gained `engines.dsh: ">=0.1.5-rc.2"`, and a root `screenshots.json` feeds store screenshots.
- **Gemini row set in Google Sans Flex**: a subset ships with the package under the family name `Google Sans Flex Picker`, mounted by `data-brand`.

### Bug Fixes

- Fix **the hint turning dark and escaping the box on image-only drafts**: the hero fallback node gets the host's positioning and ink, returning the hint to the first line.
- Fix **the focus underlay painting over the inline input**: the underlay moves from the rail to the card, matching the hero card.
- Fix **the ban-page language refusing to change**: `banLocale` falls back to `localStorage`, renders locally, and is written back once the host half restarts.

### Chores

- **Theme-flip colour-before-style**: transitions are suppressed during the flip and running paint animations cancelled, restoring after about 0.3s.
- **Composer variant via attribute**: JS writes `data-composer-variant` for CSS to read, cutting restyle cost during streaming.
- **Settings tab icon**: a CSS mask swaps the generic gear for Claude's starburst, coloured per theme.
- **Light-theme layer tones tuned**: layers are `#FCFCFB`, `#FBFBF9` and `#F9F9F6`, with the settings panel matching the canvas.
- **AI-tells and cruft removed**: temporary debug logs and old planning docs are gone, along with stale numbering and duplicated comments.

**Full Changelog**: [v0.3.0...v0.3.1](https://github.com/Nwflower/dsh-claude-style/compare/v0.3.0...v0.3.1)

## [0.3.0] - 2026-09-20

[中文](#cn-0.3.0) | [English](#en-0.3.0)

<h3 id="cn-0.3.0">新增功能</h3>

- **Claude 封号页彩蛋**：账户弹层顶部用户名横条可点开完整复刻页，全为明确退出动作，品牌偏好同样生效。
- **封号彩蛋语言设置**：可选中/英（默认英文），改动立刻重建页面并切换时间戳制式。

### 问题修复

- 修复 **回退引用块材质**：引用块恢复中性灰文字、灰底灰条，块内链接与代码各自保持材质。
- 修复 **文件引用颜色不一致**：文件引用改用链接色与同款下划线，代码片本身不动。
- 修复 **Markdown 表格左侧空隙**：删掉全局表格覆盖，首末单元格恢复内边距，窄表不再被拉满。

### 其他变更

- **封号页锁改手绘**：按参考图墨迹逐锚点描摹成三条贝塞尔路径，映射到 24 单位格。
- **修掉 `banSvg` 重复属性**：粗细改为形参只发一条属性，覆盖不再静默失效。
- **点击展开弹层不再即关**：改由点击别处或移出整个底栏关闭，悬停展开保持原逻辑。
- **账号横线移出 hover 区**：横线改为账号行的兄弟节点，hover 底板只覆盖账号名那行。
- **封号页排版**：内容列改为水平居中，页头整体下移 30px。
- **行内代码片收紧**：自带 `line-height: 1.2`，行盒收到 18px，上下不再虚胖。

<h3 id="en-0.3.0">New Features</h3>

- **Claude account-hold page easter egg**: the username strip opens a full replica with explicit exits, honouring the brand preference.
- **Ban-page language setting**: Chinese or English (default English), rebuilding the open page and timestamp format on change.

### Bug Fixes

- Fix **the blockquote material rolled back**: quotes return to neutral grey text, background and bar, leaving inner links and code untouched.
- Fix **file mentions not matching hyperlinks**: they take the link colour and underline, while the code chip stays unchanged.
- Fix **the left gap in Markdown tables**: global table overrides are gone, first and last cells regain padding, and narrow tables are no longer stretched.

### Chores

- **Ban-page lock redrawn by hand**: three Bézier paths traced from the reference ink and mapped to the 24-unit grid.
- **`banSvg` duplicate attribute fixed**: stroke width is now a parameter emitted once, so the override no longer silently fails.
- **Click-opened account popover no longer closes on mouse-out**: it closes on an outside click or leaving the footer, while hover keeps its old delay.
- **Account divider out of the hover area**: it is now a sibling of the account row, so the hover surface covers only the name.
- **Ban-page layout**: the content column is centred and the header drops 30px.
- **Inline code chips tightened**: they carry `line-height: 1.2` and an 18px line box, removing the extra padding.

**Full Changelog**: [v0.2.7...v0.3.0](https://github.com/Nwflower/dsh-claude-style/compare/v0.2.7...v0.3.0)

## [0.2.7] - 2026-09-20

[中文](#cn-0.2.7) | [English](#en-0.2.7)

<h3 id="cn-0.2.7">新增功能</h3>

- **模型选择器厂商标识**：模型行显示所属厂商标识，`brands.providers` / `brands.models` 驱动，构建期校验。

### 其他变更

- **引用块改用链接材质**：引用共用链接蓝文字与下划线，底纹与竖条取淡色。
- **文本选区实色两态**：聚焦蓝底白字、失焦灰底黑字，由 `selection.js` 镜像焦点态。
- **接入 cc-switch 图标**：引入 107 个供应商图标并新增宿主路由，选择器优先用它们、缺失回退 Lobe。
- **供应商标签推挤 sticky**：滚动时上一个标签被下一个 section 推上去。
- **附件轨接缝优化**：移除 focus 时 1px 内圈阴影，消除图片区与文字区分界。
- **更多模型子弹层**：提高弹层高度，供应商标签改为 sticky 顶部条。
- **provider 标签强化**：分组标题改为黑底白字圆角矩形，暗色反相。
- **模型触发器 hover 去重**：删掉 trailing 下的额外 hover 规则，只留一层背景。
- **标题中文回退黑体**：SERIF 栈移除 CJK 衬线回退，西文仍用 Anthropic Serif。
- **统计弹层合并**：两个宿主弹层合并为一个自定义弹层，上下两区块各 2×2 网格。
- **统计区交互**：弹层改为 hover 打开，控件仅在指针位于对话窗口内时显示，统计行居中。
- **输入区统计合并**：会话与 token 统计并成一条居中紧凑文本，隐藏宿主图标与标签。
- **补充当前非官方模型**：非官方选中模型在官方与更多模型之间单独一行显示，触发器去掉箭头。

<h3 id="en-0.2.7">New Features</h3>

- **Vendor marks in the model picker**: rows show the model's vendor via `brands.providers` / `brands.models`, validated at build time.

### Chores

- **Blockquotes use the link material**: quotes share the link blue, underline, tinted background and bar.
- **Text selection in two solid states**: blue-on-white focused, grey-on-black blurred, mirrored by `selection.js`.
- **cc-switch provider icons wired in**: 107 icons plus a host route, preferred over Lobe with a fallback.
- **Provider labels as push-sticky**: each scrolling section pushes the previous label up.
- **Attachment rail seam fixed**: the 1px focus inset shadow is gone, removing the divider between image and text.
- **More-models submenu**: taller popover with provider labels as sticky headers.
- **Provider labels strengthened**: group headers become rounded black-on-white blocks, inverted in dark mode.
- **Model trigger hover de-duplicated**: the extra trailing hover rule is gone, leaving one background.
- **Heading CJK fallback to sans**: the serif stack drops its CJK fallback while Latin keeps Anthropic Serif.
- **Stats popovers merged**: the host's two become one custom popover with two 2×2 blocks.
- **Stats interaction**: the popover opens on hover, controls show only inside the chat window, and the row centres.
- **Composer stats merged**: session and token stats become one centred compact line, hiding host icons and labels.
- **Current non-official model added**: it gets its own row between official and more models, and the trigger loses its arrow.

**Full Changelog**: [v0.2.6...v0.2.7](https://github.com/Nwflower/dsh-claude-style/compare/v0.2.6...v0.2.7)

## [0.2.6] - 2026-09-20

[中文](#cn-0.2.6) | [English](#en-0.2.6)

<h3 id="cn-0.2.6">新增功能</h3>

- **JetBrains Mono 免安装**：宿主半边新增字体路由，以 `@font-face` 注册为 webfont，缺失时回退系统字体栈。
- **Anthropic 字体可选免安装**：两个字体文件放进插件 `fonts/` 即以 webfont 提供，缺失时 404 回退。

### 其他变更

- **代码块与表格对齐 Claude**：行内代码与代码块字号 -1px，边框移到外层容器，表格字号与圆角上调。
- **自定义用户名**：设置页新增输入框，输入停顿后自动保存，宿主未重载时本地兜底。
- **链接与行内代码对齐 Claude**：链接下划线静止 60%、hover 100% 并加粗到 1.5px，代码改用 JetBrains Mono。
- **代码字体换 JetBrains Mono**：改用 JetBrains Mono Variable（含 Italic），随插件分发并保留 SIL OFL。
- **权限弹层 hover 打开**：悬停分段按钮即打开、移入取消关闭、移出延迟关闭，`autoPopover` 关闭时仍可点击。

<h3 id="en-0.2.6">New Features</h3>

- **JetBrains Mono without installing**: a host `/dsh-claude-style/fonts/*` route plus `@font-face`, falling back to the system stack when absent.
- **Optional Anthropic fonts without installing**: dropping the two files into the plugin's `fonts/` serves them as webfonts, with a 404 fallback.

### Chores

- **Code blocks and tables aligned to Claude**: code shrinks 1px, borders move to the outer container, and tables gain a size and radius.
- **Custom username**: a settings field autosaves after a pause, with a local fallback until the host half reloads.
- **Links and inline code aligned to Claude**: link underlines go from 60% to 100% on hover and thicken to 1.5px, and code moves to JetBrains Mono.
- **Code font switched to JetBrains Mono**: the variable font with italics ships with the plugin under SIL OFL.
- **Permission popover opens on hover**: hovering opens it, moving in cancels closing and leaving delays it; clicking still works with `autoPopover` off.

**Full Changelog**: [v0.2.5...v0.2.6](https://github.com/Nwflower/dsh-claude-style/compare/v0.2.5...v0.2.6)

## [0.2.5] - 2026-09-20

[中文](#cn-0.2.5) | [English](#en-0.2.5)

<h3 id="cn-0.2.5">新增功能</h3>

- **模型文案改为运行时读取的数据文件**：文案表迁出 bundle，宿主按请求读取、浏览器半边按需缓存。
- **补充新模型线文案**：为榜单上未收录的模型线补写家族规则，未收录的仍回退目录文本。

### 体验优化

- **模型文案跟随全局语言、单行显示**：按 shell locale 取语言，每行只渲染一条，切换语言即时重绘。

### 问题修复

- 修复 **模型文案的两处误判**：锚定激活参数与稠密规则，并补 `north`、`gpt-oss` 规则。
- 修复 **塌缩态底栏插件控件压住 Claude 标**：塌缩时隐藏设置区内的按钮与触发器行。
- 修复 **塌缩态账户弹层被侧栏容器裁掉**：弹层改 `position: fixed`，坐标由脚本解析。
- 修复 **设置页文字整页消失**：折叠拆开，设置区不再继承零字号，文本恢复自然行高。

### 其他变更

- **源码按特性级分片重构**：`overrides`、`context` 与 CSS 拆成独立文件，调度器改走 `ui` 句柄。

<h3 id="en-0.2.5">New Features</h3>

- **Model copy is now a runtime data file**: the table left the bundle, is served by the host on request and cached on demand.
- **Copy for newly added model lines**: family rules added for the leaderboard's missing lines; unknown lines fall back to catalog text.

### Improvements

- **Model copy follows the global language, one line per row**: the shell locale picks the language and a switch redraws instantly.

### Bug Fixes

- Fix **two model-copy misreads**: anchor the active-parameter and dense rules, and add `north` / `gpt-oss` rules.
- Fix **a collapsed-sidebar plugin control covering the Claude mark**: hide the settings-area buttons and trigger row while collapsed.
- Fix **the collapsed-sidebar account popover being clipped by the sidebar**: it is now `position: fixed` with script-resolved coordinates.
- Fix **the whole settings page's text disappearing**: the collapse is split so the settings area no longer inherits zero font size.

### Chores

- **Source split into per-feature files**: `overrides`, `context` and CSS became separate files and the scheduler now uses the `ui` handle.

**Full Changelog**: [v0.2.4...v0.2.5](https://github.com/Nwflower/dsh-claude-style/compare/v0.2.4...v0.2.5)

## [0.2.4] - 2026-09-19

[中文](#cn-0.2.4) | [English](#en-0.2.4)

<h3 id="cn-0.2.4">体验优化</h3>

- **深色输入框焦点由「加深」改为「提亮」**：焦点描边与晕边改用亮象牙，聚焦时明显亮起。
- **权限弹层列表间距加宽**：行间距由 2px 加宽到 6px，预设说明不再糊成整块。
- **会话统计并入输入框工具栏同一行**：两组 pill 移入工具栏、居中排列，输入区由三行压为两行。
- **统计 pill 改为悬停出现**：平时隐藏但保留占位，指针移入对话窗口时淡入。
- **消除附件轨与输入框之间的分界线**：以负外边距闭合间隙，卡片总高不变。
- **非对话页隐藏整个底部输入区**：仅对话页签激活时显示，宿主底部留白随之归零。
- **模型选择控件按 Claude 效果重构**：触发器只留模型名，弹层一级直列官方模型、二级旁侧展开，悬停即开。

### 问题修复

- 修复 **权限切换在 dsh 0.2+ 上完全失效**：当前会话改从 `uiSession` 主视图读取，兼容裸值投影。
- 修复 **亮色用户消息气泡由蓝改灰**：气泡底色改用皮肤的悬停灰，深色保持不变。
- 修复 **模型选择弹层永远停在「正在加载模型…」**：改走 `modelDir.store` 读写快照，并补上 rejection 处理。
- 修复 **深色强调色回到陶烬橙**：深色盘限定到 `[data-ds-dark-theme]`，不再被宿主蓝色盖掉。

<h3 id="en-0.2.4">Improvements</h3>

- **Dark-mode input focus now brightens instead of deepening**: the focus outline and halo use bright ivory and light up clearly.
- **Wider rows in the permissions popover**: row spacing grew from 2px to 6px so the preset descriptions no longer blur together.
- **Session stats merged into the composer toolbar row**: both pills moved into the toolbar, centered, cutting the composer to two rows.
- **Stats pills appear on hover**: hidden by default with their space reserved, they fade in when the pointer enters the conversation.
- **The seam between the attachment rail and the input is gone**: a negative margin closes the gap without changing the card height.
- **Composer hidden off the conversation page**: it shows only on the active conversation tab, and the host's reserved bottom space goes.
- **Model picker matches Claude**: the trigger keeps the model name, the first level lists official models and the second opens beside it.

### Bug Fixes

- Fix **permission switching broken on dsh 0.2+**: read the current session from the `uiSession` binding, tolerating bare-value projections.
- Fix **the light-mode user bubble being blue**: its fill now uses the skin's hover grey; dark mode is unchanged.
- Fix **the model popover stuck on "Loading models…"**: state now goes through `modelDir.store`, with rejection handling added.
- Fix **the dark accent returning to clay orange**: scope the dark palette to `[data-ds-dark-theme]` so the host's blue no longer wins.

**Full Changelog**: [v0.2.3...v0.2.4](https://github.com/Nwflower/dsh-claude-style/compare/v0.2.3...v0.2.4)

## [0.2.3] - 2026-09-19

[中文](#cn-0.2.3) | [English](#en-0.2.3)

<h3 id="cn-0.2.3">问题修复</h3>

- 修复 **账户抽屉弹层刷新时 hover / 点击失效**：弹层打开期间镜像内容保持静止，点击目标在点击瞬间解析。

<h3 id="en-0.2.3">Bug Fixes</h3>

- Fix **account drawer popover losing hover / click**: mirrored content stays still while open and click targets resolve on click.

**Full Changelog**: [v0.2.2...v0.2.3](https://github.com/Nwflower/dsh-claude-style/compare/v0.2.2...v0.2.3)

## [0.2.2] - 2026-09-19

[中文](#cn-0.2.2) | [English](#en-0.2.2)

<h3 id="cn-0.2.2">新增功能</h3>

- **对话内输入框重设计**：压缩为单行卡片、随内容增高，权限、附件与模型选择合并到下方同一行。
- **输入框焦点样式**：聚焦时描边转为中性色细线，外扩 1px 同色晕边并加深投影。
- **分时段首页欢迎语**：欢迎语随本地时间自动轮换，跨过整点时每 60 秒刷新。
- **模型思考状态重塑**：收录 Claude Code 的 185 种思考动词，扫光改为陶土橙与蜜桃暖色。
- **工作区运行中状态重塑**：侧栏加载动画改为 Windows 11 Fluent 风格的圆形圆弧旋转。
- **可切换品牌标识**：设置页新增 Claude Style 分区，在 Claude 与 Anthropic 两套标识间切换并本地保存。

### 问题修复

- 修复 **对话内输入框的多处布局问题**：吸附底部、随内容增高，附件区不再出现双层边框。
- 修复 **上下文用量弹层被误压缩**：弹层不再被挤扁，排版恢复正常。
- 修复 **账户抽屉多项问题**：非按钮控件与富控件条目正常收纳，图标、顺序与点击位置对齐。
- 修复 **`dsh-agy-link` 的 run_code 工具卡片排版异常**：卡片头部与代码预览恢复正常。

### 其他变更

- **源码拆分与构建化**：`lib/client.js` 改为构建产物，源码拆到 `src/`，新增无头回归探针。
- **Anthropic 字体入仓库**：`fonts/` 提供三个字体文件，随 Git 分发但不随 npm 包分发。

<h3 id="en-0.2.2">New Features</h3>

- **In-conversation composer redesigned**: a single-line card that grows with content, permissions, attachments and the model picker below.
- **Composer focus styling**: on focus the outline becomes a neutral hairline with a 1px same-color halo and a deeper shadow.
- **Time-of-day home greetings**: the greeting rotates with local time and refreshes every 60 seconds across an hour boundary.
- **Thinking status reshaped**: 185 Claude Code thinking verbs are included and the sweep turns clay-orange and peach.
- **Running-session status reshaped**: the sidebar loading animation became a Windows 11 Fluent-style circular arc spinner.
- **Switchable brand marks**: a Claude Style section switches between the Claude and Anthropic marks and saves the choice locally.

### Bug Fixes

- Fix **several composer layout issues**: it sticks to the bottom, grows with content, and the attachment area loses its double border.
- Fix **the context-usage popover being wrongly compressed**: it is no longer squeezed and lays out correctly again.
- Fix **several account drawer issues**: non-button and rich controls are collected properly, and icons, order and click targets line up.
- Fix **broken `dsh-agy-link` run_code tool card layout**: the card header and code preview render correctly again.

### Chores

- **Source split and a build step**: `lib/client.js` became a build artifact, source moved to `src/`, and a headless probe was added.
- **Anthropic fonts added to the repo**: `fonts/` ships three font files with Git but not with the npm package.

**Full Changelog**: [v0.2.1...v0.2.2](https://github.com/Nwflower/dsh-claude-style/compare/v0.2.1...v0.2.2)

## [0.2.1] - 2026-09-19

[中文](#cn-0.2.1) | [English](#en-0.2.1)

<h3 id="cn-0.2.1">新增功能</h3>

- **账户抽屉悬停展开**：支持悬停展开与延迟关闭，移入弹层不打断浏览。

### 体验优化

- **权限控制器首段由 Plan 改名为 Read**：与它映射的只读预设名称一致。
- **新会话按钮改为与会话行同高的窄条**：左对齐加号图标、常驻悬停底色。
- **会话行标题默认为次级灰**：悬停或选中时回到主文字色。
- **账户底栏改为全宽分割线布局**：分割线贯通侧栏。

### 问题修复

- 修复 **LICENSE 版权署名缺失与 README 无效示例**：补齐署名并修正 patch 配置示例。

<h3 id="en-0.2.1">New Features</h3>

- **Account drawer hover opening**: it opens on hover and closes after a delay, and moving into the popover does not interrupt browsing.

### Improvements

- **The permissions control's first segment renamed from Plan to Read**: it now matches the read-only preset it maps to.
- **The new-session button became a narrow bar matching the session-row height**: a left-aligned plus icon with a persistent hover fill.
- **Session row titles default to secondary grey**: they return to the primary text color on hover or selection.
- **The account footer became a full-width divider layout**: the divider spans the sidebar.

### Bug Fixes

- Fix **the missing LICENSE attribution and an invalid README example**: attribution added and the manual patch sample corrected.

**Full Changelog**: [v0.2.0...v0.2.1](https://github.com/Nwflower/dsh-claude-style/compare/v0.2.0...v0.2.1)

## [0.2.0] - 2026-09-19

[中文](#cn-0.2.0) | [English](#en-0.2.0)

<h3 id="cn-0.2.0">新增功能</h3>

- **Claude Code Desktop Theme**：从配色皮肤升级为完整的 Claude Code Desktop 视觉与交互复刻主题。
- **Plan / Edit / Auto 分段权限控制**：行内三段式控制器，支持快捷切换会话权限。
- **侧栏账户抽屉**：侧栏底部集成账户按钮与弹出菜单，可打开设置与管理插件。
- **视觉与文案重塑**：专属问候语、输入框引导文案与品牌星芒标识。

### 体验优化

- **优化亮色画布与侧栏色值**：画布取 `#FCFCFB`，侧栏取 `#FBFBF9`。

### 其他变更

- **项目重命名为 `dsh-claude-style`**：与上游 `claude-style-skin` 区分。

<h3 id="en-0.2.0">New Features</h3>

- **Claude Code Desktop Theme**: upgraded from a color skin into a full Claude Code Desktop visual and interaction replica.
- **Plan / Edit / Auto segmented permission control**: an inline three-segment controller for quick session permission switching.
- **Sidebar account drawer**: an account button and popup menu at the sidebar bottom, opening settings and plugin management.
- **Visual and copy refresh**: dedicated greetings, composer placeholder copy and the brand star mark.

### Improvements

- **Light canvas and sidebar colors tuned**: the canvas uses `#FCFCFB` and the sidebar `#FBFBF9`.

### Chores

- **Project renamed to `dsh-claude-style`**: to distinguish it from the upstream `claude-style-skin`.

## [0.1.0] - 2026-08-22

[中文](#cn-0.1.0) | [English](#en-0.1.0)

<h3 id="cn-0.1.0">新增功能</h3>

- **初始版本**：暖调象牙白 / 暖黑双画布与陶烬橙强调色。

<h3 id="en-0.1.0">New Features</h3>

- **Initial release**: warm ivory / warm black dual canvas with a clay-orange accent.
