# Progress 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/data/Progress/Progress.tsx`

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Progress` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/data/Progress` |
| 分类 | Data |
| 依赖 | `cn` |
| 关联组件 | **`Slider`**（可拖拽数值）、**`Spin`**（不确定进度）、**`Statistic`**（数值展示） |

---

## 2. 目标与非目标

### 2.1 目标

1. **水平条形进度**：外层 **`w-full`** **`div`**，内 **轨道** **`h-2 w-full overflow-hidden rounded-full bg-slate-200`**（**`dark:bg-slate-700`**），内 **填充条** **`h-full`**，**`style.width` 为 `safePercent` 对应的百分比** + **`transition-all`**。  
2. **百分比钳制**：**`safePercent = Math.max(0, Math.min(100, percent))`**，**超界输入不报错**。  
3. **状态色**：**`status?: 'normal' | 'success' | 'exception'`**（默认 **`normal`**）→ **`bg-brand-500` / `bg-emerald-500` / `bg-red-500`**。  
4. **文案**：**`showInfo`**（默认 **`true`**）时 **`mt-1 text-right text-xs text-slate-500`** 显示 **`{safePercent}%`**。  
5. **根透传**：**`HTMLAttributes<HTMLDivElement>`** 落在 **最外层 `div`**（**`{...props}` 在 `className` 之后**）。

### 2.2 非目标

1. **原生 `role="progressbar"`、`aria-valuenow`/`aria-valuemin`/`aria-valuemax`**：当前 **未** 设置在 **轨道或根节点**（见 §9）。  
2. **环形进度、多段堆叠、渐变色、动画条纹**：当前 **仅** **单条水平填充**。  
3. **不确定进度（indeterminate）**：**无** 无限 **动画** 模式。  
4. **`format` 自定义文案**：**仅** **`数字%`** 固定格式。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 上传、安装、任务队列 | **`percent`** 由 **父组件** 根据 **已处理/总量** 计算。 |
| 成功/失败态 | **`status="success"`** / **`status="exception"`** 与 **业务状态** 同步。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 根 | **`<div ref={ref} className={cn('w-full', className)} {...props}>`** |
| 轨道 | **`<div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 ...">`** |
| 填充 | **`<div />`**：**`h-full`**、**`transition-all`**、**`style.width` 百分比**、**`status` 决定 `bg-*`** — **自闭合**，**无子节点** |
| 文案 | **`showInfo`**：**`<div className="mt-1 text-right text-xs text-slate-500">`** **`{safePercent}%`** |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| 状态 | **无** 内部 `useState`；**完全由 `percent`/`status`/`showInfo`** 驱动。 |
| 交互 | **无** 点击/拖拽；**纯展示**。 |

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| **`percent`** | **受控语义**；**父** 更新 **重绘宽度** 与 **文案**。 |

---

## 7. API 规范

### 7.1 `ProgressProps`（当前实现）

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `percent` | 进度 0–100 | `number` | - | **必填**；**内部 clamp** |
| `status` | 条颜色语义 | `'normal' \| 'success' \| 'exception'` | `'normal'` | |
| `showInfo` | 是否显示百分比 | `boolean` | `true` | |
| `className` | 根容器 | `string` | - | |
| 继承 | `HTMLAttributes<HTMLDivElement>` | - | - | |

### 7.2 视觉（摘要）

| 区域 | 要点 |
| --- | --- |
| 轨道高 | **`h-2`** |
| 过渡 | **`transition-all`**（**`width` 变化** 有过渡） |

### 7.3 建议演进（可选）

| 能力 | 优先级 |
| --- | --- |
| **`role="progressbar"` + `aria-valuenow={safePercent}` 等** | P1 |
| **`format(percent)=>ReactNode`、`strokeColor`** | P2 |
| **环形、`success` 打勾图标** | P2 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| Ref | **`forwardRef<HTMLDivElement, ProgressProps>`** → **最外层 `div`** |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| 当前 | **无** **`progressbar`** **语义**；读屏 **可能仅读旁路文本** **`N%`**（**`showInfo`** 开时）。 |
| 建议 | **根或轨道** 补 **`role="progressbar"`**、**`aria-valuenow`/`aria-valuemin`/`aria-valuemax`**；**`showInfo=false`** 时 **更依赖** 上述 **ARIA**。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 暗色 | **轨道 `dark:bg-slate-700`**；**填充色** **无** **`dark:`** 变体（**品牌/绿/红** 在暗底上 **一般仍可辨**）。 |
| 文案 | **`text-slate-500`**，**无 `dark:`** 微调。 |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| **`{...props}`** | 可传 **`aria-label`** 描述 **任务名**；**与演进 `role=progressbar`** 搭配更佳。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| **clamp** | **`percent=-10`/`150`** → **显示 0%/100%** 与 **宽度**。 |
| **`status`** | **三类** **背景类名**。 |
| **`showInfo`** | **`false`** **无** 下方 **`%`** **`div`**。 |

（仓库 **当前无** `Progress.test.tsx`；以上为建议用例。）

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | **上传进度**、**`status` 切换**、**`showInfo`**。 |
| 说明 | **clamp**、**a11y 缺口**、**无 indeterminate**。 |

---

## 14. 风险与开放问题

| 风险 | 说明 |
| --- | --- |
| **无 ARIA** | **合规/审计** 场景可能 **不达标**。 |
| **`transition-all`** | **若父频繁改 `percent`**，**动画开销** 可感知；可演进 **`transition-[width]`** 或 **关过渡**。 |

---

## 15. 结论

`Progress` 为 **`percent` 钳制 + 双 `div` 轨道/填充 + 可选右侧百分比文案 + `status` 三色** 的轻量条形进度；**无交互、无 progressbar 语义**。与 **Button** 无继承关系；**a11y 与环形/不确定态** 为演进方向。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | Progress 结论 |
| --- | --- |
| 职责 | 展示 0–100% 进度 |
| DOM/语义 | 外层 + 轨道 + 填充 + 可选文案 |
| 状态与交互 | 无状态；无交互 |
| 数据与受控 | percent 父传 |
| API | percent、status、showInfo |
| 类型与 Ref | HTMLDivElement |
| 无障碍 | 弱；无 progressbar |
| 样式与主题 | slate 轨、brand/emerald/red |
| 文档与验证 | clamp、ARIA |

---

## 附录 B：参考实现片段（当前仓库）

文件：`packages/ui/src/components/data/Progress/Progress.tsx`。

要点：**`safePercent`**、**填充条 `style.width` 为百分比字符串**、**`status` 映射**。

（以仓库实际代码为准。）
