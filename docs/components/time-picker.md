# TimePicker 时间选择

时间选择器组件，对齐 Ant Design TimePicker。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Space direction='vertical' size={8}>
      <TimePicker aria-label='开始时间' placeholder='选择时间' />
      <TimePicker aria-label='结束时间' defaultValue='14:30' />
      <TimePicker aria-label='禁用时间' disabled placeholder='禁用状态' />
    </Space>
  )
}
`" />

## 可访问性

TimePicker 的触发器使用 `role="combobox"`，需要通过 `aria-label` 或 `aria-labelledby` 提供可访问名称。

`id` 与 `aria-describedby` 会转发到实际可聚焦的 combobox 触发器，可用于关联外部标签、帮助文本或错误说明。弹层打开时，触发器会通过 `aria-expanded` 和 `aria-controls` 关联 `role="dialog"` 面板，并支持 `Enter`、`Space`、`ArrowDown` 打开以及 `Escape` 关闭。

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前时间 | `string` (HH:mm) | - |
| defaultValue | 默认时间 | `string` | `''` |
| format | 时间格式 | `'12' \| '24'` | `'24'` |
| disabled | 禁用 | `boolean` | `false` |
| placeholder | 占位文本 | `string` | `'选择时间'` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| onChange | 时间变化回调 | `(value: string) => void` | - |
| id | combobox 触发器 ID | `string` | - |
| aria-label | combobox 可访问名称 | `string` | - |
| aria-labelledby | 关联外部标签元素 | `string` | - |
| aria-describedby | 关联外部描述元素 | `string` | - |
