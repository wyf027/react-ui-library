import React from 'react'

import { Divider, Space, Text } from '@wuyangfan/nova-ui'

export default function DividerBasicDemo() {
  return (
    <Space direction="vertical" size={8}>
      <Text>上方内容</Text>
      <Divider />
      <Text>下方内容</Text>
    </Space>
  )
}
