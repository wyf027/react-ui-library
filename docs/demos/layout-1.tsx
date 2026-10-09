import React from 'react'
import { Layout, LayoutContent, LayoutHeader, LayoutSider } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <Layout className='min-h-0 h-80'>
      <LayoutHeader>
        <span className='text-sm font-medium text-slate-800 dark:text-slate-100'>顶栏</span>
      </LayoutHeader>
      <Layout direction='horizontal'>
        <LayoutSider width={200} collapsible defaultCollapsed={false}>
          <div className='text-xs text-slate-600 dark:text-slate-300'>侧栏菜单占位</div>
        </LayoutSider>
        <LayoutContent>
          <div
            style={{
              background: 'var(--nova-color-bg)',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid var(--nova-color-border)',
            }}
          >
            主内容区（默认渲染为 main）
          </div>
        </LayoutContent>
      </Layout>
    </Layout>
  )
}
