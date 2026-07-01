# ColorPicker 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/form/pickers/ColorPicker/ColorPicker.tsx`

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `ColorPicker` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/form/pickers/ColorPicker` |
| 分类 | Form（Picker） |
| 依赖 | `cn`、`useControllableState` |
| 关联组件 | **`Input`**、`**DatePicker**`（原生 input 薄封装）、**`Form`/`FormItem`** |

---

## 2. 目标与非目标

### 2.1 目标

1. **原生取色**：**`<input type="color">`**，由浏览器提供取色 UI（随平台差异）。  
2. **受控 / 非受控字符串**：**`value` / `defaultValue`**（**`string`**，默认 **`#2459ff`**）+ **`useControllableState`** + **`onChange(value: string)`**（**`#rrggbb`** 小写 hex，行为随 UA）。  
3. **可读当前值**：**`showValue`** 为 **`true`** 时在右侧 **`font-mono`** **`span`** 显示 **`innerValue`**。  
4. **属性透传**：除冲突项外 **`InputHTMLAttributes`** 落在 **`color` input** 上（**`name`/`id`/`required`** 等）。

### 2.2 非目标

1. **HSV 面板、预设色板、透明度 `alpha`**：当前 **无**；**`type="color"`** 在常见浏览器为 **RGB、sRGB**，**透明度非标准能力**（见 §14）。  
2. **外层 `ref` 指向容器**：**`ref` 仅转发到 `input`**（外层 **`div` 无 ref**）。  
3. **`label`/`error`/`helperText`**：未封装；与 **`Input`** 完整形态不一致。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 主题色、品牌色选择 | **`value` 与 CSS 变量或 Tailwind 扩展对接**（业务侧转换）。 |
| 表单字段 | **`name` 透传**；与 **`FormItem`** 组合时注意 **`onChange` 签名**（§11）。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 根布局 | **`<div className="flex items-center gap-2">`**（**无 ref**） |
| 控件 | **`<input type="color">`**，**`ref` 转发于此** |
| 展示 | **`showValue`** 时 **`<span className="font-mono text-sm ...">`** |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| 内部值 | **`useControllableState<string>({ value, defaultValue, onChange })`** → **`innerValue`** |
| 变更 | **`onChange={(e) => setInnerValue(e.target.value)}`**（原生 **`event.target.value`** 为 hex 字符串） |
| `disabled` | 透传 **`input`** |

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| 值格式 | **建议文档约定 `#rrggbb`**（**小写**随浏览器） |
| 受控 | **`value !== undefined`** |
| 非受控 | **`defaultValue`** 默认 **`#2459ff`** |

---

## 7. API 规范

### 7.1 `ColorPickerProps`（当前实现）

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `value` | 受控颜色 | `string` | - | `undefined` 非受控 |
| `defaultValue` | 非受控初值 | `string` | `'#2459ff'` | |
| `onChange` | 变更 | `(value: string) => void` | - | |
| `showValue` | 是否显示 hex 文本 | `boolean` | `true` | |
| `disabled` | 禁用 | `boolean` | - | |
| `className` | 样式 | `string` | - | 作用在 **`input`** |
| 继承 | `Omit<InputHTMLAttributes<HTMLInputElement>, 'type' \| 'value' \| 'defaultValue' \| 'onChange'>` | - | - | **`type` 固定 `color`** |

### 7.2 样式（当前实现）

- **`input`**：**`h-10 w-12`**、圆角、边框、`p-1`、`cursor-pointer`  
- **与 `Input` md**：高度 **`h-10`** 可横向对齐；**宽度窄** 为色块

### 7.3 建议演进（可选）

| 能力 | 优先级 |
| --- | --- |
| **预设色 `presets`** | P2 |
| **弹层 HSV + `alpha`** | P2 |
| **`format`（hex8 / rgb）** | P2 |
| **根 `ref` 或 `slotClassNames`** | P3 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| Ref | **`forwardRef<HTMLInputElement, ColorPickerProps>`** → **`type="color"` 的 `input`** |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| 原生 `color` | 键盘与读屏 **高度依赖浏览器/OS**；**无统一 `aria-valuetext` 注入**（演进）。 |
| 标签 | **无内置 `label`**；需 **`FormItem`/`aria-label`**。 |
| **右侧 hex** | 装饰性可读；**`aria-live`** 可选播报变化（演进）。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 暗色 | 边框 **`dark:border-slate-700`**；色块本身由 **用户选色** 决定对比度 |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| **`FormItem` + `ColorPicker`** | **`onChange(value: string)`** 与 **`FormItem` 默认 `onChange(event)`** 不兼容；需 **包装** 或 **手写 `setFieldValue`**（同 **`Slider`/`DatePicker`**）。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| 非受控 | `defaultValue`，选色后 **`onChange`** 为 hex 字符串。 |
| 受控 | 父 **`value`** 与色块、**`showValue`** 文本一致。 |
| `showValue=false` | 无 **`span`**。 |
| Ref | **`HTMLInputElement`**、`type` **`color`**。 |

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | 受控/非受控、**`showValue`**、与 **主题 token** 联动思路。 |
| 说明 | **值格式**、**平台 UI 差异**、**无 alpha**。 |

---

## 14. 风险与开放问题

| 风险 | 说明 |
| --- | --- |
| **颜色格式与业务不一致** | 仅 hex；**`rgb()`/`hsl()`** 需业务转换 |
| **无障碍不一致** | 文档要求 **目标浏览器实测** |
| **`defaultValue` 品牌蓝** | 与业务品牌冲突时可改默认或文档说明覆盖 |

---

## 15. 结论

`ColorPicker` 为 **原生 `type="color"` + 受控 hex 字符串 + 可选等宽展示** 的薄封装；与 **Button** 无继承关系，与 **`DatePicker`/`Slider`** 同属 **简化 `onChange` 值类型** 家族。**扩展面板与透明度** 不在当前实现范围。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | ColorPicker 结论 |
| --- | --- |
| 职责 | 选 sRGB 色（原生） |
| DOM/语义 | div + input color + 可选 span |
| 状态与交互 | disabled；原生取色 |
| 数据与受控 | value/defaultValue string、onChange(string) |
| API | showValue、omit type/value/defaultValue/onChange |
| 类型与 Ref | HTMLInputElement |
| 无障碍 | 依赖原生；弱可控 |
| 样式与主题 | h-10 w-12、mono 文本 |
| 文档与验证 | hex、FormItem、无 alpha |

---

## 附录 B：参考实现片段（当前仓库）

文件：`packages/ui/src/components/form/pickers/ColorPicker/ColorPicker.tsx`。

要点：**`useControllableState<string>`**、**`value={innerValue}`**、**`type="color"`**。

（以仓库实际代码为准。）
