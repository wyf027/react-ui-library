# Tooltip 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/feedback/overlays/Tooltip/Tooltip.tsx`

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Tooltip` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/feedback/overlays/Tooltip` |
| 分类 | Feedback（Overlays） |
| 依赖 | `cn` |
| 关联组件 | **`Popover`**（可交互浮层）、**`Button`**（常见触发子节点） |

---

## 2. 目标与非目标

### 2.1 目标

1. **悬停 / 聚焦显示**：包裹 **`children`** 的容器在 **`onMouseEnter` / `onFocus`** 时 **`setOpen(true)`**（**`!disabled`**），**`onMouseLeave` / `onBlur`** 时 **`setOpen(false)`**。  
2. **纯展示浮层**：**`content: ReactNode`** 渲染在 **`role="tooltip"`** 的 **`div`** 中，**无** 内置交互控件。  
3. **相对定位**：外层 **`relative inline-flex`**，浮层 **`absolute left-1/2 top-full mt-2 -translate-x-1/2`** — **始终出现在触发区域下方居中**。  
4. **`disabled`**：为 **`true`** 时 **不** 因 hover/focus 打开（**`onMouseEnter`/`onFocus`** 内判断）。  
5. **属性透传**：**`Omit<HTMLAttributes<HTMLDivElement>, 'content'>`** 落在包裹 **`div`** 上（**自定义 `content` 与 DOM `content` 属性冲突故 Omit**）。

### 2.2 非目标

1. **受控 `open` / `defaultOpen` / `onOpenChange`**：当前 **仅** **`useState(false)`** 内部状态。  
2. **`placement`（上下左右）、箭头、碰撞检测（flip/shift）**：当前 **无**；位置 **写死为下方居中**。  
3. **`Portal`、 `delay`/`showDelay`**：当前 **无**；**立即** 显隐。  
4. **`aria-describedby` / `id` 与触发器关联**：当前 **未** 建立 **IDREF** 关系（见 §9）。  
5. **触摸长按（mobile）**：当前 **无** `onPointerDown` 等；**移动端 hover 行为依赖浏览器**。  

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 图标按钮释义 | **`children`** 为 **`Icon`/`Button`**，**`content`** 为短文案。 |
| 表单字段旁提示 | 与 **`label`/`helperText`** 分工：**`Tooltip`** 适合 **补充说明**，**不应** 替代 **必填/错误** 主通道。 |
| 需点击浮层内链接 | 应使用 **`Popover`** 等；**`Tooltip`** 在 **mouse leave** 时会关闭，**不适合** 浮层内操作（当前也无 **pointer 穿透** 延迟策略）。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 外层 | **`<div ref={ref} className={cn('relative inline-flex', className)}` + 鼠标/焦点处理器 + `{...props}>`** |
| 子节点 | **`{children}`** — **触发区** 由 **`children`** 决定（**非** `asChild` 单节点合并）。 |
| 浮层 | **`open`** 时 **`<div role="tooltip" className="absolute ...">`** 包 **`{content}`**。 |
| 结构 | 浮层为 **外层 `div` 的下一兄弟**（在 **`children` 之后**），**非** Portal。 |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| 打开 | **`onMouseEnter`**：**`!disabled && setOpen(true)`**；**`onFocus`**：同上（依赖 **React 合成 focus 冒泡** 使子可聚焦元素聚焦时能触发外层 **`onFocus`**）。 |
| 关闭 | **`onMouseLeave` → `setOpen(false)`**；**`onBlur` → `setOpen(false)`** — **`disabled` 时** 仍会在 blur/leave 时关（若曾打开）。 |
| **`disabled`** | **阻止打开**；**不** 移除已挂载子树，仅逻辑上 **不** `setOpen(true)`。 |

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| 显隐 | **完全非受控**；**无** `open` prop。 |
| 与 **Button** 对比 | **无** `value`/`onChange`；状态为 **内部 `open` boolean**。 |

---

## 7. API 规范

### 7.1 `TooltipProps`（当前实现）

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `content` | 提示内容 | `ReactNode` | - | **必填**（类型上可选但无内容无意义） |
| `disabled` | 禁用提示 | `boolean` | - | |
| `children` | 触发区域 | `ReactNode` | - | |
| `className` | 外层容器样式 | `string` | - | **`relative inline-flex`** 与合并 |
| 继承 | `Omit<HTMLAttributes<HTMLDivElement>, 'content'>` | - | - | 展开在 **外层** **`div`**，且在 **内置事件处理器之后**（见 §14） |

### 7.2 浮层样式（当前实现摘要）

