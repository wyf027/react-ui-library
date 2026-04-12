# InputNumber 数字输入框

通过鼠标或键盘输入数值，对齐 Ant Design InputNumber。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Space direction='vertical' size={8}>
      <InputNumber defaultValue={3} min={1} max={10} />
      <InputNumber defaultValue={0} step={0.1} precision={2} />
      <InputNumber placeholder='无控制器' controls={false} />
      <InputNumber defaultValue={5} disabled />
    </Space>
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前值 | `number` | - |
| defaultValue | 默认值 | `number` | - |
| min | 最小值 | `number` | `-Infinity` |
| max | 最大值 | `number` | `Infinity` |
| step | 步长 | `number` | `1` |
| precision | 精度 | `number` | - |
| controls | 显示增减按钮 | `boolean` | `true` |
| disabled | 禁用 | `boolean` | `false` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| onChange | 值变化回调 | `(value: number \| null) => void` | - |
