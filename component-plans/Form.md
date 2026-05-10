# Form / FormItem 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/form/Form/Form.tsx`、`Form.types.ts`、`extractFieldValue.ts`

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | **`Form`**、**`FormItem`**（同模块导出） |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/form/Form` |
| 分类 | Form |
| 依赖 | `cn`、`FormContext`、**`extractFieldValue`** |
| 关联组件 | **`Input`**、**`Select`**、**`Checkbox`**、**`Switch`**、**`DatePicker`** 等受控子项 |

---

## 2. 目标与非目标

### 2.1 目标

1. **集中状态**：**`Form`** 维护 **`values: FormValues`** 与 **`errors`**，**`FormItem`** 通过 **`name`** 读写字段。  
2. **声明式校验**：**`rules: FormRule[]`**（必填、长度、正则、条件、自定义 **`validator`**、**`deps`** 联动）。  
3. **校验时机**：**`validateTrigger`**：**`onSubmit`**（默认）/ **`onChange`** / **`onBlur`**。  
4. **提交流程**：**`onSubmit` 回调**接收 **`values`**；**`event.preventDefault()`** 内置；仅在校验通过后调用 **`onSubmit`**。  
5. **子控件注入**：对 **单个子 ReactElement** **`cloneElement`** 注入 **`value`/`onChange`/`onBlur`**，并用 **`extractFieldValue`** 统一从 **事件对象** 或 **原始值**（如 **`Select`/`Checkbox`/`Switch`** 回调）取值。

### 2.2 非目标

1. **字段级 API `setFieldsValue`/`getFieldsValue` 对外 Hook**：当前 **Context 未导出**；跨模块取值依赖 **`onSubmit`** 或演进 **`useFormContext`**。  
2. **`initialValues` 随 props 同步**：仅作 **`useState` 初值**；**父级 `initialValues` 变更不自动回填**（常见 React 限制，文档说明）。  
3. **异步校验队列 / 防抖全库方案**：**`validator`** 可为同步返回 message；复杂异步需业务封装或演进。  
4. **嵌套 `name` 路径 `user.name`**：当前 **`name` 为单层 string key**；嵌套对象需扁平化或演进 `namePath`。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 登录/设置页 | **`Form` + 多个 `FormItem`** + **`Input`/`Select`**。 |
| 提交前整表校验 | **`validateTrigger: 'onSubmit'`**（默认）。 |
| 即时校验 | **`validateTrigger: 'onChange'`** 或 **`'onBlur'`**。 |

---

## 4. DOM / 语义

### 4.1 `Form`

| 项 | 方案 |
| --- | --- |
| 根节点 | **`<form>`**，**`className` 默认含 `space-y-4`**。 |
| 提交 | **`onSubmit`** 内 **`preventDefault`** → **`validate()`** → 通过则 **`onSubmit?.(values)`**。 |

### 4.2 `FormItem`

| 项 | 方案 |
| --- | --- |
| 根节点 | **`<div className="space-y-1.5">`**。 |
| 标签 | 可选 **`<label>`**；**当前无 `htmlFor`** 与子控件 **`id`** 绑定（见 §9 演进）。 |
| 错误/帮助 | **`<p>`** 展示 **`error`** 或 **`help`**；**`error` 时 `text-red-600`**。 |
| **`validateStatus`** | **`success`/`warning`** 时额外静态文案块（与 **`rules` 错误** 独立展示逻辑）。 |

---

## 5. 状态与交互

### 5.1 `Form` 内部 state

| state | 作用 |
| --- | --- |
| `values` | 字段值 **`Record<string, unknown>`** |
| `errors` | 字段错误文案 **`Record<string, string>`** |
| `rulesMap` | 各字段 **`FormRule[]`**，由 **`FormItem` `useEffect`** 注册/卸载 |

### 5.2 错误更新防抖

**`scheduleErrorsUpdate`** 使用 **`window.setTimeout(..., 120)`** 合并 **`triggerFieldValidation`** 触发的错误刷新；卸载时 **`clearTimeout`**。

### 5.3 `setFieldValue`

- 更新 **`values[name]`**。  
- 若 **`validateTrigger === 'onSubmit'`**，**清除该字段 `errors[name]`**（避免旧错误残留）。

### 5.4 `triggerFieldValidation`

- 若 **`validateTrigger !== trigger`**（参数 **`'onChange'`/`'onBlur'`**），**直接 return**。  
- 否则基于 **`rulesMap`** 计算 **`name`** 及 **`deps` 涉及字段** 的错误，经 **`scheduleErrorsUpdate`** 写入 **`errors`**。

### 5.5 `validate()`（提交前）

遍历 **`rulesMap`** 所有 key，**`setErrors`** 一次性写全；返回 **`Object.keys(nextErrors).length === 0`**。

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| 数据源 | **`values`** 为唯一表单状态源；子项 **`value`** 来自 **`ctx.values[name]`**。 |
| 写路径 | **`FormItem` `onChange`** → **`extractFieldValue`** → **`setFieldValue`** → **`triggerFieldValidation`**。 |
| 初始值 | **`initialValues`** 传入 **`useState` 初值**。 |

---

## 7. API 规范

### 7.1 `FormProps`（`Form.types.ts`）

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `initialValues` | 初始字段值 | `FormValues` | `{}` | 仅初始化 |
| `validateTrigger` | 校验触发策略 | `FormValidateTrigger` | `'onSubmit'` | `'onChange' \| 'onBlur'` |
| `onSubmit` | 校验通过提交 | `(values: FormValues) => void` | - | 原生 **`onSubmit` 被 Omit** 后由组件接管 |
| `className` | 表单根 class | `string` | - | 与 `space-y-4` 合并 |
| 继承 | `Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'>` | - | - | **`action`/`method`** 等可透传 |

