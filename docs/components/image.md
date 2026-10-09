---
title: Image 图片
---

图片组件，对齐 Ant Design Image，支持预览和失败占位。

## 示例

<code src="../demos/image-1.tsx"></code>

## 可访问性

- `preview` 开启时，图片会作为可聚焦的预览触发器暴露，并可通过 Enter 或 Space 打开预览。
- 预览层使用 `role="dialog"` 和 `aria-modal="true"`，可通过点击遮罩、关闭按钮或按 Escape 关闭。
- 预览关闭按钮使用 `Close image preview` 作为可访问名称，便于屏幕阅读器和键盘用户定位。
- 预览触发器默认使用 `Preview ${alt}` 作为可访问名称，也可以通过 `aria-label` 覆盖。
- `preview={false}` 时，图片保留原生 `img` 语义。

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| src | 图片地址 | `string` | - |
| alt | 替代文本 | `string` | `''` |
| fallback | 失败占位图 | `string` | `''` |
| placeholder | 加载占位 | `ReactNode` | - |
| preview | 是否支持预览 | `boolean` | `true` |