import React from 'react'

import { Affix, Button } from '@wuyangfan/nova-ui'

export default function AffixBasicDemo() {
  return (
    <Affix offsetTop={10}>
      <Button size="sm">固钉按钮</Button>
    </Affix>
  )
}
