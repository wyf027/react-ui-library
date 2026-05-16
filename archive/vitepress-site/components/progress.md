# Progress 进度条

进度展示组件。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Space direction='vertical' size={8}>
      <Progress percent={30} />
      <Progress percent={70} status='success' />
      <Progress percent={50} status='exception' />
    </Space>
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| percent | 百分比 | `number` | - |
| status | 状态 | `'normal' \| 'success' \| 'exception'` | `'normal'` |
| showInfo | 显示百分比文字 | `boolean` | `true` |
