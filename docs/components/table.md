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
      rowSelection={{
        defaultSelectedRowKeys: ['Alice'],
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(selectedRowKeys, selectedRows)
        },
      }}
      rowKey='name'
    />
  )
}
`" />

## 可访问性

- 表格使用原生 `<table>` / `<th scope="col">` / `<td>` 结构，保留浏览器和辅助技术默认表格语义。
- 当前排序列会在表头上输出 `aria-sort`：升序为 `ascending`，降序为 `descending`。
- 排序按钮包含明确的 `aria-label`，图标仅作装饰并通过 `aria-hidden` 隐藏。

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

### rowSelection

| 属性                   | 说明                                                   | 类型                                                          | 默认值 |
| ---------------------- | ------------------------------------------------------ | ------------------------------------------------------------- | ------ |
| selectedRowKeys        | 受控选中 keys                                          | `string[]`                                                    | -      |
| defaultSelectedRowKeys | 非受控默认选中 keys                                    | `string[]`                                                    | `[]`   |
| onChange               | 选中变化回调，参数为 `(selectedRowKeys, selectedRows)` | `(selectedRowKeys: string[], selectedRows: object[]) => void` | -      |
