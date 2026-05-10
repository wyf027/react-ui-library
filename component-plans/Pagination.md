# Pagination 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/data/Pagination/Pagination.tsx`；测试见 **`Pagination.test.tsx`**。

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Pagination` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/data/Pagination` |
| 分类 | Data |
| 依赖 | `cn` |
| 关联组件 | **`Table`**（内置分页 **`onChange(page, pageSize)`** 与 **本组件 `onChange(page)`** **签名不同**） |

---

## 2. 目标与非目标

### 2.1 目标

1. **页码导航**：**`<nav aria-label="Pagination">`** 内 **Prev** + **每页一个数字 `button`** + **Next**。  
2. **当前页高亮**：**`aria-current="page"`** 作用于 **当前页按钮**；样式 **`border-brand-500 bg-brand-500 text-white`**。  
3. **回调**：**`onChange?.(page: number)`** — **Prev/Next/数字** 均 **传目标页码**（**Prev** 为 **`Math.max(1, page-1)`**，**Next** 为 **`Math.min(totalPages, page+1)`**）。  
4. **总页数**：**`totalPages = Math.max(1, Math.ceil(total / pageSize))`** — **`total=0`** 时仍为 **1 页**。  
5. **属性透传**：**`Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>`** 落在 **根 `nav`** 上（**类型名仍为 `HTMLDivElement`**，见 §8）。

### 2.2 非目标

1. **省略号、跳页、每页条数选择器**：当前 **渲染全部页码按钮**，**大 `totalPages`** 时 **性能与布局** 差。  
2. **内部 `useState` 非受控模式**：**无** 本地 current；**完全依赖** **`current`/`defaultCurrent` 表达式**（见 §6 **缺陷**）。  
3. **`onChange(page, pageSize)`**：**仅** **`page`**；与 **`Table`** 分页 **不一致**。  
4. **i18n**：**`Prev`/`Next`** **英文硬编码**。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 中小总页数列表底栏 | **`total`/`pageSize`** 较小时 **一页一号** 清晰。 |
| 总页数很大 | **需业务换组件** 或 **演进折叠页码**；**勿** 直接用于 **上百页**。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 根 | **`<nav ref={ref} aria-label="Pagination" className={cn('flex items-center gap-2', className)} {...props}>`** |
| 按钮 | **全部 `type="button"`**；**`disabled`** 于 **Prev**（**`page<=1`**）、**Next**（**`page>=totalPages`**） |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| 状态 | **无** `useState`；**`page = current ?? defaultCurrent`**（见 §6）。 |
| 交互 | **点击** 调 **`onChange`**；**父组件** **`current`** 更新后 **高亮跟随**（见测试 **`Harness`**）。 |

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| 设计意图 | **`current`/`defaultCurrent`** 暗示 **受控 + 非受控**。 |
| **实现缺陷** | 解构 **`current = 1`** — **未传 `current` 时恒为 `1`**，**`undefined` 永不出现**，故 **`current ?? defaultCurrent` 中 `defaultCurrent` 实际不可达**；**`defaultCurrent` prop 当前无效**。 |
| 受控用法 | **须传 `current`** + **`onChange` 内 `setCurrent`**（与 **`Pagination.test.tsx`** 一致）。 |

---

## 7. API 规范

### 7.1 `PaginationProps`（当前实现）

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `total` | 总条数 | `number` | - | **必填** |
| `current` | 当前页 | `number` | `1` | **默认参数使非受控 `defaultCurrent` 失效** |
| `defaultCurrent` | 文档/类型上的初页 | `number` | `1` | **当前实现等效未使用** |
| `pageSize` | 每页条数 | `number` | `10` | **仅用于算 `totalPages`** |
| `onChange` | 页变更 | `(page: number) => void` | - | **无 `pageSize` 参数** |
| `className` | 根 `nav` | `string` | - | |
| 继承 | `Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>` | - | - | **根 DOM 为 `nav`** |

### 7.2 视觉（摘要）

| 项 | 类名要点 |
| --- | --- |
| 焦点 | **`nova-focus-ring`** |
| 当前页 | **`border-brand-500 bg-brand-500 text-white`** |

