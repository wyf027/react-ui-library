# Card 卡片

通用卡片容器。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Space direction='vertical' size={8}>
      <Card title='卡片标题'>卡片内容</Card>
      <Card title='带操作' extra={<Button size='sm' variant='ghost'>更多</Button>}>卡片内容</Card>
    </Space>
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `ReactNode` | - |
| extra | 右上角操作区 | `ReactNode` | - |
