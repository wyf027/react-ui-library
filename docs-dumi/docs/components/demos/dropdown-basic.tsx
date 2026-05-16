import React from 'react'

import { Button, Dropdown } from '@wuyangfan/nova-ui'

export default function DropdownBasicDemo() {
  return (
    <Dropdown
      trigger={<Button variant="outline">下拉菜单</Button>}
      options={[
        { key: 'profile', label: '个人信息' },
        { key: 'settings', label: '设置' },
        { key: 'logout', label: '退出' },
      ]}
    />
  )
}
