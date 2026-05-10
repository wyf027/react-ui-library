# Toast 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/feedback/Toast/Toast.tsx`、`index.ts`（**`Message` 为 `Toast` 别名**）。

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Toast`（**`Message`** 为同一导出别名） |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/feedback/Toast` |
| 分类 | Feedback |
| 依赖 | `cn` |
| 关联组件 | **`Notification`**（若存在多实例/队列）、**`Alert`**（行内提示 vs 固定浮层） |

---

## 2. 目标与非目标

### 2.1 目标

1. **轻量浮层提示**：**`open`** 为 **`true`** 时渲染 **固定定位** 卡片（**`bottom-4 right-4`**），**`children`** 为文案或简短节点。  
2. **自动关闭**：**`duration`**（默认 **`2500`** ms）到期调用 **`onClose?.()`**；**`open` 变为 false** 或卸载时 **`clearTimeout`**。  
3. **语义化状态色**：**`status?: 'info' | 'success' | 'warning' | 'error'`**（默认 **`'info'`**），对应 **边框 + 背景 + 文字** 色板（**sky / emerald / amber / red**）。  
4. **读屏友好**：根节点 **`role="status"`**、**`aria-live="polite"`**。  
5. **属性透传**：**`HTMLAttributes<HTMLDivElement>`** 落在根 **`div`** 上（**`{...props}` 在 `className` 合并之后**）。

### 2.2 非目标

1. **全局命令式 API（`toast.success()`）**：当前 **仅** 声明式 **`open` + `onClose`**；队列、**`id`、多实例栈** **无**。  
2. **`Portal`**：内容 **不** 自动挂 **`document.body`**，**在 React 树挂载位置渲染**（**`fixed`** 仍相对视口定位）。  
3. **进入/离开动画、拖拽关闭、操作按钮区**：当前 **无**。  
4. **`aria-live="assertive"` 按 `status` 区分**：当前 **统一 `polite`**，**`error`** 不强制打断（演进可选）。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 操作结果反馈 | 提交成功/失败短提示；父组件 **`open`** 由 **`useState`** 或全局 store 驱动。 |
| 与 **`Modal`** 区分 | **`Toast`** 非模态、不截断背后交互（**无遮罩**）。 |
| **多条同时出现** | 需 **业务** 多个 **`Toast`** 实例或自管 **垂直 offset**；组件 **无** 内置堆叠。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 根节点 | **`<div ref={ref} role="status" aria-live="polite" className={cn(...)} {...props}>`**。 |
| 关闭 | **无** 可见关闭按钮；**仅** 定时器 **`onClose`** 与父级 **`open={false}`**。 |
| 空态 | **`open === false`** → **`return null`**，**不** 占 DOM。 |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| 显隐 | **完全由父组件 `open`**。 |
| 定时器 | **`useEffect`**：**`open`** 为 **`true`** 时 **`setTimeout(..., duration)`**；cleanup **`clearTimeout`**。 |
| 依赖 | **`[duration, onClose, open]`** — **`onClose` 引用变化** 会 **重置计时**（见 §14）。 |

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| 受控 | **`open`** 为唯一真相；**`onClose`** 内应 **`setOpen(false)`** 以移除 UI（否则仅回调、**若父仍 `open` 则仍显示**）。 |
| 与 **Button** 对比 | **无** `onClick` 默认行为；**无** `disabled`；为 **展示 + 定时** 组件。 |

---

## 7. API 规范

### 7.1 `ToastProps`（当前实现）

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `open` | 是否显示 | `boolean` | `false` | **`false`** → **`null`** |
| `duration` | 自动关闭毫秒 | `number` | `2500` | **`open` 为 true** 时启动 |
| `onClose` | 到时或 effect 清理路径回调 | `() => void` | - | **建议** 内 **`setOpen(false)`** |
| `status` | 语义色 | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | |
| `children` | 内容 | `ReactNode` | - | |
| `className` | 根样式 | `string` | - | **`cn`** 与状态色合并 |
| 继承 | `HTMLAttributes<HTMLDivElement>` | - | - | |

### 7.2 视觉（当前实现摘要）

| 项 | 类名/行为 |
| --- | --- |
| 布局 | **`fixed bottom-4 right-4 z-50 min-w-64 rounded-lg border px-4 py-3 text-sm shadow-lg`** |
| 状态色 | **`info`** sky、**`success`** emerald、**`warning`** amber、**`error`** red（**边框/背景/字色** 一套） |

### 7.3 导出别名

