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

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 树结构数据 | `TreeNode[]` | - |
| value | 当前值 | `string` | - |
| defaultValue | 默认值 | `string` | - |
| onChange | 变化回调 | `(value) => void` | - |
