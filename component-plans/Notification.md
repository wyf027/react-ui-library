# Notification 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/feedback/Notification/Notification.tsx`

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Notification` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/feedback/Notification` |
| 分类 | Feedback |
| 依赖 | `cn` |
| 关联组件 | **`Toast`**（固定角、定时关、`role="status"` + **`polite`**）、**`Alert`**（行内告警条）、**`Modal`**（阻断式） |

---

## 2. 目标与非目标

### 2.1 目标

1. **卡片式通知**：**`rounded-lg border p-4 shadow-sm`**，**`type`** 驱动 **边框/背景/字色**（**info/success/warning/error**，默认 **`info`**）。  
2. **标题 + 可选描述**：**`title`**（默认 **`'Notification'`**）、**`description?: string`**；描述 **有则渲染第二段 `p`**。  
3. **显隐与关闭**：**`open`**（默认 **`true`**）为 **`false`** 时 **`return null`**；右上角 **关闭 `button`** 触发 **`onClose?.()`**。  
4. **强提醒语义**：根节点 **`role="alert"`**（与 **`Toast` 的 `role="status"` + `polite`** 不同，见 §9）。  
5. **属性透传**：**`HTMLAttributes<HTMLDivElement>`** 落在根 **`div`**（**`{...props}` 在 `className` 之后**）。

### 2.2 非目标

1. **定时自动关闭、全局队列、命令式 API**：当前 **无**（**`Toast`** 有 **`duration`**；**`Notification`** **仅** 手动关或父级 **`open={false}`**）。  
2. **`Portal` / 固定视口位置**：当前 **在文档流中渲染**，**非** 右下角 **`fixed`**。  
3. **`ReactNode` 标题/描述、操作区 slot**：当前 **仅 `string`**。  
4. **图标槽、进度条**：当前 **无**。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 页顶/内容区 **内嵌** 重要提示 | 成功/失败结果、**需用户阅读并手动关闭** 的说明。 |
| 与 **`Toast`** 选型 | **`Toast`**：**短时、角标、自动消失**；**`Notification`**：**卡片、**`alert`**、**常显至关闭**。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 根 | **`<div ref={ref} role="alert" className={cn(...)} {...props}>`** |
| 主体行 | **`<div className="flex items-start justify-between gap-3">`** |
| 文案列 | **内层 `div`**：**`<p className="text-sm font-semibold">`** **`{title}`**；**`description`** 时 **`<p className="mt-1 text-sm opacity-90">`** |
| 关闭 | **`<button type="button" onClick={onClose} aria-label="Close notification">`** **`✕`** |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| 显隐 | **由 `open` 决定**；**无** 内部 `useState`。 |
| 关闭钮 | **`onClick={onClose}`**；**`onClose` 未传** 时点击 **无回调**（**按钮仍存在**）。 |
| 父级移除 | 父组件 **`open={false}`** 或 **不再挂载** 即可隐藏。 |

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| **`open`** | **默认 `true`** — **未传 `open` 即显示**，与 **`Toast` 默认 `open=false`** **相反**；集成时 **若需默认隐藏必须显式 `open={false}`**。 |
| **`onClose`** | 建议内 **`setOpen(false)`** 或 **卸载**；**不** 自动改 **`open`**。 |

---

## 7. API 规范

### 7.1 `NotificationProps`（当前实现）

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `type` | 语义色 | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | |
| `title` | 标题 | `string` | `'Notification'` | |
| `description` | 副文案 | `string` | - | **可选** |
| `open` | 是否渲染 | `boolean` | `true` | **`false`** → **`null`** |
| `onClose` | 关闭按钮回调 | `() => void` | - | |
| `className` | 根样式 | `string` | - | |
| 继承 | `HTMLAttributes<HTMLDivElement>` | - | - | |

### 7.2 视觉（`type` 映射摘要）

| `type` | 语义色（边框/背景/字） |
| --- | --- |
| `info` | sky |
| `success` | emerald |
| `warning` | amber |
| `error` | red |

### 7.3 建议演进（可选）

