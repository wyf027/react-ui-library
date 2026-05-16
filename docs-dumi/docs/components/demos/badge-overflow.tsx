import React from 'react'

import { Avatar, Badge, Space } from '@wuyangfan/nova-ui'

export default function BadgeOverflowDemo() {
  return (
    <Space size={24}>
      <Badge count={120} overflowCount={99}>
        <Avatar name="A" size={40} />
      </Badge>
      <Badge count={0} showZero>
        <Avatar name="B" size={40} />
      </Badge>
      <Badge dot status="success">
        <Avatar name="C" size={40} />
      </Badge>
    </Space>
  )
}
