import type { FeatureManifest } from '../../core/feature'

export default {
  id: 'sidebarWidth',
  order: 155,
  contracts: ['shell.sidebar-resize'],
  ungated: '侧栏宽度是页面骨架本身的一部分，随皮肤一起装上，不需要读者先做一次选择',
  stylesheets: [{ file: 'sidebar-width.css', rank: 112 }],
  cases: [],
  description: {
    zh: {
      title: '侧栏宽度',
      text: '左侧边栏能拖到 200px，比宿主自己的 264px 下限更窄；上限随窗口走，取 clamp(⌊窗口宽度⌋ − 330, 200, 420)px，正文列因此始终留出 330px。拖动中候选宽度低于 100px（下限的一半）时侧栏当场收起，回拖过这条线又当场弹出，收起与展开各是一次版式交换，内容以 300ms 淡入落下；在把手上按下并松开（位移不超过 3px）就是收张开关；收起再展开回到你上一次拖到的那一档。',
    },
    en: {
      title: 'Sidebar width',
      text: 'The left sidebar drags down to 200px against the host\'s own 264px, and its ceiling follows the window — clamp(⌊viewport⌋ - 330, 200, 420)px, which leaves the content column 330px. A drag below 100px, half the floor, folds the column on the spot and a drag back over that line brings it out again, each of the two being one layout swap with the body fading in over 300ms; a press and release on the handle (under 3px of travel) is the collapse toggle itself, and expanding the column comes back to the width you last dragged to.',
    },
  },
} satisfies FeatureManifest
