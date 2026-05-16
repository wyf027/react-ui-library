import React from 'react'

import { Breadcrumb } from '@wuyangfan/nova-ui'

export default function BreadcrumbBasicDemo() {
  return (
    <Breadcrumb
      items={[
        { key: '1', label: '首页' },
        { key: '2', label: '组件库' },
        { key: '3', label: 'Breadcrumb' },
      ]}
    />
  )
}
