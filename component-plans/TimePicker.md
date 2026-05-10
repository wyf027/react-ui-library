# TimePicker 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/form/pickers/TimePicker/TimePicker.tsx`

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `TimePicker` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/form/pickers/TimePicker` |
| 分类 | Form（Picker） |
| 依赖 | `cn`（**未**使用 `useControllableState`） |
| 关联组件 | **`DatePicker`**（日期/时间组合场景）、**`Input`**（若需手动键入时间）、**`Form`/`FormItem`** |

---

## 2. 目标与非目标

### 2.1 目标

1. **面板选时**：点击触发条打开面板；两列滚动列表 **小时** + **分钟**，**`onMouseDown`** 更新 **`"HH:mm"`** 字符串（**`padStart(2,'0')`**）。  
2. **受控 / 非受控（混合）**：**`val = controlledValue ?? internal`**，**`internal`** 来自 **`useState(defaultValue)`**；**`update(v)`** 为 **`setInternal(v)` + `onChange?.(v)`**。  
3. **`format: '24' | '12'`**：**`'24'`** 小时列为 **0–23**；**`'12'`** 小时列为 **1–12**（**无上午/下午**，见 §2.2）。  
4. **尺寸**：**`size?: 'sm' | 'md' | 'lg'`** → **`h-8` / `h-10` / `h-11`**，作用在 **触发条 `div`**。  
5. **关闭逻辑**：选 **分钟** 后 **`setOpen(false)`**；**`document` `mousedown` 在 `wrapperRef` 外** 关闭；选 **小时** **不** 自动关闭面板。

### 2.2 非目标

1. **`Date` 对象 / `dayjs` 值类型**：当前 **`value` 仅为 `string`**（**`"HH:mm"`** 约定），**无** 时区与日期绑定。  
2. **12 小时制的 AM/PM**：**`format === '12'`** 只影响 **小时选项范围**，**值字符串仍为 24h 样式拼接**（如 **`"02:30"`** 与 **`"14:30"`** 由 **`selH`/`selM`** 决定），**无** meridiem 列。  
3. **秒、毫秒、范围 `disabledTime`**：当前 **无**。  
4. **键盘操作、焦点陷阱、`role`/`aria` 完整 combobox**：当前 **弱**（见 §9）。  
5. **手动输入时间**：触发区为 **`span` 文案 + 图标**，**非** `<input>`。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 表单里选「当天内的时刻」 | 父组件持有 **`"HH:mm"`** 字符串，与日期字段拼成完整时刻（业务侧）。 |
| 与 **`DatePicker`** 分工 | **`TimePicker`** 不负责日历；组合由页面布局或后续 **DateTime** 封装。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 外层 | **`<div ref={wrapperRef} className={cn('relative inline-block', className)} {...props}>`** — **click-outside** 用；**`className` 与继承属性在此层**。 |
| 触发条 | **内层 `<div ref={ref} ... onClick={() => !disabled && setOpen(!open)}>`** — **`forwardRef` 指向此处**；展示 **`val || placeholder`** 与 **`🕐`**。 |
| 面板 | **`open`** 时 **`absolute z-50`** 的 **`flex`** 容器，两列 **`overflow-auto h-48 w-14`**。 |
| 选项 | **`div`** + **`onMouseDown`**（避免 **`blur`/点击顺序** 问题）。 |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| 打开/收起 | 触发条 **`onClick`** 切换 **`open`**（**`disabled`** 时不切换）。 |
| 选小时 | **`update(\`${pad(h)}:${pad(selM ?? 0)}\`)`**，**不关面板**。 |
| 选分钟 | **`update(\`${pad(selH ?? 0)}:${pad(m)}\`)`** + **`setOpen(false)`**。 |
| 解析当前值 | **`[selH, selM] = val ? val.split(':').map(Number) : [null, null]`** — **`val`** 需含 **`:`** 且两段可 **`Number`** 解析（见 §14）。 |

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| 展示值 | **`val = controlledValue ?? internal`**。 |
| 非受控 | **`defaultValue`** 默认 **`''`**；**`useState(defaultValue)`** 初始化。 |
| **`onChange`** | **`(value: string) => void`**，**非** DOM 事件。 |
| **与 `DatePicker` 等对齐** | 若项目其它 Picker 使用 **`useControllableState`**，本组件 **实现风格不一致**（演进可选）。 |

---

## 7. API 规范

### 7.1 `TimePickerProps`（当前实现）

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `value` | 受控时间串 | `string` | - | 建议 **`"HH:mm"`** |
| `defaultValue` | 非受控初值 | `string` | `''` | |
| `format` | 小时列范围 | `'12' \| '24'` | `'24'` | **无 AM/PM** |
| `disabled` | 禁用 | `boolean` | `false` | 禁止打开切换 |
| `placeholder` | 空值占位 | `string` | `'选择时间'` | |
| `onChange` | 变更回调 | `(value: string) => void` | - | |
| `size` | 触发条高度 | `'sm' \| 'md' \| 'lg'` | `'md'` | |
| `className` | 样式 | `string` | - | **外层 `wrapper`**（见 §4） |
| 继承 | `Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>` | - | - | 落在外层 **`div`** |

### 7.2 视觉（当前实现摘要）

| 区域 | 类名要点 |
| --- | --- |
| 触发条 | **`inline-flex w-40 ... border ... px-3`**；空值时主文案 **`text-slate-400`** |
| 面板 | **`shadow-lg`**、两列 **`h-48 w-14 overflow-auto`** |
| 选中项 | **`bg-brand-500 text-white`** |

### 7.3 建议演进（可选）

| 能力 | 优先级 |
| --- | --- |
| **`useEffect(..., [open])`** 修正 document 监听 | P1 |
| **`useControllableState`**、`Date`/`number` 值类型 | P2 |
| **12h + AM/PM** 或文档明确弃用 **`format='12'`** | P1 |
| **键盘、`aria-expanded`、焦点管理** | P2 |
| **选小时后自动关 / `needConfirm`** | P3 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| `forwardRef` | **`HTMLDivElement`** → **内层触发条 `div`**（**非** 最外层 **`wrapperRef` 节点**） |
| **`wrapperRef`** | 内部用于 **click-outside**，**不** 对外暴露 |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| 触发 | **`div` + `onClick`**，**非** 原生 **`<button>`** / **`<input>`**；键盘 **Enter/Space** 是否触发依赖浏览器对 **`div` 可聚焦性** 的默认行为 — **通常需 `tabIndex={0}` + 键盘处理**（当前 **无**）。 |
| 图标 | **`🕐`** 装饰，**无 `aria-hidden`** 包装建议（演进）。 |
| 面板 | **无** **`role="listbox"`** / **`aria-activedescendant`** 等。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 品牌 | 选中项 **`bg-brand-500`**，hover **`brand-50` / `brand-900/20`**。 |
| 暗色 | 触发条与面板均有 **`dark:`** 变体。 |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| **`FormItem` + `TimePicker`** | **`onChange(value: string)`** 与 **`FormItem`** 常见 **`onChange(event)`** **不兼容**；需 **包装** 或手写 **`setFieldValue`**。 |
| **与日期组合** | 业务将 **`"HH:mm"`** 与日期部分合并为 **`Date`/ISO** 等。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| **24h** | 可选 **00:00–23:59** 形式字符串；选分后关闭。 |
| **12h** | 小时列 **01–12**；**`value` 与 `format` 混用**（如 **`value="14:00"`** + **`format='12'`**）时 **高亮可能无匹配**（见 §14）。 |
| **受控** | 父 **`value`** 与展示一致。 |
| **外部点击** | **`mousedown` 外区** 关闭。 |
| **Ref** | **`ref.current`** 为 **触发条 `div`**。 |

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | 受控/非受控、**`size`**、**`format`** 差异与限制。 |
| 说明 | **值格式 `HH:mm`**、**`format='12'` 无 AM/PM**、**`useEffect` 依赖**（§14）、**Ref 挂载点**。 |

---

## 14. 风险与开放问题

| 风险 | 说明 |
| --- | --- |
| **`useEffect` 无依赖数组** | 与 **`AutoComplete`** 相同：每次渲染执行 effect；**`open` 为 true** 时反复 **remove/add `mousedown`**，应改为 **`[open]`**（或等价）以符合预期与性能。 |
| **`format='12'` 语义不完整** | 无 **AM/PM**，与常见「12 小时制」产品定义 **不一致**；易误解 **下午时刻**。 |
| **`val.split(':').map(Number)`** | **`"12"`**、**`"abc"`**、**`"25:99"`** 等 **非规范串** 导致 **`selH`/`selM`** 为 **`NaN`** 或错位，**高亮与后续 `update` 行为异常**；宜在文档约定 **严格 `HH:mm`** 或演进校验。 |
| **小时列 `key={h}`** | **`format='24'`** 时 **0–23** 唯一；**`'12'`** 时 **1–12** 唯一；无冲突。 |

---

## 15. 结论

`TimePicker` 为 **字符串 `HH:mm` + 双列滚动面板 + click-outside** 的轻量时间选择器；**`format`** 仅影响 **小时枚举**，**不** 提供完整 12 小时制语义。**`forwardRef`** 落在 **触发条** 而非最外层容器。与 **Button** 无继承关系；与 **`DatePicker`** 可组合为日期时间场景（业务侧拼接）。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | TimePicker 结论 |
| --- | --- |
| 职责 | 选一天内时刻，`string` |
| DOM/语义 | wrapper `div` + 触发 `div` + 面板两列 `div` |
| 状态与交互 | open、click、mousedown 选时 |
| 数据与受控 | `value`/`defaultValue`/`onChange(string)` |
| API | `format`、`size`、`disabled`、`placeholder` |
| 类型与 Ref | `HTMLDivElement`（触发条） |
| 无障碍 | 弱；div 触发无标准 combobox |
| 样式与主题 | w-40 触发、brand 选中 |
| 文档与验证 | 12h 限制、字符串格式、Effect |

---

## 附录 B：参考实现片段（当前仓库）

文件：`packages/ui/src/components/form/pickers/TimePicker/TimePicker.tsx`。

要点：**`wrapperRef` vs `ref`**、**`hours`/`minutes` 数组**、选分钟后 **`setOpen(false)`**、**`useEffect`** 注册 **`mousedown`**。

（以仓库实际代码为准。）
