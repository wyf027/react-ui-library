# Loading 加载中

加载状态指示器。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Space>
      <Loading size='sm' text='加载中...' />
      <Loading size='md' />
      <Loading size='lg' text='请稍候' />
    </Space>
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 加载文本 | `string` | `'Loading...'` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
