import React from 'react'

import { Select, Space } from '@wuyangfan/nova-ui'

export default function SelectBasicDemo() {
  return (
    <Space direction="vertical" size={8}>
      <Select
        label="角色"
        options={[
          { label: 'Admin', value: 'admin' },
          { label: 'Editor', value: 'editor' },
          { label: 'Viewer', value: 'viewer' },
        ]}
      />
    </Space>
  )
}
