# Tree 树形控件

树形数据展示组件。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Tree
      data={[
        { key: 'root', title: 'src', children: [
          { key: 'cmp', title: 'components' },
          { key: 'util', title: 'utils' },
        ]},
      ]}
      defaultExpandedKeys={['root']}
    />
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 树数据 | `TreeNode[]` | - |
| expandedKeys | 展开的节点 | `string[]` | - |
| defaultExpandedKeys | 默认展开 | `string[]` | - |
| onExpand | 展开回调 | `(keys) => void` | - |
