# Checkbox 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/form/controls/Checkbox/Checkbox.tsx`

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Checkbox` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/form/controls/Checkbox` |
| 分类 | Form |
| 依赖 | `cn`、`useControllableState` |
| 关联组件 | **`Input`/`Select`**（表单域）、**`Form`/`FormItem`**；**无 `Checkbox.Group` 导出**（当前仓库） |

---

## 2. 目标与非目标

### 2.1 目标

1. **布尔勾选**：原生 **`type="checkbox"`**，受控/非受控与 **`useControllableState<boolean>`** 一致。  
2. **点击区域**：**外层 `<label>`** 包裹 **`input` + 文案**，整块可切换，扩大命中区。  
3. **简化回调**：**`onChange?: (checked: boolean) => void`**（省略原生 `ChangeEvent`，与 `Select` 思路类似）。  
4. **禁用态**：**`disabled`** 时 **`cursor-not-allowed`** + **`opacity-60`**。  
5. **焦点与品牌色**：**`nova-focus-ring`**；**`text-brand-500`** 用于勾选色（Tailwind accent on checkbox）。

### 2.2 非目标

1. **`indeterminate` 半选态**：当前 **未暴露 prop**；需 DOM `ref` + `indeterminate` 或由演进支持。  
2. **`Checkbox.Group` 与全选联动**：当前 **无 Group 组件**；多选由多个 `Checkbox` + 业务 state 组合。  
3. **开关样式（Switch 外观）**：用 **`Switch`** 组件。  

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 协议勾选 | 单框 + `label`「我已阅读…」。 |
| 表格行多选 | 每行一个 `Checkbox`，选中集合由父级 `Set`/数组维护。 |
| 表单附加条件 | 与 **`Form`** 提交校验联动（必填勾选）。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 根节点 | **`<label className="inline-flex ...">`**，内联 flex 与文案对齐。 |
| 控件 | **`<input type="checkbox" />`**，`**{...props}`** 在 **`input`** 上（`name`、`value` 等原生属性透传）。 |
| 标签关联 | **隐式关联**：`label` 包裹 `input`，**可不写 `htmlFor`**；若传 **`id`**，置于 **`input`**，便于 `FormItem` 或测试定位。 |
| 文案 | **`label` prop** 渲染在 **`input` 之后**，作为 `label` 元素子节点（非 `htmlFor` 指向的外部 label）。 |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| `handleChange` | **`setInnerChecked(event.target.checked)`**，由 **`useControllableState`** 统一更新非受控内部值并调用 **`onChange(boolean)`**。 |
| `checked` 展示 | **`checked={innerChecked}`**，`innerChecked` 为 hook 返回的 **`state`**（受控时为父级 **`checked`**，非受控为内部 boolean）。 |

---

## 6. 数据与受控

### 6.1 `useControllableState`（当前实现）

```ts
const [innerChecked, setInnerChecked] = useControllableState<boolean>({
  value: checked,
  defaultValue: defaultChecked ?? false,
  onChange,
})
```

- **`checked !== undefined`**：受控（注意 **`false` 亦为受控合法值**）。  
- **`defaultValue`**：非受控初值，默认 **`false`**。

### 6.2 与原生 `value` 提交

多选同名提交依赖原生 **`value`** 与 **`name`**，可通过 **`...props`** 传给 **`input`**；布尔「是否勾选」仍由 **`checked`** 控制。

---

## 7. API 规范

### 7.1 `CheckboxProps`（当前实现）

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `label` | 文案 | `ReactNode` | - | 渲染在 `input` 右侧 |
| `checked` | 受控勾选 | `boolean` | - | `undefined` 为非受控 |
| `defaultChecked` | 非受控初值 | `boolean` | `false`（`?? false`） | |
| `onChange` | 勾选变化 | `(checked: boolean) => void` | - | 非 `ChangeEvent` |
| `disabled` | 禁用 | `boolean` | - | |
| `id` | `input` id | `string` | - | |
| `className` | 样式 | `string` | - | 作用在 **外层 `<label>`** |
| 继承 | `Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>` | - | - | **`type` 不应被覆盖**（固定 checkbox）；其余如 **`name`/`value`** 透传 **`input`** |

### 7.2 样式（当前实现摘要）

