---
title: Avatar 头像
---

# Avatar 头像

用户头像组件：无图时为圆形文字占位；有 **`src`** 时为圆形图片。

## 示例

<code src="./demos/avatar-basic.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 名称（显示首字母） | `string` | - |
| src | 图片地址 | `string` | - |
| size | 宽高（px） | `number` | `36` |

其余继承 **`ImgHTMLAttributes`**（含 **`alt`**、**`className`** 等）。
