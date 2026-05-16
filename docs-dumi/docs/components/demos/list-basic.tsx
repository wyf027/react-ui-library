import React from 'react'

import { List } from '@wuyangfan/nova-ui'

export default function ListBasicDemo() {
  return (
    <List
      dataSource={[
        { description: '管理员', key: '1', title: 'Alice' },
        { description: '编辑者', key: '2', title: 'Bob' },
        { description: '访客', key: '3', title: 'Charlie' },
      ]}
      footer="共 3 人"
      header="用户列表"
    />
  )
}
