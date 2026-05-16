import React from 'react'

import { Space, Text } from '@wuyangfan/nova-ui'

export default function SpaceSplitDemo() {
  return (
    <Space size="large" split={<span style={{ color: '#94a3b8' }}>|</span>}>
      <Text>北京</Text>
      <Text>上海</Text>
      <Text>广州</Text>
    </Space>
  )
}
