---
title: Switch 开关
---

# Switch 开关

按钮形态的开关，语义为 `role="switch"`，支持受控/非受控。

## 示例

<code src="./demos/switch-basic.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| checked | 受控状态 | `boolean` | - |
| defaultChecked | 初始状态 | `boolean` | `false` |
| onChange | 变更回调 | `(checked: boolean) => void` | - |
| disabled | 禁用 | `boolean` | - |

其余属性继承原生 `button`（`className` 等）。
