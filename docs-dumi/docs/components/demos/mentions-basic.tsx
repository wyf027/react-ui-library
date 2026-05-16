import React from 'react'

import { Mentions } from '@wuyangfan/nova-ui'

export default function MentionsBasicDemo() {
  return (
    <Mentions
      options={[
        { value: 'alice', label: 'Alice' },
        { value: 'bob', label: 'Bob' },
        { value: 'carol', label: 'Carol' },
      ]}
      placeholder="输入内容；下方为可选提及提示"
    />
  )
}
