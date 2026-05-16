import React from 'react'

import { Input, Space } from '@wuyangfan/nova-ui'

export default function InputBasicDemo() {
  return (
    <Space direction="vertical" size={8}>
      <Input label="用户名" placeholder="请输入用户名" />
      <Input label="密码" type="password" placeholder="请输入密码" />
      <Input placeholder="带前缀" prefix="🔍" />
      <Input placeholder="禁用状态" disabled />
    </Space>
  )
}
