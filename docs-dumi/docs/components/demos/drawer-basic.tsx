import React, { useState } from 'react'

import { Button, Drawer, Text } from '@wuyangfan/nova-ui'

export default function DrawerBasicDemo() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>打开抽屉</Button>
      <Drawer open={open} onClose={() => setOpen(false)} title="抽屉标题">
        <Text>抽屉内容</Text>
      </Drawer>
    </>
  )
}
