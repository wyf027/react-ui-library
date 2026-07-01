# Tag 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/data/Tag/Tag.tsx`

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Tag` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/data/Tag` |
| 分类 | Data |
| 依赖 | `cn` |
| 关联组件 | **`Badge`**（状态点/数字）、**`Button`**（可交互标签页签）、**`Card`/`Table`**（元信息展示） |

---

## 2. 目标与非目标

### 2.1 目标

1. **行内标签外观**：**`<span>`**、**`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium`**。  
2. **四色语义**：**`color?: 'default' | 'success' | 'warning' | 'danger'`**（默认 **`default`**），分别映射 **slate / emerald / amber / red** 的 **边框 + 浅底 + 字色**（**组件内联 Tailwind**，**未** 走 **`componentTokens`**）。  
3. **内容与透传**：**`children`** 与 **`HTMLAttributes<HTMLSpanElement>`** 其余属性经 **`{...props}`** 落在 **`span`** 上（**`className` 经 `cn` 合并在后**）。

### 2.2 非目标

1. **可关闭 `closable`、关闭回调、内置 `×`**：当前 **无**。  
2. **`icon` 槽、链接态 `href` 专用变体**：当前 **无**；需 **`asChild`/`component` 模式** 时 **演进** 或 **业务包一层 `a`/`Link`**。  
3. **暗色专用 `dark:` 色板**：当前 **`color` 映射** **无** **`dark:`** 分支（见 §10）。  
4. **与 `Badge` API 统一**：**`Badge`** 使用 **`badgeStatusBgClass`** 等 **token**；**`Tag`** **独立色组**。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 分类、状态、环境标签 | 如 **「已发布」**、**「Beta」**；**非** 主要操作入口时 **用 `Tag` 优于 `Button`**。 |
| 与 **`Badge`** 选型 | **`Badge`** 更偏 **计数/点**；**`Tag`** 偏 **可读短文案胶囊**。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 根 | **`<span ref={ref} className={cn(...)} {...props}>`** |
| 子内容 | **`children`** 由 **`...props`** 提供（**解构未单独列出 `children`**，**仍在 `props` 中**） |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| 状态 | **无** 内部 state。 |
| 交互 | **默认不可聚焦**（**`span`**）；若需 **键盘操作** 应 **`tabIndex`/`role`** 由 **业务经 `props` 传入** 或 **外层 `button`**（**注意** **嵌套交互规范**）。 |

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| 数据 | **无** `value`/`onChange`；**纯展示**（**除非** 子节点为 **交互组件**）。 |

---

## 7. API 规范

### 7.1 `TagProps`（当前实现）

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `color` | 语义色 | `'default' \| 'success' \| 'warning' \| 'danger'` | `'default'` | |
| `className` | 追加样式 | `string` | - | |
| `children` | 标签文案 | `ReactNode` | - | 经 **`...props`** |
| 继承 | `HTMLAttributes<HTMLSpanElement>` | - | - | **`{...props}` 在 `cn` 之后** |

### 7.2 视觉（`color` 映射摘要）

| `color` | 语义（边框/背景/字） |
| --- | --- |
| `default` | slate |
| `success` | emerald |
| `warning` | amber |
| `danger` | red |

### 7.3 建议演进（可选）

| 能力 | 优先级 |
| --- | --- |
| **`dark:` 与 `componentTokens` 对齐 `Badge`** | P2 |
| **`closable` + `onClose`** | P2 |
| **`asChild`（Radix）或 `component` prop** | P3 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| Ref | **`forwardRef<HTMLSpanElement, TagProps>`** → **`span`** |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| 纯文案 | **默认可读**；**无** **`role`**。 |
| 若表示 **选中/过滤** | 建议 **`role`/`aria-pressed`/`aria-selected`** 由 **业务** 与 **`Button`/`Toggle`** 模式 **选型**，**勿** 滥用 **`span` 假按钮**。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 亮色系 | **浅底 + 深色字**，**暗色页面** 上 **对比依赖业务 `className` 覆盖** 或 **演进 `dark:`**。 |
| 形状 | **全圆角 pill**（**`rounded-full`**）。 |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| **`{...props}` 含 `className`** | **后者覆盖** 合并类名中 **同名 Tailwind 工具** 的 **右侧优先**（**`cn` 习惯**）；**`color` 与 `className` 颜色冲突** 时 **以最终 `className` 为准**。 |
| **与 `Link` 组合** | **`<Link><Tag>...</Tag></Link>`** 或 **`Tag` 内只放文本** 由 **设计** 决定；**避免** **`span` 套可交互块** **非法/难用** 结构。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| 渲染 | **`children`** 文本、**`color`** 四类 **类名/快照**。 |
| Ref | **`HTMLSpanElement`**。 |

（仓库 **当前无** `Tag.test.tsx`；以上为建议用例。）

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | 四 **`color`**、**长文案折行**、与 **列表字段** 组合。 |
| 说明 | **无 closable**、**无 `dark:`**、**与 `Badge` 差异**。 |

---

## 14. 风险与开放问题

| 风险 | 说明 |
| --- | --- |
| **色板分散** | **未** 使用 **`componentTokens`**，**与 `Badge`/Alert token** **漂移风险**。 |
| **暗色对比** | **无 `dark:`**，**暗色主题** 可能 **过亮或对比不足**。 |

---

## 15. 结论

`Tag` 为 **小号圆角胶囊 `span` + 四档 `color` + 全量 `span` 属性透传** 的轻量标签；**无状态、无关闭、无暗色 token**。与 **Button** 无继承关系；适合 **静态元信息** 展示。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | Tag 结论 |
| --- | --- |
| 职责 | 行内语义标签 |
| DOM/语义 | span |
| 状态与交互 | 无 |
| 数据与受控 | 无 |
| API | color、HTML 透传 |
| 类型与 Ref | HTMLSpanElement |
| 无障碍 | 纯展示；交互需业务 |
| 样式与主题 | 四色浅底、无 dark |
| 文档与验证 | Badge 对比、closable 缺口 |

---

## 附录 B：参考实现片段（当前仓库）

文件：`packages/ui/src/components/data/Tag/Tag.tsx`。

要点：**`inline-flex rounded-full`**、**`color` 对象映射**、**`{...props}`**。

（以仓库实际代码为准。）
