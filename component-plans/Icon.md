# Icon 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/basic/Icon/Icon.tsx`

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Icon` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/basic/Icon` |
| 分类 | Basic |
| 依赖 | `cn`（`utils/cn`）；无额外运行时依赖 |
| 关联组件 | `Button`（`icon` 插槽）、`Tag`、`Menu`、`FloatButton` 等 |

---

## 2. 目标与非目标

### 2.1 目标

1. **统一尺寸容器**：为 SVG/字体图标/字符占位提供固定宽高盒子，与表单行高、Button 图标位对齐。  
2. **继承色与主题**：默认使用 `currentColor`，随父级文字色与暗色模式变化。  
3. **可访问性默认安全**：装饰性图标默认 `aria-hidden`，避免读屏重复朗读。  
4. **可扩展**：支持 `children` 传入任意 React 节点（常见为内联 SVG）。  
5. **可观测**：通过 `data-icon`（或等价属性）便于 E2E 与调试。

### 2.2 非目标（当前阶段可不实现）

1. **内置全量图标字体或 SVG 雪碧图**（由业务或独立 `@nova-ui/icons` 包承担）。  
2. **图标即按钮**：点击语义应由外层 `Button`/`IconButton` 承担，本组件不内置 `onClick` 的语义角色。  
3. **复杂动画库耦合**（如 Lottie）不作为 `Icon` 核心职责。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| Button 前缀/后缀图标 | `<Button icon={<Icon><Svg /></Icon>} />` 或与 Button 内置 `icon` 组合时保持同字号阶梯。 |
| 列表/菜单项前缀 | `Menu`、`Dropdown` 选项左侧小图标。 |
| 状态提示 | `Result`、`Empty`、Alert 内装饰图标。 |
| 加载态 | 与 `Spin` 区分：`Icon` 可做静态指示；旋转动画建议由 `Spin` 或父级 `aria-busy` 表达。 |
| 占位 | 无 `children` 时当前实现为 `'•'`，文档需说明推荐始终传入真实图标。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 根元素 | **`span`**（行内 flex 容器），与 `Button` 内嵌图标不破坏 `inline-flex` 布局。 |
| 子内容 | `children` 为图标主体；无 children 时为占位符（实现细节见 §8）。 |
| `role` | 默认**不**加 `role="img"`：装饰性图标用 `aria-hidden`；若未来支持「有意义图标」，通过 props 切换语义（见 §10 演进）。 |
| `data-*` | `data-icon={name}`：便于测试与主题覆盖；`name` 可选。 |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| 交互状态 | 组件本身**无** hover/active/disabled 状态；颜色随父级 `color`/`opacity`（如 Button `disabled`）继承。 |
| 旋转 / 脉冲 | 可选扩展：`spin?: boolean` 时在根或子元素上加 `animate-spin` 类（与 Button loading 小圆环视觉区分）。 |
| 指针事件 | 默认不设置 `pointer-events`；若置于可点击区域，由父级处理点击。 |

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| 业务数据 | **无** value/onChange；纯展示容器。 |
| 来源 | 图标内容由 `children` 或后续 `name`→内置映射表决定。 |

---

## 7. API 规范

### 7.1 当前实现对照

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `size` | 宽高（px） | `number` | `16` | 与 Tailwind `h-4 w-4` 对齐；后续可对齐 `ComponentSize` 预设 |
| `name` | 逻辑名称 / 测试标识 | `string` | - | 写入 `data-icon` |
| `children` | 图标节点 | `ReactNode` | `'•'` | 建议文档推荐传入 SVG |
| `className` | 根样式扩展 | `string` | - | 与 `cn` 合并 |
| 其余 | 继承 `HTMLAttributes<HTMLSpanElement>` | - | - | 含 `style`、`title` 等 |

### 7.2 建议演进（与 Button 对齐的维度）

| 属性 | 说明 | 优先级 |
| --- | --- | --- |
| `sizePreset` | `'sm' \| 'md' \| 'lg'` 映射到与 Button 一致的像素 | P1 |
| `color` / `tone` | 语义色：`primary` / `neutral` / `danger` 或 `text-slate-500` 类 | P2 |
| `title` | 原生 tooltip；与「有意义图标」可读名配合 | P2 |
| `decorative` | 默认 `true`：`aria-hidden`；`false` 时要求 `aria-label` 或 `title`（TS 联合约束） | P1 |
| `spin` | 加载旋转 | P2 |

### 7.3 与 Button API 的对应关系

