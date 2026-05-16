import React from 'react'

import { Button, Popconfirm } from '@wuyangfan/nova-ui'

export default function PopconfirmBasicDemo() {
  return (
    <Popconfirm
      description="此操作不可撤回"
      title="确认删除？"
      onCancel={() => alert('已取消')}
      onConfirm={() => alert('已确认')}
    >
      <Button color="danger">删除</Button>
    </Popconfirm>
  )
}
