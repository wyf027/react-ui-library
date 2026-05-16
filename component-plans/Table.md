# Table 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/data/Table/Table.tsx`、`Table.types.ts`、`tableClassNames.ts`；测试见 **`Table.test.tsx`**。

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Table` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/data/Table` |
| 分类 | Data |
| 依赖 | `cn`、**`Spin`**（**`loading`**）、**`tableClassNames`**（布局/皮肤 **单文件 token**） |
| 关联组件 | **`Pagination`**（若项目有独立分页器）、**`Input`**（搜索框形态）、**`Checkbox`**（列显隐） |

---

## 2. 目标与非目标

### 2.1 目标

1. **声明式列与数据**：**`columns: TableColumn<T>[]`** + **`dataSource: T[]`**（**`T extends Record<string, unknown>`**），单元格 **`column.render`** 或 **原始字段值**。  
2. **工具栏（可选）**：**`title`**、**`searchable`**（全局关键字过滤）、**`columnConfigurable`**（**`<details>`** 列 **显/隐**）。  
3. **排序**：列 **`sorter(a,b)=>number`**；**非受控** 用内部 **`sortKey`/`sortOrder`**；**受控** 由 **「首个 `sortOrder !== undefined` 的列」** 决定 **`effectiveSortKey`/`effectiveSortOrder`**（见 §6）。  
4. **筛选**：列 **`filters` + `<select>`**；**`filteredValue`** 与内部 **`filterMap`** 合并为 **`effectiveFilterMap`**（见 §6）。  
5. **客户端分页切片**：**`pagination`** 存在时对 **`processedRows`** **`slice`**，**`onChange(page,pageSize)`** 由 **父组件更新 `current`**。  
6. **空态**：无行时 **`colSpan={visibleColumns.length}`** 单格 **`emptyText`**（默认 **`'No data'`**）。  
7. **样式集中**：**`tableRoot`/`tableTh`/…** 出自 **`tableClassNames.ts`**。  
8. **语义表头**：**`<th scope="col">`**；可排序列 **`aria-sort`**（**`none`/`ascending`/`descending`**）。  
9. **可选 `<caption>` / `loading`**：**`caption`** prop；**`loading`** 时 **`aria-busy`** + **`Spin`** 占位行。

### 2.2 非目标

1. **服务端排序/筛选/分页协议**：当前 **全在组件内** 对 **`dataSource`** **派生 `processedRows`/`paginatedRows`**；**不** 发请求。  
2. **虚拟滚动、列固定、可调整列宽、行选择**：当前 **无**。  
3. **`TableSorter` 类型**：在 **`Table.types.ts`** 中 **导出**，**`Table.tsx` 未使用**。  
4. **受控排序多列同时 `sortOrder`**：受控路径 **只认 `columns.find` 第一个** **`sortOrder !== undefined`** 的列。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 中后台 **小数据量** 列表 | **全量 `dataSource` 进组件**，依赖 **内置搜索/排序/筛选/分页** 减样板。 |
| 大数据、服务端驱动 | **仅用列渲染** 或 **拆** 为 **受控筛选 + 外部请求**；**勿** 假设 **内置逻辑** 已 **接 API**。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 外层 | **`<div className="space-y-2">`** — **无 `ref`**（**`ref` 在 `<table>`**）。 |
| 工具栏 | 条件：**`title \|\| searchable \|\| columnConfigurable`** → **`tableToolbarWrap`** 等。 |
| 滚动 | **`tableScrollWrap`** 包 **`<table ref={ref} aria-busy? className={cn(tableRoot, className)} {...props}>`**；可选 **`caption`** → **`<caption className={tableCaption}>`**。 |
| 表头 | **`<thead>`** → **`<tr>`** → **`visibleColumns.map` → `<th scope="col" aria-sort?>`** |
| 表体 | **`<tbody>`**；**`loading`** → **单格 `colSpan` + `role="status"` + `Spin`**；否则 **空一行 `emptyText`**；否则 **数据行**。 |
| 分页 | **`<nav aria-label="Table pagination">`**：**文案 + Prev/Next `button`**（**`tablePaginationWrap`** 类名复用于 **`nav`**）。 |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| 内部 state | **`search`**、**`sortKey`/`sortOrder`**、**`filterMap`**、**`visibleMap`**（**列显隐**）。 |
| 搜索 | **`searchable`** 时 **`Object.values(record)`** 转小写 **是否包含 keyword**（**粗粒度**）。 |
| 排序按钮 | **有 `sorter`** 时出现；**受控排序列存在** 时 **点击不调用 `setSortKey`/`setSortOrder`**（**依赖父更新 `columns[].sortOrder`**）。 |
| 筛选 **`select`** | **`filteredValue` 已定义** 时 **`onChange` 不更新 `filterMap`**（**纯受控**）。 |
| 列配置 | **`checkbox`** 写 **`visibleMap`**；**未勾选键** 默认 **显示**（**`!== false`**）。 |

