import React from 'react'

import { Col, Row } from '@wuyangfan/nova-ui'

import { DEMO_BOX_CLASS } from './demoBox'

const compactBox = `${DEMO_BOX_CLASS} nova-doc-demo-box--compact nova-doc-demo-box--muted`
const altBox = `${DEMO_BOX_CLASS} nova-doc-demo-box--compact`

export default function RowGapWrapDemo() {
  return (
    <Row gap={[16, 24]} wrap>
      <Col span={8}>
        <div className={compactBox}>A</div>
      </Col>
      <Col span={8}>
        <div className={altBox}>B</div>
      </Col>
      <Col span={8}>
        <div className={compactBox}>C</div>
      </Col>
    </Row>
  )
}
