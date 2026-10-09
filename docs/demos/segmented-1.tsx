import React from 'react'
import { Segmented } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <Segmented
      options={[
        { label: '日', value: 'day' },
        { label: '周', value: 'week' },
        { label: '月', value: 'month' },
      ]}
      defaultValue='day'
    />
  )
}
