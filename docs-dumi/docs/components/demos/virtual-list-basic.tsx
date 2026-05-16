import React from 'react'

import { VirtualList } from '@wuyangfan/nova-ui'

export default function VirtualListBasicDemo() {
  return (
    <VirtualList
      height={240}
      items={Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`)}
      renderItem={(item) => item}
    />
  )
}
