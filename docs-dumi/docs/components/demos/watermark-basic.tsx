import React from 'react'

import { Card, Watermark } from '@wuyangfan/nova-ui'

export default function WatermarkBasicDemo() {
  return (
    <Watermark content="INTERNAL">
      <Card title="受保护内容">此面板带有水印。</Card>
    </Watermark>
  )
}
