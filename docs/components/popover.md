# Popover 气泡卡片

点击/悬停弹出气泡卡片。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Popover trigger={<Button variant='outline'>点击弹出</Button>} content='气泡卡片内容' />
  )
}
`" />

## API

| 属性        | 说明     | 类型         | 默认值 |
| ----------- | -------- | ------------ | ------ |
| trigger     | 触发元素 | `ReactNode`  | -      |
| content     | 卡片内容 | `ReactNode`  | -      |
| open        | 是否显示 | `boolean`    | -      |
| defaultOpen | 默认显示 | `boolean`    | -      |
| onOpen      | 打开回调 | `() => void` | -      |
| onClose     | 关闭回调 | `() => void` | -      |

## 可访问性

`Popover` 的触发按钮会通过 `aria-expanded` 表示展开状态，并通过 `aria-haspopup="dialog"` 与 `aria-controls` 关联当前气泡卡片。打开后可按 <kbd>Escape</kbd> 关闭，并将焦点返回触发按钮。
