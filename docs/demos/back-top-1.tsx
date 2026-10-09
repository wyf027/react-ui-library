import React from 'react'
import { BackTop, Text } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <div className='relative min-h-24 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900'>
      <Text>滚动超过阈值后显示回到顶部按钮。</Text>
      <BackTop visibilityHeight={0} aria-label='回到页面顶部'>顶部</BackTop>
    </div>
  )
}
