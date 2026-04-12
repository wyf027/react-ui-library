# Input 输入框

基础表单输入组件。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Space direction='vertical' size={8}>
      <Input label='用户名' placeholder='请输入用户名' />
      <Input label='密码' type='password' placeholder='请输入密码' />
      <Input placeholder='带前缀' prefix='🔍' />
      <Input placeholder='禁用状态' disabled />
    </Space>
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 输入值 | `string` | - |
| defaultValue | 默认值 | `string` | - |
| onValueChange | 值变化回调 | `(value: string) => void` | - |
| label | 标签 | `string` | - |
| placeholder | 占位文本 | `string` | - |
| prefix | 前缀 | `ReactNode` | - |
| suffix | 后缀 | `ReactNode` | - |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| disabled | 禁用 | `boolean` | `false` |
