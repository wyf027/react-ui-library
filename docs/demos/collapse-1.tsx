import React from 'react'
import { Collapse } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <Collapse items={[
      { key: 'q1', title: '什么是 Nova UI？', content: '一个企业级 React 组件库。' },
      { key: 'q2', title: '支持 SSR 吗？', content: '是的，支持 Next.js SSR。' },
    ]} />
  )
}
