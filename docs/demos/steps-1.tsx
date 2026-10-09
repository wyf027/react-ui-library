import React from 'react'
import { Steps } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <Steps items={[
      { key: '1', title: '创建' },
      { key: '2', title: '审核' },
      { key: '3', title: '完成' },
    ]} current={1} />
  )
}
