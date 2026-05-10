# FormItem 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/form/Form/Form.tsx`（`FormItem` 函数）、`Form.types.ts`、`extractFieldValue.ts`  
> **关联文档**：`Form` 整体状态机、**`validate`/`FormContext`** 见 **`component-plans/Form.md`**

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `FormItem` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/form/Form`（与 **`Form` 同文件导出**） |
| 分类 | Form |
| 依赖 | **`FormContext`**、**`extractFieldValue`**、`cloneElement`、`cn` |
| 关联组件 | **`Form`**（必填父级）、**`Input`**、**`Select`**、**`Checkbox`**、**`Switch`**、**`DatePicker`** 等 |

---

## 2. 目标与非目标

### 2.1 目标

1. **字段绑定**：通过 **`name`** 与 **`Form`** 的 **`values[name]`**、**`errors[name]`** 对齐。  
2. **规则注册**：挂载时 **`setFieldRules(name, rules)`**，卸载 **`clearFieldRules(name)`**，避免泄漏与脏规则。  
3. **受控注入**：对**单个子元素** **`cloneElement`** 写入 **`value`**、包装 **`onChange`** / **`onBlur`**，在写 **`Form`** 状态后调用子组件原有回调。  
4. **值归一**：**`onChange`** 路径使用 **`extractFieldValue`**，兼容 **原生 `ChangeEvent`** 与 **`(string)`/`(boolean)`** 等子组件签名。  
5. **展示层**：**`label`**、必填 **`*`**、**`help`**、**`error`**（来自 **`ctx.errors`**）、**`extra`**、**`validateStatus`** 装饰文案。

### 2.2 非目标

1. **自身持有字段 state**：值与错误均在 **`Form`**；`FormItem` 为**视图+绑定层**。  
2. **`forwardRef` 聚合到子 input**：当前 **无**；`ref` 留在子组件上（若子支持）。  
3. **多子节点布局**：**`Fragment` 或多兄弟** 时 **不 `cloneElement`**，**不注入**（见 §14）。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 标准表单项 | **`<FormItem name="email" label="Email" rules={[...]}><Input /></FormItem>`** |
| 依赖联动 | **`dependencies={['country']}`**，依赖字段 **`values`** 变化时 **重新 `setFieldRules`**（通过 **`dependencySignature`**） |
| 仅帮助文案 | **`help`** 无 **`error`** 时展示灰色说明 |
| 成功/警告态 | **`validateStatus`** 与 **`rules` 错误** 可同时出现（两套 UI，需注意设计） |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 根 | **`<div className="space-y-1.5">`** |
| 标签 | 可选 **`<label className="text-sm font-medium ...">`** + 条件 **`<span className="text-red-500">*</span>`**（**`rules` 含 `required` 且 `requiredMark`**） |
| 控件区 | **`cloneElement` 后的单子节点** 或 **原始 `children`** |
| 错误/帮助 | **`<p className="text-xs">`**：**`error` 优先**（红），否则 **`help`**（灰） |
| `extra` | **`<div className="text-xs text-slate-500">`** |
| `validateStatus` | **`success`** → 固定英文 **「Looks good」**；**`warning`** → **「Please review this field」**（与 **`error` 字符串** 独立） |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| Context | **`useContext(FormContext)`**；**`null` 抛错**：**`FormItem must be used inside Form`** |
| 依赖签名 | **`useMemo(() => dependencies.map((dep) => ctx.values[dep]), [dependencies, ctx.values])`** 作为 **`useEffect`** 依赖，使依赖字段值变化时 **重新注册 `rules`** |
| `onChange` 包装 | **`setFieldValue` → `triggerFieldValidation(name, 'onChange', nextValue)` → `originOnChange?.(eventOrValue)`**（顺序：**先表单，后子**） |
| `onBlur` 包装 | **`triggerFieldValidation(name, 'onBlur')`**（**不传 `nextValue`**）→ **`originOnBlur?.(event)`** |

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| 读 | **`value = ctx.values[name]`**（可能 **`undefined`**，由子组件默认值消化） |
| 写 | **`ctx.setFieldValue(name, nextValue)`**，**`nextValue`** 来自 **`extractFieldValue(eventOrValue)`** |
| 错 | **`error = ctx.errors[name]`**（由 **`Form`** 校验逻辑写入） |

---

## 7. API 规范

### 7.1 `FormItemProps`（`Form.types.ts`）

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `name` | 字段键 | `string` | **必填** | 与 **`values`**、**`errors`**、**`rulesMap`** 对齐 |
| `label` | 标签 | `ReactNode` | - | 无 **`htmlFor`**（见 §9） |
| `rules` | 校验规则 | `FormRule[]` | `[]` | 详见 **`Form.md` §7.3** |
| `dependencies` | 依赖其它字段名 | `string[]` | `[]` | 驱动 **`dependencySignature`** |
| `children` | 表单子控件 | `ReactNode` | **必填** | **单 `ReactElement` 才可注入** |
| `requiredMark` | 是否显示必填星 | `boolean` | `true` | 仅当 **`rules` 含 `required`** |
| `help` | 帮助 | `ReactNode` | - | 无 **`error`** 时显示 |
| `extra` | 额外说明 | `ReactNode` | - | 独立 **`div`** |
| `validateStatus` | 成功/警告装饰 | `'error' \| 'success' \| 'warning'` | - | **`error` 值时仍展示静态 success/warning 块**（若传入） |

### 7.2 `cloneElement` 注入字段（当前实现）

| 属性 | 值 |
| --- | --- |
| `value` | **`ctx.values[name] as never`**（子需接受 `value`） |
| `onChange` | 包装函数，参数 **`eventOrValue: unknown`** |
| `onBlur` | 包装函数，参数 **`FocusEvent`** |

子类型在源码中收窄为带 **`value`/`onChange`/`onBlur`** 的 **`ReactElement`**；**`onChange` 实际可接收事件或原始值**。

### 7.3 `extractFieldValue` 与 `FormItem` 的配合

| 子组件典型输出 | `extractFieldValue` 结果 |
| --- | --- |
| `Input` `ChangeEvent` | **`target.value`** |
| `checkbox` 类 `ChangeEvent` | **`target.checked`** |
| `Select` / `Switch` 等直接传 **string/boolean** | **原样** |

若自定义子组件 **`onChange`** 传对象，需保证 **`extractFieldValue`** 能识别或自行在子内转成可存 **`FormValues`** 的类型。

### 7.4 建议演进（可选）

| 能力 | 优先级 |
| --- | --- |
| **`htmlFor` + 自动生成子 `id`** | P1 |
| **`shouldUpdate` / render props** | P2 |
| **`noStyle`** 仅注入不包布局 | P2 |
| **`colon`/`labelAlign`** | P3 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| 导出 | **`export function FormItem(...)`**，**非 `forwardRef`** |
| 子 `ref` | **保留在子组件**（**`cloneElement` 不吞 ref**；React 19 合并策略以版本为准） |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| 标签与控件 | **`label` 无 `htmlFor`**，点击标签**不一定**聚焦子 **`input`**；建议子 **`Input`** 自带 **`label` prop** 或演进 **`FormItem`**。 |
| 错误播报 | **`error` 的 `<p>`** 当前**无 `role="alert"`**；演进对齐 **`Input` `error`** 行为。 |
| 必填星 | 视觉提示；读屏依赖子 **`required`** 或 **`aria-required`** 透传。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 间距 | **`space-y-1.5`** |
| 文案尺寸 | **`text-xs`**（help/error/extra/status） |
| 色 | 错误红、帮助灰、**`success` emerald**、**`warning` amber** |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| **`Input` + `FormItem`** | **`Input` 不要再传外层重复 `label`**，择一展示。 |
| **`Select`** | **`onChange(string)`** 经 **`extractFieldValue`** 原样入库。 |
| **`Switch`** | **`onChange(boolean)`** 同理。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| 上下文 | 脱离 **`Form`** 抛错。 |
| 注册/卸载 | 挂载后 **`rulesMap[name]`** 存在；卸载后清除。 |
| `dependencies` | 依赖值变化触发 **`useEffect`** 重新 **`setFieldRules`**。 |
| 注入 | 单子 **`Input`** 收到 **`value`**；**`onChange` 后子回调仍触发**。 |
| 非元素 **`children`** | 不注入、不崩。 |
| **`error` vs `help`** | **`error` 优先** 展示。 |

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | 各子组件 + **`rules`** + **`dependencies`** + **`help`/`extra`/`validateStatus`**。 |
| 必含 | **单子元素**、**`extractFieldValue` 表**、与 **`Form.md`** 交叉链接。 |

---

## 14. 风险与开放问题

| 风险 | 缓解 |
| --- | --- |
| **`rules` 内联数组** 每次 render 新引用 → **`useEffect` 频繁执行** | **`useMemo` 稳定 `rules`** 或文档说明。 |
| **`validateStatus='error'`** 与 **`ctx.errors`** 双错误源 | 设计稿明确优先级或演进合并。 |
| **多子/Fragment** | 文档禁止；或演进 **`children` render prop**。 |

---

## 15. 结论

`FormItem` 是 **Form 的字段视图与绑定适配层**：**注册规则、注入 value/onChange/onBlur、展示标签与反馈**；核心价值在 **`cloneElement` + `extractFieldValue`** 与 **`dependencies`** 驱动的规则重挂。**无障碍与 ref 策略**为当前主要缺口，宜按 §7.4、§9 迭代。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | FormItem 结论 |
| --- | --- |
| 职责 | 单字段展示、规则注册、子控件注入 |
| DOM/语义 | div、label（无 htmlFor）、p/div 反馈 |
| 状态与交互 | 依赖 FormContext；blur/change 触发校验 |
| 数据与受控 | 读写字段经 Context |
| API | name、label、rules、dependencies、children、requiredMark、help、extra、validateStatus |
| 类型与 Ref | 无 forwardRef |
| 无障碍 | label 关联弱；error 无 alert |
| 样式与主题 | 间距与语义色 |
| 文档与验证 | 单子、extractFieldValue、rules 引用稳定 |

---

## 附录 B：`onChange` / `onBlur` 调用顺序（实现摘要）

1. **`onChange`**：`extractFieldValue` → **`setFieldValue`** → **`triggerFieldValidation(..., 'onChange', nextValue)`** → **`child.props.onChange?.(eventOrValue)`**  
2. **`onBlur`**：**`triggerFieldValidation(..., 'onBlur')`** → **`child.props.onBlur?.(event)`**

（以仓库 `Form.tsx` 为准。）
