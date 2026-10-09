---
title: BackTop 回到顶部
---

返回页面顶部的按钮。

## 示例

<code src="../demos/back-top-1.tsx"></code>

### 自定义滚动容器

<code src="../demos/back-top-2.tsx"></code>

## 可访问性

`BackTop` 默认渲染为带有 `aria-label="Back to top"` 的按钮，避免辅助技术读取装饰性箭头符号。可以通过 `aria-label` 提供本地化或更贴合业务语境的按钮名称。

点击按钮时组件会先调用传入的 `onClick`，如果事件未被 `preventDefault()` 阻止，再执行平滑滚动到页面顶部或 `target` 指定容器顶部。

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visibilityHeight | 滚动高度达到此参数值才出现 | `number` | `200` |
| target | 自定义滚动容器 | `() => HTMLElement \| Window \| null` | `() => window` |
| children | 自定义按钮内容 | `ReactNode` | `'↑ Top'` |
| aria-label | 按钮可访问名称 | `string` | `'Back to top'` |
| onClick | 点击回调；可通过 `event.preventDefault()` 阻止默认滚动 | `(event: MouseEvent<HTMLButtonElement>) => void` | - |
