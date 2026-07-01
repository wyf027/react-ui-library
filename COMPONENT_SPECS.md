# Nova UI 组件技术规格（按 Button 模板对齐）

本文档与 `Button` 技术方案采用**同一套维度**，便于评审与落地实现。**Button** 为基准实现，见 `packages/ui/src/components/basic/Button/Button.tsx`；其余组件按下表收敛。

## 模板维度说明

| 维度 | 含义 |
| --- | --- |
| **职责** | 组件解决的用户场景与边界 |
| **DOM / 语义** | 根节点标签、`role`、是否 Portal、是否复合子组件 |
| **状态与交互** | loading / open / disabled / 动画等 |
| **数据与受控** | value、defaultValue、数据源、受控与非受控约定 |
| **API 要点** | 与同类库对齐的 props 分类（尺寸、变体、插槽、层级） |
| **类型与 Ref** | 继承原生类型、`Omit` 冲突字段、`forwardRef` 目标 |
| **无障碍** | 键盘、焦点、ARIA、唯一标签 |
| **样式与主题** | Token、`className`、`data-*`、暗色 |
| **文档与验证** | 文档页必含示例与验收提示 |

---

## 1. Basic

### 1.1 Button（基准）

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 触发操作或导航；表单内避免误提交 |
| DOM / 语义 | `button`；`href` 时 `a`；`type` 默认 `button` |
| 状态与交互 | `disabled`、`loading` 禁点；`aria-busy` |
| 数据与受控 | 无业务 value；可选防抖由业务层处理 |
| API 要点 | `variant` / `size` / `color` / `shape` / `block` / `icon` / `iconPosition` / `href` / `target` |
| 类型与 Ref | `ButtonProps` 联合类型；`ref` → `HTMLButtonElement \| HTMLAnchorElement` |
| 无障碍 | `focus-visible`；仅图标须 `aria-label`；外链 `rel` |
| 样式与主题 | Tailwind + `cn`；`data-variant` 等 |
| 文档与验证 | 基础 / 描边 / 危险 / loading / 尺寸 / 链接形态 |

### 1.2 Icon

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 统一图标尺寸、颜色与可访问包装 |
| DOM / 语义 | `span` 或 `svg` 容器；装饰性 `aria-hidden` |
| 状态与交互 | 可选 `spin`；无点击语义则不加 `button` |
| 数据与受控 | 无 |
| API 要点 | `size`、`color` / `className`、与 Button 尺寸阶梯对齐 |
| 类型与 Ref | `SVGAttributes` / 包装元素；`ref` 转发到根 |
| 无障碍 | 纯装饰 `aria-hidden`；可点击时须外层 `button`+`aria-label` |
| 样式与主题 | `currentColor` 继承父级 |
| 文档与验证 | 与 Typography、Button 组合示例 |

### 1.3 Typography（Title / Text / Paragraph）

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 标题、正文、段落的层级与行高统一 |
| DOM / 语义 | `h1`–`h6` / `span` / `p`；`level` 映射标题层级 |
| 状态与交互 | 一般无；`copyable` 若存在需键盘可达 |
| 数据与受控 | 无 |
| API 要点 | `level`、`type`（主次）、`ellipsis`、`strong`、`code` |
| 类型与 Ref | 继承对应 HTML 元素属性；`Omit` 与自定义同名冲突 |
| 无障碍 | 标题层级不跳级；截断保留 `title` 或 tooltip 说明 |
| 样式与主题 | 字阶、色板走 token |
| 文档与验证 | 层级演示、长文截断、暗色对比 |

---

## 2. Layout

### 2.1 Container

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 页面最大宽度与水平内边距约束 |
| DOM / 语义 | `div`；可选 `main` 由业务决定 |
| 状态与交互 | 无 |
| 数据与受控 | 无 |
| API 要点 | `maxWidth`、`padding`、与栅格断点对齐 |
| 类型与 Ref | `HTMLDivElement` |
| 无障碍 | 无特殊；不替代 landmark |
| 样式与主题 | 断点 token |
| 文档与验证 | 与 Row/Grid 嵌套示例 |

### 2.2 Row

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 水平排列 Col，支持 gutter |
| DOM / 语义 | `div` + flex；`role` 一般不需要 |
| 状态与交互 | 无 |
| 数据与受控 | 无 |
| API 要点 | `gutter`、`wrap`、`align`、`justify` |
| 类型与 Ref | `HTMLDivElement` |
| 无障碍 | 阅读顺序与 DOM 顺序一致 |
| 样式与主题 | gutter 用 gap 或负 margin 策略统一 |
| 文档与验证 | 多 Col、换行、与 Space 区别说明 |

### 2.3 Col

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 栅格列占位与响应式 span |
| DOM / 语义 | `div` |
| 状态与交互 | 无 |
| 数据与受控 | 无 |
| API 要点 | `span`、`xs`/`sm`/`md`… 断点 props；`offset` |
| 类型与 Ref | `HTMLDivElement` |
| 无障碍 | — |
| 样式与主题 | 24 栅格或项目约定栅格数固定文档 |
| 文档与验证 | 响应式三断点示例 |

### 2.4 Grid

| 维度 | 方案要点 |
| --- | --- |
| 职责 | CSS Grid 区域布局 |
| DOM / 语义 | `div` `display: grid` |
| 状态与交互 | 无 |
| 数据与受控 | 无 |
| API 要点 | `columns`、`rows`、`gap`、`templateAreas`（若暴露） |
| 类型与 Ref | `HTMLDivElement` |
| 无障碍 | — |
| 样式与主题 | gap token |
| 文档与验证 | 与 Flex/Row 选型对照表 |

