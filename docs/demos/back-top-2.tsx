import React from 'react'
import { BackTop, Text } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <div id='back-top-scroll-panel' className='relative h-40 overflow-y-auto rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900'>
      <div className='space-y-4 pb-56 text-sm text-slate-600 dark:text-slate-300'>
        <Text>在容器内滚动超过阈值后显示按钮。</Text>
        <Text>target 可以让 BackTop 监听并滚动指定容器。</Text>
      </div>
      <BackTop
        target={() => document.getElementById('back-top-scroll-panel')}
        visibilityHeight={80}
        aria-label='回到容器顶部'
      >
        容器顶部
      </BackTop>
    </div>
  )
}
