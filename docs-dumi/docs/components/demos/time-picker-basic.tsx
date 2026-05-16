import React from 'react'

import { Space, TimePicker } from '@wuyangfan/nova-ui'

export default function TimePickerBasicDemo() {
  return (
    <Space direction="vertical" size={8}>
      <TimePicker placeholder="选择时间" />
      <TimePicker defaultValue="14:30" />
      <TimePicker disabled placeholder="禁用状态" />
    </Space>
  )
}