| Button | Icon |
| --- | --- |
| `size` sm/md/lg | 建议 Icon 提供相同预设，便于一行内视觉对齐 |
| `icon` 为 `ReactNode` | Icon 常作为该 ReactNode 的根包装 |
| `color` | Icon 可用 `currentColor` + 父级或显式 `className` |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| 接口 | `IconProps extends HTMLAttributes<HTMLSpanElement>`，避免与原生 `name`（HTML name 多用于表单）冲突时考虑 **`iconName`** 重命名（破坏性变更需大版本）。 |
| Ref | `forwardRef<HTMLSpanElement, IconProps>`，转发到根 `span`。 |
| 严格性 | 禁止无说明的 `any`；`children` 使用 `ReactNode`。 |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| 装饰性（默认） | **`aria-hidden="true"`**（当前实现），父级 `Button` 已有可访问名称时，图标不重复朗读。 |
| 有意义图标单独存在 | 若图标传递唯一信息，应：使用 **`aria-label`** 包裹在带 `role="img"` 的节点上，或外层 `button` 提供 `aria-label`；**禁止**在装饰场景下误删 `aria-hidden`。 |
| 焦点 | `span` 默认可聚焦性为 false；若产品需要「图标按钮」，使用 **`<Button variant="ghost" aria-label="…"><Icon /></Button>`**。 |
| 对比度 | SVG 使用 `currentColor` 时，保证父级文字色满足 WCAG 对比度。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 布局类 | `inline-flex items-center justify-center` 保证子 SVG 居中。 |
| 尺寸 | 当前 `style={{ width: size, height: size }}`；演进可改为 `className` + Tailwind 预设减少内联样式。 |
| 主题 | 不硬编码颜色；通过 `className` 或父级 `text-brand-500` 等控制。 |
| 暗色 | 依赖父级或 token，Icon 不单独写死浅色。 |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| `Button` + `Icon` | Button `icon` 或 children 内嵌 Icon；尺寸：Button `sm` ↔ Icon 14–16px 等文档表。 |
| `Tag` / `Badge` | 小尺寸 Icon，通常 12–14px。 |
| `Menu` / `Dropdown` | 与文字基线对齐，可用 `className` 微调 `translate-y`。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| 渲染 | 传入 SVG children，断言根 `span` 宽高为 `size`。 |
| 默认占位 | 无 children 时渲染占位（当前为 `•`）。 |
| a11y | 默认 `aria-hidden="true"`。 |
| Ref | `ref.current` 为 `HTMLSpanElement`。 |
| `data-icon` | `name` 传入后存在于 DOM。 |

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | 基础尺寸、与 Button 组合、暗色下继承色、仅装饰 vs 需说明场景。 |
| API 表 | 与 §7 一致，标注默认值与演进 props。 |
| LivePlayground | 与 Button 同页交叉引用，保证复制粘贴可运行。 |

---

## 14. 风险与开放问题

| 风险 | 缓解 |
| --- | --- |
| `IconProps` 的 `name` 与原生语义混淆 | 文档明确为「逻辑名」；大版本可考虑 `data-icon` + `iconName`。 |
| 占位符 `•` 在生产误用 | 文档标为 dev 占位；或 `children` 为空时用空盒 + `aria-hidden` 不加字符。 |
| 仅图标可点击但未包 Button | 文档与 ESLint 示例引导使用 Button + `aria-label`。 |

---

## 15. 结论

`Icon` 定位为 **轻量、装饰优先、尺寸与布局可预测的图标容器**，与 **Button** 在尺寸阶梯与主题色继承上保持一致即可形成统一设计系统。当前实现已满足最小可用；按 §7.2、§14 分阶段演进可避免与表单 `name`、无障碍语义冲突。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | Icon 结论 |
| --- | --- |
| 职责 | 图标容器与尺寸统一，非交互入口 |
| DOM/语义 | 根 `span`；装饰 `aria-hidden` |
| 状态与交互 | 无内置；spin 可扩展 |
| 数据与受控 | 无 |
| API | `size`、`name`、`children`、`className` + 原生 span 属性 |
| 类型与 Ref | `HTMLSpanElement` |
| 无障碍 | 默认隐藏于读屏；信息性场景由父级或后续 props 承担 |
| 样式与主题 | `currentColor` + `cn` + 可选 token 类 |
| 文档与验证 | 与 Button 组合示例 + a11y 说明 |

---

## 附录 B：参考实现片段（当前仓库）

实现位置：`packages/ui/src/components/basic/Icon/Icon.tsx`。

要点摘要：

- `forwardRef` + `HTMLSpanElement`。  
- 默认 `aria-hidden="true"`。  
- `size` 默认 `16`，内联宽高。  
- `data-icon={name}`。  
- `children` 缺省为 `'•'`。

（具体代码以仓库为准，评审时以 diff 为准。）
