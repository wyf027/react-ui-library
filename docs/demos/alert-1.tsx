import React from 'react'
import { Alert } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <div className='flex flex-col gap-2'>
      <Alert type='info' message='提示信息' description='这是一条信息提示。' />
      <Alert type='success' message='操作成功' closable />
      <Alert type='warning' message='警告信息' showIcon />
      <Alert
        type='error'
        message='错误信息'
        description='请检查后重试。'
        closable
      />
    </div>
  )
}
