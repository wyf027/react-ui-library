---
title: VirtualList 虚拟列表
---

# VirtualList 虚拟列表

高性能虚拟滚动列表。

## 示例

<code src="./demos/virtual-list-basic.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 数据列表 | `T[]` | - |
| itemHeight | 每项高度（px） | `number` | `36` |
| height | 容器高度（px） | `number` | `240` |
| renderItem | 渲染函数 | `(item: T, index: number) => ReactNode` | - |
