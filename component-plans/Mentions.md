# Mentions 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/form/controls/Mentions/Mentions.tsx`

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Mentions` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/form/controls/Mentions` |
| 分类 | Form（Controls） |
| 依赖 | `cn`、`useControllableState` |
| 关联组件 | **`Input`** / **`Textarea` 形态**、**`Form`/`FormItem`**、（对标生态）**`Mentions` 下拉联想** |

---

## 2. 目标与非目标

### 2.1 目标

1. **多行文本输入**：根控件为 **`<textarea>`**，**`TextareaHTMLAttributes`** 透传（排除 **`value` / `defaultValue` / `onChange`** 三字段，由组件接管）。  
2. **受控 / 非受控字符串**：**`useControllableState<string>`** + 对外 **`onChange?: (value: string) => void`**，与 **`Input`** 等「值型 `onChange`」一致。  
3. **占位与样式**：默认 **`placeholder = 'Type @ to mention...'`**；**`nova-focus-ring`** + 边框、暗色、**`min-h-24`**。  
4. **静态建议文案**：当 **`options` 非空** 时，在输入框下方渲染一行 **`Suggestions: @value1  @value2...`**（由 **`options[].value`** 拼接，见 §7.1）。

### 2.2 非目标（与常见 Mentions 控件的差距）

1. **`@` 触发、光标处解析、下拉列表、键盘上下选择**：当前 **均未实现**；**无** `@` 检测、**无** 浮层、**无** 插入逻辑与 **`options` 点击插入**。  
2. **`prefix` 多前缀、`split`、异步 `loadOptions`**：当前 **无**。  
3. **`MentionsOption.label` 展示**：类型上存在 **`label?: string`**，**实现中未使用**（仅 **`value`** 参与 hint，见 §14）。  
4. **高亮已 mention 文本**：当前 **无**（纯 `textarea` 文本）。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 需要多行 + 文案提示「可 @ 的用户/实体」 | 用 **`options`** 生成底部 **Suggestions**，引导用户手打 **`@xxx`**。 |
| 与 **真正 Mentions** 对齐 | 需 **另实现或替换** 为带弹层、解析、插入的组件；当前实现为 **占位级**。 |
| 表单字段 | 可传 **`name`/`id`/`required`** 等至 **`textarea`**（经 **`...props`**）；与 **`FormItem`** 注意 **`onChange` 覆盖顺序**（§11）。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 外层 | **`<div className="space-y-1">`**，**无 `ref`**（**`ref` 仅转发到 `textarea`**）。 |
| 输入 | **`<textarea>`**：**`value={innerValue}`**、**`onChange`** 内调用 **`setInnerValue(event.target.value)`**。 |
| 建议区 | **`options` 拼接非空** 时 **`<div className="text-xs text-slate-500 ...">Suggestions: {hint}</div>`**。 |
| 语义 | **无** `role="combobox"` / **无** `aria-autocomplete`；语义等同 **普通多行文本框** + 辅助说明。 |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| 值 | **`innerValue`** 来自 **`useControllableState`**。 |
| 输入 | 原生 **`textarea`** 输入，**`onChange` → `setInnerValue(event.target.value)`**。 |
| **`options`** | **只读参与 `useMemo` 生成 `hint`**，**不改变** 输入行为或插入逻辑。 |

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| 受控 | **`value !== undefined`**（与 `useControllableState` 约定一致）。 |
| 非受控 | **`defaultValue`** 默认 **`''`**。 |
| 对外 **`onChange`** | **`(value: string) => void`**，**非** **`ChangeEvent`**。 |

---

## 7. API 规范

### 7.1 `MentionsOption`

| 字段 | 说明 | 类型 | 必填 | 当前实现 |
| --- | --- | --- | --- | --- |
| `value` | 建议中 **`@` 后的标识** | `string` | 是 | 用于 **`hint`**：`@${opt.value}` |
| `label` | 展示用文案（预期） | `string` | 否 | **未使用** |

### 7.2 `MentionsProps`（当前实现）

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `value` | 受控文本 | `string` | - | |
| `defaultValue` | 非受控初值 | `string` | `''` | |
| `onChange` | 变更 | `(value: string) => void` | - | |
| `options` | 建议列表 | `MentionsOption[]` | `[]` | 仅生成底部文案 |
| `placeholder` | 占位 | `string` | `'Type @ to mention...'` | |
| `className` | 样式 | `string` | - | 作用在 **`textarea`** |
| 继承 | `Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' \| 'defaultValue' \| 'onChange'>` | - | - | 其余落在 **`textarea`**（**`{...props}` 在最后**，见 §11） |

### 7.3 视觉（当前实现摘要）

| 区域 | 类名要点 |
| --- | --- |
| `textarea` | **`nova-focus-ring min-h-24 w-full rounded-md border ... px-3 py-2 text-sm`** |
| Suggestions | **`text-xs text-slate-500 dark:text-slate-400`** |

