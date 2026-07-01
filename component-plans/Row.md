# Row 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/layout/Row/Row.tsx`

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Row` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/layout/Row` |
| 分类 | Layout |
| 依赖 | `cn`；内联 `style` 用于 `gap` 像素值 |
| 关联组件 | `Col`（栅格列）、`Container`、`Space`、`Button`（横向按钮组） |

---

## 2. 目标与非目标

### 2.1 目标

1. **水平 Flex 排布**：子元素横向排列，与常见「行」心智一致。  
2. **可配置间距**：`gap` 支持单一数字或 `[水平, 垂直]` 二元组，与 Ant Design `Row`/`gutter` 心智对齐（见 §7.3 与 CSS `gap` 语义）。  
3. **主轴与交叉轴对齐**：`justify`、`align` 映射到 `justify-*`、`items-*`。  
4. **换行控制**：`wrap` 默认 `true`，可改为不换行以适配工具栏等场景。

### 2.2 非目标

1. **24 栅格比例计算**：若需 `span` 比例，由 **`Col`** 或父级宽度策略实现，`Row` 本身不内置栅格分数。  
2. **纵向主轴的 Flex 列**：纵向堆叠优先 **`Space`** `direction="vertical"` 或 **`Flex`**，避免滥用 `Row`。  
3. **虚拟列表**：长列表滚动由 `VirtualList`/`List` 承担。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 按钮组 / 工具栏 | 多个 `Button` 横向排列，`align="center"`。 |
| `Col` 栅格行 | `Row` 包裹多个 `Col`，`gap` 模拟 gutter。 |
| 表单行内字段 | 多个短控件同一行（注意小屏换行）。 |
| 标签 + 操作 | 左侧文案右侧 `Button`，`justify="between"`。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 根元素 | **`div`** + `display: flex`（通过 `flex` 类）。 |
| 语义列表 | 若子项为一组同质选项，应由子组件（如 `Radio.Group`）承担 `radiogroup` 等语义，**`Row` 不加 `role="list"`** 除非产品明确需要（避免与真实列表混淆）。 |
| 子节点 | 任意 React 子节点；与 `Col` 组合时子节点多为 `Col`。 |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| 内置状态 | **无**。 |
| 响应式 | 当前 `gap` 为固定 px；响应式 gutter 可通过父级传入不同 `gap` 或 `className` 断点类演进。 |

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| 业务数据 | **无**。 |
| 样式合并 | `style` 与内部 `gap`：`style={{ ...gapToStyle(gap), ...style }}`，后者可覆盖前者中的同名字段（若需禁止覆盖可文档说明顺序）。 |

---

## 7. API 规范

### 7.1 当前实现对照

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `gap` | 子项间距 | `RowGap` | `12` | 数字或 `[水平px, 垂直px]`，见 §7.3 |
| `justify` | 主轴对齐 | 见下表 | `'start'` | 映射 `justify-*` |
| `align` | 交叉轴对齐 | 见下表 | `'stretch'` | 映射 `items-*` |
| `wrap` | 是否换行 | `boolean` | `true` | `flex-wrap` / `flex-nowrap` |
| `className` | 类名扩展 | `string` | - | |
| `style` | 内联样式 | `CSSProperties` | - | 与 `gap` 合并 |
| 其余 | `HTMLAttributes<HTMLDivElement>` | - | - | `children`、`onClick` 等 |

**`justify` 取值与类名：**

| 值 | Tailwind 类 |
| --- | --- |
| `start` | `justify-start` |
| `center` | `justify-center` |
| `end` | `justify-end` |
| `between` | `justify-between` |
| `around` | `justify-around` |
| `evenly` | `justify-evenly` |

**`align` 取值与类名：**

| 值 | Tailwind 类 |
| --- | --- |
| `start` | `items-start` |
| `center` | `items-center` |
| `end` | `items-end` |
| `stretch` | `items-stretch` |
| `baseline` | `items-baseline` |

### 7.2 类型导出

- `RowProps`  
- `RowGap` = `number | [number, number]`

### 7.3 `gap` 与 CSS `gap` 映射（当前实现）

实现将 `gap` 转为内联样式：

```ts
const [horizontal, vertical] = Array.isArray(gap) ? gap : [gap, gap]
return { gap: `${vertical}px ${horizontal}px` }
```

CSS 双值 **`gap: <row-gap> <column-gap>`**（在默认 `flex-direction: row` 下）：

- **第一项（row-gap）**：行与行之间间距 → 对应实现中的 **`vertical`**（换行后的垂直间距）。  
- **第二项（column-gap）**：列与列之间间距 → 对应实现中的 **`horizontal`**。

