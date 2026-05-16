import React from 'react'

import { Transfer } from '@wuyangfan/nova-ui'

export default function TransferBasicDemo() {
  return (
    <Transfer
      dataSource={[
        { key: 'a', title: '项目 A' },
        { key: 'b', title: '项目 B' },
        { key: 'c', title: '项目 C' },
      ]}
      targetKeys={['b']}
    />
  )
}