---

## 6. 数据与受控

| 维度 | 规则 |
| --- | --- |
| **排序（受控）** | **`columns` 中第一个 `sortOrder !== undefined` 的列** 提供 **`effectiveSortKey`/`effectiveSortOrder`**；表头箭头 **随其变化**；**点击排序** 在受控时 **不改内部 state** — **父须更新该列 `sortOrder`（及业务重排 `dataSource`）** 否则 **交互无反馈**。 |
| **排序（非受控）** | **无上述列** 时 **`sortKey`/`sortOrder`** 驱动 **`processedRows.sort`**。 |
| **筛选** | **`effectiveFilterMap[key] = column.filteredValue ?? filterMap[key] ?? ''`**；**`String(record[key]) === filterVal`** **精确相等**（**非** 包含匹配）。 |
| **分页** | **`pagination.current`/`pageSize`/`total`** 由 **父持有**；**`slice` 仅展示当前页**；**`onChange`** **Prev/Next** 调 **`pagination.current ± 1`**。 |

---

## 7. API 规范

### 7.1 `TableColumn<T, K>`

| 字段 | 说明 |
| --- | --- |
| `key` | **`Extract<keyof T, string>`** |
| `title` | 列头 **`ReactNode`** |
| `width` | **`th` `style.width`** |
| `sorter` | **`(a,b)=>number`**，与 **`sortOrder`** 配合 |
| `sortOrder` | **`'asc' \| 'desc'`** — **存在即参与受控排序列探测** |
| `filters` | **`{ text, value }[]`** → **`<select>`** |
| `filteredValue` | **受控筛选值**；**`undefined`** 走 **`filterMap`** |
| `render` | **`(value, record, index)=>ReactNode`** |

### 7.2 `TableProps<T>`

| 属性 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- |
| `columns` | `TableColumn<T>[]` | - | |
| `dataSource` | `T[]` | - | |
| `caption` | `ReactNode` | - | **`<caption>`**，表首子节点 |
| `title` | `ReactNode` | - | 工具栏左侧；**与原生 `title` 属性分离**（**`Omit`**） |
| `searchable` | `boolean` | `false` | |
| `columnConfigurable` | `boolean` | `false` | |
| `loading` | `boolean` | `false` | **`aria-busy`** + **`Spin`** 替换表体数据行 |
| `rowKey` | `TableKey<T> \| ((record, index)=>string)` | - | **缺省** 用 **`String(rowIndex)`** |
| `emptyText` | `ReactNode` | `'No data'` | |
| `pagination` | `{ current, pageSize, total, onChange }` | - | **客户端 slice** |
| `className` | `string` | - | **`table` 元素** |
| 继承 | `Omit<TableHTMLAttributes<HTMLTableElement>, 'children' \| 'title' \| 'onChange'>` | - | **`{...props}` 在 `table`** |

### 7.3 `tableClassNames.ts`

| 用途 | 常量示例 |
| --- | --- |
| 工具栏/滚动容器/表/单元格/分页钮等 | **`tableToolbarWrap`**、**`tableScrollWrap`**、**`tableRoot`**、**`tableTh`**、**`tableTd`** … |

### 7.4 建议演进（可选）

| 能力 | 优先级 |
| --- | --- |
| **服务端模式：`onChange` 聚合 sorter/filter/pagination** | P1 |
| **受控排序多列 API 明确** | P2 |
| **行选择、虚拟列表** | P2 |
| **移除或落地使用 `TableSorter` 类型** | P3 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| Ref | **`forwardRef<HTMLTableElement, TableProps<Record<string, unknown>>>`** — **实现签名** 固定 **`Record<string, unknown>`**；**泛型 `T` 调用方** 自行断言/包装。 |
| 挂载点 | **`ref` → `<table>`**；**外层 `div` 无 ref**。 |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| 表头 | **`scope="col"`** ✓；**`aria-sort`**（可排序列）。 |
| 排序钮 | **`type="button"`** + **`aria-label`**（**`Sort column {key}`**）+ **符号 `↑↓↕`**。 |
| 搜索 | **原生 `<input type="search">`**，**`aria-label="Search table"`**，**`placeholder="Search..."`**。 |
| 筛选 | **`<select aria-label={`Filter column ${key}`}>`**。 |
| 分页 | **`<nav aria-label="Table pagination">`**。 |
| 加载 | **`aria-busy`**；**`role="status"`** **`aria-live="polite"`** 包裹 **`Spin`**。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 暗色 | **`tableClassNames`** 内 **`dark:`** 与 **边框/背景** 一致。 |
| 滚动条 | **`tableScrollWrap`** 含 **`nova-scrollbar`**（项目 **滚动条 token**）。 |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| **受控排序** | **父组件** 在 **`onClick` 无法驱动内部 state** 时，**必须** 更新 **`columns`** 中 **带 `sortOrder` 的那一列** 或 **改数据顺序**。 |
| **`rowKey` 稳定性** | **函数 `rowKey`** 应对 **同一 `record` 稳定返回**；**否则** **行状态/DOM 复用** 异常。 |

