import React from 'react'

import { Space, Tag } from '@wuyangfan/nova-ui'

export default function TagBasicDemo() {
  return (
    <Space>
      <Tag>默认</Tag>
      <Tag color="success">成功</Tag>
      <Tag color="warning">警告</Tag>
      <Tag color="danger">错误</Tag>
    </Space>
  )
}
