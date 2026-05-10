# Tour 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/feedback/Tour/Tour.tsx`

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Tour` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/feedback/Tour` |
| 分类 | Feedback |
| 依赖 | `cn`、**`useControllableState`** |
| 关联组件 | **`Modal`**（居中阻断）、**`Popover`**（锚点浮层）、**`Button`**（导航按钮） |

---

## 2. 目标与非目标

### 2.1 目标

1. **多步引导壳**：**`steps: TourStep[]`**（**`key` / `title` / `description?`**），每次渲染 **一步**，**`index`** 在 **`[0, steps.length-1]`** 内 **clamp** 取 **`step`**。  
2. **显隐与步骤受控**：**`open`/`defaultOpen`**（**`useControllableState<boolean>`**，**无 `onChange` 接线**）、**`current`/`defaultCurrent`**（**`useControllableState<number>`** + **`onChange?: (current: number) => void`**）。  
3. **全屏弱遮罩 + 居中卡片**：外层 **`fixed inset-0 z-[100] bg-black/30 p-4`**，内层 **`max-w-md`** 白底卡片（**`dark:bg-slate-900`**）。  
4. **Prev / Next|Done / Close**：**`Prev`** **`disabled`** 当 **`index <= 0`**；**`Next`** 在最后一步文案为 **`Done`** 且 **关层 + `onClose`**；非最后步 **`setIndex(index+1)`**。**`Close`** 始终 **关层 + `onClose`**。  
5. **步进文案**：**`Step {index+1} / {steps.length}`**（**英文硬编码**）。

### 2.2 非目标

1. **高亮锚点、滚动到目标、`getBoundingClientRect` 气泡箭头**：当前 **无**；**非** 典型 **Driver.js / 产品导览** 的 **「指哪打哪」** 能力，更接近 **多步 Modal 文案向导**。  
2. **`TourStep.key` 参与渲染或路由**：类型 **保留 `key`**，实现中 **未** 用作 **`React.key`** 或 **锚点 ID**（见 §14）。  
3. **Escape 关闭、点击遮罩关闭、焦点陷阱、Portal**：当前 **无 Portal**（**`fixed` 仍挂当前 React 树位置**）；**遮罩无 `onClick`**。  
4. **`steps` 动态变短时的 `current` 校正**：**仅** 读取时 **clamp**；**`steps` 变空** 时整组件 **`return null`**。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 首次使用 **多步说明**（无页面元素关联） | 居中卡片 + **Prev/Next** 足够。 |
| 与 **「页面高亮导览」** 产品需求 | **需另实现** 锚点层或第三方；**当前 `Tour` 名称易误解**。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 根 | **`<div ref={ref} className={cn('fixed inset-0 z-[100] bg-black/30 p-4', className)} {...props}>`** |
| 卡片 | **内层 `div`**：步骤计数 **`p`**、**`h3`** 标题、可选 **`p`** 描述、**`flex` 按钮行**。 |
| 按钮 | **三个 `type="button"`**：**`Prev`**、**`Close`**、**`Next`/`Done`**（**文案固定英文**）。 |
| 语义 | **无** **`role="dialog"`** / **`aria-modal`** / **`aria-roledescription="tour"`** 等。 |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| 开关 | **`isOpen`** 来自 **`useControllableState`**；**`setIsOpen(false)`** 在 **Close** 与 **Done** 路径。 |
| 步进 | **`index`** 来自 **`useControllableState`**；**`setIndex(index±1)`**。**`setState`** 在 **受控时仍调用 `onChange`**（见 **`useControllableState`** 实现），**父须同步 `current`**。 |
| 空步 | **`!isOpen || steps.length === 0`** → **`null`**。 |

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| **`open` 受控** | **`open !== undefined`** 时 **`isOpen` 取自 `open`**；**`setIsOpen(false)` 不触发「open 的 onChange」**（**hook 未配置**）；**须依赖 `onClose`** 让父 **`setOpen(false)`**，否则 **UI 不关**（与 **`Modal`** 受控 **`onClose`** 同理）。 |
| **`current` 受控** | **`onChange(nextIndex)`** 在 **`setIndex`** 时 **总会调用**；父 **不** 更新 **`current`** 则 **步进无效**（显示卡在旧步）。 |
| **非受控** | **`defaultOpen`**、**`defaultCurrent`** 初始化内部状态。 |

---

## 7. API 规范

### 7.1 `TourStep`

| 字段 | 类型 | 必填 | 当前实现 |
| --- | --- | --- | --- |
| `key` | `string` | 是 | **未** 用于 DOM/React list；**预留** |
| `title` | `ReactNode` | 是 | 渲染于 **`h3`** |
| `description` | `ReactNode` | 否 | 有则 **`p`** |

