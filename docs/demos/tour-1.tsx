import React from 'react'
import { Button, Tour } from '@wuyangfan/nova-ui'

export default () => {
  const [open, setOpen] = React.useState(false)
  return (
    <>
    <Button onClick={() => setOpen(true)}>开始引导</Button>
    <Tour
      open={open}
      onClose={() => setOpen(false)}
      steps={[
        { key: '1', title: '欢迎', description: '这是第一步。' },
        { key: '2', title: '完成', description: '引导结束。' },
      ]}
    />
    </>
  )
}
