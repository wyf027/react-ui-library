import React from 'react'

import { Col, Row } from '@wuyangfan/nova-ui'

import { DEMO_BOX_CLASS } from './demoBox'

const compactBox = `${DEMO_BOX_CLASS} nova-doc-demo-box--compact`
const mutedBox = `${compactBox} nova-doc-demo-box--muted`

export default function RowColSpanDemo() {
  return (
    <Row gap={8}>
      <Col span={6}>
        <div className={mutedBox}>Col 6</div>
      </Col>
      <Col span={6}>
        <div className={compactBox}>Col 6</div>
      </Col>
    </Row>
  )
}
