import React from 'react'
import { FloatButton } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <div className='relative h-32 rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900'>
      <FloatButton
        tooltip='添加'
        aria-label='添加项目'
        className='!absolute'
        position={{ right: 16, bottom: 16 }}
      />
    </div>
  )
}
