import React from 'react'

import { Container } from '@wuyangfan/nova-ui'

import { DEMO_BOX_CLASS } from './demoBox'

export default function ContainerMaxWidthDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Container maxWidth="md" padding="md">
        <div className={`${DEMO_BOX_CLASS} nova-doc-demo-box--muted`}>
          maxWidth=&quot;md&quot;
        </div>
      </Container>
      <Container fluid padding="md">
        <div className={`${DEMO_BOX_CLASS} nova-doc-demo-box--dashed`}>
          fluid：取消版心最大宽度
        </div>
      </Container>
    </div>
  )
}
