# Result 结果

结果状态页组件。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Result status='success' title='操作成功' subTitle='一切正常。' />
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| status | 状态 | `'success' \| 'error' \| 'info' \| 'warning'` | - |
| title | 标题 | `string` | - |
| subTitle | 副标题 | `string` | - |
| extra | 操作区 | `ReactNode` | - |
