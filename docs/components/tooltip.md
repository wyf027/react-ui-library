# Tooltip 文字提示

简单的文字提示气泡框。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Space>
      <Tooltip content='提示文字'><Button>悬停查看</Button></Tooltip>
      <Tooltip content='已禁用' disabled><Button variant='outline'>禁用</Button></Tooltip>
    </Space>
  )
}
`" />

## API

| 属性     | 说明     | 类型        | 默认值  |
| -------- | -------- | ----------- | ------- |
| content  | 提示内容 | `ReactNode` | -       |
| disabled | 禁用     | `boolean`   | `false` |

## 可访问性

`Tooltip` 会在触发元素获得焦点时显示提示，并在单个有效 React 子元素上通过 `aria-describedby` 关联当前提示内容。按下 <kbd>Escape</kbd> 会关闭已打开的提示。提示内容应保持简短，不应放置可交互控件。
