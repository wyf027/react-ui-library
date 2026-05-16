import React, { useState } from 'react'

import { Button, Modal, Text } from '@wuyangfan/nova-ui'

export default function ModalBasicDemo() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>打开对话框</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="对话框标题">
        <Text>对话框内容</Text>
      </Modal>
    </>
  )
}
