# AutoComplete 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/form/controls/AutoComplete/AutoComplete.tsx`

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `AutoComplete` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/form/controls/AutoComplete` |
| 分类 | Form（Controls） |
| 依赖 | `cn`（**未**使用 `useControllableState`） |
| 关联组件 | **`Input`**（单行输入形态）、**`Select`**（强约束选项）、**`Form`/`FormItem`** |

---

## 2. 目标与非目标

### 2.1 目标

1. **可输入 + 可选建议**：**`<input>`** 自由输入；下方 **`<ul>`** 列出 **`options`** 子集，**`mousedown` 选一项** 写入 **`value`** 并触发 **`onSelect`**。  
2. **本地过滤**：默认 **`filterOption = true`**，按 **`(opt.label ?? opt.value).toLowerCase().includes(val.toLowerCase())`** 过滤；可 **`false`** 关闭或传入 **自定义函数** **`(input, option) => boolean`**。  
3. **受控 / 非受控（混合实现）**：传 **`value`** 时为受控展示 **`val = value ?? internal`**（**`??`** 故仅 **`null`/`undefined`** 回退内部值）；不传 **`value`** 时用 **`useState(defaultValue)`** 作为 **`internal`**。**`onChange?: (value: string) => void`** 在每次 **`update(v)`** 时调用。  
4. **下拉开关**：**`onFocus` / `onChange`** 时 **`setOpen(true)`**；**`document` `mousedown` 外部区域** 关闭（见 §14）。  
5. **`allowClear`**：有值时右侧 **`button type="button"`** 清空并关闭下拉。

### 2.2 非目标

1. **键盘在下拉里导航（↑↓、Enter、Esc）**：当前 **无**；列表项仅 **`onMouseDown`**。  
2. **`useControllableState` 与单一数据源**：当前为 **`useState` + 可选 `value` 并列**（见 §6、§14）。  
3. **异步 `options` / `loading` / 远程搜索**：当前 **无**；**`options` 仅为静态数组**。  
4. **`freeSolo` 关闭**（只能选不能输）：当前 **始终可自由输入**。  
5. **完整 combobox ARIA**：当前 **无** **`role="combobox"`** / **`aria-expanded`** / **`aria-controls`** 等标准组合框语义。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 带建议的搜索框、地址/关键词补全 | 用户输入缩小列表，点选写入 **`opt.value`**（展示 **`opt.label ?? opt.value`**）。 |
| 与 **`Select`** 区分 | **`Select`** 通常从固定集合选；**`AutoComplete`** 允许输入 **`options` 外** 的字符串。 |
| 表单 | **`name`/`id`** 等经 **`...props`** 落在 **`input`**；注意 **`onChange` 覆盖**（§11）。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 外层 | **`<div ref={wrapperRef} className={cn('relative inline-block w-full', className)}>`** — **`ref` 为内部 `wrapperRef`**，**非** `forwardRef` 目标。 |
| 输入区 | 内层 **`relative` `div`** 包 **`input`** + 可选 **`allowClear` `button`**。 |
| 列表 | **`open && filtered.length > 0`** 时 **`ul` > `li`**，**`absolute z-50`**，**`max-h-60 overflow-auto`**。 |
| 选项交互 | **`li` `onMouseDown`**（避免 **`blur` 先于 `click`** 导致选不中 — 合理）。 |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| 打开 | **`onFocus` → `setOpen(true)`**；**`onChange`（输入）→ `update` + `setOpen(true)`**。 |
| 关闭 | 选 **`li`** 后 **`setOpen(false)`**；**`allowClear`** 清空后 **`setOpen(false)`**；**外部 `mousedown`** 关闭。 |
| 选值 | **`update(opt.value)`** + **`onSelect?.(opt.value)`**。 |
| 输入 | **`update(e.target.value)`** 仅 **`onChange`**，**不**区分是否来自选词（与 Ant 式「选中后一次 `onChange`」可对比文档说明）。 |

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| 展示值 | **`val = controlledValue ?? internal`**（**`controlledValue`** 即 props **`value`**）。 |
| 内部更新 | **`update(v)`**：**`setInternal(v)`** + **`onChange?.(v)`** — **受控模式下仍会 `setInternal`**，依赖父组件刷新 **`value`** 对齐（常见 React 写法下无问题）。 |
| 非受控 | 不传 **`value`**，**`internal`** 初值为 **`defaultValue`**（默认 **`''`**）。 |
| **`value` 为 `''`** | **`'' ?? internal`** 为 **`''`**，空字符串受控有效。 |

---

## 7. API 规范

### 7.1 `AutoCompleteOption`

| 字段 | 说明 | 类型 | 必填 |
| --- | --- | --- | --- |
| `value` | 写入输入框的值 | `string` | 是 |
| `label` | 列表展示；过滤默认也参与 **`label ?? value`** | `string` | 否 |

### 7.2 `AutoCompleteProps`（当前实现）

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `options` | 候选项 | `AutoCompleteOption[]` | `[]` | |
| `value` | 受控值 | `string` | - | **`undefined`** 走非受控 |
| `defaultValue` | 非受控初值 | `string` | `''` | |
| `onChange` | 值变化 | `(value: string) => void` | - | 输入与选词都会触发 |
| `onSelect` | 从列表选中 | `(value: string) => void` | - | 仅 **`li` `mousedown`** 时 |
| `filterOption` | 过滤策略 | `boolean \| (input, option) => boolean` | `true` | **`false`** 显示全部（在 **`open` 且长度>0** 时） |
| `allowClear` | 是否显示清除 | `boolean` | `false` | |
| `placeholder` | 占位 | `string` | - | 单独解构，仍可从 **`...props`** 传入则后者可能被覆盖取决于顺序 — 当前 **`placeholder` 在 `input` 上显式传入** |
| `className` | 样式 | `string` | - | 作用在 **外层 `wrapper` `div`**，**非** `input` |
| 继承 | `Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' \| 'onSelect'>` | - | - | **`value`/`defaultValue` 在 props 顶层**；**`{...props}` 在 `input` 末尾** |

