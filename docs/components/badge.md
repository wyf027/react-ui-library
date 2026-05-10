# Badge 徽标

徽标数组件，常用行为对齐 Ant Design `Badge`。`status` 默认背景 class 由 `packages/ui/src/theme/componentTokens.ts` 中的 `badgeStatusBgClass` 维护。

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

### 封顶与状态色

<LivePlayground :code="`
() => {
  return (
    <Space size={24}>
      <Badge count={120} overflowCount={99}><Avatar name='A' /></Badge>
      <Badge count={0} showZero><Avatar name='B' /></Badge>
      <Badge dot status='success'><Avatar name='C' /></Badge>
    </Space>
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| count | 展示数字 | `number` | `0` |
| dot | 显示小圆点 | `boolean` | `false` |
| overflowCount | 超过后显示为 `${overflowCount}+` | `number` | `99` |
| showZero | `count` 为 0 时是否展示 | `boolean` | `false` |
| status | 状态色（作用于圆点或数字徽标背景） | `'default' \| 'success' \| 'processing' \| 'error' \| 'warning'` | - |
| offset | 相对默认位置的偏移 `[x, y]`（px） | `[number, number]` | - |
| color | 自定义背景色 | `string` | - |
