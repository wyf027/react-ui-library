# Watermark 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/feedback/Watermark/Watermark.tsx`

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Watermark` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/feedback/Watermark` |
| 分类 | Feedback（装饰/合规展示） |
| 依赖 | `cn` |
| 关联组件 | **容器类 `div`**、**`Card`**（内容区包一层水印）、**`Modal` 内容防泄密展示**（弱防护，见 §2.2） |

---

## 2. 目标与非目标

### 2.1 目标

1. **包裹子内容**：根 **`div`** **`relative overflow-hidden`**，**`children`** 包在 **内层 `<div className="relative">`** 中，**置于 DOM 后序** 以 **叠在** 水印层之上（**无显式 `z-index`**，依赖 **层叠顺序**）。  
2. **双层视觉**：  
   - **根 `style`**：**`backgroundImage`** 为 **`repeating-linear-gradient(45deg, ...)`** 斜向 **细条纹**（**slate 半透明**）。  
   - **中层绝对定位**：**`inset:0`**、**`display:grid; place-items:center`**、**大号加粗半透明字** 展示 **`content`**（默认 **`'NOVA UI'`**）。  
3. **不阻挡操作**：水印层 **`pointerEvents: 'none'`**、**`userSelect: 'none'`**；**`aria-hidden="true"`** 避免读屏朗读整屏装饰字。  
4. **样式合并**：显式传入 **`style`** 时 **`{ backgroundImage, ...style }`**，**`style` 在后** 可 **覆盖** **`backgroundImage`**（见 §14）。

### 2.2 非目标

1. **平铺重复斜文案、Canvas/SVG 抗抠图**：当前 **单中心 `content` 字符串** + **CSS 条纹**；**非** Ant Design 式 **密集矩阵水印**。  
2. **防截图、防导出、法务级溯源**：**纯前端 CSS**，**可** 被开发者工具或截图 **绕过**。  
3. **动态密度、`gap`、`rotate`、多行 `content`**：**`content` 为 `string`**，布局 **固定** 为 **居中一格**。  
4. **暗色主题专用 token**：条纹与字色 **写死 `rgba`**（**slate 系**），**无 `dark:` 类**（见 §10）。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 内测/演示环境 **弱标识** | **`content`** 传 **环境名、用户 id 简写** 等。 |
| 截图对外发前 **提示归属** | **心理暗示** 大于 **技术防泄漏**。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 根 | **`<div ref={ref} className={cn('relative overflow-hidden', className)} style={{ backgroundImage, ...style }} {...props}>`** |
| 水印字层 | **`<div aria-hidden="true" style={{ position:'absolute', inset:0, ... }}>`** **`{content}`** |
| 内容 | **`<div className="relative">{children}</div>`** |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| 状态 | **无** `useState` / `useEffect`；**纯展示**。 |
| 交互 | **水印层** **`pointer-events: none`** — **点击/选择** 作用于 **`children`**。 |

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| 数据 | **无** 受控状态；**`content`**、**`className`**、**`style`** 均由 **props** 驱动。 |

---

## 7. API 规范

### 7.1 `WatermarkProps`（当前实现）

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `content` | 居中大字文案 | `string` | `'NOVA UI'` | |
| `children` | 被叠内容 | `ReactNode` | - | |
| `className` | 根容器 | `string` | - | 默认含 **`relative overflow-hidden`** |
| `style` | 与默认背景合并 | `CSSProperties` | - | **合并进根 `style` 对象** |
| 继承 | `HTMLAttributes<HTMLDivElement>` | - | - | **`{...props}` 在根 `style` 之后** |

### 7.2 视觉常量（当前实现）

| 层 | 要点 |
| --- | --- |
| 条纹 | **`repeating-linear-gradient(45deg, rgba(148,163,184,0.15) 0, ... 1px, transparent 1px, transparent 24px)`** |
| 字层 | **`fontSize: 2rem`**, **`fontWeight: 700`**, **`color: rgba(100,116,139,0.12)`** |

### 7.3 建议演进（可选）

| 能力 | 优先级 |
| --- | --- |
| **`dark` 下条纹/字色 token** | P2 |
| **`z-index` 显式分层**（避免异常 stacking 上下文） | P3 |
| **Canvas 平铺、`gap`、`rotate`** | P2（产品定义强水印时） |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| Ref | **`forwardRef<HTMLDivElement, WatermarkProps>`** → **根 `div`** |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| 装饰层 | **`aria-hidden="true"`** — **不** 进入 **无障碍树**；**正确** 处理 **纯视觉水印**。 |
| 内容区 | **`children`** 内 **需** 自行保证 **标题/地标** 等语义。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 色值 | **硬编码 `rgba`**，**未** 接 **CSS 变量 / Tailwind 主题扩展**。 |
| **`overflow-hidden`** | **子内容溢出裁剪**；**大卡片** 时注意 **内部滚动** 是否在 **`children`** 内处理。 |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| **`{...props}` 含 `style`** | **整对象覆盖** 根上 **`style`**，**可能丢失** **`backgroundImage` 斜纹**（见 §14）。 |
| **嵌套 `position`** | 根 **`relative`**；水印 **`absolute`**；内容 **`relative`** — **一般** 子内容在 **正常文档流** 叠于水印上。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| 默认 | **`content`** 默认文案、**条纹** 与 **字层** 可见。 |
| **`children` 可点** | 按钮在 **`children`** 内 **可点击**（**`pointer-events`**）。 |
| **`style` 合并** | 传入 **`style`** 仅改 **部分属性** 时 **保留/覆盖** **`backgroundImage`** 行为符合预期。 |

（仓库 **当前无** `Watermark.test.tsx`；以上为建议用例。）

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | 包 **表格/表单**、自定义 **`content`**、**`className` 定高**。 |
| 说明 | **非安全方案**、**`props.style` 覆盖风险**、**暗色对比**。 |

---

## 14. 风险与开放问题

| 风险 | 说明 |
| --- | --- |
| **`{...props}` 在 `style` 之后** | **`props.style`** **完全替换** 已合并的 **`style` 对象**（含 **`backgroundImage`**），**斜纹可能消失**。 |
| **叠层依赖隐式顺序** | **无 `z-index`**；若 **`children`** 内 **`position` + 负 z-index`** 等，**可能** 被水印 **盖住**（少见）。 |
| **合规预期管理** | **禁止** 向业务承诺 **防泄密**；文档写清 **CSS 水印边界**。 |

---

## 15. 结论

`Watermark` 为 **斜向条纹背景 + 居中半透明大字 + `pointer-events: none` 装饰层** 的轻量包裹组件，**`children` 正常交互**，**`aria-hidden`** 处理得当。与 **Button** 无继承关系；**无状态、无 Canvas**；**主题与防篡改** 为后续演进点。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | Watermark 结论 |
| --- | --- |
| 职责 | 弱标识装饰层 |
| DOM/语义 | 根 + aria-hidden 层 + relative children |
| 状态与交互 | 无状态；none 指针 |
| 数据与受控 | content 等 props |
| API | content、children、style |
| 类型与 Ref | HTMLDivElement |
| 无障碍 | aria-hidden 装饰 |
| 样式与主题 | 写死 rgba、斜纹 |
| 文档与验证 | style 覆盖、安全边界 |

---

## 附录 B：参考实现片段（当前仓库）

文件：`packages/ui/src/components/feedback/Watermark/Watermark.tsx`。

要点：**`repeating-linear-gradient`**、**绝对居中 `content`**、**`pointerEvents: 'none'`**、**`children` 相对层**。

（以仓库实际代码为准。）
