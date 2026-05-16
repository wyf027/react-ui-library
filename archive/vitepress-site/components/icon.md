# Icon 图标

语义化的矢量图标容器。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Space>
      <Icon name='check' size={24} />
      <Icon name='loading' size={24} spin />
      <Icon decorative={false} aria-label='成功' name='check' size={24} />
    </Space>
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 逻辑名称，写入 `data-icon`，便于测试与主题覆盖 | `string` | - |
| size | 宽高（px），图标盒子尺寸 | `number` | `16` |
| spin | 是否施加 **`animate-spin`**（加载指示等） | `boolean` | `false` |
| decorative | **`true`**（默认）：装饰图标，根节点 **`aria-hidden="true"`**；**`false`**：语义图标，须同时设置 **`aria-label`**（根节点 **`role="img"`**，不再 `aria-hidden`） | `boolean` | `true` |
| children | 图标节点（常为内联 SVG）；缺省为占位符 `•`，建议生产传入真实图标 | `ReactNode` | `•` |
| className | 根元素扩展类名 | `string` | - |

根元素为 **`span`**（`inline-flex` 居中）；其余继承 **`HTMLSpanElement`** 原生属性（如 **`style`**、**`title`**）。**`decorative={false}`** 时请务必提供 **`aria-label`**（类型上会强制）；若图标旁已有可见文本说明，仍可用默认 **`decorative`** 并保持 **`aria-hidden`**。
