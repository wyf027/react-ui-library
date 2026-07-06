# ColorPicker 颜色选择

颜色选择器组件。

## 示例

<LivePlayground :code="`
() => {
  return (
    <ColorPicker aria-label='品牌色' />
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 颜色值 | `string` | - |
| defaultValue | 默认颜色 | `string` | `'#2459ff'` |
| onChange | 颜色变化回调 | `(color: string) => void` | - |
| showValue | 显示颜色值 | `boolean` | `true` |

## 可访问性

- 请为颜色输入提供 `aria-label` 或外部 `<label>`，避免只有色块而没有可访问名称。
- `showValue` 开启时，可见的 HEX 颜色值会通过 `aria-describedby` 关联到原生颜色输入。
- 如果业务侧已经传入 `aria-describedby`，组件会保留已有描述并追加当前颜色值。
