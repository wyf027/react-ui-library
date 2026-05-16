import React from 'react'

import { Radio, Space } from '@wuyangfan/nova-ui'

export default function RadioBasicDemo() {
  return (
    <Space>
      <Radio label="中文" name="lang" value="zh" />
      <Radio label="English" name="lang" value="en" />
    </Space>
  )
}
