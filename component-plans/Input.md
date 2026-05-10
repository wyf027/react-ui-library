# Input 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/form/controls/Input/Input.tsx`

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Input` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/form/controls/Input` |
| 分类 | Form |
| 依赖 | `cn`、`useControllableState`、`useId` |
| 关联组件 | **`Form`/`FormItem`**、`**Button**`（高度对齐）、`**Field**` 类场景 |

---

## 2. 目标与非目标

### 2.1 目标

1. **单行文本输入**：原生 **`input`**，透传除冲突项外的 **`InputHTMLAttributes`**。  
2. **受控 / 非受控**：支持 **`value`** + **`onChange`** 与 **`defaultValue`**；并支持 **`onValueChange(value: string)`** 简化字符串回调。  
3. **标签与辅助信息**：可选 **`label`**（`htmlFor` 关联 **`id`**）、**`helperText`**、**`error`**（错误态样式 + **`role="alert"`**）。  
4. **前后缀插槽**：**`prefix`** / **`suffix`**（装饰性 `span`），用于图标或单位。  
5. **尺寸与 Button 对齐**：**`sm` / `md` / `lg`** 对应 **`h-8` / `h-10` / `h-11`** 外层框。  
6. **样式扩展**：**`slotClassNames`**（`root` / `label` / `input` / `prefix` / `suffix`）与 **`className`**（落在原生 `input` 上）。

### 2.2 非目标

1. **多行输入**：使用 **`textarea`** 或独立 `TextArea` 组件。  
2. **内置异步校验**：校验逻辑在 **`Form`** 或业务层；`Input` 只展示 **`error`**。  
3. **`type="number"` 的精度与本地化**：由浏览器与业务格式化承担。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 登录/注册用户名 | `label` + `placeholder` + 受控 `value`。 |
| 搜索框 | `prefix` 搜索图标、`suffix` 清除按钮（suffix 内自管按钮语义）。 |
| 表单项 | 与 **`FormItem`** 组合时避免 **重复 `label`**（择一或 slot 分工）。 |
| 密码 | `type="password"` 透传。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 根结构 | 外层 **`div`**（`flex flex-col gap-1.5`）包：**可选 `label`** → **带边框的 `div`（flex 行）** → **原生 `input`** + 可选 **`p`**（`error` 或 `helperText`）。 |
| 标签 | 有 **`label`** 时渲染 **`<label htmlFor={inputId}>`**；**`inputId = id ?? useId()`**。 |
| 输入框 | **`<input>`**，`id={inputId}`，**`ref` 转发到 `input`**。 |
| 错误 | **`error` 存在时**渲染 **`<p role="alert">`**；**`helperText`** 为普通 **`<p>`**（无 alert）。 |
| 前后缀 | **`span`** 包裹，无默认 `aria-hidden`（若纯图标建议调用方加 **`aria-hidden`**）。 |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| `disabled` | 传给 **`input`**；外层容器加 **`opacity-60`**。 |
| 焦点环 | 外层 **`focus-within:border-brand-500`** + **`focus-within:ring-2`**；`input` 使用 **`nova-focus-ring`** + **`focus:outline-none`**。 |
| 错误态 | 外层 **`border-red-500`** + **`focus-within`** 红色环。 |

---

## 6. 数据与受控

### 6.1 状态来源（当前实现）

内部使用 **`useControllableState`**：

- 传入 hook 的 **`value`**：`typeof value === 'string' ? value : undefined`（非 string 的 **`value`** 会被视为未传，走非受控路径，属边界情况，见 §14）。  
- **`defaultValue`**：`(defaultValue as string) ?? ''`。  
- hook 的 **`onChange`**：绑定 **`onValueChange`**。

**`mergedValue`**：`typeof value === 'string' ? value : innerValue`，作为 **`input` 的 `value`**。

### 6.2 `handleChange`（当前实现）

1. 若 **`value === undefined`**（非受控）：**`setInnerValue(event.target.value)`**。  
2. 否则（受控）：**`onValueChange?.(event.target.value)`**（不直接改内部 state，由父级 `value` 驱动）。  
3. 始终调用 **`onChange?.(event)`**。

因此：**受控时必须传 string `value`**；**`onChange` 与 `onValueChange` 可同时存在**。

---

## 7. API 规范

### 7.1 当前实现对照

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `label` | 标签文案 | `ReactNode` | - | 渲染 `label` + `htmlFor` |
| `helperText` | 辅助说明 | `ReactNode` | - | 无 `error` 时展示 |
| `error` | 错误信息 | `ReactNode` | - | 展示时带错误边框 + `role="alert"`，`helperText` 不展示 |
| `size` | 尺寸 | `ComponentSize` | `'md'` | 与 Button 高度档一致 |
| `prefix` | 前缀 | `ReactNode` | - | |
| `suffix` | 后缀 | `ReactNode` | - | |
| `onValueChange` | 字符串变更 | `(value: string) => void` | - | 与受控/非受控逻辑配合 |
| `slotClassNames` | 各部位 class | `SlotClassNames` | - | `root`/`label`/`input`/`prefix`/`suffix` |
| `value` / `defaultValue` / `onChange` / `disabled` / `id` / `className` | 见原生 | - | - | `className` 作用于 **原生 `input`** |
| 继承 | `Omit<InputHTMLAttributes<HTMLInputElement>, 'size' \| 'prefix'>` | - | - | 原生 **`size`** 与 **`prefix`** 被业务 props 占用 |