| 区域 | 类名要点 |
| --- | --- |
| `label` | `inline-flex cursor-pointer items-center gap-2 text-sm` + 深浅文字色 |
| `label` disabled | `cursor-not-allowed opacity-60` |
| `input` | `h-4 w-4 rounded border-slate-300 text-brand-500` + `nova-focus-ring` |

### 7.3 建议演进（可选）

| 属性 | 说明 | 优先级 |
| --- | --- | --- |
| `indeterminate` | 受控半选 + `ref` 副作用写 DOM | P1 |
| `Checkbox.Group` | `value[]`、`onChange`、全选 | P2 |
| `error` / `helperText` | 与 `Input` 对齐 | P2 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| 接口 | **`CheckboxProps`** 继承 **`Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>`**，自定义 **`onChange(checked: boolean)`**。 |
| Ref | **`forwardRef<HTMLInputElement, CheckboxProps>`**，指向 **原生 `input`**（非外层 `label`）。 |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| 点击区域 | **`label` 包裹** 满足大点击区；读屏朗读 **`label` 文案** 与 checkbox 关联。 |
| `disabled` | 原生 **`disabled`** + 视觉 **`opacity`**；禁用时勿仅依赖颜色区分。 |
| `indeterminate` | 树/全选场景常用；**当前缺失**，演进前需在文档说明用 `aria-checked="mixed"` 等替代须自行处理。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 尺寸 | 固定 **`h-4 w-4`**，与 **`Input` `sm`** 等行内对齐时由设计验收。 |
| 品牌色 | **`text-brand-500`** 驱动勾选 accent。 |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| 多个 `Checkbox` | 父级维护 **`string[]`/`Set<string>`** 选中集；**option value 建议 string**（ID 治理）。 |
| `Form` | **`name`/`value`** 透传 **`input`** 以支持提交。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| 非受控 | `defaultChecked`，点击切换，`onChange` 收到 boolean。 |
| 受控 | `checked` 由父更新；`false` 受控路径。 |
| `disabled` | 不可切换、样式禁用。 |
| 点击文案 | 点击 `label` 子文案切换勾选。 |
| Ref | `ref` 指向 `HTMLInputElement`。 |

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | 受控/非受控、`disabled`、带长 `label`、表单 `name`。 |
| 说明 | **无 Group**、**无 indeterminate**、**`className` 在 label**。 |
| 与 `Switch` | 布尔即时反馈选型对照。 |

---

## 14. 风险与开放问题

| 风险 | 缓解 |
| --- | --- |
| 受控 **`checked={undefined}`** 误用 | 与 React 惯例一致：不传则非受控；文档强调。 |
| **`className` 在 label 不在 input** | 文档说明；需改框体样式用 **`...props`** 或演进 `inputClassName`。 |

---

## 15. 结论

`Checkbox` 定位为 **原生复选框 + 包裹 label + 布尔受控封装**，API 极简；与 **Button** 同属高频表单控件。**`Checkbox.Group`/`indeterminate`** 为当前能力缺口，在 **§2.2、§7.3、§9** 已标注演进方向。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | Checkbox 结论 |
| --- | --- |
| 职责 | 单项布尔勾选 |
| DOM/语义 | label 包 input + 文案 |
| 状态与交互 | disabled、受控 checked |
| 数据与受控 | checked/defaultChecked、onChange(boolean) |
| API | label、checked、defaultChecked、onChange、omit onChange from native |
| 类型与 Ref | `HTMLInputElement` |
| 无障碍 | 隐式 label、disabled |
| 样式与主题 | h-4 w-4、brand accent |
| 文档与验证 | 无 Group/indeterminate、className 位置 |

---

## 附录 B：与 `Input` / `Select` 的 `onChange` 对照

| 组件 | `onChange` 形态 |
| --- | --- |
| Input | `ChangeEvent` + 可选 `onValueChange(string)` |
| Select | `(value: string) => void` |
| Checkbox | `(checked: boolean) => void` |

---

## 附录 C：参考实现片段（当前仓库）

文件：`packages/ui/src/components/form/controls/Checkbox/Checkbox.tsx`。

要点：**`useControllableState<boolean>`**、**`checked={innerChecked}`**、**`label` 包裹**、**`ref` → `input`**。

（以仓库实际代码为准。）
