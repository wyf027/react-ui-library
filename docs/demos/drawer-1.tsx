import React from 'react'
import { Button, Drawer, Text } from '@wuyangfan/nova-ui'

export default () => {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>打开抽屉</Button>
      <Drawer open={open} onClose={() => setOpen(false)} title='抽屉标题'>
        <div className='space-y-3'>
          <Text>抽屉内容</Text>
          <Button>抽屉内操作</Button>
        </div>
      </Drawer>
    </>
  )
}
