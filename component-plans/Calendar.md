# Calendar 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/form/pickers/Calendar/Calendar.tsx`

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Calendar` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/form/pickers/Calendar` |
| 分类 | Form（Picker） |
| 依赖 | `cn`、`useMemo`（生成当月日序） |
| 关联组件 | **`DatePicker`**（原生 `input`）、**`Form`/`FormItem`** |

---

## 2. 目标与非目标

### 2.1 目标（与当前实现对齐）

1. **月历展示**：按 **`year`/`month`**（缺省为 **当前本机日期**）展示 **当月天数 1…N**。  
2. **选日回调**：点击某日 **`onChange?.(date)`**，**`date`** 为 **`YYYY-MM-DD`** 字符串（与 **`DatePicker`** 值格式一致）。  
3. **选中高亮**：**`value === date`** 时该日 **`button`** 使用 **`bg-brand-500 text-white`**。  
4. **根容器样式**：圆角边框、浅底、暗色模式；**`className`/`...props`** 作用于 **外层 `div`**。

### 2.2 非目标

1. **与真实「周起始列」对齐的月视图**：当前 **`grid-cols-7`** 在 **星期标题行之后，将第 1 日直接排在第一列**，等价于 **假设每月从周日开始排满整月**；**月初非周日时，日期与星期列错位**（见 §14）。  
2. **上月/下月切换、年选择、范围选**：未实现。  
3. **内置 `useControllableState`**：**无**；**`value` 仅用于高亮**，**不**在组件内写入状态。  
4. **国际化周起始、locale 文案**：星期表头为 **硬编码英文单字母**，**`T`/`S` 重复** 导致 **React `key` 重复**（见 §14）。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 简单内嵌选日 | 父级 **`value` + onChange`** 维护选中态。 |
| 与 **`DatePicker`** 配合 | 弹层内放 **`Calendar`**，选后写父 **`value`**。 |
| 展示型月历 | 不传 **`onChange`**，仅展示（点击无回调）。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 根 | **`<div ref={ref}>`**，标题 **`{y} / {m+1}`** |
| 星期行 | **7 个 `div`**，文案 **`S M T W T F S`** |
| 日期格 | **每个日期一个 `<button type="button">`**，子节点为 **日号（数字）** |
| 网格 | **`grid grid-cols-7 gap-1`** |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| 内部 state | **无**；**`year`/`month`** 仅用 props 或默认 **`now`** |
| 点击 | **`onClick={() => onChange?.(date)}`**；**`date`** 由 **`y,m,day` 零填充拼接** |
| 高亮 | **`active = value === date`**（字符串全等） |

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| 选中态 | **完全由父级 `value` 控制**；组件不持有选中 **state** |
| 值格式 | **`YYYY-MM-DD`**，与 **`DatePicker`** 文档对齐 |
| 空选 | 父级不传 **`value`** 或 **`undefined`** → **无高亮** |

---

## 7. API 规范

### 7.1 `CalendarProps`（当前实现）

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `year` | 年 | `number` | **当前年** | `year ?? now.getFullYear()` |
| `month` | 月（**0-based**，与 `Date` 一致） | `number` | **当前月** | `month ?? now.getMonth()` |
| `value` | 选中日期字符串 | `string` | - | 与 **`date`** 全等比较高亮 |
| `onChange` | 选日回调 | `(date: string) => void` | - | **非** DOM `onChange`；根 **`HTMLAttributes` 的 `onChange` 已 Omit** |
| `className` | 根容器 | `string` | - | |
| 继承 | `Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>` | - | - | 其余 div 属性透传根 |

### 7.2 `date` 拼接规则

```txt
`${y}-${String(m + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
```

### 7.3 建议演进（可选）

| 能力 | 优先级 |
| --- | --- |
| **首行空白格对齐真实星期** | P0（修正月视图语义） |
| **唯一 `key`（周头用 index）+ i18n** | P0 |
| **上月/下月、`validRange`、禁用日** | P1 |
| **`useControllableState` 或 `defaultValue`** | P2 |
| **`role="grid"` + `gridcell`/`columnheader`** | P1 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| Ref | **`forwardRef<HTMLDivElement, CalendarProps>`** → **根 `div`** |
| 日期 `button` | **无 ref 暴露** |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| 按钮 | 每个日期 **`type="button"`**，可读 **日号**；**缺 `aria-selected`/`aria-pressed`**（演进）。 |
| 网格 | **未**使用 **`role="grid"`**；读屏对「星期-日期」关系在 **错位布局** 下更易误导（见 §2.2）。 |
| 选中 | 仅靠颜色；建议 **`aria-selected={active}`** 或 **`aria-current="date"`**（演进）。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 根 | `rounded-lg border ... p-3` |
| 标题 | `text-sm font-medium` |
| 日按钮 | `rounded py-1.5 text-xs`；激活 **`bg-brand-500`** |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| 父级状态 | **`value` + `onChange`** 与 **`DatePicker`** 或 **`Form`** 字段同步。 |
| **`FormItem` + `Calendar`** | 与 **`Slider`/`Rate`** 类似：**`onChange(date: string)`** 与 **`FormItem` 事件型 `onChange`** 不兼容；需 **包装** 或 **手写 `setFieldValue`**。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| 默认年月 | 无 props 时使用 **当前年月**。 |
| 点击 | **`onChange`** 收到 **`YYYY-MM-DD`**。 |
| 高亮 | **`value`** 与某日字符串一致时该类名激活。 |
| 二月 | 闰年/平年 **天数** 由 **`getDaysInMonth`** 正确。 |
| Ref | **`HTMLDivElement`**。 |

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | 受控 **`value`**、切换 **`year/month`**（父级控制）、与 **`DatePicker`** 联动草图。 |
| 必须声明 | **星期列错位**、**周头 key 重复**、**无翻页**（§14）。 |

---

## 14. 风险与开放问题

| 风险 | 说明 |
| --- | --- |
| **月历与星期不对齐** | 第 1 日始终从网格第一列开始，**非周日开始的月份会错位**。 |
| **周头 `key={d}` 重复** | **`T`、`S` 各出现两次**，React **key 不唯一** 警告与潜在更新 bug。 |
| **无内部受控** | 仅 **`value` 高亮**；父未更新 **`value`** 时点击仅 **`onChange`** 无视觉反馈。 |

---

## 15. 结论

`Calendar` 当前为 **轻量「月-日按钮栅格」**：适合 **原型或与父级强受控联动**；**生产级全功能月历**需优先解决 **§14 对齐与 key**，再补 **翻页、禁用、ARIA、国际化**。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | Calendar 结论 |
| --- | --- |
| 职责 | 展示一月、点选 YYYY-MM-DD |
| DOM/语义 | div + 星期 div + button 日格 |
| 状态与交互 | 无内部 state；点击 onChange |
| 数据与受控 | value 父控高亮 |
| API | year、month、value、onChange(date)、omit div onChange |
| 类型与 Ref | HTMLDivElement |
| 无障碍 | 弱；待 grid/selected |
| 样式与主题 | border、brand 选中 |
| 文档与验证 | 错位与 key、FormItem |

---

## 附录 B：参考实现片段（当前仓库）

文件：`packages/ui/src/components/form/pickers/Calendar/Calendar.tsx`。

要点：**`getDaysInMonth`**、**`days` useMemo**、**`date` 字符串**、**`value === date`**。

（以仓库实际代码为准。）
