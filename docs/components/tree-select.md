# TreeSelect 树选择

树形选择器。

## 示例

<LivePlayground :code="`
() => {
  return (
    <TreeSelect
      data={[
        { key: 'root', title: '根节点', children: [
          { key: 'child1', title: '子节点 1' },
          { key: 'child2', title: '子节点 2' },
        ]},
      ]}
    />
  )
}
`" />

## 选择行为

- TreeSelect 会使用树节点的 `key` 作为选中值，点击节点标题时触发 `onChange(value)`。
- 节点标题不需要包含 key；中文标题、自定义标题和 key 不一致时也能正确选中。
- 受控 `value` 和非受控 `defaultValue` 都会根据节点 key 回显对应标题。

## API

| 属性         | 说明       | 类型              | 默认值 |
| ------------ | ---------- | ----------------- | ------ |
| data         | 树结构数据 | `TreeNode[]`      | -      |
| value        | 当前值     | `string`          | -      |
| defaultValue | 默认值     | `string`          | -      |
| onChange     | 变化回调   | `(value) => void` | -      |
