# Icon 图标

语义化的矢量图标。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Space>
      <Icon name='check' size={24} />
      <Icon name='close' size={24} />
      <Icon name='info' size={24} />
    </Space>
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 图标名称 | `string` | - |
| size | 图标大小 | `number` | `16` |
