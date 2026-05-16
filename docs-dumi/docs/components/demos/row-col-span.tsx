import React from 'react'

import { Col, Row } from '@wuyangfan/nova-ui'

const soft: React.CSSProperties = {
  background: '#f9fafb',
  padding: '8px',
  border: '1px solid #e5e7eb',
  borderRadius: 4,
}

const alt: React.CSSProperties = {
  background: '#f3f4f6',
  padding: '8px',
  border: '1px solid #e5e7eb',
  borderRadius: 4,
}

export default function RowColSpanDemo() {
  return (
    <Row gap={8}>
      <Col span={6}>
        <div style={soft}>Col 6</div>
      </Col>
      <Col span={6}>
        <div style={alt}>Col 6</div>
      </Col>
    </Row>
  )
}