### 7.2 `FormItemProps`

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `name` | 字段键 | `string` | **必填** |
| `label` | 标签 | `ReactNode` | - |
| `rules` | 校验规则 | `FormRule[]` | `[]` |
| `dependencies` | 依赖字段值签名（用于 `useEffect` 依赖） | `string[]` | `[]` |
| `children` | 单个子控件元素 | `ReactNode` | **必填**（**`cloneElement` 要求**） |
| `requiredMark` | 是否展示必填 `*` | `boolean` | `true` |
| `help` | 帮助文案 | `ReactNode` | - |
| `extra` | 额外说明区 | `ReactNode` | - |
| `validateStatus` | 成功/警告装饰 | `'error' \| 'success' \| 'warning'` | - |

### 7.3 `FormRule`

| 字段 | 说明 |
| --- | --- |
| `required` | 空：`undefined`/`null`/`''` 失败 |
| `minLength` / `maxLength` | 仅当 **`typeof value === 'string'`** |
| `pattern` | 字符串正则校验 |
| `when` | `(values) => boolean`，为 false 时跳过该条 rule |
| `deps` | 字段名数组；**`triggerFieldValidation`** 时与变更字段一起重算 |
| `message` | 覆盖默认英文 message |
| `validator` | `(value, values) => string \| null`，返回非空为错误 |

### 7.4 `extractFieldValue`（导出工具）

| 输入 | 返回值 |
| --- | --- |
| 类 change **`event`** 且 **`target.type === 'checkbox'`** | **`Boolean(checked)`** |
| 类 change **`event`** 且 **`target` 有 `value`** | **`target.value`** |
| 其它（如 **`Select`/`Switch` 直接传的 string/boolean**） | **原样返回** |

用于 **`FormItem` `cloneElement` 的 `onChange`** 统一收口。

### 7.5 建议演进（可选）

| 能力 | 优先级 |
| --- | --- |
| 导出 **`useFormContext`** 或 **`Form.useForm()`** | P1 |
| **`FormItem` `htmlFor` + 子控件 `id`** | P1 |
| **`initialValues` 同步**（`key` 重置或 `enableReinitialize`） | P2 |
| **嵌套 `namePath`** | P2 |
| **`aria-invalid` / `aria-describedby`** 注入子控件 | P1 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| `Form` | **`forwardRef<HTMLFormElement, FormProps>`** |
| `FormItem` | 非 `forwardRef`；无 ref 聚合 |
| 导出类型 | **`FormValues`、`FormRule`、`FormProps`、`FormItemProps`、`FormValidateTrigger`（`ValidateTrigger` 别名）** |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| 提交 | 原生 **`form` + submit button** 行为正常。 |
| 标签 | **`FormItem` `label`** 无 **`htmlFor`**；建议演进或由子控件自带 **`id`** + 手动 **`label` `htmlFor`**。 |
| 错误 | 错误在 **`<p>`** 中；建议演进 **`role="alert"`** 与 **`aria-describedby`** 指向子 **`input`**。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| `Form` | **`space-y-4`** 垂直栈。 |
| `FormItem` | **`space-y-1.5`**；必填星号 **`text-red-500`**。 |

