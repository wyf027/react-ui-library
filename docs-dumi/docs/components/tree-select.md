---
title: TreeSelect 树选择
---

# TreeSelect 树选择

上方展示当前选中节点标题，下方为 [`Tree`](/components/tree) 展开列表；点击节点按钮会将对应 key 设为选中值（实现依赖按钮文案与 key 的匹配，适用于演示与简单场景）。

## 示例

<code src="./demos/tree-select-basic.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 树数据 | `TreeNode[]` | - |
| value | 受控：选中节点 key | `string` | - |
| defaultValue | 初始选中 key | `string` | `''` |
| onChange | 选中变化 | `(value: string) => void` | - |

其余属性继承外层容器 `div`（`className` 等）。
