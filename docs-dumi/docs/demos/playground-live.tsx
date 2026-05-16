import React, { useEffect, useState } from 'react'

import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live'

import {
  Button,
  Card,
  Input,
  Space,
  ThemeProvider,
  Title,
} from '@wuyangfan/nova-ui'

const INITIAL_CODE = `<ThemeProvider mode="light">
  <Space direction="vertical" size={12}>
    <Title level={3}>Live Playground</Title>
    <Input label="Email" placeholder="hello@nova-ui.dev" />
    <Space>
      <Button>Submit</Button>
      <Button variant="outline">Cancel</Button>
    </Space>
    <Card title="Stats">Edit the code below — powered by react-live.</Card>
  </Space>
</ThemeProvider>`

export default function PlaygroundLiveDemo() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
        正在加载可编辑预览…
      </div>
    )
  }

  const scope = {
    React,
    Button,
    Card,
    Input,
    Space,
    ThemeProvider,
    Title,
  }

  return (
    <div className="space-y-3">
      <LiveProvider code={INITIAL_CODE} scope={scope}>
        <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
          <LivePreview />
        </div>
        <LiveEditor className="nova-live-editor overflow-auto rounded-md border border-slate-300 bg-slate-950 p-3 font-mono text-sm text-slate-100 dark:border-slate-600" />
        <LiveError className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300" />
      </LiveProvider>
    </div>
  )
}
