# Switch 开关

开关选择器。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Space>
      <Switch aria-label='接收通知' />
      <Switch aria-label='自动同步' defaultChecked />
      <Switch aria-label='禁用开关' disabled />
    </Space>
  )
}
`" />

## 可访问性

Switch 使用 `role="switch"` 和 `aria-checked` 表达开关状态。没有可见标签时，请通过 `aria-label` 或 `aria-labelledby` 提供可访问名称。

传入 `onClick` 时，组件会先调用原生点击回调，再执行内部切换并触发 `onChange`。如果点击回调调用 `event.preventDefault()`，本次切换会被阻止。

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| checked | 是否开启 | `boolean` | - |
| defaultChecked | 默认开启 | `boolean` | `false` |
| onChange | 变化回调 | `(checked: boolean) => void` | - |
| onClick | 原生点击回调，会在内部切换前触发 | `MouseEventHandler<HTMLButtonElement>` | - |
| disabled | 禁用 | `boolean` | `false` |
