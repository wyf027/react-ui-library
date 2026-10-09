import React from 'react'
import { Grid } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <Grid cols={3} gap={8}>
      <div
        style={{
          background: 'var(--nova-color-bg)',
          padding: '12px',
          border: '1px solid var(--nova-color-border)',
          borderRadius: 8,
        }}
      >
        A
      </div>
      <div
        style={{
          background: 'var(--nova-color-bg)',
          padding: '12px',
          border: '1px solid var(--nova-color-border)',
          borderRadius: 8,
        }}
      >
        B
      </div>
      <div
        style={{
          background: 'var(--nova-color-bg)',
          padding: '12px',
          border: '1px solid var(--nova-color-border)',
          borderRadius: 8,
        }}
      >
        C
      </div>
    </Grid>
  )
}
