# Segmented 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/form/controls/Segmented/Segmented.tsx`

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Segmented` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/form/controls/Segmented` |
| 分类 | Form（Controls） |
| 依赖 | `cn`、`useControllableState` |
| 关联组件 | **`Button`**（分段项同为 **`type="button"`**）、**`Radio`**（单选语义差异）、**`Form`/`FormItem`** |

---

## 2. 目标与非目标

### 2.1 目标

1. **互斥单选（值域为 `string`）**：在 **`options`** 中通过 **`value`** 标识当前选中项，**`current === item.value`** 时应用选中样式。  
2. **受控 / 非受控**：**`value` / `defaultValue`** + **`useControllableState<string>`** + **`onChange(value: string)`**。  
3. **非受控默认首项**：**`defaultValue`** 默认为 **`options[0]?.value ?? ''`**（**`options` 为空** 时为 **`''`**）。  
4. **项级禁用**：**`SegmentedOption.disabled`** 控制单项 **`button`** 的 **`disabled`** 与 **`opacity-50`**。  
5. **根容器透传**：除 **`onChange`** 外继承 **`HTMLAttributes<HTMLDivElement>`**（**`id`/`data-*`/`aria-*`** 等落在容器 **`div`** 上）。

### 2.2 非目标

1. **整组禁用 `disabled`**：当前 **`SegmentedProps`** **无** 根级 **`disabled`**；需业务对容器包一层或逐项标记。  
2. **键盘方向键 / 漫游 tabindex**：当前 **无** **`role="radiogroup"`**、**`aria-orientation`**、**左右键切项** 等模式。  
3. **尺寸档位、块级 `block`、图标槽 `icon`**：当前固定 **`text-sm`**、**`px-3 py-1.5`**；与 **`ComponentSize`** 未对齐。  
4. **泛型 `value: T`**：当前选项值 **固定 `string`**。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 视图切换、筛选维度 | 如「日/周/月」切换，**`value` 驱动下游数据请求**。 |
| 轻量单选替代 Radio | 视觉更紧凑；**语义上仍为「选一」**，若需表单 **`name`/`required`** 需业务自行桥接（见 §11）。 |
| 与图表/表格联动 | **`onChange`** 后更新 **`value`** 或触发请求。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 根节点 | **`<div ref={ref} className={cn('inline-flex rounded-lg border ... p-1', className)}>`**，**`inline-flex`** 横向排布子项。 |
| 分段项 | **`<button type="button">`**，每项一个；**`key={item.value}`**（**`value` 在 `options` 内应唯一**，否则 React key 冲突）。 |
| 选中态 | **`className` 条件**：**`current === item.value`** → **`bg-brand-500 text-white`**；否则 **`text-slate-700 hover:bg-slate-100`**（暗色对应 **`dark:`** 变体）。 |
| 单选组 ARIA | 当前 **未** 使用 **`role="radiogroup"`** / **`aria-checked`** / **`aria-pressed`**；读屏依赖各 **`button`** 文案（**`label`**）（见 §9）。 |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| 当前值 | **`useControllableState<string>({ value, defaultValue, onChange })`** → **`current`**。 |
| 选中 | **`onClick={() => setCurrent(item.value)}`**；**`item.disabled`** 时 **`button`** **`disabled`**，点击无效。 |
| 键盘 | 各 **`button`** 默认可 **Tab** 聚焦、**Space/Enter** 激活（与 **`Button`** 一致）；**无** 箭头键在组内移动焦点。 |

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| 受控 | **`value !== undefined`**（与 `useControllableState` 约定一致）。 |
| 非受控 | **`defaultValue`** 缺省为 **首项 `value`** 或 **`''`**。 |
| **`onChange`** | **`(value: string) => void`**，**非** DOM **`ChangeEvent`**。 |

---

## 7. API 规范

### 7.1 `SegmentedOption`

| 字段 | 说明 | 类型 | 必填 |
| --- | --- | --- | --- |
| `label` | 展示内容 | `ReactNode` | 是 |
| `value` | 选项值（建议唯一） | `string` | 是 |
| `disabled` | 单项禁用 | `boolean` | 否 |

### 7.2 `SegmentedProps`（当前实现）

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `options` | 选项列表 | `SegmentedOption[]` | - | **空数组** 时仅渲染空容器；**`defaultValue` 为 `''`** |
| `value` | 受控当前值 | `string` | - | |
| `defaultValue` | 非受控初值 | `string` | `options[0]?.value ?? ''` | |
| `onChange` | 变更 | `(value: string) => void` | - | |
| `className` | 根 **`div`** 样式 | `string` | - | |
| 继承 | `Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>` | - | - | |

### 7.3 视觉（当前实现摘要）

