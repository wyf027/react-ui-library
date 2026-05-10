# Popconfirm 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/feedback/Popconfirm/Popconfirm.tsx`

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Popconfirm` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/feedback/Popconfirm` |
| 分类 | Feedback |
| 依赖 | `cn` |
| 关联组件 | **`Modal`**（强阻断确认）、**`Popover`**（通用浮层）、**`Button`**（常见 **`children`**） |

---

## 2. 目标与非目标

### 2.1 目标

1. **二次确认气泡**：**`children`** 外包 **`div` `onClick` → `setOpen(!isOpen)`** 切换；打开时在 **触发器上方、水平居中** 显示 **`w-56`** 卡片（**`absolute bottom-full left-1/2 -translate-x-1/2 mb-2`**）。  
2. **文案与按钮**：**`title`**（**`ReactNode`**）、**`description?`**；**`okText`/`cancelText`**（默认 **`确定`/`取消`**）；**确定** **`onConfirm`**、**取消** **`onCancel`**，均在回调前 **`setOpen(false)`**。  
3. **显隐状态**：**`isOpen = controlledOpen ?? internalOpen`**，**`internalOpen`** 来自 **`useState(defaultOpen)`**；**`setOpen(val)`** 执行 **`setInternalOpen(val)` + `onOpenChange?.(val)`**。  
4. **点击外部关闭**：**`isOpen`** 时 **`document` `mousedown`**，目标 **不在 `wrapperRef` 内** 则 **`setOpen(false)`**（**不** 调 **`onCancel`**）。  
5. **固定警告图标**：面板内 **⚠️** **`text-amber-500`**。  
6. **根透传**：**`Omit<HTMLAttributes<HTMLDivElement>, 'title'>`** 落在 **`wrapperRef` 外层 `div`**（**避免与 `title` prop 冲突**）。

### 2.2 非目标

1. **受控 `open` 与内部 `setInternalOpen` 分离**：**`setOpen` 无论是否受控都会 `setInternalOpen`**（见 §6、§14）。  
2. **Escape、焦点陷阱、`role="alertdialog"`、初始焦点在取消钮**：当前 **无**。  
3. **`Portal`、多 `placement`、箭头**：当前 **固定上中**；**非** Portal。  
4. **`children` 与触发器 ref/原生 `disabled` 合并**：**`cloneElement` 未使用**；**外层再包 `div`**。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 删除/危险操作前 **轻确认** | **`children`** 为 **删除按钮**；**`onConfirm`** 执行请求。 |
| 与 **`Modal`** 选型 | **`Popconfirm`**：**就地、不打断全屏**；**强合规/长文案** 仍用 **`Modal`**。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 外层 | **`<div ref={wrapperRef} className={cn('relative inline-block', className)} {...props}>`** |
| 触发 | **`<div onClick={() => setOpen(!isOpen)}>{children}</div>`** — **额外包裹层** |
| 面板 | **`isOpen`** 时 **`<div ref={ref} className="absolute bottom-full ... z-50 w-56 ...">`** — **`forwardRef` 指向面板**（**关闭时卸载**，**`ref` 可能为 `null`**） |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| 切换 | 点击 **触发 `div`**：**`setOpen(!isOpen)`**。 |
| 确定 | **`setOpen(false)`** 后 **`onConfirm?.()`**。 |
| 取消 | **`setOpen(false)`** 后 **`onCancel?.()`**。 |
| 外部点击 | **`setOpen(false)`** **仅** 关闭，**不** **`onCancel`**。 |

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| 展示 | **`isOpen = controlledOpen ?? internalOpen`**。 |
| **`setOpen`** | **始终** **`setInternalOpen(val)`** + **`onOpenChange?.(val)`** — **受控时** 若父 **未** 把 **`open`** 改成 **`val`**，**UI 与 `internalOpen` 可能短暂不一致**；**`onOpenChange(true)`** 已发但 **`open` 仍为 false** 时 **面板不显示**。 |
| **非受控** | 不传 **`open`**，**`defaultOpen`** 初始化 **`internalOpen`**。 |

---

## 7. API 规范

### 7.1 `PopconfirmProps`（当前实现）

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `title` | 确认标题 | `ReactNode` | - | **与 HTML `title` 冲突已 Omit** |
| `description` | 补充说明 | `ReactNode` | - | |
| `open` | 受控显隐 | `boolean` | - | |
| `defaultOpen` | 非受控初值 | `boolean` | `false` | |
| `onConfirm` | 确定 | `() => void` | - | |
| `onCancel` | 取消 | `() => void` | - | **不** 在外部点击时调用 |
| `onOpenChange` | 开闭 | `(open: boolean) => void` | - | **`setOpen` 路径** |
| `okText` / `cancelText` | 按钮文案 | `string` | **`确定`/`取消`** | |
| `children` | 触发子节点 | `ReactElement` | - | **单元素** |
| `className` | 外层 `wrapper` | `string` | - | |
| 继承 | `Omit<HTMLAttributes<HTMLDivElement>, 'title'>` | - | - | |