### 7.3 视觉（当前实现摘要）

| 区域 | 类名要点 |
| --- | --- |
| `input` | **`h-10 w-full rounded-md border ... focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20`** |
| 清除按钮 | **`absolute right-2 top-1/2 -translate-y-1/2`**，文案 **`✕`** |
| 列表 | **`absolute z-50 mt-1 max-h-60 w-full overflow-auto ... shadow-lg`** |
| 项 hover | **`hover:bg-brand-50 dark:hover:bg-brand-900/20`** |

### 7.4 建议演进（可选）

| 能力 | 优先级 |
| --- | --- |
| **`useControllableState`** 统一受控 | P2 |
| **键盘导航 + `role="listbox"`/`option`** | P2 |
| **`slotClassNames` / `inputClassName`** 与 **`className` 根** 拆分 | P2 |
| **`loading`、异步 `options`** | P2 |
| **`useEffect(..., [open])`** 修正监听依赖 | P1（见 §14） |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| `forwardRef` | **`HTMLInputElement`** → **`input`** |
| 外层容器 | **`wrapperRef`** 仅用于 **click-outside**，**不**对外暴露 |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| 输入 | 普通 **`text`**（继承 **`type`** 等自 **`props`**）。 |
| 列表 | **`ul`/`li`** 无 **`role`**、**`aria-activedescendant`**；键盘用户难以操作下拉。 |
| 清除钮 | **`button`** 无 **`aria-label`**（读屏为「按钮」+ 符号）；建议业务包 **`title`** 或演进 **`aria-label="Clear"`**。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 焦点环 | **`input`** 使用 **`focus:ring-brand-500/20`**（与部分表单控件一致）。 |
| 暗色 | **`input`** 与 **`ul`** 均有 **`dark:`** 变体。 |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| **`FormItem` + `AutoComplete`** | **`{...props}` 在显式 `onChange` 之后** 时，注入的 **`onChange` 会覆盖** 内部 **`onChange`**，**破坏受控**；与 **`Mentions`** 同类风险。集成需 **合并回调** 或 **包装组件**。 |
| **`onChange` vs `onSelect`** | 选列表项时 **先 `update`（含 `onChange`）再 `onSelect`**；若业务只需「选中」可只订 **`onSelect`**，但仍会收到 **`onChange`**。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| 过滤 | 默认 **`includes`** 大小写不敏感；**`filterOption={false}`** 显示全部；自定义函数行为。 |
| 选词 | **`mousedown` `li`** 后 **`value`** 为 **`opt.value`**，**`onSelect`** 调用，下拉关闭。 |
| 外部点击 | **`mousedown` 在 wrapper 外** → **`open` false**。 |
| **`allowClear`** | 有值时出现清除；点击后为空串并关闭。 |
| 受控 | 父 **`value`** 与输入框一致；**`onChange`** 同步父状态。 |
| **`key`** | **`key={opt.value}`**，**`value` 重复** 时 React 警告。 |

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | 受控/非受控、**`filterOption`**、**`allowClear`**、**`onSelect`** 与 **`onChange`** 差异。 |
| 说明 | **无键盘列表**、**`className` 在 wrapper**、**`useEffect` 依赖**（§14）、**FormItem**。 |

---

## 14. 风险与开放问题

| 风险 | 说明 |
| --- | --- |
| **`useEffect` 无依赖数组** | 当前写法为 **`useEffect(() => { ... })`**（**缺省第二参数**），**每次渲染** 执行：先执行上一轮 cleanup（若有），再注册 **`mousedown`**。功能上在 **`open`** 切换时大体可用，但 **性能与心智负担差**；应改为 **`[open]`**（或等价）并保证 **`open` 为 false** 时不挂监听。 |
| **`className` 在 wrapper** | 与 **`Input`**（常把 **`className` 给 input**）不一致；文档需标明，避免调宽度时期望打在 **`input`** 上无效（**`w-full` 在 wrapper 已设**）。 |
| **重复 `opt.value`** | **`key` 冲突**。 |
| **无障碍差距** | 生产环境强 a11y 要求时需演进 **combobox** 模式。 |

---

## 15. 结论

`AutoComplete` 提供 **输入 + 本地过滤下拉 + 点击选值 + 可选清除**，**`onSelect`** 区分列表选择，**`filterOption`** 灵活。与 **Button** 无继承关系；实现上 **未** 使用 **`useControllableState`**，**`useEffect` 监听写法** 与 **a11y/键盘** 为后续演进重点。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | AutoComplete 结论 |
| --- | --- |
| 职责 | 可输入 + 建议列表选值 |
| DOM/语义 | wrapper `div` + `input` + `ul`/`li` |
| 状态与交互 | open、过滤、mousedown 选、外部关闭 |
| 数据与受控 | `value`/`defaultValue`/`onChange(string)` + internal state |
| API | `options`、`filterOption`、`allowClear`、`onSelect` |
| 类型与 Ref | `HTMLInputElement` |
| 无障碍 | 弱；无 combobox 键盘 |
| 样式与主题 | wrapper `className`、brand focus |
| 文档与验证 | FormItem、`useEffect`、className 根 |

---

## 附录 B：参考实现片段（当前仓库）

文件：`packages/ui/src/components/form/controls/AutoComplete/AutoComplete.tsx`。

要点：**`val = controlledValue ?? internal`**、**`filtered`**、**`li` `onMouseDown`**、**`wrapperRef` + document `mousedown`**。

（以仓库实际代码为准。）
