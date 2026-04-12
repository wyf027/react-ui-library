# Toast 轻提示

全局轻提示消息。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Space>
      <Toast open status='success' duration={0}>操作成功</Toast>
      <Toast open status='danger' duration={0}>操作失败</Toast>
    </Space>
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| open | 是否显示 | `boolean` | - |
| duration | 显示时长(ms)，0 表示不自动关闭 | `number` | `3000` |
| status | 状态 | `string` | - |
| onClose | 关闭回调 | `() => void` | - |
