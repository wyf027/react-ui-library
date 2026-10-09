import React from 'react'
import { AutoComplete, Space } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <Space direction='vertical' size={8}>
      <AutoComplete
        placeholder='输入搜索'
        options={[
          { value: 'React' },
          { value: 'Vue' },
          { value: 'Angular' },
          { value: 'Svelte' },
        ]}
        allowClear
      />
    </Space>
  )
}
