import React from 'react'

import { Avatar, Badge, Space } from '@wuyangfan/nova-ui'

export default function BadgeBasicDemo() {
  return (
    <Space size={16}>
      <Badge count={5}>
        <Avatar name="U" size={40} />
      </Badge>
      <Badge dot>
        <Avatar name="V" size={40} />
      </Badge>
      <Badge count={99}>
        <Avatar name="W" size={40} />
      </Badge>
    </Space>
  )
}
