# 可访问性（a11y）检查清单与审计

## 检查清单

### 1) 键盘导航
- 组件可通过 `Tab` 到达关键交互点。
- 弹出层支持 `Esc` 关闭（Modal / Dropdown）。
- 菜单类支持方向键浏览（Menu / Dropdown 列表）。
- 当前激活项可通过 `tabIndex` 或等价机制感知。

### 2) 焦点管理
- 打开浮层后焦点进入浮层内部（优先落到首个可操作元素）。
- 关闭浮层后焦点返回触发源。
- 不出现“焦点丢失”或跳到页面顶部的问题。

### 3) 语义标签与 ARIA
- Modal 使用 `role="dialog"` + `aria-modal="true"`。
- 触发器使用 `aria-expanded`、`aria-haspopup`、`aria-controls` 关联弹层。
- 表单错误态暴露 `aria-invalid`，错误文案通过 `aria-describedby` 绑定。
- 文本标签通过 `label[for]` 绑定表单控件。

## 组件级审计结果（本轮）

| 组件 | 结果 | 说明 |
|---|---|---|
| Modal | 通过 | 已补齐标题关联与焦点进出管理 |
| Dropdown | 通过 | 已补齐键盘展开/关闭、方向键遍历、触发器 ARIA |
| Menu | 通过 | 已补齐方向键遍历与活动项焦点语义 |
| Select | 通过 | 原生 `select` + `label` 绑定已满足基础可访问性 |
| Form（含表单控件接入） | 通过 | 已补齐 `label-for`、`aria-invalid`、`aria-describedby` |

## 修复明细（问题 - 改法 - 验证方式）

### Modal
- **问题**：打开后焦点未自动进入弹窗；关闭后未恢复到原焦点；标题未通过 `aria-labelledby` 绑定。
- **改法**：
  - 打开时记录 `document.activeElement`，并将焦点移动到关闭按钮。
  - 关闭（卸载）时恢复到打开前焦点。
  - 为标题生成稳定 `id` 并通过 `aria-labelledby` 关联 `role="dialog"`。
- **验证方式**：
  - 键盘触发打开 Modal 后，焦点落在关闭按钮。
  - 按 `Esc` 或点击关闭后，焦点回到触发按钮。
  - 用浏览器无障碍树检查 `dialog` 的可访问名称来源于标题。

### Dropdown
- **问题**：仅鼠标可用；触发器缺少展开状态语义；缺少 `Esc` 与方向键导航；点击外部不收起会影响键盘流。
- **改法**：
  - 触发按钮添加 `aria-expanded`、`aria-haspopup="menu"`、`aria-controls`。
  - 支持触发器 `Enter / Space / ArrowDown` 打开。
  - 菜单支持 `ArrowUp/ArrowDown` 切换活动项，`Esc` 关闭并将焦点还给触发器。
  - 增加 click outside 关闭行为。
- **验证方式**：
  - 仅键盘完成“打开 -> 切换项 -> 关闭”。
  - 用读屏检查触发器可读到展开状态。

### Menu
- **问题**：缺少方向键导航，活动项缺少 roving 焦点语义。
- **改法**：
  - 在 `menu` 层监听方向键（垂直：上下；水平：左右）。
  - 维护活动项 key，并为活动项设置 `tabIndex=0`，其他为 `-1`。
- **验证方式**：
  - 通过方向键在菜单项间循环切换。
  - Tab 进入菜单后，焦点落在当前活动项。

### Form / 表单控件接入
- **问题**：`FormItem` 标签与输入控件缺少强绑定；错误信息未与控件语义关联。
- **改法**：
  - `FormItem` 生成控件 id，`label` 使用 `htmlFor` 关联。
  - 有错误时向控件注入 `aria-invalid` 与 `aria-describedby`，并给错误文本分配 id。
- **验证方式**：
  - 点击 `label` 可聚焦对应控件。
  - 触发校验错误后，读屏可读到错误状态及错误文案。

## 行为变更影响范围

- Dropdown / Menu 新增键盘方向键行为，可能影响依赖自定义 `onKeyDown` 冒泡逻辑的页面。
- Modal 打开后会自动聚焦关闭按钮，关闭后恢复先前焦点；如果业务依赖“打开不夺焦”，需评估。
- 以上变更均未修改公开 API，属于行为增强。
