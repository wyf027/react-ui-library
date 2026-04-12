# Row 行

配合 Col 使用的栅格行组件。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Row gap={8}>
      <Col span={6}><div style={{background:'#dbeafe',padding:'8px'}}>Col 6</div></Col>
      <Col span={6}><div style={{background:'#bfdbfe',padding:'8px'}}>Col 6</div></Col>
    </Row>
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| gap | 列间距 | `number` | - |
| justify | 水平对齐方式 | `string` | - |
| align | 垂直对齐方式 | `string` | - |
| wrap | 是否换行 | `boolean` | `true` |
