# Tree 树形控件

树形数据展示组件。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Tree
      aria-label='Project files'
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

## 可访问性

- 根节点默认使用 `role="tree"`，可通过 `aria-label` 或 `aria-labelledby` 为树提供名称。
- 节点使用 `role="treeitem"`，并根据层级、同级位置和展开状态输出 `aria-level`、`aria-posinset`、`aria-setsize`、`aria-expanded`。
- 仅当前焦点节点进入 Tab 顺序；获得焦点后可使用 `ArrowUp` / `ArrowDown`、`Home` / `End` 在可见节点间移动。
- `ArrowRight` 会展开当前可展开节点或移动到第一个子节点；`ArrowLeft` 会收起当前节点或移动到父节点；`Enter` / `Space` 可切换展开状态。

## API

| 属性                | 说明       | 类型             | 默认值 |
| ------------------- | ---------- | ---------------- | ------ |
| data                | 树数据     | `TreeNode[]`     | -      |
| expandedKeys        | 展开的节点 | `string[]`       | -      |
| defaultExpandedKeys | 默认展开   | `string[]`       | -      |
| onExpand            | 展开回调   | `(keys) => void` | -      |
