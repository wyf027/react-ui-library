# Collapse 折叠面板

可以折叠/展开的内容区域。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Collapse items={[
      { key: 'q1', title: '什么是 Nova UI？', content: '一个企业级 React 组件库。' },
      { key: 'q2', title: '支持 SSR 吗？', content: '是的，支持 Next.js SSR。' },
    ]} />
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 面板项 | `CollapseItem[]` | - |
| activeKey | 展开的 key | `string \| string[]` | - |
| defaultActiveKey | 默认展开 | `string \| string[]` | - |
| accordion | 手风琴模式 | `boolean` | `false` |
| onChange | 变化回调 | `(key) => void` | - |