### 2.5 Space

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 子元素间固定间距，水平/垂直 |
| DOM / 语义 | `div` flex + gap |
| 状态与交互 | `wrap` |
| 数据与受控 | 无 |
| API 要点 | `size`（数字或预设）、`direction`、`align` |
| 类型与 Ref | `HTMLDivElement` |
| 无障碍 | `separator` 若存在须 `role`/`aria-orientation` |
| 样式与主题 | spacing token |
| 文档与验证 | 与 Row gutter 差异、嵌套注意 |

### 2.6 Divider

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 内容分区；可选标题 |
| DOM / 语义 | `hr`（无文案）或带 `role="separator"` 的容器 |
| 状态与交互 | 无 |
| 数据与受控 | 无 |
| API 要点 | `orientation`、`variant`、标题插槽、`dashed` |
| 类型与 Ref | 根元素联合 |
| 无障碍 | 有文案时保证可读；`hr` 不包多余不可读节点 |
| 样式与主题 | 边线与文字间距 token |
| 文档与验证 | 横/纵、带标题、列表内分割 |

### 2.7 SplitPane

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 可拖拽调整左右（或上下）区域比例 |
| DOM / 语义 | 两 pane + splitter；splitter 为 `button` 或 `separator` |
| 状态与交互 | drag、键盘步进、`collapsed`、`min`/`max` |
| 数据与受控 | `size` / `defaultSize`、`onResizeEnd` |
| API 要点 | `vertical`、`resizable`、`firstSlot`/`secondSlot` 或 children 约定 |
| 类型与 Ref | 容器 ref；可选 `imperativeHandle` 折叠 |
| 无障碍 | splitter 可聚焦；方向 `aria-orientation`；键盘调整 |
| 样式与主题 | 拖拽条厚度、hover 态 |
| 文档与验证 | 受控比例、最小宽度、键盘操作 |

### 2.8 Flex

| 维度 | 方案要点 |
| --- | --- |
| 职责 | flex 布局快捷封装 |
| DOM / 语义 | `div` |
| 状态与交互 | 无 |
| 数据与受控 | 无 |
| API 要点 | `direction`、`wrap`、`justify`、`align`、`gap` |
| 类型与 Ref | `HTMLDivElement` |
| 无障碍 | — |
| 样式与主题 | 与 Space 文档区分使用场景 |
| 文档与验证 | 常见对齐组合 |

---

## 3. Form

### 3.1 Input

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 单行文本输入；前缀后缀；清除 |
| DOM / 语义 | `input`；`type` 透传 |
| 状态与交互 | `disabled`、`readOnly`、`allowClear` |
| 数据与受控 | `value` + `onChange`；`defaultValue` |
| API 要点 | `prefix`、`suffix`、`maxLength`、`showCount` |
| 类型与 Ref | `HTMLInputElement` |
| 无障碍 | `label` 与 `FormItem` 关联；`aria-invalid` 与校验 |
| 样式与主题 | 高度与 Button `md` 对齐 |
| 文档与验证 | 受控、密码、前后缀、错误态 |

### 3.2 InputNumber

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 数字输入与步进 |
| DOM / 语义 | `input` type=number 或自定义 |
| 状态与交互 | `step`、`min`、`max`、formatter/parser |
| 数据与受控 | `value` `null` 与空串约定文档化 |
| API 要点 | `precision`、`controls`、键盘上下步进 |
| 类型与 Ref | `number \| null` 明确 |
| 无障碍 | 增减按钮 `aria-label` |
| 样式与主题 | 与 Input 高度一致 |
| 文档与验证 | 边界 min/max、精度、大数 |

### 3.3 Select

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 单选/多选下拉 |
| DOM / 语义 | combobox + listbox 模式；或原生 `select` 降级策略说明 |
| 状态与交互 | `open`、`loading`、`searchable`、虚拟列表 |
| 数据与受控 | `value`、`options`、`fieldNames` |
| API 要点 | `mode`、`placeholder`、`filterOption`、`onSearch` |
| 类型与 Ref | 聚焦管理；`ref` 到 trigger |
| 无障碍 | 键盘打开/导航/选中；`aria-expanded` `aria-activedescendant` |
| 样式与主题 | 下拉层级 z-index 统一规范 |
| 文档与验证 | 多选、搜索、空、大数据 |
| **本库实现（nova-ui）** | 原生 `<select>`：`options`（`label` 为 `ReactNode`）、可选 `label`+`id`/`htmlFor`、`placeholder`（空值首项）、`size`、`slotClassNames`；`onChange(value: string)`。不含搜索、多选模式、虚拟列表；演进见 [component-plans/Select.md](./component-plans/Select.md)。 |

### 3.4 Checkbox

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 布尔或组内多选 |
| DOM / 语义 | `input type=checkbox` 或自定义+`role=checkbox` |
| 状态与交互 | `indeterminate` |
| 数据与受控 | `checked`、`onChange`；Group `value[]` |
| API 要点 | `Checkbox.Group` 与单项 props 分工 |
| 类型与 Ref | `HTMLInputElement` |
| 无障碍 | 与 `label` 绑定；indeterminate 的语义 |
| 样式与主题 | 尺寸与表单行高 |
| 文档与验证 | 全选、半选、禁用 |

