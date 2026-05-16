import React from 'react'

import { Container } from '@wuyangfan/nova-ui'

const boxStyle: React.CSSProperties = {
  background: '#f3f4f6',
  padding: '16px',
  borderRadius: '8px',
  border: '1px solid #e5e7eb',
}

export default function ContainerDefaultDemo() {
  return (
    <Container>
      <div style={boxStyle}>默认容器（居中、有最大宽度）</div>
    </Container>
  )
}
