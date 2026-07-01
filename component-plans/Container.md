# Container 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/layout/Container/Container.tsx`

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Container` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/layout/Container` |
| 分类 | Layout |
| 依赖 | `cn`（`utils/cn`）；`createElement` 多态根节点 |
| 关联组件 | `Row`、`Col`、`Grid`、`Space`、`Title`（页面顶栏内容区） |

---

## 2. 目标与非目标

### 2.1 目标

1. **内容区宽度约束**：通过 `maxWidth` 预设与 Tailwind `max-w-*` 映射，避免正文在大屏上无限拉宽。  
2. **水平安全边距**：`padding` 控制 `px`，小屏与大屏断点递增，与常见中后台布局一致。  
3. **可选垂直留白**：`verticalPadding` 独立控制 `py`，与水平 `padding` 解耦。  
4. **流式布局开关**：`fluid` 取消最大宽度，用于全宽表格/看板。  
5. **语义化根标签**：`component` 支持 `main`、`section` 等，便于 landmark 与 SEO。

### 2.2 非目标

1. **栅格列计算**：列宽由 `Row`/`Col`/`Grid` 负责，`Container` 只包最外层宽度与边距。  
2. **粘性顶栏 / 侧栏**：由 `Affix`、`Layout` 页面壳或业务布局承担。  
3. **居中 flex 子项**：`Container` 仅做 **`mx-auto` 块级居中**；内部对齐用 `Flex`/`Space`。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 整页主内容 | `component="main"`，内放 `Title` + 业务区。 |
| 文档/营销内容区 | `maxWidth="md"` 等窄读宽。 |
| 全宽数据视图 | `fluid` + 内部 `Table` 横向滚动。 |
| 区块分组 | `component="section"` + `aria-labelledby` 指向区块标题。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 根元素 | **`component` 默认 `div`**，可改为 **`main`**、**`section`**、**`article`** 等（`ElementType`）。 |
| 实现方式 | `createElement(component, { ref, className, ...props })`，与 ref 类型 `HTMLElement` 一致。 |
| Landmark | 全页建议唯一 **`main`**；多个 `section` 时配合标题 `id` 与 `aria-labelledby`。 |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| 内置状态 | **无**；纯布局容器。 |
| 响应式 | 边距类内置 `sm:`/`lg:` 等断点，随视口变化，无 JS 状态。 |

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| 业务数据 | **无** value/onChange。 |
| 布局参数 | 均由 props 声明式传入，无内部持久状态。 |

---

## 7. API 规范

### 7.1 当前实现对照

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `component` | 根节点标签 | `ElementType` | `'div'` | 如 `main`、`section` |
| `fluid` | 是否取消最大宽度 | `boolean` | `false` | `true` 时为 `max-w-full`，忽略 `maxWidth` 映射 |
| `centered` | 是否在非 fluid 下水平居中 | `boolean` | `true` | `mx-auto`；`fluid` 时不加 |
| `maxWidth` | 最大宽度预设 | `ContainerMaxWidth` | `'xl'` | `xs`–`xxl`，见 §7.2 |
| `padding` | 水平内边距 | `ContainerPadding` | `'lg'` | 控制 `px` |
| `verticalPadding` | 垂直内边距 | `ContainerPadding` | `'none'` | 控制 `py`；`none` 时不加 `py` 类 |
| `className` | 样式扩展 | `string` | - | 与 `cn` 合并 |
| 其余 | 继承 `HTMLAttributes<HTMLElement>`（`className` 在接口中显式写出） | - | - | `id`、`style`、`children` 等 |

导出类型：`ContainerMaxWidth`、`ContainerPadding`、`ContainerProps`。

### 7.2 `maxWidth` 与 Tailwind 类映射（当前实现）

| 预设 | 类名 |
| --- | --- |
| `xs` | `max-w-xl` |
| `sm` | `max-w-2xl` |
| `md` | `max-w-4xl` |
| `lg` | `max-w-6xl` |
| `xl` | `max-w-7xl` |
| `xxl` | `max-w-[1600px]` |

### 7.3 `padding` / `verticalPadding` 与类映射（当前实现）

**水平 `paddingXClass`：**

| 预设 | 类名 |
| --- | --- |
| `none` | `px-0` |
| `sm` | `px-3 sm:px-4` |
| `md` | `px-4 sm:px-5` |
| `lg` | `px-4 sm:px-6 lg:px-8` |

**垂直 `paddingYClass`：**

| 预设 | 类名 |
| --- | --- |
| `none` | `py-0` |
| `sm` | `py-2 sm:py-3` |
| `md` | `py-4 sm:py-5` |
| `lg` | `py-6 sm:py-8 lg:py-10` |

