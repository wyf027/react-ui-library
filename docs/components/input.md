# Input 输入框

基础表单输入组件。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Space direction='vertical' size={8}>
      <Input label='用户名' placeholder='请输入用户名' helperText='用于登录和展示' />
      <Input label='密码' type='password' placeholder='请输入密码' />
      <Input placeholder='带前缀' prefix='🔍' aria-label='搜索' />
      <Input label='邮箱' error='请输入有效邮箱地址' />
      <Input placeholder='禁用状态' disabled aria-label='禁用输入框' />
    </Space>
  )
}
`" />

## 可访问性

`label` 会通过 `htmlFor` 与输入框关联。传入 `helperText` 时，组件会自动通过 `aria-describedby` 将说明文本关联到输入框；传入 `error` 时，输入框会自动设置 `aria-invalid="true"`，并将错误信息作为可访问描述。

如果你同时传入自定义 `aria-describedby`，组件会保留已有描述并追加内部 helper/error 描述，避免覆盖业务侧已有的说明关系。

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 输入值 | `string` | - |
| defaultValue | 默认值 | `string` | - |
| onValueChange | 值变化回调 | `(value: string) => void` | - |
| label | 标签 | `ReactNode` | - |
| helperText | 帮助说明，会自动关联到输入框描述 | `ReactNode` | - |
| error | 错误说明，会自动设置错误状态并关联到输入框描述 | `ReactNode` | - |
| placeholder | 占位文本 | `string` | - |
| prefix | 前缀 | `ReactNode` | - |
| suffix | 后缀 | `ReactNode` | - |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| disabled | 禁用 | `boolean` | `false` |
