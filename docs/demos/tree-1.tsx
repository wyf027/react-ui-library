import React from 'react'
import { Tree } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <Tree
      aria-label='Project files'
      data={[
        { key: 'root', title: 'src', children: [
          { key: 'cmp', title: 'components' },
          { key: 'util', title: 'utils' },
        ]},
      ]}
      defaultExpandedKeys={['root']}
    />
  )
}
