import React from 'react'

import { Alert, Space } from '@wuyangfan/nova-ui'

export default function AlertBasicDemo() {
  return (
    <Space direction="vertical" size={8}>
      <Alert type="info" message="提示信息" description="这是一条信息提示。" />
      <Alert closable message="操作成功" type="success" />
      <Alert message="警告信息" showIcon type="warning" />
      <Alert closable description="请检查后重试。" message="错误信息" type="error" />
    </Space>
  )
}
