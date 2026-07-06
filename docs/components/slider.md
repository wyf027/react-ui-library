# Slider 滑动条

滑动输入条。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Slider aria-label='音量' defaultValue={30} />
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
| defaultValue | 默认值 | `number` | `0` |
| onChange | 值变化回调 | `(value: number) => void` | - |
| showValue | 显示当前值 | `boolean` | `true` |

## 可访问性

- 请为滑动条提供 `aria-label` 或外部 `<label>`，避免只有轨道而没有可访问名称。
- `showValue` 开启时，可见的当前值会通过 `aria-describedby` 关联到原生 range 输入。
- 如果业务侧已经传入 `aria-describedby`，组件会保留已有描述并追加当前值。
