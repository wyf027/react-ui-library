import React from 'react'

import { Tabs } from '@wuyangfan/nova-ui'

export default function TabsBasicDemo() {
  return (
    <Tabs
      items={[
        { key: 'tab1', label: '标签 1', content: '内容 1' },
        { key: 'tab2', label: '标签 2', content: '内容 2' },
        { key: 'tab3', label: '标签 3', content: '内容 3' },
      ]}
    />
  )
}
