import React from 'react'
import { Cascader } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <Cascader
      options={[
        { value: 'zj', label: '浙江', children: [{ value: 'hz', label: '杭州' }] },
        { value: 'js', label: '江苏', children: [{ value: 'nj', label: '南京' }] },
      ]}
    />
  )
}
