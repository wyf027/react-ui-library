import React from 'react'
import { Avatar, Space } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <Space>
      <Avatar name='Alice' />
      <Avatar name='Bob' size={48} />
      <Avatar src='https://i.pravatar.cc/40' alt='Demo user' />
    </Space>
  )
}
