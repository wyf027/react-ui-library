import React from 'react'
import { SplitPane } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <SplitPane
      ratio='1fr 2fr'
      left={
        <div
          style={{
            background: 'var(--nova-color-bg)',
            padding: '12px',
            border: '1px solid var(--nova-color-border)',
            borderRadius: 8,
          }}
        >
          左侧面板
        </div>
      }
      right={
        <div
          style={{
            background: 'var(--nova-color-bg)',
            padding: '12px',
            border: '1px solid var(--nova-color-border)',
            borderRadius: 8,
          }}
        >
          右侧面板
        </div>
      }
    />
  )
}
