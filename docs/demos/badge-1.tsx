import React from 'react'
import { Avatar, Badge } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <div className='flex flex-wrap items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900'>
      <Badge count={5} badgeLabel='5 条未读消息'><Avatar name='U' /></Badge>
      <Badge dot badgeLabel='有新的状态更新'><Avatar name='V' /></Badge>
      <Badge count={99} badgeLabel='99 条通知'><Avatar name='W' /></Badge>
    </div>
  )
}
