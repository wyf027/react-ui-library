import React from 'react'
import { List } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <div className='space-y-4'>
      <List
        header='用户列表'
        dataSource={[
          { key: '1', title: 'Alice', description: '管理员', content: null },
          { key: '2', title: 'Bob', description: '编辑者', content: null },
          { key: '3', title: 'Charlie', description: '访客', content: null },
        ]}
        footer='共 3 人'
      />
      <List header='加载中' loading aria-label='用户列表加载状态' />
    </div>
  )
}
