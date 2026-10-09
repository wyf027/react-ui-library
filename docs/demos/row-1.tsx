import React from 'react'
import { Col, Row } from '@wuyangfan/nova-ui'

export default <Row gap={8}>
  <Col span={6}>
    <div
      style={{
        background: 'var(--nova-color-bg)',
        padding: '8px',
        border: '1px solid var(--nova-color-border)',
        borderRadius: 4,
      }}
    >
      Col 6
    </div>
  </Col>
  <Col span={6}>
    <div
      style={{
        background: 'var(--nova-color-bg)',
        padding: '8px',
        border: '1px solid var(--nova-color-border)',
        borderRadius: 4,
      }}
    >
      Col 6
    </div>
  </Col>
</Row>
