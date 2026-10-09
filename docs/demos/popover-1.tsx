import React from 'react'
import { Button, Popover } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <Popover trigger={<Button variant='outline'>点击弹出</Button>} content='气泡卡片内容' />
  )
}
