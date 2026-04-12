# Skeleton 骨架屏

加载占位组件，对齐 Ant Design Skeleton。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Space direction='vertical' size={12}>
      <Skeleton />
      <Skeleton avatar />
      <Skeleton title paragraph={{ rows: 2 }} />
    </Space>
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| active | 是否展示动画 | `boolean` | `true` |
| avatar | 显示头像占位 | `boolean` | `false` |
| title | 显示标题占位 | `boolean` | `true` |
| paragraph | 显示段落占位 | `boolean \| { rows?: number }` | `true` |
| loading | 为 true 时显示骨架屏，否则显示 children | `boolean` | `true` |
