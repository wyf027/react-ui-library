# Tabs 标签页

选项卡切换组件。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Tabs items={[
      { key: 'tab1', label: '标签 1', content: '内容 1' },
      { key: 'tab2', label: '标签 2', content: '内容 2' },
      { key: 'tab3', label: '标签 3', content: '内容 3' },
    ]} />
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 标签项 | `TabItem[]` | - |
| activeKey | 当前激活 | `string` | - |
| defaultActiveKey | 默认激活 | `string` | - |
| onChange | 切换回调 | `(key: string) => void` | - |
