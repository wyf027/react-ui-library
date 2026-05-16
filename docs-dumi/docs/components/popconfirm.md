---
title: Popconfirm 气泡确认
---

# Popconfirm 气泡确认

点击元素弹出确认气泡，对齐 Ant Design Popconfirm。

## 示例

<code src="./demos/popconfirm-basic.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 确认标题 | `ReactNode` | - |
| description | 描述 | `ReactNode` | - |
| onConfirm | 确认回调 | `() => void` | - |
| onCancel | 取消回调 | `() => void` | - |
| okText | 确认文本 | `string` | `'确定'` |
| cancelText | 取消文本 | `string` | `'取消'` |
| open | 是否显示（受控） | `boolean` | - |
| defaultOpen | 默认显示 | `boolean` | `false` |
