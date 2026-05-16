import React from 'react'

import { Card, Space, Spin } from '@wuyangfan/nova-ui'

export default function SpinBasicDemo() {
  return (
    <Space direction="vertical" size={12}>
      <Spin tip="加载中..." />
      <Spin spinning>
        <Card title="卡片标题">被 Spin 包裹的内容区域</Card>
      </Spin>
    </Space>
  )
}
