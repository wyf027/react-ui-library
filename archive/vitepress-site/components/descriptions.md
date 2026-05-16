# Descriptions 描述列表

成组展示只读信息。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Descriptions
      columns={2}
      items={[
        { key: 'a', label: '项目', children: 'Nova UI' },
        { key: 'b', label: '状态', children: '运行中' },
        { key: 'c', label: '负责人', children: 'Team A' },
      ]}
    />
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 描述项 | `DescriptionItem[]` | - |
| columns | 列数 | `number` | `3` |
