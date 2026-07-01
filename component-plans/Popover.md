# Popover 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/feedback/overlays/Popover/Popover.tsx`

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Popover` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/feedback/overlays/Popover` |
| 分类 | Feedback（Overlays） |
| 依赖 | `cn` |
| 关联组件 | **`Tooltip`**（仅展示 vs 可点击面板）、**`Modal`/`Drawer`**（强阻断 vs 轻量浮层）、**`Button`**（常见 `trigger` 内容） |

---

## 2. 目标与非目标

### 2.1 目标

1. **触发器 + 面板**：**`trigger`** 包在 **`<button type="button">`** 内，**点击** **`handleToggle`** 切换 **`open`**；**`open`** 为 **`true`** 时在下方渲染 **`content`**。  
2. **受控 / 非受控**：**`open = controlledOpen ?? innerOpen`**；**`controlledOpen === undefined`** 时 **`setInnerOpen(next)`**；**`defaultOpen`**（默认 **`false`**）初始化 **`innerOpen`**。  
3. **开关回调**：**`next === true`** 时 **`onOpen?.()`**；**`next === false`** 时 **`onClose?.()`**（**每次切换** 各至多其一）。  
4. **相对定位面板**：**`absolute left-0 top-full z-40 mt-2 min-w-48`**，白底边框阴影，**`dark:`** 变体。  
5. **根容器透传**：**`Omit<HTMLAttributes<HTMLDivElement>, 'content'>`** 落在 **外层 `div`**（**`content` 为组件保留 prop**）。

### 2.2 非目标

1. **点击外部关闭、Escape 关闭、焦点陷阱**：当前 **无**；**仅** 再次点击 **同一触发 `button`** 关闭。  
2. **`Portal`、碰撞 flip、多 `placement`**：当前 **无**；位置 **左对齐下方**。  
3. **`asChild` / 无包裹触发**：**始终** 渲染 **外层 `button`**，**不可** 将触发器合并到单一现有 **`button`** 而无嵌套（见 §14）。  
4. **完整 combobox / `dialog` ARIA**：**`button`** **无** **`aria-expanded`**；面板 **无** **`role="dialog"`** / **`id`–`aria-controls`**。  

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 菜单、过滤面板、轻量表单 | **`content`** 内放 **可交互** 子树；用户 **在面板内操作** 时 **不会** 因失焦自动关（与 **仅 hover 的 Tooltip** 不同，但 **也无** click-outside）。 |
| 与 **`Modal`** 选型 | **Popover** 不遮罩全屏；适合 **上下文内** 展开。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 根 | **`<div ref={ref} className={cn('relative inline-flex', className)} {...props}>`** |
| 触发 | **`<button type="button" onClick={handleToggle} className="inline-flex">`** 包 **`{trigger}`** |
| 面板 | **`open`** 时 **`<div className="absolute left-0 top-full ...">`** 包 **`{content}`** — **无** **`role`** **无** **`tabIndex`** 策略 |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| 切换 | **`handleToggle`**：**`next = !open`**；非受控则 **`setInnerOpen(next)`**；再 **`next ? onOpen() : onClose()`**。 |
| 受控 | **`controlledOpen !== undefined`** 时 **不** `setInnerOpen`；**父组件必须** 在 **`onOpen`/`onClose`**（或统一 **`onClick` 外包**）中 **更新 `open`**，否则 **UI 与 `next` 回调脱节**（见 §14）。 |
| 关闭路径 | **仅** 再次点击触发器；**无** 其它关闭手段。 |

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| 非受控 | **`open` prop 不传**；**`innerOpen`** 由 **`defaultOpen`** 初始化，**`handleToggle`** 更新。 |
| 受控 | **`open` 由父传入**；展示 **`open = controlledOpen ?? innerOpen`** 在 **`controlledOpen` 非 `undefined`** 时等于 **`controlledOpen`**（**`false`** 与 **`true`** 均有效；**注意**：若父误传 **`open={undefined}`** 会回退 **`innerOpen`**）。 |
| 回调语义 | **`onOpen`** / **`onClose`** 对应 **切换后的目标状态 `next`**，**不是** 「已打开/已关闭」的同步确认（与部分 UI 库 **afterOpenChange** 命名习惯略有差异，文档写清即可）。 |

---

## 7. API 规范

### 7.1 `PopoverProps`（当前实现）

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `trigger` | 触发区展示 | `ReactNode` | - | **外层会再包一层 `button`** |
| `content` | 面板内容 | `ReactNode` | - | |
| `open` | 受控开关 | `boolean` | - | **`undefined`** 非受控 |
| `defaultOpen` | 非受控初值 | `boolean` | `false` | |
| `onOpen` | 将切到打开时 | `() => void` | - | **`next === true`** |
| `onClose` | 将切到关闭时 | `() => void` | - | **`next === false`** |
| `className` | 根容器 | `string` | - | |
| 继承 | `Omit<HTMLAttributes<HTMLDivElement>, 'content'>` | - | - | |

