# Col 列

配合 Row 使用的栅格列组件，12列栅格。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Row gap={8}>
      <Col span={4}><div style={{background:'#dbeafe',padding:'8px'}}>span=4</div></Col>
      <Col span={4}><div style={{background:'#bfdbfe',padding:'8px'}}>span=4</div></Col>
      <Col span={4}><div style={{background:'#dbeafe',padding:'8px'}}>span=4</div></Col>
    </Row>
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| span | 占据列数 | `number` | - |
| offset | 偏移列数 | `number` | - |
