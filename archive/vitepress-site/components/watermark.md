# Watermark 水印

页面水印组件。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Watermark content='INTERNAL'>
      <Card title='受保护内容'>此面板带有水印。</Card>
    </Watermark>
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 水印文字 | `string` | - |
| children | 被包裹内容 | `ReactNode` | - |
