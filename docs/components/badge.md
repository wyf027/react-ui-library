# Badge 徽标

徽标数组件。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Space size={16}>
      <Badge count={5}><Avatar name='U' /></Badge>
      <Badge dot><Avatar name='V' /></Badge>
      <Badge count={99}><Avatar name='W' /></Badge>
    </Space>
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| count | 展示数字 | `number` | - |
| dot | 显示小红点 | `boolean` | `false` |
