# Flex 弹性布局

基于 CSS Flexbox 的弹性布局容器组件，类似 Ant Design Flex。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Space direction='vertical' size={12}>
      <Flex gap={8} align='center'>
        <Button>按钮 A</Button>
        <Button variant='outline'>按钮 B</Button>
        <Button variant='ghost'>按钮 C</Button>
      </Flex>
      <Flex vertical gap={8}>
        <div style={{background:'#dbeafe',padding:'8px',borderRadius:'4px'}}>垂直排列 1</div>
        <div style={{background:'#bfdbfe',padding:'8px',borderRadius:'4px'}}>垂直排列 2</div>
      </Flex>
      <Flex justify='between' align='center'>
        <Text>左侧内容</Text>
        <Button size='sm'>右侧按钮</Button>
      </Flex>
    </Space>
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| direction | 主轴方向 | `'row' \| 'column' \| 'row-reverse' \| 'column-reverse'` | `'row'` |
| vertical | 是否垂直方向（等价 direction='column'） | `boolean` | `false` |
| align | 交叉轴对齐 | `'start' \| 'center' \| 'end' \| 'stretch' \| 'baseline'` | - |
| justify | 主轴对齐 | `'start' \| 'center' \| 'end' \| 'between' \| 'around' \| 'evenly'` | - |
| wrap | 是否换行 | `boolean` | `false` |
| gap | 间距 | `number \| string` | - |
