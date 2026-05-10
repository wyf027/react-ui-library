# Loading 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/feedback/Loading/Loading.tsx`

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Loading` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/feedback/Loading` |
| 分类 | Feedback |
| 依赖 | `cn` |
| 关联组件 | **`Spin`**（全页/容器占位）、**`Button`**（`loading` 态内嵌指示）、**`Skeleton`**（骨架屏） |

---

## 2. 目标与非目标

### 2.1 目标

1. **行内加载指示**：**`inline-flex items-center gap-2`**，左侧 **旋转圆环**（**`animate-spin` + `rounded-full` + `border-2 border-current border-r-transparent`**），右侧 **文案 `text`**。  
2. **三档尺寸**：**`size?: 'sm' | 'md' | 'lg'`**（默认 **`'md'`**）映射 **圆环 `h/w`**：**`4/5/6`**（**`rem` 尺度即 Tailwind 数字单位**）。  
3. **读屏状态**：根节点 **`role="status"`**、**`aria-live="polite"`**。  
4. **属性透传**：**`HTMLAttributes<HTMLDivElement>`** 落在根 **`div`**（**`{...props}` 在 `className` 之后**）。

### 2.2 非目标

1. **全屏遮罩、阻塞交互、Portal**：当前 **无**；仅 **行内** 展示。  
2. **`children` 自定义插槽**：当前 **无**；仅 **`text: string`** 与 **固定双 `span` 结构**。  
3. **进度百分比、步骤文案**：当前 **无**。  
4. **与 `Spin` 能力对齐**：**`Spin`** 另有 **遮罩/包裹子内容** 等能力（见 **`Spin` 实现**）；**`Loading`** 为 **更轻** 的 **图标+字** 组合。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 按钮内、表格单元、卡片脚 | 需要 **小占位** 且 **不占满屏** 时 **`Loading`**。 |
| 整页或卡片 body 遮罩 | 优先 **`Spin`** 或业务 **`fixed` 遮罩**；**`Loading`** **不** 自带遮罩。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 根 | **`<div ref={ref} role="status" aria-live="polite" className={cn('inline-flex items-center gap-2', className)} {...props}>`** |
| 圆环 | **`<span>`** — **无 `aria-hidden`**（与 **根 `role="status"`** 组合；读屏通常读 **整体 polite 更新**；演进可对装饰 **`span` 加 `aria-hidden`** 避免重复）。 |
| 文案 | **`<span className="text-sm text-slate-600 dark:text-slate-300">`** **`{text}`** |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| 状态 | **无** 内部 `useState`；**纯展示**，**旋转** 由 **CSS `animate-spin`** 驱动。 |
| 交互 | **无** 点击/键盘逻辑。 |

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| 数据 | **无** `value`/`open`；**`text`**、**`size`** 由 **props** 决定，**全由父组件控制**。 |

---

## 7. API 规范

### 7.1 `LoadingProps`（当前实现）

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `text` | 右侧文案 | `string` | `'Loading...'` | 传 **`''`** 可 **仅显示圆环**（仍占 **第二个 `span`** 节点） |
| `size` | 圆环尺寸档 | `'sm' \| 'md' \| 'lg'` | `'md'` | |
| `className` | 根容器样式 | `string` | - | |
| 继承 | `HTMLAttributes<HTMLDivElement>` | - | - | **`{...props}` 置后** 可覆盖 **`role`/`aria-live`**（见 §14） |

### 7.2 视觉与主题

| 项 | 说明 |
| --- | --- |
| 圆环色 | **`border-current`** — **继承父级 `color`**；父未设色时随 **默认文本色**。 |
| 文案色 | **`text-slate-600 dark:text-slate-300`** |

### 7.3 建议演进（可选）

| 能力 | 优先级 |
| --- | --- |
| **`label`/`aria-label` 与 `text` 解耦**（长文案仅视觉） | P2 |
| **`children` 替代或补充 `text`** | P2 |
| **装饰 `span` `aria-hidden`** | P3 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| Ref | **`forwardRef<HTMLDivElement, LoadingProps>`** → **根 `div`** |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| 根 | **`role="status"`** + **`aria-live="polite"`** — 适合 **状态更新**；**首次挂载** 时读屏是否播报依赖 **UA**，**无** 额外 **`aria-busy`** 于子树。 |
| 文案 | **`text`** 为 **可见文本**；与 **`role="status"`** 搭配时 **避免与父级重复 live**（同一区域 **多个 polite** 可能 **互相打断** — 业务注意）。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 暗色 | 文案 **`dark:text-slate-300`**；圆环依赖 **`currentColor`**。 |
| 布局 | **`inline-flex`** — 可嵌入 **行内/ flex 子项** 不占满宽。 |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| **`Button` 内** | **`Loading`** **非** `Button` 子 API；业务 **`Button` disabled + `Loading`** 或 **`Button` `children` 内嵌 `Loading`**。 |
| **父级 `color`** | 需 **品牌色圆环** 时父级设 **`text-brand-500`** 等。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| 渲染 | **根 `role="status"`**、**`aria-live="polite"`**、**`text` 默认/自定义**。 |
| **`size`** | **`sm`/`md`/`lg`** 对应 **圆环** **类名或尺寸**（快照或 computed style）。 |
| 快照 | **旋转类 `animate-spin`** 存在。 |

（仓库 **当前无** `Loading.test.tsx`；以上为建议用例。）

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | 三 **`size`**、**`text=''`** 仅环、与 **`Button`** 并排。 |
| 说明 | **与 `Spin` 选型**、**`border-current` 继承**、**`props` 勿覆盖 `role`**。 |

---

## 14. 风险与开放问题

| 风险 | 说明 |
| --- | --- |
| **`{...props}` 覆盖 `role`/`aria-live`** | 可能 **破坏** 读屏语义。 |
| **始终渲染第二 `span`** | **`text=''`** 时仍有一个 **空 `span`**，布局 **仍有 `gap-2` 间距**；若需 **零间距** 需 **`className` 调 gap** 或演进 **条件渲染**。 |
| **无 `aria-busy` 与区域关联** | 大段内容加载中 **建议** 在 **列表根** 等处 **`aria-busy`** — **非** 本组件职责，文档提示。 |

---

## 15. 结论

`Loading` 为 **行内 `role="status"` + 旋转圆环 + 文案** 的纯展示组件，**`size`/`text` 可配**，**无遮罩与受控状态**。与 **Button** 无继承关系；与 **`Spin`** 分工为 **轻量 vs 容器级占位**。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | Loading 结论 |
| --- | --- |
| 职责 | 行内加载中指示 |
| DOM/语义 | div status + 双 span |
| 状态与交互 | 无状态；CSS spin |
| 数据与受控 | 无；props 驱动 |
| API | text、size、HTML 透传 |
| 类型与 Ref | HTMLDivElement |
| 无障碍 | status、polite |
| 样式与主题 | currentColor 环、slate 字 |
| 文档与验证 | Spin 对比、props 覆盖 |

---

## 附录 B：参考实现片段（当前仓库）

文件：`packages/ui/src/components/feedback/Loading/Loading.tsx`。

要点：**`animate-spin`**、**`border-current border-r-transparent`**、**`size` 映射 h/w**。

（以仓库实际代码为准。）
