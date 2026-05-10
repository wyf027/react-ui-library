# Transfer 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/form/Transfer/Transfer.tsx`

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Transfer` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/form/Transfer` |
| 分类 | Form |
| 依赖 | `cn`、`useControllableState` |
| 关联组件 | **`Select`**（单列表）、**`TreeSelect`**、**`Form`/`FormItem`** |

---

## 2. 目标与非目标

### 2.1 目标

1. **双列表穿梭**：左侧 **Source**、右侧 **Target**，数据来自同一 **`dataSource`**，按 **`targetKeys`**（**`key` 字符串数组**）划分。  
2. **受控 / 非受控**：**`targetKeys`** / **`defaultTargetKeys`** + **`useControllableState<string[]>`** + **`onChange(nextTargetKeys: string[])`**。  
3. **点选穿梭**：点击左侧项 **加入** `targetKeys`；点击右侧项 **移除**；**`disabled` 项** 的 **`button`** 不可点。  
4. **布局**：**`grid-cols-[1fr_auto_1fr]`**，中间 **`⇄`** 纯装饰（**非按钮**）。  
5. **键类型**：**`TransferItem.key` 为 `string`**，与 **Long ID 全程 string** 治理一致。

### 2.2 非目标

1. **中间「向右/向左」批量按钮、全选、搜索、分页**：当前 **无**。  
2. **拖拽排序 Target 内顺序**：**`targetKeys` 顺序即展示顺序**；左侧顺序为 **`dataSource` 过滤后顺序**，**非** `targetKeys` 重排 UI。  
3. **异步加载 `dataSource`**：组件不请求数据；父级传入即可。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 权限分配、字段分配 | **`dataSource` 全量**，**`targetKeys` 为已选 key**。 |
| 表单提交 | 提交 **`targetKeys`** 或映射后的 id 列表。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 根 | **`<div ref={ref} className="grid grid-cols-[1fr_auto_1fr] ...">`** |
| 列标题 | 固定英文 **`Source` / `Target`**（**`<p className="text-xs ...">`**） |
| 列表 | **`<ul className="max-h-48 overflow-auto">`** + **`<li>`** |
| 项 | **`<button type="button" className="w-full text-left ...">`** 展示 **`item.title`** |
| 中缝 | **`<div>⇄</div>`** 装饰，**无 `aria-hidden`**（可选演进） |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| 内部 | **`useControllableState<string[]>({ value: targetKeys, defaultValue: defaultTargetKeys, onChange })`** → **`currentTargetKeys`** |
| `moveToTarget` | 已含 **`key`** 则 **return**；否则 **`setCurrentTargetKeys([...current, key])`** |
| `moveToSource` | **`filter` 去掉 `key`** |
| 列表派生 | **`useMemo`**：**`sourceItems`** = 不在 target；**`targetItems`** = 在 target（**顺序与 `dataSource` 出现顺序一致**） |

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| 真相源 | **`targetKeys` 决定右侧集合**；**`dataSource` 为全集** |
| 单项禁用 | **`item.disabled`** 仅禁用 **该项 `button`**，**不**从列表隐藏 |
| 缺失 key | **`dataSource` 中不存在的 `targetKeys`** 在 **`targetItems`** 中 **不出现**（静默忽略） |

---

## 7. API 规范

### 7.1 `TransferItem`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `key` | `string` | 唯一键（**勿用 number 转 Long ID**） |
| `title` | `string` | 展示文案 |
| `disabled?` | `boolean` | 不可穿梭 |

### 7.2 `TransferProps`

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `dataSource` | 全量项 | `TransferItem[]` | **必填** | |
| `targetKeys` | 受控：已在右侧的 key | `string[]` | - | `undefined` 非受控 |
| `defaultTargetKeys` | 非受控初值 | `string[]` | `[]` | |
| `onChange` | 右侧 key 集合变化 | `(nextTargetKeys: string[]) => void` | - | |
| `className` | 根 `div` | `string` | - | |
| 继承 | `Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>` | - | - | 根 **`onChange` 已 Omit** |

