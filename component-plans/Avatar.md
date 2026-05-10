# Avatar 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/data/Avatar/Avatar.tsx`

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Avatar` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/data/Avatar` |
| 分类 | Data |
| 依赖 | `cn` |
| 关联组件 | **`Badge`**（头像上角标）、**`Card`/`List`**（用户信息展示） |

---

## 2. 目标与非目标

### 2.1 目标

1. **有图走 `<img>`**：**`src`** 存在时 **`rounded-full object-cover`**，**`style={{ width: size, height: size }}`**（**`size` 默认 `36`**，**React 数字 → px**）。  
2. **无图走首字占位**：**`!src`** 时 **`<span>`** **`inline-flex` 圆形**，**`bg-brand-500`** 白字，内容为 **`name?.trim().slice(0,1).toUpperCase() ?? '?'`**。  
3. **替代文本**：**`<img>`** 时 **`alt={alt ?? name ?? 'avatar'}`**。  
4. **类型继承**：**`AvatarProps extends ImgHTMLAttributes<HTMLImageElement>`**，**含 `name`/`size`** 等扩展字段。

### 2.2 非目标

1. **`ref` 双分支不一致**：**无 `src`** 时 **不渲染 `<img>`**，**`forwardRef` 的 `ref` 不挂载**（见 §8）。  
2. **无 `src` 时透传 `ImgHTMLAttributes`**：**占位分支** **未** 使用 **`...props`**，**`onClick`/`crossOrigin` 等** 在 **无图模式丢失**（见 §14）。  
3. **多尺寸 token、群组 Avatar.Group**：当前 **仅 `size: number`**。  
4. **加载失败回退**：**无 `onError`** 内建 **从 img 切 span** 逻辑。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 用户头像 URL 可用 | **`src` + `alt`/`name`**。 |
| 无头像 URL | **不传 `src`**，**`name`** 提供 **首字母**（**单字符**）；**`name` 空** 显示 **`?`**。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| **有 `src`** | **`<img ref={ref} src={src} alt={...} className={cn('rounded-full object-cover', className)} style={{width,height}} {...props}>`** |
| **无 `src`** | **`<span className={cn('inline-flex ... rounded-full bg-brand-500 ...', className)} style={{width,height}} aria-label={name}>`** **`{fallback}`** — **无 `ref`** |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| 状态 | **无** `useState`；**`src` 有无** 决定 **分支**（**非** 运行时 **加载态**）。 |
| 交互 | **`img`** 可走 **`...props`**；**`span`** 占位 **未** 合并 **`props`**。 |

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| 数据 | **无** 受控 value；**`src`/`name`** 由 **父传入**。 |

---

## 7. API 规范

### 7.1 `AvatarProps`（当前实现）

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `src` | 图片地址 | `string` | - | **缺省/空** 时走 **占位 `span`**（**注意**：**仅 falsy `src`** 走占位，**`src=""`** 同） |
| `name` | 姓名（首字、`aria-label`、**`alt` 回退**） | `string` | - | |
| `alt` | 图片替代文本 | `string` | - | **`img`**：**`alt ?? name ?? 'avatar'`** |
| `size` | 宽高 px | `number` | `36` | **`style` 宽高** |
| `className` | 样式 | `string` | - | **两分支均 `cn` 合并** |
| 继承 | `ImgHTMLAttributes<HTMLImageElement>` | - | - | 仅 **`img`** 分支使用 **`{...props}`** |

### 7.2 视觉（摘要）

| 分支 | 要点 |
| --- | --- |
| `img` | **`object-cover`**、**圆形** |
| `span` | **`bg-brand-500`**、**`text-sm font-semibold text-white`** |

### 7.3 建议演进（可选）

| 能力 | 优先级 |
| --- | --- |
| **占位分支 `ref` + 合理合并非 `img` 专用 `props`** | P1 |
| **`onError` 回退占位** | P2 |
| **`size: 'sm' \| 'md' \| 'lg'` token** | P2 |
| **无 `name` 时 `aria-label` 缺省** | P2（§14） |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| 声明 | **`forwardRef<HTMLImageElement, AvatarProps>`** |
| **有 `src`** | **`ref` → `<img>`** |
| **无 `src`** | **`ref` 不绑定**（**占位为 `span`**）— **与类型「始终 `HTMLImageElement`」不一致** |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| **`img`** | **`alt`** 有 **链式回退** ✓ |
| **占位 `span`** | **`aria-label={name}`** — **`name` 未传** 时 **`aria-label` 为 `undefined`**，**仅** 可见 **`?`**，**读屏名称弱**（见 §14）。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 占位 | **`bg-brand-500`** 固定 **品牌色**。 |
| 尺寸 | **内联数字**；**非** Tailwind **固定档位**。 |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| **`Badge` 包头像** | **`Badge` `children`** 为 **`Avatar`**；注意 **角标 `absolute`** 与 **头像尺寸** **对齐**。 |
| **`img` 分支 `{...props}` 顺序** | 在 **`className`/`style`** 之后 — **`props`** 可 **覆盖 `src`/`alt`**（**慎用**）。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| **`src`** | **`img`**、**`alt`**、**`ref`**、**`size` 样式**。 |
| **无 `src`** | **首字母**、**`?`**、**`span`** **无 `ref`**。 |
| **`name` 空白** | **`fallback`** 与 **`aria-label`**。 |

（仓库 **当前无** `Avatar.test.tsx`；以上为建议用例。）

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | **有图**、**无图+name**、**`size`**、**与 `Badge` 组合**。 |
| 说明 | **双分支 `ref`**、**无 `src` 不透传 `props`**、**占位 `aria-label`**。 |

---

## 14. 风险与开放问题

| 风险 | 说明 |
| --- | --- |
| **`ref` 丢失** | **无 `src`** 时 **测量/父级 ref 回调** **拿不到 `img`**。 |
| **`props` 丢失** | **占位模式** **忽略** **`ImgHTMLAttributes`** 中 **本可落在 `span` 上的** 如 **`onClick`**。 |
| **`aria-label={name}`** | **`name` 空** 时 **无** 可访问名称；**建议** **`aria-label={name ?? 'User'}`** 等 **演进**。 |

---

## 15. 结论

`Avatar` 为 **`src` 分流**：**圆图 `img`** 或 **品牌底首字 `span`**；**`size` 内联宽高**。与 **Button** 无继承关系；**`forwardRef`/`ImgHTMLAttributes` 与无 `src` 分支** **不对齐**，**为集成与 a11y 演进重点**。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | Avatar 结论 |
| --- | --- |
| 职责 | 用户头像或首字占位 |
| DOM/语义 | img 或 span |
| 状态与交互 | 分支；无加载态 |
| 数据与受控 | src/name 父传 |
| API | name、size、Img attrs |
| 类型与 Ref | 声明 img；span 无 ref |
| 无障碍 | img alt；span aria 弱 |
| 样式与主题 | brand 占位、圆 cover |
| 文档与验证 | ref/props 双分支 |

---

## 附录 B：参考实现片段（当前仓库）

文件：`packages/ui/src/components/data/Avatar/Avatar.tsx`。

要点：**`if (!src)` → `span`**、**`fallback`**、**`img` 分支 `ref` + `{...props}`**。

（以仓库实际代码为准。）
