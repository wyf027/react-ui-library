# Col 列

配合 Row 使用的栅格列组件，12列栅格。

## 示例

<LivePlayground :code="`
<Row gap={8}>
  <Col span={4}>
    <div
      style={{
        background: 'var(--vp-c-bg-soft)',
        padding: '8px',
        border: '1px solid var(--vp-c-divider)',
        borderRadius: 4,
      }}
    >
      span=4
    </div>
  </Col>
  <Col span={4}>
    <div
      style={{
        background: 'var(--vp-c-bg-alt)',
        padding: '8px',
        border: '1px solid var(--vp-c-divider)',
        borderRadius: 4,
      }}
    >
      span=4
    </div>
  </Col>
  <Col span={4}>
    <div
      style={{
        background: 'var(--vp-c-bg-soft)',
        padding: '8px',
        border: '1px solid var(--vp-c-divider)',
        borderRadius: 4,
      }}
    >
      span=4
    </div>
  </Col>
</Row>
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| span | 占据列数（12 栅格） | `number` | `12` |
| offset | 左侧偏移列数 | `number` | `0` |
| flex | 设为 flex 布局项时忽略 `span`/`offset`（对标 Ant Design `flex`） | `string \| number` | - |
| order | CSS `order` | `number` | - |
