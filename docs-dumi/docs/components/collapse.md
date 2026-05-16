---
title: Collapse 折叠面板
---

# Collapse 折叠面板

可以折叠/展开的内容区域。

## 示例

<code src="./demos/collapse-basic.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 面板项 | `CollapseItem[]` | - |
| activeKey | 展开的 key（受控） | `string[]` | - |
| defaultActiveKey | 默认展开 | `string[]` | `[]` |
| accordion | 手风琴模式 | `boolean` | `false` |
| onChange | 展开集合变化 | `(activeKey: string[]) => void` | - |
