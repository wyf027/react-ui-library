---
title: Statistic 统计数值
---

展示统计数值。

## 示例

<code src="../demos/statistic-1.tsx"></code>

## API

| 属性       | 说明           | 类型                                     | 默认值 |
| ---------- | -------------- | ---------------------------------------- | ------ |
| title      | 标题           | `ReactNode`                              | -      |
| value      | 数值           | `number \| string`                       | -      |
| prefix     | 前缀           | `ReactNode`                              | -      |
| suffix     | 后缀           | `ReactNode`                              | -      |
| formatter  | 自定义数值展示 | `(value: string \| number) => ReactNode` | -      |
| valueStyle | 数值区域样式   | `CSSProperties`                          | -      |
