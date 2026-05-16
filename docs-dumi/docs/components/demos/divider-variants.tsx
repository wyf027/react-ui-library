import React from 'react'

import { Divider, Space } from '@wuyangfan/nova-ui'

export default function DividerVariantsDemo() {
  return (
    <Space direction="vertical" size={16}>
      <Divider titlePlacement="start" dashed>
        左侧标题
      </Divider>
      <Divider variant="dotted" plain>
        朴素虚线
      </Divider>
    </Space>
  )
}
