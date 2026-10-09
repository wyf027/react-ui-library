import React from 'react'
import { Descriptions } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <Descriptions
      columns={2}
      items={[
        { key: 'a', label: '项目', children: 'Nova UI' },
        { key: 'b', label: '状态', children: '运行中' },
        { key: 'c', label: '负责人', children: 'Team A' },
      ]}
    />
  )
}
