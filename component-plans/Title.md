# Title 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/basic/Typography/Typography.tsx`（`Title` 与 `Text`、`Paragraph` 同文件导出）

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Title` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/basic/Typography` |
| 分类 | Basic（Typography 子集） |
| 依赖 | `cn`（`utils/cn`） |
| 关联组件 | `Text`、`Paragraph`、`Divider`、`Card`（标题区）、`Modal`/`Drawer`（`title` 区若改用 Title） |

---

## 2. 目标与非目标

### 2.1 目标

1. **语义化标题**：通过 `level` 映射到 **`h1`–`h5`**，便于 SEO 与读屏理解文档结构。  
2. **字阶与字重统一**：在亮/暗模式下使用一致的标题字号、字重与字距。  
3. **可扩展样式**：支持 `className` 覆盖；与 Tailwind 设计 token 对齐。  
4. **原生属性透传**：支持 `id`（锚点）、`title`（原生提示）等 `HTMLHeadingElement` 常用属性。

### 2.2 非目标（当前阶段可不实现）

1. **自动校正整页标题层级**（应由页面/layout 或 eslint 插件约束，而非 Title 组件内推断）。  
2. **富文本编辑**（Markdown/HTML 字符串渲染）不作为 Title 核心能力。  
3. **与路由标题同步**：由应用层或 meta 方案处理。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 页面主标题 | `level={1}`，整页建议唯一 `h1`（文档约定）。 |
| 区块/卡片标题 | `level={2|3}`，与 `Card` 的 `title` 二选一或组合时避免重复 `h*` 嵌套混乱。 |
| 模态/抽屉标题 | 若用 `Title` 替代纯字符串 `title`，注意 `Modal` 已有 `role="dialog"` 与标题关联（`aria-labelledby`）需在 Modal 侧配置。 |
| 侧栏分组标题 | `level={4|5}` 小标题，保持视觉层级略低于导航品牌字。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 根元素 | **动态标题标签**：`level` 为 `1`–`5` 时分别渲染 **`h1`–`h5`**（当前实现：`const Tag = \`h${level}\``）。 |
| 默认层级 | **`level` 默认 `2`**（`h2`），适合多数「非页面根」的章节标题，减少误用唯一 `h1`。 |
| 子内容 | `children` 为标题文本或内联元素（如 `code`、小 `Badge`）；避免块级大段正文塞入标题。 |
| `role` | 不覆盖原生标题角色；除非未来支持 `Component="div" + role=heading aria-level`（非默认路径）。 |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| 内置状态 | **无** loading/disabled/open 等。 |
| 交互增强（可选演进） | `copyable` 点击复制、`editable` 等若引入，需独立键盘与 a11y 设计，并写入大版本说明。 |

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| 业务数据 | **无** value/onChange；纯展示。 |
| 内容来源 | 仅 `children`；动态标题由父级传入字符串或节点。 |

---

## 7. API 规范

### 7.1 当前实现对照

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `level` | 标题级别，决定标签与字号 | `1 \| 2 \| 3 \| 4 \| 5` | `2` | 与 `h*` 一一对应 |
| `ellipsis` | 单行省略 **`min-w-0 truncate`**；**`children` 为 string** 且未显式 **`title`** 时写入原生 **`title`** | `boolean` | `false` | |
| `children` | 标题内容 | `ReactNode` | - | 必填（无 children 时为空标题，文档标注反模式） |
| `className` | 根样式扩展 | `string` | - | 与 `cn` 合并于预设字阶之后 |
| 其余 | 继承 `HTMLAttributes<HTMLHeadingElement>` | - | - | 如 `id`、`style`、`onClick`（不推荐用于大段可点区域） |

### 7.2 与字阶映射（当前实现）

| `level` | 标签 | Tailwind 字号类（当前） |
| --- | --- | --- |
| 1 | `h1` | `text-3xl` |
| 2 | `h2` | `text-2xl` |
| 3 | `h3` | `text-xl` |
| 4 | `h4` | `text-lg` |
| 5 | `h5` | `text-base` |

公共样式（当前）：`font-semibold tracking-tight text-slate-900 dark:text-slate-100`。

### 7.3 建议演进（可选）

