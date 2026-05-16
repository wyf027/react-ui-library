import React from 'react'

import { AutoComplete, Space } from '@wuyangfan/nova-ui'

export default function AutoCompleteBasicDemo() {
  return (
    <Space direction="vertical" size={8} className="w-full max-w-md">
      <AutoComplete
        options={[{ value: 'Apple' }, { value: 'Banana' }, { value: 'Cherry' }]}
        placeholder="输入水果名称"
      />
      <AutoComplete
        options={[{ value: 'React' }, { value: 'Vue' }, { value: 'Svelte' }]}
        placeholder="输入框架名"
      />
    </Space>
  )
}
