import React from 'react'

import { InputNumber, Space } from '@wuyangfan/nova-ui'

export default function InputNumberBasicDemo() {
  return (
    <Space direction="vertical" size={8}>
      <InputNumber placeholder="数量" />
      <InputNumber defaultValue={5} max={10} min={0} step={1} />
      <InputNumber disabled defaultValue={3} />
    </Space>
  )
}