### 7.2 视觉（面板摘要）

| 项 | 类名要点 |
| --- | --- |
| 面板 | **`min-w-48 rounded-lg border ... p-3 text-sm shadow-lg dark:border-slate-700 dark:bg-slate-900`** |

### 7.3 建议演进（可选）

| 能力 | 优先级 |
| --- | --- |
| **click-outside + Escape + `useControllableState` 对齐** | P1 |
| **`aria-expanded`、面板 `role`/`id`、`aria-controls`** | P1 |
| **`Portal` + `placement`** | P2 |
| **`asChild`（避免 `button` 套 `button`）** | P1 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| Ref | **`forwardRef<HTMLDivElement, PopoverProps>`** → **外层包裹 `div`**（**非** 触发 **`button`**、**非** 面板）。 |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| 触发 | **原生 `button`**，**`type="button"`** — 键盘 **Enter/Space** 可切换（与 **Button** 一致）。 |
| 状态 | **无** **`aria-expanded`**、**无** **`aria-haspopup`**；读屏 **不易感知** 展开/收起。 |
| 面板 | **无** **`role="dialog"`**；**焦点不自动移入** 面板。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 层级 | **`z-40`**，与 **`Tooltip`** 同级；注意与 **`z-50`** 全局层叠关系。 |
| 暗色 | 面板 **`dark:bg-slate-900`** 等。 |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| **`trigger` 内再放 `Button`** | **HTML 嵌套**：**`<button><button/></button>`** **非法**；**`trigger` 应为非 `button` 节点**（如 **`span`+文案/图标**）或 **用样式模拟按钮**（**勿** 嵌套可点击 **`button`**）。 |
| **`{...props}` 含 `className`** | 会 **覆盖** 根上 **`cn('relative inline-flex', className)`** 的 **`className`**，可能 **丢失 `relative inline-flex`**（见 §14）。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| 切换 | 点击触发器 → **`content`** 出现；再点 → 消失（**`Popover.test.tsx`**）。 |
| 回调 | 非受控下 **第一次点击 `onOpen`**、**第二次 `onClose`**（见测试）。 |
| 受控 | 手测：父 **`open`** 与面板显隐一致；**忽略回调不更新 `open`** 时的 **卡死/重复 onClose**（§14）。 |

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | **`trigger` 用 `span`**、**`content` 内表单/链接**、受控 **`open`** 写法。 |
| 说明 | **关闭方式仅限再点**、**受控必须同步 `open`**、**禁止 `button` 套 `button`**、**a11y 缺口**。 |

---

## 14. 风险与开放问题

| 风险 | 说明 |
| --- | --- |
| **受控不同步** | **`onClose`/`onOpen` 已调** 但父 **未** 把 **`open`** 改成 **`next`** 时，**面板状态与 `next` 逻辑不一致**；重复点击可能 **多次 `onClose`**。 |
| **`trigger` 为 `Button` 组件** | 常渲染 **`button`** → **嵌套 `button`** → **无效 HTML + 不可预期点击**。 |
| **根 `className` 被 `props` 覆盖** | **`{...props}` 在显式 `className` 之后**（同文件顺序）— 若 **`props.className`** 存在会 **覆盖** 合并结果（React **后者覆盖前者**），**易丢失布局类名**。 |
| **无 click-outside** | 面板打开后 **点击页面其它区域不关闭**，**仅** 再点触发器；与多数设计系统 **Popover** 预期 **可能不符**。 |

---

## 15. 结论

`Popover` 为 **`button` 切换 + 下方左对齐浮层** 的轻量实现，支持 **受控/非受控 `open`** 与 **`onOpen`/`onClose`**。与 **Button** 无继承关系，但 **触发器使用 `type="button"`** 与 **Button** 防表单提交习惯一致。**关闭手段与 ARIA、防嵌套按钮、受控同步** 为后续演进重点。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | Popover 结论 |
| --- | --- |
| 职责 | 点击切换的上下文浮层 |
| DOM/语义 | div + button(trigger) + 面板 div |
| 状态与交互 | toggle；无 outside/Esc |
| 数据与受控 | open/defaultOpen；innerOpen |
| API | trigger、content、onOpen、onClose |
| 类型与 Ref | HTMLDivElement 根 |
| 无障碍 | button 可点；缺 expanded |
| 样式与主题 | z-40、下左、dark 面板 |
| 文档与验证 | 受控同步、嵌套 button |

---

## 附录 B：参考实现片段（当前仓库）

文件：`packages/ui/src/components/feedback/overlays/Popover/Popover.tsx`。

要点：**`open = controlledOpen ?? innerOpen`**、**`handleToggle`**、**`button` 包 `trigger`**、**面板 `absolute left-0 top-full`**。

（以仓库实际代码为准。）
