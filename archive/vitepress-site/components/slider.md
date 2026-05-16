# Slider 滑动条

滑动输入条。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Slider defaultValue={30} />
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| min | 最小值 | `number` | `0` |
| max | 最大值 | `number` | `100` |
| step | 步长 | `number` | `1` |
| value | 当前值 | `number` | - |
| defaultValue | 默认值 | `number` | - |
| onChange | 值变化回调 | `(value: number) => void` | - |