| 属性 | 说明 | 优先级 |
| --- | --- | --- |
| `type` / `variant` | 主次标题色（如次要标题 `text-slate-600`） | P2 |
| `underline` / `delete` | 与 Ant Typography 对齐的装饰（慎用） | P3 |
| `Component` | 多态根元素（仅样式为标题时） | P3，a11y 需 `role="heading"` + `aria-level` |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| 接口 | **`TitleProps extends HTMLAttributes<HTMLHeadingElement>`**，扩展 **`level`**、**`ellipsis`**。 |
| Ref | `forwardRef<HTMLHeadingElement, TitleProps>`；`ref` 指向实际 `h1`–`h5`。 |
| 多态 `Tag` | 类型上 `level` 收窄保证 `Tag` 属于 `h1`|`h2`|…；避免 `level` 与非法字符串。 |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| 标题层级 | **页面级**：建议全页仅一个 `h1`；`Title` 不强制校验，**文档与示例**需明确最佳实践。 |
| 跳级 | 避免从 `h1` 直接跳到 `h4` 等跳级结构；侧栏与主内容区分别规划层级。 |
| 可见性与对比度 | 当前 `text-slate-900` / `dark:text-slate-100` 需在背景上满足 WCAG 对比度（一般由页面背景保证）。 |
| 模态标题 | 若在 `Modal` 内使用 `Title`，应保证 `Modal` 的 `aria-labelledby` 指向该标题 `id`。 |
| 可点击标题 | 若整标题为链接，优先结构为 `h2` 内包 `a` 或使用外层带 heading 的 pattern；避免仅用 `div` 模拟。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 字重/字距 | `font-semibold tracking-tight` 为品牌标题基线。 |
| 颜色 | 语义色走 slate 阶梯；演进时可对接 `NovaThemeTokens` 的 heading 色键。 |
| 响应式 | 可选：小屏降低 `text-3xl`→`text-2xl` 等，通过 `className` 或组件 `responsiveLevel`（演进）实现。 |
| 与 `Text` / `Paragraph` | `Text` 为正文辅助、`Paragraph` 为段落；Title 仅负责标题字阶，三者在文档中给出排版组合示例。 |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| `Container` + `Title` | 页面顶栏标题区常用。 |
| `Card` | `Card` 若自带 `title` 字符串，与 `Title` 二选一，避免双标题语义。 |
| `Divider` | 标题下分割线时保持间距 token 一致。 |
| `Space` / `Flex` | 标题与操作区（Button）横向排列时对齐 `items-center`。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| 渲染 | `level={3}` 渲染 `h3`，且包含对应 `text-xl` 类（或快照）。 |
| 默认 | 无 `level` 时为 `h2`。 |
| Ref | `ref.current?.tagName === 'H2'`（默认场景）。 |
| className | 合并顺序：预设在前或在后与项目约定一致（当前 `className` 在后，便于覆盖）。 |
| a11y | 与 eslint `jsx-a11y/heading-has-content` 等规则兼容（children 非空）。 |

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | `level` 1–5 展示、暗色模式、与 `Text`/`Paragraph` 组合、与 `Card` 对比。 |
| API 表 | 与 §7 一致。 |
| 最佳实践 | 单页 `h1`、`Modal` 内标题与 `aria-labelledby`、不要跳级。 |

---

## 14. 风险与开放问题

| 风险 | 缓解 |
| --- | --- |
| 多处 `level={1}` | 文档强调；可选提供 `Title` 的 dev-only 警告（成本高，一般不做）。 |
| `Card` 与 `Title` 重复语义 | 文档说明择一；或 Card 使用 `div`+样式而非 `h*`。 |
| `level` 与视觉稿不一致 | 提供设计 token 对照表（Figma 字阶 ↔ `level`）。 |

---

## 15. 结论

`Title` 定位为 **语义化、可预测字阶的标题组件**，通过 `level` 绑定 **`h1`–`h5`**，与 **Button** 同属基础展示层：无业务状态，**无障碍与信息架构强依赖使用方式**。当前实现已满足最小可用；演进以 `variant`、截断、主题 token 为主，避免破坏现有 `level` 语义。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | Title 结论 |
| --- | --- |
| 职责 | 页面/区块标题，建立文档大纲 |
| DOM/语义 | `h1`–`h5` 由 `level` 决定 |
| 状态与交互 | 无内置 |
| 数据与受控 | 无 |
| API | `level`、`children`、`className` + 原生标题属性 |
| 类型与 Ref | `HTMLHeadingElement` |
| 无障碍 | 层级不跳级、单 `h1`、与 Modal 标签关联 |
| 样式与主题 | 字阶/字重/深浅色 slate |
| 文档与验证 | level 全表 + 排版组合 + 反模式说明 |

---

## 附录 B：参考实现片段（当前仓库）

文件：`packages/ui/src/components/basic/Typography/Typography.tsx`。

要点：

- `Title` 使用 `forwardRef<HTMLHeadingElement, TitleProps>`。  
- `level` 默认 `2`，动态组件 `Tag` 为 `h1`…`h5`。  
- 样式：`font-semibold tracking-tight text-slate-900 dark:text-slate-100` + 按 `level` 映射字号类。

（以仓库实际代码为准。）
