# Card 卡片

通用卡片容器，常用属性对齐 Ant Design `Card`。

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

### 封面、加载、底部操作

<LivePlayground :code="`
() => {
  return (
    <Card
      style={{ maxWidth: 360 }}
      hoverable
      size='small'
      title='示例'
      cover={<div style={{height:120,background:'linear-gradient(135deg,#dbeafe,#e0e7ff)'}} />}
      actions={<Button size='sm' variant='outline'>操作</Button>}
    >
      正文区域
    </Card>
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `ReactNode` | - |
| extra | 右上角操作区 | `ReactNode` | - |
| cover | 封面区域 | `ReactNode` | - |
| actions | 底部操作区 | `ReactNode` | - |
| loading | 加载状态（内置 `Spin` 遮罩） | `boolean` | `false` |
| bordered | 是否显示边框 | `boolean` | `true` |
| hoverable | 悬浮加深阴影 | `boolean` | `false` |
| size | 尺寸 | `'default' \| 'small'` | `'default'` |
