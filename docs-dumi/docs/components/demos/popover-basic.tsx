import React from 'react'

import { Button, Popover } from '@wuyangfan/nova-ui'

export default function PopoverBasicDemo() {
  return <Popover content="气泡卡片内容" trigger={<Button variant="outline">点击弹出</Button>} />
}
