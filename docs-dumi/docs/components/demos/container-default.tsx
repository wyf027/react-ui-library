import React from 'react'

import { Container } from '@wuyangfan/nova-ui'

import { DEMO_BOX_CLASS } from './demoBox'

export default function ContainerDefaultDemo() {
  return (
    <Container>
      <div className={DEMO_BOX_CLASS}>默认容器（居中、有最大宽度）</div>
    </Container>
  )
}