| 能力 | 优先级 |
| --- | --- |
| **`open` 默认改为 `false` 与 Toast 心智对齐**（**Breaking**） | P2（需 changelog） |
| **`duration` 自动关、Portal 角标队列** | P2 |
| **`title`/`description` 支持 `ReactNode`** | P2 |
| **`onClose` 无则隐藏关闭钮** | P3 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| Ref | **`forwardRef<HTMLDivElement, NotificationProps>`** → **根 `div`** |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| 根 | **`role="alert"`** — 读屏通常 **立即打断** 播报 **重要信息**；适合 **错误/强提示**，**不宜** 用于 **高频、非关键** 信息（易 **骚扰**）。 |
| live | **未** 设置 **`aria-live`**（**`role="alert"`** 在多数 UA 等价 **assertive** 行为，**依实现略有差异**）。 |
| 关闭 | **`aria-label="Close notification"`**（**英文固定**）；业务若需 i18n 需演进 **`closeLabel`** 或 **`props` 无法直接改子按钮**（当前 **无** 该 prop）。 |
| 与 **`Toast`** | **`Toast`**：**`role="status"`** + **`polite`**；**`Notification`**：**`alert`** — **选型文档应对比**。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 暗色 | **`type` 色板** 为 **浅色底深字**；**无** **`dark:`** 变体（暗色主题下对比依赖 **`className` 覆盖** 或演进）。 |
| 布局 | **非 `fixed`**，宽度随 **父容器**；**`flex` 头行** 左文右关。 |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| **列表/多条** | **无** 内置堆叠；业务 **`map` + `key`** 或 **自建容器**。 |
| **`{...props}` 覆盖 `role`** | 可能 **改变** 读屏策略；一般 **不建议**。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| **`open={false}`** | **不渲染**（无 **`role="alert"`** 根）。 |
| **`open` 默认** | **未传 `open`** 时 **应出现**（与 **`Toast`** 默认隐藏 **对照**）。 |
| **关闭** | **`onClose`** 在点击 **Close** 时调用。 |
| **`type`/`title`/`description`** | 文案与 **类名/色** 符合预期。 |

（仓库 **当前无** `Notification.test.tsx`；以上为建议用例。）

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | 四 **`type`**、**`description`**、受控 **`open`** + **`onClose`**。 |
| 说明 | **`open` 默认 `true`**、**`role="alert"` 使用边界**、与 **`Toast`** 对比、**关闭钮 i18n** 缺口。 |

---

## 14. 风险与开放问题

| 风险 | 说明 |
| --- | --- |
| **`open` 默认 `true`** | 易 **误显示**；列表页 **误挂载** 即出现 **默认标题 `Notification`**。 |
| **`role="alert"` 滥用** | **批量/轮询** 更新同一区域会 **反复打断读屏**。 |
| **`onClose` 缺失** | 关闭钮 **仍显示** 但 **无效果**，用户困惑。 |
| **无暗色 token** | 暗色页面 **预设浅色条** 可能 **刺眼或对比不足**。 |

---

## 15. 结论

`Notification` 为 **内嵌卡片 + `role="alert"` + 标题/描述 + 手动关闭** 的反馈组件，**`type` 四态** 与 **`Toast` 的 `status`** 色族 **相近但 DOM 角色与默认 `open` 不同**。与 **Button** 无继承关系；关闭控件为 **`type="button"`**，与表单 **`submit`** 无冲突。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | Notification 结论 |
| --- | --- |
| 职责 | 卡片式强提示，可手动关 |
| DOM/语义 | div alert + flex 行 + button |
| 状态与交互 | open；onClose 点击 |
| 数据与受控 | open 默认 true |
| API | type、title、description、onClose |
| 类型与 Ref | HTMLDivElement |
| 无障碍 | alert；关闭英文 aria |
| 样式与主题 | 四色浅底、无 dark |
| 文档与验证 | 与 Toast 差异、默认 open |

---

## 附录 B：参考实现片段（当前仓库）

文件：`packages/ui/src/components/feedback/Notification/Notification.tsx`。

要点：**`open` 早退 `null`**、**`role="alert"`**、**`type` 映射**、**关闭 `button`**。

（以仓库实际代码为准。）
