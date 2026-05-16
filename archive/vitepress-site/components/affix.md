# Affix 固钉

将元素钉在可视范围内。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Affix offsetTop={10}>
      <Button size='sm'>固钉按钮</Button>
    </Affix>
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| offsetTop | 距顶偏移 | `number` | `0` |
| children | 内容 | `ReactNode` | - |
