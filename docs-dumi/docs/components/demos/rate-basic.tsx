import React from 'react'

import { Rate, Space } from '@wuyangfan/nova-ui'

export default function RateBasicDemo() {
  return (
    <Space direction="vertical" size={8}>
      <Rate defaultValue={3} />
      <Rate count={10} defaultValue={4} />
    </Space>
  )
}
