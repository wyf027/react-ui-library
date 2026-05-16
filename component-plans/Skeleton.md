# Skeleton 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/feedback/inline/Skeleton/Skeleton.tsx`

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Skeleton` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/feedback/inline/Skeleton` |
| 分类 | Feedback |
| 依赖 | `cn` |
| 关联组件 | **`Loading`/`Spin`**（转圈占位）、**`Card`/`List`**（骨架包裹真实内容） |

---

## 2. 目标与非目标

### 2.1 目标

1. **加载态占位**：**`loading === true`**（默认）时渲染 **灰块组合**（**可选头像圆 + 标题条 + 多行段落条**）；**`loading === false`** 时 **仅渲染 `children`**（**真实内容**）。  
2. **组合开关**：**`avatar`**、**`title`**（**布尔**，与 HTML **`title` 属性冲突故 `Omit`**）、**`paragraph`**（**`boolean` 或 `{ rows?: number }`**）。  
3. **脉冲动画**：**`active`**（默认 **`true`**）时各占位条附加 **`animate-pulse`**。  
4. **行数规则**：**`paragraph === true`** → **3 行**；**`paragraph === { rows: n }`** → **`rows ?? 3`**；**`paragraph === false`** → **0 行**。  
5. **末行宽度**：段落最后一行 **`style={{ width: '60%' }}`**，其余 **`100%`**。  
6. **根布局**：**`flex gap-4`**，左侧 **头像**、右侧 **`flex-1 space-y-3`** 放 **标题条 + 段落区**。

### 2.2 非目标

1. **`loading=false` 时转发 `ref` 到子节点**：当前 **`return <>{children}</>`**，**`forwardRef` 的 `ref` 不附着任何 DOM**（见 §8、§14）。  
2. **`aria-busy`、骨架与真实 DOM 同高精确匹配、 shimmer 渐变**：当前 **无**。  
3. **任意形状 slot**：仅 **预设头像/标题/段落** 布局，**非** 通用 **SVG path** 骨架。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 列表/卡片 **首屏数据未到** | **`loading`** 与请求状态绑定；**成功后 `loading={false}`** 展示 **`children`**。 |
| 与 **`Spin`** 选型 | **`Spin`**：**小区域转圈**；**`Skeleton`**：**结构预占位**，减少 **布局跳动**。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| **`loading`** | **`false`**：**`<>children</>`**（**Fragment**，**无包裹**）。 |
| **`loading`** | **`true`**：**`<div ref={ref} className={cn('flex gap-4', className)} {...props}>`** |
| 头像 | **`avatar`**：**`<div className="h-10 w-10 shrink-0 rounded-full bg-slate-200 dark:bg-slate-700" />`** |
| 标题条 | **`title`**：**`<div className="h-4 w-2/5 rounded bg-slate-200 dark:bg-slate-700" />`** |
| 段落 | **`rows` 次**：**`<div className="h-3 rounded ..." style={{ width }} />`**，**`key={i}`** |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| 状态 | **无** `useState`；**`loading` 完全由 props** 决定分支。 |
| 交互 | **占位 `div`** **无** 交互；**`children`** 仅在 **`loading=false`** 时 **可交互**。 |

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| **`loading`** | **受控语义**：父组件 **`loading`** 切换 **占位 vs 内容**；**默认 `true`**。 |
| **`title`/`paragraph`/`avatar`/`active`** | 均由 **props** 配置，**无** 内部派生状态。 |

---

## 7. API 规范

### 7.1 `SkeletonProps`（当前实现）

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `loading` | 是否显示骨架 | `boolean` | `true` | **`false`** 时 **只渲染 `children`** |
| `active` | 是否脉冲动画 | `boolean` | `true` | **`animate-pulse`** |
| `avatar` | 是否左侧圆形头像位 | `boolean` | `false` | |
| `title` | 是否标题横条 | `boolean` | `true` | **与 HTML `title` 冲突已 Omit** |
| `paragraph` | 段落行 | `boolean \| { rows?: number }` | `true` | 见 §2.1 行数规则 |
| `children` | 加载完成内容 | `ReactNode` | - | **`loading=false` 时展示** |
| `className` | 根容器（仅 `loading`） | `string` | - | |
| 继承 | `Omit<HTMLAttributes<HTMLDivElement>, 'title'>` | - | - | **`boolean` 专用 `title`** |

