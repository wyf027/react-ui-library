import React from 'react'

import { Grid } from '@wuyangfan/nova-ui'

import { DEMO_BOX_CLASS } from './demoBox'

const compactBox = `${DEMO_BOX_CLASS} nova-doc-demo-box--compact`
const mutedBox = `${compactBox} nova-doc-demo-box--muted`

export default function GridBasicDemo() {
  return (
    <Grid cols={3} gap={8}>
      <div className={mutedBox}>A</div>
      <div className={compactBox}>B</div>
      <div className={mutedBox}>C</div>
    </Grid>
  )
}
