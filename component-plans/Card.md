# Card 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/data/Card/Card.tsx`；测试见 **`Card.test.tsx`**。

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Card` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/data/Card` |
| 分类 | Data |
| 依赖 | `cn`、**`Spin`**（**`loading` 遮罩**） |
| 关联组件 | **`Container`**（布局容器）、**`Button`**（**`extra`/`actions`** 内常见） |

---

## 2. 目标与非目标

### 2.1 目标

1. **区块容器**：根 **`<section>`**，**`rounded-xl bg-white shadow-sm`**，**`dark:bg-slate-900`**；**`bordered`**（默认 **`true`**）时 **边框**。  
2. **可选结构**：**`cover`**（顶区全宽 **`overflow-hidden`**）→ **主体**（**`paddingCls`**，**有 `cover` 时 `border-t` 分隔**）→ **可选 `actions` 页脚**（**`footer` + 顶边框 + 灰底**）。  
3. **标题行**：**`(title || extra)`** 时 **`<header>`**：**`<h3>`** 放 **`title`** + **`extra`** 右侧。  
4. **加载**：**`<Spin spinning={loading}>`**（默认 **`loading=false`**）包裹 **内层 `relative` 整块**（**含 cover、主体、footer**），**`loading=true`** 时 **遮罩挡交互**。  
5. **尺寸**：**`size?: 'default' | 'small'`** — **`p-4`/`px-4 py-3`** vs **`p-3`/`px-3 py-2`**（**主体与 footer**）。  
6. **`hoverable`**：**`hover:shadow-md`** + **过渡**。  
7. **属性透传**：**`Omit<HTMLAttributes<HTMLDivElement>, 'title'>`** 落在 **`<section {...props}>`**（**见 §8 类型与标签**）。

### 2.2 非目标

1. **栅格/折叠面板、内置 tabs**：当前 **无**。  
2. **`title` 为原生 `string` HTML `title` 提示**：已 **`Omit`**，**`title` 为 `ReactNode` 走 `<h3>`**。  
3. **`Spin` 的 `tip`**：**`Card`** **未** 向 **`Spin`** 传 **`tip`**。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 仪表盘模块、表单分组 | **`title`+`children`**；**`extra`** 放 **「查看更多」** 等。 |
| 媒体卡片 | **`cover`** + **正文**；**`actions`** 放 **主次按钮行**。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 根 | **`<section ref={ref} className={cn(...)} {...props}>`** |
| 加载 | **`<Spin spinning={loading}>`** → **`<div className="relative">`** … |
| 封面 | **`cover`**：**`<div className="block w-full overflow-hidden">`** |
| 主体容器 | **`div`**：**`paddingCls`** + **条件 `border-t`**（**有 `cover`**） |
| 头 | **`(title \|\| extra)`** → **`<header className="mb-3 flex ...">`** + **`<h3>`** + **`extra`** |
| 正文 | **`<div>{children}</div>`** |
| 脚 | **`actions`** → **`<footer className={...border-t...}>`** |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| 状态 | **无** `useState`；**`loading`** **全由 props** 交给 **`Spin`**。 |
| 交互 | **子内容** 与 **`actions`** 由 **业务** 提供；**`loading`** 时 **`Spin`** **遮罩** 拦截 **整块** 指针事件。 |

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| 数据 | **无** `value`/`onChange`；**展示型容器**。 |

---

## 7. API 规范

### 7.1 `CardProps`（当前实现）

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `title` | 标题 | `ReactNode` | - | 渲染于 **`h3`** |
| `extra` | 头部右侧 | `ReactNode` | - | |
| `cover` | 顶部封面区 | `ReactNode` | - | |
| `actions` | 底部操作区 | `ReactNode` | - | |
| `children` | 主体 | `ReactNode` | - | |
| `loading` | 加载遮罩 | `boolean` | `false` | **透传 `Spin`** |
| `bordered` | 是否外边框 | `boolean` | `true` | |
| `hoverable` | 悬浮加深阴影 | `boolean` | `false` | |
| `size` | 内边距档位 | `'default' \| 'small'` | `'default'` | |
| `className` | 根 `section` | `string` | - | |
| 继承 | `Omit<HTMLAttributes<HTMLDivElement>, 'title'>` | - | - | |

