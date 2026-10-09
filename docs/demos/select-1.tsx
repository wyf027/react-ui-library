import React from 'react'
import { Select, Space } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <Space direction='vertical' size={8}>
      <Select
        label='角色'
        helperText='请选择当前用户的权限角色'
        options={[
          { label: 'Admin', value: 'admin' },
          { label: 'Editor', value: 'editor' },
          { label: 'Viewer', value: 'viewer' },
        ]}
      />
      <Select
        label='状态'
        error='请选择状态'
        placeholder='请选择状态'
        options={[
          { label: '启用', value: 'enabled' },
          { label: '停用', value: 'disabled' },
        ]}
      />
    </Space>
  )
}