| 区域 | 类名要点 |
| --- | --- |
| 容器 | **`rounded-lg border border-slate-200 bg-white p-1`**，暗色 **`dark:border-slate-700 dark:bg-slate-900`** |
| 选中项 | **`bg-brand-500 text-white`** + **`rounded-md`** |
| 未选中 | **`rounded-md px-3 py-1.5 text-sm transition`** + hover 背景 |
| 禁用项 | **`item.disabled && 'opacity-50'`**（与原生 **`disabled`** 并用） |

### 7.4 建议演进（可选）

| 能力 | 优先级 |
| --- | --- |
| **`disabled` 整组`** | P2 |
| **`role="radiogroup"` + `aria-checked` + 方向键`** | P2 |
| **尺寸 / `block` 满宽** | P2 |
| **泛型 `SegmentedProps<T extends string | number>`** | P3 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| Ref | **`forwardRef<HTMLDivElement, SegmentedProps>`** → **外层容器 `div`** |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| 当前 | 多个 **`button`**，选中态 **仅视觉**（**`bg-brand-500`**），**无 `aria-pressed`/`aria-selected`**。 |
| 建议文档 | 为根容器补充 **`aria-label`** 描述组用途；各 **`label`** 文案自解释。 |
| 演进 | **`radiogroup`** + **`roving tabindex`** 或 **`aria-pressed`** 与 **`Button`** 技术方案对齐评审。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 品牌色 | 选中态 **`bg-brand-500`**，与 **`Switch`** 等表单控件一致。 |
| 暗色 | 容器边框/背景、未选中文字与 hover 使用 **`dark:`** 变体。 |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| **`FormItem` + `Segmented`** | **`onChange(value: string)`** 与 **`FormItem`** 常见 **`onChange(event)`** 不兼容；需 **包装组件** 将 **`value` 写入 `setFieldValue`**，或 **不用 `FormItem` 的自动注入**（与 **`ColorPicker`/`Slider`** 同类问题）。 |
| **原生表单提交** | 当前 **无** 隐藏 **`input[type=hidden]`**；提交值需业务从 **`value` state** 映射。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| 非受控 | 默认选中首项；点击第二项 **`onChange`** 为新 **`value`**。 |
| 受控 | 父 **`value`** 与视觉选中一致；**`options` 变更** 后若 **`value`** 仍合法应保持。 |
| 项禁用 | **`disabled`** 项不可点击、**`opacity-50`**。 |
| 边界 | **`options=[]`**：无子按钮；**`value` 与任一 `item.value` 不匹配**：可无视觉选中（当前实现未校验非法 **`value`**）。 |
| Ref | **`HTMLDivElement`**。 |

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | 受控/非受控、带禁用项、与 **`Form`** 手动绑定示例。 |
| 说明 | **`value` 唯一**、**`FormItem` 集成**、**无障碍现状与演进**。 |

---

## 14. 风险与开放问题

| 风险 | 说明 |
| --- | --- |
| **`value` 重复** | **`key={item.value}`** 导致 React 警告与状态异常；文档与类型层约束 **唯一 `value`**。 |
| **受控 `value` 非法** | 无 **`current` 回退**；可能出现 **无选中高亮** 仍显示旧交互预期。 |
| **a11y 不完整** | 多 **`button`** 无组角色时，部分读屏用户理解成本较高。 |

---

## 15. 结论

`Segmented` 为 **`inline-flex` 容器 + 多个 `type="button"` 分段** 的 **字符串单选** 控件，**`useControllableState`** 管理 **`value`**，**`SegmentedOption`** 支持 **`ReactNode` 标签** 与 **项级 `disabled`**。与 **Button** 无继承关系，分段项复用 **按钮交互模型**；**整组禁用、键盘漫游、强 a11y 单选组** 不在当前实现范围。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | Segmented 结论 |
| --- | --- |
| 职责 | 多选一，`string` 值域 |
| DOM/语义 | `div` + 多个 `button` |
| 状态与交互 | click 切换；项 `disabled` |
| 数据与受控 | `value`/`defaultValue`/`onChange(string)` |
| API | `options` + `SegmentedOption` |
| 类型与 Ref | `HTMLDivElement` |
| 无障碍 | 弱；多 button，无 radiogroup |
| 样式与主题 | brand 选中、slate 边框与暗色 |
| 文档与验证 | FormItem、唯一 value、空 options |

---

## 附录 B：参考实现片段（当前仓库）

文件：`packages/ui/src/components/form/controls/Segmented/Segmented.tsx`。

要点：**`useControllableState<string>`**、**`options.map` → `button`**、**`current === item.value`** 选中样式。

（以仓库实际代码为准。）
