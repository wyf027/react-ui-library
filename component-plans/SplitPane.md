# SplitPane 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/layout/SplitPane/SplitPane.tsx`

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `SplitPane` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/layout/SplitPane` |
| 分类 | Layout |
| 依赖 | `cn`；内联 `style.gridTemplateColumns` |
| 关联组件 | **`Container`**、`**Row`/`Col`**（选型对照）、**`Resizable`** 类能力（若未来演进） |

---

## 2. 目标与非目标

### 2.1 目标（与当前实现对齐）

1. **双栏主从布局**：左右（逻辑上）两区，使用 **CSS Grid** 两列排布。  
2. **可配置列宽比例**：通过 **`ratio`** 传入 **`grid-template-columns`** 合法值（默认 **`1fr 1fr`** 等分）。  
3. **溢出安全**：左右槽容器均带 **`min-w-0`**，避免子内容（表格、长文）撑破栅格轨道。  
4. **槽间距**：根使用 **`gap-3`**（与 `ratio` 独立，固定 Tailwind 间距）。

### 2.2 非目标（当前版本）

1. **可拖拽调整比例**、**双窗分割线按钮**、**键盘步进**：当前源码**未实现**；若产品需要，见 §7.4 演进。  
2. **上下分栏**：当前仅两列 Grid，**无 `vertical`/`orientation` prop**；可用 `ratio` 写自定义模板 + 外层旋转或另组件承担。  
3. **三栏及以上**：当前固定 **两槽** `left`/`right`；多栏请用 `Grid` 或布局组合。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 列表 + 详情 | 左侧列表窄、右侧详情宽：`ratio="minmax(280px,0.35fr) 1fr"` 等。 |
| 表单 + 预览 | 左编辑右只读预览。 |
| 文档 + 目录 | 比例由设计给定字符串。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 根元素 | **`div`** + `grid` + `gap-3`；**`style.gridTemplateColumns = ratio`**。 |
| 子结构 | 两个 **`div`** 包裹 **`left`**、**`right`**，类名 **`min-w-0`**；无独立「分割条」DOM。 |
| 语义 landmark | 若左为导航右为主内容，应在 **`left`/`right` 插槽内** 使用 `nav`/`main`/`aside`，**不由 SplitPane 根强加 role**。 |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| 内置状态 | **无**；比例为静态字符串，无 drag state。 |
| 用户调整比例 | 当前不支持；由父级 `state` 改 `ratio` 可实现「受控比例」（仍无拖拽条）。 |

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| 业务数据 | **无**；`left`/`right` 为展示插槽。 |
| 受控比例 | 父组件传入不同 **`ratio`** 字符串即可；组件内部不持有比例 state。 |

---

## 7. API 规范

### 7.1 当前实现对照

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `left` | 左槽内容 | `ReactNode` | **必填** | 第一列 |
| `right` | 右槽内容 | `ReactNode` | **必填** | 第二列 |
| `ratio` | 列模板 | `string` | `'1fr 1fr'` | 写入 **`gridTemplateColumns`** |
| `className` | 根容器类名 | `string` | - | 与 `grid gap-3` 合并 |
| 其余 | `HTMLAttributes<HTMLDivElement>` | - | - | 含 `style`：与内联 `gridTemplateColumns` 合并时注意覆盖顺序 |

### 7.2 `style` 与内联列模板（实现注意）

当前实现：

```tsx
style={{ gridTemplateColumns: ratio }}
```

若调用方传入 **`style={{ gridTemplateColumns: '...' }}`**，展开顺序为 **`{ ...props }`** 在 React 中若 `style` 在 props 里且后合并，需以**实际解构顺序**为准——当前为 **`style` 仅来自内部**，`...props` 在 `style` 之后则用户 `style` 可覆盖整个 `style` 对象**取决于是否从 props 解构出 style**。当前代码**未单独解构 `style`**，故 **`...props` 中的 `style` 会覆盖**内联对象中的 `gridTemplateColumns`**（因后者先写进对象，props 整包展开在后时… 实际上 `style={{ gridTemplateColumns: ratio }}` 是固定属性，`**props` 若含 `style` 会覆盖整个 `style`**）。  

**结论**：调用方若传 `style`，会**整体替换**根上 `style`，**可能丢失 `gridTemplateColumns`**。文档应建议：**改比例用 `ratio`**；若必须传 `style`，需自行包含 `gridTemplateColumns` 或与 `className` 使用任意值列模板。可选演进：`**style` 合并** `{ gridTemplateColumns: ratio, ...userStyle }`。

### 7.3 `ratio` 合法值示例

| 场景 | 示例字符串 |
| --- | --- |
| 等分 | `1fr 1fr`（默认） |
| 左窄右宽 | `280px 1fr` |
| 左宽右窄 | `2fr 1fr` |
| 最小宽度 + 弹性 | `minmax(240px, 30%) 1fr` |

语法须符合 [CSS grid-template-columns](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns)。

### 7.4 建议演进（可选）

| 能力 | 说明 | 优先级 |
| --- | --- | --- |
| `style` 深度合并 | 保留 `gridTemplateColumns` 与用户 `style` | P1 |
| 拖拽分割条 | `onResize`、`defaultSize`、Splitter `button`+a11y | P2 |
| `vertical` | `gridTemplateRows` + 两行槽 | P2 |
| `resizable` | 与浏览器 `ResizeObserver` 或第三方库集成 | P2 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| 接口 | `SplitPaneProps extends HTMLAttributes<HTMLDivElement>`，扩展 **`left`**、**`right`**、**`ratio`**。 |
| Ref | `forwardRef<HTMLDivElement, SplitPaneProps>`，指向**外层 grid 根**。 |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| 无分割条 | 当前**无可聚焦分割条**；无键盘比例调整。 |
| 阅读顺序 | DOM 顺序为 **左 → 右**，与视觉一致；RTL 时由页面 `dir` 与 Grid 行为决定，需业务验证。 |
| 插槽内容 | 左列表若为一组链接，用 `nav`+列表语义；右详情 `main` 等。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 间距 | 固定 **`gap-3`**；与 `Container` padding 叠加时注意总留白。 |
| 与 `Grid` | `Grid` 为通用 `cols`+`gap`；`SplitPane` 为**固定双槽 API**，降低「左右布局」心智成本。 |
| 与 `Row`+`Col` | Flex 百分比分栏；`SplitPane` 用 **Grid + `ratio` 字符串**，更适合 **`minmax`/`fr`** 混合。 |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| `Container` → `SplitPane` | 限制最大宽度内双栏。 |
| 左 `Table` 右表单 | 左槽 `min-w-0` 已具备；表格列宽与 `ratio` 一起调。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| 默认 | `grid`、`gap-3`、`gridTemplateColumns: '1fr 1fr'`、两子 `div.min-w-0`。 |
| ratio | 传入 `300px 1fr` 渲染到根 style。 |
| left/right | 两插槽内容可见。 |
| style 覆盖 | 验证 §7.2：传 `style` 是否覆盖列模板（当前行为写入测试或文档）。 |
| Ref | `HTMLDivElement`。 |

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | 默认等分、左固定宽右自适应、`ratio` 与 `minmax` 示例。 |
| 限制 | **无拖拽**、仅两栏、**`style` 覆盖陷阱**（§7.2）。 |
| 选型 | 与 `Grid`、`Row`/`Col` 对照表。 |

---

## 14. 风险与开放问题

| 风险 | 缓解 |
| --- | --- |
| `ratio` 非法 CSS | 布局失效；开发环境可选 console 或文档常见模板。 |
| `left`/`right` 命名在 RTL 产品中的「左」语义 | 文档说明为「第一列/第二列」或提供 `start`/`end` 别名演进。 |

---

## 15. 结论

`SplitPane` 当前定位为 **双栏 CSS Grid 布局容器**：**`left`/`right` 插槽 + `ratio` + `min-w-0`**，实现简单、无状态；与 **Button** 同属声明式 API。**拖拽分割与纵向分栏**不在当前实现内，须在文档与 §7.4 演进中区分，避免与完整「可调整分割面板」产品预期混淆。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | SplitPane 结论 |
| --- | --- |
| 职责 | 双栏 Grid + 可配置列比 |
| DOM/语义 | 根 `div.grid` + 两槽 `div.min-w-0` |
| 状态与交互 | 无（无拖拽） |
| 数据与受控 | 比例由父传 `ratio` |
| API | `left`、`right`、`ratio`、`className` + HTML div 属性 |
| 类型与 Ref | `HTMLDivElement` |
| 无障碍 | 无分割条；顺序与插槽语义 |
| 样式与主题 | `gap-3` + `gridTemplateColumns` |
| 文档与验证 | ratio 示例、style 覆盖、与 Grid/Row 选型 |

---

## 附录 B：参考实现片段（当前仓库）

文件：`packages/ui/src/components/layout/SplitPane/SplitPane.tsx`。

要点：

- `className={cn('grid gap-3', className)}`  
- `style={{ gridTemplateColumns: ratio }}`  
- 子：`div.min-w-0` ×2 包裹 `left` / `right`

（以仓库实际代码为准。）
