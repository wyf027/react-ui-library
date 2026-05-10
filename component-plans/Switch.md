# Switch 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/form/controls/Switch/Switch.tsx`

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Switch` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/form/controls/Switch` |
| 分类 | Form |
| 依赖 | `cn`、`useControllableState` |
| 关联组件 | **`Checkbox`**（布尔表单语义差异）、**`Form`/`FormItem`**、**`Button`**（同为 `button` 根但语义不同） |

---

## 2. 目标与非目标

### 2.1 目标

1. **即时开关语义**：使用 **`<button type="button">`** + **`role="switch"`** + **`aria-checked`**，表达「开/关」而非「多选项之一」。  
2. **受控 / 非受控**：**`checked`** / **`defaultChecked`** + **`useControllableState<boolean>`**，与 **`Checkbox`** 一致。  
3. **简化回调**：**`onChange?: (checked: boolean) => void`**。  
4. **滑块视觉**：圆角轨道 + 圆形拇指 **`translate-x`** 动画，**`innerChecked`** 驱动背景色与位移。  
5. **禁用**：**`disabled`** + **`opacity-60`**；**`type="button"`** 避免在表单内误提交。

### 2.2 非目标

1. **原生 `checkbox` + `role=switch` 混用**：当前不采用 `input`，避免双重语义。  
2. **`loading`、文案槽 `checkedChildren`**：当前未实现；对标 Ant 可演进。  
3. **尺寸档位 `sm`/`md`/`lg`**：当前固定 **`h-6 w-11`** / **`h-5 w-5`** 拇指；与 **`ComponentSize`** 未对齐。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 功能开关 | 即时生效设置项（与提交型表单 checkbox 区分）。 |
| 表单内布尔 | 与 **`Form`** 字段绑定 **`checked`**；提交前读 boolean。 |
| 列表行内开关 | 注意与行点击冲突；**`stopPropagation`** 由业务处理。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 根节点 | **`<button type="button">`**。 |
| 角色 | **`role="switch"`**。 |
| 状态 | **`aria-checked={innerChecked}`**（布尔，来自受控/非受控 state）。 |
| 拇指 | **`<span>`** 装饰节点，无独立交互；**`aria-hidden`** 未加（可选演进，避免读屏重复「按钮」内子元素）。 |
| 子节点 | 无文案子节点；可见文案由父级 **`aria-label`** / 外部 **`label`** 提供。 |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| 切换 | **`onClick={() => setInnerChecked(!innerChecked)}`**；由 **`useControllableState`** 在受控时仅触发 **`onChange`**，非受控时更新内部值。 |
| 键盘 | **`button`** 默认可 **Space** 激活点击；**Enter** 行为与浏览器一致，文档说明表单内勿与提交冲突。 |
| `disabled` | 原生 **`disabled`**，**`onClick` 不触发**（浏览器行为）。 |

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

- **`checked !== undefined`**：受控。  
- **`defaultChecked`**：非受控初值，默认 **`false`**。

### 6.2 与 `Checkbox` 对比

| 项 | Checkbox | Switch |
| --- | --- | --- |
| 根元素 | `label` + `input[type=checkbox]` | `button` + `role="switch"` |
| 语义 | 勾选框 | 开关 |
| 表单提交 | 原生 checkbox `name` | 需隐藏 `input` 或提交逻辑自行映射（当前无隐藏域） |

---

## 7. API 规范

### 7.1 `SwitchProps`（当前实现）

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `checked` | 受控 | `boolean` | - | `undefined` 非受控 |
| `defaultChecked` | 非受控初值 | `boolean` | `false`（`?? false`） | |
| `onChange` | 变化回调 | `(checked: boolean) => void` | - | |
| `disabled` | 禁用 | `boolean` | - | |
| `className` | 根 `button` 样式 | `string` | - | |
| 继承 | `Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'>` | - | - | 可传 **`aria-label`**、**`id`** 等；**勿覆盖 `type`/`role`**（演进可 Omit） |

### 7.2 视觉（当前实现摘要）

| 状态 | 轨道 | 拇指位移 |
| --- | --- | --- |
| 开 | `bg-brand-500` | `translate-x-5` |
| 关 | `bg-slate-300 dark:bg-slate-600` | `translate-x-0.5` |

