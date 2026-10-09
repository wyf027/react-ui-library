import React from 'react'
import { Avatar, Badge } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <div className='flex flex-wrap items-center gap-6 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900'>
      <Badge count={120} overflowCount={99} badgeLabel='99 条以上未读消息'><Avatar name='A' /></Badge>
      <Badge count={0} showZero badgeLabel='0 条待处理事项'><Avatar name='B' /></Badge>
      <Badge dot status='success' badgeLabel='在线'><Avatar name='C' /></Badge>
      <Badge count='new' badgeLabel='新内容'><Avatar name='D' /></Badge>
    </div>
  )
}
