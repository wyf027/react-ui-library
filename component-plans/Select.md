# Select 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/form/controls/Select/Select.tsx`

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Select` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/form/controls/Select` |
| 分类 | Form |
| 依赖 | `cn`、`useControllableState`、`useId` |
| 关联组件 | **`Input`**（标签/尺寸/slot 模式）、**`Form`/`FormItem`**、**`Native Form` 提交** |

---

## 2. 目标与非目标

### 2.1 目标

1. **原生下拉选择**：基于 **`<select>` + `<option>`**，零 Popover 依赖，表单内行为与浏览器一致。  
2. **受控 / 非受控**：**`value`** / **`defaultValue`**（字符串）+ **`useControllableState`**；**`onChange(value: string)`** 简化为仅传当前值（**不再暴露原生 `ChangeEvent`**，与 `Input` 的 `onChange(event)` 不同）。  
3. **数据驱动选项**：**`options: SelectOption[]`**，`value`/`label`/`disabled`。  
4. **占位项**：**`placeholder`** 渲染 **`value=""` 的首项 `<option>`**，用于「请选择」类空态。  
5. **尺寸与 Input 对齐**：**`sm` / `md` / `lg`** → **`h-8` / `h-10` / `h-11`**。  
6. **标签关联**：可选 **`label`** + **`htmlFor`** + **`id`**（`useId` 兜底）。

### 2.2 非目标

1. **可搜索 / 异步加载 / 多选 / 自定义下拉面板**：需 **Headless Combobox** 或独立 `Select` 大版本，不在当前原生实现范围。  
2. **与 `Input` 完全一致的 `error`/`helperText` API**：当前 **未实现**；可由外层 `FormItem` 或演进补齐。  
3. **分组 `optgroup`**：当前未封装；可通过 **`...props`** 传入原生 `children` 与 `options` 混用风险——建议演进或文档禁止混用。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 国家/角色枚举 | `options` 静态列表，`value` 为 string（**Long ID 须全程 string**，符合仓库治理）。 |
| 表单提交 | 原生 `select` **`name`** 可通过 **`...props`** 透传，随表单 POST。 |
| 占位未选 | `placeholder` + 受控 **`value=""`** 或与 `defaultValue=""` 配合。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 根结构 | 外层 **`div`**（`flex flex-col gap-1.5`）→ 可选 **`label`** → **`<select>`**。 |
| 选项 | **`options.map`** → **`<option key={value} value={...} disabled={...}>`**，子节点为 **`option.label`**。 |
| 占位 | **`placeholder`** 时首子项 **`<option value="">{placeholder}</option>`**。 |
| 列表框语义 | 由 **原生 `select`** 提供，无需自造 `listbox`。 |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| `disabled` | 透传 **`select`**，整控件禁用。 |
| 单选 | 浏览器默认单选；多选需 **`multiple`** 透传（当前文档需说明与 **`onChange(string)`** 类型是否匹配——演进可改为 `string | string[]`）。 |
| 焦点 | **`nova-focus-ring`** 在 **`select`** 上。 |

---

## 6. 数据与受控

### 6.1 `useControllableState`（当前实现）

```ts
const [innerValue, setInnerValue] = useControllableState<string>({
  value,
  defaultValue: defaultValue ?? '',
  onChange,
})
```

- **`value !== undefined`**：受控（含 **`value=""`** 空字符串）。  
- **`mergedValue`**：`value !== undefined ? value : innerValue`。

### 6.2 `handleChange`

**`setInnerValue(event.target.value)`**；**`useControllableState` 的 `setState`** 在非受控时更新内部状态，并调用 **`onChange(nextValue)`**（即父级传入的 **`onChange: (value: string) => void`**）。

**注意**：与 **`Input`** 不同，**`Select` 不把原生 `onChange` 事件**传给父级；若需要 `event`（如 analytics），需在演进中增加 **`onChangeEvent`** 或扩展签名。

---

## 7. API 规范

### 7.1 类型 `SelectOption`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `label` | `ReactNode` | 展示文案；**`<option>` 内复杂节点**在部分浏览器表现不一，**生产环境推荐 string** |
| `value` | `string` | 选项值；**与表单、接口 ID 类型一致（string）** |
| `disabled?` | `boolean` | 禁用单项 |

