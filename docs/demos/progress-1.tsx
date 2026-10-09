import React from 'react'
import { Progress } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <div className='flex flex-col gap-3'>
      <Progress percent={30} />
      <Progress percent={70} status='success' format={(value) => value === 100 ? '完成' : value + '%'} />
      <Progress percent={50} status='exception' format={(value) => value + ' tasks'} aria-valuetext='50 tasks completed' />
    </div>
  )
}
