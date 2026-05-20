import React from 'react'

import { Container } from '@wuyangfan/nova-ui'

import { DEMO_BOX_CLASS } from './demoBox'

export default function ContainerMainDemo() {
  return (
    <Container component="main" verticalPadding="md" aria-label="页面主体">
      <div className={`${DEMO_BOX_CLASS} nova-doc-demo-box--muted`}>
        渲染为 &lt;main&gt;
      </div>
    </Container>
  )
}
