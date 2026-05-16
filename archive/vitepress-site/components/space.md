# Space 间距

设置组件之间的间距，用法贴近 Ant Design `Space`。

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

### 预设尺寸与分隔符 `split`

<LivePlayground :code="`
() => {
  return (
    <Space size='large' split={<span style={{color:'var(--vp-c-text-3)'}}>|</span>}>
      <Text>北京</Text>
      <Text>上海</Text>
      <Text>广州</Text>
    </Space>
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| direction | 排列方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| size | 间距：`small` / `middle` / `large`、像素值，或 `[主轴间距, 交叉轴间距]`（与 Ant Design 数组语义一致） | `number \| 'small' \| 'middle' \| 'large' \| [number, number]` | `8` |
| align | 交叉轴对齐 | `'start' \| 'end' \| 'center' \| 'baseline'` | `'center'` |
| split | 子节点之间的分隔内容 | `ReactNode` | - |
| wrap | 横向时是否换行 | `boolean` | `true` |
