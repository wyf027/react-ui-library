# Row 行

配合 Col 使用的栅格行组件。`gap` 支持单个数字或 `[水平间距, 垂直间距]`（与 Ant Design `Row` 的 `gutter` 语义一致：横向排列时为列间距与换行后的行间距）。

## 示例

<LivePlayground :code="`
<Row gap={8}>
  <Col span={6}>
    <div
      style={{
        background: 'var(--vp-c-bg-soft)',
        padding: '8px',
        border: '1px solid var(--vp-c-divider)',
        borderRadius: 4,
      }}
    >
      Col 6
    </div>
  </Col>
  <Col span={6}>
    <div
      style={{
        background: 'var(--vp-c-bg-alt)',
        padding: '8px',
        border: '1px solid var(--vp-c-divider)',
        borderRadius: 4,
      }}
    >
      Col 6
    </div>
  </Col>
</Row>
`" />

### 二维间距（对标 Ant Design gutter）

<LivePlayground :code="`
<Row gap={[16, 24]} wrap>
  <Col span={8}><div style={{background:'var(--vp-c-bg-soft)',padding:8,borderRadius:4}}>A</div></Col>
  <Col span={8}><div style={{background:'var(--vp-c-bg-alt)',padding:8,borderRadius:4}}>B</div></Col>
  <Col span={8}><div style={{background:'var(--vp-c-bg-soft)',padding:8,borderRadius:4}}>C</div></Col>
</Row>
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| gap | 间距；支持 `[水平, 垂直]` | `number \| [number, number]` | `12` |
| justify | 主轴对齐 | `'start' \| 'center' \| 'end' \| 'between' \| 'around' \| 'evenly'` | `'start'` |
| align | 交叉轴对齐 | `'start' \| 'center' \| 'end' \| 'stretch' \| 'baseline'` | `'stretch'` |
| wrap | 是否换行 | `boolean` | `true` |
