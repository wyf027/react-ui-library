import React from 'react'

import { Descriptions } from '@wuyangfan/nova-ui'

export default function DescriptionsBasicDemo() {
  return (
    <Descriptions
      columns={2}
      items={[
        { children: 'Nova UI', key: 'a', label: '项目' },
        { children: '运行中', key: 'b', label: '状态' },
        { children: 'Team A', key: 'c', label: '负责人' },
      ]}
    />
  )
}
