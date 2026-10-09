import React from 'react'
import { Timeline } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <Timeline
      reverse
      items={[
        { key: '1', title: '提交申请', timestamp: '09:00' },
        { key: '2', title: '审核通过', timestamp: '10:30', color: 'success' },
        { key: '3', title: '完成归档', timestamp: '14:00', color: 'success' },
      ]}
    />
  )
}
