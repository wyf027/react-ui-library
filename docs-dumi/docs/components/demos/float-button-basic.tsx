import React from 'react'

import { FloatButton } from '@wuyangfan/nova-ui'

import { DEMO_BOX_CLASS } from './demoBox'

export default function FloatButtonBasicDemo() {
  return (
    <div
      className={`${DEMO_BOX_CLASS} nova-doc-demo-box--muted`}
      style={{ height: 120, position: 'relative' }}
    >
      <FloatButton className="!absolute !bottom-3 !right-3 !left-auto !top-auto" tooltip="添加" />
    </div>
  )
}
