import React from 'react'
import { Switch } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <div className='flex flex-wrap items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900'>
      <Switch aria-label='接收通知' />
      <Switch aria-label='自动同步' defaultChecked />
      <Switch aria-label='计费周期' checkedChildren='年' unCheckedChildren='月' />
      <Switch aria-label='禁用开关' disabled />
    </div>
  )
}
