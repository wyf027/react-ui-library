import React from 'react'

import { Loading, Space } from '@wuyangfan/nova-ui'

export default function LoadingBasicDemo() {
  return (
    <Space>
      <Loading size="sm" text="加载中..." />
      <Loading size="md" />
      <Loading size="lg" text="请稍候" />
    </Space>
  )
}
