import React from 'react'

import { SplitPane } from '@wuyangfan/nova-ui'

import { DEMO_BOX_CLASS } from './demoBox'

const mutedBox = `${DEMO_BOX_CLASS} nova-doc-demo-box--compact nova-doc-demo-box--muted`

export default function SplitPaneBasicDemo() {
  return (
    <SplitPane
      left={<div className={mutedBox}>左侧面板</div>}
      ratio="1fr 2fr"
      right={<div className={DEMO_BOX_CLASS}>右侧面板</div>}
    />
  )
}
