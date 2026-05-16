import React from 'react'

import { Grid } from '@wuyangfan/nova-ui'

const soft: React.CSSProperties = {
  background: '#f9fafb',
  padding: '12px',
  border: '1px solid #e5e7eb',
  borderRadius: 8,
}

const alt: React.CSSProperties = {
  background: '#f3f4f6',
  padding: '12px',
  border: '1px solid #e5e7eb',
  borderRadius: 8,
}

export default function GridBasicDemo() {
  return (
    <Grid cols={3} gap={8}>
      <div style={soft}>A</div>
      <div style={alt}>B</div>
      <div style={soft}>C</div>
    </Grid>
  )
}
