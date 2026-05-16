import React from 'react'

import { TreeSelect } from '@wuyangfan/nova-ui'

export default function TreeSelectBasicDemo() {
  return (
    <TreeSelect
      data={[
        {
          key: 'dev',
          title: '开发',
          children: [
            { key: 'front', title: '前端' },
            { key: 'back', title: '后端' },
          ],
        },
      ]}
      onChange={(value) => {
        // eslint-disable-next-line no-console
        console.log(value)
      }}
    />
  )
}
