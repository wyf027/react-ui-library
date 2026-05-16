import React, { useState } from 'react'

import { Button, Tour } from '@wuyangfan/nova-ui'

export default function TourBasicDemo() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        开始引导
      </Button>
      <Tour
        open={open}
        steps={[
          { key: '1', title: '欢迎', description: '这是第一步。' },
          { key: '2', title: '完成', description: '引导结束。' },
        ]}
        onClose={() => setOpen(false)}
      />
    </>
  )
}
