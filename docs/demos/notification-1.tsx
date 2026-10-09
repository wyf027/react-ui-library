import React from 'react'
import { Notification } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <div className='flex max-w-xl flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900'>
      <Notification type='success' title='发布成功' description='组件库已成功发布。' />
      <Notification type='error' title='发布失败' description='请检查配置。' duration={4500} />
    </div>
  )
}
