# Grid 网格

CSS Grid 网格布局组件。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Grid cols={3} gap={8}>
      <div style={{background:'#f1f5f9',padding:'12px'}}>A</div>
      <div style={{background:'#e2e8f0',padding:'12px'}}>B</div>
      <div style={{background:'#f1f5f9',padding:'12px'}}>C</div>
    </Grid>
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| cols | 列数 | `number` | - |
| gap | 间距 | `number` | - |
