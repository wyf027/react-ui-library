import React from 'react'
import { Icon, Space } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <Space>
      <Icon name='check' size={24}><svg className='h-full w-full' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2}><path d='m5 12 4 4L19 6' /></svg></Icon>
      <Icon name='close' size={24}><svg className='h-full w-full' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2}><path d='m6 6 12 12M18 6 6 18' /></svg></Icon>
      <Icon name='info' size={24}><svg className='h-full w-full' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2}><circle cx={12} cy={12} r={9} /><path d='M12 11v6M12 7v2' /></svg></Icon>
    </Space>
  )
}
