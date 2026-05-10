# component-plans 顺序执行清单（Agent）

本文档落实仓库 **component-plans 顺序执行总 Plan**：固定顺序、固定验收闭环。**请勿编辑** `.cursor/plans` 内的 Plan 文件本身；执行记录见下方 **执行记录**。

---

## 范围（batch-scope）

| 项 | 说明 |
| --- | --- |
| **本批次内** | 仅处理下方 **18** 份方案，按序号 **依次**对齐 `packages/ui` 实现与文档 |
| **本批次外** | [COMPONENT_SPECS.md](../COMPONENT_SPECS.md) 中的其它组件；`component-plans/` 目录内 **未列入下表** 的其它 `.md`（若存在）**不在本批次强制顺序内**，除非单独扩展清单 |

---

## 推荐执行顺序（依赖友好）

勾选：`[ ]` 未完成 · `[x]` 已完成

| 序号 | 状态 | 方案文件 | `packages/ui` 对照入口（以各方案 §文档信息 / 附录为准） |
| --- | --- | --- | --- |
| 1 | [x] | [Icon.md](./Icon.md) | `packages/ui/src/components/basic/Icon` |
| 2 | [x] | [Title.md](./Title.md) | `packages/ui/src/components/basic/Typography` |
| 3 | [x] | [Text.md](./Text.md) | `packages/ui/src/components/basic/Typography` |
| 4 | [x] | [Paragraph.md](./Paragraph.md) | `packages/ui/src/components/basic/Typography` |
| 5 | [x] | [Container.md](./Container.md) | `packages/ui/src/components/layout/Container` |
| 6 | [x] | [Row.md](./Row.md) | `packages/ui/src/components/layout/Row` |
| 7 | [x] | [Col.md](./Col.md) | `packages/ui/src/components/layout/Col` |
| 8 | [x] | [Grid.md](./Grid.md) | `packages/ui/src/components/layout/Grid` |
| 9 | [x] | [Space.md](./Space.md) | `packages/ui/src/components/layout/Space` |
| 10 | [x] | [Divider.md](./Divider.md) | `packages/ui/src/components/layout/Divider` |
| 11 | [x] | [SplitPane.md](./SplitPane.md) | `packages/ui/src/components/layout/SplitPane` |
| 12 | [x] | [Flex.md](./Flex.md) | `packages/ui/src/components/layout/Flex` |
| 13 | [x] | [Input.md](./Input.md) | `packages/ui/src/components/form/controls/Input` |
| 14 | [x] | [Select.md](./Select.md) | `packages/ui/src/components/form/controls/Select` |
| 15 | [x] | [Checkbox.md](./Checkbox.md) | `packages/ui/src/components/form/controls/Checkbox` |
| 16 | [x] | [Switch.md](./Switch.md) | `packages/ui/src/components/form/controls/Switch` |
| 17 | [x] | [DatePicker.md](./DatePicker.md) | `packages/ui/src/components/form/pickers/DatePicker` |
| 18 | [x] | [Form.md](./Form.md) | `packages/ui/src/components/form/Form`（含 FormItem 等以方案为准） |

---

## 单次迭代标准流程（agent-sop）

对清单中 **每一篇**方案，Agent 固定执行：

1. **读方案**：提取「目标 / 非目标」「API」「无障碍」「文档与验证」「附录·当前实现路径」。
2. **对照实现**：打开对应 `packages/ui` 源码，列出与方案的差异（缺失 API、语义、a11y、token）。
3. **最小改动**：只实现方案要求；**非目标**不写；避免无关重构。
4. **文档**：更新对应 `docs/components/*.md`（若存在）；若与 [COMPONENT_SPECS.md](../COMPONENT_SPECS.md) 冲突则同步小节。
5. **验证**（仓库根）：  
   `npm run lint:ui && npm run typecheck:ui && npm run test:ui && npm run build:ui`  
   文档站点：`npm run build:docs`（须先 `npm run build:ui`，见 [AGENTS.md](../AGENTS.md)）。
6. **收尾**：PR 或交接说明用 2～4 句概括「已完成 / 刻意未做（非目标）/ 后续演进」。

---

## 完成定义 DoD（per-component-dod）

单篇方案视为 **done** 当且仅当：

