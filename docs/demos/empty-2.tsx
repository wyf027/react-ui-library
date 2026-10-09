import React from 'react'
import { Empty } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <Empty simple description='无内容' image={<span style={{fontSize:28}}>📄</span>} imageStyle={{ opacity: 0.85 }} />
  )
}
