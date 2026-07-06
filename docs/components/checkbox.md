# Checkbox 多选框

多选框组件。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Space direction='vertical' size={8}>
      <Checkbox label='选项 A' helperText='可选择多个选项' />
      <Checkbox label='选项 B' defaultChecked />
      <Checkbox label='必须同意' error='请先同意条款' />
      <Checkbox label='禁用' disabled />
    </Space>
  )
}
`" />

## 可访问性

`label` 会作为复选框的可访问名称。传入 `helperText` 时，组件会自动通过 `aria-describedby` 将说明文本关联到复选框；传入 `error` 时，组件会自动设置 `aria-invalid="true"`，并将错误信息作为可访问描述。

如果你同时传入自定义 `aria-describedby`，组件会保留已有描述并追加内部 helper/error 描述，避免覆盖业务侧已有的说明关系。

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| checked | 是否选中 | `boolean` | - |
| defaultChecked | 默认选中 | `boolean` | `false` |
| onChange | 变化回调 | `(checked: boolean) => void` | - |
| label | 标签文本 | `ReactNode` | - |
| helperText | 帮助说明，会自动关联到复选框描述 | `ReactNode` | - |
| error | 错误说明，会自动设置错误状态并关联到复选框描述 | `ReactNode` | - |
| disabled | 禁用 | `boolean` | `false` |