### 7.3 建议演进（可选）

| 能力 | 优先级 |
| --- | --- |
| **搜索 / 全选 / 中间操作按钮** | P1 |
| **`titles`/`operations`/`locale`** | P2 |
| **`listStyle`/`oneWay`** | P3 |
| **`role` + 键盘 listbox 模式** | P1 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| Ref | **`forwardRef<HTMLDivElement, TransferProps>`** → **根 `div`** |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| 列表 | **`ul`/`li`** + **`button`**，每项可聚焦；**无 `aria-selected`/`aria-pressed`** 声明选中侧（演进）。 |
| 标题 | **「Source/Target」** 为视觉标题；**非** `<h*>`；演进 **`aria-labelledby`**。 |
| 穿梭语义 | 依赖用户理解「点一侧即移动」；中间 **⇄** 无读屏说明，建议 **`aria-label` 根区** 或文案（演进）。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 列面板 | `rounded-lg border ... p-2` |
| 列表 | `max-h-48 overflow-auto` |
| 项 hover | `hover:bg-slate-100` / 暗色 `dark:hover:bg-slate-800` |
| 焦点 | **`nova-focus-ring`** 在 **`button`** |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| **`FormItem` + `Transfer`** | **`onChange(string[])`** 与 **`FormItem` `cloneElement` 默认事件 `onChange`** 不兼容；需 **包装** 或 **手写 `setFieldValue`**。 |
| 大数据 | **`max-h-48`+滚动**；超大量项需 **虚拟列表**（演进）。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| 非受控 | `defaultTargetKeys`，点击穿梭 **`onChange`** 数组正确。 |
| 受控 | 父更新 **`targetKeys`**，两侧列表同步。 |
| `disabled` | 对应 **`button disabled`**。 |
| 重复 `moveToTarget` | 已存在 **key** 不重复追加。 |
| Ref | **`HTMLDivElement`**。 |

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | 受控/非受控、`disabled` 项、**`dataSource` 与 `targetKeys` 关系**。 |
| 说明 | **无批量按钮/搜索**、**`targetItems` 顺序规则**、**FormItem 集成**。 |

---

## 14. 风险与开放问题

| 风险 | 缓解 |
| --- | --- |
| **`targetKeys` 含脏 key** | 提交前父级过滤 |
| **Target 顺序无法按「移入先后」** | 演进 **`targetKeys` 顺序即唯一顺序`** 或拖拽排序 |
| **标题写死英文** | **`titles` prop** 演进 |

---

## 15. 结论

`Transfer` 当前为 **最小双列点选穿梭**：**`dataSource` + `targetKeys` + `useControllableState`**；适合 **中小列表权限分配**。与 **Button** 共享 **`type="button"`** 防提交；**批量操作与 a11y 强化**为后续迭代重点。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | Transfer 结论 |
| --- | --- |
| 职责 | 双列 key 集合穿梭 |
| DOM/语义 | grid + ul + button + 装饰 ⇄ |
| 状态与交互 | useControllableState、点选移动 |
| 数据与受控 | targetKeys、dataSource |
| API | dataSource、targetKeys、defaultTargetKeys、onChange(keys)、omit div onChange |
| 类型与 Ref | HTMLDivElement |
| 无障碍 | 基础 list+button；缺选中语义 |
| 样式与主题 | 双面板、滚动、nova-focus-ring |
| 文档与验证 | key string、无批量、FormItem |

---

## 附录 B：参考实现片段（当前仓库）

文件：`packages/ui/src/components/form/Transfer/Transfer.tsx`。

要点：**`sourceItems`/`targetItems` useMemo**、**`moveToTarget`/`moveToSource`**、**三列 grid**。

（以仓库实际代码为准。）
