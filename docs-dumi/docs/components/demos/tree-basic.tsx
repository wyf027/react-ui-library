import React from 'react'

import { Tree } from '@wuyangfan/nova-ui'

export default function TreeBasicDemo() {
  return (
    <Tree
      data={[
        {
          children: [
            { key: 'cmp', title: 'components' },
            { key: 'util', title: 'utils' },
          ],
          key: 'root',
          title: 'src',
        },
      ]}
      defaultExpandedKeys={['root']}
    />
  )
}
