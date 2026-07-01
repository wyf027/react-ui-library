# Anchor 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/navigation/Anchor/Anchor.tsx`

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Anchor` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/navigation/Anchor` |
| 分类 | Navigation |
| 依赖 | `cn` |
| 关联组件 | 页面内 **目录/大纲** 常与 **布局、Typography** 同屏；**非** `Button` 的 `href` 变体（`Button` 为单控件，`Anchor` 为 **链接列表**） |

---

## 2. 目标与非目标

### 2.1 目标（与当前实现对齐）

1. **渲染锚点链接列表**：**`items: AnchorItem[]`** → **`<nav><ul><li><a href>...</a></li></ul></nav>`**。  
2. **卡片式侧栏外观**：根 **`nav`** 带 **圆角边框、内边距、浅/暗主题背景**（与 **`Tree`** 等导航卡片风格接近）。  
3. **类型**：**`AnchorItem`** 含 **`key` / `href` / `title`**（**`title` 为 `string`**，直接作为 **链接可见文本**）。  
4. **可扩展根属性**：**`AnchorProps` 继承 `HTMLAttributes<HTMLElement>`**，**`...props` 落在 `nav`**（如 **`aria-label`**）。

### 2.2 非目标

1. **滚动监听、高亮当前章节、affix/fixed 吸顶**：当前 **无 state**、无 **IntersectionObserver**。  
2. **`getContainer`、`offsetTop`、点击平滑滚动（`scroll-behavior` 除外）**：未封装。  
3. **受控「当前激活项」`activeKey`**、**键盘 roving tabindex**：未实现。  
4. **每项 `icon`、`children`、自定义渲染**：**`AnchorItem`** 仅三字段。  
5. **`target` / `rel` / `download`** 等 **逐链属性**：当前 **仅 `href`**，未从 item 透出。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 长文/文档页 **右侧或左侧目录** | **`href` 为 `#id` 或页内 hash**，依赖 **页面存在对应 `id`**。 |
| 静态大纲 | **`items` 由路由或 CMS 生成**，无运行时「当前节」反馈。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 根 | **`<nav>`**，**`ref` 与 `className` 及 `...props` 挂载于此**。 |
| 列表 | **`<ul className="space-y-1 text-sm">`**。 |
| 项 | **`<li key={item.key}>`** + **`<a href={item.href}>`**，子节点为 **`item.title` 文本**。 |
| 语义 | **导航地标 `nav` + 无序列表** 合理；**建议**由调用方设置 **`aria-label`**（如「本页目录」），否则 **读屏中 `nav` 名称可能偏弱**。 |

---

## 5. 状态与交互

**无内部 state**。交互完全为 **原生 `<a href>`**：跳转、新标签策略由 **浏览器与 `href` 形态** 决定（**未**设置 **`target="_blank"`**）。

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| 数据源 | **`items`** 必填；**无「空列表」占位**（**`items=[]`** 时 **空 `ul`**）。 |
| 受控 | **不适用**（无选中/展开状态 API）。 |

---

## 7. API 规范

### 7.1 `AnchorItem`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `key` | `string` | **React `key`**，宜 **稳定唯一**。 |
| `href` | `string` | **`<a href>`**，可为 **`#section`** 或绝对/相对 URL。 |
| `title` | `string` | **链接文本**（同时作为 **默认可访问名称**）。 |

### 7.2 `AnchorProps`

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `items` | 锚点项列表 | `AnchorItem[]` | **必填** | |
| `className` | 根 `nav` | `string` | - | **`cn`** 与默认卡片类合并 |
| 继承 | `HTMLAttributes<HTMLElement>` | - | - | 推荐 **`aria-label`** / **`aria-labelledby`** |

### 7.3 建议演进（可选）

