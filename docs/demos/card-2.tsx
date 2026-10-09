import React from 'react'
import { Button, Card } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <Card
      style={{ maxWidth: 360 }}
      hoverable
      size='small'
      title='示例'
      cover={<div style={{height:120,background:'linear-gradient(135deg,#dbeafe,#e0e7ff)'}} />}
      actions={<Button size='sm' variant='outline'>操作</Button>}
    >
      正文区域
    </Card>
  )
}
