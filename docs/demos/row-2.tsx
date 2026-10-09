import React from 'react'
import { Col, Row } from '@wuyangfan/nova-ui'

export default <Row gap={[16, 24]} wrap>
  <Col span={8}><div style={{background:'var(--nova-color-bg)',padding:8,borderRadius:4}}>A</div></Col>
  <Col span={8}><div style={{background:'var(--nova-color-bg)',padding:8,borderRadius:4}}>B</div></Col>
  <Col span={8}><div style={{background:'var(--nova-color-bg)',padding:8,borderRadius:4}}>C</div></Col>
</Row>
