# QRCode 组件技术方案

> 与 **Button 技术方案**同维度。  
> **实现**：`packages/ui/src/components/data/QRCode/QRCode.tsx`

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `QRCode` |
| 路径 | `packages/ui/src/components/data/QRCode` |

## 2. 目标与非目标

**目标**：**`21×21` `grid`**，**`hashValue(value)`** 作 **种子**，**`(index*31+seed)%7 < 3`** 决定 **黑/白块**，**`size`**（默认 **128**）控制 **容器宽高**。  
**非目标（关键）**：**非标准 QR 编码**，**不可被扫码器识别**；**仅视觉占位/演示**。

## 4. DOM

**`<div ref grid border>`** 内 **`matrixSize²` 个 `<span>`** 单元。

## 7. API

**`value: string`**（必填）；**`size?: number`**；**`HTMLAttributes<HTMLDivElement>`**。

## 8. Ref

**`HTMLDivElement`**。

## 9. 无障碍

**无** **`img`+`alt`**；**装饰性网格** 建议 **`aria-hidden="true"`** 或 **`role="img"` + `aria-label`** 演进。

## 14. 风险

**产品名 `QRCode` 与能力严重不符** → **文档与对外 API 必须声明「伪二维码」**；若需真码 **换库**（如 **qrcode**）。

## 15. 结论

**占位图案生成器**，**禁止**用于 **真实扫码场景**。

## 附录 A

职责·伪二维码图案 | DOM·grid span | 风险·非编码

## 附录 B

`QRCode.tsx`（`hashValue`、`matrixSize=21`）。
