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
| open | 是否可见 | `boolean` | - |
| onClose | 关闭回调 | `() => void` | - |
| title | 标题 | `ReactNode` | - |
