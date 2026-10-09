import React from 'react'
import { InputNumber, Space } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <Space direction='vertical' size={8}>
      <InputNumber defaultValue={3} min={1} max={10} />
      <InputNumber defaultValue={0} step={0.1} precision={2} />
      <InputNumber placeholder='无控制器' controls={false} />
      <InputNumber defaultValue={5} disabled />
    </Space>
  )
}
