# Radio 单选框

单选框组件。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Space direction='vertical' size={8}>
      <Space>
        <Radio name='lang' label='中文' value='zh' />
        <Radio name='lang' label='English' value='en' helperText='用于界面语言' />
      </Space>
      <Radio name='plan' label='请选择套餐' value='required' error='请选择一个套餐' />
    </Space>
  )
}
`" />

## 可访问性

`label` 会作为单选框的可访问名称。传入 `helperText` 时，组件会自动通过 `aria-describedby` 将说明文本关联到单选框；传入 `error` 时，组件会自动设置 `aria-invalid="true"`，并将错误信息作为可访问描述。

如果你同时传入自定义 `aria-describedby`，组件会保留已有描述并追加内部 helper/error 描述，避免覆盖业务侧已有的说明关系。

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 值 | `string` | - |
| name | 组名 | `string` | - |
| onChange | 变化回调 | `(value: string) => void` | - |
| label | 标签文本 | `ReactNode` | - |
| helperText | 帮助说明，会自动关联到单选框描述 | `ReactNode` | - |
| error | 错误说明，会自动设置错误状态并关联到单选框描述 | `ReactNode` | - |
| disabled | 禁用 | `boolean` | `false` |
