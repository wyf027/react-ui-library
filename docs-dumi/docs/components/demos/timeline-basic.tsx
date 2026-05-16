import React from 'react'

import { Timeline } from '@wuyangfan/nova-ui'

export default function TimelineBasicDemo() {
  return (
    <Timeline
      items={[
        { key: '1', title: '创建项目' },
        { color: 'success', key: '2', title: '开发完成' },
        { color: 'success', key: '3', title: '发布上线' },
      ]}
    />
  )
}
