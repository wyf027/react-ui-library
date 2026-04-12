# Space 间距

设置组件之间的间距。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Space direction='vertical' size={12}>
      <Space size={8}>
        <Button>按钮 1</Button>
        <Button variant='outline'>按钮 2</Button>
        <Button variant='ghost'>按钮 3</Button>
      </Space>
      <Space direction='vertical' size={8}>
        <Tag color='success'>标签 A</Tag>
        <Tag color='warning'>标签 B</Tag>
      </Space>
    </Space>
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| direction | 排列方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| size | 间距大小 | `number` | `8` |
| wrap | 是否换行 | `boolean` | `false` |
