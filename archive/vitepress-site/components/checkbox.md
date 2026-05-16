# Checkbox 多选框

多选框组件。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Space>
      <Checkbox label='选项 A' />
      <Checkbox label='选项 B' defaultChecked />
      <Checkbox label='禁用' disabled />
    </Space>
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| checked | 是否选中 | `boolean` | - |
| defaultChecked | 默认选中 | `boolean` | `false` |
| onChange | 变化回调 | `(e) => void` | - |
| label | 标签文本 | `string` | - |
| disabled | 禁用 | `boolean` | `false` |
