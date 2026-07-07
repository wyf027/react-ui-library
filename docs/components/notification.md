# Notification 通知

通知提醒框。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Space direction='vertical' size={8}>
      <Notification type='success' title='发布成功' description='组件库已成功发布。' />
      <Notification type='error' title='发布失败' description='请检查配置。' duration={4500} />
    </Space>
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 类型 | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` |
| title | 标题 | `string` | `'Notification'` |
| description | 描述内容 | `string` | - |
| open | 是否显示；未传时组件内部维护可见状态 | `boolean` | - |
| duration | 自动关闭时长(ms)，0 表示不自动关闭 | `number` | `0` |
| onClose | 关闭回调 | `() => void` | - |
