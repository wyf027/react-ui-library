---
title: Timeline 时间轴
---

垂直展示的时间流信息。

## 示例

<code src="../demos/timeline-1.tsx"></code>

### 反向展示

<code src="../demos/timeline-2.tsx"></code>

## API

| 属性    | 说明             | 类型             | 默认值  |
| ------- | ---------------- | ---------------- | ------- |
| items   | 节点列表         | `TimelineItem[]` | -       |
| reverse | 是否反向展示节点 | `boolean`        | `false` |

## TimelineItem

| 属性        | 说明     | 类型                                            | 默认值    |
| ----------- | -------- | ----------------------------------------------- | --------- |
| key         | 唯一标识 | `string`                                        | -         |
| title       | 标题     | `ReactNode`                                     | -         |
| description | 描述     | `ReactNode`                                     | -         |
| timestamp   | 时间信息 | `ReactNode`                                     | -         |
| color       | 节点颜色 | `'brand' \| 'success' \| 'warning' \| 'danger'` | `'brand'` |
