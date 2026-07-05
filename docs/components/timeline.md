# Timeline 时间轴

垂直展示的时间流信息。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Timeline items={[
      { key: '1', title: '创建项目', timestamp: '09:00' },
      { key: '2', title: '开发完成', timestamp: '10:30', color: 'success' },
      { key: '3', title: '发布上线', timestamp: '14:00', color: 'success' },
    ]} />
  )
}
`" />

### 反向展示

<LivePlayground :code="`
() => {
  return (
    <Timeline
      reverse
      items={[
        { key: '1', title: '提交申请', timestamp: '09:00' },
        { key: '2', title: '审核通过', timestamp: '10:30', color: 'success' },
        { key: '3', title: '完成归档', timestamp: '14:00', color: 'success' },
      ]}
    />
  )
}
`" />

## API

| 属性    | 说明             | 类型             | 默认值  |
| ------- | ---------------- | ---------------- | ------- |
| items   | 节点列表         | `TimelineItem[]` | -       |
| reverse | 是否反向展示节点 | `boolean`        | `false` |

## TimelineItem

| 属性        | 说明     | 类型                                            | 默认值    |
| ----------- | -------- | ----------------------------------------------- | --------- |
| key         | 唯一标识 | `string`                                        | -         |
| title       | 标题     | `ReactNode`                                     | -         |
| description | 描述     | `ReactNode`                                     | -         |
| timestamp   | 时间信息 | `ReactNode`                                     | -         |
| color       | 节点颜色 | `'brand' \| 'success' \| 'warning' \| 'danger'` | `'brand'` |
