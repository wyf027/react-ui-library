# DatePicker 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/form/pickers/DatePicker/DatePicker.tsx`

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `DatePicker` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/form/pickers/DatePicker` |
| 分类 | Form（Picker） |
| 依赖 | `cn`、`useControllableState` |
| 关联组件 | **`Input`**（标签/尺寸扩展）、**`TimePicker`**、**`Calendar`**、**`Form`/`FormItem`** |

---

## 2. 目标与非目标

### 2.1 目标（与当前实现对齐）

1. **原生日期选择**：**`<input type="date">`**，由浏览器提供日期 UI 与本地化行为。  
2. **受控 / 非受控字符串值**：**`value` / `defaultValue`** 为 **`string`**（HTML5 一般为 **`YYYY-MM-DD`**），**`useControllableState`** + **`onChange(value: string)`**。  
3. **样式与表单一致**：高度 **`h-10`**、圆角边框、深浅模式，与 **`Input` `md`** 单行高度对齐。  
4. **属性透传**：除冲突项外 **`InputHTMLAttributes`** 通过 **`...props`**（如 **`min`**、**`max`**、**`name`**、**`required`**、**`id`**）。

### 2.2 非目标

1. **自定义日历面板 / 弹层 / 周选择 / 月选择**：当前无；需 **`Calendar`** 或独立大版本组件。  
2. **时间选择**：用 **`TimePicker`** 或原生 **`datetime-local`**（非本组件）。  
3. **Dayjs/Moment 内置**：格式化与解析由业务或演进层承担；当前仅字符串与浏览器一致。  
4. **`label` / `error` / `helperText` 包裹**：当前**无**；与 **`Input`** 完整形态不一致，由外层 `FormItem` 或演进补齐。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 表单出生日期、截止日期 | **`name` + `value`** 提交；**`min`/`max`** 限制可选区间。 |
| 受控筛选条件 | 父级 string state 与列表请求参数同步。 |
| 无障碍简单场景 | 原生 date 在各平台可访问性依赖 OS/浏览器实现。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 根节点 | **单节点 `<input type="date">`**（无外层 `div`）。 |
| 角色 | 由 **原生日期输入** 决定（实现为 `type="date"`），不额外包 `role`。 |
| 标签 | 无内置 **`label`**；由 **`FormItem`** 或 **`<label htmlFor>`** 关联 **`id`**。 |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| `handleChange` | **`setInnerValue(event.target.value)`**；`useControllableState` 负责受控/非受控与 **`onChange(string)`** 回调。 |
| `disabled` | 透传 **`input`**。 |
| 焦点 | **`nova-focus-ring`**。 |

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

- **`value !== undefined`**：受控（**`value=""`** 亦为合法受控空值）。  
- **`value={innerValue}`** 绑定到 **`input`**（`innerValue` 为 hook 返回的 **`state`**）。

### 6.2 值格式

遵循 **[HTML date input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date)**：**`value` 为 `YYYY-MM-DD`**（具体校验与空值行为随浏览器）。文档须写明 **与时区/UTC 字符串的业务转换在边界外完成**。

---

## 7. API 规范

### 7.1 `DatePickerProps`（当前实现）

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `value` | 受控值 | `string` | - | `undefined` 非受控 |
| `defaultValue` | 非受控初值 | `string` | `''`（`?? ''`） | |
| `onChange` | 变更 | `(value: string) => void` | - | 非 `ChangeEvent` |
| `disabled` | 禁用 | `boolean` | - | |
| `className` | 样式 | `string` | - | 合并于预设类之后 |
| 继承 | `Omit<InputHTMLAttributes<HTMLInputElement>, 'type' \| 'onChange'>` | - | - | **`type` 固定 `date`** |

常用透传：**`min`**、**`max`**、**`name`**、**`required`**、**`id`**、**`autoComplete`** 等。

### 7.2 样式（当前实现）

固定：**`h-10 w-full rounded-md border ... px-3 text-sm`**，与 **`Input` `md` 高度**一致；**无 `size` 分档**。

### 7.3 建议演进（可选）

| 能力 | 说明 | 优先级 |
| --- | --- | --- |
| `label` / `error` / `helperText` | 与 `Input` 对齐的包裹 API | P1 |
| `size` | `sm`/`md`/`lg` | P2 |
| 弹层日历 + `format` | Dayjs 等 | P2 |
| `showTime` / 范围 | `DatePicker.RangePicker` 或独立组件 | P3 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| 接口 | **`DatePickerProps`** 继承 **`Omit<InputHTMLAttributes<HTMLInputElement>, 'type' \| 'onChange'>`**，自定义 **`onChange(value: string)`**。 |
| Ref | **`forwardRef<HTMLInputElement, DatePickerProps>`**，指向 **原生 `input`**。 |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| 标签 | 使用 **`FormItem`** 或 **`label` + `htmlFor`** + **`id`**。 |
| 错误与描述 | 当前无 **`aria-describedby`**；演进对齐 **`Input`** 或手写 **`id`**。 |
| 原生控件 | 各平台日期选择器键盘与读屏行为不一致，**文档注明需在目标浏览器验证**。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 与 Input | 同 **`md` 行高** 便于纵向表单对齐；无 prefix/suffix。 |
| 暗色 | `dark:` 边框与背景与库内一致。 |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| `Form` + `FormItem` | 错误与 **`required`** 星标在 `FormItem`；**`name`** 在 `DatePicker` 透传。 |
| 范围选择 | 两个 **`DatePicker`** + 业务校验 **`start <= end`**，或演进 **`RangePicker`**。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| 非受控 | `defaultValue`，选日期后 `onChange` 为 `YYYY-MM-DD` 形式（环境相关）。 |
| 受控 | 父级 `value` 更新选中日期。 |
| `min`/`max` | 透传后浏览器限制可选区间。 |
| Ref | `HTMLInputElement`。 |

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | 受控/非受控、`min`/`max`、表单 **`name`**、与 **`FormItem`** 组合。 |
| 说明 | **值格式**、**无时区转换**、**与弹层版 DatePicker 边界**。 |
| 平台 | 提醒 Safari/iOS 与 Chrome 在 `type="date"` 上 UI 差异。 |

---

## 14. 风险与开放问题

| 风险 | 缓解 |
| --- | --- |
| **国际化格式** | 由浏览器 locale 决定展示；业务展示字符串需自行 `format`。 |
| **受控非法字符串** | 浏览器可能清空或纠正；文档说明合法 `YYYY-MM-DD`。 |
| **无 `label`/`error` API** | 与 `Input` 体验分裂；演进或统一用 `FormItem`。 |

---

## 15. 结论

`DatePicker` 当前定位为 **原生 `input[type=date]` 的受控薄封装**：**字符串值 + `useControllableState` + 与 `Input` md 对齐高度**；适合 **快速表单与无自定义面板需求**。与 **Button** 无直接 API 继承关系，但与 **Input/Select** 同属 **简化 `onChange(string)`** 家族。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | DatePicker 结论 |
| --- | --- |
| 职责 | 选单日（原生） |
| DOM/语义 | `input type="date"` |
| 状态与交互 | disabled；浏览器原生 UI |
| 数据与受控 | value/defaultValue string、onChange(string) |
| API | omit type/onChange + 三件套 + 透传 |
| 类型与 Ref | `HTMLInputElement` |
| 无障碍 | 依赖原生+外部 label；演进 describedby |
| 样式与主题 | h-10 与 Input md 一致 |
| 文档与验证 | 值格式、min/max、平台差异 |

---

## 附录 B：与 `Input` / `Select` 对照

| 项 | Input | Select | DatePicker |
| --- | --- | --- | --- |
| 根结构 | 包裹 div+label | 包裹 div+label | **单 input** |
| `onChange` | `ChangeEvent` + `onValueChange?` | `(value: string) => void` | **`(value: string) => void`** |
| `size` | 有 | 有 | **无（固定 h-10）** |

---

## 附录 C：参考实现片段（当前仓库）

文件：`packages/ui/src/components/form/pickers/DatePicker/DatePicker.tsx`。

要点：**`type="date"`**、**`useControllableState<string>`**、**`value={innerValue}`**。

（以仓库实际代码为准。）
