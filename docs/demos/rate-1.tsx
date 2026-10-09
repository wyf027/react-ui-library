import React from 'react'
import { Rate, Space } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <Space direction='vertical' size={8}>
      <Rate defaultValue={3} />
      <Rate defaultValue={4} count={10} />
    </Space>
  )
}
