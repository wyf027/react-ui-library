# VirtualList 组件技术方案

> 与 **Button 技术方案**同维度。  
> **实现**：`packages/ui/src/components/data/VirtualList/VirtualList.tsx`

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `VirtualList` |
| 路径 | `packages/ui/src/components/data/VirtualList` |

## 2. 目标与非目标

**目标**：**固定 `height` 容器** **`overflow-auto`**，**`scrollTop`** 算 **`start`/`end`**，**`slice` 渲染可视行** + **上下缓冲**（**`visibleCount = ceil(h/itemH)+2`**，`start` 再 **-1** 钳制）。  
**非目标**：无 **动态项高**、无 **`overscan` API**、无 **横向虚拟**；**`forwardRef` 实现写死 `VirtualListProps<unknown>`**。

## 4. DOM

**外层 `div`** **`onScroll`→`setScrollTop`**；**内层总高 `items.length*itemHeight`**；**绝对定位 `top: start*itemHeight`** 放 **可见行 `div`**。

## 7. API

**`items`/`renderItem`**；**`itemHeight`** 默认 **36**；**`height`** 默认 **240**；**`Omit<HTMLAttributes, 'children'>`**。

## 8. Ref

**`HTMLDivElement`** → **滚动容器**。

## 9. 无障碍

**大量 `div` 行**；**无 `role="list"`**；**键盘滚动** 依赖 **容器可聚焦**（**需 `tabIndex`** 业务加）。

## 14. 风险

**`key={start+index}`**：索引键 **在数据重排时** 可能 **状态错乱**；建议演进 **`itemKey`**。  
**`itemHeight` 与实际行高不一致** → **重叠/大缝**。

## 15. 结论

**定高窗口 + 简单纵向虚拟** MVP。

## 附录 A

职责·长列表性能 | 状态·scrollTop | 风险·key/定高

## 附录 B

`VirtualList.tsx`。
