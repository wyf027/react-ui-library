import React from 'react'
import { Transfer } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <Transfer
      dataSource={[
        { key: '1', title: '选项 A' },
        { key: '2', title: '选项 B' },
        { key: '3', title: '选项 C' },
      ]}
    />
  )
}
