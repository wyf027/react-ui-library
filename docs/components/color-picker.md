# ColorPicker 颜色选择

颜色选择器组件。

## 示例

<LivePlayground :code="`
() => {
  return (
    <ColorPicker />
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 颜色值 | `string` | - |
| defaultValue | 默认颜色 | `string` | - |
| onChange | 颜色变化回调 | `(color: string) => void` | - |
| showValue | 显示颜色值 | `boolean` | `true` |
