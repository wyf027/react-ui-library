---
title: Form 表单
---

# Form 表单

表单组件，配合 FormItem 使用，提供验证、布局与提交能力。

### 组合约定

- 已在 **`FormItem` 上写 `label`** 时，子级的 **`Input`、`Select` 等不要再传 `label`**，避免双重标签。
- 单个子元素时，`FormItem` 会注入 **`id` / `htmlFor`**；校验错误、**`help`**、**`validateStatus`**、**`extra`** 会以 **`aria-describedby`** 关联；有错时另有 **`aria-invalid`** 与错误文案 **`role="alert"`**。
- 有 **`label`** 时，根节点为 **`role="group"`**，**`aria-labelledby`** 指向该标签。

### 无障碍要点

| 项 | 说明 |
| --- | --- |
| 分组 | 有 `label` 时根节点 **`role="group"`** + **`aria-labelledby`** |
| 控件 | **`label` `htmlFor`** 与控件 **`id`**；**`aria-describedby`** 串联 help / 错误 / 状态 / **`extra`** |
| 错误 | 校验失败时控件 **`aria-invalid`**，错误文案 **`role="alert"`** |
| 测试钩子 | 根节点带 **`data-nova-form-item="true"`** |

## 示例

<code src="./demos/form-basic.tsx"></code>

## API

### Form

继承除 **`onSubmit`** 以外的 [`FormHTMLAttributes<HTMLFormElement>`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLFormElement)。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| initialValues | 各字段初始值 | `Record<string, unknown>` | - |
| validateTrigger | 校验触发时机 | `'onSubmit' \| 'onChange' \| 'onBlur'` | `'onSubmit'` |
| onSubmit | 校验通过后提交 | `(values: Record<string, unknown>) => void` | - |

### FormItem

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 字段名 | `string` | - |
| label | 标签 | `ReactNode` | - |
| rules | 验证规则 | `FormRule[]` | - |
| dependencies | 依赖字段 | `string[]` | - |
| requiredMark | 必填星号 | `boolean` | `true` |
| help | 帮助文案 | `ReactNode` | - |
| extra | 辅助区域 | `ReactNode` | - |
| validateStatus | 提示态 | `'error' \| 'success' \| 'warning'` | - |
| children | 表单控件 | `ReactNode` | - |

### FormRule

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| required | 必填 | `boolean` | - |
| minLength / maxLength | 字符串长度 | `number` | - |
| pattern | 正则 | `RegExp` | - |
| when | 是否启用规则 | `(values: Record<string, unknown>) => boolean` | - |
| deps | 依赖字段 | `string[]` | - |
| message | 错误文案 | `string` | - |
| validator | 自定义校验 | `(value: unknown, values: Record<string, unknown>) => string \| null` | - |
