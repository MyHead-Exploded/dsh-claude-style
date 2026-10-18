import type { FeatureManifest } from '../../core/feature'

export default {
  id: 'sidebarWidth',
  order: 155,
  contracts: ['shell.sidebar-resize'],
  ungated: '侧栏宽度是页面骨架本身的一部分，随皮肤一起装上，不需要读者先做一次选择',
  stylesheets: [{ file: 'sidebar-width.css', rank: 112 }],
  cases: [],
} satisfies FeatureManifest
