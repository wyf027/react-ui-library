# Mentions 提及

提及组件，输入 @ 触发。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Mentions options={[{ value: 'alice' }, { value: 'bob' }, { value: 'charlie' }]} />
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options | 提及选项 | `MentionsOption[]` | - |
| value | 当前值 | `string` | - |
| defaultValue | 默认值 | `string` | - |
| onChange | 变化回调 | `(value: string) => void` | - |