### 3.5 Radio

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 组内单选 |
| DOM / 语义 | `input type=radio`；Group 同一 `name` |
| 状态与交互 | 无 |
| 数据与受控 | `value`；Group 控制子项 |
| API 要点 | `Radio.Group` `optionType`（button 风格时对齐 Button） |
| 类型与 Ref | 每项 ref；Group 可选 |
| 无障碍 | 方向键在组内切换；`roving tabindex` 若自定义 |
| 样式与主题 | button 变体与 Button 视觉对齐 |
| 文档与验证 | 受控、禁用单项 |

### 3.6 Switch

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 即时开关 |
| DOM / 语义 | `button role=switch` 或 checkbox 模式二选一文档固定 |
| 状态与交互 | `loading`；切换动画 |
| 数据与受控 | `checked`、`onChange` |
| API 要点 | `checkedChildren` / `unCheckedChildren` |
| 类型与 Ref | `HTMLButtonElement` |
| 无障碍 | `aria-checked`；必须有可区分文案或 `aria-label` |
| 样式与主题 | 轨道 token |
| 文档与验证 | 受控、加载、文字槽 |

### 3.7 DatePicker

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 日期/日期范围选择 |
| DOM / 语义 | 输入框 + 弹层面板；Portal |
| 状态与交互 | 面板开关、`preset`、禁用日期 |
| 数据与受控 | `value` Dayjs/Date/string 类型统一导出 |
| API 要点 | `showTime`、`format`、`picker`（date/week/month） |
| 类型与 Ref | 输入 ref + `open` 受控 |
| 无障碍 | 面板内键盘日历导航；焦点 trap |
| 样式与主题 | 弹层 z-index |
| 文档与验证 | 范围、时区、格式、表单校验 |
| **本库实现（nova-ui）** | 单节点 `<input type="date">`：`value`/`defaultValue`/`onChange` 均为 **`YYYY-MM-DD` 字符串**；继承其余 `input` 属性（除 `type`/`onChange`）。无弹层、范围、时间、自定义格式；演进见 [component-plans/DatePicker.md](./component-plans/DatePicker.md)。 |

### 3.8 TimePicker

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 时间或时间范围 |
| DOM / 语义 | 类似 DatePicker；面板列表或表盘 |
| 状态与交互 | `format`、`step` |
| 数据与受控 | 与 DatePicker 类型体系一致 |
| API 要点 | `use12Hours` 等 |
| 类型与 Ref | 同 DatePicker |
| 无障碍 | 列表项 roving tabindex |
| 样式与主题 | 与 DatePicker 面板统一 |
| 文档与验证 | 范围、步长、禁用时段（若有） |

### 3.9 Form / FormItem

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 字段布局、校验、收集提交 |
| DOM / 语义 | `form`；Item 为 `div`+`label` |
| 状态与交互 | `validateTrigger`、`submit` loading |
| 数据与受控 | `initialValues`、`onFinish`、`onValuesChange` |
| API 要点 | `layout`、`labelCol`/`wrapperCol`、`rules`、`required` |
| 类型与 Ref | `FormValues` 泛型；`namePath` 类型安全（尽力） |
| 无障碍 | `htmlFor`、错误 `aria-describedby`、`role=alert` |
| 样式与主题 | 错误色、帮助文案间距 |
| 文档与验证 | 嵌套、动态字段、异步校验 |
| **本库实现（nova-ui）** | `Form`：`initialValues`、`validateTrigger`（`onSubmit` \| `onChange` \| `onBlur`）、`onSubmit(values)`。`FormItem`：`name`、`rules`、`dependencies`、`label`、`requiredMark`、`help`、`extra`、`validateStatus`；子控件注入 `value`/`onChange`/`onBlur`；有 `label` 且子为单元素时 **`label` `htmlFor` 与控件 `id` 对齐**（子已有非空 `id` 则沿用）；根容器 **`data-nova-form-item`**；有 **`label`** 时 **`role="group"`**、**`aria-labelledby`** 指向可见 **`label`**；**`help`/校验错误/`validateStatus`（`success`/`warning`）/`extra`** 与控件 **`aria-describedby`** 关联，有错时 **`aria-invalid`**、错误文案 **`role="alert"`**。无 `layout`/栅格、`onValuesChange`、嵌套 `namePath`；演进见 [component-plans/Form.md](./component-plans/Form.md)。 |

### 3.10 Upload

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 文件选择与上传进度 |
| DOM / 语义 | `input type=file` 隐藏 + 触发按钮 |
| 状态与交互 | `uploading`、`preview`、`drag` |
| 数据与受控 | `fileList`、`beforeUpload`、`customRequest` |
| API 要点 | `multiple`、`accept`、`listType`、限制大小 |
| 类型与 Ref | `UploadFileItem` 与展示态分离（治理规则） |
| 无障碍 | 键盘触发上传；列表项操作可聚焦 |
| 样式与主题 | 列表与卡片两种密度 |
| 文档与验证 | 受控列表、裁剪、失败重试 |

### 3.11 Slider

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 数值区间滑动选择 |
| DOM / 语义 | `role=slider`；轨道+thumb |
| 状态与交互 | `range`、tooltip、`marks` 点击跳转 |
| 数据与受控 | `value` number \| [number, number] |
| API 要点 | `min`、`max`、`step`、`vertical` |
| 类型与 Ref | 双 thumb ref 策略 |
| 无障碍 | 键盘左右、Home/End、`aria-valuenow` |
| 样式与主题 | 轨道高亮 token |
| 文档与验证 | 单滑块、范围、禁用段（若有） |

