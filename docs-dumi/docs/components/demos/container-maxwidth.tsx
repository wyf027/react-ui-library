import React from 'react'

import { Container } from '@wuyangfan/nova-ui'

const softBox: React.CSSProperties = {
  background: '#f9fafb',
  padding: 12,
  borderRadius: 8,
  border: '1px solid #e5e7eb',
}

const altBox: React.CSSProperties = {
  background: '#f3f4f6',
  padding: 12,
  borderRadius: 8,
  border: '1px dashed #d1d5db',
}

export default function ContainerMaxWidthDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Container maxWidth="md" padding="md">
        <div style={softBox}>maxWidth=&quot;md&quot;</div>
      </Container>
      <Container fluid padding="md">
        <div style={altBox}>fluid：取消版心最大宽度</div>
      </Container>
    </div>
  )
}
