import React from 'react'
import { Container } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <Container>
      <div
        style={{
          background: 'var(--nova-color-bg)',
          padding: '16px',
          borderRadius: '8px',
          border: '1px solid var(--nova-color-border)',
        }}
      >
        默认容器（居中、有最大宽度）
      </div>
    </Container>
  )
}
