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
      text: '左侧边栏能拖到 215px，比宿主自己的下限更窄，越过下限 95px 时侧栏变暗、拖到 100px 时当场收起（收起走宿主自己的折叠动画），收起后仍按住鼠标向右拖过窗口左边 110px 处侧栏重新弹出；收起再展开回到你上一次拖到的那一档。',
    },
    en: {
      title: 'Sidebar width',
      text: 'The left sidebar drags down to 215px, narrower than the host\'s own floor, and a drag below 100px folds it through the host\'s own rail animation; expanding it again comes back to the width you last dragged to.',
    },
  },
} satisfies FeatureManifest
