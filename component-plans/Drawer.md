# Drawer 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/feedback/overlays/Drawer/Drawer.tsx`，头部复用 **`DialogHeader`**。

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Drawer` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/feedback/overlays/Drawer` |
| 分类 | Feedback（Overlays） |
| 依赖 | **`Portal`**（`document.body`）、**`DialogHeader`**、`cn` |
| 关联组件 | **`Modal`**（居中阻断 vs 侧栏）、**`Button`**（抽屉内操作区） |

---

## 2. 目标与非目标

### 2.1 目标

1. **受控显隐**：**`open`**（默认 **`false`**）为 **`false`** 时 **`return null`**，不挂载 DOM。  
2. **侧栏面板**：**`placement?: 'left' | 'right'`**（默认 **`'right'`**），**`<aside>`** 固定 **`w-80`**、**`h-full`**、**`absolute top-0`**，**`left-0` / `right-0`**。  
3. **遮罩关闭**：全屏遮罩 **`div`** **`onClick={onClose}`**；面板 **`onClick={(e) => e.stopPropagation()}`** 避免点击内容区冒泡到遮罩导致关闭。  
4. **对话框语义**：**`<aside role="dialog" aria-modal="true">`**（**无** 根节点 **`aria-label={title}`**，与 **`Modal` 内层** 略有差异）。  
5. **标题与关闭**：**`DialogHeader`**（**`closeAriaLabel="Close drawer"`**）+ **`children`**。  
6. **属性透传**：**`HTMLAttributes<HTMLDivElement>`** 以 **`{...props}`** 落在 **`aside`** 上（**类型与真实标签不完全一致**，见 §8）。

### 2.2 非目标

1. **`top` / `bottom` 抽屉**：当前 **仅** **`left` / `right`**。  
2. **`useEscapeKey`、焦点陷阱、`scroll-lock`**：当前 **均未实现**（与 **`Modal`** 对比：**`Modal`** 有 Escape + click-outside hook，**`Drawer`** **无 Escape**）。  
3. **`width`/`size` 可配**：当前 **固定 `w-80`**。  
4. **`afterOpen`/`destroyOnClose` 动画**：当前 **无** 进入/离开过渡 API。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 导航、筛选、详情副栏 | **`placement`** 控制从左侧或右侧滑出（**无** CSS 位移动画，仅 **显隐 + 布局**）。 |
| 与 **`Modal`** 选型 | **`Drawer`** 保留侧栏空间感；**`Modal`** 适合强焦点阻断居中任务。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 入口 | **`open`** 为 **`true`**：**`<Portal>`** → 遮罩 **`div`** + **`aside`**。 |
| 遮罩 | **`fixed inset-0 z-50 bg-black/40`**，**整层可点关**（**`onClick={onClose}`**）。 |
| 面板 | **`<aside ref={ref} role="dialog" aria-modal="true" className={cn(...)} onClick={stopPropagation} {...props}>`**。 |
| 头部与内容 | **`DialogHeader`** 后 **`{children}`**（**无** 额外包裹 **`div`**，与 **`ModalDialog`** 不同）。 |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| 显隐 | **完全由父组件 `open`**；内部 **无** `useState`。 |
| 遮罩点击 | **`onClose`**；**`onClose` 未传** 时点击遮罩 **无关闭逻辑**（**`undefined` 回调**）。 |
| 面板内点击 | **`stopPropagation`**，不触发遮罩 **`onClose`**。 |
| Escape | **未监听**；需业务 **`useEffect`** 或演进组件内 hook。 |
| 关闭按钮 | **`DialogHeader`** **`onClick={onClose}`**。 |

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| 受控模式 | **`open`** 由父持有；**`onClose`** 中 **`setOpen(false)`** 否则 UI 不关。 |
| 与表单 | **无** `value`；**`children`** 内可放 **`Form`**。 |

---

## 7. API 规范

### 7.1 `DrawerProps`（当前实现，内联于 `Drawer.tsx`）

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `open` | 是否打开 | `boolean` | `false` | **`false`** → **`null`** |
| `onClose` | 关闭回调 | `() => void` | - | 遮罩点击、关闭钮 |
| `placement` | 侧栏边 | `'left' \| 'right'` | `'right'` | |
| `title` | 标题（传给 **`DialogHeader`**） | `string` | - | **`DialogHeader`** 仍渲染 **`h3`**；缺省时空标题 |
| `children` | 主体 | `ReactNode` | - | |
| `className` | 面板样式 | `string` | - | **`cn`** 与侧栏基础类合并于 **`aside`** |
| 继承 | `HTMLAttributes<HTMLDivElement>` | - | - | 展开在 **`aside`** 上（见 §8） |

### 7.2 视觉（当前实现摘要）

| 区域 | 类名要点 |
| --- | --- |
| 遮罩 | **`bg-black/40`**（**`Modal` 常用 `black/50`**，略浅） |
| 面板 | **`w-80`**、**`p-5`**、**`shadow-2xl`**、**`dark:bg-slate-900`** |

### 7.3 建议演进（可选）

