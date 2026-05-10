# Slider 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/form/controls/Slider/Slider.tsx`

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Slider` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/form/controls/Slider` |
| 分类 | Form |
| 依赖 | `cn`、`useControllableState` |
| 关联组件 | **`Input`**（数值展示可配合）、**`Form`/`FormItem`**、**`Progress`**（只读进度 vs 可调滑块） |

---

## 2. 目标与非目标

### 2.1 目标

1. **区间数值选择**：基于原生 **`<input type="range">`**，**`min`/`max`/`step`** 可配。  
2. **受控 / 非受控**：**`value`/`defaultValue`**（**`number`**）+ **`useControllableState`** + **`onChange(value: number)`**。  
3. **当前值展示**：**`showValue`** 为 **`true`** 时在右侧 **`span`** 显示 **`innerValue`**。  
4. **品牌强调色**：**`accent-brand-500`** 驱动轨道/拇指主色（浏览器实现相关）。  
5. **属性透传**：除冲突项外 **`InputHTMLAttributes`** 落在 **`range` input** 上（如 **`name`/`id`/`aria-*`**）。

### 2.2 非目标

1. **双滑块范围选择（range slider）**：当前 **单值**；双柄需独立组件或演进。  
2. **刻度 `marks`、竖向 `vertical`、tooltip**：未实现。  
3. **非线性步进**：仅原生 **`step`**。  
4. **外层 `ref` 指向容器**：**`ref` 仅转发到 `input`**（见 §8）。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 音量、透明度、百分比 | **`min=0 max=100`**。 |
| 评分权重 | 自定义 **`step`**。 |
| 表单内数值 | 与 **`FormItem`** 组合时 **`extractFieldValue`** 对 **`ChangeEvent`** 取 **`value` 为 string**——**`Slider` 的 `onChange` 为 number**，**`FormItem` 默认 `cloneElement` 与 `Input` 事件模型一致**，**直接包 `Slider` 可能类型/值不匹配**，需 **包装子组件** 或 **演进 `FormItem`**（见 §11）。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 根布局 | **`<div className="flex items-center gap-3">`**（**无 ref**） |
| 控件 | **`<input type="range">`**，`**ref**` 指向此处 |
| 数值 | **`showValue`** 时 **`<span className="w-10 text-right text-sm ...">`** 显示 **`innerValue`** |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| 内部值 | **`useControllableState<number>({ value, defaultValue, onChange })`**，**`innerValue`** 为 hook 的 **`state`** |
| 变更 | **`onChange={(e) => setInnerValue(Number(e.target.value))}`**；**`Number(...)`** 依赖浏览器 **`value` 字符串** 为合法数字 |
| `disabled` | 透传 **`input`** |

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| 受控 | **`value !== undefined`**（**`value` 为 `number`**） |
| 非受控 | **`defaultValue`** 默认 **`0`** |
| 回调 | **`onChange?: (value: number) => void`** 由 **`useControllableState`** 在 **`setInnerValue`** 时触发 |

---

## 7. API 规范

### 7.1 `SliderProps`（当前实现）

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `min` | 最小值 | `number` | `0` | 原生 **`min`** |
| `max` | 最大值 | `number` | `100` | 原生 **`max`** |
| `step` | 步长 | `number` | `1` | 原生 **`step`** |
| `value` | 受控值 | `number` | - | `undefined` 非受控 |
| `defaultValue` | 非受控初值 | `number` | `0` | |
| `onChange` | 值变化 | `(value: number) => void` | - | |
| `showValue` | 是否显示当前数 | `boolean` | `true` | |
| `disabled` | 禁用 | `boolean` | - | |
| `className` | 样式 | `string` | - | 作用在 **`input`** |
| 继承 | `Omit<InputHTMLAttributes<HTMLInputElement>, 'type' \| 'value' \| 'defaultValue' \| 'onChange'>` | - | - | **`type` 固定 `range`** |

### 7.2 样式（当前实现）

- **`input`**：**`h-2 w-full cursor-pointer accent-brand-500`** + **`className`**  
- **数值 `span`**：固定 **`w-10`** 右对齐，避免数字位数抖动可演进 **`tabular-nums`**

### 7.3 建议演进（可选）

| 能力 | 优先级 |
| --- | --- |
| **双滑块 range** | P2 |
| **`marks` / `vertical` / tooltip** | P2 |
| **`getValueLabel`** 格式化展示 | P3 |
| **根 `forwardRef` 或 `slotClassNames`** | P3 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| Ref | **`forwardRef<HTMLInputElement, SliderProps>`** → **`range` `input`** |
| 外层 div | **不可通过 `ref` 获取** |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| 原生 range | 多数浏览器映射 **slider** 语义，带 **`aria-valuenow`** 等（随 UA）。 |
| 显式增强 | 可透传 **`aria-valuemin`/`aria-valuemax`/`aria-valuetext`** 与 **`min`/`max`** 同步（演进或文档示例）。 |
| 展示值 | **`showValue` 的 `span`** 可与 **`aria-live="polite"`** 组合（演进）以便读屏播报变化。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 品牌 | **`accent-brand-500`** |
| 暗色 | 文本 **`dark:text-slate-300`**；轨道色依赖 UA + **`accent`** |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| **`FormItem` + `Slider`** | **`FormItem` `cloneElement` 注入 `value`/`onChange(事件)`** 与 **`Slider` 的 `onChange(number)`** 不一致；需 **薄包装**：**`onChange={(e)=>...}`** 内调业务 或 **自定义 `Form` 字段**。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| 非受控 | `defaultValue`，拖动后 **`onChange`** 为 number。 |
| 受控 | 父 **`value`** 更新，滑块位置同步。 |
| `min`/`max`/`step` | 透传到 DOM。 |
| `showValue=false` | 无右侧 **`span`**。 |
| Ref | **`HTMLInputElement`**、`type` 为 **`range`**。 |

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | 受控/非受控、**`showValue`**、**`min/max/step`**、禁用。 |
| 说明 | **与 `FormItem` 集成方式**、**单滑块边界**。 |

---

## 14. 风险与开放问题

| 风险 | 缓解 |
| --- | --- |
| **`Number(event.target.value)`** 非法 | 依赖 **`min/max/step`**；极端 UA 行为文档说明 |
| **`FormItem` 注入冲突** | 文档包装示例 |
| **仅外层 flex，无 `label`** | 与 **`FormItem` `label`** 或 **`aria-label`** 配合 |

---

## 15. 结论

`Slider` 定位为 **原生 `range` + 受控 number + 可选数值展示**；与 **Button** 无直接继承，与 **`Select`/`Switch`** 同属 **简化 `onChange` 值类型** 家族。**`FormItem` 直连** 存在 **事件/number 契约** 差异，须在文档或演进中闭环。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | Slider 结论 |
| --- | --- |
| 职责 | 区间内选单值 |
| DOM/语义 | div + input range + 可选 span |
| 状态与交互 | disabled；拖动 |
| 数据与受控 | value/defaultValue number、onChange(number) |
| API | min/max/step、showValue、omit type/value/onChange |
| 类型与 Ref | HTMLInputElement |
| 无障碍 | 原生 slider + 可选 ARIA 透传 |
| 样式与主题 | accent-brand |
| 文档与验证 | FormItem 适配、双滑块非目标 |

---

## 附录 B：参考实现片段（当前仓库）

文件：`packages/ui/src/components/form/controls/Slider/Slider.tsx`。

要点：**`useControllableState<number>`**、**`value={innerValue}`**、**`type="range"`**、**`showValue` 条件 `span`**。

（以仓库实际代码为准。）