### 7.3 建议演进（可选）

| 能力 | 优先级 |
| --- | --- |
| **修复非受控：`current` 不设默认或用 `useControllableState`** | P1 |
| **`forwardRef<HTMLElement>` 或 `HTMLElement` + 文档根为 `nav`** | P2 |
| **省略页码、跳页、`showSizeChanger`、`itemRender`** | P2 |
| **`onChange(page, pageSize)` 与 `Table` 对齐** | P2 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| 声明 | **`forwardRef<HTMLDivElement, PaginationProps>`** |
| 实际 | **根为 `<nav>`** — **更贴切 `HTMLElement` 或 `HTMLNavElement`**。 |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| 导航 | **`nav` + `aria-label="Pagination"`** ✓ |
| 当前页 | **`aria-current="page"`** ✓ |
| 页码按钮 | **可见数字**；**大量相邻 `button`** 时 **Tab 顺序较长**（与大页数问题 **同源**）。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 品牌 | 当前页 **brand**；非当前 **slate 边框 + 暗色底**。 |
| 焦点 | **`nova-focus-ring`** 与 **`Input`** 等一致。 |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| **与 `Table` 分页** | **`Table`** 内建 **Prev/Next + `onChange(page,pageSize)`**；**独立 `Pagination`** 为 **`onChange(page)`** — **集成时勿混签名**。 |
| **`{...props}`** | 可传 **`data-*`/`id`**；**勿** 覆盖 **`aria-label`** 除非 **有意替换**。 |

---

## 12. 测试与验收

| 类型 | 用例（**`Pagination.test.tsx` 已覆盖**） |
| --- | --- |
| **`onChange`** | 点击页码 **传入目标页**。 |
| 受控 | 父 **`current`** 更新后 **高亮与 `aria-current`** 正确。 |

| 类型 | 用例（**建议补测**） |
| --- | --- |
| **`total=0`** | **单页** 与 **Prev/Next disabled** 行为。 |
| **大 `totalPages`** | **性能/节点数**（文档约束或单测阈值）。 |

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | **受控 `current`+`onChange`**；**`total`/`pageSize`**；**与 `Table` 分页差异**。 |
| 说明 | **`defaultCurrent` 现状**、**全量页码按钮**、**根为 `nav`**、**i18n**。 |

---

## 14. 风险与开放问题

| 风险 | 说明 |
| --- | --- |
| **全量页码** | **`totalPages` 大** 时 **DOM 爆炸**、**布局溢出**。 |
| **`defaultCurrent` 无效** | 易误导 **文档读者**；应 **修实现** 或 **删 prop** 并 **changelog**。 |
| **类型 `HTMLDivElement` vs `nav`** | **TS/语义** 轻微不一致。 |

---

## 15. 结论

`Pagination` 为 **`nav` 包裹的全按钮页码条 + `aria-current` + `onChange(page)`**，**实现简单**；**`defaultCurrent` 因 `current` 默认值而失效**、**全量渲染页码**、**与 `Table` 分页 API 不一致** 为落地与演进时需优先处理点。与 **Button** 无继承关系；控件均为 **`type="button"`**。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | Pagination 结论 |
| --- | --- |
| 职责 | 页码切换 |
| DOM/语义 | nav + buttons + aria-current |
| 状态与交互 | 无内部 state；依赖父 current |
| 数据与受控 | current 默认破坏 defaultCurrent |
| API | total、pageSize、onChange(page) |
| 类型与 Ref | 声明 Div，实际 nav |
| 无障碍 | nav label、aria-current |
| 样式与主题 | brand 当前、nova-focus-ring |
| 文档与验证 | Table 对比、大页数 |

---

## 附录 B：参考实现片段（当前仓库）

文件：`packages/ui/src/components/data/Pagination/Pagination.tsx`。

要点：**`page = current ?? defaultCurrent`**、**`pages.map` 数字按钮**、**`Math.max(1, ceil(total/pageSize))`**。

（以仓库实际代码为准。）