### 3.12 Rate

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 星级评分 |
| DOM / 语义 | 一组 `radio` 视觉隐藏或 `role=slider` 文档固定 |
| 状态与交互 | `allowHalf`、`hover` 预览 |
| 数据与受控 | `value`、`onChange` |
| API 要点 | `count`、`character` |
| 类型与 Ref | 容器 ref |
| 无障碍 | 半星键盘策略；只读 `aria-readonly` |
| 样式与主题 | 星标颜色 |
| 文档与验证 | 半星、只读、清除 |

### 3.13 Calendar

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 月历展示与日期选择 |
| DOM / 语义 | `grid`/`table` 日历格；按钮为日期 cell |
| 状态与交互 | 月切换、`validRange` |
| 数据与受控 | `value`、`onSelect` |
| API 要点 | `fullscreen`、`dateCellRender` |
| 类型与 Ref | 面板容器 |
| 无障碍 | 网格导航、选中 `aria-selected` |
| 样式与主题 | 与 DatePicker 格一致 |
| 文档与验证 | 自定义渲染、禁用日 |

### 3.14 Transfer

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 双列表穿梭 |
| DOM / 语义 | 两 `listbox` + 操作 `toolbar` |
| 状态与交互 | 搜索、分页、全选 |
| 数据与受控 | `targetKeys`、`dataSource`、`onChange` |
| API 要点 | `titles`、`operations`、`rowKey` |
| 类型与 Ref | 项 `key` string（ID 治理） |
| 无障碍 | 列表键盘、穿梭按钮 `aria-label` |
| 样式与主题 | 两栏等宽与响应式 |
| 文档与验证 | 大数据、受控 keys |

### 3.15 Cascader

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 级联选择 |
| DOM / 语义 | 多级菜单；`combobox`+级联 `menu` |
| 状态与交互 | 动态加载 `loadData`、搜索 |
| 数据与受控 | `value` 为路径数组；`options` |
| API 要点 | `changeOnSelect`、`fieldNames` |
| 类型与 Ref | 路径类型字面量 |
| 无障碍 | 左右层级键盘 Esc 返回 |
| 样式与主题 | 级联浮层宽度 |
| 文档与验证 | 异步子节点、显示渲染 |

### 3.16 TreeSelect

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 树形数据选择 |
| DOM / 语义 | Select + Tree |
| 状态与交互 | 多选、勾选联动、`treeCheckable` |
| 数据与受控 | `value`、树 `treeData` |
| API 要点 | 与 Tree、Select props 不重复冲突表 |
| 类型与 Ref | 同 Select trigger |
| 无障碍 | 树键盘规范 WAI-ARIA Tree |
| 样式与主题 | 下拉最大高度滚动 |
| 文档与验证 | 勾选、搜索、虚拟树（若有） |

### 3.17 ColorPicker

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 颜色选择与预览 |
| DOM / 语义 | 触发器 + 弹层面板 |
| 状态与交互 | HSV/hex 切换、`presets` |
| 数据与受控 | `value` string；`onChange` |
| API 要点 | `format`、`disabledAlpha` |
| 类型与 Ref | 输入框 ref |
| 无障碍 | 滑块 `aria-valuetext`；对比度说明（文档） |
| 样式与主题 | 与 Popover 层级一致 |
| 文档与验证 | 受控、透明通道、预设 |

### 3.18 Segmented

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 分段单选 |
| DOM / 语义 | `radiogroup` + `radio` |
| 状态与交互 | `block`、尺寸 |
| 数据与受控 | `value`、`options` |
| API 要点 | `size` 与 Button 对齐 |
| 类型与 Ref | 选项 `value` 泛型 |
| 无障碍 | 方向键、`aria-checked` |
| 样式与主题 | 指示器动画 token |
| 文档与验证 | 图标选项、禁用项 |

### 3.19 Mentions

| 维度 | 方案要点 |
| --- | --- |
| 职责 | `@` 触发提及列表 |
| DOM / 语义 | `textarea`/`contenteditable` 策略固定其一 |
| 状态与交互 | 下拉位置、`filter` |
| 数据与受控 | `value`、`options` |
| API 要点 | `prefix`、`split` |
| 类型与 Ref | 与 Input 一致 |
| 无障碍 | 列表展开与 activedescendant |
| 样式与主题 | 下拉与 Textarea 宽对齐 |
| 文档与验证 | 多前缀、异步选项 |

### 3.20 AutoComplete

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 输入 + 建议列表 |
| DOM / 语义 | `combobox` + `listbox` |
| 状态与交互 | `open`、高亮项 |
| 数据与受控 | `value`、`options` |
| API 要点 | `onSelect`、`backfill` |
| 类型与 Ref | `HTMLInputElement` |
| 无障碍 | 同 Select 简化版 |
| 样式与主题 | 与 Input 同高 |
| 文档与验证 | 自由输入 vs 必选区别 |

---

## 4. Feedback

### 4.1 Modal

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 模态对话框；阻断下层交互 |
| DOM / 语义 | Portal；`role=dialog` `aria-modal=true` |
| 状态与交互 | `open`、`confirmLoading`、`maskClosable`、`keyboard`（Esc） |
| 数据与受控 | `open` + `onOpenChange` |
| API 要点 | `title`、`footer`、`destroyOnClose`、`getContainer` |
| 类型与 Ref | 内容区 ref；`afterOpenChange` |
| 无障碍 | 焦点 trap、打开时焦点移入、关闭恢复 |
| 样式与主题 | `z-index` 全局约定；宽度 token |
| 文档与验证 | 嵌套、表单提交、无标题 |

