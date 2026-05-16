import React from 'react'

import { Notification, Space } from '@wuyangfan/nova-ui'

export default function NotificationBasicDemo() {
  return (
    <Space direction="vertical" size={8}>
      <Notification description="组件库已成功发布。" title="发布成功" type="success" />
      <Notification description="请检查配置。" title="发布失败" type="error" />
    </Space>
  )
}
