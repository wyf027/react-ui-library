import React from 'react'
import { Radio, Space } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <Space direction='vertical' size={8}>
      <Space>
        <Radio name='lang' label='中文' value='zh' />
        <Radio name='lang' label='English' value='en' helperText='用于界面语言' />
      </Space>
      <Radio name='plan' label='请选择套餐' value='required' error='请选择一个套餐' />
    </Space>
  )
}
