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
- 当前排序列会在表头上输出 `aria-sort`：升序为 `ascending`，降序为 `descending`。
- 排序按钮包含明确的 `aria-label`，图标仅作装饰并通过 `aria-hidden` 隐藏。
- 列过滤下拉框会按列名输出 `aria-label`，例如 `Filter Role`。

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