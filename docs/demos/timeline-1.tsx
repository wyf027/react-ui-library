import React from 'react'
import { Timeline } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <Timeline items={[
      { key: '1', title: '创建项目', timestamp: '09:00' },
      { key: '2', title: '开发完成', timestamp: '10:30', color: 'success' },
      { key: '3', title: '发布上线', timestamp: '14:00', color: 'success' },
    ]} />
  )
}
