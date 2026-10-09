# Tour 漫游式引导

漫游式引导组件。

## 示例

<LivePlayground :code="`
() => {
  const [open, setOpen] = React.useState(false)
  return (
    <>
    <Button onClick={() => setOpen(true)}>开始引导</Button>
    <Tour
      open={open}
      onClose={() => setOpen(false)}
      steps={[
        { key: '1', title: '欢迎', description: '这是第一步。' },
        { key: '2', title: '完成', description: '引导结束。' },
      ]}
    />
    </>
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| steps | 引导步骤 | `TourStep[]` | - |
| open | 是否显示 | `boolean` | - |
| defaultOpen | 默认显示 | `boolean` | - |
| current | 当前步骤 | `number` | - |
| onChange | 步骤变化回调 | `(current: number) => void` | - |
| onClose | 关闭回调 | `() => void` | - |
