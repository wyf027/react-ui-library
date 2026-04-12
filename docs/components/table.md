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
    />
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 列配置 | `TableColumn[]` | - |
| dataSource | 数据源 | `object[]` | - |
| rowKey | 行 key | `string` | - |
| title | 标题 | `string` | - |
| searchable | 可搜索 | `boolean` | `false` |
| columnConfigurable | 可配置列 | `boolean` | `false` |
| emptyText | 空提示 | `string` | - |