| 能力 | 优先级 |
| --- | --- |
| **`aria-label` 默认值** 或 **文档强制约定** | P1 |
| **`activeKey` + 滚动 spy` / `onChange`** | P1 |
| **`item.target` / `item.rel`、外链安全 `rel="noopener noreferrer"`** | P1 |
| **`getScrollContainer`、`offset`、平滑滚动 API** | P2 |
| **`item.icon`、`renderItem`** | P2 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| 导出 | **`AnchorItem`**、**`AnchorProps`**。 |
| Ref | **`forwardRef<HTMLElement, AnchorProps>`**，**指向根 `<nav>`**（运行时一般为 **`HTMLNavElement`**，可演进收窄类型）。 |

---

## 9. 无障碍（a11y）

| 项 | 当前 | 建议 |
| --- | --- | --- |
| 地标 | **`nav`** 有 | 根上 **`aria-label`**（经 **`...props`**） |
| 链接 | 文本 **`title`** | 若设计为「仅图标」需另演进（当前 **纯文本** ✓） |
| 当前节 | 无 **`aria-current="location"`** | 与 **`activeKey`** 演进同步 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 根 `nav` | **`rounded-lg border border-slate-200 bg-white p-3`**，暗色 **`dark:border-slate-700 dark:bg-slate-900`**。 |
| 链接 | **`text-slate-600 hover:text-brand-600`**，暗色 **`dark:text-slate-300 dark:hover:text-brand-400`**。 |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| 正文标题 | 被 **`href="#id"`** 指向的区块须具备 **`id`**，否则 **跳转无效**。 |
| 与 **Button `href`** | **`Button`** 单锚点为 **按钮形态**；**`Anchor`** 为 **多链接导航列表**，选型按 **信息架构** 区分。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| 渲染 | **`items` N 条** → **N 个 `li` + `a`**，`href`/`title` 正确。 |
| Ref | **`ref.current`** 为 **`nav` 元素**。 |
| 透传 | **`aria-label`** 出现在 **`nav`** 上。 |
| 空列表 | **`items={[]}`** → **空 `ul`**（行为固定，文档可说明是否需占位）。 |

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | **页内 `#` 目录**、**`aria-label`**、与 **右侧内容区 `id`** 的配套写法。 |
| 说明 | **无滚动高亮**；外链若需 **`target`** 当前 **不可用 item 配置**，需 **包装自定义 `a`** 或演进 API。 |

---

## 14. 风险与开放问题

| 风险 | 说明 / 缓解 |
| --- | --- |
| **`key` 重复** | React 警告与 **行为未定义**；数据保证 **唯一**。 |
| **缺 `aria-label` 的多 `nav`** | 一页多个 **`nav`** 时读屏区分困难；**文档与示例强调**。 |
| **外链无 `rel`** | **`target="_blank"`** 若未来支持，须 **`noopener`**；当前 **默认本页/同窗** 风险较低。 |

---

## 15. 结论

`Anchor` 定位为 **静态锚点导航列表**：**`nav` + `ul` + 文本链接**，**无状态、无滚动 spy**，适合 **简单文档目录**。**生产页建议始终传入 `aria-label`**；若需 **Ant Design Anchor 类能力**（高亮、偏移、容器），属 **§7.3 演进** 范围。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | Anchor 结论 |
| --- | --- |
| 职责 | 多链接页内/外链目录 |
| DOM/语义 | `nav`、`ul`、`li`、`a` |
| 状态与交互 | 无；原生链接 |
| 数据与受控 | 仅 `items` 配置 |
| API | `items` + `HTMLAttributes` 透传 |
| 类型与 Ref | `AnchorProps`、`HTMLElement` → `nav` |
| 无障碍 | 依赖业务 `aria-label`；无 `aria-current` |
| 样式与主题 | 卡片 + 品牌色 hover |
| 文档与验证 | 强调局限与 `id` 配套 |

---

## 附录 B：当前源码路径

- `packages/ui/src/components/navigation/Anchor/Anchor.tsx`
- `packages/ui/src/components/navigation/Anchor/index.ts`
