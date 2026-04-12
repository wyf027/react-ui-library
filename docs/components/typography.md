# Typography 排版

文本的基本格式，包含 Title、Text、Paragraph 三个子组件。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Space direction='vertical' size={8}>
      <Title level={1}>一级标题</Title>
      <Title level={2}>二级标题</Title>
      <Title level={3}>三级标题</Title>
      <Text>正文文本</Text>
      <Paragraph>这是一个段落，用于展示较长的文本内容。Typography 组件提供了常用的文本排版能力。</Paragraph>
    </Space>
  )
}
`" />

## API

### Title

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| level | 标题级别 | `1 \| 2 \| 3 \| 4 \| 5` | `1` |
| className | 自定义类名 | `string` | - |

### Text

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 自定义类名 | `string` | - |
| children | 内容 | `ReactNode` | - |

### Paragraph

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 自定义类名 | `string` | - |
| children | 内容 | `ReactNode` | - |
