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

| 属性    | 说明     | 类型         | 默认值 |
| ------- | -------- | ------------ | ------ |
| open    | 是否可见 | `boolean`    | -      |
| onClose | 关闭回调 | `() => void` | -      |
| title   | 标题     | `ReactNode`  | -      |

## 可访问性

`Modal` 使用 `role="dialog"` 和 `aria-modal="true"` 表示模态对话框。传入 `title` 时，标题会通过 `aria-labelledby` 关联到对话框面板。对话框打开后会聚焦关闭按钮，按 <kbd>Tab</kbd> / <kbd>Shift</kbd> + <kbd>Tab</kbd> 会在对话框内循环焦点，关闭后会把焦点还给打开前的活动元素。

对话框打开期间页面主体会锁定滚动，避免背景内容跟随滚动；点击遮罩、点击关闭按钮或按 <kbd>Escape</kbd> 会触发 `onClose`。
