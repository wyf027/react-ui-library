---
title: Select 选择器
---

# Select 选择器

基于原生 `<select>` 的下拉选择；支持标签、`placeholder`（首项空值选项）、尺寸与插槽类名。

## 示例

<code src="./demos/select-basic.tsx"></code>

## API

继承除 **`size`**（与组件尺寸 prop 冲突）、**`onChange`**（见下表）以外的 [`SelectHTMLAttributes<HTMLSelectElement>`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLSelectElement)（如 `className`、`disabled`、`name`、`id`、`multiple` 等）。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options | 选项列表 | `SelectOption[]` | - |
| label | 可选标签（与 `select` 通过 `id`/`htmlFor` 关联） | `ReactNode` | - |
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
