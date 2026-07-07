# Notification 通知

通知提醒框，用于展示不会打断当前流程的状态反馈，或在错误场景中提示需要立即关注的问题。

## 示例

<LivePlayground :code="`
() => {
  return (
    <div className='flex max-w-xl flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900'>
      <Notification type='success' title='发布成功' description='组件库已成功发布。' />
      <Notification type='error' title='发布失败' description='请检查配置。' duration={4500} />
    </div>
  )
}
`" />

## 可访问性

`Notification` 会根据类型选择 live region 语义：`error` 默认使用 `role="alert"`，适合需要立即关注的错误；其他类型默认使用 `role="status"` 与 `aria-live="polite"`，避免普通通知打断读屏器当前播报。

如果业务确认某条通知需要更高或更低的播报优先级，可以显式传入 `role` 和 `aria-live` 覆盖默认值。

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 类型 | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` |
| title | 标题 | `string` | `'Notification'` |
| description | 描述内容 | `string` | - |
| open | 是否显示；未传时组件内部维护可见状态 | `boolean` | - |
| duration | 自动关闭时长(ms)，0 表示不自动关闭 | `number` | `0` |
| onClose | 关闭回调 | `() => void` | - |
| role | 通知的 live region 语义 | `'status' \| 'alert'` | `error` 为 `'alert'`，其余为 `'status'` |
| aria-live | live region 播报优先级 | `'polite' \| 'assertive' \| 'off'` | `role='status'` 时为 `'polite'` |