### 4.2 Drawer

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 侧栏面板；弱阻断 |
| DOM / 语义 | Portal + `dialog` 或 `document` 策略与 Modal 统一 |
| 状态与交互 | `placement`、`size`、`push`（若有） |
| 数据与受控 | 同 Modal |
| API 要点 | `extra` 区、`closable` |
| 类型与 Ref | 同 Modal |
| 无障碍 | 同 Modal；宽度占满时滚动容器 |
| 样式与主题 | 与 Modal 动效时长一致 |
| 文档与验证 | 四向、内嵌表单 |

### 4.3 Tooltip

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 悬停或聚焦展示简短说明 |
| DOM / 语义 | Portal；`role=tooltip` |
| 状态与交互 | `open` 受控、`mouseEnterDelay` |
| 数据与受控 | 一般无 value；`open` 可选 |
| API 要点 | `title`、`placement`、`trigger` |
| 类型与 Ref | trigger ref |
| 无障碍 | `id` 与 `aria-describedby`；禁用子元素不触发 |
| 样式与主题 | 箭头、最大宽 |
| 文档与验证 | 与 Popover 区别、禁用、受控 |

### 4.4 Popover

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 悬停/点击展示 richer 内容 |
| DOM / 语义 | `dialog` 或 `region` 策略与焦点管理文档化 |
| 状态与交互 | 点击外关闭、`trigger` |
| 数据与受控 | `open` |
| API 要点 | `content`、`title` |
| 类型与 Ref | 同 Tooltip |
| 无障碍 | 交互内容内需焦点顺序 |
| 样式与主题 | 与 Tooltip 层级一致 |
| 文档与验证 | 内嵌按钮、滚动内容 |

### 4.5 Popconfirm

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 轻量确认；基于 Popover + 操作按钮 |
| DOM / 语义 | 确认区含默认/取消按钮 |
| 状态与交互 | `onConfirm` async、`okButtonProps` |
| 数据与受控 | `open` |
| API 要点 | 与 Button `danger` 对齐危险操作 |
| 类型与 Ref | trigger ref |
| 无障碍 | 焦点落在确认区；Esc 关闭 |
| 样式与主题 | 与 Popover 统一 |
| 文档与验证 | 异步确认、禁用确定 |

### 4.6 Toast / Message

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 全局轻提示 |
| DOM / 语义 | Portal 栈；`role=status` 或 `alert`（错误时） |
| 状态与交互 | 队列、`duration`、`destroy` |
| 数据与受控 | 命令式 API + 可选 hook |
| API 要点 | `type`、`content`、`onClose` |
| 类型与 Ref | 无 ref 或返回 `close` 函数 |
| 无障碍 | 非阻塞；重要错误考虑 `assertive` |
| 样式与主题 | 固定顶/底；与 Notification 层级 |
| 文档与验证 | 堆叠、更新同 key、长文案 |

### 4.7 Notification

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 通知卡片；可行动 |
| DOM / 语义 | `alert`；可含按钮 |
| 状态与交互 | 队列、`btn`、`duration` |
| 数据与受控 | 命令式 |
| API 要点 | `icon`、`placement`、`key` |
| 类型与 Ref | 返回关闭函数 |
| 无障碍 | 按钮可聚焦；自动消失与 `aria-live` |
| 样式与主题 | 宽度与阴影 |
| 文档与验证 | 多按钮、不自动关 |

### 4.8 Loading

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 区域或全屏加载蒙层 |
| DOM / 语义 | `aria-busy` 包裹目标 |
| 状态与交互 | `spinning`、全屏 `fullscreen` |
| 数据与受控 | `spinning` |
| API 要点 | `tip`、与 Spin 复用策略 |
| 类型与 Ref | 容器 ref |
| 无障碍 | 区域加载不抢文档焦点（全屏例外说明） |
| 样式与主题 | 蒙层透明度 token |
| 文档与验证 | 表格内、全页 |

### 4.9 Spin

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 内联或容器居中加载指示 |
| DOM / 语义 | `status` 或 `progressbar` indeterminate |
| 状态与交互 | `spinning` |
| 数据与受控 | 无 |
| API 要点 | `size`、`tip` |
| 类型与 Ref | 根 ref |
| 无障碍 | `aria-busy` 父级配合 |
| 样式与主题 | 与 Button loading 图标一致 |
| 文档与验证 | 延迟显示 `delay`（若有） |

### 4.10 Alert

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 页内非阻塞提示条 |
| DOM / 语义 | `role=alert`；可关闭为 `button` |
| 状态与交互 | `closable`、`onClose` |
| 数据与受控 | 无或 `visible` |
| API 要点 | `type`、`message`、`description`、`banner` |
| 类型与 Ref | 容器 ref |
| 无障碍 | 关闭按钮 `aria-label` |
| 样式与主题 | 语义色 token |
| 文档与验证 | 带操作链接、banner |

### 4.11 Skeleton

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 占位骨架 |
| DOM / 语义 | 装饰性 `aria-busy` 父级由列表负责 |
| 状态与交互 | `loading` 切换动画 |
| 数据与受控 | 无 |
| API 要点 | `avatar`、`title`、`paragraph` rows、`active` |
| 类型与 Ref | — |
| 无障碍 | 骨架本身 `aria-hidden`；加载完成切真实内容 |
| 样式与主题 | 闪动动画 token |
| 文档与验证 | 与 Card/List 组合 |

