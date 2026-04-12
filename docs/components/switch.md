# Switch 开关

开关选择器。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Space>
      <Switch />
      <Switch defaultChecked />
      <Switch disabled />
    </Space>
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| checked | 是否开启 | `boolean` | - |
| defaultChecked | 默认开启 | `boolean` | `false` |
| onChange | 变化回调 | `(checked: boolean) => void` | - |
| disabled | 禁用 | `boolean` | `false` |
