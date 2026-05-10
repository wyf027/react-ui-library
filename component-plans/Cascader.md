# Cascader 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/form/Cascader/Cascader.tsx`

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Cascader` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/form/Cascader` |
| 分类 | Form |
| 依赖 | `cn`、`useControllableState`、`useMemo` |
| 关联组件 | **`Select`**（单列原生）、**`TreeSelect`**、**`Transfer`**（key 集合）、**`Form`/`FormItem`** |

---

## 2. 目标与非目标

### 2.1 目标

1. **级联选择**：按 **`paths: string[]`**（各级 **`value`** 组成的路径）在 **树形 `options`** 上逐级下钻。  
2. **多列原生 `select`**：每一级渲染 **一个 `<select>`**，**`levelOptions`** 由 **`paths` + `options`** 推导（**`useMemo`**）。  
3. **受控 / 非受控**：**`value`** / **`defaultValue`**（**`string[]`**，默认 **`[]`**）+ **`useControllableState`**。  
4. **变更回调**：**`onChange?(value: string[], labels: string[])`**，**`labels`** 按路径在 **`options`** 上 **`.find` 逐级解析** 得到。  
5. **占位**：每级 **`select`** 首项 **`<option value="">请选择</option>`**（固定中文）。  
6. **键值类型**：**`CascaderOption.value` 为 `string`**，与 **Long ID** 规范一致。

### 2.2 非目标

1. **单输入框 + 浮层面板 + 搜索**：当前 **无**；为 **横向多 `select`** 形态。  
2. **`loadData` 异步展开**：未实现；**`options` 须同步树**。  
3. **`fieldNames` 字段别名**：未实现；固定 **`value`/`label`/`children`**。  
4. **任意级可选（`changeOnSelect`）**：当前 **选父级会截断子路径并驱动下一列**；叶子无 **`children`** 时 **不再追加 `select`**。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 省市区（数据已全量） | **`options` 三层**，**`value` 为 `[省,市,区]`**。 |
| 表单提交 | 提交 **`value`** 或同时用 **`labels`** 展示。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 根 | **`<div ref={ref} className="flex gap-2">`** |
| 级联控件 | **每层一个 `<select key={lv-${levelIndex}}>`**，**`h-10 min-w-36`**，**`nova-focus-ring`** |
| 选项 | **`opts.map`** → **`<option value={opt.value}>`** |

---

## 5. 状态与交互

### 5.1 `useControllableState` 与 `onChange` 包装（当前实现）

- **`paths`** 为 hook 返回的 **`state`**（变量名在实现中为 **`paths`**，与 **`value` prop** 受控绑定）。  
- 传给 hook 的 **`onChange`** 为内联函数：根据 **`next`** 路径在 **`options`** 上 **逐级 `find`** 拼 **`labels`**，再调用 **用户 `onChange?.(next, labels)`**。  
- **用户 props 的 `onChange`** **不**直接传给 hook；由包装函数统一 **`(value[], labels[])`** 调用。

### 5.2 单层 `select` 的 `onChange`

```ts
const next = [...paths.slice(0, levelIndex), event.target.value].filter(Boolean)
setPaths(next)
```

- 变更 **`levelIndex` 级** 时，**截断**更深路径，再追加新 **`value`**；**`filter(Boolean)`** 去掉空串（一般不应把 **`请选择`** 选入路径，若选空则路径变短）。  

### 5.3 `levelOptions` 计算（`useMemo`）

- 初始 **`[options]`**；对 **`paths` 中每一已选 segment**，若对应节点 **`children?.length`**，则 **`levels.push(node.children)`** 并 **`current = node.children`**。  
- **结果**：**列数 = 1 + 已选路径上「仍有子级」的层数**；叶子后 **不再多出空 `select`**。

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| 值 | **`string[]`**，每元素对应一级 **`option.value`** |
| 标签 | **不**持久化在 state；**每次 `onChange` 由树现算 `labels`** |
| 禁用 | **`option.disabled`** → **`<option disabled>`** |

---

## 7. API 规范

### 7.1 `CascaderOption`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `value` | `string` | 该层唯一值（**同层建议唯一**） |
| `label` | `string` | 展示 |
| `children?` | `CascaderOption[]` | 子级 |
| `disabled?` | `boolean` | |