因此 **`gap={8}`** 表示行列间距均为 8px；**`gap={[16, 8]}`** 表示数组 **`[水平 16, 垂直 8]`** 与注释「与 Ant Design gutter 一致」一致：主轴方向间隙 16px，换行后行间距 8px。

文档与示例须写清 **数组顺序为 `[水平, 垂直]`**，避免与 CSS 字面「row、column」英文顺序混淆。

### 7.4 建议演进（可选）

| 属性 | 说明 | 优先级 |
| --- | --- | --- |
| `direction` | `row` / `row-reverse` | P3 |
| `gap` 预设 token | `sm`/`md` 映射 px，与 `Space` 对齐 | P2 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| 接口 | `RowProps extends HTMLAttributes<HTMLDivElement>`，扩展布局专有 props。 |
| Ref | `forwardRef<HTMLDivElement, RowProps>`。 |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| 阅读顺序 | DOM 顺序与视觉顺序一致；`row-reverse` 若未来引入须在文档中提示读屏顺序问题。 |
| 间距仅视觉 | `gap` 不产生可聚焦节点；焦点仍在子控件上。 |
| 密集操作区 | 工具栏内按钮保持足够间距（`gap` + 组件自身 min 点击区），满足 WCAG 目标尺寸建议。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| Flex | `flex` + `wrap` 控制 `flex-wrap`/`flex-nowrap`。 |
| Gap | 当前为 **px 内联**，便于与 Ant 风格整数 gutter 一致；主题化可改为 CSS 变量。 |
| 与 `Space` | `Space` 偏垂直栈与统一 `size` 预设；`Row` 偏横向 flex 与任意 px `gap`。 |
| 与 `Container` | 典型结构：`Container` → `Row` → `Col`/内容。 |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| `Row` + `Col` | 栅格文档中说明 `gap` 与 `Col` padding 不要双重叠加过大。 |
| `Row` + `Button` | 多个按钮 `wrap` 在小屏换行。 |
| `Row` + `Divider` | 垂直分割时常用 `Flex` 或栅格；若用 `Row` 注意 `align`。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| 默认 | `flex`、`flex-wrap`、`items-stretch`、`justify-start`。 |
| gap 数字 | `style.gap` 为 `12px 12px`（与实现一致：vertical horizontal 顺序在 CSS 中为 row column）。 |
| gap 数组 | `[20, 10]` → `gap: 10px 20px`（vertical=10, horizontal=20 → row-gap 10, column-gap 20）。 |
| wrap false | 含 `flex-nowrap`。 |
| style 覆盖 | 传入 `style` 可与 gap 对象合并，验证覆盖行为。 |
| Ref | `HTMLDivElement`。 |

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | 按钮组、`justify="between"`、与 `Col`、单值 `gap` 与数组 `gap` 对照。 |
| 必含说明 | **`gap` 数组 `[水平, 垂直]`** 与 CSS `gap` 两个分量的对应关系（避免接错 Ant gutter）。 |
| 反模式 | 大段纵向正文不用 `Row` 堆叠。 |

---

## 14. 风险与开放问题

| 风险 | 缓解 |
| --- | --- |
| `gap` 数组顺序与 CSS 文档「row-gap / column-gap」英文混淆 | 文档与 TS JSDoc 固定为 **`[水平间距, 垂直间距]`**（与源码注释一致）。 |
| 仅 `Row` 无响应式 gutter | 通过父级 state 断点切换 `gap` 或后续 token 化。 |

---

## 15. 结论

`Row` 定位为 **横向 Flex 行容器**，以 **`gap`（含 Ant 风格二元组）**、**`justify`/`align`/`wrap`** 覆盖中后台最常见的横向布局；与 **Button** 同属无状态 API，**文档重点为 `gap` 语义与和 `Col`/`Space` 的选型**。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | Row 结论 |
| --- | --- |
| 职责 | 横向 flex 排布与子项间距 |
| DOM/语义 | `div` + flex |
| 状态与交互 | 无 |
| 数据与受控 | 无 |
| API | `gap`、`justify`、`align`、`wrap`、`className`、`style` |
| 类型与 Ref | `HTMLDivElement` |
| 无障碍 | DOM 顺序；密集点击区间距 |
| 样式与主题 | Tailwind flex + 内联 gap px |
| 文档与验证 | gap 二元组语义、与 Col/Space 对照 |

---

## 附录 B：参考实现片段（当前仓库）

文件：`packages/ui/src/components/layout/Row/Row.tsx`。

要点：

- `gapToStyle`：`[horizontal, vertical]` → `gap: \`${vertical}px ${horizontal}px\``（CSS row-gap / column-gap 顺序）。  
- 默认 `gap={12}`、`justify="start"`、`align="stretch"`、`wrap={true}`。  
- `style` 与 `gapToStyle` 合并，**`style` 在后**可覆盖内联 gap 字段。

（以仓库实际代码为准。）
