# Drawer 抽屉

屏幕边缘滑出的浮层面板。

## 示例

<LivePlayground :code="`
() => {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>打开抽屉</Button>
      <Drawer open={open} onClose={() => setOpen(false)} title='抽屉标题'>
        <div className='space-y-3'>
          <Text>抽屉内容</Text>
          <Button>抽屉内操作</Button>
        </div>
      </Drawer>
    </>
  )
}
`" />

## API

| 属性      | 说明     | 类型                                     | 默认值    |
| --------- | -------- | ---------------------------------------- | --------- |
| open      | 是否可见 | `boolean`                                | -         |
| onClose   | 关闭回调 | `() => void`                             | -         |
| placement | 抽屉方向 | `'left' \| 'right' \| 'top' \| 'bottom'` | `'right'` |
| title     | 标题     | `ReactNode`                              | -         |

## 可访问性

`Drawer` 使用 `role="dialog"` 和 `aria-modal="true"` 表示模态浮层。传入 `title` 时，标题会通过 `aria-labelledby` 关联到抽屉面板。抽屉打开后焦点会移动到关闭按钮，并锁定页面滚动；按 <kbd>Tab</kbd> 或 <kbd>Shift</kbd> + <kbd>Tab</kbd> 时焦点会在抽屉内部循环。点击遮罩、点击关闭按钮或按 <kbd>Escape</kbd> 会触发 `onClose`，关闭后焦点会回到打开抽屉前的元素。
