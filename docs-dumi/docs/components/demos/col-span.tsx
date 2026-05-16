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

export default function ColSpanDemo() {
  return (
    <Row gap={8}>
      <Col span={4}>
        <div style={soft}>span=4</div>
      </Col>
      <Col span={4}>
        <div style={alt}>span=4</div>
      </Col>
      <Col span={4}>
        <div style={soft}>span=4</div>
      </Col>
    </Row>
  )
}
