---
title: List 列表
---

# List 列表

通用列表组件，对齐 Ant Design List。

## 示例

<code src="./demos/list-basic.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dataSource | 数据源 | `ListItem[]` | `[]` |
| header | 头部 | `ReactNode` | - |
| footer | 底部 | `ReactNode` | - |
| bordered | 是否有边框 | `boolean` | `true` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| loading | 加载中 | `boolean` | `false` |
| renderItem | 自定义渲染 | `(item: ListItem, index: number) => ReactNode` | - |
| grid | 网格配置 | `{ cols?: number; gap?: number }` | - |