### 7.2 `TourProps`

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `steps` | 步骤定义 | `TourStep[]` | - | **空数组** 不渲染 |
| `open` | 受控显隐 | `boolean` | - | |
| `defaultOpen` | 非受控显隐 | `boolean` | `false` | |
| `current` | 受控步骤下标 | `number` | - | |
| `defaultCurrent` | 非受控初值 | `number` | `0` | |
| `onChange` | 步骤变更 | `(current: number) => void` | - | **对应 `current`/`setIndex`** |
| `onClose` | 关闭时（用户 Close/Done） | `() => void` | - | **建议在受控 `open` 时内 `setOpen(false)`** |
| `className` | 根遮罩层 | `string` | - | |
| 继承 | `Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>` | - | - | **自定义 `onChange` 步进回调**；**`children` 等若传入会进 `{...props}`**（见 §14） |

### 7.3 建议演进（可选）

| 能力 | 优先级 |
| --- | --- |
| **锚点高亮、滚动、`target`/`getTargetElement`** | P1（若产品定义 Tour） |
| **`role="dialog"` + 焦点陷阱 + Escape** | P1 |
| **`useControllableState` 为 `open` 增加 `onOpenChange`** | P2 |
| **i18n：Prev/Close/Next/Done/Step 文案** | P2 |
| **`Portal`** | P2 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| Ref | **`forwardRef<HTMLDivElement, TourProps>`** → **最外层遮罩 `div`** |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| 当前 | **无** **`role="dialog"`**、**无** **`aria-labelledby`**；**`h3`** 提供部分标题语义。 |
| 按钮 | **英文可见文案**；**无** **`aria-disabled` 补充**（**`disabled` 原生即可**）。 |
| 焦点 | **打开时未** 将焦点移入卡片；**无** trap。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 层级 | **`z-[100]`**，意图 **高于** 常见 **`z-50` Modal**。 |
| 暗色 | 卡片与正文 **`dark:`** 变体；主按钮 **`bg-brand-500`**。 |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| **与 `Modal` 同开** | **z-index** 上 **Tour 在上**；仍可能 **焦点/读屏顺序混乱**，**不建议** 叠加。 |
| **`children` 透传** | **`HTMLAttributes`** 含 **`children`**；若传入 **可能与内层卡片并列渲染**，**不推荐**。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| 空/关 | **`steps=[]` 或 `open=false`** → **`null`**。 |
| 步进 | **Prev/Next** 改变 **`title`**；**第一步 Prev disabled**。 |
| 结束 | **最后步 `Done`** 与 **`Close`** 均触发 **`onClose`** 且 **`open` 非受控时关闭**。 |
| 受控 | **`current`/`open`** 与父状态同步；**`onChange`** 次数与步进一致。 |

（仓库 **当前无** `Tour.test.tsx`；以上为建议用例。）

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | 多 **`steps`**、受控 **`open`+`onClose`**、受控 **`current`+`onChange`**。 |
| 说明 | **非锚点导览**、**受控 `open` 必须 `onClose`**、**`TourStep.key` 现状**、**英文 UI**。 |

---

## 14. 风险与开放问题

| 风险 | 说明 |
| --- | --- |
| **命名与能力不符** | **「Tour」** 易期望 **高亮步骤**；实为 **居中多步卡片**。 |
| **`TourStep.key` 闲置** | 类型必填 **无运行时用途**，易造成 **误用为 React `key` 列表** 的误解。 |
| **`children` via spread** | 与内层结构关系 **不清晰**；建议 **Omit `children`** 或 **文档禁止**。 |
| **无遮罩点击关** | 用户 **只能点 Close/Done** 结束（**无 Esc**）。 |

---

## 15. 结论

`Tour` 为 **`useControllableState` 管理 `open` 与 `current` + 全屏半透明遮罩 + 居中卡片 + Prev/Next/Done/Close** 的多步引导 **壳**；**无锚点、无 Portal、弱 a11y**。与 **Button** 无继承关系；导航控件均为 **`type="button"`**。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | Tour 结论 |
| --- | --- |
| 职责 | 多步居中说明（非高亮导览） |
| DOM/语义 | fixed 遮罩 + 卡片 + 三按钮 |
| 状态与交互 | open、index；useControllableState |
| 数据与受控 | open/current/onChange/onClose |
| API | steps、TourStep |
| 类型与 Ref | HTMLDivElement 根 |
| 无障碍 | 弱；无 dialog 模式 |
| 样式与主题 | z-[100]、brand Done |
| 文档与验证 | 命名、受控、key 闲置 |

---

## 附录 B：参考实现片段（当前仓库）

文件：`packages/ui/src/components/feedback/Tour/Tour.tsx`。

要点：**`useControllableState`×2**、**`step = steps[clamp(index)]`**、**`z-[100]`**。

（以仓库实际代码为准。）