### 7.2 `CascaderProps`

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `options` | 树根选项 | `CascaderOption[]` | **必填** | |
| `value` | 受控路径 | `string[]` | - | `undefined` 非受控 |
| `defaultValue` | 非受控初值 | `string[]` | `[]` | |
| `onChange` | 路径与标签 | `(value: string[], labels: string[]) => void` | - | |
| `className` | 根 `div` | `string` | - | |
| 继承 | `Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>` | - | - | 根 **`onChange` Omit** |

### 7.3 建议演进（可选）

| 能力 | 优先级 |
| --- | --- |
| **单框 + 浮层 + 搜索** | P2 |
| **`loadData`、异步子节点** | P2 |
| **`fieldNames`、`changeOnSelect`** | P2 |
| **`placeholder`/`locale` 可配** | P1 |
| **`displayRender`/`showSearch`** | P2 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| Ref | **`forwardRef<HTMLDivElement, CascaderProps>`** → **根 `div`** |
| 各 `select` | **无 ref 数组暴露** |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| 原生 `select` | 键盘与读屏随浏览器；**多级无整体 `combobox` 语义**（与弹层版不同）。 |
| 标签 | **无内置 `label`**；需 **`FormItem`** 或 **`aria-label`** 描述「级联」关系。 |
| 占位 | **「请选择」** 固定中文；**i18n** 见演进。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 布局 | **`flex gap-2`** 横向多列 **`select`** |
| 单框 | **`h-10`** 与 **`Input` md** 对齐意图；**`min-w-36`** |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| **`FormItem` + `Cascader`** | **`onChange(value[], labels[])`** 与 **`FormItem` 默认 `onChange(event)`** 不兼容；需 **包装** 或 **手写 `setFieldValue`**。 |
| **`options` 引用** | **`levelOptions` 依赖 `options`**；树大时 **`useMemo`** 仍每次比对 **`paths`**，超大数据需 **虚拟化/异步**（演进）。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| 受控 | 父 **`value`** 更新，各级 **`select` value** 同步。 |
| `onChange` | 选到叶子时 **`value`/`labels`** 长度一致且顺序正确。 |
| 改中间级 | 更深层路径被截断，**`onChange`** 收到缩短后的 **`next`**。 |
| `disabled` | **option** 不可选。 |
| Ref | **`HTMLDivElement`**。 |

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | 三层数据、受控、**`onChange` 双参数**、与 **`FormItem`** 包装。 |
| 说明 | **多 `select` 非弹层**、**`labels` 由树解析**、**同层 `value` 唯一性建议**。 |

---

## 14. 风险与开放问题

| 风险 | 缓解 |
| --- | --- |
| **同层重复 `value`** | **`.find` 只命中第一个**；文档要求唯一 |
| **`paths` 含非法段** | **`labels` 可能变短**；提交前校验 |
| **`useControllableState` 的 `onChange` 包装与 `setPaths` 调用链** | 单测保证 **`onChange` 在每次 `setPaths` 后触发**（含标签正确） |

---

## 15. 结论

`Cascader` 当前为 **「多列原生 select + 路径数组」级联器**：实现轻、依赖少，适合 **全量树、无搜索、无浮层** 的中后台场景；与 **Button** 无直接 API 继承。**弹层式、异步、搜索** 为下一阶段能力与文档边界。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | Cascader 结论 |
| --- | --- |
| 职责 | 树路径多级选择 |
| DOM/语义 | div + 多个 select |
| 状态与交互 | paths、级联 onChange |
| 数据与受控 | value[]、options 树 |
| API | options、value、defaultValue、onChange(value,labels)、omit div onChange |
| 类型与 Ref | HTMLDivElement |
| 无障碍 | 原生 select；缺整体 combobox |
| 样式与主题 | flex、h-10 |
| 文档与验证 | 双参数 onChange、FormItem、重复 value |

---

## 附录 B：`onChange` 与 `labels` 解析（实现摘要）

对 **`next`** 中每个 **`val`**：**`currentOptions.find(opt => opt.value === val)`**，命中则 **`labels.push(node.label)`** 且 **`currentOptions = node.children ?? []`**。

（以仓库 `Cascader.tsx` 为准。）
