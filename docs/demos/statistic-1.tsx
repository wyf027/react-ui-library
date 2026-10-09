import React from 'react'
import { Space, Statistic } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <Space size={24}>
      <Statistic title='月收入' value={128900} prefix='¥' />
      <Statistic title='用户数' value={1024} suffix='人' />
    </Space>
  )
}
