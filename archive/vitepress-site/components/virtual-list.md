# VirtualList 虚拟列表

高性能虚拟滚动列表。

## 示例

<LivePlayground :code="`
() => {
  return (
    <VirtualList
      items={Array.from({ length: 100 }, (_, i) => 'Item ' + (i + 1))}
      renderItem={(item) => item}
    />
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 数据列表 | `any[]` | - |
| itemHeight | 每项高度 | `number` | `36` |
| height | 容器高度 | `number` | `300` |
| renderItem | 渲染函数 | `(item) => ReactNode` | - |
