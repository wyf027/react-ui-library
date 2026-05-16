import React from 'react'

import { Button, Space } from '@wuyangfan/nova-ui'

export default function ButtonBasicDemo() {
  return (
    <Space direction="vertical" size={12}>
      <Space>
        <Button>主按钮</Button>
        <Button variant="outline">描边按钮</Button>
        <Button variant="ghost">文字按钮</Button>
      </Space>
      <Space>
        <Button color="danger">危险按钮</Button>
        <Button color="neutral">中性按钮</Button>
        <Button loading>加载中</Button>
        <Button disabled>禁用</Button>
      </Space>
      <Space>
        <Button size="sm">小按钮</Button>
        <Button size="md">中按钮</Button>
        <Button size="lg">大按钮</Button>
      </Space>
    </Space>
  )
}
