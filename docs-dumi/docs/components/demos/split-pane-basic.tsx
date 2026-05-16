import React from 'react'

import { SplitPane } from '@wuyangfan/nova-ui'

const leftStyle: React.CSSProperties = {
  background: '#f9fafb',
  padding: '12px',
  border: '1px solid #e5e7eb',
  borderRadius: 8,
}

const rightStyle: React.CSSProperties = {
  background: '#f3f4f6',
  padding: '12px',
  border: '1px solid #e5e7eb',
  borderRadius: 8,
}

export default function SplitPaneBasicDemo() {
  return (
    <SplitPane
      left={<div style={leftStyle}>左侧面板</div>}
      ratio="1fr 2fr"
      right={<div style={rightStyle}>右侧面板</div>}
    />
  )
}
