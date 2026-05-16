import React from 'react'

import { Progress, Space } from '@wuyangfan/nova-ui'

export default function ProgressBasicDemo() {
  return (
    <Space direction="vertical" size={8}>
      <Progress percent={30} />
      <Progress percent={70} status="success" />
      <Progress percent={50} status="exception" />
    </Space>
  )
}
