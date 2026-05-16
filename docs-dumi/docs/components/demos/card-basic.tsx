import React from 'react'

import { Button, Card, Space } from '@wuyangfan/nova-ui'

export default function CardBasicDemo() {
  return (
    <Space direction="vertical" size={8}>
      <Card title="卡片标题">卡片内容</Card>
      <Card extra={<Button size="sm" variant="ghost">更多</Button>} title="带操作">
        卡片内容
      </Card>
    </Space>
  )
}
