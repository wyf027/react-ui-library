# Grid 网格

CSS Grid 网格布局组件。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Grid cols={3} gap={8}>
      <div
        style={{
          background: 'var(--vp-c-bg-soft)',
          padding: '12px',
          border: '1px solid var(--vp-c-divider)',
          borderRadius: 8,
        }}
      >
        A
      </div>
      <div
        style={{
          background: 'var(--vp-c-bg-alt)',
          padding: '12px',
          border: '1px solid var(--vp-c-divider)',
          borderRadius: 8,
        }}
      >
        B
      </div>
      <div
        style={{
          background: 'var(--vp-c-bg-soft)',
          padding: '12px',
          border: '1px solid var(--vp-c-divider)',
          borderRadius: 8,
        }}
      >
        C
      </div>
    </Grid>
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| cols | 列数 | `number` | `3` |
| gap | 间距；支持 `[列间距, 行间距]` | `number \| [number, number]` | `12` |
