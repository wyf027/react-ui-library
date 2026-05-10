# Modal 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/feedback/overlays/Modal/Modal.tsx`、`parts/ModalDialog.tsx`、`Modal.types.ts`，头部复用 **`DialogHeader`**。

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Modal` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/feedback/overlays/Modal` |
| 分类 | Feedback（Overlays） |
| 依赖 | **`Portal`**（`document.body`）、**`useEscapeKey`**、**`useClickOutside`**、**`ModalDialog`**、**`DialogHeader`**、`cn` |
| 关联组件 | **`Drawer`**、**`Popconfirm`**、**`Toast`**（叠层与焦点策略可对比） |

---

## 2. 目标与非目标

### 2.1 目标

1. **受控显隐**：**`open`**（默认 **`false`**）为 **`false`** 时 **`return null`**，不挂载遮罩与对话框 DOM。  
2. **居中模态层**：**`Portal`** 渲染到 **`document.body`**；**全屏半透明遮罩** + **居中白底面板**（**`max-w-lg`** 等）。  
3. **关闭通道**：**`onClose?.()`** 在 **Escape**、**点击面板外（遮罩）**（**`useClickOutside(panelRef)`**）、**头部关闭按钮** 时触发。  
4. **对话框语义**：内层面板 **`role="dialog"`**、**`aria-modal="true"`**、**`aria-label={title}`**（与 **`title`** 字符串一致）。  
5. **标题区**：**`DialogHeader`** 提供 **`h3` 标题** + **`aria-label="Close modal"`** 的关闭 **`button`**。  
6. **面板属性透传**：**`ModalProps`** 除 **`open`/`onClose`/`title`/`children`/`className`** 外，其余 **`HTMLAttributes<HTMLDivElement>`** 以 **`dialogProps`** 形式落在 **`role="dialog"` 的 `div`** 上。

### 2.2 非目标

1. **`footer`、`okText`/`cancelText`、内置确认逻辑**：当前 **无**；内容由 **`children`** 完全自定义。  
2. **焦点陷阱（focus trap）、打开时焦点移入、关闭时焦点恢复**：当前 **未实现**（见 §9、§14）。  
3. **`scroll-lock`（`body` 滚动锁定）**：当前 **无**。  
4. **`forwardRef` 落到 DOM**：**`Modal` 使用 `forwardRef` 但 `ref` 形参未使用**（见 §8）。  
5. **多模态栈、`z-index` 分层管理**：当前 **固定 `z-50`**，**无** 内置层级队列。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 确认 destructive 操作前的说明 | **`children`** 放文案与 **`Button`** 行；**`onClose`** 在确认提交后由父组件 **`open={false}`**。 |
| 表单/详情在浮层中编辑 | **`dialogProps`** 传 **`id`/`aria-describedby`** 等辅助描述。 |
| 与路由/URL 同步 | **`open`** 由路由或 query 驱动；**`onClose`** 导航返回。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 入口 | **`open`** 为 **`true`**：**`<Portal>`** → **`ModalDialog`**。 |
| 遮罩层 | **外层 `div`**：**`fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4`**，**`aria-hidden={false}`**。 |
| 面板 | **内层 `div`**：**`ref={panelRef}`**、**`role="dialog"`**、**`aria-modal="true"`**、**`aria-label={title}`**，**`{...dialogProps}`** 在 **`className` 合并之后** 展开。 |
| 头部 | **`DialogHeader`**：**`flex`** 标题 **`h3.text-lg`** + 关闭 **`button type="button"`**。 |
| 内容 | **`<div>{children}</div>`** 包裹 **`children`**。 |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| 显隐 | **完全由父组件 `open`**；组件内部 **无** `useState` 维护开关。 |
| Escape | **`useEscapeKey(() => onClose?.(), open)`** — 仅 **`open === true`** 时监听（**`enabled`** 第二参）。 |
| 点击外部 | **`useClickOutside(panelRef, () => onClose?.(), open)`** — **`mousedown`** 在 **`document`**，目标 **不在** **`panelRef`** 内则 **`onClose`**（**点在遮罩上** 会关闭）。 |
| 关闭按钮 | **`DialogHeader`** 内 **`onClick={onClose}`**。 |

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| 受控模式 | **`open` 为唯一真相**；关闭路径均依赖父组件在 **`onClose`** 里 **`setOpen(false)`**（或等价），否则 **仅回调、UI 仍开**。 |
| 非「值」型 | **无** `value`/`onChange`；与 **Button** 的点击语义不同，与 **表单控件** 受控模型不同。 |

---

## 7. API 规范

### 7.1 `ModalProps`（`Modal.types.ts`）

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `open` | 是否打开 | `boolean` | `false` | **`false`** 时整组件 **`null`** |
| `onClose` | 请求关闭 | `() => void` | - | Escape / 遮罩点击 / 关闭钮 |
| `title` | 标题文案 | `string` | - | 用于 **`aria-label`** 与 **`h3`**；**未传** 时 **空标题 + `aria-label` 可能为空**（见 §14） |
| `children` | 主体内容 | `ReactNode` | - | |
| `className` | 面板样式 | `string` | - | **`ModalDialog`** 中与 **`cn(..., className)`** 合并于 **`dialog`** **`div`** |
| 继承 | `HTMLAttributes<HTMLDivElement>` | - | - | 作为 **`dialogProps`** 传给 **`dialog` `div`**（勿与根 **`Modal` 碎片**混淆 — **`Modal` 根不渲染 DOM**） |

