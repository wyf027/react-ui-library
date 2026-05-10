# FloatButton 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/navigation/FloatButton/FloatButton.tsx`

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `FloatButton` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/navigation/FloatButton` |
| 分类 | Navigation |
| 依赖 | `cn` |
| 关联组件 | **`BackTop`**（同为 **fixed 右下角** 类控件，注意 **z-index 与 `position` 数值** 叠放）；**`Tooltip`**（本组件 **仅用原生 `title`**，见 §4） |

---

## 2. 目标与非目标

### 2.1 目标（与当前实现对齐）

1. **固定于视口右下角（可配置偏移）**：**`position: fixed`**，**`style.right` / `style.bottom`** 来自 **`position`** prop，默认 **`{ right: 24, bottom: 24 }`**（React **数字 → px**）。  
2. **主操作悬浮入口**：**`h-12 w-12`** 方形点击区，**`z-50`**，**品牌色底**、**白字**、**阴影 + hover 加深**。  
3. **形状**：**`shape`** 为 **`'circle'`（默认）** 或 **`'square'`**（**`rounded-full` / `rounded-lg`**）。  
4. **内容优先级**：**`icon ?? children ?? '+'`**（三者择一展示）。  
5. **简易提示**：**`tooltip?: string`** 映射到 **`title`**（浏览器原生 tooltip）。  
6. **可扩展按钮语义**：**`FloatButtonProps` 继承 `ButtonHTMLAttributes<HTMLButtonElement>`**，**`...props`** 透传。

### 2.2 非目标

1. **`FloatButton.Group`、展开子按钮、磁吸边**：未实现。  
2. **与 Tooltip 组件联动的富提示**：当前 **无** **`aria-describedby`** 挂接，仅 **`title`**（原生）。  
3. **`type="submit"` 在表单内语义**、**`href` 链式变体**：与 **`Button`** 全量能力 **不对齐**；本组件为 **`type="button"`** 写死。  
4. **`style` 与内置 `right`/`bottom` 的智能合并**：见 §14。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| **全局次要操作**（新建、客服、反馈） | **单图标** + **`tooltip`** 说明。 |
| **与 `BackTop` 并存** | 调整 **`position`** 或 **`className`**，避免 **重叠遮挡**。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 根 | **`<button type="button">`**，**`ref` 指向该元素**。 |
| 提示 | **`title={tooltip}`**（**`tooltip` 为 `undefined` 时无 `title`**，除非 **`...props.title`** 透传覆盖行为： **`title` 若在 `props` 中** 因 **`{...props}` 在后** 会 **覆盖** 组件 **`title={tooltip}`** — 见源码顺序）。 |

**源码属性顺序**：**`title={tooltip}`** 在前，**`{...props}`** 在后 → **`props.title` 覆盖 `tooltip`**。

---

## 5. 状态与交互

**无内部 state**。点击、禁用、键盘等 **完全继承原生 `button` + 透传 `props`**。

---

## 6. 数据与受控

**无受控数据 API**；**`position`/`shape`/`icon`/`tooltip`** 均为 **渲染期配置**。

---

## 7. API 规范

### 7.1 `FloatButtonProps`

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `icon` | 按钮内展示节点 | `ReactNode` | - | **优先于 `children`** |
| `tooltip` | 原生悬停说明 | `string` | - | 写入 **`title`**（可被 **`props.title`** 覆盖） |
| `shape` | 外形 | `'circle' \| 'square'` | `'circle'` | |
| `position` | 距视口右下（px 数字） | `{ right?: number; bottom?: number }` | `{ right: 24, bottom: 24 }` | 仅 **`right`/`bottom`**；**无 `top`/`left`** |
| `className` | 追加类名 | `string` | - | |
| `children` | 无 `icon` 时的内容 | `ReactNode` | - | 皆无时为 **`'+'`** |
| 继承 | `ButtonHTMLAttributes<HTMLButtonElement>` | - | - | **`style` 整体覆盖** 内置 `style`，见 §14 |

### 7.2 建议演进（可选）

| 能力 | 优先级 |
| --- | --- |
| **`style` 与 `{ right, bottom }` 浅合并** | P1 |
| **`Tooltip` 包裹 + 键盘可发现说明** | P1 |
| **`FloatButton.Group`、子项展开** | P2 |
| **`top`/`left`、`placement` 枚举** | P2 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| 导出 | **`FloatButtonProps`**。 |
| Ref | **`forwardRef<HTMLButtonElement, FloatButtonProps>`**。 |

---

## 9. 无障碍（a11y）

| 项 | 当前 | 建议 |
| --- | --- | --- |
| 名称 | **`icon` 无文本** 时可能 **仅 `'+'` 或图标** | **`aria-label`** 由业务经 **`props` 传入**；**勿** 仅依赖 **`title`**（键盘焦点未必触发悬停） |
| 对比 **`Button`** | 无 **`loading`** 等 | 按需扩展或组合 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 布局 | **`fixed z-50 flex h-12 w-12 items-center justify-center`** |
| 视觉 | **`shadow-lg transition hover:shadow-xl`**、**`bg-brand-500 text-white hover:bg-brand-600`** |
| 形状 | **`circle` → `rounded-full`**；**`square` → `rounded-lg`** |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| **`BackTop`** | 两者常 **同角**；**`BackTop` 默认 `z-30`**、**`FloatButton` `z-50`**，一般 **FloatButton 在上**；仍应用 **`position` 错开**。 |
| **模态层** | **`z-50` 可能低于** 某些 **Modal 遮罩**；需 **`className` 提高 z-index** 时与 **设计 token** 对齐。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| 默认 | **`shape`/`position` 默认**、**无 icon/children** 时显示 **`+`**。 |
| 内容 | **`icon` 存在** 时 **忽略 `children`** 展示逻辑（**`icon ?? children`**）。 |
| `tooltip` | **`title`** 与 **`tooltip`** 一致；**`props.title` 覆盖** 行为可测。 |
| Ref | **`ref`** 指向 **`HTMLButtonElement`**。 |
| `style` | 传入 **`style`** 后 **`right`/`bottom`** 是否仍生效 — 当前 **整对象覆盖**，见 §14。 |

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | **`icon` + `aria-label`**、**`square`**、**`position` 避让 `BackTop`**。 |
| 说明 | **`tooltip` ≠ Tooltip 组件**；**`type` 固定 `button`**。 |

---

## 14. 风险与开放问题

| 风险 | 说明 / 缓解 |
| --- | --- |
| **`{...props}` 在 `style` 之后** | 实现为 **`style={{ right, bottom }}` 在前**，**`{...props}` 在后** → **`props.style` 会完全覆盖** 内置 **`right`/`bottom`**；需 **自行在 `style` 中写定位** 或演进 **浅合并**。 |
| **仅 `title` 提示** | 触屏/键盘 **可发现性弱**；重要操作用 **`aria-label`** 或 **`Tooltip`** 演进。 |
| **`icon` 无文本** | 读屏 **可能只读图形角色**；**必须 `aria-label`**。 |

---

## 15. 结论

`FloatButton` 定位为 **固定右下角（可数字偏移）的品牌色圆形/圆角方悬浮按钮**：**`icon`/`children`/`+` 回退**、**`tooltip`→`title`**，**无组合菜单**。**生产环境建议强制可访问名称（`aria-label`）**；若传入 **`style`**，须知晓 **会覆盖默认定位**。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | FloatButton 结论 |
| --- | --- |
| 职责 | 全局悬浮主/次操作入口 |
| DOM/语义 | 原生 `button`、`title` |
| 状态与交互 | 无内部状态；透传 props |
| 数据与受控 | 无 |
| API | `icon`、`tooltip`、`shape`、`position` + ButtonHTMLAttributes |
| 类型与 Ref | `HTMLButtonElement` |
| 无障碍 | 依赖 `aria-label`；`title` 不足 |
| 样式与主题 | fixed、品牌、阴影、双形状 |
| 文档与验证 | style 覆盖、与 BackTop 叠放 |

---

## 附录 B：当前源码路径

- `packages/ui/src/components/navigation/FloatButton/FloatButton.tsx`
- `packages/ui/src/components/navigation/FloatButton/index.ts`
