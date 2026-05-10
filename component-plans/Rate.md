# Rate 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/form/controls/Rate/Rate.tsx`

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Rate` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/form/controls/Rate` |
| 分类 | Form |
| 依赖 | `cn`、`useControllableState` |
| 关联组件 | **`Slider`**（连续数值）、**`Form`/`FormItem`**（值类型与 `cloneElement` 契约见 §11） |

---

## 2. 目标与非目标

### 2.1 目标

1. **星级评分**：**`count`** 个 **「星」** 按钮（默认 **5**），**整数 0–`count`** 选中态（**`star <= current`** 为激活）。  
2. **受控 / 非受控**：**`value`/`defaultValue`**（**`number`**）+ **`useControllableState`** + **`onChange(value: number)`**。  
3. **可清空**：**`allowClear`**（默认 **`true`**）时，**再次点击当前已选星级** 将值置 **`0`**。  
4. **禁用**：**`disabled`** 作用于每个 **`<button type="button">`**。  
5. **根容器可扩展**：继承 **`HTMLAttributes<HTMLDivElement>`**（**`Omit` `onChange`**），**`className`/`style`/`aria-*`** 等落在 **外层 `div`**。

### 2.2 非目标

1. **半星、0.5 步进**：当前 **仅整星**；无 **`allowHalf`**。  
2. **`character` 自定义图标 / 只读展示**：当前固定 **「★」** 字符。  
3. **键盘方向键在星间移动**：当前为 **多个独立 `button`**，**Tab** 顺序切换；**无 `roving tabindex`/`radiogroup`** 模式。  
4. **整体 `role="img"` 或 `role="slider"` 单控件评分**：未封装；演进可统一 **`<fieldset>` + `legend`** 或 **`radiogroup`**。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 商品/服务评分 | **`count={5}`**，提交 **`value`**。 |
| 可取消评分 | **`allowClear`** 开启，点同一星清零。 |
| 只读展示 | **`disabled`** 或父级不传 **`onChange`** 且受控锁 **`value`**（只读语义弱，演进 **`readOnly`**） |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 根 | **`<div ref={ref} className="inline-flex items-center gap-1">`** |
| 星项 | **`Array.from({ length: count })`** 映射为 **`<button type="button" key={star}>`**，**`star = index + 1`** |
| 文案 | 子节点为 **`★`**（Unicode） |
| `aria-label` | 每项 **`aria-label={\`Rate ${star}\`}`**（英文固定串；演进 **`locale`/`getAriaLabel`**） |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| 内部值 | **`useControllableState<number>({ value, defaultValue, onChange })`**，解构名为 **`current`** |
| 点击 | **`allowClear && current === star`** → **`setCurrent(0)`**；否则 **`setCurrent(star)`** |
| 激活样式 | **`star <= current`** → **`text-amber-400`**，否则 **`text-slate-300 dark:text-slate-600`** |
| `disabled` | 每个 **`button disabled`** |

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| 取值范围 | **整数 `0`–`count`**（**`0`** 表示未选） |
| 受控 | **`value !== undefined`** |
| 非受控 | **`defaultValue`** 默认 **`0`** |
| 回调 | **`onChange?: (value: number) => void`** |

---

## 7. API 规范

### 7.1 `RateProps`（当前实现）

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `count` | 星个数 | `number` | `5` | |
| `value` | 受控当前星数 | `number` | - | `undefined` 非受控 |
| `defaultValue` | 非受控初值 | `number` | `0` | |
| `disabled` | 禁用 | `boolean` | - | |
| `allowClear` | 点同一星是否清零 | `boolean` | `true` | |
| `onChange` | 变更 | `(value: number) => void` | - | 占用 **`HTMLDivElement` 的 `onChange` 名**（已 Omit） |
| `className` | 根 `div` | `string` | - | |
| 继承 | `Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>` | - | - | **`role`/`data-*`** 等可加在根 |

### 7.2 视觉（当前实现）

