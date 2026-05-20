import React from 'react'

import { Button, Flex, Space, Text } from '@wuyangfan/nova-ui'

import { DEMO_BOX_CLASS } from './demoBox'

const compactBox = `${DEMO_BOX_CLASS} nova-doc-demo-box--compact`
const mutedBox = `${compactBox} nova-doc-demo-box--muted`

export default function FlexBasicDemo() {
  return (
    <Space direction="vertical" size={12}>
      <Flex gap={8} align="center">
        <Button>按钮 A</Button>
        <Button variant="outline">按钮 B</Button>
        <Button variant="ghost">按钮 C</Button>
      </Flex>
      <Flex vertical gap={8}>
        <div className={mutedBox}>垂直排列 1</div>
        <div className={compactBox}>垂直排列 2</div>
      </Flex>
      <Flex justify="between" align="center">
        <Text>左侧内容</Text>
        <Button size="sm">右侧按钮</Button>
      </Flex>
    </Space>
  )
}
