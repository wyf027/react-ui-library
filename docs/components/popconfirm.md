# Popconfirm 气泡确认

点击元素弹出确认气泡，对齐 Ant Design Popconfirm。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Popconfirm
      title='确认删除？'
      description='此操作不可撤回'
      onConfirm={() => alert('已确认')}
      onCancel={() => alert('已取消')}
    >
      <Button color='danger'>删除</Button>
    </Popconfirm>
  )
}
`" />

## 可访问性

- 触发元素会暴露 `aria-haspopup="dialog"` 和 `aria-expanded`，用于表达确认气泡的展开状态。
- 气泡打开时，触发元素会通过 `aria-controls` 关联当前确认弹层。
- 弹层使用 `role="dialog"`，并通过标题和描述提供可访问名称与描述。
- 弹层打开后可通过 Escape、点击外部、确认按钮或取消按钮关闭。
- 通过 Escape、确认按钮或取消按钮关闭后，焦点会回到触发元素，避免键盘用户丢失当前位置。

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 确认标题 | `ReactNode` | - |
| description | 描述 | `ReactNode` | - |
| onConfirm | 确认回调 | `() => void` | - |
| onCancel | 取消回调 | `() => void` | - |
| okText | 确认文本 | `string` | `'确定'` |
| cancelText | 取消文本 | `string` | `'取消'` |
| open | 是否显示 | `boolean` | - |
| defaultOpen | 默认显示 | `boolean` | `false` |