### 7.2 视觉（面板摘要）

| 项 | 类名要点 |
| --- | --- |
| 面板 | **`z-50 w-56 rounded-lg border ... p-4 shadow-lg`**，**暗色 `dark:`** |
| 按钮 | 取消 **边框灰**；确定 **`bg-brand-500`** |

### 7.3 建议演进（可选）

| 能力 | 优先级 |
| --- | --- |
| **受控时跳过 `setInternalOpen` 或改用 `useControllableState`** | P1 |
| **`useEffect(..., [isOpen])` 注册 mousedown** | P1 |
| **`Escape`、`aria-modal`、`focus` 管理** | P2 |
| **`Portal`/`placement`** | P2 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| `forwardRef` | **`HTMLDivElement`** → **面板 `div`**（**非** **`wrapperRef` 外层**） |
| **`wrapperRef`** | 内部 **click-outside**，**不** 对外暴露 |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| 面板 | **无** **`role="alertdialog"`** / **`aria-labelledby`**。 |
| 触发 | **外层 `div` `onClick`** — **非** **`button`**；**键盘 Enter** 是否触发取决于 **`children`** 是否为 **可聚焦控件**（若 **`children` 为 `button`**，**焦点在子按钮** 上 **点击/空格** 正常，**但** **外层 div 无 `role`**）。 |
| 图标 | **emoji ⚠️**，读屏行为 **因环境而异**。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 层级 | **`z-50`**；**祖先 `overflow: hidden`** 可能 **裁剪面板**（**无 Portal**）。 |
| 品牌 | 确定钮 **`brand-500/600`**。 |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| **`children={<Button/>}`** | **结构**：**`wrapper > div.onClick > Button`** — **一般可用**；**勿** 在 **`Button` `onClick`** 与 **外层 `onClick`** 上 **重复触发** 未防抖逻辑。 |
| **`{...props}` 在 `wrapper`** | **`id`/`data-*`** 在外层；**`ref`（forwardRef）在面板** — **易混淆**。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| 开关 | 点击 **触发区** 打开/关闭；**外部 mousedown** 关闭。 |
| 按钮 | **确定** → **`onConfirm`**；**取消** → **`onCancel`**。 |
| **`onOpenChange`** | **`setOpen` 各路径** 触发次数与 **`val`** 一致。 |
| 受控 | 父 **`open`** 与面板一致；**忽略 `onOpenChange` 更新** 时的 **卡死**（§14）。 |

（仓库 **当前无** `Popconfirm.test.tsx`；以上为建议用例。）

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | **`children` 为单 `Button`**、**`description`**、受控 **`open`+`onOpenChange`**。 |
| 说明 | **外部关闭 ≠ cancel**、**`ref` 在面板**、**`useEffect` 依赖**、**受控与 `setInternalOpen`**。 |

---

## 14. 风险与开放问题

| 风险 | 说明 |
| --- | --- |
| **`useEffect` 无依赖数组** | **每次 render** 在 **`isOpen`** 时 **重绑 `mousedown`**（与 **`AutoComplete`/`TimePicker`** 同类问题）；应 **`[isOpen]`**（或等价）。 |
| **受控 + `setInternalOpen`** | **`open` 未跟 `onOpenChange` 更新** 时 **UI 不跟**、**内部状态漂移**。 |
| **`forwardRef` 在条件渲染节点** | **`open=false`** 时 **面板卸载**，**`ref.current`** 为 **`null`**。 |
| **外部关闭与取消语义** | 用户 **可能认为** 点外即 **取消**；当前 **无 `onCancel`**。 |

---

## 15. 结论

`Popconfirm` 为 **包裹触发子 + 上方确认卡片 + 确定/取消 + 点击外部关闭** 的轻量二次确认；**`onOpenChange`** 与 **内外 `open` 状态** 实现 **未完全按受控最佳实践拆分**；**`useEffect` 监听** 与 **a11y** 为演进重点。与 **Button** 无继承关系；操作钮均为 **`type="button"`**。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | Popconfirm 结论 |
| --- | --- |
| 职责 | 就地危险操作确认 |
| DOM/语义 | wrapper + 触发 div + 面板 |
| 状态与交互 | open、toggle、outside、mousedown |
| 数据与受控 | open/defaultOpen/onOpenChange |
| API | title、description、ok/cancel 文案 |
| 类型与 Ref | 面板 div；wrapper 内部 ref |
| 无障碍 | 弱；无 alertdialog |
| 样式与主题 | 上中、z-50、brand 确定 |
| 文档与验证 | 受控、Effect、ref、cancel 语义 |

---

## 附录 B：参考实现片段（当前仓库）

文件：`packages/ui/src/components/feedback/Popconfirm/Popconfirm.tsx`。

要点：**`wrapperRef`**、**`isOpen = controlledOpen ?? internalOpen`**、**`setOpen`**、**`bottom-full` 面板**、**`useEffect` mousedown**。

（以仓库实际代码为准。）
