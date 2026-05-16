import React, { useState } from 'react'

import { Table } from '@wuyangfan/nova-ui'

export default function TableBasicDemo() {
  const [page, setPage] = useState(1)
  const pageSize = 2
  const all = [
    { name: 'Alice', role: 'Admin' },
    { name: 'Bob', role: 'Editor' },
    { name: 'Carol', role: 'Editor' },
  ]

  return (
    <Table
      caption="团队成员（示例）"
      columns={[
        {
          key: 'name',
          title: '姓名',
          sorter: (a, b) => String(a.name).localeCompare(String(b.name)),
        },
        {
          key: 'role',
          title: '角色',
          filters: [
            { text: 'Admin', value: 'Admin' },
            { text: 'Editor', value: 'Editor' },
          ],
        },
      ]}
      dataSource={all}
      title="用户表"
      searchable
      rowKey="name"
      pagination={{
        current: page,
        pageSize,
        total: all.length,
        onChange: (p) => setPage(p),
      }}
    />
  )
}
