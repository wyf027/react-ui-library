# Spin 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/feedback/inline/Spin/Spin.tsx`

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Spin` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/feedback/inline/Spin` |
| 分类 | Feedback |
| 依赖 | `cn` |
| 关联组件 | **`Loading`**（行内、`border-current`、**无遮罩**）、**`Skeleton`**（结构占位） |

---

## 2. 目标与非目标

### 2.1 目标

1. **双形态**：  
   - **无 `children`**：**`spinning`**（默认 **`true`**）为 **`true`** 时渲染 **仅含转圈（+ 可选 `tip`）** 的 **`inline-flex` 容器**；**`spinning === false`** 时 **`return null`**。  
   - **有 `children`**：外层 **`relative`**，**`children` 始终渲染**；**`spinning`** 为 **`true`** 时叠加 **`absolute inset-0`** 半透明遮罩 + **居中 `spinner`**（**阻挡与背后内容交互**）。  
2. **转圈视觉**：**`animate-spin` + `rounded-full` + `border-2 border-brand-500 border-r-transparent`**（**品牌色固定**，与 **`Loading` 的 `border-current`** 不同）。  
3. **三档尺寸**：**`size?: 'sm' | 'md' | 'lg'`**（默认 **`'md'`**）→ **`h-4 w-4` / `h-6 w-6` / `h-8 w-8`**（**与 `Loading` 的 sm/md/lg 数值不完全一致**）。  
4. **可选 `tip`**：**`ReactNode`**，置于 **转圈下方**（**`flex-col gap-2`**）。  
5. **根透传**：**`HTMLAttributes<HTMLDivElement>`** 落在 **实际渲染的外层 `div`**（**`{...props}` 在 `className` 之后**）。

### 2.2 非目标

1. **`role="status"` / `aria-live` / `aria-busy`**：当前 **未** 在实现中声明（与 **`Loading`** 对比）。  
2. **全屏 `fixed` Spin**：当前 **仅** `relative` **容器内** 遮罩；**全页** 需业务 **`fixed` 包裹** 或演进。  
3. **`delay`、防闪烁阈值**：当前 **无**。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 表格/卡片 **内容区加载** | **传 `children`** + **`spinning={loading}`**，加载中 **遮罩防误点**。 |
| 按钮旁或小占位 | **不传 `children`**，**仅转圈**（与 **`Loading`** 选型： **`Spin` 品牌环 + 可选遮罩模式**）。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| **无 `children` 且 `spinning`** | **`<div ref={ref} className={cn('inline-flex items-center justify-center', className)} {...props}>`** → 内 **`spinner`**（**`flex-col` 块**）。 |
| **无 `children` 且 `!spinning`** | **`null`** |
| **有 `children`** | **`<div ref={ref} className={cn('relative', className)} {...props}>`** → **`{children}`**；若 **`spinning`**：**`<div className="absolute inset-0 flex items-center justify-center rounded bg-white/60 dark:bg-slate-900/60">`** **`{spinner}`** |
| **`spinner` 内** | **转圈 `span`** + **条件 `tip` `span`** |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| 状态 | **无** `useState`；**`spinning` 全由 props**。 |
| 有子遮罩 | **遮罩无 `pointer-events-none`** — **加载中点击由遮罩承接**，**背后 `children` 不可点**（**常见期望**）。 |

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| **`spinning`** | **受控语义**；**默认 `true`**（**无子** 时 **首屏即转圈**；**有子** 时 **默认遮罩**，需注意 **初始 `false` 才显示内容无遮罩**）。 |

---

## 7. API 规范

