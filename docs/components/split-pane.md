# SplitPane 分栏

左右分栏布局组件。

## 示例

<LivePlayground :code="`
() => {
  return (
    <SplitPane
      ratio='1fr 2fr'
      left={<div style={{background:'#eef2ff',padding:'12px'}}>左侧面板</div>}
      right={<div style={{background:'#e0f2fe',padding:'12px'}}>右侧面板</div>}
    />
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| left | 左侧内容 | `ReactNode` | - |
| right | 右侧内容 | `ReactNode` | - |
| ratio | 比例（CSS grid-template-columns 值） | `string` | `'1fr 1fr'` |
