# Empty 空状态

空状态占位组件，补充属性对齐 Ant Design `Empty`。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Empty description='暂无数据' />
  )
}
`" />

### 轻量样式（simple）

<LivePlayground :code="`
() => {
  return (
    <Empty simple description='无内容' image={<span style={{fontSize:28}}>📄</span>} imageStyle={{ opacity: 0.85 }} />
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| description | 描述文字 | `ReactNode` | `'No Data'` |
| image | 自定义图标 | `ReactNode` | - |
| simple | 无边框轻量样式 | `boolean` | `false` |
| imageStyle | 图标容器样式 | `CSSProperties` | - |