### 4.12 Tour

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 新手引导步骤高亮 |
| DOM / 语义 | 蒙层 + 高亮洞；`aria-modal` 谨慎使用 |
| 状态与交互 | `current`、`steps`、`mask` |
| 数据与受控 | `open`、`onClose` |
| API 要点 | `target` ref/selector、`scrollIntoView` |
| 类型与 Ref | 步骤器 ref |
| 无障碍 | 步骤文案可读；键盘下一步/上一步 |
| 样式与主题 | 高亮边距 |
| 文档与验证 | 动态 target、滚动容器内 |

### 4.13 Watermark

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 内容防盗水印层 |
| DOM / 语义 | 覆盖层或 Canvas；不阻断指针 `pointer-events-none` |
| 状态与交互 | 无 |
| 数据与受控 | `content`、`rotate`、`gap` |
| API 要点 | `font`、`zIndex` |
| 类型与 Ref | 容器 ref |
| 无障碍 | 水印层 `aria-hidden` |
| 样式与主题 | 密度与对比度（可读性） |
| 文档与验证 | 与 Modal 叠层、暗色背景 |

---

## 5. Data

### 5.1 Table

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 表格展示、排序、筛选、选择 |
| DOM / 语义 | `table`；`thead`/`tbody`；排序 `aria-sort` |
| 状态与交互 | `loading`、分页、列宽拖拽（若有） |
| 数据与受控 | `dataSource`、`columns`、`rowKey` |
| API 要点 | `scroll`、`sticky`、`expandedRowRender` |
| 类型与 Ref | `rowKey` string；列 `dataIndex` 类型 |
| 无障碍 |  caption/summary；固定列焦点 |
| 样式与主题 | 边框密度、斑马纹 |
| 文档与验证 | 大数据虚拟滚动（若有）、树表 |

### 5.2 Pagination

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 列表分页控件 |
| DOM / 语义 | `nav` `aria-label`；页码 `button` |
| 状态与交互 | `current`、`pageSize`、`total` |
| 数据与受控 | 受控页码 |
| API 要点 | `showSizeChanger`、`showQuickJumper` |
| 类型与 Ref | `HTMLDivElement` |
| 无障碍 | 当前页 `aria-current` |
| 样式与主题 | 与 Table footer 对齐 |
| 文档与验证 | 少页、多页、禁用 |

### 5.3 Card

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 信息分组容器 |
| DOM / 语义 | `div`；可选 `section`+heading |
| 状态与交互 | `hoverable`、`loading` |
| 数据与受控 | 无 |
| API 要点 | `title`、`extra`、`cover`、`actions` |
| 类型与 Ref | 根 ref |
| 无障碍 | 标题层级 |
| 样式与主题 | 圆角阴影 token |
| 文档与验证 | 栅格内卡片、嵌套 |

### 5.4 Tag

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 标签展示与关闭 |
| DOM / 语义 | `span`；可关闭为内部 `button` |
| 状态与交互 | `closable`、`onClose` |
| 数据与受控 | 无 |
| API 要点 | `color`、`bordered`、`icon` |
| 类型与 Ref | — |
| 无障碍 | 关闭 `aria-label` |
| 样式与主题 | 语义色与中性色 |
| 文档与验证 | 超长截断、链接型（若有） |

### 5.5 Badge

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 徽标数或点 |
| DOM / 语义 | 包裹子元素；溢出 `sup` |
| 状态与交互 | `dot`、`overflowCount` |
| 数据与受控 | `count` |
| API 要点 | `offset`、`status`、`text` |
| 类型与 Ref | 子元素 ref 转发策略 |
| 无障碍 | 数值对读屏：`aria-label` 合并 |
| 样式与主题 | 与 Button 尺寸视觉协调 |
| 文档与验证 | 独立点、封顶数字 |

### 5.6 Avatar

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 用户头像；图片/文字/图标 |
| DOM / 语义 | `img` 或 `span` |
| 状态与交互 | 加载失败回退字符 |
| 数据与受控 | `src` |
| API 要点 | `size`、`shape`、`gap`（组） |
| 类型与 Ref | `HTMLImageElement` |
| 无障碍 | `alt` 或组 `aria-label` |
| 样式与主题 | 组重叠 |
| 文档与验证 | Avatar.Group、缺图 |

### 5.7 Progress

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 进度条/圆环 |
| DOM / 语义 | `progressbar` |
| 状态与交互 | `status` success/exception/active |
| 数据与受控 | `percent` 0–100 |
| API 要点 | `type` line/circle、`strokeWidth` |
| 类型与 Ref | — |
| 无障碍 | `aria-valuenow` `aria-valuemin` `aria-valuemax` |
| 样式与主题 | 成功/失败色 token |
| 文档与验证 | 渐变色、自定义格式 |

### 5.8 Statistic

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 数值展示与倒计时 |
| DOM / 语义 | `div`；倒计时语义 |
| 状态与交互 | `loading`、`formatter` |
| 数据与受控 | `value` |
| API 要点 | `prefix`、`suffix`、`precision` |
| 类型与 Ref | — |
| 无障碍 | 大数分组读法（文档建议） |
| 样式与主题 | 标题与数值字阶 |
| 文档与验证 | 倒计时结束回调 |

