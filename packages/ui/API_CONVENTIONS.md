# Nova UI API Conventions

本文档定义 `packages/ui` 新增与维护组件时必须遵循的统一 API 协议。

## 1) value 体系（数据值）

适用于输入类、选择类、评分类、上传类等存在“值”的组件。

- `value`：受控值。
- `defaultValue`：非受控初始值。
- `onChange`：值变化回调。

### 约束

- 组件同时支持受控与非受控模式。
- `value` 存在时视为受控；组件内部不得自行维护最终值来源。
- `defaultValue` 仅在初始化时生效，不应在后续更新中重置内部状态。
- `onChange` 仅在值实际变化时触发。
- `onChange` 的第一个参数应始终为“下一状态值”，其余参数按组件场景补充（例如事件对象、选项元数据等）。

## 2) 可见性体系（显隐/展开）

适用于弹层、下拉、抽屉、对话框、气泡、菜单等存在“开关态”的组件。

- `open`：受控可见性状态。
- `defaultOpen`：非受控初始可见性状态。
- `onOpenChange`：可见性变化回调。

### 约束

- 可见性字段统一使用 `open`，不要混用 `visible` / `show` / `isOpen` 等命名。
- `open` 存在时视为受控；内部状态更新必须由外部驱动。
- `defaultOpen` 仅用于初始化非受控状态。
- `onOpenChange(nextOpen)` 在可见性变化时触发，且首参为 `boolean`。

## 3) 状态体系（交互状态）

适用于绝大多数基础与复合组件。

- `disabled`：禁用态。
- `size`：尺寸规范。
- `status`：语义状态（如成功/警告/错误等）。

### 约束

- `disabled` 类型为 `boolean`，默认 `false`。
- `size` 建议使用统一联合类型（如 `'sm' | 'md' | 'lg'`），特殊尺寸需在文档中说明。
- `status` 建议使用统一联合类型（如 `'default' | 'success' | 'warning' | 'error'`），并与视觉 token 对齐。
- 当 `disabled` 为 `true` 时：
  - 交互事件不应触发状态变更。
  - 需保证键盘与读屏可访问性语义正确。

## 4) 命名与一致性补充

- 对外 API 优先使用上述标准命名，避免同义词并存。
- 同类组件保持同构 API：相同语义字段必须同名、同默认行为、同触发时机。
- 引入例外命名时，必须在组件文档中明确说明“为何不能遵循标准命名”。

## 5) 新组件接入清单（开发自检）

新增组件时，请至少确认：

- [ ] 值相关 API 使用 `value/defaultValue/onChange`。
- [ ] 显隐相关 API 使用 `open/defaultOpen/onOpenChange`。
- [ ] 状态相关 API 使用 `disabled/size/status`。
- [ ] 受控/非受控行为清晰，且文档示例覆盖两种模式。
- [ ] 事件触发时机与参数顺序在同类组件间一致。
