# Form 表单

表单组件，配合 FormItem 使用，提供验证、布局与提交能力。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Form
      initialValues={{ username: '', password: '' }}
      onSubmit={(values) => alert(JSON.stringify(values))}
    >
      <FormItem name='username' label='用户名' rules={[{ required: true, message: '请输入用户名' }]}>
        <Input placeholder='请输入用户名' />
      </FormItem>
      <FormItem
        name='password'
        label='密码'
        rules={[
          { required: true, message: '请输入密码' },
          { minLength: 6, message: '至少6个字符' },
        ]}
      >
        <Input type='password' placeholder='请输入密码' />
      </FormItem>
      <Button type='submit'>提交</Button>
    </Form>
  )
}
`" />

## API

### Form

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| initialValues | 初始值 | `Record<string, any>` | - |
| onSubmit | 提交回调 | `(values) => void` | - |

### FormItem

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 字段名 | `string` | - |
| label | 标签 | `string` | - |
| rules | 验证规则 | `FormRule[]` | - |
| dependencies | 依赖字段 | `string[]` | - |
