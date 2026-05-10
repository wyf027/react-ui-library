# Divider 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/layout/Divider/Divider.tsx`

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Divider` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/layout/Divider` |
| 分类 | Layout |
| 依赖 | `cn` |
| 关联组件 | **`Space`**（`split`）、`Card`、`List`、`Menu`、`Modal`/`Drawer` 内容区 |

---

## 2. 目标与非目标

### 2.1 目标

1. **内容分区**：横向占满宽度的分割线，或纵向内联分隔条。  
2. **线型可变**：**`variant`** 支持 **`solid` / `dashed` / `dotted`**，映射 Tailwind 边框样式类。  
3. **密度控制**：**`plain`** 减小外边距（对标 Ant `plain`）。  
4. **带文案横向分割**：**`children`** 存在且 **`orientation === 'horizontal'`** 时，使用 **flex + 双侧线 + 中间文案**，**`titlePlacement`** 控制文案靠起/中/尾。  
5. **无障碍**：根节点 **`role="separator"`** + **`aria-orientation`**；装饰性线段使用 **`aria-hidden`**。

### 2.2 非目标

1. **纵向带文案**：当前实现**仅横向**走带文案分支；**纵向 + `children`** 不会渲染文案（`children` 未挂到 DOM），见 §14。  
2. **列表 `li` 内 `hr`**：列表项分割需遵循 HTML 合法结构，不在组件内自动切换 `hr`。  
3. **主题动画**：分割线展开动画等非核心能力。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 区块之间 | 横向全宽，`orientation="horizontal"`。 |
| 工具栏竖线 | `orientation="vertical"`，置于 `Space`/`Row` 内，`self-stretch`。 |
| 「或」登录分割 | 横向 + `children` + `titlePlacement`。 |
| `Space` split | 作为 `split` 插入子项间，注意横向/竖向与 `Divider` `orientation` 一致。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 根元素 | 均为 **`div`**（非 `hr`）。 |
| 角色 | 根 **`role="separator"`**；**`aria-orientation`** 为 **`horizontal`** 或 **`vertical`**`。 |
| 横向无文案 | 单根 `div`：`h-0 w-full` + 上边框（`border-t`）实现线。 |
| 横向有文案 | 外层 `div`（flex 容器 + separator）；两侧为 **`div`** 线段（**`aria-hidden`**），中间 **`span`** 承载 **`children`**（可读、非 hidden）。 |
| 纵向 | 单根 `div`：`w-0 self-stretch min-h-4` + **`border-l`**。 |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| 内置状态 | **无**。 |
| 交互 | 分割线默认可穿透点击（不挡 pointer）；若需不可点仅视觉，保持 `div` 即可。 |

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| 业务数据 | **无**。 |
| 文案 | 横向带文案时 **`children`** 为展示内容。 |

---

## 7. API 规范

### 7.1 当前实现对照

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `orientation` | 横向 / 纵向 | `DividerOrientation` | `'horizontal'` | |
| `variant` | 线型 | `DividerVariant` | `'solid'` | `solid` / `dashed` / `dotted` |
| `plain` | 是否紧凑外边距 | `boolean` | `false` | `my-2`/`mx-2` vs `my-3`/`mx-3` |
| `titlePlacement` | 文案与线相对位置 | `DividerTitlePlacement` | `'center'` | 仅 **横向且有 `children`** 生效 |
| `children` | 中间文案 | `ReactNode` | - | 仅横向分支展示 |
| `className` | 根容器类名 | `string` | - | |
| 其余 | `HTMLAttributes<HTMLDivElement>` | - | - | `style` 等 |

### 7.2 `variant` 与类映射（当前实现）

公共边色：`border-slate-200 dark:border-slate-700`。

| `variant` | 边框样式类 |
| --- | --- |
| `solid` | `border-solid` |
| `dashed` | `border-dashed` |
| `dotted` | `border-dotted` |

横向线用 **`border-t`**，纵向用 **`border-l`**（与 `orientation` 绑定）。

### 7.3 `plain` 与外边距（当前实现）

| `plain` | 横向外边距类 | 纵向外边距类 |
| --- | --- | --- |
| `false` | `my-3` | `mx-3` |
| `true` | `my-2` | `mx-2` |

### 7.4 `titlePlacement` 结构（横向有 `children`）

| 值 | 结构顺序 |
| --- | --- |
| `center` | 线 \| 文案 \| 线 |
| `start` | 文案 \| 线 |
| `end` | 线 \| 文案 |

线段节点：`flex-1`、`border-t`（或等价线类）、**`aria-hidden`**。文案：**`span`**，`shrink-0 px-3 text-sm text-slate-500 dark:text-slate-400`。

### 7.5 建议演进（可选）

| 属性 | 说明 | 优先级 |
| --- | --- | --- |
| 纵向带文案 | 设计 flex-col 分支 | P2 |
| `as` / `hr` 模式 | 无文案横向用 `hr` 简化语义 | P3 |
| `type` | 与 Ant `type` 主次线色对齐 | P2 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| 接口 | `DividerProps extends HTMLAttributes<HTMLDivElement>`，扩展布局语义 props。 |
| 导出类型 | `DividerOrientation`、`DividerVariant`、`DividerTitlePlacement`。 |
| Ref | `forwardRef<HTMLDivElement, DividerProps>`，指向外层 `div`。 |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| `role="separator"` | 表示分隔，读屏可识别；**不要**在外层再套无意义 `role`。 |
| `aria-orientation` | 与视觉横向/纵向一致。 |
| 装饰线段 | 两侧 **`aria-hidden`**，避免与中间文案重复朗读「空白线」。 |
| 文案 | 中间 **`span`** 无 `aria-hidden`，保证 **`children`** 可读。 |
| 与 `hr` | 使用 `div`+`separator` 时，文档说明与原生 `hr` 的选型（表单/文档流内部分场景更偏好 `hr`）。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 颜色 | slate 边框 + 文案 `text-slate-500` / 暗色 `text-slate-400`。 |
| 纵向高度 | **`min-h-4`** + **`self-stretch`**，在 flex 行内拉高竖线。 |
| 与 `Space` | 竖向 `Divider` 作 `split` 时，确认父级 `align` 能拉伸高度。 |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| `Space` + `split={<Divider orientation="vertical" />}` | 与横向 `Space` 一致。 |
| `List` 项之间 | 可用横向 `Divider`；列表语义优先 `ul`/`li`。 |
| `Modal` 内分区 | 横向 `Divider` + `plain` 紧凑。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| 横向无文案 | `role="separator"`、`aria-orientation="horizontal"`、`border-t`、`h-0 w-full`。 |
| 纵向 | `aria-orientation="vertical"`、`border-l`、`w-0`。 |
| 横向有文案 | 三段结构、`titlePlacement` 三种、`line` 带 `aria-hidden`。 |
| variant | 三种线型类存在。 |
| plain | 外边距类为 `my-2`/`mx-2`。 |
| Ref | `HTMLDivElement`。 |

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | 横/纵、`plain`、三种 `variant`、带文案三种 `titlePlacement`、`Space.split`。 |
| 限制 | **纵向不支持 `children` 展示**（当前实现）。 |

---

## 14. 风险与开放问题

| 风险 | 缓解 |
| --- | --- |
| 纵向传入 `children` 无展示 | 文档禁止或 TS 联合类型限制；或后续实现纵向文案。 |
| `separator` 在可滚动区 | 确保不误导为「内容结束」；长列表内分割线密度。 |

---

## 15. 结论

`Divider` 定位为 **布局分割线**（`div` + **`role="separator"`**），支持 **线型、密度、横向带文案**；与 **Button** 同属无状态 API，**无障碍重点为 `aria-orientation`、线段 `aria-hidden` 与文案可读**；**纵向带文案**为当前缺口，须在文档或迭代中闭环。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | Divider 结论 |
| --- | --- |
| 职责 | 区隔内容、可选中间文案 |
| DOM/语义 | `div` + separator；线段 hidden |
| 状态与交互 | 无 |
| 数据与受控 | 无（children 为展示） |
| API | `orientation`、`variant`、`plain`、`titlePlacement`、`children`、`className` |
| 类型与 Ref | `HTMLDivElement` |
| 无障碍 | separator、orientation、线段 hidden |
| 样式与主题 | border-t/l + slate |
| 文档与验证 | 纵向无文案限制、Space 组合 |

---

## 附录 B：参考实现片段（当前仓库）

文件：`packages/ui/src/components/layout/Divider/Divider.tsx`。

要点：

- 横向 + `children`：`flex w-full items-center` + 双侧 `flex-1` 线 + 中间 `span`。  
- 否则：单 `div` + `lineClass` + 横向 `h-0 w-full` 或纵向 `w-0 self-stretch min-h-4`。  
- 全线 `role="separator"` + `aria-orientation`。

（以仓库实际代码为准。）
