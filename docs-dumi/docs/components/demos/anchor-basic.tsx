import React from 'react'

import { Anchor } from '@wuyangfan/nova-ui'

export default function AnchorBasicDemo() {
  return (
    <Anchor
      items={[
        { href: '#section-a', key: 'a1', title: 'Section A' },
        { href: '#section-b', key: 'a2', title: 'Section B' },
      ]}
    />
  )
}
