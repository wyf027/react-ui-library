# Table 表格

展示行列数据；内置 **客户端** 搜索、排序、筛选与分页（不参与服务端请求）。与 `COMPONENT_SPECS.md` §5.1 对齐：**`<table>` / `thead` / `tbody`**、可排序列 **`aria-sort`**、可选 **`caption`**、**`loading`** 与分页 **`nav`**。**行选择、`scroll` / `sticky` / 虚拟滚动** 等尚未提供，见下文「规格边界」。

## 示例

<LivePlayground :code="`
() => {
  const [page, setPage] = React.useState(1)
  const pageSize = 2
  const all = [
    { name: 'Alice', role: 'Admin' },
    { name: 'Bob', role: 'Editor' },
    { name: 'Carol', role: 'Editor' },
  ]
  return (
    <Table
      caption='团队成员（示例）'
      columns={[
        { key: 'name', title: '姓名', sorter: (a, b) => String(a.name).localeCompare(String(b.name)) },
        { key: 'role', title: '角色', filters: [{ text: 'Admin', value: 'Admin' }, { text: 'Editor', value: 'Editor' }] },
      ]}
      dataSource={all}
      title='用户表'
      searchable
      rowKey='name'
      pagination={{
        current: page,
        pageSize,
        total: all.length,
        onChange: (p) => setPage(p),
      }}
    />
  )
}
`" />

## API

### TableProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 列配置 | `TableColumn<T>[]` | - |
| dataSource | 数据源（当前页数据由内置分页 slice） | `T[]` | - |
| rowKey | 行 key：字段名或 `(record, index) => string` | `keyof T \| function` | 使用行索引字符串 |
| caption | 表格标题，渲染为 `<caption>` | `ReactNode` | - |
| title | 工具栏左侧标题 | `ReactNode` | - |
| searchable | 是否显示全局关键字搜索（匹配所有字段值的字符串形式） | `boolean` | `false` |
| columnConfigurable | 是否显示列显隐 | `boolean` | `false` |
| loading | 为 true 时表体显示加载指示并设置 `aria-busy` | `boolean` | `false` |
| emptyText | 无数据时单元格内容 | `ReactNode` | `'No data'` |
| pagination | 客户端分页：`current`、`pageSize`、`total`、`onChange(page, pageSize)` | `object` | - |
| className | 加到 `<table>` | `string` | - |

其余合法的 `<table>` HTML 属性（如 **`summary`**）通过原生透传落在 `<table>` 上。

### TableColumn

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| key | 对应数据字段 | `string`（keyof T） |
| title | 列头 | `ReactNode` |
| width | 列宽 | `number \| string` |
| sorter | 排序比较函数 | `(a, b) => number` |
| sortOrder | 受控排序：`asc` / `desc`；**仅「第一个**带 `sortOrder` 的列」生效 | `'asc' \| 'desc'` |
| filters | 筛选项 | `{ text, value }[]` |
| filteredValue | 受控筛选值；`undefined` 时用组件内部筛选状态 | `string` |
| render | 自定义单元格 | `(value, record, index) => ReactNode` |

### 排序与筛选（受控）

- **排序**：若某一列设置了 **`sortOrder`**（含 `undefined` 以外的值），则以 **`columns` 中第一个** **`sortOrder !== undefined`** 的列作为当前排序列；此时点击表头排序按钮 **不会** 更新内部排序状态，需父组件更新该列的 **`sortOrder`**（及必要时 **`dataSource` 顺序**）。
- **筛选**：若列配置了 **`filteredValue`**（含空字符串），则该列筛选完全受控；否则由内部 **`filterMap`** 与非受控 `<select>` 更新。匹配规则为 **`String(record[key]) === filterVal`**（精确相等）。

### 分页

- **`pagination.total`** 用于计算总页数；当前展示行为 **`processedRows.slice((current-1)*pageSize, ...)`**。
- 分页控件外层为 **`<nav aria-label="Table pagination">`**。

### 无障碍

- 表头：**`scope="col"`**；可排序列：**`aria-sort`** 为 `none` | `ascending` | `descending`。
- 排序按钮：**`aria-label`**；筛选：**`<select aria-label>`**；搜索：**`type="search"`** 与 **`aria-label`**。
- **`ref`** 挂载在 **`<table>`** 上。

### 与 COMPONENT_SPECS 的边界（当前未实现）

- 行多选 / **`rowSelection`**、列固定、拖拽列宽、**`expandedRowRender`**、**`scroll`/`sticky`**、服务端 **`onChange` 聚合**、虚拟滚动与树表等：**不在当前组件内**；需在业务层组合或使用后续演进版本。