---

## 11. 组合与依赖

| 子组件 | `value` 注入 | `onChange` 形态 |
| --- | --- | --- |
| `Input` | string | `ChangeEvent` → **`extractFieldValue` → value** |
| `Select` | string | `(v: string)` → **原样** |
| `Checkbox` | boolean | 事件或 boolean（视子实现） |
| `Switch` | boolean | `(c: boolean)` → **原样** |
| `DatePicker` | string | 事件或 string |

**`FormItem` 仅对 `isValidElement(children)` 为真且单节点时 `cloneElement`**；否则原样渲染 **`children`**（**不注入 value/onChange**）。

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| 提交 | 校验失败不调 **`onSubmit`**；成功传 **`values`**。 |
| `required` | 空值阻止提交。 |
| `validateTrigger` | `onChange` 时输入触发 **`errors`** 更新。 |
| `deps` | 依赖字段变更时联动字段重算。 |
| 非元素 children | 不崩溃且不注入（文档说明限制）。 |
| 卸载 | **`FormItem` `clearFieldRules`** 清理。 |

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | 多字段、`rules` 组合、`validateTrigger` 三种、`help`/`extra`、`validateStatus`。 |
| 必含 | **`cloneElement` 单子约束**、**`extractFieldValue` 行为表**、**`initialValues` 不随 props 更新**。 |
| 治理 | **Long ID 字段值保持 string**（与仓库数据规范一致）。 |

---

## 14. 风险与开放问题

| 风险 | 缓解 |
| --- | --- |
| **`rules` effect 依赖 `dependencySignature`** | 依赖数组变化会重挂 rules；注意 **`rules` 引用稳定** 或 `useMemo`。 |
| **`validator` 抛错** | 无 try/catch；业务 **`validator` 内自行捕获**。 |
| **多子节点 Fragment** | 不支持；文档要求单根控件。 |

---

## 15. 结论

**`Form`** 提供 **`values`/`errors`/`rulesMap`** 与 **`onSubmit` 校验闸门**；**`FormItem`** 负责 **规则注册、`cloneElement` 注入与展示**。与 **Button** 同属中后台高频组件，**下一迭代重点为 Context 导出、a11y 关联与 `initialValues` 同步策略**。

---

## 附录 A：与 Button 九维模板对照表（`Form`）

| 维度 | 结论 |
| --- | --- |
| 职责 | 表单状态、校验、提交 |
| DOM/语义 | `form` + Provider |
| 状态与交互 | values/errors/rules、防抖更新错误 |
| 数据与受控 | initialValues；内部全受控子项 |
| API | initialValues、validateTrigger、onSubmit |
| 类型与 Ref | `HTMLFormElement` |
| 无障碍 | 演进 label/alert/aria |
| 样式与主题 | space-y-4 |
| 文档与验证 | cloneElement 限制、extractFieldValue |

---

## 附录 B：与 Button 九维模板对照表（`FormItem`）

| 维度 | 结论 |
| --- | --- |
| 职责 | 单字段规则、注入、展示错误 |
| DOM/语义 | div + label + p |
| 状态与交互 | 依赖 Context |
| 数据与受控 | name 键入 values |
| API | name、label、rules、children、help、extra、validateStatus |
| 类型与 Ref | 无 forwardRef |
| 无障碍 | label 无 htmlFor；演进 |
| 样式与主题 | 间距、星号、错误色 |
| 文档与验证 | 单子元素、与 Input/Select 组合 |

---

## 附录 C：参考实现位置（当前仓库）

- **`Form.tsx`**：`Form`、`FormItem`、`FormContext`、校验与 **`cloneElement`**。  
- **`Form.types.ts`**：类型定义。  
- **`extractFieldValue.ts`**：事件/原始值归一。

（以仓库实际代码为准。）
