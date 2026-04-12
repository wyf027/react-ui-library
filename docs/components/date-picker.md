# DatePicker 日期选择

日期选择器组件。

## 示例

<LivePlayground :code="`
() => {
  return (
    <DatePicker />
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前日期 | `Date \| string` | - |
| defaultValue | 默认日期 | `Date \| string` | - |
| onChange | 日期变化回调 | `(date) => void` | - |
| placeholder | 占位文本 | `string` | - |
