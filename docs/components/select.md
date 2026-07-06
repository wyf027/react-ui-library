# Select 选择器

基于原生 `<select>` 的下拉选择；支持标签、`placeholder`（首项空值选项）、尺寸、反馈说明与插槽类名。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Space direction='vertical' size={8}>
      <Select
        label='角色'
        helperText='请选择当前用户的权限角色'
        options={[
          { label: 'Admin', value: 'admin' },
          { label: 'Editor', value: 'editor' },
          { label: 'Viewer', value: 'viewer' },
        ]}
      />
      <Select
        label='状态'
        error='请选择状态'
        placeholder='请选择状态'
        options={[
          { label: '启用', value: 'enabled' },
          { label: '停用', value: 'disabled' },
        ]}
      />
    </Space>
  )
}
`" />

## 可访问性

`label` 会通过 `htmlFor` 与原生 `select` 关联。传入 `helperText` 时，组件会自动通过 `aria-describedby` 将说明文本关联到 `select`；传入 `error` 时，组件会自动设置 `aria-invalid="true"`，并将错误信息作为可访问描述。

如果你同时传入自定义 `aria-describedby`，组件会保留已有描述并追加内部 helper/error 描述，避免覆盖业务侧已有的说明关系。

## API

继承除 **`size`**（与组件尺寸 prop 冲突）、**`onChange`**（见下表）以外的 [`SelectHTMLAttributes<HTMLSelectElement>`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLSelectElement)（如 `className`、`disabled`、`name`、`id`、`multiple` 等）。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options | 选项列表 | `SelectOption[]` | - |
| label | 可选标签（与 `select` 通过 `id`/`htmlFor` 关联） | `ReactNode` | - |
| helperText | 帮助说明，会自动关联到 `select` 描述 | `ReactNode` | - |
| error | 错误说明，会自动设置错误状态并关联到 `select` 描述 | `ReactNode` | - |
| placeholder | 若提供，会渲染 `value=""` 的首项作为占位 | `string` | - |
| value | 受控值 | `string` | - |
| defaultValue | 非受控初始值 | `string` | - |
| onChange | 选中值变化（已抽象为字符串，非原生事件） | `(value: string) => void` | - |
| size | 视觉高度 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| disabled | 是否禁用 | `boolean` | - |
| slotClassNames | 插槽类名（根 / 标签 / 输入） | `{ root?: string; label?: string; input?: string }` | - |

### `SelectOption`

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 选项展示内容 | `ReactNode` | - |
| value | 选项值（对应 `<option value>`） | `string` | - |
| disabled | 是否禁用该选项 | `boolean` | - |

### 说明

- **搜索 / 虚拟滚动 / 自定义下拉**：非原生 `<select>` 能力范围；需要时请使用 Combobox 类方案或演进计划中的重型实现。