### 7.4 建议演进（可选）

| 能力 | 优先级 |
| --- | --- |
| **`@` 解析 + 浮层 + 键盘选择 + 插入** | P1（产品定义 Mentions 时） |
| **`label` 参与 hint 或与下拉一致** | P2 |
| **`onChange` 与 `{...props}` 合并**，避免覆盖受控逻辑 | P2 |
| **`prefix` / 异步 options`** | P2 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| Ref | **`forwardRef<HTMLTextAreaElement, MentionsProps>`** → **`textarea`** |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| 输入 | 继承 **`textarea`** 与 **`label`**（由 **`FormItem`** 或外部 **`label htmlFor`** 关联 **`id`**）。 |
| 建议行 | 纯文本 **`div`**；若演进为动态列表，建议 **`role="listbox"`** 等模式。 |
| 占位 | 默认英文占位；业务可覆盖 **`placeholder`** 做 i18n。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 焦点 | **`nova-focus-ring`**（与 **`Input`** 等同项目 token）。 |
| 暗色 | **`dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100`**。 |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| **`FormItem` + `Mentions`** | 若 **`FormItem`** 向子节点注入 **`onChange(event)`** 且通过 **`cloneElement`/`props` 合并到 `textarea`**，因当前 JSX 中 **`{...props}` 写在显式 `onChange` 之后**，**外部 `onChange` 会覆盖内部 `onChange`**，可能导致 **`innerValue` 不同步**。集成时应 **避免** 让未合并的 **`onChange`** 覆盖子组件，或 **由业务包装** 在包装层统一 **`setInnerValue` + `form.setFieldValue`**。 |
| **与真实 Mentions 库共存** | 可将本组件视为 **过渡占位**；上线 Mentions 能力时替换实现或拆分子包。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| 非受控 | 输入后 **`onChange`** 收到完整字符串。 |
| 受控 | 父 **`value`** 与 **`textarea`** 显示一致。 |
| **`options`** | 非空时底部出现 **`Suggestions: @a  @b`**；**空数组** 无建议行。 |
| **`label`** | 当前 **不出现** 于 hint（若产品依赖 **`label`**，属 gap）。 |
| Ref | **`HTMLTextAreaElement`**。 |

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | 受控/非受控、带 **`options`** 的 hint、**明确写出「无 @ 弹层」** 避免误用。 |
| 说明 | **`MentionsOption.label` 未接线**、**`FormItem` `onChange` 顺序**、演进路线图。 |

---

## 14. 风险与开放问题

| 风险 | 说明 |
| --- | --- |
| **命名与能力不符** | 组件名 **Mentions** 易让人期待 **Ant Design Mentions** 级能力；需在文档与 changelog 标明 **当前为 textarea + 静态建议**。 |
| **`label` 死字段** | 类型存在、实现未用，易造成 **误用与评审误解**。 |
| **`{...props}` 覆盖 `onChange`** | 与 **`FormItem`** 或任意 HOC 注入冲突风险（§11）。 |
| **国际化** | 默认 **`Suggestions:`** 与 **`placeholder`** 为英文硬编码在默认值层；业务通过 **`placeholder`** 覆盖；**`Suggestions:` 前缀** 无 props 定制（演进可加 **`formatSuggestionHint`** 或 **`locale`**）。 |

---

## 15. 结论

`Mentions` 当前为 **受控/非受控多行文本框** + **`options` 驱动的静态 `@value` 建议文案**，**不具备** `@` 触发、下拉、插入、高亮等 **典型 Mentions 交互**。与 **Button** 无继承关系；与 **`Input`** 同属 **字符串 + `useControllableState`** 家族，但 DOM 为 **`textarea`**。落地完整 Mentions 前，建议文档与类型上 **收敛预期** 或 **迭代实现**。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | Mentions 结论 |
| --- | --- |
| 职责 | 多行文本 + 静态 @ 建议提示 |
| DOM/语义 | `div` + `textarea` + 可选 hint `div` |
| 状态与交互 | 原生输入；无 @ 菜单 |
| 数据与受控 | `value`/`defaultValue`/`onChange(string)` |
| API | `options`/`placeholder`/Omit textarea 三字段 |
| 类型与 Ref | `HTMLTextAreaElement` |
| 无障碍 | 等同 textarea；无 combobox |
| 样式与主题 | `nova-focus-ring`、min-h-24 |
| 文档与验证 | 能力边界、FormItem、label 未用 |

---

## 附录 B：参考实现片段（当前仓库）

文件：`packages/ui/src/components/form/controls/Mentions/Mentions.tsx`。

要点：**`useControllableState<string>`**、**`hint = options.map((opt) => \`@${opt.value}\`).join('  ')`**、**`{...props}` 置于 `textarea` 末尾**。

（以仓库实际代码为准。）
