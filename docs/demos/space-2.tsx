import React from 'react'
import { Space, Text } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <Space size='large' split={<span style={{color:'var(--nova-color-muted)'}}>|</span>}>
      <Text>北京</Text>
      <Text>上海</Text>
      <Text>广州</Text>
    </Space>
  )
}
