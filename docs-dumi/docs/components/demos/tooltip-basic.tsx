import React from 'react'

import { Button, Space, Tooltip } from '@wuyangfan/nova-ui'

export default function TooltipBasicDemo() {
  return (
    <Space>
      <Tooltip content="提示文字">
        <Button>悬停查看</Button>
      </Tooltip>
      <Tooltip content="已禁用" disabled>
        <Button variant="outline">禁用</Button>
      </Tooltip>
    </Space>
  )
}
