# Avatar 头像

用户头像组件。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Space>
      <Avatar name='Alice' />
      <Avatar name='Bob' size='lg' />
      <Avatar src='https://i.pravatar.cc/40' />
    </Space>
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 名称（显示首字母） | `string` | - |
| src | 图片地址 | `string` | - |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
