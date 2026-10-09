import React from 'react'
import { Table } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <Table
      columns={[
        { key: 'name', title: '姓名', sorter: (a, b) => String(a.name).localeCompare(String(b.name)) },
        { key: 'role', title: '角色', filters: [{ text: 'Admin', value: 'Admin' }, { text: 'Editor', value: 'Editor' }] },
      ]}
      dataSource={[
        { name: 'Alice', role: 'Admin' },
        { name: 'Bob', role: 'Editor' },
      ]}
      title='用户表'
      searchable
      rowKey='name'
    />
  )
}