| 导出 | 说明 |
| --- | --- |
| **`Message`** | **`export const Message = Toast`**，与 **`Toast`** 完全同一实现，便于命名迁移或文档双名。 |

### 7.4 建议演进（可选）

| 能力 | 优先级 |
| --- | --- |
| **`Portal` + 多实例栈 + offset** | P2 |
| **命令式 API / Context Provider** | P2 |
| **`error` → `aria-live="assertive"`** | P2 |
| **关闭按钮、暂停计时（hover）** | P3 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| Ref | **`forwardRef<HTMLDivElement, ToastProps>`** → **根 `div`** |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
|  live 区域 | **`aria-live="polite"`** — 更新 **不抢占** 当前读屏流；**紧急错误** 若需强提醒可演进 **`assertive`**。 |
| 角色 | **`role="status"`** — 适用于 **状态变化** 短消息。 |
| 焦点 | **不** 自动 **`focus`** 根节点；**不** 抢键盘焦点（与 **Modal** 不同）。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 层级 | **`z-50`**，与 **`Modal`/`Drawer`** 同级，**叠放顺序** 依赖 **DOM 与后渲染**。 |
| 暗色 | 当前状态色 **无** **`dark:`** 变体（**亮色系** 卡片在暗色页面上的对比由业务 **`className` 覆盖** 或演进主题）。 |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| 根布局 | 若应用根 **`overflow: hidden`** 异常裁剪 **`fixed`** 子节点，可将 **`Toast`** 挂到 **`Portal` 根**（**业务** 或演进内置）。 |
| **`{...props}` 置后** | 传入 **`role`/`aria-live`** 会 **覆盖** 默认值；一般 **不建议** 覆盖 **`role="status"`** 语义。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| 关闭 | **`open={false}`** 无 **`role="status"`** 节点。 |
| 打开 | **`open`** 时 **`role`**、**`aria-live`**、**`children`**、**`status`** 对应类名。 |
| 定时 | **`onClose`** 在约 **`duration`** 后触发；**`open` 提前 false** 时 cleanup **不** 误触发（或仅 effect 清理，依实现）。 |
| **`onClose` 稳定引用** | **`useCallback`** 避免 **无意义重置定时器**。 |

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | 受控 **`open`**、**`duration`**、四 **`status`**、**`Message` 别名**。 |
| 说明 | **无 Portal/无队列**、**`onClose` 依赖**、**暗色主题缺口**、多实例堆叠由业务处理。 |

---

## 14. 风险与开放问题

| 风险 | 说明 |
| --- | --- |
| **`onClose` 不稳定** | **`useEffect`** 依赖 **`onClose`**，父组件每次 render **新建函数** 会导致 **定时器反复重置**，**Toast 可能迟迟不关**。 |
| **多条右下角重叠** | **固定 `bottom-4 right-4`**，多 **`Toast`** **互相遮挡**；需 **`style`/`className` 位移** 或队列组件。 |
| **暗色模式** | 预设 **浅色底** 色板，**无 `dark:`**；暗色应用需 **自定义 `className` 或扩展 `status` 样式**。 |
| **`error` + `polite`** | 严重错误可能被读屏 **延迟播报**；关键错误可业务改用 **`role="alert"`**（需 **`props` 或演进**）。 |

---

## 15. 结论

`Toast` 为 **右下角固定、`role="status"`、`duration` 定时 `onClose`、四档 `status` 色** 的轻量提示；**`Message`** 与 **`Toast`** 等价导出。与 **Button** 无继承关系；**无遮罩、无 Portal、无堆叠与命令式 API**，适合作为 **MVP 反馈条**，复杂通知需演进或上层封装。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | Toast 结论 |
| --- | --- |
| 职责 | 非阻塞短时反馈 |
| DOM/语义 | 单 div，status，polite |
| 状态与交互 | open、定时 onClose |
| 数据与受控 | open + onClose |
| API | duration、status、Message 别名 |
| 类型与 Ref | HTMLDivElement |
| 无障碍 | status/polite；error 不 assertive |
| 样式与主题 | fixed 右下、四色、缺 dark |
| 文档与验证 | onClose 稳定、多实例、Portal |

---

## 附录 B：参考实现片段（当前仓库）

文件：`packages/ui/src/components/feedback/Toast/Toast.tsx`。

要点：**`useEffect` + `setTimeout`**、**`open` 早退 `null`**、**`status` 映射 class**、**`export const Message = Toast`**。

（以仓库实际代码为准。）
