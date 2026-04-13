# Divider 分割线

区隔内容的分割线。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Space direction='vertical' size={8}>
      <Text>上方内容</Text>
      <Divider />
      <Text>下方内容</Text>
    </Space>
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| orientation | 方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
