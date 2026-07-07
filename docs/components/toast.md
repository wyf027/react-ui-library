# Toast 轻提示

全局轻提示消息。

## 示例

<LivePlayground :code="`
() => {
  return (
    <div className='flex flex-col gap-3'>
      <Toast open status='success' duration={0} className='static'>操作成功</Toast>
      <Toast open status='error' duration={0} className='static'>操作失败</Toast>
    </div>
  )
}
`" />

## 可访问性

Toast 默认会把 `info`、`success`、`warning` 作为 `role="status"` 的礼貌通知呈现；`error` 默认作为 `role="alert"` 的紧急通知呈现。需要更细粒度控制时，可以显式传入 `role` 与 `aria-live`。

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| open | 是否显示 | `boolean` | `false` |
| duration | 显示时长(ms)，0 表示不自动关闭 | `number` | `3000` |
| status | 状态 | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` |
| role | live region 语义，默认 error 为 alert，其余状态为 status | `'status' \| 'alert'` | - |
| aria-live | live region 播报优先级，传入后覆盖默认值 | `'off' \| 'polite' \| 'assertive'` | - |
| onClose | 关闭回调 | `() => void` | - |
