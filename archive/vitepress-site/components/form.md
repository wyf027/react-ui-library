# Form 表单

表单组件，配合 FormItem 使用，提供验证、布局与提交能力。

### 组合约定

- 已在 **`FormItem` 上写 `label`** 时，子级的 **`Input`、`Select` 等不要再传 `label`**，避免双重标签。
- 单个子元素时，`FormItem` 会注入 **`id` / `htmlFor`**；校验错误、**`help`**、**`validateStatus`**（`success` / `warning` 固定文案）、**`extra`** 会以 **`aria-describedby`** 关联；有错时另有 **`aria-invalid`** 与错误文案 **`role="alert"`**。
- 有 **`label`** 时，根节点为 **`role="group"`**，**`aria-labelledby`** 指向该标签（字段分组语义）。

### 无障碍要点

| 项 | 说明 |
| --- | --- |
| 分组 | 有 `label` 时根节点 **`role="group"`** + **`aria-labelledby`** |
| 控件 | **`label` `htmlFor`** 与控件 **`id`**；**`aria-describedby`** 串联 help / 错误 / 状态 / **`extra`** |
| 错误 | 校验失败时控件 **`aria-invalid`**，错误文案 **`role="alert"`** |
| 测试钩子 | 根节点带 **`data-nova-form-item="true"`**（与 `Button` 的 `data-nova-button` 一致，便于 E2E） |

## 示例

<LivePlayground :code="`
() => {
  return (
    <Form
      initialValues={{ username: '', password: '' }}
      onSubmit={(values) => alert(JSON.stringify(values))}
    >
      <FormItem name='username' label='用户名' rules={[{ required: true, message: '请输入用户名' }]}>
        <Input placeholder='请输入用户名' />
      </FormItem>
      <FormItem
        name='password'
        label='密码'
        rules={[
          { required: true, message: '请输入密码' },
          { minLength: 6, message: '至少6个字符' },
        ]}
      >
        <Input type='password' placeholder='请输入密码' />
      </FormItem>
      <Button type='submit'>提交</Button>
    </Form>
  )
}
`" />

## API

### Form

继承除 **`onSubmit`** 以外的 [`FormHTMLAttributes<HTMLFormElement>`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLFormElement)（如 `className`、`autoComplete` 等）。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| initialValues | 各字段初始值 | `Record<string, unknown>` | - |
| validateTrigger | 校验触发时机 | `'onSubmit' \| 'onChange' \| 'onBlur'` | `'onSubmit'` |
| onSubmit | 校验通过后提交；入参为当前表单值快照 | `(values: Record<string, unknown>) => void` | - |

### FormItem

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 字段名（唯一键） | `string` | - |
| label | 标签 | `ReactNode` | - |
| rules | 验证规则列表 | `FormRule[]` | - |
| dependencies | 依赖字段（变更时触发当前项重算，与规则 `deps` 等配合） | `string[]` | - |
| requiredMark | 在 `label` 存在时，若规则含 `required` 是否显示红色 `*` | `boolean` | `true` |
| help | 无校验错误时显示的说明文案；有 `error` 时优先显示错误 | `ReactNode` | - |
| extra | 辅助区域（在错误/帮助文案之后）；带稳定 **`id`**，并入控件 **`aria-describedby`** | `ReactNode` | - |
| validateStatus | 人工提示态（与 `rules` 触发的 `error` 文案独立）；渲染 `success` / `warning` 固定文案，并纳入控件 **`aria-describedby`**；`error` 仅占类型位，无单独 UI | `'error' \| 'success' \| 'warning'` | - |
| children | 表单控件（需与 `name` 对应的值收集方式兼容）；为单个子元素时注入 `value` / `onChange` / `onBlur`，并与 **`label` 通过 `id` + `htmlFor` 关联**；**`help` / 校验错误 / `validateStatus` / `extra`** 写入 **`aria-describedby`**（空格分隔，顺序：`help`/校验错误 → `validateStatus` → `extra`）；有错时 **`aria-invalid`** 与错误 **`role="alert"`**（子元素已有非空 `id` 时保留） | `ReactNode` | - |

### FormRule

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| required | 必填 | `boolean` | - |
| minLength / maxLength | 字符串长度 | `number` | - |
| pattern | 正则 | `RegExp` | - |
| when | 是否启用本条规则（依赖整表值） | `(values: Record<string, unknown>) => boolean` | - |
| deps | 依赖字段（细则实现见源码） | `string[]` | - |
| message | 错误文案 | `string` | - |
| validator | 自定义校验，返回 `null` 表示通过 | `(value: unknown, values: Record<string, unknown>) => string \| null` | - |