### 5.9 Descriptions

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 键值描述列表 |
| DOM / 语义 | `dl`/`dt`/`dd` 或 table 布局二选一文档固定 |
| 状态与交互 | 无 |
| 数据与受控 | `items` 或 `children` Item |
| API 要点 | `column`、`bordered`、`size` |
| 类型与 Ref | `DescriptionItem` 类型 |
| 无障碍 | 成对标签可读顺序 |
| 样式与主题 | 标签区背景色 |
| 文档与验证 | 响应式列数 |

### 5.10 Empty

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 空状态占位 |
| DOM / 语义 | `role=img` 插图或装饰 `aria-hidden` |
| 状态与交互 | 无 |
| 数据与受控 | 无 |
| API 要点 | `image`、`description`、`children` CTA |
| 类型与 Ref | — |
| 无障碍 | 主文案为真实文本 |
| 样式与主题 | 插图尺寸 |
| 文档与验证 | 表格内、筛选无结果 |

### 5.11 Result

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 结果页（成功/失败/403/404） |
| DOM / 语义 | `status` 图标 + 标题 + 描述 |
| 状态与交互 | 无 |
| 数据与受控 | 无 |
| API 要点 | `status`、`title`、`subTitle`、`extra` |
| 类型与 Ref | — |
| 无障碍 | 标题用 `h` 层级 |
| 样式与主题 | 与 Empty 区分使用场景 |
| 文档与验证 | 自定义 icon、双按钮 |

### 5.12 Timeline

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 时间轴事件展示 |
| DOM / 语义 | `list` 或 `ul` |
| 状态与交互 | `pending` 节点 |
| 数据与受控 | `items` |
| API 要点 | `mode` left/right/alternate、`color` |
| 类型与 Ref | `TimelineItem` |
| 无障碍 | 列表项顺序与阅读顺序 |
| 样式与主题 | 轴线与点 token |
| 文档与验证 | 自定义 dot、加载中尾节点 |

### 5.13 QRCode

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 二维码生成与下载 |
| DOM / 语义 | `canvas`/`img` |
| 状态与交互 | `status` active/expired/scanned、`onRefresh` |
| 数据与受控 | `value` |
| API 要点 | `size`、`errorLevel`、`icon` 嵌入 |
| 类型与 Ref | canvas ref |
| 无障碍 | 提供等价链接或说明文案 |
| 样式与主题 | 前景背景对比度 |
| 文档与验证 | 过期态、刷新 |

### 5.14 ImagePreview

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 图片预览与切换、缩放 |
| DOM / 语义 | Portal 全屏；`dialog` |
| 状态与交互 | 缩放、旋转、切换、键盘 |
| 数据与受控 | `visible`、`current` |
| API 要点 | `src` 数组、`toolbarRender` |
| 类型与 Ref | — |
| 无障碍 | Esc 关闭；按钮 `aria-label` |
| 样式与主题 | 背景色、动画 |
| 文档与验证 | 多图、触摸手势（若有） |

### 5.15 VirtualList

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 虚拟滚动长列表 |
| DOM / 语义 | 可滚动容器；项 `role=listitem` |
| 状态与交互 | 滚动到索引、动态高度 |
| 数据与受控 | `data`、`itemKey` |
| API 要点 | `height`、`itemHeight` 或测量、`overscan` |
| 类型与 Ref | 暴露 `scrollTo` |
| 无障碍 | 键盘滚动与焦点（困难项文档声明限制） |
| 样式与主题 | 与 List 外观一致 |
| 文档与验证 | 可变高度、横向（若有） |

### 5.16 List

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 通用列表布局与加载更多 |
| DOM / 语义 | `ul`/`li` 或 `div`+role |
| 状态与交互 | `loading`、`pagination` 集成 |
| 数据与受控 | `dataSource` |
| API 要点 | `renderItem`、`header`、`footer` |
| 类型与 Ref | — |
| 无障碍 | 列表语义完整 |
| 样式与主题 | 分割线、紧凑模式 |
| 文档与验证 | 与 VirtualList 选型 |

### 5.17 Carousel

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 轮播图/内容 |
| DOM / 语义 | `region` `aria-roledescription=carousel` |
| 状态与交互 | `autoplay`、`dots`、`swipe` |
| 数据与受控 | `current` |
| API 要点 | `effect`、垂直轮播 |
| 类型与 Ref | 暴露 `goTo` |
| 无障碍 | 暂停自动播放控件；焦点可见 |
| 样式与主题 | 指示器位置 |
| 文档与验证 | 自适应高度、无缝循环 |

### 5.18 Image

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 图片懒加载、占位、预览入口 |
| DOM / 语义 | `img`；fallback |
| 状态与交互 | `loading` placeholder、`preview` |
| 数据与受控 | `src` |
| API 要点 | `width`/`height`、与 ImagePreview 联动 |
| 类型与 Ref | `HTMLImageElement` |
| 无障碍 | `alt` 必填约束（文档） |
| 样式与主题 | 圆角、object-fit |
| 文档与验证 | 失败 fallback、懒加载 |

---

## 6. Navigation

### 6.1 Tabs

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 标签页切换内容 |
| DOM / 语义 | `tablist` + `tabpanel` |
| 状态与交互 | `type` line/card、可编辑、滚动 |
| 数据与受控 | `activeKey` |
| API 要点 | `items`、`destroyInactive` |
| 类型与 Ref | — |
| 无障碍 | 方向键切换 tab |
| 样式与主题 | 指示条动画 |
| 文档与验证 | 嵌套、禁用项 |

