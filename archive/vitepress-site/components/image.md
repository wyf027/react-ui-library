# Image 图片

图片组件，对齐 Ant Design Image，支持预览和失败占位。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Space>
      <Image src='https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200' width={120} height={80} alt='风景' />
    </Space>
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| src | 图片地址 | `string` | - |
| alt | 替代文本 | `string` | `''` |
| fallback | 失败占位图 | `string` | `''` |
| placeholder | 加载占位 | `ReactNode` | - |
| preview | 是否支持预览 | `boolean` | `true` |
