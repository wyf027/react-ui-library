# Alert 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/feedback/Alert/Alert.tsx`；语义色来自 **`packages/ui/src/theme/componentTokens.ts`**（**`AlertType`**、**`alertTypeSurfaceClass`**）。

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Alert` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/feedback/Alert` |
| 分类 | Feedback |
| 依赖 | `cn`、**`alertTypeSurfaceClass`**、**`AlertType`**（**`theme/componentTokens`**） |
| 关联组件 | **`Notification`**（卡片+默认 `open`、**`title`/`description` 为 string**）、**`Toast`**（角标短时） |

---

## 2. 目标与非目标

### 2.1 目标

1. **行内告警条**：**`flex items-start gap-3 p-4 text-sm`**，**`type`**（**`AlertType`**）映射 **`alertTypeSurfaceClass`**（**含 `dark:`** 变体）。  
2. **主/副文案**：**`message: ReactNode`**（**必填**）、**`description?: ReactNode`**。  
3. **可选图标**：**`showIcon`**（默认 **`true`**）时渲染 **`span`**；**`icon`** 可 **覆盖** 默认 **emoji 映射**（**`typeIconMap`**：info/success/warning/error）。  
4. **可选关闭**：**`closable`** 为 **`true`** 时显示 **关闭 `button`**；点击 **`setVisible(false)`** 后 **`onClose?.()`**。  
5. **可选操作区**：**`action`** 渲染在 **主文案列右侧**（**`shrink-0`**）。  
6. **`banner` 形态**：**`true`** 时 **`border-b`**（**顶栏条幅**）；**`false`**（默认）**`rounded-lg border`**。  
7. **根属性透传**：**`HTMLAttributes<HTMLDivElement>`** 落在根 **`div`**（**`{...props}` 在 `className` 之后**）。

### 2.2 非目标

1. **受控 `visible` / 关闭后由父再次打开（不重挂载）**：当前 **仅** 内部 **`useState(true)`**，**无** `open` prop；**关闭后** 需 **父级 `key` 重置** 或 **条件挂载** 才能 **再显示**。  
2. **`Notification` 级 `open` 默认 true 卡片**：**`Alert`** 为 **流式条**，**API 不同**。  
3. **内置标题语义 `h2`/`h3`**：**`message`** 为 **`div.font-medium`**，**非** 标题标签（见 §9）。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 表单页顶、区块内 **持久提示** | 校验规则、环境警告、操作结果 **常驻** 至用户关闭或路由离开。 |
| 与 **`Toast`** 选型 | **`Toast`**：**全局角标、定时消**；**`Alert`**：**与表单/模块上下文绑定**。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 根 | **`<div ref={ref} role="alert" className={cn(...)} {...props}>`** |
| 图标 | **`showIcon`** 时 **`<span className="mt-0.5 shrink-0">`** **`{icon ?? typeIconMap[type]}`** |
| 正文列 | **`<div className="flex-1">`**：**`message`** → **`div.font-medium`**；**`description`** → **`div.mt-1 opacity-90`** |
| 操作 | **`action`** → **`<div className="shrink-0">`** |
| 关闭 | **`closable`** 时 **`<button type="button" aria-label="Close alert">`** **`✕`** |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| 可见性 | **内部 `useState(true)`** → **`visible`**；**`!visible` → `return null`**。 |
| 关闭 | **`closable`** 且点击：**`setVisible(false)`** + **`onClose?.()`**；**无** 「仅回调不关」路径。 |

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| 显隐 | **非受控**；**父组件无法** 在 **不重挂载** 下 **`visible=true`** 拉回 **已关闭的同一实例**。 |
| **`onClose`** | **关闭动画/埋点** 用；**UI 隐藏** 由 **内部 `setVisible`** 完成。 |

---

## 7. API 规范

### 7.1 `AlertProps`（当前实现）

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `type` | 语义色 | `AlertType` | `'info'` | **`'info' \| 'success' \| 'warning' \| 'error'`** |
| `message` | 主文案 | `ReactNode` | - | **必填** |
| `description` | 副文案 | `ReactNode` | - | |
| `closable` | 是否可关闭 | `boolean` | `false` | |
| `showIcon` | 是否显示图标 | `boolean` | `true` | |
| `icon` | 自定义图标 | `ReactNode` | - | **覆盖 emoji** |
| `onClose` | 关闭后回调 | `() => void` | - | |
| `banner` | 顶栏样式 | `boolean` | `false` | **`border-b` vs `rounded-lg border`** |
| `action` | 右侧操作区 | `ReactNode` | - | |
| `className` | 根样式 | `string` | - | |
| 继承 | `HTMLAttributes<HTMLDivElement>` | - | - | |