| 项 | 类名要点 |
| --- | --- |
| 浮层 | **`absolute left-1/2 top-full z-40 mt-2 -translate-x-1/2 rounded bg-slate-900 px-2 py-1 text-xs text-white`** |

### 7.3 建议演进（可选）

| 能力 | 优先级 |
| --- | --- |
| **`id` + `aria-describedby` 接到第一个可聚焦子或容器** | P1 |
| **`placement`、Portal、`delay`** | P2 |
| **受控 `open` + `onOpenChange`** | P2 |
| **Radix/Floating UI 级定位** | P2 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| Ref | **`forwardRef<HTMLDivElement, TooltipProps>`** → **外层包裹 `div`**（**非** `role="tooltip"` 节点）。 |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| 浮层 | **`role="tooltip"`** 符合 **tooltip** 角色预期。 |
| 关联 | **未** 设置 **`aria-describedby`**（触发器）与 **`id`**（tooltip）配对 — **部分读屏组合下提示关联弱**；演进建议参考 **WAI-ARIA Tooltip Pattern**。 |
| 交互 | **纯 hover/focus 展示**；**无** `tabIndex` 将焦点移入 tooltip（**正确**：tooltip 内 **不应** 可聚焦，除非改为 **`role="dialog"`** 模式）。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 层级 | **`z-40`**（低于常见 **`Modal`/`Toast` 的 `z-50`**，需注意 **被遮挡**）。 |
| 暗色 | 浮层 **深色底白字**；**无** **`dark:`** 分支（**固定 slate-900** 风格）。 |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| **`disabled` + 子 `Button`** | 子 **`disabled`** 与 **`Tooltip.disabled`** **独立**；仅 **`Tooltip.disabled`** 控制 **是否显示提示**。 |
| **`{...props}` 覆盖** | 传入 **`onMouseEnter`** 等 **会覆盖** 内置打开逻辑（见 §14）。 |
| **祖先 `overflow: hidden`** | 浮层 **非 Portal**，可能被 **裁剪**。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| 悬停 | **`user.hover` 触发子节点** → **`role="tooltip"`** 出现且文案为 **`content`**（见 **`Tooltip.test.tsx`**）。 |
| **`disabled`** | hover **不** 出现 tooltip（见测试）。 |
| 键盘 | 手测：**Tab** 到子 **`button`** 是否 **打开**（依赖 **focus 冒泡**）。 |

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | 包 **`Button`**、**`Icon`**；**`content` 简短**；**`disabled`** 用法。 |
| 说明 | **非受控**、**仅下方定位**、**无 aria-describedby**、**`props` 覆盖风险**、**裁剪与 z-index**。 |

---

## 14. 风险与开放问题

| 风险 | 说明 |
| --- | --- |
| **`{...props}` 置后** | 覆盖 **`onMouseEnter`/`onFocus`** 等 → **Tooltip 可能永不打开/永不关**。 |
| **无 `aria-describedby`** | 与 **APG** 推荐 **触发器–提示** 关联 **不一致**。 |
| **无延迟** | 鼠标 **划过** 多个带 Tooltip 的元素时 **频繁闪烁**。 |
| **`onBlur` 立即关闭** | 若未来 tooltip 内 **可聚焦**（不推荐），**焦点移入 tooltip** 可能 **先 blur 关闭** — 当前 **纯文本** 无此问题。 |

---

## 15. 结论

`Tooltip` 为 **包裹层 + 内部 `useState` 控制显隐 + 下方居中 `role="tooltip"`** 的轻量实现，**API 小、无 Portal、无受控模式、无 placement**。与 **Button** 无继承关系；适合 **短文案辅助**；**生产级 a11y 与定位** 需按 §7.3 演进。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | Tooltip 结论 |
| --- | --- |
| 职责 | 悬停/聚焦展示补充说明 |
| DOM/语义 | 外层 div + role=tooltip 内层 |
| 状态与交互 | 内部 open；mouse/focus |
| 数据与受控 | 无受控 open |
| API | content、disabled、Omit content |
| 类型与 Ref | HTMLDivElement 外层 |
| 无障碍 | role tooltip；缺 idref |
| 样式与主题 | 下中、z-40、深底 |
| 文档与验证 | props 覆盖、裁剪 |

---

## 附录 B：参考实现片段（当前仓库）

文件：`packages/ui/src/components/feedback/overlays/Tooltip/Tooltip.tsx`。

要点：**`useState(false)`**、**`onMouseEnter`/`onMouseLeave`/`onFocus`/`onBlur`**、**`role="tooltip"`**、**`top-full` + `-translate-x-1/2`**。

（以仓库实际代码为准。）
