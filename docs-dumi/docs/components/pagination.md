---
title: Pagination 分页
---

# Pagination 分页

分页组件。

## 示例

<code src="./demos/pagination-basic.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| current | 当前页（受控时可配合 **`onChange`**） | `number` | `1` |
| defaultCurrent | 未受控时的默认页 | `number` | `1` |
| total | 总数 | `number` | - |
| pageSize | 每页条数 | `number` | `10` |
| onChange | 页码变化回调 | `(page: number) => void` | - |
