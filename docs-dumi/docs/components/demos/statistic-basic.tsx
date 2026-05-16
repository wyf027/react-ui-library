import React from 'react'

import { Space, Statistic } from '@wuyangfan/nova-ui'

export default function StatisticBasicDemo() {
  return (
    <Space size={24}>
      <Statistic prefix="¥" title="月收入" value={128900} />
      <Statistic suffix="人" title="用户数" value={1024} />
    </Space>
  )
}