| 状态 | 类名 |
| --- | --- |
| 星按钮 | **`text-xl leading-none`** |
| 激活 | **`text-amber-400`** |
| 未激活 | **`text-slate-300 dark:text-slate-600`** |

### 7.3 建议演进（可选）

| 能力 | 优先级 |
| --- | --- |
| **`allowHalf` / 半星** | P2 |
| **`character` / 图标** | P2 |
| **`tooltips` / `hover` 预览** | P3 |
| **键盘：`radiogroup` + 方向键** | P2 |
| **`aria-label` 国际化** | P2 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| Ref | **`forwardRef<HTMLDivElement, RateProps>`** → **外层 `div`** |
| 子 `button` | **无单独 ref 暴露** |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| 多个 `button` | **每个可聚焦**；**`aria-label`** 仅 **`Rate 1`…`Rate 5`**，**未**说明「共 5 星中第几星选中」整体语义；演进 **`fieldset`/`legend`** 或 **`aria-valuenow`** 模式。 |
| 只读 | **`disabled`** 会 **从 tab 顺序移除**；只读展示若需保留焦点，用 **`aria-disabled` + 样式** 演进。 |
| 清空 | **`0` 星** 时全灰；读屏需 **`aria-live`** 或 **`legend`** 说明「已清除」（演进）。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 激活色 | **`amber-400`** |
| 未激活 | slate + 暗色 slate |
| 与 **Button** | 星按钮为 **独立 `type="button"`**，**不**使用 **`nova-focus-ring`** 类（依赖浏览器默认 focus）；演进可与 **`Button` ghost** 对齐 |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| **`FormItem` + `Rate`** | 与 **`Slider`** 相同问题：**`onChange(number)`** vs **`FormItem` 注入的 `onChange(event)`**；需 **包装** 或 **手写 `values`**。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| 非受控 | 点击第 **3** 星 **`onChange(3)`**，**`current`** 更新。 |
| 受控 | 父 **`value`** 驱动激活星数。 |
| **`allowClear`** | 已选 **3** 再点 **3** → **`onChange(0)`**。 |
| **`allowClear=false`** | 再点同星 **保持** 原值。 |
| **`disabled`** | **`button disabled`**。 |
| **`count`** | 渲染 **`count`** 个按钮。 |
| Ref | **`HTMLDivElement`**。 |

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | 受控/非受控、**`allowClear`**、**`count`**、禁用。 |
| 说明 | **无半星**、**`aria-label` 为英文**、**`FormItem` 集成注意**。 |

---

## 14. 风险与开放问题

| 风险 | 缓解 |
| --- | --- |
| **`aria-label` 固定英文** | 演进 props 或 **`locale`** |
| **多 `button` tab 次数多** | 键盘组模式演进 |
| **`★` 字体回退** | 指定 **`font-family`** 或换 SVG |

---

## 15. 结论

`Rate` 定位为 **整数星级 + 可清空 + 多 `button` 评分条**；与 **Button** 共享 **`type="button"`** 防表单提交，但 **无 Button 变体体系**。**无障碍与 `FormItem` 契约**为当前主要文档/演进点。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | Rate 结论 |
| --- | --- |
| 职责 | 整数 0..count 评分 |
| DOM/语义 | div + 多个 button + ★ |
| 状态与交互 | allowClear 点同星清零、disabled |
| 数据与受控 | value/defaultValue、onChange(number) |
| API | count、value、defaultValue、disabled、allowClear、omit div onChange |
| 类型与 Ref | HTMLDivElement |
| 无障碍 | 每星 aria-label；缺整体 rating 语义 |
| 样式与主题 | amber / slate |
| 文档与验证 | 无半星、FormItem、i18n |

---

## 附录 B：参考实现片段（当前仓库）

文件：`packages/ui/src/components/form/controls/Rate/Rate.tsx`。

要点：**`useControllableState`** 变量名 **`current`**、**`allowClear` 与 `current === star`** 清零逻辑、**`star <= current`** 激活。

（以仓库实际代码为准。）
