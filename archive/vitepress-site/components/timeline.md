# Timeline 时间轴

垂直展示的时间流信息。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Timeline items={[
      { key: '1', title: '创建项目' },
      { key: '2', title: '开发完成', color: 'success' },
      { key: '3', title: '发布上线', color: 'success' },
    ]} />
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 节点列表 | `TimelineItem[]` | - |
