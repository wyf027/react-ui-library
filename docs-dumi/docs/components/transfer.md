---
title: Transfer 穿梭框
---

# Transfer 穿梭框

左右两栏列表，点击条目在 source / target 之间移动；中间列为简易分隔符。

## 示例

<code src="./demos/transfer-basic.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dataSource | 全量数据 | `TransferItem[]` | - |
| targetKeys | 受控：右侧（目标）键列表 | `string[]` | - |
| defaultTargetKeys | 非受控初始右侧键 | `string[]` | `[]` |
| onChange | 右侧键列表变化 | `(nextTargetKeys: string[]) => void` | - |

`TransferItem`：`{ key: string; title: string; disabled?: boolean }`。

其余属性继承外层容器 `div`（`className` 等）。
