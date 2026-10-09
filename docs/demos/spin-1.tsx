import React from 'react'
import { Spin } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <div className='flex flex-col gap-4'>
      <Spin tip='加载中...' />
      <Spin spinning={true}>
        <div className='rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'>
          被 Spin 包裹的内容区域
        </div>
      </Spin>
    </div>
  )
}