### 7.2 视觉（摘要）

| 项 | 类名要点 |
| --- | --- |
| 根 | **`overflow-hidden rounded-xl ... shadow-sm`** |
| footer | **`border-t bg-slate-50 dark:bg-slate-800/50`** |

### 7.3 建议演进（可选）

| 能力 | 优先级 |
| --- | --- |
| **`forwardRef` 类型改为 `HTMLElement`/`HTMLSectionElement`** | P2 |
| **仅 `extra` 无 `title` 时不渲染空 `h3`** | P2 |
| **`Spin` `tip` 透传、`loading` 时仍可折叠等** | P3 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| 声明 | **`forwardRef<HTMLDivElement, CardProps>`** |
| 实际 | **根 DOM 为 `<section>`** — **与类型字面 `HTMLDivElement` 不一致**（**运行时 ref 仍可附着**）。 |

---

## 9. 无障碍（a11y)

| 项 | 方案 |
| --- | --- |
| 标题 | **`title`** 在 **`<h3>`**；**无 `title` 仅有 `extra`** 时 **仍渲染 `<h3>`** 可能 **空标题**（见 §14）。 |
| 根 | **`section`** — **无** **`aria-labelledby`** 与 **`h3` id** 关联（演进可选）。 |
| **`Spin`** | **见 `Spin` 技术方案** — **无 `aria-busy`** 等。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 暗色 | **根/边框/字色/footer** 均带 **`dark:`**。 |
| 与 **`Spin`** | **遮罩** **`white/60` + `dark:slate-900/60`**（**`Spin` 实现**）。 |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| **`Spin` 包裹** | **单根 `children`** 为 **`div.relative`**；**`loading`** 时 **整块**（**含 footer**）**不可点**。 |
| **`{...props}`** | 在 **`section`**；可传 **`aria-label`** 描述 **无标题卡片**。 |

---

## 12. 测试与验收

| 类型 | 用例（**`Card.test.tsx` 已覆盖**） |
| --- | --- |
| 标题与正文 | **`title`** → **`role="heading"` level 3**；**`children`** 文案。 |

| 类型 | 用例（**建议补测**） |
| --- | --- |
| **`loading`** | **`Spin`** 遮罩出现。 |
| **`cover`/`actions`/`bordered`/`hoverable`/`size`** | DOM 结构与类名。 |
| **仅 `extra`** | **空 `h3`** 行为（§14）。 |

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | **`cover`+`actions`**、**`extra`**、**`loading`**、**`size`**。 |
| 说明 | **根为 `section`**、**与 `Spin` 组合**、**`title`/`extra` 头显规则**。 |

---

## 14. 风险与开放问题

| 风险 | 说明 |
| --- | --- |
| **空 `h3`** | **`extra` 有而 `title` 无** 时 **`<h3>` 无文本**，**读屏/大纲** 差。 |
| **类型与标签** | **`HTMLDivElement` vs `section`** 误导 **类型收窄/扩展 DOM**。 |
| **`Spin` a11y** | **加载态** 无 **`aria-busy`** 于 **卡片根**（**`Spin` 文档**）。 |

---

## 15. 结论

`Card` 为 **`section` 根 + 可选 cover/头(h3+extra)/正文/脚(actions) + `Spin` 加载 + bordered/hoverable/size** 的复合容器，**对标 Ant Design `Card` 子集 API**。与 **Button** 无继承关系；**`actions`/`extra`** 内常放 **`Button`**。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | Card 结论 |
| --- | --- |
| 职责 | 内容区块 + 可选头脚封面 |
| DOM/语义 | section、header h3、footer |
| 状态与交互 | loading→Spin |
| 数据与受控 | 无 |
| API | title、extra、cover、actions、loading… |
| 类型与 Ref | 声明 Div，实际 section |
| 无障碍 | h3；空标题风险 |
| 样式与主题 | rounded-xl、dark、Spin 遮罩 |
| 文档与验证 | Spin、extra-only |

---

## 附录 B：参考实现片段（当前仓库）

文件：`packages/ui/src/components/data/Card/Card.tsx`。

要点：**`<Spin spinning={loading}>`**、**`cover`/`header`/`footer` 条件**、**`paddingCls`/`footerPadding`**。

（以仓库实际代码为准。）
