# Divider 分割线

区隔内容的分割线，API 贴近 Ant Design `Divider`。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Space direction='vertical' size={8}>
      <Text>上方内容</Text>
      <Divider />
      <Text>下方内容</Text>
    </Space>
  )
}
`" />

### 文案与样式

<LivePlayground :code="`
() => {
  return (
    <Space direction='vertical' size={16}>
      <Divider titlePlacement='start' dashed>
        左侧标题
      </Divider>
      <Divider variant='dotted' plain>
        朴素虚线
      </Divider>
    </Space>
  )
}
`" />

## API

根节点为 `div`（`role="separator"`），便于组合文案与样式。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| orientation | 横向或纵向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| variant | 线型 | `'solid' \| 'dashed' \| 'dotted'` | `'solid'` |
| plain | 减小外边距 | `boolean` | `false` |
| titlePlacement | 横向且存在 `children` 时文案位置（对标 Ant Design 文案分割线） | `'start' \| 'center' \| 'end'` | `'center'` |
