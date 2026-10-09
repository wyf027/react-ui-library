import React from 'react'
import { Input, Space } from '@wuyangfan/nova-ui'

export default () => {
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
