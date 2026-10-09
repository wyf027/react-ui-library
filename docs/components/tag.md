---
title: Tag 标签
---

标签组件。

## 示例

<code src="../demos/tag-1.tsx"></code>

## 可访问性

可关闭标签会渲染一个真实按钮，并使用 `closeAriaLabel` 提供可访问名称。`onClose` 会收到关闭按钮点击事件；调用 `event.preventDefault()` 可以阻止标签默认移除，适合需要二次确认或受控删除的场景。

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| color | 颜色 | `'default' \| 'success' \| 'warning' \| 'danger'` | `'default'` |
| closable | 是否可关闭 | `boolean` | `false` |
| closeIcon | 自定义关闭控件内容 | `ReactNode` | `'×'` |
| closeAriaLabel | 关闭按钮的可访问名称 | `string` | `'Close tag'` |
| onClose | 关闭回调，调用 `event.preventDefault()` 可阻止默认移除 | `(event: MouseEvent<HTMLButtonElement>) => void` | - |
