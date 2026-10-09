import React from 'react'
import { Button, Popconfirm } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <Popconfirm
      title='确认删除？'
      description='此操作不可撤回'
      onConfirm={() => alert('已确认')}
      onCancel={() => alert('已取消')}
    >
      <Button color='danger'>删除</Button>
    </Popconfirm>
  )
}