| 能力 | 优先级 |
| --- | --- |
| **`useEscapeKey` 与 `Modal` 对齐** | P1 |
| **`aria-label` 或 `aria-labelledby` 指向标题** | P1 |
| **`top`/`bottom`、可配置宽度、过渡动画** | P2 |
| **焦点陷阱、`scroll-lock`** | P2 |
| **`HTMLAttributes<HTMLAsideElement>` + `forwardRef<HTMLAsideElement>`** | P3 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| 声明 | **`forwardRef<HTMLDivElement, DrawerProps>`** |
| 实际 | **`ref` 绑定在 `<aside>`** — 运行时正确；**TypeScript 更贴切为 `HTMLAsideElement`**。 |
| **`{...props}` 顺序** | 写在 **`onClick={stopPropagation}` 之后** → **传入的 `onClick` 会覆盖** 面板内 **`stopPropagation`** 行为，**可能导致点击内容区关闭抽屉**（见 §14）。 |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| 角色 | **`role="dialog"`**、**`aria-modal="true"`**。 |
| 名称 | **未** 在 **`aside`** 上设置 **`aria-label={title}`**；读屏可能依赖 **`DialogHeader`** 内 **`h3`**，**建议** 补 **`aria-labelledby`** 或 **`aria-label`** 与 **`Modal`** 对齐。 |
| 关闭 | **`aria-label="Close drawer"`**（**`DialogHeader`**）。 |
| 键盘 | **无 Escape**；**无 focus trap**（§14）。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 层级 | **`z-50`**，与 **`Modal`** 同级，**同时打开** 时依赖 **DOM 顺序 / 后挂载者在上**（未做栈管理）。 |
| 暗色 | 面板 **`dark:bg-slate-900`**；标题随 **`DialogHeader`**。 |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| **`Portal`** | 与 **`Modal`** 相同 **`mounted` 延迟**（见 **`portal.ts`**）；测试使用 **`waitFor`**（**`Drawer.test.tsx`**）。 |
| **`Modal` + `Drawer`** | 若同屏，注意 **遮罩叠色** 与 **z-index**；无内置协调。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| 关闭 | **`open={false}`** 无 **`dialog`**。 |
| 打开 | **`role="dialog"`**、**`aria-modal`**、**`heading`** 与 **`title`**、**`children`**。 |
| 关闭钮 | **`onClose` 调用**（见 **`Drawer.test.tsx`**）。 |
| **`placement`** | 手测 **`left-0` / `right-0`** 类名与布局。 |
| 遮罩 | 手测 **`onClose`**；**无 `onClose`** 行为。 |

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | 受控 **`open`**、**`placement`**、**`onClose`** 必配说明。 |
| 说明 | **无 Escape**、**`props.onClick` 覆盖风险**、**与 `Modal` a11y 差异**、**Portal 首帧**。 |

---

## 14. 风险与开放问题

| 风险 | 说明 |
| --- | --- |
| **`{...props}` 覆盖 `onClick`** | 失去 **`stopPropagation`**，点击面板可能 **冒泡到遮罩** → **误关**。 |
| **无 Escape** | 键盘用户 **无法** 用 **Esc** 关闭（除非业务包装）。 |
| **对话框可访问名称** | **`aside`** **无 `aria-label`**，部分读屏对 **`dialog` 命名** 弱于 **`Modal`** 当前实现。 |
| **`onClose` 可选** | 遮罩可点但 **无回调** 时 **无法通过点击遮罩关闭**（仅关闭钮若仍传 **`onClose`** 则钮可用 — 若 **`onClose` 全无** 则钮也无关闭效果）。 |

---

## 15. 结论

`Drawer` 为 **Portal + 全屏遮罩（点击关）+ 侧栏 `aside`（阻止冒泡）+ `DialogHeader` + `children`** 的受控侧栏；**`ref` 已转发至面板**（优于当前 **`Modal` ref 未接** 状态），但 **Escape、焦点管理、强 a11y 命名** 弱于生产级抽屉。**`placement`** 仅左右，**宽度固定 `w-80`**。与 **Button** 无继承关系；关闭控件仍为 **`DialogHeader`** 内 **`type="button"`**。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | Drawer 结论 |
| --- | --- |
| 职责 | 侧栏浮层，受控 open |
| DOM/语义 | Portal、遮罩 div、aside dialog |
| 状态与交互 | 遮罩 onClose、stopPropagation、无 Esc |
| 数据与受控 | open + onClose |
| API | placement、title、HTML 透传 aside |
| 类型与 Ref | 声明 Div，实际 aside；ref 已接 |
| 无障碍 | dialog；缺 aria-label 根、无 trap |
| 样式与主题 | w-80、z-50、black/40 |
| 文档与验证 | props.onClick、Portal、与 Modal 对比 |

---

## 附录 B：参考实现片段（当前仓库）

文件：`packages/ui/src/components/feedback/overlays/Drawer/Drawer.tsx`。

要点：**遮罩 `onClick={onClose}`**、**`aside` `stopPropagation`**、**`placement` 类名**、**`DialogHeader`**。

（以仓库实际代码为准。）
