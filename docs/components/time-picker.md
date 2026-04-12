# TimePicker 时间选择

时间选择器组件，对齐 Ant Design TimePicker。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Space direction='vertical' size={8}>
      <TimePicker placeholder='选择时间' />
      <TimePicker defaultValue='14:30' />
      <TimePicker disabled placeholder='禁用状态' />
    </Space>
  )
}
`" />

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
