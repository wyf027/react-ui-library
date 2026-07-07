# Table 表格

展示行列数据。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Table
      columns={[
        { key: 'name', title: '姓名', sorter: (a, b) => String(a.name).localeCompare(String(b.name)) },
        { key: 'role', title: '角色', filters: [{ text: 'Admin', value: 'Admin' }, { text: 'Editor', value: 'Editor' }] },
      ]}
      dataSource={[
        { name: 'Alice', role: 'Admin' },
        { name: 'Bob', role: 'Editor' },
      ]}
      title='用户表'
      searchable
      rowKey='name'
    />
  )
}
`" />

## 可访问性

- 表格使用原生 `<table>` / `<th scope="col">` / `<td>` 结构，保留浏览器和辅助技术默认表格语义。
- 全局搜索输入会按表格标题输出可访问名称，例如 `Search 用户表`；没有标题时回退为 `Search table`。
- 当前排序列会在表头上输出 `aria-sort`：升序为 `ascending`，降序为 `descending`。
- 排序按钮包含明确的 `aria-label`，图标仅作装饰并通过 `aria-hidden` 隐藏。
- 列过滤下拉框会按列名输出 `aria-label`，例如 `Filter Role`。
- 启用内置分页时，分页区域会渲染为带名称的导航区域；有表格标题时名称为 `<标题> pagination`，否则为 `Table pagination`。当前页状态使用 `aria-live="polite"` 播报，上一页/下一页按钮提供明确的可访问名称。

## API

| 属性               | 说明     | 类型            | 默认值  |
| ------------------ | -------- | --------------- | ------- |
| columns            | 列配置   | `TableColumn[]` | -       |
| dataSource         | 数据源   | `object[]`      | -       |
| rowKey             | 行 key   | `string`        | -       |
| title              | 标题     | `string`        | -       |
| searchable         | 可搜索   | `boolean`       | `false` |
| columnConfigurable | 可配置列 | `boolean`       | `false` |
| emptyText          | 空提示   | `string`        | -       |
| pagination         | 分页配置 | `TablePagination` | -     |

### TableColumn

| 属性          | 说明                 | 类型                                  | 默认值 |
| ------------- | -------------------- | ------------------------------------- | ------ |
| key           | 列 key               | `string`                              | -      |
| title         | 列标题               | `ReactNode`                           | -      |
| width         | 列宽                 | `number \| string`                    | -      |
| sorter        | 本地排序函数         | `(a: object, b: object) => number`    | -      |
| sortOrder     | 受控排序方向         | `'asc' \| 'desc'`                     | -      |
| filters       | 过滤选项             | `{ text: string; value: string }[]`   | -      |
| filteredValue | 受控过滤值           | `string`                              | -      |
| render        | 自定义单元格渲染函数 | `(value, record, index) => ReactNode` | -      |

### TablePagination

| 属性     | 说明         | 类型                                      | 默认值 |
| -------- | ------------ | ----------------------------------------- | ------ |
| current  | 当前页       | `number`                                  | -      |
| pageSize | 每页条数     | `number`                                  | -      |
| total    | 总条数       | `number`                                  | -      |
| onChange | 页码变化回调 | `(page: number, pageSize: number) => void` | -      |