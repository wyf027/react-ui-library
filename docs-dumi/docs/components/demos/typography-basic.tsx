import React from 'react'

import { Paragraph, Space, Text, Title } from '@wuyangfan/nova-ui'

export default function TypographyBasicDemo() {
  return (
    <Space direction="vertical" size={8}>
      <Title level={1}>一级标题</Title>
      <Title level={2}>二级标题</Title>
      <Title level={3}>三级标题</Title>
      <Text>正文文本</Text>
      <Paragraph>
        这是一个段落，用于展示较长的文本内容。Typography 组件提供了常用的文本排版能力。
      </Paragraph>
      <div style={{ maxWidth: 180 }}>
        <Title ellipsis level={4}>
          超长标题会在单行末尾省略，悬停可看完整 tooltip
        </Title>
        <Text ellipsis>超长辅助说明同样支持单行省略与原生 title。</Text>
      </div>
    </Space>
  )
}