### 7.2 主题 token（`alertTypeSurfaceClass`）

| `type` | 要点 |
| --- | --- |
| 四类 | **边框 + 浅底 + 字色**，并带 **`dark:border-*-800 dark:bg-*-950/30 dark:text-*-200`** |

### 7.3 建议演进（可选）

| 能力 | 优先级 |
| --- | --- |
| **`visible` / `defaultVisible` 受控** | P2 |
| **`message` 用 `role`/`id` + `aria-describedby` 关联 `description`** | P2 |
| **关闭钮 i18n `closeLabel`** | P3 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| Ref | **`forwardRef<HTMLDivElement, AlertProps>`** → **根 `div`** |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| 根 | **`role="alert"`** — **重要/错误** 信息适合；**高频轮询** 更新 **同一 Alert** 可能 **过度打断读屏**。 |
| 关闭 | **`aria-label="Close alert"`**（**英文固定**）。 |
| 结构 | **`message`** **非** **`<h*>`**；若页面 **需要标题层级**，应在 **`message` 内自行传入** 标题组件或演进 API。 |
| 图标 | **emoji** 作默认图标，**读屏朗读** 因 **平台/语音** 而异；重要语义 **建议** **`icon` 传 SVG + `aria-hidden`** 或 **纯文本**。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| Token | **`alertTypeSurfaceClass`** 集中维护，**优于** 组件内散落色值。 |
| 暗色 | **已含 `dark:`**（与 **`Notification`** 当前实现 **对比**：**`Alert` 暗色更完整**）。 |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| **`action` 内放 `Button`** | **合法**；与 **`Notification`** 嵌套 **`button`** 问题 **不同**（**`action` 非再包一层 `button`**）。 |
| **`{...props}` 覆盖 `role`** | 可能 **改变** 读屏策略。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| **`closable`** | 点击关闭 → **`null`**、**`onClose`** 调用。 |
| **`showIcon`/`icon`** | 隐藏图标、**自定义 `icon`** 覆盖 emoji。 |
| **`banner`** | **`border-b`** vs **圆角边框** 类名。 |
| **`type`** | 四类 **surface 类** 与 **`dark:`** 快照或抽检。 |

（仓库 **当前无** `Alert.test.tsx`；以上为建议用例。）

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | 四 **`type`**、**`description`**、**`closable`+`onClose`**、**`action`**、**`banner`**。 |
| 说明 | **关闭后不可受控重开**、**`role="alert"` 使用边界**、与 **`Notification`/`Toast`** 选型。 |

---

## 14. 风险与开放问题

| 风险 | 说明 |
| --- | --- |
| **关闭不可逆（同实例）** | 需 **`key`** 或 **条件渲染** 再展示 **同内容**；易 **被业务误判为 bug**。 |
| **`role="alert"` + 列表页多条** | **批量** 挂载多条 **Alert** 可能 **读屏轰炸**。 |
| **emoji 默认图标** | **可访问性与跨端一致性** 弱于 **SVG + `title`/`aria-label`**。 |

---

## 15. 结论

`Alert` 为 **`role="alert"` + 主题 token 表面色 + message/description + 可选 emoji/自定义图标 + 可选 closable + action/banner`** 的 **流式告警条**；**内部 `visible` 状态** 与 **`Notification`/`Toast`** 的 **受控模型** 均 **不同**。与 **Button** 无继承关系；关闭控件 **`type="button"`**。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | Alert 结论 |
| --- | --- |
| 职责 | 上下文内告警/说明 |
| DOM/语义 | div alert + icon + 正文 + action + 关 |
| 状态与交互 | visible 内部；closable |
| 数据与受控 | 非受控可见 |
| API | type、message、description、closable、banner、action |
| 类型与 Ref | HTMLDivElement |
| 无障碍 | alert；emoji；关钮英文 |
| 样式与主题 | componentTokens + dark |
| 文档与验证 | 关闭重开、与 Toast 对比 |

---

## 附录 B：参考实现片段（当前仓库）

- **`Alert.tsx`**：**`useState(visible)`**、**`alertTypeSurfaceClass[type]`**、**`typeIconMap`**。  
- **`componentTokens.ts`**：**`AlertType`**、**`alertTypeSurfaceClass`**。

（以仓库实际代码为准。）
