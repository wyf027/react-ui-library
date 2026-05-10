# Message 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：与 **`Toast` 完全同一模块** — `packages/ui/src/components/feedback/Toast/Toast.tsx` 内 **`export const Message = Toast`**；**`index.ts`** 同时导出 **`Toast`**、**`Message`**、**`ToastProps`**（**无单独 `MessageProps` 类型名**）。

---

## 0. 与 Toast 的关系（必读）

| 项 | 说明 |
| --- | --- |
| 运行时 | **`Message` 与 `Toast` 为同一函数引用**，**DOM、props、行为 100% 一致**。 |
| 类型 | 使用 **`ToastProps`**；包内 **未** 导出 **`MessageProps`**。 |
| 详细行为 | **行为级技术说明以 `component-plans/Toast.md` 为准**；本文侧重 **命名、导出与使用约定**，避免两处长期漂移时可 **以 Toast 文档为单一事实源** 并在此保留 **关系说明 + 命名指引**。 |

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | **`Message`**（别名） / **`Toast`**（主名） |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/feedback/Toast` |
| 分类 | Feedback |
| 依赖 | 同 **`Toast`**（`cn`） |
| 关联组件 | **`Toast`**（同体）、**`Notification`**（若需队列/命令式） |

---

## 2. 目标与非目标

### 2.1 目标（与 Toast 一致）

1. **非阻塞短时反馈**：**`open`**、**`duration`**、**`onClose`**、**`status`**、**`children`**。  
2. **固定右下角**、**`role="status"`**、**`aria-live="polite"`**、**定时自动 `onClose`**。  
3. **双导出命名**：业务或设计规范习惯 **「Message」** 时 **`import { Message }`**，与 **「Toast」** 文档/生态对齐时 **`import { Toast }`**，**无行为差异**。

### 2.2 非目标

1. **独立实现路径**：**不会** 为 **`Message`** 单独维护第二套组件文件（除非未来产品 **刻意拆分为两种组件**，届时再更新本方案）。  
2. 其余与 **`Toast`** 相同：无 **Portal/队列/命令式 API** 等（见 **`component-plans/Toast.md` §2.2**）。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 命名偏好「全局消息」 | 使用 **`Message`** 关键字更符合团队习惯时 **仅用导入名区分**。 |
| 与文档/设计稿统一 | 设计稿写 **Toast** 时用 **`Toast`**；写 **Message** 时用 **`Message`** — **实现层无需二选一**。 |

---

## 4. DOM / 语义

**与 `Toast` 完全一致**：根 **`div`**、**`role="status"`**、**`aria-live="polite"`**、**`open === false` → `null`**。详见 **`Toast` 技术方案 §4**。

---

## 5. 状态与交互

**与 `Toast` 完全一致**：**`useEffect` + `setTimeout(duration)` → `onClose`**，依赖 **`[duration, onClose, open]`**。详见 **`Toast` 技术方案 §5**。

---

## 6. 数据与受控

**与 `Toast` 完全一致**：**`open`** 受控、**`onClose`** 内建议 **`setOpen(false)`**。详见 **`Toast` 技术方案 §6**。

---

## 7. API 规范

### 7.1 类型名

| 名称 | 说明 |
| --- | --- |
| **`ToastProps`** | **唯一** 导出的 Props 类型；**`Message` 使用该类型**。 |
| **`MessageProps`** | **不存在**；若需别名类型，业务可 **`type MessageProps = ToastProps`** 自封装。 |

### 7.2 属性表

与 **`ToastProps`** 相同，字段：**`open`**、**`duration`**、**`onClose`**、**`status`**、**`children`**、**`className`** 及 **`HTMLAttributes<HTMLDivElement>`** 其余透传。详见 **`Toast` 技术方案 §7.1**。

### 7.3 导出（`index.ts`）

```ts
export { Toast, Message } from './Toast'
export type { ToastProps } from './Toast'
```

---

## 8. 类型与 Ref

**与 `Toast` 一致**：**`forwardRef<HTMLDivElement, ToastProps>`**（**`Message` 即 `Toast`**）。详见 **`Toast` 技术方案 §8**。

---

## 9. 无障碍（a11y）

**与 `Toast` 一致**。详见 **`Toast` 技术方案 §9**。

---

## 10. 样式与主题

**与 `Toast` 一致**（含 **无 `dark:` 预设** 等）。详见 **`Toast` 技术方案 §10**。

---

## 11. 组合与依赖

**与 `Toast` 一致**。详见 **`Toast` 技术方案 §11**。

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| 等价性 | **`Message`** 与 **`Toast`** 对同一 **`ToastProps`** 渲染结果 **一致**（快照或同一测试参数表）。 |
| 其余 | 复用 **`Toast`** 的验收维度（**`open`/定时/`status`** 等）；**`Toast.test.tsx`** 若存在可覆盖实现，**`Message` 可不单独重复整文件测试**（可选加一条 **`import { Message as M }`  smoke**）。 |

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 站点文档 | **Message 与 Toast 同页说明** 或 **Message 页顶部注明「同 Toast」**，避免读者以为两套 API。 |
| 类型提示 | 文档示例 **`import type { ToastProps }`** 或注明 **Message 使用 `ToastProps`**。 |

---

## 14. 风险与开放问题

| 风险 | 说明 |
| --- | --- |
| **命名双轨** | 团队混用 **Message/Toast** 时，**排查问题需记住源码只有一个 `Toast.tsx`**。 |
| **类型名无 Message** | 新同学 **`MessageProps`** 搜不到 — 文档与 **Onboarding** 需写清 **用 `ToastProps`**。 |
| 与 Toast 共享风险 | **`onClose` 不稳定导致定时器重置**、**多实例重叠**、**无 Portal** 等 — 见 **`Toast` 技术方案 §14**。 |

---

## 15. 结论

**`Message` 并非独立组件**，而是 **`Toast` 的导出别名**；**全部行为、API、无障碍与样式以 `Toast` 为准**。本技术方案用于 **包内命名与类型导出约定** 的说明；**实现级评审可优先阅读 `component-plans/Toast.md`**，避免重复维护两套矛盾描述。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | Message 结论 |
| --- | --- |
| 职责 | 同 Toast：非阻塞短时反馈 |
| DOM/语义 | 同 Toast |
| 状态与交互 | 同 Toast |
| 数据与受控 | 同 Toast |
| API | `ToastProps`；导出名 `Message` |
| 类型与 Ref | 同 Toast |
| 无障碍 | 同 Toast |
| 样式与主题 | 同 Toast |
| 文档与验证 | 强调别名 + 类型名 |

---

## 附录 B：参考实现片段（当前仓库）

```50:51:packages/ui/src/components/feedback/Toast/Toast.tsx
export const Message = Toast
```

入口文件：`packages/ui/src/components/feedback/Toast/Toast.tsx`、`index.ts`。

（以仓库实际代码为准。）
