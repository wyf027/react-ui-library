import path from 'node:path'
import { defineConfig } from 'dumi'
import tailwindcss from 'tailwindcss'

export default defineConfig({
  base: '/react-ui-library',
  publicPath: '/react-ui-library/',
  outputPath: 'dist',
  hash: true,
  title: 'Nova UI',
  favicons: ['/react-ui-library/favicon.svg'],
  locales: [{ id: 'zh-CN', name: '中文' }],
  resolve: { docDirs: ['.'], atomDirs: [], codeBlockMode: 'passive' },
  alias: { '@wuyangfan/nova-ui$': path.resolve(__dirname, '../packages/ui/src/index.ts') },
  plugins: ['./.dumi/plugins/legacy-routes.ts'],
  extraPostCSSPlugins: [require('postcss-import')(), tailwindcss({ config: path.resolve(__dirname, 'tailwind.config.cjs') })],
  ssr: false,
  exportStatic: {},
  themeConfig: {
    name: 'Nova UI',
    title: 'Nova UI',
    description: '企业级 React 组件库',
    logo: '/react-ui-library/favicon.svg',
    github: 'https://github.com/wyf027/react-ui-library',
    homeLink: '/',
    nav: [{ title: '指南', link: '/guide/introduction', activePath: '/guide' }, { title: '组件', link: '/components/overview', activePath: '/components' }, { title: '在线示例', link: '/playground' }],
    sidebar: {
  "/guide": [
    {
      "title": "开始",
      "children": [
        {
          "title": "项目介绍",
          "link": "/guide/introduction"
        },
        {
          "title": "快速开始",
          "link": "/guide/getting-started"
        },
        {
          "title": "可访问性",
          "link": "/guide/accessibility"
        },
        {
          "title": "文档优化 TODO",
          "link": "/guide/docs-optimization-todo"
        }
      ]
    }
  ],
  "/components": [
    {
      "children": [
        {
          "title": "概览",
          "link": "/components/overview"
        }
      ]
    },
    {
      "title": "布局",
      "children": [
        {
          "title": "Layout 页面骨架",
          "link": "/components/layout"
        },
        {
          "title": "Container 布局容器",
          "link": "/components/container"
        },
        {
          "title": "Row 行",
          "link": "/components/row"
        },
        {
          "title": "Col 列",
          "link": "/components/col"
        },
        {
          "title": "Grid 网格",
          "link": "/components/grid"
        },
        {
          "title": "Flex 弹性布局",
          "link": "/components/flex"
        },
        {
          "title": "Space 间距",
          "link": "/components/space"
        },
        {
          "title": "Divider 分割线",
          "link": "/components/divider"
        },
        {
          "title": "SplitPane 分栏",
          "link": "/components/split-pane"
        }
      ]
    },
    {
      "title": "基础",
      "children": [
        {
          "title": "Button 按钮",
          "link": "/components/button"
        },
        {
          "title": "Icon 图标",
          "link": "/components/icon"
        },
        {
          "title": "Typography 排版",
          "link": "/components/typography"
        }
      ]
    },
    {
      "title": "表单",
      "children": [
        {
          "title": "Input 输入框",
          "link": "/components/input"
        },
        {
          "title": "InputNumber 数字输入框",
          "link": "/components/input-number"
        },
        {
          "title": "AutoComplete 自动完成",
          "link": "/components/auto-complete"
        },
        {
          "title": "Select 选择器",
          "link": "/components/select"
        },
        {
          "title": "Checkbox 多选框",
          "link": "/components/checkbox"
        },
        {
          "title": "Radio 单选框",
          "link": "/components/radio"
        },
        {
          "title": "Switch 开关",
          "link": "/components/switch"
        },
        {
          "title": "DatePicker 日期选择",
          "link": "/components/date-picker"
        },
        {
          "title": "TimePicker 时间选择",
          "link": "/components/time-picker"
        },
        {
          "title": "Slider 滑动条",
          "link": "/components/slider"
        },
        {
          "title": "Rate 评分",
          "link": "/components/rate"
        },
        {
          "title": "Upload 上传",
          "link": "/components/upload"
        },
        {
          "title": "Form 表单",
          "link": "/components/form"
        },
        {
          "title": "Calendar 日历",
          "link": "/components/calendar"
        },
        {
          "title": "Transfer 穿梭框",
          "link": "/components/transfer"
        },
        {
          "title": "Cascader 级联选择",
          "link": "/components/cascader"
        },
        {
          "title": "TreeSelect 树选择",
          "link": "/components/tree-select"
        },
        {
          "title": "ColorPicker 颜色选择",
          "link": "/components/color-picker"
        },
        {
          "title": "Segmented 分段控制器",
          "link": "/components/segmented"
        },
        {
          "title": "Mentions 提及",
          "link": "/components/mentions"
        }
      ]
    },
    {
      "title": "反馈",
      "children": [
        {
          "title": "Alert 警告提示",
          "link": "/components/alert"
        },
        {
          "title": "Modal 对话框",
          "link": "/components/modal"
        },
        {
          "title": "Drawer 抽屉",
          "link": "/components/drawer"
        },
        {
          "title": "Toast 轻提示",
          "link": "/components/toast"
        },
        {
          "title": "Tooltip 文字提示",
          "link": "/components/tooltip"
        },
        {
          "title": "Popover 气泡卡片",
          "link": "/components/popover"
        },
        {
          "title": "Popconfirm 气泡确认",
          "link": "/components/popconfirm"
        },
        {
          "title": "Loading 加载中",
          "link": "/components/loading"
        },
        {
          "title": "Spin 加载动画",
          "link": "/components/spin"
        },
        {
          "title": "Skeleton 骨架屏",
          "link": "/components/skeleton"
        },
        {
          "title": "Notification 通知",
          "link": "/components/notification"
        },
        {
          "title": "Tour 漫游式引导",
          "link": "/components/tour"
        },
        {
          "title": "Watermark 水印",
          "link": "/components/watermark"
        }
      ]
    },
    {
      "title": "数据展示",
      "children": [
        {
          "title": "Table 表格",
          "link": "/components/table"
        },
        {
          "title": "List 列表",
          "link": "/components/list"
        },
        {
          "title": "Card 卡片",
          "link": "/components/card"
        },
        {
          "title": "Carousel 走马灯",
          "link": "/components/carousel"
        },
        {
          "title": "Tag 标签",
          "link": "/components/tag"
        },
        {
          "title": "Badge 徽标",
          "link": "/components/badge"
        },
        {
          "title": "Avatar 头像",
          "link": "/components/avatar"
        },
        {
          "title": "Image 图片",
          "link": "/components/image"
        },
        {
          "title": "Pagination 分页",
          "link": "/components/pagination"
        },
        {
          "title": "Progress 进度条",
          "link": "/components/progress"
        },
        {
          "title": "Statistic 统计数值",
          "link": "/components/statistic"
        },
        {
          "title": "Descriptions 描述列表",
          "link": "/components/descriptions"
        },
        {
          "title": "Empty 空状态",
          "link": "/components/empty"
        },
        {
          "title": "Result 结果",
          "link": "/components/result"
        },
        {
          "title": "Timeline 时间轴",
          "link": "/components/timeline"
        },
        {
          "title": "QRCode 二维码",
          "link": "/components/qrcode"
        },
        {
          "title": "ImagePreview 图片预览",
          "link": "/components/image-preview"
        },
        {
          "title": "VirtualList 虚拟列表",
          "link": "/components/virtual-list"
        }
      ]
    },
    {
      "title": "导航",
      "children": [
        {
          "title": "Tabs 标签页",
          "link": "/components/tabs"
        },
        {
          "title": "Menu 菜单",
          "link": "/components/menu"
        },
        {
          "title": "Breadcrumb 面包屑",
          "link": "/components/breadcrumb"
        },
        {
          "title": "Dropdown 下拉菜单",
          "link": "/components/dropdown"
        },
        {
          "title": "Steps 步骤条",
          "link": "/components/steps"
        },
        {
          "title": "Collapse 折叠面板",
          "link": "/components/collapse"
        },
        {
          "title": "Tree 树形控件",
          "link": "/components/tree"
        },
        {
          "title": "Anchor 锚点",
          "link": "/components/anchor"
        },
        {
          "title": "Affix 固钉",
          "link": "/components/affix"
        },
        {
          "title": "BackTop 回到顶部",
          "link": "/components/back-top"
        },
        {
          "title": "FloatButton 悬浮按钮",
          "link": "/components/float-button"
        }
      ]
    }
  ]
},
    actions: [{ text: '快速开始', link: '/guide/getting-started', type: 'primary' }, { text: '组件概览', link: '/components/overview' }],
    features: [{ title: 'React 原生示例', details: '74 个组件文档，支持直接编辑示例代码、实时预览和复制。' }, { title: '统一组件 API', details: 'TypeScript 类型、受控与非受控交互、主题和可访问性说明。' }, { title: '面向日常开发', details: '按六类组件导航，通过站内搜索和页内目录快速查阅。' }],
    bannerConfig: { showBanner: false },
    sidebarGroupModePath: ['/components'],
    prefersColor: { default: 'auto', switch: true },
    theme: { token: { colorPrimary: '#2459ff' } },
    footer: 'Nova UI · React + TypeScript + Tailwind CSS',
    editLink: 'https://github.com/wyf027/react-ui-library/edit/main/{filename}',
    showLineNum: true,
  },
})
