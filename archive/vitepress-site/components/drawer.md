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
        <Text>抽屉内容</Text>
      </Drawer>
    </>
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| open | 是否可见 | `boolean` | - |
| onClose | 关闭回调 | `() => void` | - |
| placement | 抽屉方向 | `'left' \| 'right' \| 'top' \| 'bottom'` | `'right'` |
| title | 标题 | `ReactNode` | - |
