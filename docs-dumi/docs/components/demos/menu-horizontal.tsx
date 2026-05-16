import React from 'react'

import { Menu } from '@wuyangfan/nova-ui'

export default function MenuHorizontalDemo() {
  return (
    <Menu
      items={[
        { key: 'home', label: '首页' },
        { key: 'docs', label: '文档' },
        { key: 'about', label: '关于' },
      ]}
      mode="horizontal"
      selectedKey="docs"
    />
  )
}
