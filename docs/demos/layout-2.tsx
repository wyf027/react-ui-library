import React from 'react'
import { Container, Layout, LayoutContent, LayoutHeader, LayoutSider } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <Layout className='min-h-0 h-80'>
      <LayoutHeader>
        <span className='text-sm font-medium'>顶栏</span>
      </LayoutHeader>
      <Layout direction='horizontal'>
        <LayoutSider width={180}>侧栏</LayoutSider>
        <LayoutContent className='p-0'>
          <Container maxWidth='xl' padding='md' verticalPadding='md'>
            <div
              style={{
                background: 'var(--nova-color-bg)',
                padding: '12px',
                borderRadius: '8px',
              }}
            >
              版心在内容区内居中
            </div>
          </Container>
        </LayoutContent>
      </Layout>
    </Layout>
  )
}
