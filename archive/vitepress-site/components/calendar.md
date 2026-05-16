# Calendar 日历

日历组件。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Calendar />
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| year | 年份 | `number` | - |
| month | 月份 | `number` | - |
| value | 选中日期 | `Date` | - |
| onChange | 日期变化回调 | `(date) => void` | - |
