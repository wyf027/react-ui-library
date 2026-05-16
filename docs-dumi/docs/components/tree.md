---
title: Tree 树形控件
---

# Tree 树形控件

树形数据展示组件。

## 示例

<code src="./demos/tree-basic.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 树数据 | `TreeNode[]` | - |
| expandedKeys | 展开的节点（受控） | `string[]` | - |
| defaultExpandedKeys | 默认展开 | `string[]` | `[]` |
| onExpand | 展开集合变化 | `(keys: string[]) => void` | - |
