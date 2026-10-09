import React from 'react'
import { Toast } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <div className='flex flex-col gap-3'>
      <Toast open status='success' duration={0} className='static'>操作成功</Toast>
      <Toast open status='error' duration={0} className='static'>操作失败</Toast>
    </div>
  )
}
