---
title: Collapse 折叠面板
---

可以折叠/展开的内容区域。

## 示例

<code src="../demos/collapse-1.tsx"></code>

## 可访问性

每个面板标题使用原生 `button`，并通过 `aria-expanded` 和 `aria-controls` 关联展开内容。展开后的内容区域会以 `region` 暴露，并通过标题按钮命名。

## API

| 属性             | 说明                | 类型                            | 默认值  |
| ---------------- | ------------------- | ------------------------------- | ------- |
| items            | 面板项              | `CollapseItem[]`                | -       |
| activeKey        | 展开的 key 列表     | `string[]`                      | -       |
| defaultActiveKey | 默认展开的 key 列表 | `string[]`                      | `[]`    |
| accordion        | 手风琴模式          | `boolean`                       | `false` |
| onChange         | 变化回调            | `(activeKey: string[]) => void` | -       |

## CollapseItem

| 属性     | 说明         | 类型        | 默认值  |
| -------- | ------------ | ----------- | ------- |
| key      | 面板唯一标识 | `string`    | -       |
| title    | 面板标题     | `ReactNode` | -       |
| content  | 面板内容     | `ReactNode` | -       |
| disabled | 禁用面板     | `boolean`   | `false` |
