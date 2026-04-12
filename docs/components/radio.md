# Radio 单选框

单选框组件。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Space>
      <Radio name='lang' label='中文' value='zh' />
      <Radio name='lang' label='English' value='en' />
    </Space>
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 值 | `string` | - |
| name | 组名 | `string` | - |
| onChange | 变化回调 | `(e) => void` | - |
| label | 标签文本 | `string` | - |
| disabled | 禁用 | `boolean` | `false` |
