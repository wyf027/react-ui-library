# Paragraph 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/basic/Typography/Typography.tsx`（`Paragraph` 与 `Title`、`Text` 同文件导出）

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Paragraph` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/basic/Typography` |
| 分类 | Basic（Typography 子集） |
| 依赖 | `cn`（`utils/cn`） |
| 关联组件 | `Title`、`Text`、`Card`、`Empty`、`Result` |

---

## 2. 目标与非目标

### 2.1 目标

1. **块级正文段落**：使用语义 **`p`**，承载多行说明、介绍文案、卡片正文等。  
2. **可读行高**：与 `Text`（行内、默认无段间距）区分，提供适合长读的 **`leading-7`**。  
3. **一致的正文色阶**：亮/暗下使用略弱于 `Text` 主辅色的 slate，形成「标题 > 辅助行 > 段落」层级（与当前实现一致时可文档化）。  
4. **可扩展**：`className` 覆盖；透传 `HTMLParagraphElement` 属性（如 `id` 供锚点）。

### 2.2 非目标

1. **标题语义**：不用 `Paragraph` 代替 `Title`/`h*`。  
2. **列表语义**：枚举项应使用 `ul`/`ol`/`li` 或 `List` 组件，而非多个 `Paragraph` 前加 `-` 模拟。  
3. **Markdown 全功能解析**：不在组件内内置 MD 引擎。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 文章/说明多行正文 | 单段或多段各包一层 `Paragraph`。 |
| 卡片/模态描述 | `Card` 内容区、`Modal`/`Drawer` 正文区。 |
| 空状态/结果页说明 | `Empty`、`Result` 的 `description` 区域可与 `Paragraph` 组合。 |
| 表单下的帮助全文 | 较长说明用 `Paragraph`；单行提示仍可用 `Text` 或 FormItem helper。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 根元素 | **`p`**（当前实现），块级，符合「段落」语义，利于读屏与 SEO 理解结构。 |
| 角色 | 原生段落，不添加冗余 `role`。 |
| 子内容 | `children` 为文本或行内/短语级子节点；避免在 `p` 内嵌套 **`div`** 等块级元素（HTML 无效嵌套）。 |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| 内置状态 | **无** loading/disabled。 |
| 可选演进 | `ellipsis`（多行截断需 `-webkit-line-clamp`）、`copyable`、`expandable` 长文展开等，需单独设计与测试。 |

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| 业务数据 | **无** value/onChange。 |
| 内容 | `children` 由父级传入；富文本由父级先清洗再传入 React 节点。 |

---

## 7. API 规范

### 7.1 当前实现对照

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `className` | 样式扩展 | `string` | - | 与预设类通过 `cn` 合并 |
| `children` | 段落内容 | `ReactNode` | - | 避免 `p` > `div` 非法嵌套 |
| 其余 | 继承 `HTMLAttributes<HTMLParagraphElement>` | - | - | 如 `id`、`style`、`title` |

当前类型导出：`export type ParagraphProps = HTMLAttributes<HTMLParagraphElement>`。

### 7.2 当前样式（实现摘要）

| 类名片段 | 含义 |
| --- | --- |
| `text-sm` | 与 `Text` 同级字号，保持 Typography 密度一致 |
| `leading-7` | 段落行高，利于长读 |
| `text-slate-600 dark:text-slate-400` | 段落正文色（相对 `Text` 略弱，形成层级） |

### 7.3 建议演进（可选）

| 属性 | 说明 | 优先级 |
| --- | --- | --- |
| `type` / `variant` | 强调/警告/成功等语义色段落 | P2 |
| `spacing` | 段前段后 margin 预设（`compact`/`comfortable`） | P2 |
| `strong` / `mark` | 装饰快捷 props | P3 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| 接口 | `ParagraphProps` 等价 `HTMLAttributes<HTMLParagraphElement>`（可显式 `extends` 便于 JSDoc）。 |
| Ref | `forwardRef<HTMLParagraphElement, ParagraphProps>`，指向根 `p`。 |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| 语义 | 使用真实 **`p`**，读屏按段落停顿，优于 `div` 堆字。 |
| 对比度 | `text-slate-600` / `dark:text-slate-400` 需在实底上验收 WCAG。 |
| 非法嵌套 | **禁止**在 `Paragraph`（`p`）内放块级组件（如另一 `Paragraph` 若也渲染为 `p` 会嵌套 `p`）；多段应 **兄弟并列** 多个 `Paragraph`。 |
| 长文 | 若可编辑或动态插入链接，注意焦点顺序与链接可辨识性。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 与 `Text` | `Text` 行内短辅文；`Paragraph` 块级长文 + 更大行高。 |
| 与 `Title` | 标题下接第一段 `Paragraph` 时间距用 `Space` 或 margin token 统一。 |
| 主题 | 演进时可绑定 `NovaThemeTokens` 的 `text.paragraph` 等键。 |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| 多个 `Paragraph` | 垂直间距用 `Space direction="vertical"` 或组件 `spacing`（演进）统一。 |
| `Card` | 卡片主体描述优先 `Paragraph`。 |
| `Title` + `Paragraph` | 页面/区块标准阅读顺序。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| 渲染 | 根为 `p`，含 `text-sm`、`leading-7`、slate 色类。 |
| className | 合并与覆盖顺序符合项目约定。 |
| Ref | `ref.current` 为 `HTMLParagraphElement`。 |
| 嵌套 | 不在 `p` 内传入渲染为 `div` 的子组件（开发期可用 eslint 或文档约束）。 |

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | 单段、多段、暗色、与 `Title`/`Text` 混排、卡片内。 |
| API 表 | 以继承 `HTMLParagraphElement` 为主；列出非法嵌套反例。 |
| 与 Text 对照表 | 一行说明选型规则。 |

---

## 14. 风险与开放问题

| 风险 | 缓解 |
| --- | --- |
| `p` 嵌套 `p` | 文档强调多段用多个兄弟 `Paragraph`；或外层用 `div` 包多 `p`。 |
| 在 `p` 内使用自定义组件且根为 `div` | 自定义组件根改为 `span` 或不用 `Paragraph` 包裹。 |

---

## 15. 结论

`Paragraph` 定位为 **语义化块级段落**，以 **`p` + 行高 + 段落色** 与 **`Title` / `Text`** 形成 Typography 三层；与 **Button** 同属无状态基础组件，**无障碍与合法 DOM 结构强依赖用法**（尤其避免 `p` 包块级）。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | Paragraph 结论 |
| --- | --- |
| 职责 | 多行块级正文 |
| DOM/语义 | `p` |
| 状态与交互 | 无内置 |
| 数据与受控 | 无 |
| API | 继承 `HTMLParagraphElement` + `className`/`children` |
| 类型与 Ref | `HTMLParagraphElement` |
| 无障碍 | 真段落语义；禁止无效嵌套 |
| 样式与主题 | `text-sm` + `leading-7` + slate 段落色 |
| 文档与验证 | 与 Text 对照 + 嵌套反例 |

---

## 附录 B：参考实现片段（当前仓库）

文件：`packages/ui/src/components/basic/Typography/Typography.tsx`。

```tsx
export type ParagraphProps = HTMLAttributes<HTMLParagraphElement>

export const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(function Paragraph(
  { className, ...props },
  ref,
) {
  return <p ref={ref} className={cn('text-sm leading-7 text-slate-600 dark:text-slate-400', className)} {...props} />
})
```

（以仓库实际代码为准。）