### 7.2 `SelectProps`（当前实现）

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `options` | 选项列表 | `SelectOption[]` | **必填** | |
| `label` | 标签 | `ReactNode` | - | `htmlFor` 关联 select |
| `placeholder` | 首项占位文案 | `string` | - | 对应 **`value=""`** 的 option |
| `value` | 受控值 | `string` | - | `undefined` 为非受控 |
| `defaultValue` | 非受控初值 | `string` | `''`（在 hook 中为 `defaultValue ?? ''`） | |
| `onChange` | 值变化 | `(value: string) => void` | - | **非** `ChangeEvent` |
| `size` | 尺寸 | `ComponentSize` | `'md'` | |
| `disabled` | 禁用 | `boolean` | - | |
| `id` | 元素 id | `string` | - | 缺省 `useId` |
| `className` | 样式 | `string` | - | 作用在 **`<select>`** |
| `slotClassNames` | 分槽 class | `SlotClassNames` | - | `root`/`label`/`input`（`input` 用于 select 框体） |
| 继承 | `Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size' \| 'onChange'>` | - | - | 可透传 **`name`**、**`required`**、**`multiple`** 等 |

### 7.3 建议演进（可选）

| 属性 | 说明 | 优先级 |
| --- | --- | --- |
| `error` / `helperText` | 与 `Input` 对齐 | P1 |
| `onChange` 重载 | `onSelectChange(value, event?)` | P2 |
| 可搜索 Combobox | 新组件或大版本 | P3 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| 接口 | **`SelectProps`** 继承 **`Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size' \| 'onChange'>`**，自定义 **`onChange(value: string)`**。 |
| Ref | **`forwardRef<HTMLSelectElement, SelectProps>`**，指向 **原生 `<select>`**。 |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| 标签 | **`label` + `htmlFor` + `select` `id`**。 |
| 键盘 | 原生 **展开/方向键/首字母跳转**（随浏览器）。 |
| 占位 | **`value=""` 的 option`** 参与读屏；占位文案需清晰（如「请选择」）。 |
| `required` | 透传原生时，浏览器自带校验；可配合 **`aria-invalid`**（演进）。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 外观 | 全宽、`rounded-md`、边框、深浅背景与文字色，与 `Input` 外框风格同系。 |
| 高度 | 与 **`Input`** **`size`** 档一致，便于表单行对齐。 |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| `Form` | **`name`/`required`** 透传 **`select`**。 |
| `FormItem` + 错误展示 | 当前 **`Select` 无 `error` prop**；错误文案由 `FormItem` 或外层布局提供。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| 非受控 | `defaultValue` + `onChange` 收到 string。 |
| 受控 | `value` 变化反映选中项；`placeholder` 时可选空值。 |
| `options` | `disabled` 项不可选（浏览器行为）。 |
| `placeholder` | 首 option `value=""`。 |
| Ref | `HTMLSelectElement`。 |

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | 基础、占位、受控、禁用项、`size`、表单 **`name`**。 |
| 对照 | 与 **`Input`** 的 **`onChange` 签名差异**；与「高级 Select」能力边界。 |
| 治理 | **`option.value` 一律 string**（Long ID）。 |

---

## 14. 风险与开放问题

| 风险 | 缓解 |
| --- | --- |
| **`option.label` 为复杂 ReactNode** | 文档推荐纯文本；图标选项慎用。 |
| **`multiple` + `onChange(string)`** | 类型与行为不匹配；演进联合类型或禁用 `multiple` 于本组件。 |
| **无 `error`/`helperText`** | 与 `Input` 体验不一致；演进或文档说明用 `FormItem`。 |

---

## 15. 结论

`Select` 当前定位为 **原生 `<select>` 的数据驱动封装**：**`options` + 受控/非受控 + 简化 `onChange(string)` + 占位 option**；与 **Button** 共享 **`ComponentSize`** 阶梯；与 **Input** 共享标签/slot 思路但 **回调与错误展示尚未对齐**，适合「简单枚举、强表单、无搜索」场景。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | Select 结论 |
| --- | --- |
| 职责 | 原生单选下拉、数据驱动 options |
| DOM/语义 | label + select + option |
| 状态与交互 | disabled；浏览器键盘 |
| 数据与受控 | value/defaultValue、onChange(string) |
| API | options、placeholder、label、size、slotClassNames、omit size/onChange |
| 类型与 Ref | `HTMLSelectElement` |
| 无障碍 | 原生 select + label |
| 样式与主题 | 与 Input 高度/边框系一致 |
| 文档与验证 | 与 Input onChange 差异、Long ID string、multiple 限制 |

---

## 附录 B：与 `Input` 差异速查

| 项 | Input | Select |
| --- | --- | --- |
| 根控件 | `input` | `select` |
| `onChange` | `ChangeEvent` + 可选 `onValueChange` | 仅 **`(value: string) => void`**（占用原 `onChange` 名） |
| `error` / `helperText` | 有 | 无（当前） |
| 受控 `value` 类型 | 强调 string 分支 | `value !== undefined` 即受控 |

---

## 附录 C：参考实现片段（当前仓库）

文件：`packages/ui/src/components/form/controls/Select/Select.tsx`。

要点：**`mergedValue`**、**`handleChange` → `setInnerValue`**、**`placeholder` → `<option value="">`**、**`options.map`**。

（以仓库实际代码为准。）
