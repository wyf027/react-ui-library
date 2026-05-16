# Container 布局容器

用于包裹页面内容，提供与 Ant Design 内容区/断点习惯相近的**最大宽度**、**内边距**与**语义化根节点**能力；与 [Layout 页面骨架](./layout.md) 组合时负责内容区「版心」。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Container>
      <div
        style={{
          background: 'var(--vp-c-bg-alt)',
          padding: '16px',
          borderRadius: '8px',
          border: '1px solid var(--vp-c-divider)',
        }}
      >
        默认容器（居中、有最大宽度）
      </div>
    </Container>
  )
}
`" />

### 最大宽度与全宽

<LivePlayground :code="`
() => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Container maxWidth='md' padding='md'>
        <div
          style={{
            background: 'var(--vp-c-bg-soft)',
            padding: 12,
            borderRadius: 8,
            border: '1px solid var(--vp-c-divider)',
          }}
        >
          maxWidth=&quot;md&quot;
        </div>
      </Container>
      <Container fluid padding='md'>
        <div
          style={{
            background: 'var(--vp-c-bg-alt)',
            padding: 12,
            borderRadius: 8,
            border: '1px dashed var(--vp-c-divider)',
          }}
        >
          fluid：取消版心最大宽度
        </div>
      </Container>
    </div>
  )
}
`" />

### 语义化根节点（如 `main`）

<LivePlayground :code="`
() => {
  return (
    <Container component='main' verticalPadding='md' aria-label='页面主体'>
      <div
        style={{
          background: 'var(--vp-c-bg-soft)',
          padding: 12,
          borderRadius: 8,
          border: '1px solid var(--vp-c-divider)',
        }}
      >
        渲染为 &lt;main&gt;
      </div>
    </Container>
  )
}
`" />

## API

除下表外，还支持原生 HTML 属性（如 `id`、`style`、`role`、`aria-*` 等）。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| component | 根元素类型（类似 antd 部分组件的 `component`） | `React.ElementType` | `'div'` |
| fluid | 是否取消版心最大宽度（仍保留水平 `padding`） | `boolean` | `false` |
| centered | 有版心时是否水平居中（`mx-auto`） | `boolean` | `true` |
| maxWidth | 版心最大宽度预设（`fluid` 为 true 时不生效） | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'xxl'` | `'xl'` |
| padding | 水平内边距预设 | `'none' \| 'sm' \| 'md' \| 'lg'` | `'lg'` |
| verticalPadding | 垂直内边距预设 | `'none' \| 'sm' \| 'md' \| 'lg'` | `'none'` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |
