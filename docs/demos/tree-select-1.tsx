import React from 'react'
import { TreeSelect } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <TreeSelect
      data={[
        { key: 'root', title: '根节点', children: [
          { key: 'child1', title: '子节点 1' },
          { key: 'child2', title: '子节点 2' },
        ]},
      ]}
    />
  )
}
