import React from 'react'

import { Button, Form, FormItem, Input } from '@wuyangfan/nova-ui'

export default function FormBasicDemo() {
  return (
    <Form
      initialValues={{ username: '', password: '' }}
      onSubmit={(values) => alert(JSON.stringify(values))}
    >
      <FormItem name="username" label="用户名" rules={[{ required: true, message: '请输入用户名' }]}>
        <Input placeholder="请输入用户名" />
      </FormItem>
      <FormItem
        name="password"
        label="密码"
        rules={[
          { required: true, message: '请输入密码' },
          { minLength: 6, message: '至少6个字符' },
        ]}
      >
        <Input type="password" placeholder="请输入密码" />
      </FormItem>
      <Button type="submit">提交</Button>
    </Form>
  )
}