尺寸：**`h-6 w-11`** 轨道，**`h-5 w-5`** 圆拇指。

### 7.3 建议演进（可选）

| 属性 | 说明 | 优先级 |
| --- | --- | --- |
| `size` | 与 `ComponentSize` / Button 对齐 | P2 |
| `loading` | 禁用点击 + 指示器 | P2 |
| `checkedChildren` / `unCheckedChildren` | 槽内文案 | P3 |
| 拇指 `aria-hidden` | 减少冗余播报 | P2 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| 接口 | **`SwitchProps`** 继承 **`Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'>`**，扩展 **`checked`/`defaultChecked`/`onChange(boolean)`**。 |
| Ref | **`forwardRef<HTMLButtonElement, SwitchProps>`**，指向 **开关 `button`**。 |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| `role="switch"` + `aria-checked` | 满足开关模式；读屏可获知开/关。 |
| 可见标签 | 组件**无 `label` prop**；须通过 **`aria-label`**、**`aria-labelledby`** 或外层 **`<label>`** 包裹（`htmlFor` 指向 `id`）提供名称。 |
| 焦点 | **`nova-focus-ring`** 与 **Button** 一致策略。 |
| 纯装饰拇指 | 可选 **`aria-hidden`** 于 **`span`**（演进）。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 品牌色 | 开态 **`bg-brand-500`**。 |
| 动效 | **`transition`** + **`transform`**。 |
| 与 Checkbox | 视觉体量不同；同表单内对齐由 **`Flex`/`Space`** 微调。 |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| 表单项 | 左侧文案 + **`Switch`** + **`aria-labelledby`** 指向文案 `id`。 |
| `Form` | 布尔字段映射 **`checked`**；无原生 `name` 时提交需自定义。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| 非受控 | `defaultChecked`，点击切换，`onChange` boolean。 |
| 受控 | 父级 `checked` 驱动，`onChange` 后更新父 state。 |
| `disabled` | 不可点击、`disabled` 属性存在。 |
| a11y | `role="switch"`、`aria-checked` 与视觉一致。 |
| Ref | `HTMLButtonElement`。 |

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | 受控/非受控、`disabled`、**带 `aria-label` / 外部 label**。 |
| 对照 | 与 **`Checkbox`** 选型（枚举勾选 vs 开关）。 |
| 表单 | **`type="button"`** 不提交；与 **`submit` 按钮** 同页布局注意。 |

---

## 14. 风险与开放问题

| 风险 | 缓解 |
| --- | --- |
| **无内置可见标签** | 文档强制 **`aria-label`/`labelledby`** 示例。 |
| **无 `name` 原生提交** | 文档说明与 **`Checkbox`** 提交差异。 |
| **`...props` 覆盖 `role`/`type`** | 演进 Omit 或 dev 警告。 |

---

## 15. 结论

`Switch` 定位为 **`button` + `role="switch"`** 的布尔开关，**受控模型与 `Checkbox` 同构**；与 **Button** 共享 **`HTMLButtonElement`/`type="button"`** 形态但 **语义与无障碍要求不同**。**文档与交付验收须强调可访问名称与表单提交映射**。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | Switch 结论 |
| --- | --- |
| 职责 | 开/关即时状态 |
| DOM/语义 | button、switch、aria-checked |
| 状态与交互 | click 切换、disabled |
| 数据与受控 | checked/defaultChecked、onChange(boolean) |
| API | 继承 Button 属性 omit onChange + checked 三件套 |
| 类型与 Ref | `HTMLButtonElement` |
| 无障碍 | switch/aria-checked、须外部可访问名称 |
| 样式与主题 | 轨道+拇指、brand 开态 |
| 文档与验证 | 与 Checkbox 对照、aria-label、表单提交 |

---

## 附录 B：参考实现片段（当前仓库）

文件：`packages/ui/src/components/form/controls/Switch/Switch.tsx`。

要点：**`useControllableState`**、**`onClick` 取反**、**`role="switch"`**、**`aria-checked={innerChecked}`**、**`type="button"`**。

（以仓库实际代码为准。）