### 7.2 视觉（`ModalDialog` 摘要）

| 区域 | 类名要点 |
| --- | --- |
| 遮罩 | **`bg-black/50 p-4`**、**`flex` 居中** |
| 面板 | **`w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl dark:bg-slate-900`** |

### 7.3 建议演进（可选）

| 能力 | 优先级 |
| --- | --- |
| **焦点陷阱 + 初始焦点 + 关闭恢复** | P1 |
| **`ref` 转发到 `dialog` 节点** | P2 |
| **`footer` slot / `afterClose`** | P2 |
| **`scroll-lock`、嵌套 Modal z-index** | P2 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| 类型声明 | **`forwardRef<HTMLDivElement, ModalProps>`** |
| 实际 | **`ref` 参数命名为 `_ref` 且未使用** — **调用方 `ref` 不会附着到任何元素**；可聚焦面板需 **`dialogProps` 传 `id` + 业务 `ref` 合并**（当前 **`dialogProps` 无 ref 合并 API**）。 |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| 对话框 | **`role="dialog"`**、**`aria-modal="true"`**、**`aria-label={title}`** — **`title` 建议必填** 以保证可访问名称。 |
| 关闭 | **`closeAriaLabel="Close modal"`**（**`ModalDialog` 写死传入 `DialogHeader`**）。 |
| 标题 | **`h3`** 展示 **`title`**；与 **`aria-label`** 可能 **重复朗读**（可接受或演进 **`aria-labelledby`**）。 |
| 焦点 | **打开时未** 将焦点移入面板；**Tab** 可穿出到 **背后页面** — **无 focus trap**（§14）。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 层级 | **`z-50`**（与项目其它浮层需约定 **不冲突**）。 |
| 暗色 | 面板 **`dark:bg-slate-900`**；标题文字 **`dark:text-slate-100`**。 |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| **`Portal`** | **`mounted`** 前 **`Portal` 返回 `null`**（见 **`portal.ts`**），首帧可能 **无对话框**；测试需 **`waitFor`**（**`Modal.test.tsx`** 已采用）。 |
| **子组件内下拉** | 若下拉挂载在 **`body`** 且在 **`panelRef` 外**，**`mousedown` 可能被判定为 outside** 导致误关 — 需 **将下拉渲染到面板内** 或演进 **关闭判定**（§14）。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| 关闭 | **`open={false}`** 无 **`dialog`**。 |
| 打开 | **`role="dialog"`**、**`aria-modal`**、**`aria-label`**、**`children`**、**`heading`** 与 **`title`** 一致。 |
| 交互 | 关闭按钮 **`onClose` 调用一次**（见 **`Modal.test.tsx`**）。 |
| Escape / 遮罩 | 手测或补测：**`onClose`** 触发且父级 **`open`** 关闭。 |

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | 受控 **`open`**、**`onClose`** 必配、**`title`** 与 **`children`** 内按钮区。 |
| 说明 | **`ref` 未转发**、**无焦点陷阱**、**Portal 首帧**、**下拉在 body 的误关风险**。 |

---

## 14. 风险与开放问题

| 风险 | 说明 |
| --- | --- |
| **无焦点陷阱** | 键盘用户 **Tab 逃出** 模态背后，**不符合** 常见 **WAI-ARIA Authoring Practices** 对话框模式。 |
| **`title` 可选与 `aria-label`** | **`title` 缺省** 时 **可访问名称弱**；**`h3` 仍渲染** 可能为空标题。 |
| **`useClickOutside` 与 portaled 子节点** | 点击 **附在 `body` 但逻辑属于面板** 的浮层（Select 等）可能触发 **`onClose`**。 |
| **`forwardRef` 未接线** | 与类型声明 **不一致**，易误导集成方。 |
| **`useEscapeKey`/`useClickOutside` 依赖 `handler`** | **`onClose`** 若 **父组件每次 render 新建**，effect **重复订阅**（与 hook 实现有关）；建议 **`onClose` `useCallback`**。 |

---

## 15. 结论

`Modal` 为 **受控 `open` + Portal + 遮罩 + 居中 `dialog` + Escape/遮罩/关闭钮触发 `onClose`** 的基础模态；**`children`** 承载业务。**`forwardRef` 未使用**、**无滚动锁与焦点陷阱** 为与生产级设计系统的主要差距。与 **Button** 无继承关系；**关闭条** 使用 **`button`**，与 **Button** 的 **`type="button"`** 习惯一致。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | Modal 结论 |
| --- | --- |
| 职责 | 阻断式浮层，受控显隐 |
| DOM/语义 | Portal、遮罩、dialog、DialogHeader |
| 状态与交互 | 父控 open；Escape、outside、关闭钮 |
| 数据与受控 | `open` + `onClose`，无 value |
| API | title、children、HTML 透传至 dialog |
| 类型与 Ref | 声明 HTMLDivElement，ref 未接 |
| 无障碍 | dialog/aria-modal；缺 trap |
| 样式与主题 | z-50、max-w-lg、暗色面板 |
| 文档与验证 | Portal 首帧、误关、ref |

---

## 附录 B：参考实现片段（当前仓库）

- **`Modal.tsx`**：**`open` 早退 `null`**；**`useEscapeKey` / `useClickOutside`**；**`Portal` + `ModalDialog`**。  
- **`ModalDialog.tsx`**：**`role="dialog"`**、**`panelRef`**、**`DialogHeader`**。  
- **`Modal.types.ts`**：**`ModalProps`** 定义。

（以仓库实际代码为准。）
