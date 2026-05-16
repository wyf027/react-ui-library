import React from 'react'

import { Col, Row } from '@wuyangfan/nova-ui'

const soft: React.CSSProperties = {
  background: '#f9fafb',
  padding: 8,
  borderRadius: 4,
}

const alt: React.CSSProperties = {
  background: '#f3f4f6',
  padding: 8,
  borderRadius: 4,
}

export default function RowGapWrapDemo() {
  return (
    <Row gap={[16, 24]} wrap>
      <Col span={8}>
        <div style={soft}>A</div>
      </Col>
      <Col span={8}>
        <div style={alt}>B</div>
      </Col>
      <Col span={8}>
        <div style={soft}>C</div>
      </Col>
    </Row>
  )
}
