import React from 'react'
import { Button, Card, Space } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <Space direction='vertical' size={8}>
      <Card title='卡片标题'>卡片内容</Card>
      <Card title='带操作' extra={<Button size='sm' variant='ghost'>更多</Button>}>卡片内容</Card>
    </Space>
  )
}