---

## 12. 测试与验收

| 类型 | 用例（**`Table.test.tsx` 已覆盖**） |
| --- | --- |
| 渲染 | **列头**、**单元格值**、**`<caption>`**。 |
| 空 | **`emptyText`**。 |
| 搜索 | **`searchable`** + **输入过滤** 行。 |
| 排序 | **`aria-sort`** **none → ascending → descending**（非受控点击）。 |
| 分页 | **`nav`** + **`onChange`**（Next）。 |
| 加载 | **`loading`** → **`aria-busy`**、**`status`**、**无数据单元格**。 |

| 类型 | 用例（**建议补测**） |
| --- | --- |
| 分页 | **Prev**、**边界 `current`**、**`pageSize` 变化**。 |
| 排序 | **受控** 父更新 **`sortOrder`**。 |
| 筛选 | **`filters`**、**`filteredValue` 受控** 不更新内部 map。 |

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | **最小表**、**`caption`/`loading`**、**`pagination`**、**`searchable`**、**`columnConfigurable`**、**`sorter`+受控 `sortOrder`**。 |
| 说明 | **数据全客户端**、**受控排序「首列」规则**、**`ref` 仅在 `table`**、**`TableSorter` 未接线**、**与 SPEC 边界（无行选择/虚拟滚动等）**。 |

---

## 14. 风险与开放问题

| 风险 | 说明 |
| --- | --- |
| **受控排序易静默失败** | 点击 **仅改 UI 箭头依赖的 `effectiveSortOrder`**，**父未改 `columns`** 时 **数据不重排** 且 **内部 state 不变**。 |
| **搜索扫全字段** | **`Object.values`** **无列白名单**，**可能** 匹配 **不想暴露的字段**（若 **对象含嵌套/非字符串** 依赖 **`String`**）。 |
| **筛选为严格相等** | **`String(record[key]) === filterVal`**，**类型/格式** 不一致 **筛不出**。 |
| **泛型 `forwardRef` 签名** | **实现** 写死 **`Record<string, unknown>`**，**与 `TableProps<T>` 泛型入口** 在 **TS 层** 可能 **不严格**（**调用侧注意**）。 |

---

## 15. 结论

`Table` 为 **列配置 + 数据源 + 可选工具栏/搜索/列显隐 + 客户端排序筛选分页 + `tableClassNames` 统一样式** 的数据表格；**受控排序、受控筛选、分页** 与 **父组件数据模型** 强耦合。**`ref` 只落在 `<table>`**。与 **Button** 无继承关系；表内操作控件使用 **`type="button"`** 与 **原生 `select`/`input`**。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | Table 结论 |
| --- | --- |
| 职责 | 数据表 + 内置 chrome |
| DOM/语义 | div 包裹 + table + scope=col |
| 状态与交互 | search/sort/filter/visible 内部 |
| 数据与受控 | columns sortOrder/filteredValue；pagination |
| API | columns、dataSource、pagination… |
| 类型与 Ref | HTMLTableElement |
| 无障碍 | **scope**、**aria-sort**、**caption**、搜索/筛选 **`aria-label`**、分页 **`nav`** |
| 样式与主题 | tableClassNames、nova-scrollbar |
| 文档与验证 | 受控排序、客户端假设 |

---

## 附录 B：参考实现片段（当前仓库）

- **`Table.tsx`**：**`processedRows`/`paginatedRows`**、**`controlledSortColumn`**、**`effectiveFilterMap`**。  
- **`Table.types.ts`**：**`TableColumn`**、**`TableProps`**。  
- **`tableClassNames.ts`**：类名常量。

（以仓库实际代码为准。）
