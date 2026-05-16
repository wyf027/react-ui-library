import React from 'react'

import { Button, Card, Input, Space, ThemeProvider, Title } from '@wuyangfan/nova-ui'

export default function PlaygroundBasicDemo() {
  return (
    <ThemeProvider mode="light">
      <Space direction="vertical" size={12}>
        <Title level={3}>Interactive Playground</Title>
        <Input label="Email" placeholder="hello@nova-ui.dev" />
        <Space>
          <Button>Submit</Button>
          <Button variant="outline">Cancel</Button>
        </Space>
        <Card title="Stats">This area can render any combination of components.</Card>
      </Space>
    </ThemeProvider>
  )
}
