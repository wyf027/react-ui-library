import React from 'react'
import { VirtualList } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <VirtualList
      items={Array.from({ length: 100 }, (_, i) => 'Item ' + (i + 1))}
      renderItem={(item) => String(item)}
    />
  )
}
