import React from 'react'

import { Space, Switch } from '@wuyangfan/nova-ui'

export default function SwitchBasicDemo() {
  return (
    <Space>
      <Switch />
      <Switch defaultChecked />
      <Switch disabled />
    </Space>
  )
}
