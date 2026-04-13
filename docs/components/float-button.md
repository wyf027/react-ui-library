# FloatButton 悬浮按钮

固定在页面角落的悬浮按钮，对齐 Ant Design FloatButton。

## 示例

<LivePlayground :code="`
() => {
  return (
    <div style={{position:'relative',height:'120px',background:'#f8fafc',borderRadius:'8px'}}>
      <FloatButton
        tooltip='添加'
        style={{position:'absolute'}}
      />
    </div>
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| icon | 图标 | `ReactNode` | - |
| tooltip | 提示文字 | `string` | - |
| shape | 形状 | `'circle' \| 'square'` | `'circle'` |
| position | 位置 | `{ right?: number; bottom?: number }` | `{ right: 24, bottom: 24 }` |
