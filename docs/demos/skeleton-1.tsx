import React from 'react'
import { Skeleton, Space } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <Space direction='vertical' size={12}>
      <Skeleton />
      <Skeleton avatar />
      <Skeleton title paragraph={{ rows: 2 }} />
    </Space>
  )
}