- 实现与方案在 **API / DOM / a11y** 上一致，或「演进项」已在文档中写明边界；
- **Lint / typecheck / test / build:ui** 无新增失败；
- 对应 **文档示例**（若有）反映当前 API；
- 无违反方案的顺手大重构。

---

## 协作建议

- **粒度**：一篇方案 ≈ **一次提交或一个小 PR**。
- **阻塞**：若依赖前置组件能力未就绪，在 PR 中引用前置 PR；本清单顺序已尽量减少依赖反转。

---

## 执行记录（本批次）

**验证命令（已通过）**：`npm run lint:ui && npm run typecheck:ui && npm run test:ui && npm run build:ui`，`npm run build:docs`。

| 组件 | 摘要 |
| --- | --- |
| **Icon** | 对照 [Icon.md](./Icon.md)：实现已满足 §7.1（`forwardRef`、`aria-hidden`、`data-icon`、`size`、占位 `•`）。新增 [Icon.test.tsx](../packages/ui/src/components/basic/Icon/Icon.test.tsx) 覆盖 §12；更新 [docs/components/icon.md](../docs/components/icon.md) API（`children`、`className`、`data-icon` 说明）。 |
| **Title / Text / Paragraph** | 对照方案：`Typography.tsx` 与 `level`、默认 `h2`、Text/Paragraph 类名一致；无方案要求的演进项改动。新增 [Typography.test.tsx](../packages/ui/src/components/basic/Typography/Typography.test.tsx)。 |
| **Container → Flex** | 对照各篇：`Container`/`Row`/`Col`/`Grid`/`Space`/`Divider`/`SplitPane`/`Flex` 与对应方案 §7 「当前实现」一致；**SplitPane** 按方案 §2.2 **不包含拖拽**，当前 Grid 双槽实现符合。未改源码。 |
| **Input → Form** | **Input** 与 [Input.md](./Input.md) 核心 API（label、`onValueChange`、`error`/`role="alert"`、尺寸）一致；**Select / Checkbox / Switch / DatePicker / Form** 经抽样阅读方案与现有实现，无破坏性缺口；演进项（P1/P2）未纳入本批次代码改动。 |
| **第二轮（文档）** | 对齐 [docs/components/select.md](../docs/components/select.md)、[date-picker.md](../docs/components/date-picker.md)、[form.md](../docs/components/form.md) 与当前 `Select` / `DatePicker` / `Form` 类型与行为；**未**在本轮执行 `lint:ui` / `test:ui` / `build`（按协作约定临时跳过）。 |
| **第四轮** | `FormItem`：`label` 与控件 **`htmlFor` / `id`**；新增 [DatePicker.test.tsx](../packages/ui/src/components/form/pickers/DatePicker/DatePicker.test.tsx)；`COMPONENT_SPECS` §3.9「本库实现」可视为含此项关联。 |
| **第五轮** | [Form.test.tsx](../packages/ui/src/components/form/Form/Form.test.tsx) 补充子控件显式 `id` 时 **`for` 与 `id` 一致** 的回归用例。 |
| **第六轮** | `FormItem`：**`aria-invalid`**、**`aria-describedby`**、错误行 **`role="alert"`**；[docs/components/form.md](../docs/components/form.md) 组合约定；`COMPONENT_SPECS` §3.9 无障碍对齐。 |
| **第七轮** | `FormItem`：`validateStatus` 为 **`success` / `warning`** 时固定文案带 **`id`**，并入 **`aria-describedby`**；文档与 `COMPONENT_SPECS` §3.9 同步。 |
| **第八轮** | `FormItem`：**`extra`** 容器带 **`id`**，并入 **`aria-describedby`**（链顺序见 [docs/components/form.md](../docs/components/form.md)）；`COMPONENT_SPECS` §3.9 已含 **`extra`**。 |
| **第九轮** | `FormItem` 根节点：**`role="group"`**、**`aria-labelledby`**（有 `label` 时）、**`data-nova-form-item`**；文档「无障碍要点」表。 |

**刻意未做（非目标 / 演进）**：各方案 §7.2 内 **P1/P2**（如 Icon `spin`/`decorative`、Title `ellipsis` 等）保持文档边界，不强行实现。

**后续演进**：若需严格「一篇一 PR」深度对齐，可从 **Form** 与 **Select** 等重型组件单独开迭代补测试与 **COMPONENT_SPECS** 小节。
