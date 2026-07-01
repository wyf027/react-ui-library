# Affix 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/navigation/Affix/Affix.tsx`

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Affix` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/navigation/Affix` |
| 分类 | Navigation（布局吸附能力） |
| 依赖 | `cn` |
| 关联组件 | **布局**（`Container`/`Flex`）、**侧栏目录**（可与 **`Anchor`** 组合）；**非** `position: fixed` + `getContainer` 的完整 Affix 实现 |

---

## 2. 目标与非目标

### 2.1 目标（与当前实现对齐）

1. **为子节点提供「吸顶」容器**：根 **`div`** 使用 **`position: 'sticky'`**、**`top: offsetTop`**（默认 **`0`**）。  
2. **堆叠层级**：默认 **`className` 含 `z-30`**，减少被正文遮挡的概率。  
3. **可合并样式**：**`style={{ position: 'sticky', top: offsetTop, ...style }}`** — 调用方传入的 **`style`** 可 **覆盖** `position`/`top`（见 §14）。  
4. **可扩展根属性**：**`AffixProps` 继承 `HTMLAttributes<HTMLDivElement>`**，**`...props`** 落在根 **`div`**。

### 2.2 非目标

1. **`position: fixed` + 占位节点 + `getScrollContainer`** 等 **Ant Design 式 Affix**：当前 **纯 CSS sticky**，**无** scroll/resize 监听、**无**占位 **`height`** 同步。  
2. **`offsetBottom`、底吸、横向 sticky**：未实现。  
3. **`onChange`（fixed \| unfixed）** 状态回调：无内部 **fixed 态** 可报。  
4. **与 `overflow: hidden/auto` 祖先冲突** 的检测与告警：未做，仅文档说明。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| **长页内工具栏/目录** 在滚动时 **贴顶保留** | **`offsetTop`** 对齐 **固定顶栏高度**（如 **`64`**）。 |
| **表格操作条** 与 **卡片头** | 子内容为任意 **`ReactNode`**，**`Affix` 不负责内部排版**。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 根 | **单 **`div`****，**`ref` / `className` / `style` / `...props`** 均在此。 |
| 语义 | **无** **`role`** / **`aria-*`** 专有条目；语义由 **`children`** 决定（如内嵌 **`nav`** 须自带 **`aria-label`**）。 |

---

## 5. 状态与交互

**无内部 state**。行为完全由 **浏览器 `sticky` 布局** 与 **`offsetTop`** 决定；**无** 点击/键盘逻辑。

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| 配置 | **`offsetTop?: number`**（默认 **`0`**）、**`children`**（必填）。 |
| 受控 | **不适用**（无 fixed/visible 等 React 状态）。 |

---

## 7. API 规范

### 7.1 `AffixProps`

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `offsetTop` | **`sticky` 的 `top`（px 数值）** | `number` | `0` | 非 CSS 字符串；需 **`px`** 时由调用方传 **数字** |
| `children` | 吸附区域内容 | `ReactNode` | **必填** | |
| `className` | 根 `div` | `string` | - | 与 **`z-30`** 等默认类 **`cn` 合并** |
| `style` | 行内样式 | `CSSProperties` | - | **写在展开对象末尾**，可 **覆盖** `position`/`top` |
| 继承 | `HTMLAttributes<HTMLDivElement>` | - | - | |

### 7.2 建议演进（可选）

| 能力 | 优先级 |
| --- | --- |
| **`offsetBottom` / `position: sticky; bottom`** | P2 |
| **文档化 `sticky` 失效条件**（祖先 `overflow`、`height`） | P0（文档） |
| **`fixed` 模式 + 占位 + `getContainer`** | P2（与 **全量 Affix** 对齐时） |
| **`useMergeRefs` + 测量**（若未来要 fixed） | P2 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| 导出 | **`AffixProps`**。 |
| Ref | **`forwardRef<HTMLDivElement, AffixProps>`**，指向 **包裹 `children` 的外层 `div`**。 |

---

## 9. 无障碍（a11y）

**本组件不引入焦点顺序变化**；若 **`children`** 为 **可聚焦控件列表**，顺序与 **非 Affix** 时一致。**吸顶后** 须注意 **不与全局 skip link / 顶栏** 叠层冲突（**`z-30` 与顶栏 z-index** 由设计统一）。

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 默认类 | **`z-30`**（Tailwind）。 |
| 行内 | **`position: 'sticky'`**、**`top: offsetTop`**（数字 → React **默认单位 px**）。 |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| **`Anchor` 外包 `Affix`** | 目录 **`nav`** 吸顶；**`Anchor` 根仍为 `nav`**，**`Affix` 为外层 `div`**，**地标层级** 仍合理。 |
| **顶栏 fixed + 内容 sticky** | **`offsetTop`** 设为 **顶栏高度**，避免 **被顶栏遮挡**。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| 默认 | **`offsetTop` 省略** → **`top: 0`**，**`position: 'sticky'`** 存在于 **`style`**。 |
| 偏移 | **`offsetTop={64}`** → **`style.top === 64`**。 |
| Ref | **`ref.current`** 为 **`HTMLDivElement`**。 |
| `style` 覆盖 | 传入 **`style={{ top: 12 }}`** 验证 **合并后** 以调用方 **`top`** 为准（与实现一致）。 |

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | **长页 + `offsetTop` 对齐顶栏**、**内嵌 `Anchor`**。 |
| 说明 | **`sticky` 生效条件**（滚动容器、祖先 **`overflow`**）；**与 `fixed` Affix 的差异**。 |

---

## 14. 风险与开放问题

| 风险 | 说明 / 缓解 |
| --- | --- |
| **祖先 `overflow: hidden/auto`** | **`sticky` 可能不相对视口「贴顶」**；文档说明 **滚动父级** 边界。 |
| **`style` 覆盖 `position`** | **`...style` 在后**，可能 **关掉 sticky**；属 **有意灵活性**，文档警告。 |
| **`z-30` 与全局层叠** | 模态/抽屉 **z-index** 更高时 **Affix 在下**；按需 **`className` 提高 z-index**。 |

---

## 15. 结论

`Affix` 定位为 **`sticky` 布局薄封装**：**`offsetTop` + `z-30` + `children`**，**无 JS 滚动逻辑**。**适合轻量吸顶**；若需 **固定定位、占位防跳动、容器滚动监听**，属于 **§7.2 演进** 或 **另组件** 范畴。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | Affix 结论 |
| --- | --- |
| 职责 | 子树在滚动容器内吸顶（CSS sticky） |
| DOM/语义 | 单层 `div`，语义由子节点 |
| 状态与交互 | 无 |
| 数据与受控 | 仅 `offsetTop` 数值 |
| API | `children`、`offsetTop`、`className`、`style`、HTML 透传 |
| 类型与 Ref | `AffixProps`、`HTMLDivElement` |
| 无障碍 | 不新增；注意叠层与顶栏 |
| 样式与主题 | `z-30` + inline sticky/top |
| 文档与验证 | 强调 sticky 限制与 style 合并顺序 |

---

## 附录 B：当前源码路径

- `packages/ui/src/components/navigation/Affix/Affix.tsx`
- `packages/ui/src/components/navigation/Affix/index.ts`
