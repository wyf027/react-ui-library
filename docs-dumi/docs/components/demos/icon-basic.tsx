import React from 'react'

import { Icon, Space } from '@wuyangfan/nova-ui'

export default function IconBasicDemo() {
  return (
    <Space>
      <Icon name="check" size={24} />
      <Icon name="loading" size={24} spin />
      <Icon decorative={false} aria-label="成功" name="check" size={24} />
    </Space>
  )
}
