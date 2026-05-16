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

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 提示内容 | `ReactNode` | - |
| disabled | 禁用 | `boolean` | `false` |
