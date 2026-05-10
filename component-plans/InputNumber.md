# InputNumber 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/form/controls/InputNumber/InputNumber.tsx`

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `InputNumber` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/form/controls/InputNumber` |
| 分类 | Form（Controls） |
| 依赖 | `cn`（**未**使用 `useControllableState`） |
| 关联组件 | **`Input`**（文本）、**`Slider`**（连续数值）、**`Form`/`FormItem`** |

---

## 2. 目标与非目标

### 2.1 目标

1. **数值输入与步进**：中间 **`<input type="text" inputMode="decimal">`** 展示 **`number | null`**（**`null` 显示为空串**）；两侧可选 **`−` / `+`** **`button`**，按 **`step`** 增减。  
2. **边界与精度**：**`clamp`** 将值限制在 **`[min, max]`**（默认 **`min = -Infinity`**、**`max = Infinity`**）；若传入 **`precision`**，在 **`clamp` 内** **`Number(v.toFixed(precision))`**。  
3. **受控 / 非受控（混合）**：**`val = controlledValue ?? internal`**，**`internal`** 来自 **`useState(defaultValue ?? null)`**；**`update(n)`** 执行 **`setInternal(clamped)`** + **`onChange?.(clamped)`**。  
4. **尺寸与外观**：**`size?: 'sm' | 'md' | 'lg'`** 映射高度 **`h-8` / `h-10` / `h-11`**；**`focus-within`** 品牌边框与 ring。  
5. **可选隐藏步进器**：**`controls = false`** 时仅中间输入框。

### 2.2 非目标

1. **原生 `<input type="number">`**：当前为 **`type="text"`**，由 **`Number(raw)`** 解析。  
2. **`formatter` / `parser`、科学计数、单位后缀**：当前 **无**。  
3. **`useControllableState`**：与 **`Input`** 等组件 **API 风格不完全统一**（见 §6）。  
4. **`input` 的 `ref` 转发**：**`forwardRef` 仅指向外层 `div`**（见 §8）。  
5. **键盘上下键步进**：当前 **无**（仅按钮与手动输入）。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 表单中的整数/小数、数量 | **`onChange(number | null)`** 与业务校验、**`min`/`max`/`precision`** 对齐。 |
| 仅输入、不要按钮 | **`controls={false}`**。 |
| 与 **`Input`** 区分 | **`InputNumber`** 产出 **数值语义**（含 **空为 `null`**），**`Input`** 为字符串。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 根 | **`<div ref={ref}>`**，**`inline-flex items-center rounded-md border ...`**，**`{...props}`** 落在 **`div`**（**`HTMLAttributes<HTMLDivElement>`** 继承，**`onChange` 已 Omit**）。 |
| 减/加 | **`type="button"`**，**`disabled`** 当 **`disabled`** 或 **`val <= min` / `val >= max`**（**`val !== null`** 时比较）。 |
| 输入 | **`<input type="text" inputMode="decimal">`**，**`value={val ?? ''}`**，**`text-center`**，**`w-16 min-w-0 flex-1`**。 |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| 输入 **`onChange`** | **`raw === ''` 或 `raw === '-'`** → **`update(null)`** 并 **`return`**；否则 **`Number(raw)`**，**`!isNaN(n)`** 时 **`update(n)`**（非法字符不更新）。 |
| **`onBlur`** | **`val !== null`** 时 **`update(clamp(val))`**，纠正超界与 **`precision`**。 |
| **按钮** | **`−`**：**`update((val ?? 0) - step)`**；**`+`**：**`update((val ?? 0) + step)`**（自 **`null`** 起步视为 **0**）。 |

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| 展示值 | **`val = controlledValue ?? internal`**（**`controlledValue`** 即 props **`value`**）。 |
| **`value={0}`** | **`0 ?? internal`** 为 **`0`**，受控零值 **正常**。 |
| **`value={null}` 受控「空」** | **`null ?? internal` 等于 `internal`**，**无法** 用显式 **`null`** 覆盖为受控空；**与常见「空即 null」受控语义不一致**（见 §14）。 |
| 非受控 | 不传 **`value`**，**`defaultValue`** 经 **`useState(defaultValue ?? null)`** 初始化。 |
| **`onChange`** | **`(value: number | null) => void`**，**非** DOM **`ChangeEvent`**。 |

---

## 7. API 规范

### 7.1 `InputNumberProps`（当前实现）

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `value` | 受控数值 | `number` | - | **`undefined`** 走非受控；**`null` 见 §6** |
| `defaultValue` | 非受控初值 | `number` | - | 未传则为 **`null`** |
| `min` | 下限 | `number` | `-Infinity` | |
| `max` | 上限 | `number` | `Infinity` | |
| `step` | 步长 | `number` | `1` | |
| `disabled` | 整组禁用 | `boolean` | `false` | **`input` 与两按钮** |
| `size` | 高度档 | `'sm' \| 'md' \| 'lg'` | `'md'` | |
| `controls` | 是否显示 ± | `boolean` | `true` | |
| `precision` | 小数位 | `number` | - | **`toFixed`** 写入 **`clamp`** |
| `placeholder` | 占位 | `string` | - | 仅 **`input`** |
| `onChange` | 值变化 | `(value: number \| null) => void` | - | |
| `className` | 根样式 | `string` | - | 根 **`div`** |
| 继承 | `Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>` | - | - | 与根 **`div`** 合并；**`name` 在 `div` 上对表单提交无标准作用** |

### 7.2 视觉（当前实现摘要）

| 区域 | 类名要点 |
| --- | --- |
| 根 | **`focus-within:border-brand-500 focus-within:ring-2 ...`**；**`disabled` → `opacity-60`** |
| ± 按钮 | **`shrink-0`**、左右 **`border-r` / `border-l`**、**`hover:bg-slate-50`** |
| `input` | **`bg-transparent`**、**`outline-none`**、居中 |

### 7.3 建议演进（可选）

| 能力 | 优先级 |
| --- | --- |
| **`useControllableState` + 明确「空」受控语义**（**`undefined` vs `null`** 或文档化二选一） | P1 |
| **`forwardRef` 或 `inputRef` 指向 `input`** | P2 |
| **负号中间态**（**`-` 不立刻 `update(null)`**） | P1 |
| **键盘步进、`parser`/`formatter`** | P2 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| `forwardRef` | **`HTMLDivElement`** → **外层容器 `div`** |
| **`input`** | **无** 对外 ref |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| 输入 | **`inputMode="decimal"`** 有利于移动端数字键盘；**`type="text"`** 避免原生 **`type=number`** 的读屏差异。 |
| ± 按钮 | 文案为 **符号**；建议业务 **`aria-label`** 包在自定义层，或演进 **`decrementLabel`/`incrementLabel`**。 |
| 分组 | **无** **`role="spinbutton"`** 等；与 **Ant InputNumber** 的 a11y 模型 **不对齐**。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 焦点 | **`focus-within`** 在 **容器** 上统一 ring，**`input` 无独立 `nova-focus-ring`**（与 **`Input`** 略有差异）。 |
| 暗色 | 根与按钮均有 **`dark:`** 变体。 |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| **`FormItem` + `InputNumber`** | **`onChange(number \| null)`** 与 **`FormItem`** 常见 **`onChange(event)`** **不兼容**；需 **包装** 写 **`setFieldValue`** 或 **不用自动注入**。 |
| **原生 form submit** | **`name`/`value`** 需落在 **`input`** 上才参与默认提交；当前 **`props` 在 `div`**，若需提交应 **业务侧隐藏域** 或 **演进 `input` 透传 `name`**。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| **步进** | **`+`/`-`** 改变 **`step`**，**`null` 起点** 按 **0** 加减。 |
| **边界** | 超 **`min`/`max`** 在 **`onBlur`** 与 **`update` 内** **`clamp`** 纠正。 |
| **`precision`** | **`onBlur`** 与每次 **`update`** 中数值经 **`toFixed`**。 |
| 清空 | **`''`** → **`null`**，**`onChange(null)`**。 |
| **受控** | 父 **`value`** 与展示一致（**注意 `value={null}`**，§6）。 |
| **`controls={false}`** | 无两侧按钮。 |

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | 受控/非受控、**`min`/`max`/`precision`**、**`controls`**、**`size`**。 |
| 说明 | **`null` 受控限制**、**负号输入**、**`FormItem`**、**`ref` 在 `div`**。 |

---

## 14. 风险与开放问题

| 风险 | 说明 |
| --- | --- |
| **`value={null}` 无法受控为空** | **`??`** 把 **`null`** 当成「未传」回退 **`internal`**；空状态应 **不传 `value`（非受控）** 或演进 API。 |
| **输入 `-` 即 `update(null)`** | 用户输入负数时 **仅键入 `-`** 会 **清空**，**难以连续键入 `-5`**（除非先数字再改或粘贴）。 |
| **`Number('1e2')`** | 科学计数法可能被接受，与 **`precision`** 组合行为需业务自测。 |
| **`div` 继承 `HTMLAttributes`** | **`id`/`data-*`** 在容器上；与 **`label htmlFor`** 联用时通常应对 **`input`**，需 **业务包一层** 或演进 **`inputId`**。 |

---

## 15. 结论

`InputNumber` 为 **容器 + `text` 输入 + 可选 ± 步进** 的数值控件，**`clamp`/`precision`**、**`onChange(number | null)`** 清晰。与 **Button** 无继承关系；受控层使用 **`??`** 与 **`-` 清空逻辑** 与常见 **Ant Design InputNumber** 行为 **存在差异**，文档与后续迭代应优先 **统一空值语义** 与 **负号输入体验**。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | InputNumber 结论 |
| --- | --- |
| 职责 | 数值输入 + 步进 |
| DOM/语义 | `div` + `input` + 可选 `button`×2 |
| 状态与交互 | text 解析、blur 再 clamp、± click |
| 数据与受控 | `value`/`defaultValue`/`onChange`；`??` 与 `null` |
| API | min/max/step/size/controls/precision |
| 类型与 Ref | `HTMLDivElement` |
| 无障碍 | inputMode；符号按钮弱标签 |
| 样式与主题 | focus-within、三档高度 |
| 文档与验证 | FormItem、null 受控、负号 |

---

## 附录 B：参考实现片段（当前仓库）

文件：`packages/ui/src/components/form/controls/InputNumber/InputNumber.tsx`。

要点：**`val = controlledValue ?? internal`**、**`clamp`**、**`raw === '' \|\| raw === '-'` → `null`**、**`forwardRef` → `div`**。

（以仓库实际代码为准。）
