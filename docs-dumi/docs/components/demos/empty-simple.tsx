import React from 'react'

import { Empty } from '@wuyangfan/nova-ui'

export default function EmptySimpleDemo() {
  return (
    <Empty description="无内容" image={<span style={{ fontSize: 28 }}>📄</span>} imageStyle={{ opacity: 0.85 }} simple />
  )
}
