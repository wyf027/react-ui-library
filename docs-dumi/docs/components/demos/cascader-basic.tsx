import React from 'react'

import { Cascader } from '@wuyangfan/nova-ui'

const options = [
  {
    label: '浙江',
    value: 'zj',
    children: [
      { label: '杭州', value: 'hz' },
      { label: '宁波', value: 'nb' },
    ],
  },
  {
    label: '江苏',
    value: 'js',
    children: [
      { label: '南京', value: 'nj' },
      { label: '苏州', value: 'sz' },
    ],
  },
]

export default function CascaderBasicDemo() {
  return (
    <Cascader
      options={options}
      onChange={(value, labels) => {
        // eslint-disable-next-line no-console
        console.log(value, labels)
      }}
    />
  )
}