### 7.1 `SpinProps`（当前实现）

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `spinning` | 是否显示加载 | `boolean` | `true` | **无子且 `false`** → **`null`** |
| `size` | 转圈尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` | |
| `tip` | 转圈下方说明 | `ReactNode` | - | |
| `children` | 被包裹内容 | `ReactNode` | - | **有** 则走 **遮罩模式** |
| `className` | 根容器 | `string` | - | **`inline-flex` vs `relative`** 二选一 |
| 继承 | `HTMLAttributes<HTMLDivElement>` | - | - | |

### 7.2 与 `Loading` 对照（摘要）

| 项 | `Spin` | `Loading` |
| --- | --- | --- |
| 环色 | **`border-brand-500`** | **`border-current`** |
| **`md` 尺寸** | **`h-6 w-6`** | **`h-5 w-5`** |
| 遮罩 | **有 `children` 且 `spinning` 时** | **无** |
| 读屏 | **未设** `role="status"` | **`role="status"` + `polite`** |

### 7.3 建议演进（可选）

| 能力 | 优先级 |
| --- | --- |
| **`aria-busy={spinning}` 于根、`role="status"`** | P2 |
| **`pointer-events` 策略可配**（如 **仅视觉不挡点击**） | P3 |
| **`delay`** | P3 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| Ref | **`forwardRef<HTMLDivElement, SpinProps>`** → **有渲染时的根 `div`**；**无子且 `!spinning`** 时 **`null`** **无 DOM** **无 `ref`**。 |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| 当前 | **无** **`aria-busy`**、**无** **`role="status"`**；**`tip` 与转圈** 为 **纯视觉**。 |
| 建议 | 业务在 **包裹表单/表格根** 加 **`aria-busy={spinning}`**；或演进 **组件内默认**。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 遮罩 | **`bg-white/60 dark:bg-slate-900/60`** + **`rounded`**（**随子容器圆角裁切** 依赖 **子元素** 是否圆角）。 |
| 品牌 | 环 **固定 brand**，**暗色下仍 brand**（**与 slate `tip` 字色** 搭配）。 |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| **`children` 为可滚动区域** | **遮罩 `inset-0`** 盖在 **子根上**；**内部滚动条** 可能被遮罩 **盖住无法操作** — **加载中** 一般 **可接受**；需 **滚动加载更多** 时 **谨慎** 或 **`spinning` 分段**。 |
| **`{...props}`** | 可含 **`style`/`onClick`** 等；**勿** 误覆盖 **`ref`** 合并行为（**单 ref**）。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| **无子** | **`spinning`** 显/隐；**`null`** 分支。 |
| **有子** | **`spinning`** 遮罩出现/消失；**`children` 仍挂载**。 |
| **`size`/`tip`** | 类名与 **文案** 渲染。 |

（仓库 **当前无** `Spin.test.tsx`；以上为建议用例。）

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | **卡片包内容**、**仅转圈**、**`tip`**、**`spinning` 切换**。 |
| 说明 | **与 `Loading` 差异**、**`spinning` 默认 `true`**、**a11y 建议**、**无子 `false` 为 `null`**。 |

---

## 14. 风险与开放问题

| 风险 | 说明 |
| --- | --- |
| **`spinning` 默认 `true`** | **有 `children`** 时 **默认遮罩整块** — **若未传 `spinning={false}`** 易 **误以为白屏/卡死**。 |
| **无读屏忙碌语义** | 读屏用户 **不易感知** 区域进入加载。 |
| **`ref` 在无子且 `spinning=false`** | **`null`** **无附着节点**。 |

---

## 15. 结论

`Spin` 为 **品牌色转圈 + 可选 `tip` + 无子纯转圈或有子遮罩** 的加载组件；**遮罩模式** 适合 **块级内容防交互**。与 **Button** 无继承关系；**a11y 与 `Loading` 不对齐**，**`spinning` 默认 `true`** 为集成时的 **首要心智点**。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | Spin 结论 |
| --- | --- |
| 职责 | 转圈 + 可选块遮罩 |
| DOM/语义 | relative + absolute 遮罩或纯 inline-flex |
| 状态与交互 | spinning；遮罩挡点击 |
| 数据与受控 | spinning prop |
| API | size、tip、children |
| 类型与 Ref | HTMLDivElement；null 无 ref |
| 无障碍 | 弱；无 busy |
| 样式与主题 | brand 环、半透明遮罩 |
| 文档与验证 | 默认 true、对比 Loading |

---

## 附录 B：参考实现片段（当前仓库）

文件：`packages/ui/src/components/feedback/inline/Spin/Spin.tsx`。

要点：**`!children` 分支**、**`absolute inset-0` 遮罩**、**`border-brand-500`**。

（以仓库实际代码为准。）
