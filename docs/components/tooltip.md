---
title: Tooltip 文字提示
---

简单的文字提示气泡框。

## 示例

<code src="../demos/tooltip-1.tsx"></code>

## API

| 属性      | 说明     | 类型                                       | 默认值     |
| --------- | -------- | ------------------------------------------ | ---------- |
| content   | 提示内容 | `ReactNode`                                | -          |
| disabled  | 禁用     | `boolean`                                  | `false`    |
| placement | 显示位置 | `'top' \| 'right' \| 'bottom' \| 'left'` | `'bottom'` |

## 可访问性

`Tooltip` 会在触发元素获得焦点时显示提示，并在单个有效 React 子元素上通过 `aria-describedby` 关联当前提示内容。按下 <kbd>Escape</kbd> 会关闭已打开的提示。提示内容应保持简短，不应放置可交互控件。

当前 `placement` 覆盖上、右、下、左四个基础方向，默认保持下方展示以兼容既有行为。暂未包含自动翻转和边缘对齐能力；复杂浮层定位仍建议使用 `Popover` 或后续引入更完整的定位策略。
