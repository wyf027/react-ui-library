import React from 'react'

import {
  Container,
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutSider,
} from '@wuyangfan/nova-ui'

const innerStyle: React.CSSProperties = {
  background: '#f9fafb',
  padding: '12px',
  borderRadius: '8px',
}

export default function LayoutWithContainerDemo() {
  return (
    <Layout>
      <LayoutHeader>
        <span className="text-sm font-medium text-slate-800 dark:text-slate-100">顶栏</span>
      </LayoutHeader>
      <Layout direction="horizontal">
        <LayoutSider width={180}>侧栏</LayoutSider>
        <LayoutContent className="p-0">
          <Container maxWidth="xl" padding="md" verticalPadding="md">
            <div style={innerStyle}>版心在内容区内居中</div>
          </Container>
        </LayoutContent>
      </Layout>
    </Layout>
  )
}
