import React from 'react'
import { Checkbox, Space } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <Space direction='vertical' size={8}>
      <Checkbox label='选项 A' helperText='可选择多个选项' />
      <Checkbox label='选项 B' defaultChecked />
      <Checkbox label='必须同意' error='请先同意条款' />
      <Checkbox label='禁用' disabled />
    </Space>
  )
}
