import React from 'react'

import { Toast } from '@wuyangfan/nova-ui'

/** 演示：长时间展示；生产环境请按需设置 duration 与 onClose */
export default function ToastBasicDemo() {
  return (
    <Toast
      className="!relative !bottom-auto !right-auto mx-auto max-w-md shadow-md"
      duration={999999}
      open
      status="success"
    >
      操作成功
    </Toast>
  )
}
