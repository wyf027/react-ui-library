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
      <div style={{ maxWidth: 180 }}>
        <Title ellipsis level={4}>
          超长标题会在单行末尾省略，悬停可看完整 tooltip
        </Title>
        <Text ellipsis>超长辅助说明同样支持单行省略与原生 title。</Text>
      </div>
    </Space>
  )
}
`" />

## API

### Title

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| level | 标题级别 | `1 \| 2 \| 3 \| 4 \| 5` | `2` |
| ellipsis | 单行省略（**`min-w-0 truncate`**）。`children` 为字符串且未传 **`title`** 时，自动设置原生 **`title`** 以便悬停查看全文 | `boolean` | `false` |
| className | 自定义类名 | `string` | - |

其余 **`HTMLHeadingElement`** 属性透传（如 **`id`**、显式 **`title`** 覆盖自动 tooltip）。

### Text

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| ellipsis | 同上，单行省略与可选原生 **`title`** | `boolean` | `false` |
| className | 自定义类名 | `string` | - |
| children | 内容 | `ReactNode` | - |

其余 **`HTMLSpanElement`** 属性透传。

### Paragraph

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 自定义类名 | `string` | - |
| children | 内容 | `ReactNode` | - |
