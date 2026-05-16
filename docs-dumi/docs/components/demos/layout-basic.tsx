import React from 'react'

import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutSider,
} from '@wuyangfan/nova-ui'

const panelStyle: React.CSSProperties = {
  background: '#f3f4f6',
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #e5e7eb',
}

export default function LayoutBasicDemo() {
  return (
    <Layout>
      <LayoutHeader>
        <span className="text-sm font-medium text-slate-800 dark:text-slate-100">顶栏</span>
      </LayoutHeader>
      <Layout direction="horizontal">
        <LayoutSider collapsible defaultCollapsed={false} width={200}>
          <div className="text-xs text-slate-600 dark:text-slate-300">侧栏菜单占位</div>
        </LayoutSider>
        <LayoutContent>
          <div style={panelStyle}>主内容区（默认渲染为 main）</div>
        </LayoutContent>
      </Layout>
    </Layout>
  )
}
