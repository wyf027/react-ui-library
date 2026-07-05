# Rate 评分

评分组件。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Space direction='vertical' size={8}>
      <Rate defaultValue={3} />
      <Rate defaultValue={4} count={10} />
    </Space>
  )
}
`" />

## 键盘操作

组件默认支持方向键调整评分，`Home` 清空评分（`allowClear=false` 时回到 1），`End` 跳到最高分。

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| count | 星数 | `number` | `5` |
| value | 当前值 | `number` | - |
| defaultValue | 默认值 | `number` | - |
| allowClear | 允许清除 | `boolean` | `true` |
| keyboard | 允许键盘操作 | `boolean` | `true` |
| disabled | 禁用评分 | `boolean` | `false` |
| onChange | 值变化回调 | `(value: number) => void` | - |
