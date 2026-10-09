import React from 'react'
import { Button, Modal, Text } from '@wuyangfan/nova-ui'

export default () => {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>打开对话框</Button>
      <Modal open={open} onClose={() => setOpen(false)} title='对话框标题'>
        <Text>对话框内容</Text>
      </Modal>
    </>
  )
}
