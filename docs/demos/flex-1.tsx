import React from 'react'
import { Button, Flex, Space, Text } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <Space direction='vertical' size={12}>
      <Flex gap={8} align='center'>
        <Button>按钮 A</Button>
        <Button variant='outline'>按钮 B</Button>
        <Button variant='ghost'>按钮 C</Button>
      </Flex>
      <Flex vertical gap={8}>
        <div
          style={{
            background: 'var(--nova-color-bg)',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid var(--nova-color-border)',
          }}
        >
          垂直排列 1
        </div>
        <div
          style={{
            background: 'var(--nova-color-bg)',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid var(--nova-color-border)',
          }}
        >
          垂直排列 2
        </div>
      </Flex>
      <Flex justify='between' align='center'>
        <Text>左侧内容</Text>
        <Button size='sm'>右侧按钮</Button>
      </Flex>
    </Space>
  )
}
