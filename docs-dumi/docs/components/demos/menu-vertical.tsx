import React, { useState } from 'react'

import { Menu } from '@wuyangfan/nova-ui'

export default function MenuVerticalDemo() {
  const [selected, setSelected] = useState('home')
  const [open, setOpen] = useState<string[]>([])

  return (
    <Menu
      items={[
        { key: 'home', label: '首页' },
        {
          children: [
            { key: 'guide', label: '指南' },
            { key: 'api', label: 'API' },
          ],
          key: 'docs',
          label: '文档',
        },
        { disabled: true, key: 'about', label: '关于' },
      ]}
      mode="vertical"
      openKeys={open}
      selectedKey={selected}
      onChange={setSelected}
      onOpenChange={setOpen}
    />
  )
}
