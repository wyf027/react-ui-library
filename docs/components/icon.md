# Icon 图标

语义化的矢量图标。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Space>
      <Icon name='check' size={24}><svg className='h-full w-full' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2}><path d='m5 12 4 4L19 6' /></svg></Icon>
      <Icon name='close' size={24}><svg className='h-full w-full' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2}><path d='m6 6 12 12M18 6 6 18' /></svg></Icon>
      <Icon name='info' size={24}><svg className='h-full w-full' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2}><circle cx={12} cy={12} r={9} /><path d='M12 11v6M12 7v2' /></svg></Icon>
    </Space>
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 逻辑名称，写入 `data-icon`，便于测试与主题覆盖 | `string` | - |
| size | 宽高（px），图标盒子尺寸 | `number` | `16` |
| children | 图标节点（常为内联 SVG）；缺省为占位符 `•`，建议生产传入真实图标 | `ReactNode` | `•` |
| className | 根元素扩展类名 | `string` | - |

根元素为 **`span`**（`inline-flex` 居中），默认 **`aria-hidden="true"`**（装饰性图标）；其余继承 **`HTMLSpanElement`** 原生属性（如 `style`、`title`）。