### 6.2 Menu

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 导航菜单；侧栏 |
| DOM / 语义 | `menubar`/`menu`；子菜单 `aria-expanded` |
| 状态与交互 | 折叠、`openKeys`、`select` |
| 数据与受控 | `selectedKeys`、`openKeys` |
| API 要点 | `mode` inline/vertical、`items` |
| 类型与 Ref | — |
| 无障碍 | 方向键、Esc 关闭子菜单 |
| 样式与主题 | 折叠宽度、暗色侧栏 |
| 文档与验证 | 递归菜单、图标 |

### 6.3 Breadcrumb

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 层级路径导航 |
| DOM / 语义 | `nav` + `ol`；当前页 `aria-current=page` |
| 状态与交互 | 无 |
| 数据与受控 | `items` |
| API 要点 | `separator`、`itemRender` |
| 类型与 Ref | — |
| 无障碍 | 最后一项可非链接 |
| 样式与主题 | 分隔符 |
| 文档与验证 | 超长截断、配合路由 |

### 6.4 Dropdown

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 下拉菜单操作集合 |
| DOM / 语义 | `menu`；触发器 `button` |
| 状态与交互 | `open`、`placement`、子菜单 |
| 数据与受控 | `open` |
| API 要点 | `menu.items`、`dropdownRender` |
| 类型与 Ref | — |
| 无障碍 | 同 Menu 简化 |
| 样式与主题 | 与 Select 层级统一 |
| 文档与验证 | 右键菜单、禁用项 |

### 6.5 Steps

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 步骤条进度 |
| DOM / 语义 | `list`；每步 `aria-current` |
| 状态与交互 | `status` wait/process/finish/error |
| 数据与受控 | `current` |
| API 要点 | `direction`、`responsive` |
| 类型与 Ref | — |
| 无障碍 | 步骤文案可读 |
| 样式与主题 | 点与线颜色 |
| 文档与验证 | 竖向、错误态 |

### 6.6 Collapse

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 手风琴折叠面板 |
| DOM / 语义 | 头部 `button` `aria-expanded` |
| 状态与交互 | `accordion`、`ghost` |
| 数据与受控 | `activeKey` |
| API 要点 | `items`、`expandIcon` |
| 类型与 Ref | — |
| 无障碍 | 面板 `region` id 关联 |
| 样式与主题 | 边框与圆角 |
| 文档与验证 | 嵌套、受控多开 |

### 6.7 Tree

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 树形数据展示与勾选 |
| DOM / 语义 | `tree` `treeitem` |
| 状态与交互 | 展开/收起、拖拽（若有）、搜索 |
| 数据与受控 | `expandedKeys`、`selectedKeys`、`checkedKeys` |
| API 要点 | `fieldNames`、`showLine` |
| 类型与 Ref | 节点 key string |
| 无障碍 | WAI-ARIA Tree 键盘规范 |
| 样式与主题 | 缩进线 |
| 文档与验证 | 异步加载、虚拟树（若有） |

### 6.8 Anchor

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 页内锚点导航 |
| DOM / 语义 | `nav` 链接 `href=#id` |
| 状态与交互 | 滚动监听高亮 `active` |
| 数据与受控 | `activeLink` |
| API 要点 | `items`、`offsetTop`、`getContainer` |
| 类型与 Ref | — |
| 无障碍 | 跳过链接到主内容（文档建议） |
| 样式与主题 | 左侧指示条 |
| 文档与验证 | 滚动容器非 window |

### 6.9 Affix

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 固钉在视口某位置 |
| DOM / 语义 | 占位 + fixed 层 |
| 状态与交互 | `offsetTop`/`offsetBottom`、change 回调 |
| 数据与受控 | 无 |
| API 要点 | `target` scroll 容器 |
| 类型与 Ref | 被钉元素 ref |
| 无障碍 | 不改变焦点；避免遮挡固定工具栏 |
| 样式与主题 | z-index |
| 文档与验证 | 在 Modal 内、嵌套滚动 |

### 6.10 BackTop

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 返回顶部 |
| DOM / 语义 | `button` 或 `a href="#"` 策略固定 |
| 状态与交互 | 滚动阈值显示 |
| 数据与受控 | `visible` 可选受控 |
| API 要点 | `duration`、`target` |
| 类型与 Ref | — |
| 无障碍 | `aria-label` |
| 样式与主题 | 与 FloatButton 协调 |
| 文档与验证 | 自定义容器滚动 |

### 6.11 FloatButton

| 维度 | 方案要点 |
| --- | --- |
| 职责 | 悬浮一组操作 |
| DOM / 语义 | 容器 `fixed`；主按钮 `button` |
| 状态与交互 | 展开子项、`open` |
| 数据与受控 | `open` |
| API 要点 | `icon`、`tooltip`、`shape` 与 Button circle 对齐 |
| 类型与 Ref | — |
| 无障碍 | 每项 `aria-label`；Esc 收起 |
| 样式与主题 | 右下角安全区 |
| 文档与验证 | 与 BackTop 同显、拖拽（若有） |

---

## 7. 维护说明

- 新增组件时**复制本节对应类目下的一行表**，填全九维，再实现代码与 `docs/components/*.md`。
- 与全局规范冲突时以 **`TECHNICAL_PLAN.md`** 与 **`AGENTS.md`** 为准。
- 本文档为规格纲要；**具体 props 名称以源码与类型导出为准**，变更时同步更新本文与文档站 API 表。
