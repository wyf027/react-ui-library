import React from 'react'
import { Link } from 'dumi'

const categories = [
  { title: '布局 Layout', count: 9, link: '/components/layout', examples: 'Layout / Container / Row / Col / Grid / Flex / Space / Divider / SplitPane' },
  { title: '基础 Basic', count: 3, link: '/components/button', examples: 'Button / Icon / Typography' },
  { title: '表单 Form', count: 20, link: '/components/input', examples: 'Input / Select / Form / Upload / DatePicker / …' },
  { title: '反馈 Feedback', count: 13, link: '/components/alert', examples: 'Alert / Modal / Drawer / Tooltip / Notification / …' },
  { title: '数据展示 Data Display', count: 18, link: '/components/table', examples: 'Table / Card / List / Timeline / QRCode / …' },
  { title: '导航 Navigation', count: 11, link: '/components/tabs', examples: 'Tabs / Menu / Steps / Tree / Anchor / …' },
]

export default function ComponentOverview() {
  return (
    <div className="my-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {categories.map(category => (
        <Link key={category.link} to={category.link} className="rounded-lg border border-solid border-[var(--nova-color-border)] p-5 no-underline transition-shadow hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--nova-color-brand)]">
          <h3 className="!mb-2 !mt-0 text-lg text-[var(--nova-color-text)]">{category.title}</h3>
          <p className="!mb-3 text-sm text-[var(--nova-color-muted)]">{category.count} 个组件</p>
          <span className="text-xs leading-6 text-[var(--nova-color-muted)]">{category.examples}</span>
        </Link>
      ))}
    </div>
  )
}
