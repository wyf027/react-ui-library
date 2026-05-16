import React from 'react'

import { Container } from '@wuyangfan/nova-ui'

const softBox: React.CSSProperties = {
  background: '#f9fafb',
  padding: 12,
  borderRadius: 8,
  border: '1px solid #e5e7eb',
}

export default function ContainerMainDemo() {
  return (
    <Container component="main" verticalPadding="md" aria-label="页面主体">
      <div style={softBox}>渲染为 &lt;main&gt;</div>
    </Container>
  )
}
