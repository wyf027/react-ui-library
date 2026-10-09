import React from 'react'
import { Menu } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <Menu mode='horizontal' items={[
      { key: 'home', label: '首页' },
      { key: 'docs', label: '文档' },
      { key: 'about', label: '关于' },
    ]} />
  )
}
