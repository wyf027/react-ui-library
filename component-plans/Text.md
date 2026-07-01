# Text 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/basic/Typography/Typography.tsx`（`Text` 与 `Title`、`Paragraph` 同文件导出）

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Text` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/basic/Typography` |
| 分类 | Basic（Typography 子集） |
| 依赖 | `cn`（`utils/cn`） |
| 关联组件 | `Title`、`Paragraph`、`Button`、`Tag`、`Descriptions` |

---

## 2. 目标与非目标

### 2.1 目标

1. **正文辅助文案**：用于说明、标签、表格单元内次要文字等，与 `Title`（标题）和 `Paragraph`（段落块）形成分工。  
2. **行内语义容器**：默认 **`span`**，可嵌入标题、按钮、列表项内而不破坏父级语义。  
3. **一致的字号与颜色**：亮/暗模式下的 `text-sm` 与 slate 阶梯与整库 Typography 对齐。  
4. **样式可扩展**：`className` 覆盖；透传原生 `span` 属性（如 `title`）。

### 2.2 非目标

1. **块级大段文章**：长文请用 **`Paragraph`** 或多 `Paragraph`，避免用 `Text` 堆叠成「假段落」。  
2. **富文本安全过滤**：HTML 字符串解析不在 `Text` 内实现。  
3. **自动链接识别**：由业务或 Markdown 组件处理。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 标题副文案 | `Title` 下方一行说明（仍为行内或小段时可用 `Text`）。 |
| 表单标签旁提示 | 与 `FormItem` helper 配合；注意与 `label` 的关联（`id`/`htmlFor` 在 FormItem 侧）。 |
| 表格次要列 | 次要信息、状态副文案。 |
| 按钮内补充 | 谨慎：`Button` 内通常直接写字符串；需要样式区分时可用 `Text` 包一层并控制 `className`。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 根元素 | **`span`**（当前实现），适合行内与 `inline-flex` 布局中的辅助字。 |
| 角色 | 无特殊 `role`；不宣称「段落」或「标题」。 |
| 子内容 | `children` 为文本或内联节点（`strong`、`code`、`a` 等）。 |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| 内置状态 | **无** loading/disabled。 |
| 可选演进 | `copyable`、`mark`、`keyboard` 等与 Ant Design Typography 对齐的能力，若增加需单独 a11y 与键盘设计。 |

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| 业务数据 | **无** value/onChange。 |
| 内容 | 由 `children` 或父级传入。 |

---

## 7. API 规范

### 7.1 当前实现对照

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `className` | 样式扩展 | `string` | - | 与预设类通过 `cn` 合并 |
| `children` | 文本或行内节点 | `ReactNode` | - | 空 children 时 DOM 为空 span，文档标注尽量避免 |
| 其余 | 继承 `HTMLAttributes<HTMLSpanElement>` | - | - | 如 `id`、`style`、`title`、`onClick` |

当前类型导出：`export type TextProps = HTMLAttributes<HTMLSpanElement>`，无单独 `level`/`variant` 扩展字段。

### 7.2 当前样式（实现摘要）

| 类名片段 | 含义 |
| --- | --- |
| `text-sm` | 正文字号（与表单、表格密度一致） |
| `text-slate-700 dark:text-slate-300` | 主辅色 |

### 7.3 建议演进（可选）

| 属性 | 说明 | 优先级 |
| --- | --- | --- |
| `type` / `variant` | `secondary` / `danger` / `success` 等语义色 | P2 |
| `strong` | 布尔简写，等价于内部 `font-semibold` | P3 |
| `ellipsis` | 单行截断 + 可选 `title` | P2 |
| `as` / `component` | 多态为 `p` 时需谨慎：与 `Paragraph` 职责重叠，文档需二选一指引 | P3 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| 接口 | `TextProps` 等价 `HTMLAttributes<HTMLSpanElement>`（可显式 `extends` 便于 JSDoc）。 |
| Ref | `forwardRef<HTMLSpanElement, TextProps>`，指向根 `span`。 |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| 颜色对比度 | `text-slate-700` / `dark:text-slate-300` 在常见背景上需满足 WCAG；浅底深字由设计验收。 |
| 不要替代 `label` | 表单控件的可访问名称仍应由 **`label`** 或 `aria-label` 提供，`Text` 仅作视觉辅助。 |
| 可点击 `Text` | 若 `onClick` 用于导航/操作，应改用 **`Button`** `variant="ghost"` 或 **`a`**，并补齐键盘与焦点样式。 |
| 动态更新 | 若用于实时状态（如倒计时），重要变更可考虑 `aria-live`（一般由父级区域承担）。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 与 Title 层级 | `Title` 更大更粗；`Text` 更小、对比度略低，形成清晰层级。 |
| 与 Paragraph | `Paragraph` 为块级与行高 `leading-7`；`Text` 为行内默认，不换段职责。 |
| 主题 | 演进时可接入 `NovaThemeTokens` 的 `text.secondary` 等键，替代写死 slate。 |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| `Title` + `Text` | 垂直间距用 `Space` 或 margin token。 |
| `Button` + `Text` | 少用在按钮内；若用，注意不要破坏按钮最小点击区与 `aria`。 |
| `Card` | 卡片描述区常用 `Text` 或 `Paragraph`，文档给推荐。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| 渲染 | 默认根为 `span`，含 `text-sm` 与 slate 色类。 |
| className | 传入类与预设合并，后者可被覆盖（以当前 `cn` 顺序为准）。 |
| Ref | `ref.current` 为 `HTMLSpanElement`。 |
| 空 children | 可接受空节点；不崩溃。 |

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | 单行说明、暗色、与 `Title` 组合、表格内次要信息。 |
| API 表 | 当前以「继承 `HTMLAttributes<HTMLSpanElement>`」为主说明。 |
| 反模式 | 大段正文不要用多个 `Text` 拼段落；可点击伪链不要用裸 `Text`。 |

---

## 14. 风险与开放问题

| 风险 | 缓解 |
| --- | --- |
| 与 `Paragraph` 边界模糊 | 文档用「行内/短句 → Text；块段落 → Paragraph」一句话规则。 |
| 无 `variant` 导致各处手写 `className` | 演进 `type` 枚举，收敛语义色。 |

---

## 15. 结论

`Text` 定位为 **行内、小字号、次要色的通用文案容器**，与 **Title**、**Paragraph** 分工明确；与 **Button** 同属无状态基础组件，**无障碍重点在使用场景**（不替代 label、可点击时用正确控件）。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | Text 结论 |
| --- | --- |
| 职责 | 辅助/行内正文样式 |
| DOM/语义 | `span` |
| 状态与交互 | 无内置 |
| 数据与受控 | 无 |
| API | 继承 `HTMLSpanElement` + `className`/`children` |
| 类型与 Ref | `HTMLSpanElement` |
| 无障碍 | 对比度；不替代 label；可点击用 Button/Link |
| 样式与主题 | `text-sm` + slate 辅色 |
| 文档与验证 | 与 Title/Paragraph 对照 + 反模式 |

---

## 附录 B：参考实现片段（当前仓库）

文件：`packages/ui/src/components/basic/Typography/Typography.tsx`。

```tsx
export type TextProps = HTMLAttributes<HTMLSpanElement>

export const Text = forwardRef<HTMLSpanElement, TextProps>(function Text({ className, ...props }, ref) {
  return <span ref={ref} className={cn('text-sm text-slate-700 dark:text-slate-300', className)} {...props} />
})
```

（以仓库实际代码为准。）
