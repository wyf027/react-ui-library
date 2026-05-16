---
title: Notification 通知
---

# Notification 通知

通知提醒框。

## 示例

<code src="./demos/notification-basic.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 类型 | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` |
| title | 标题 | `string` | `'Notification'` |
| description | 描述内容 | `string` | - |
| open | 是否显示 | `boolean` | `true` |
| onClose | 关闭回调 | `() => void` | - |
