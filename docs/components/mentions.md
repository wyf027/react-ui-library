# Mentions 提及

提及组件，输入 @ 触发。

## 示例

<LivePlayground :code="`
() => {
  return (
    <div className='max-w-sm'>
      <Mentions
        aria-label='团队提及'
        options={[{ value: 'alice' }, { value: 'bob' }, { value: 'charlie' }]}
      />
    </div>
  )
}
`" />

## 可访问性

当传入 `options` 时，组件会展示可用提及项提示，并通过 `aria-describedby` 将提示文本关联到 `textarea`。如果业务侧已经传入自定义 `aria-describedby`，组件会保留已有描述并追加内部提示，避免覆盖外部帮助文本。

建议为无可见标签的 `Mentions` 传入 `aria-label` 或 `aria-labelledby`，让输入框拥有清晰的可访问名称。

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options | 提及选项 | `MentionsOption[]` | - |
| value | 当前值 | `string` | - |
| defaultValue | 默认值 | `string` | - |
| onChange | 变化回调 | `(value: string) => void` | - |

组件同时继承原生 `TextareaHTMLAttributes<HTMLTextAreaElement>`，可传入 `aria-label`、`aria-labelledby`、`aria-describedby`、`disabled`、`name` 等属性。
