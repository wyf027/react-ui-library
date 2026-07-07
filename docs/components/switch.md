# Switch 开关

开关选择器，用于立即切换两个互斥状态。

## 示例

<LivePlayground :code="`
() => {
  return (
    <div className='flex flex-wrap items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900'>
      <Switch aria-label='接收通知' />
      <Switch aria-label='自动同步' defaultChecked />
      <Switch aria-label='计费周期' checkedChildren='年' unCheckedChildren='月' />
      <Switch aria-label='禁用开关' disabled />
    </div>
  )
}
`" />

## 可访问性

Switch 使用 `role="switch"` 和 `aria-checked` 表达开关状态。没有可见标签时，请通过 `aria-label` 或 `aria-labelledby` 提供稳定的可访问名称。

`checkedChildren` 与 `unCheckedChildren` 仅作为视觉状态提示渲染，并会标记为 `aria-hidden`。不要依赖它们作为开关名称，避免读屏器在状态变化后读到不同的控件名称。

传入 `onClick` 时，组件会先调用原生点击回调，再执行内部切换并触发 `onChange`。如果点击回调调用 `event.preventDefault()`，本次切换会被阻止。

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| checked | 是否开启 | `boolean` | - |
| defaultChecked | 默认开启 | `boolean` | `false` |
| checkedChildren | 开启状态的视觉内容 | `ReactNode` | - |
| unCheckedChildren | 关闭状态的视觉内容 | `ReactNode` | - |
| onChange | 变化回调 | `(checked: boolean) => void` | - |
| onClick | 原生点击回调，会在内部切换前触发 | `MouseEventHandler<HTMLButtonElement>` | - |
| disabled | 禁用 | `boolean` | `false` |
