# Icon 图标

语义化的矢量图标。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Space>
      <Icon name='check' size={24} />
      <Icon name='close' size={24} />
      <Icon name='info' size={24} />
    </Space>
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- |
| name | 逻辑名称，写入 `data-icon`，便于测试与主题覆盖 | `string` | - |
| size | 宽高（px），图标盒子尺寸 | `number` | `16` |
| children | 图标节点（常为内联 SVG）；缺省为占位符 `•`，建议生产传入真实图标 | `ReactNode` | `•` |
| className | 根元素扩展类名 | `string` | - |

根元素为 **`span`**（`inline-flex` 居中），默认 **`aria-hidden="true"`**（装饰性图标）；其余继承 **`HTMLSpanElement`** 原生属性（如 `style`、`title`）。
