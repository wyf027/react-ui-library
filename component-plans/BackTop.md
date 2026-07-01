# BackTop 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/navigation/BackTop/BackTop.tsx`

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `BackTop` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/navigation/BackTop` |
| 分类 | Navigation |
| 依赖 | `cn` |
| 关联组件 | **`Affix`**（侧栏吸顶）；**`BackTop`** 为 **视口级「回顶」** floating 按钮 |

---

## 2. 目标与非目标

### 2.1 目标（与当前实现对齐）

1. **监听窗口纵向滚动**：**`window`** 上 **`scroll`**，**`window.scrollY > visibilityHeight`**（默认 **`200`**）时 **显示按钮**。  
2. **点击回顶**：**`window.scrollTo({ top: 0, behavior: 'smooth' })`**。  
3. **浮动样式**：**`position: fixed`**，**`bottom-6 right-6`**，**圆角满胶囊形**、**品牌色底**、**白字阴影**。  
4. **可扩展按钮属性**：**`BackTopProps` 继承 `ButtonHTMLAttributes<HTMLButtonElement>`**，**`...props`** 透传（如 **`aria-label`**、**`disabled`**）。

### 2.2 非目标

1. **自定义滚动容器**（**`getTarget` / `target`**）：当前 **仅 `window`**，**非** 可滚动 `div`。  
2. **`visibilityHeight` 以外** 的 **水平滚动、双向阈值**：未实现。  
3. **专用图标/文案 API**：默认子节点为 **`↑ Top`**；可通过 **`children`** 覆盖（继承自 **`ButtonHTMLAttributes`**）。  
4. **SSR 首屏 hydration 与 `scrollY` 同步**：未单独处理（见 §14）。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| **长文档/落地页** | 用户下滚超过阈值后出现 **一键回顶**。 |
| **与布局并存** | **`fixed`** 贴右下角，注意 **与聊天挂件、Cookie 条** 重叠（**`className` 微调位置**）。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 不可见时 | **`return null`** — **DOM 中无节点**。 |
| 可见时 | **`<button type="button">`**，默认子节点为 **文本 `↑ Top`**。 |
| 语义 | 建议调用方设置 **`aria-label`**（如「返回顶部」）；默认 **英文可见文本** 对中文站 **未必合适**。 |

---

## 5. 状态与交互

### 5.1 可见性

- **`useState(false)`** → **`visible`**。  
- **`useEffect`** 注册 **`window` `scroll`**，回调 **`setVisible(window.scrollY > visibilityHeight)`**；**mount 时立即 `onScroll()`** 一次。  
- **`visibilityHeight` 变化** 时 **effect 重跑**，监听重建。

### 5.2 点击

- JSX 中先写 **`onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}`**，再展开 **`{...props}`**。React 对 **同名 prop** 取 **后者**，故 **`props.onClick` 会完全覆盖** 组件内置的 **`scrollTo`**。自定义 **`onClick`** 时须在回调内 **自行调用** **`window.scrollTo`**（或待演进 **合并处理器**，见 §7.2）。  
- **`disabled`** 由 **`props`** 传入时，**原生禁用** 与 **无点击** 行为一致。

### 5.3 Ref

- **`visible === false`** 时 **组件返回 `null`** → **`ref` 无法附着到 button**（**`ref.current` 为 null**）。可见时 **才挂载** button。

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| 可见性 | **内部 state**，**不可受控**（无 **`visible`/`onVisibleChange`**）。 |
| 阈值 | **`visibilityHeight`** 非受控配置项，**变更有 effect 依赖**。 |

---

## 7. API 规范

### 7.1 `BackTopProps`

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `visibilityHeight` | 超过该 **`window.scrollY`（px）** 显示按钮 | `number` | `200` | |
| `className` | 合并到 **`button`** | `string` | - | |
| 继承 | `ButtonHTMLAttributes<HTMLButtonElement>` | - | - | **`children`** 可 **替换** 默认 `↑ Top`；**`onClick` 覆盖** 默认滚动，见 §5.2 |

### 7.2 建议演进（可选）

| 能力 | 优先级 |
| --- | --- |
| **`target?: HTMLElement \| () => HTMLElement`** + **在目标上监听 scroll** | P1 |
| **默认 `aria-label`（可 i18n）** | P1 |
| **`onClick` 与默认 `scrollTo` 合并**（先默认再 `props.onClick` 或 `composeEventHandlers`） | P0 |
| **`render` / `icon` API** | P2 |
| **可见时仍挂载节点（如 `hidden`）以保持 ref** | P2 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| 导出 | **`BackTopProps`**。 |
| Ref | **`forwardRef<HTMLButtonElement, BackTopProps>`**；**仅 `visible === true` 时** `button` 存在，**`ref` 否则为 null**。 |

---

## 9. 无障碍（a11y）

| 项 | 当前 | 建议 |
| --- | --- | --- |
| 名称 | 可见文本 **`↑ Top`** | **`aria-label`** 由业务传入；演进 **默认中文/可配置** |
| 焦点 | **`hidden` 时组件卸载** | 键盘用户 **无法聚焦不存在的按钮** ✓；**出现** 后 **Tab 顺序** 在 **文档流末尾**（**fixed** 仍参与 tab 顺序） |
| 动效 | **`scroll-behavior: smooth`** | **尊重 `prefers-reduced-motion`** 演进 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 定位 | **`fixed bottom-6 right-6`** |
| 外观 | **`rounded-full bg-brand-500 px-3 py-2 text-sm text-white shadow-lg`** |
| 合并 | **`cn(..., className)`** |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| 全局面包屑/页脚 | **右下角** 可能与 **其他 fixed 控件** 冲突，用 **`className`** 偏移。 |
| **Modal open** | 不自动隐藏；若需 **模态打开时隐藏**，由 **父级条件渲染** 控制 **是否挂载 `BackTop`**。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| 阈值 | **`scrollY` ≤ `visibilityHeight`** → **`null`**；**>** → **渲染 `button`**。 |
| 点击 | 默认 **触发 `scrollTo` top 0 smooth**（**jsdom** 可能需 mock **`window.scrollTo`**）。 |
| `onClick` 覆盖 | 传入 **`onClick`** 后 **默认 `scrollTo` 不再执行**；测试锁定 **现有行为** 或驱动 §7.2 修复。 |
| 卸载 | **unmount** 时 **移除 `scroll` 监听**。 |
| Ref | **`visible`** 为真时 **`ref`** 指向 **`HTMLButtonElement`**。 |

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | **`visibilityHeight`**、**`aria-label`**、**自定义 `className` 位置**。 |
| 说明 | **仅 `window` 滚动**；**`onClick`/`children` 与默认行为关系**；**`ref` 在隐藏时为 null**。 |

---

## 14. 风险与开放问题

| 风险 | 说明 / 缓解 |
| --- | --- |
| **`props.onClick` 覆盖默认回顶** | 见 §5.2；文档与 §7.2 **合并事件** 演进。 |
| **`ref` 随显隐丢失** | 依赖 **ref** 做动画/测量的场景 **不适用**；文档说明。 |
| **可滚动区域为 `div`** | **`window.scrollY` 不变**，按钮 **可能永远不出现**；需 **演进 `target`**。 |
| **固定英文 `↑ Top`** | 国际化站点用 **`children` 或演进 API**。 |

---

## 15. 结论

`BackTop` 定位为 **窗口滚动阈值 + fixed 圆形按钮 + 平滑回顶**：实现 **短、行为清晰**，但 **绑定 `window`**、**隐藏时 `null` 导致 ref 断开**、**透传 `onClick` 会覆盖默认 `scrollTo`**。**内滚动布局** 下需 **容器级监听** 演进或 **不用本组件**。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | BackTop 结论 |
| --- | --- |
| 职责 | 长页窗口滚动后提供回顶入口 |
| DOM/语义 | 条件渲染 `button` / `null` |
| 状态与交互 | `visible` + scroll 监听 + click scrollTo |
| 数据与受控 | 仅 `visibilityHeight`；可见性内部 |
| API | `visibilityHeight` + `ButtonHTMLAttributes` |
| 类型与 Ref | `HTMLButtonElement`，隐藏时无节点 |
| 无障碍 | 建议 `aria-label`；动效可尊重 reduced-motion |
| 样式与主题 | fixed 右下、品牌圆钮 |
| 文档与验证 | window-only、onClick 覆盖、ref 行为 |

---

## 附录 B：当前源码路径

- `packages/ui/src/components/navigation/BackTop/BackTop.tsx`
- `packages/ui/src/components/navigation/BackTop/index.ts`
