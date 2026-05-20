import React from 'react'

import { Col, Row } from '@wuyangfan/nova-ui'

import { DEMO_BOX_CLASS } from './demoBox'

const compactBox = `${DEMO_BOX_CLASS} nova-doc-demo-box--compact`
const mutedBox = `${compactBox} nova-doc-demo-box--muted`

export default function ColSpanDemo() {
  return (
    <Row gap={8}>
      <Col span={4}>
        <div className={mutedBox}>span=4</div>
      </Col>
      <Col span={4}>
        <div className={compactBox}>span=4</div>
      </Col>
      <Col span={4}>
        <div className={mutedBox}>span=4</div>
      </Col>
    </Row>
  )
}
