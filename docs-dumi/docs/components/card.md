---
title: Card 卡片
---

# Card 卡片

通用卡片容器，常用属性对齐 Ant Design `Card`。

## 示例

<code src="./demos/card-basic.tsx"></code>

### 封面、加载、底部操作

<code src="./demos/card-cover.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `ReactNode` | - |
| extra | 右上角操作区 | `ReactNode` | - |
| cover | 封面区域 | `ReactNode` | - |
| actions | 底部操作区 | `ReactNode` | - |
| loading | 加载状态（内置 `Spin` 遮罩） | `boolean` | `false` |
| bordered | 是否显示边框 | `boolean` | `true` |
| hoverable | 悬浮加深阴影 | `boolean` | `false` |
| size | 尺寸 | `'default' \| 'small'` | `'default'` |