### 7.4 建议演进（可选）

| 属性 | 说明 | 优先级 |
| --- | --- | --- |
| `maxWidth` 数字或任意值 | 支持 `max-w-[90rem]` 等 token | P3 |
| `asChild` | 与 Radix 类似插槽（若全库统一） | P3 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| 接口 | `ContainerProps` 继承 `Omit<HTMLAttributes<HTMLElement>, 'className'>` 并显式 `className?`，避免与 `cn` 合并类型冲突。 |
| Ref | `forwardRef<HTMLElement, ContainerProps>`；随 `component` 变化指向对应 DOM 接口的子类型（使用时收窄）。 |
| `component` | 限制为合理 HTML 标签类型时，可用泛型增强（演进），当前为 `ElementType` 保持灵活。 |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| Landmark | 页面主内容推荐使用 **`component="main"`**，且全页通常仅一个 `main`。 |
| `section` | 多个区块时提供可见标题，并 **`aria-labelledby`** 关联。 |
| 跳过链接 | 不在 `Container` 内实现；文档可链到页面级「跳到主内容」模式。 |
| 焦点 | 容器不截获焦点；内部表单/链接按正常 tab 顺序。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 宽度 | 始终 `w-full`，与 `max-w-*` / `fluid` 组合。 |
| 居中 | `centered && !fluid && 'mx-auto'`，避免 fluid 时无意义居中。 |
| 主题 | 边距与 max-width 依赖 Tailwind 配置；暗色下 padding 一般不变，若需可文档说明用 `className` 覆盖。 |
| 与栅格 | `Container` 内再放 `Row`/`Grid`，避免在 `Row` 外再套一层无意义 max-width 重复约束。 |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| `Container` → `Space` / `Grid` | 常见页面垂直栈或双栏。 |
| `fluid` + `Table` | 表格全宽，表格自身 `scroll.x` 处理横向溢出。 |
| 嵌套 `Container` | 谨慎：内层再 `maxWidth` 可能导致过窄；文档说明一般单层。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| 渲染 | `component="main"` 输出 `<main>`，`fluid` 时含 `max-w-full`。 |
| centered | `fluid` 为 false 时有 `mx-auto`；`fluid` 为 true 时无 `mx-auto`。 |
| maxWidth | 各预设对应正确 `max-w-*` 类。 |
| padding | `verticalPadding="none"` 时不出现 `py-*`（除 `py-0` 语义：当前为不添加 `paddingYClass`）。 |
| Ref | `ref.current` 为对应元素实例。 |

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | 默认内容区、`fluid` 全宽、`component="main"`、窄读宽 `maxWidth="sm"`。 |
| API 表 | 与 §7 一致，附 maxWidth/padding 映射表链接或内嵌。 |
| 最佳实践 | 单 `main`、与 Row/Grid 嵌套顺序、fluid 使用场景。 |

---

## 14. 风险与开放问题

| 风险 | 缓解 |
| --- | --- |
| `ElementType` 传入非原生标签 | 文档限定为 HTML 标签；非法标签由运行时暴露，可 TS 收窄演进。 |
| `xxl` 使用任意值 `1600px` | 与设计 token 对齐；大屏验收横向滚动条。 |
| 双层 Container | 文档反模式说明。 |

---

## 15. 结论

`Container` 定位为 **页面级内容宽度与水平/垂直安全区的布局根**，通过 **`component`/`fluid`/`maxWidth`/`padding`** 覆盖中后台常见壳层需求；与 **Button** 同属声明式 API，**无障碍依赖 landmark 与区块标题的正确使用**。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | Container 结论 |
| --- | --- |
| 职责 | 内容区 max-width、边距、可选全宽 |
| DOM/语义 | 可配置 `main`/`section`/`div` |
| 状态与交互 | 无；响应式靠 CSS |
| 数据与受控 | 无 |
| API | `component`、`fluid`、`centered`、`maxWidth`、`padding`、`verticalPadding`、`className` |
| 类型与 Ref | `HTMLElement` |
| 无障碍 | main/section/aria-labelledby 约定 |
| 样式与主题 | Tailwind max-w、px、py 预设表 |
| 文档与验证 | fluid、main、映射表、嵌套反模式 |

---

## 附录 B：参考实现片段（当前仓库）

文件：`packages/ui/src/components/layout/Container/Container.tsx`。

要点：

- `forwardRef<HTMLElement, ContainerProps>`。  
- `createElement(component, { ref, className: cn(...), ...props })`。  
- `className` 合并顺序：`w-full`、水平 padding、可选垂直 padding、`max-w` 或 `max-w-full`、`mx-auto`、`className`。

（以仓库实际代码为准。）
