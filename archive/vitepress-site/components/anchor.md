# Anchor 锚点

锚点导航组件。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Anchor items={[
      { key: 'a1', href: '#section-a', title: 'Section A' },
      { key: 'a2', href: '#section-b', title: 'Section B' },
    ]} />
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 锚点项 | `AnchorItem[]` | - |
