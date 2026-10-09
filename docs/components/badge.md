---
title: Badge 徽标
---

徽标数组件，常用行为对齐 Ant Design `Badge`。`status` 默认背景 class 由 `packages/ui/src/theme/componentTokens.ts` 中的 `badgeStatusBgClass` 维护。

## 示例

<code src="../demos/badge-1.tsx"></code>

### 封顶与状态色

<code src="../demos/badge-2.tsx"></code>

## 可访问性

`Badge` 的数字和圆点本身只是视觉提示，建议用 `badgeLabel` 为业务语境补充可访问名称，例如“5 条未读消息”或“在线”。当 `dot` 没有提供 `badgeLabel` 时，圆点会被标记为装饰性内容，避免辅助技术读出没有语义的空状态。

## API

| 属性          | 说明                                                                    | 类型                                                             | 默认值  |
| ------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------- | ------- |
| count         | 展示内容；数字会参与 `overflowCount` 截断，字符串或自定义节点会直接渲染 | `ReactNode`                                                      | `0`     |
| dot           | 显示小圆点                                                              | `boolean`                                                        | `false` |
| overflowCount | 超过后显示为 `${overflowCount}+`                                        | `number`                                                         | `99`    |
| showZero      | `count` 为 0 时是否展示                                                 | `boolean`                                                        | `false` |
| status        | 状态色（作用于圆点或数字徽标背景）                                      | `'default' \| 'success' \| 'processing' \| 'error' \| 'warning'` | -       |
| offset        | 相对默认位置的偏移 `[x, y]`（px）                                       | `[number, number]`                                               | -       |
| color         | 自定义背景色                                                            | `string`                                                         | -       |
| badgeLabel    | 徽标可访问名称，用于说明数字或圆点的业务含义                            | `string`                                                         | -       |
