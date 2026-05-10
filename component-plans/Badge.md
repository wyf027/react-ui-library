# Badge 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/data/Badge/Badge.tsx`；状态色来自 **`packages/ui/src/theme/componentTokens.ts`**（**`BadgeStatus`**、**`badgeStatusBgClass`**）。

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Badge` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/data/Badge` |
| 分类 | Data |
| 依赖 | `cn`、**`badgeStatusBgClass`**、**`BadgeStatus`** |
| 关联组件 | **`Tag`**（胶囊标签、无角标层）、**`Button`**（常见 **徽标父节点**） |

---

## 2. 目标与非目标

### 2.1 目标

1. **角标叠在子元素上**：外层 **`relative inline-flex`** **`span`** 包 **`children`**，内层 **`absolute -right-2 -top-2`** 小圆/数字徽标。  
2. **显示条件**：**`showBadge = dot \|\| count > 0 \|\| showZero`**（**`dot`** 为 **`true`** 时 **仅红点**；**`showZero`** 允许 **`count===0`** 仍显示）。  
3. **数字与封顶**：**`count`**（默认 **`0`**）；**`count > overflowCount`**（默认 **`99`**）时文案 **`${overflowCount}+`**。  
4. **状态色**：**`status?: BadgeStatus`** 映射 **`badgeStatusBgClass`**（**`default`/`success`/`processing`/`error`/`warning`**）。  
5. **自定义色**：**`color?: string`** 为 **`backgroundColor`**（**优先于 `status`**，此时 **不** 应用 **`badgeStatusBgClass`**）。  
6. **偏移**：**`offset?: [number, number]`** → 内层 **`transform: translate(xpx, ypx)`**（与 **`style` 合并顺序**见 §14）。  
7. **根透传**：**`HTMLAttributes<HTMLSpanElement>`** 落在外层 **`span`**；**`style`** 与 **`offset`/`color`** 合并于 **内层徽标 `span`**。

### 2.2 非目标

1. **独立数字徽标（无 `children`）**：类型上 **`children` 可选**；**无子** 时 **仅角标** 可能 **定位怪异**（**仍** **`absolute`** 相对 **空 `relative` span**）。  
2. **`title`/`aria-label` 描述 count 变化**：当前 **无** 自动 **`aria-live`**。  
3. **与 Ant Design `Badge` 全量 API 对齐**：**无** `size`、`title`、独立 **ribbon** 等。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 图标/菜单 **未读数** | **`children`** 为 **图标 `Button`**，**`count`** 或 **`dot`**。 |
| 与 **`Tag`** 选型 | **`Badge`**：**叠层计数/点**；**`Tag`**：**行内标签文案**。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 外层 | **`<span ref={ref} className={cn('relative inline-flex', className)} {...props}>`** |
| 内层徽标 | **`showBadge`** 时 **`<span className={cn('absolute -right-2 -top-2 inline-flex ... rounded-full text-[10px] font-semibold text-white', ...)} style={badgeStyle}>`** |
| **`dot`** | **无数字**；**`h-2 w-2`**、**`p-0`** |
| **非 `dot`** | **`min-h-5 min-w-5 px-1`**，子文本为 **`display`**（**数字或 `overflowCount+`**） |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| 状态 | **无** `useState`；**全由 props** 决定 **显隐与文案**。 |
| 交互 | **徽标层无点击区扩展**；**点击** 由 **`children`** 承接。 |

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| **`count`** | **展示型**；**动态 `count`** 由 **父组件** 传入 **触发重渲染**。 |

---

## 7. API 规范

### 7.1 `BadgeProps`（当前实现）

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `children` | 锚点内容 | `ReactNode` | - | **建议** 提供 **可定位子元素** |
| `count` | 数字 | `number` | `0` | |
| `dot` | 仅红点 | `boolean` | `false` | |
| `overflowCount` | 封顶阈值 | `number` | `99` | 超出显示 **`${overflowCount}+`** |
| `showZero` | `count===0` 是否显示 | `boolean` | `false` | |
| `status` | 语义背景 | `BadgeStatus` | - | **无 `color` 时** 使用；**见 §7.2 默认** |
| `offset` | 徽标偏移 `[x,y]` px | `[number, number]` | - | |
| `color` | 自定义背景色 | `string` | - | **CSS 颜色串**，**覆盖 `status`** |
| `className` | 外层 | `string` | - | |
| `style` | 与徽标样式合并 | `CSSProperties` | - | **作用于内层**；**可覆盖 `transform`** |
| 继承 | `HTMLAttributes<HTMLSpanElement>` | - | - | |

