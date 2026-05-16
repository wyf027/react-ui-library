import React from 'react'

import { Button, Card } from '@wuyangfan/nova-ui'

const coverStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg,#dbeafe,#e0e7ff)',
  height: 120,
}

export default function CardCoverDemo() {
  return (
    <Card
      actions={<Button size="sm" variant="outline">操作</Button>}
      cover={<div style={coverStyle} />}
      hoverable
      size="small"
      style={{ maxWidth: 360 }}
      title="示例"
    >
      正文区域
    </Card>
  )
}
