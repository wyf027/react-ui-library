---
title: Segmented 分段控制
---

# Segmented 分段控制

一组互斥选项，样式为分段按钮；默认选中第一项（若未传 `defaultValue` / `value`）。

## 示例

<code src="./demos/segmented-basic.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options | 选项列表 | `SegmentedOption[]` | - |
| value | 受控值 | `string` | - |
| defaultValue | 初始值 | `string` | `options[0]?.value ?? ''` |
| onChange | 变更回调 | `(value: string) => void` | - |

`SegmentedOption`：`{ label: ReactNode; value: string; disabled?: boolean }`。

其余属性继承外层容器 `div`（`className` 等）。
