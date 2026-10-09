import React from 'react'
import { Container } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <Container component='main' verticalPadding='md' aria-label='页面主体'>
      <div
        style={{
          background: 'var(--nova-color-bg)',
          padding: 12,
          borderRadius: 8,
          border: '1px solid var(--nova-color-border)',
        }}
      >
        渲染为 &lt;main&gt;
      </div>
    </Container>
  )
}