### 7.2 `BadgeStatus` 与默认背景

| `status` | `badgeStatusBgClass` |
| --- | --- |
| `default` | `bg-slate-500` |
| `success` | `bg-green-500` |
| `processing` | `bg-brand-500` |
| `error` | `bg-red-500` |
| `warning` | `bg-amber-500` |

**无 `color` 且无 `status`** 时，内层 **`bgClass` 回退为 `'bg-red-500'`**（**与「中性 default」直觉不一致**，见 §14）。

### 7.3 建议演进（可选）

| 能力 | 优先级 |
| --- | --- |
| **无 `status` 时默认 `bg-slate-500` 或 `processing` 与文档一致** | P2（Breaking 需评估） |
| **`aria-label`/`title` 描述 count** | P2 |
| **`transform` 与 `offset`、`style` 合并策略** | P3 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| Ref | **`forwardRef<HTMLSpanElement, BadgeProps>`** → **外层 `span`**（**非** 内层徽标） |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| 徽标数字 | **无** **`aria-live`**；**读屏** 未必 **自动播报 count 变化**。 |
| 建议 | **父级** **`aria-label`** 含 **未读数**，或对 **徽标内层 `span`** 传 **`role="img"` + `aria-label`**（需 **演进或业务包一层**）。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| Token | **`status`** 走 **`componentTokens`**，**与 `Tag` 分散色组** **区分**。 |
| 字色 | 徽标内 **`text-white`** 固定；**`color` 自定义** 时若 **亮底** 可能 **对比不足**（**业务自负**）。 |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| **`Icon` + `Badge`** | **`children`** 包 **图标**，注意 **`-right-2 -top-2`** 与 **图标 padding** **视觉对齐**。 |
| **`style.transform` 与 `offset`** | **`badgeStyle`** 中 **`...style` 在后**，**用户 `style.transform` 覆盖 `offset` 的 `translate`**。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| **`dot`** | **无数字**、**小圆尺寸**。 |
| **`overflowCount`** | **`count=100` → `99+`**（**默认 `overflowCount=99`**）。 |
| **`showZero`** | **`count=0`** 仍 **显示徽标 `0`**。 |
| **`status`/`color`** | **类名** vs **`backgroundColor`**。 |
| **无 `status` 无 `color`** | **回退 `bg-red-500`**（**文档化**）。 |

（仓库 **当前无** `Badge.test.tsx`；以上为建议用例。）

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | **图标+count**、**dot**、**`status`**、**`offset`**、**`color`**。 |
| 说明 | **默认红底无 status**、**`style` 与 `offset`**、**与 `Tag` 差异**、**a11y 建议**。 |

---

## 14. 风险与开放问题

| 风险 | 说明 |
| --- | --- |
| **默认 `bg-red-500`** | **易误解为错误态**；**建议** 显式传 **`status`** 或 **`color`**。 |
| **`count` 负数** | **`showBadge`** 一般为 **`false`**（**除非 `dot`/`showZero`**），**数字可能不显示**；**边界** 建议 **父层钳制**。 |
| **无 `children`** | **角标** 相对 **空 span** **位置可能不符合设计**。 |

---

## 15. 结论

`Badge` 为 **`relative` 外层 + `absolute` 圆角徽标（点/数字/封顶）+ `status` token 或 `color` 自定义 + 可选 `offset`** 的角标组件；**默认无 `status` 时为红底** 需在文档与示例中 **显式说明**。与 **Button** 无继承关系；常 **`children` 为可点击图标**。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | Badge 结论 |
| --- | --- |
| 职责 | 子元素角标计数/点 |
| DOM/语义 | 双 span、absolute 徽标 |
| 状态与交互 | 无状态；展示 count |
| 数据与受控 | count 由父 |
| API | dot、overflowCount、showZero、status、color、offset |
| 类型与 Ref | HTMLSpanElement 外层 |
| 无障碍 | 弱；无 live |
| 样式与主题 | token + 固定白字 |
| 文档与验证 | 默认红、offset/style |

---

## 附录 B：参考实现片段（当前仓库）

文件：`packages/ui/src/components/data/Badge/Badge.tsx`。

要点：**`showBadge`**、**`display` 封顶**、**`bgClass` 三元**、**`badgeStyle`**。

（以仓库实际代码为准。）
