import React from 'react'
import { Space, TimePicker } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <Space direction='vertical' size={8}>
      <TimePicker aria-label='开始时间' placeholder='选择时间' />
      <TimePicker aria-label='结束时间' defaultValue='14:30' />
      <TimePicker aria-label='禁用时间' disabled placeholder='禁用状态' />
    </Space>
  )
}