### 7.2 视觉（摘要）

| 区域 | 类名要点 |
| --- | --- |
| 占位色 | **`bg-slate-200 dark:bg-slate-700`** |
| 标题宽 | **`w-2/5`**（依赖 **Tailwind 配置** 是否识别该宽度工具类） |

### 7.3 建议演进（可选）

| 能力 | 优先级 |
| --- | --- |
| **`loading=false` 时 `ref` 合并到单子或文档化「无 ref」** | P1 |
| **`aria-busy={loading}`、占位区 `aria-hidden`** | P2 |
| **`prefers-reduced-motion` 关闭 pulse** | P2 |
| **自定义行高/圆角 token** | P3 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| **`loading=true`** | **`ref` → 根 `div`** |
| **`loading=false`** | **`ref` 不绑定**（**Fragment** **不支持** `ref`）— **与 `forwardRef` 类型声明不一致** 的运行时行为。 |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| 占位块 | **无** **`aria-hidden`**、**无** **`role="img"`** 文案；读屏可能 **遍历空块** 或 **静默**（依 UA）。 |
| **`aria-busy`** | **未** 设置在根或 **`children`** 容器；**建议** 业务在外层 **`aria-busy={loading}`**。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 暗色 | **`dark:bg-slate-700`** 与 **`Loading`** 等 **slate 占位** 一致。 |
| 动画 | **`animate-pulse`**（**`active`**）。 |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| **`children` 与骨架同树** | **`loading=true`** 时 **`children` 不渲染**；**避免** 在 **`children`** 里做 **昂贵副作用** 仅在 **`loading=false`** 时需要执行（**应** 由父 **条件挂载**）。 |
| **`{...props}`** | 落在 **`loading`** 时的 **根 `div`**；**`loading=false`** 时 **不应用**。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| **`loading`** | **`false`** 仅 **`children`**、**无** 灰块。 |
| **`paragraph`** | **`false`** 无行；**`{ rows: 5 }`** 五行；**末行 60% 宽**。 |
| **`avatar`/`title`/`active`** | 类名与 **pulse** 存在性。 |
| **`ref`** | **`loading=true`** 可 **`ref` 到 div`**；**`false`** 行为与类型 **文档化**。 |

（仓库 **当前无** `Skeleton.test.tsx`；以上为建议用例。）

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | **列表卡片**、**`paragraph.rows`**、**`avatar`**、**`loading` 切换**。 |
| 说明 | **`loading=false` 与 `ref`**、**`w-2/5` 构建配置**、**a11y 建议**。 |

---

## 14. 风险与开放问题

| 风险 | 说明 |
| --- | --- |
| **`ref` 丢失** | **`loading=false`** 时 **测量/聚焦** 依赖 **`ref`** 的代码 **失效**。 |
| **`w-2/5`** | 若 **Tailwind/JIT** 未生成该类，**标题条宽度** 可能 **不符合预期**；需 **构建产物或设计 token 校验**。 |
| **`key={i}`** | 骨架行 **静态**，**可接受**；若未来 **行内容动态** 再评估。 |

---

## 15. 结论

`Skeleton` 为 **`loading` 门控** 的 **头像+标题+段落灰块** 占位，**`active` 脉冲**、**`dark:`** 支持；**`loading=false` 直接 Fragment 渲染 `children`** 导致 **`ref` 与根 `className`/`...props` 均不生效**。与 **Button** 无继承关系；演进重点为 **ref/a11y/reduced-motion**。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | Skeleton 结论 |
| --- | --- |
| 职责 | 结构占位，loading 切换 children |
| DOM/语义 | div 占位块或 Fragment+children |
| 状态与交互 | 无内部 state |
| 数据与受控 | loading 及布尔组合 |
| API | avatar、title、paragraph、active |
| 类型与 Ref | loading 时 div；false 无 ref |
| 无障碍 | 弱；无 aria-busy |
| 样式与主题 | slate + pulse + dark |
| 文档与验证 | ref、w-2/5、children 挂载 |

---

## 附录 B：参考实现片段（当前仓库）

文件：`packages/ui/src/components/feedback/inline/Skeleton/Skeleton.tsx`。

要点：**`if (!loading) return <>{children}</>`**、**`rows` 计算**、**`animate-pulse`**、**末行 `width: 60%`**。

（以仓库实际代码为准。）
