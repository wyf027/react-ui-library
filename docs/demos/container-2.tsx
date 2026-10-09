import React from 'react'
import { Container } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Container maxWidth='md' padding='md'>
        <div
          style={{
            background: 'var(--nova-color-bg)',
            padding: 12,
            borderRadius: 8,
            border: '1px solid var(--nova-color-border)',
          }}
        >
          maxWidth=&quot;md&quot;
        </div>
      </Container>
      <Container fluid padding='md'>
        <div
          style={{
            background: 'var(--nova-color-bg)',
            padding: 12,
            borderRadius: 8,
            border: '1px dashed var(--nova-color-border)',
          }}
        >
          fluid：取消版心最大宽度
        </div>
      </Container>
    </div>
  )
}
