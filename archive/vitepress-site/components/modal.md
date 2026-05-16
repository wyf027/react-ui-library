# Modal 对话框

模态对话框。

## 示例

<LivePlayground :code="`
() => {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>打开对话框</Button>
      <Modal open={open} onClose={() => setOpen(false)} title='对话框标题'>
        <Text>对话框内容</Text>
      </Modal>
    </>
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| open | 是否可见 | `boolean` | `false` |
| onClose | 关闭回调（Esc、点击遮罩——若允许、关闭按钮） | `() => void` | - |
| title | 标题；用于 `aria-label` 与标题区 | `string` | - |
| maskClosable | 点击遮罩（面板外区域）是否触发 `onClose` | `boolean` | `true` |
| keyboard | 是否允许 Esc 触发 `onClose` | `boolean` | `true` |
| ref | 转发到 **`role="dialog"`** 的面板根节点 | `Ref<HTMLDivElement>` | - |

其余原生 `HTMLAttributes<HTMLDivElement>` 透传到对话框面板（如 `id`、`aria-describedby`）。

### 无障碍说明

打开时焦点会移至对话框面板（`tabIndex={-1}`），关闭后尝试恢复到打开前的焦点元素。完整「焦点陷阱」（Tab 循环留在对话框内）见演进规划；当前行为优于完全无焦点管理。
