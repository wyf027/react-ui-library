import React from 'react'

import { Checkbox, Space } from '@wuyangfan/nova-ui'

export default function CheckboxBasicDemo() {
  return (
    <Space>
      <Checkbox label="选项 A" />
      <Checkbox defaultChecked label="选项 B" />
      <Checkbox disabled label="禁用" />
    </Space>
  )
}
