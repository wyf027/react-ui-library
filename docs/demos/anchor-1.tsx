import React from 'react'
import { Anchor } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <Anchor items={[
      { key: 'a1', href: '#section-a', title: 'Section A' },
      { key: 'a2', href: '#section-b', title: 'Section B' },
    ]} />
  )
}
