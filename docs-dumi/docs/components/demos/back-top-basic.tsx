import React from 'react'

import { BackTop } from '@wuyangfan/nova-ui'

/** 将 `visibilityHeight` 设为 `0` 便于在滚动后快速出现（`scrollY > 0` 时显示） */
export default function BackTopBasicDemo() {
  return <BackTop visibilityHeight={0} />
}
