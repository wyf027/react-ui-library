import React from 'react'
import { Tag } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <div className='flex flex-wrap gap-2'>
      <Tag>默认</Tag>
      <Tag color='success'>成功</Tag>
      <Tag color='warning'>警告</Tag>
      <Tag color='danger'>错误</Tag>
      <Tag closable closeAriaLabel='关闭标签'>可关闭</Tag>
      <Tag closable closeIcon='移除' closeAriaLabel='移除标签'>自定义关闭</Tag>
    </div>
  )
}
