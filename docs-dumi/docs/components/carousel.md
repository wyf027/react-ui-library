---
title: Carousel 走马灯
---

# Carousel 走马灯

横向轮播容器；支持箭头、指示点与可选自动播放。

## 示例

<code src="./demos/carousel-basic.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 每一帧内容 | `ReactNode[]` | - |
| autoplay | 自动播放 | `boolean` | `false` |
| autoplaySpeed | 自动切换间隔（ms） | `number` | `3000` |
| dots | 底部指示点 | `boolean` | `true` |
| arrows | 左右箭头 | `boolean` | `true` |

其余属性继承外层容器 `div`（`className` 等）。
