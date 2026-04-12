# Container 布局容器

用于包裹页面内容，提供固定宽度或全宽布局。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Container>
      <div style={{background:'#dbeafe',padding:'16px',borderRadius:'8px'}}>
        默认容器（居中、有最大宽度）
      </div>
    </Container>
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| fluid | 是否撑满整个宽度 | `boolean` | `false` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |
