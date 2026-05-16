import React from 'react'

import { Button, Space, Tag } from '@wuyangfan/nova-ui'

export default function SpaceBasicDemo() {
  return (
    <Space direction="vertical" size={12}>
      <Space size={8}>
        <Button>按钮 1</Button>
        <Button variant="outline">按钮 2</Button>
        <Button variant="ghost">按钮 3</Button>
      </Space>
      <Space direction="vertical" size={8}>
        <Tag color="success">标签 A</Tag>
        <Tag color="warning">标签 B</Tag>
      </Space>
    </Space>
  )
}
