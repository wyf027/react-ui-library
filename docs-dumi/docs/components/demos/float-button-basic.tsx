import React from 'react'

import { FloatButton } from '@wuyangfan/nova-ui'

export default function FloatButtonBasicDemo() {
  return (
    <div
      style={{
        background: '#f9fafb',
        border: '1px solid #e5e7eb',
        borderRadius: 8,
        height: 120,
        position: 'relative',
      }}
    >
      <FloatButton className="!absolute !bottom-3 !right-3 !left-auto !top-auto" tooltip="添加" />
    </div>
  )
}
