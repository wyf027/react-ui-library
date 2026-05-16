# Statistic 统计数值

展示统计数值。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Space size={24}>
      <Statistic title='月收入' value={128900} prefix='¥' />
      <Statistic title='用户数' value={1024} suffix='人' />
    </Space>
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `string` | - |
| value | 数值 | `number \| string` | - |
| prefix | 前缀 | `ReactNode` | - |
| suffix | 后缀 | `ReactNode` | - |