### 7.2 `size` 与外层高度（当前实现）

| `size` | 外层 flex 容器 |
| --- | --- |
| `sm` | `h-8 px-2` |
| `md` | `h-10 px-3` |
| `lg` | `h-11 px-3.5` |

### 7.3 建议演进（可选）

| 属性 | 说明 | 优先级 |
| --- | --- | --- |
| `aria-describedby` | 自动关联 `helperText`/`error` 节点 id | P1 |
| `required` 视觉 | 标签旁 `*` | P2 |
| `allowClear` | 内置清除按钮 | P2 |
| `showCount` | `maxLength` 计数 | P2 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| 接口 | **`InputProps`** 继承 **`Omit<InputHTMLAttributes<HTMLInputElement>, 'size' \| 'prefix'>`**，扩展表单展示 props。 |
| Ref | **`forwardRef<HTMLInputElement, InputProps>`**，指向 **原生 `input`**（非外层 div）。 |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| 标签 | 有 **`label`** 时 **`htmlFor`** 与 **`input` `id`** 一致。 |
| 错误 | **`role="alert"`** 利于读屏播报；建议演进 **`aria-invalid`**（与 `error` 同步）。 |
| 描述 | **`helperText`** 建议通过 **`aria-describedby`** 关联（当前未自动挂接，见 §7.3）。 |
| 前缀图标 | 纯装饰加 **`aria-hidden`**；若 `prefix` 为可交互控件，需自带名称与焦点。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 容器 | 圆角边框、白底/暗色底、`focus-within` 品牌色。 |
| 输入 | 透明底、无边框、`text-sm`、占位符色。 |
| 与 Button | **`md` 均为 `h-10`**，表单行内对齐。 |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| `Form` + `FormItem` | 避免 **`label` 与 FormItem 标签重复**；错误可由 Form 统一收集后传入 **`error`**。 |
| `prefix` + `Icon` | 图标装饰 **`aria-hidden`**。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| 非受控 | `defaultValue`，输入后值更新，`onChange`/`onValueChange` 触发。 |
| 受控 | `value` 字符串，输入由父级更新 `value`。 |
| label | 点击 label 焦点进入 input。 |
| error | 红边框 + `role="alert"`，`helperText` 被隐藏。 |
| disabled | `input` disabled + 外层透明度。 |
| Ref | `ref` 指向 `HTMLInputElement`。 |

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | 受控/非受控、`prefix`/`suffix`、错误与 helper、三尺寸、`type="password"`。 |
| 说明 | **`onValueChange` 与 `onChange` 关系**；受控 **`value` 须为 string**。 |

---

## 14. 风险与开放问题

| 风险 | 缓解 |
| --- | --- |
| 受控 **`value` 非 string** | 类型约束或文档禁止；否则内部误判为非受控。 |
| 无 **`aria-describedby`** | 演进 §7.3 或文档要求手写 `id`。 |
| **`value` 与 `defaultValue` 混用** | 遵循 React 受控惯例，文档说明。 |

---

## 15. 结论

`Input` 定位为 **带标签区、前后缀与错误展示的单行文本框**，在 **受控/非受控** 上与 **`useControllableState`**、**`onValueChange`** 统一；与 **Button** 在 **`size` 高度** 上对齐。**无障碍下一迭代重点为 `aria-invalid` / `aria-describedby` 与错误/helper 的 id 关联**。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | Input 结论 |
| --- | --- |
| 职责 | 单行输入、标签、错误、前后缀 |
| DOM/语义 | 外层 div + label + input + p |
| 状态与交互 | disabled、focus-within、error 样式 |
| 数据与受控 | value/defaultValue、onChange、onValueChange |
| API | label、helperText、error、size、prefix、suffix、slotClassNames、原生 omit size/prefix |
| 类型与 Ref | `HTMLInputElement` |
| 无障碍 | label/htmlFor、error alert、待增强 describedby/invalid |
| 样式与主题 | 边框、ring、与 Button 高度档 |
| 文档与验证 | 受控 string、双 on 回调、FormItem 组合 |

---

## 附录 B：参考实现片段（当前仓库）

文件：`packages/ui/src/components/form/controls/Input/Input.tsx`。

要点：

- **`useControllableState`** + **`mergedValue`**。  
- **`handleChange`** 分支受控/非受控 + 始终 **`onChange(event)`**。  
- **`ref` 仅在 `<input>`**。

（以仓库实际代码为准。）
