import React from 'react'

import { Skeleton, Space } from '@wuyangfan/nova-ui'

export default function SkeletonBasicDemo() {
  return (
    <Space direction="vertical" size={12}>
      <Skeleton />
      <Skeleton avatar />
      <Skeleton paragraph={{ rows: 2 }} title />
    </Space>
  )
}
