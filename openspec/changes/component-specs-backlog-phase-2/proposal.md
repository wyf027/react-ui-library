## Why

> **状态**：§2–§4 代码与文档切片已在仓库落地（见 **`tasks.md`**）；§5.2 需在变更合并主分支后按团队流程归档 OpenSpec 变更包。

Nova UI 的「本批次」`component-plans/MANIFEST.md` 已闭环，但 **COMPONENT_SPECS.md** 与大量组件仍未按同一套「方案 → 实现 → 文档 → 验证」流程逐个对齐；同时 MANIFEST 中刻意保留的 **P1/P2 演进项**，以及「八块计划」中与 **`feedback/inline`** 语义一致的目录结构尚未落地。需要在仓库内用可追溯的变更包框定范围与验收，便于分迭代交付而不稀释既有质量标准。

## What Changes

- **规格对齐迭代**：从 `COMPONENT_SPECS.md` 中选取「本批次外」组件（优先 **Table、Upload、Menu、Modal 行为** 等），按 `component-plans` 同款 SOP 对照 `packages/ui` 与 **`docs-dumi/docs/components/*.md`**，缺口最小补齐或文档明确边界。
- **MANIFEST P1/P2 小颗粒演进**：按方案 §7.2 分拆为独立子任务（例如 **Icon `spin` / `decorative`**、**Title `ellipsis`** 等），避免单次 PR 过大。
- **Feedback 二级目录（可选）**：将 **Alert、Skeleton、Spin** 等迁入 **`feedback/inline/`**（或团队选定命名），更新分类 barrel 与内部 import；**不改变**从 `@wuyangfan/nova-ui` 导出的公开符号名。
- **非目标（本变更包不强制一次做完）**：上述三项在具体迭代中仍遵守各方案「非目标」条款；本 proposal 只确立 backlog 结构与优先级原则。

## Capabilities

### New Capabilities

- `nova-ui-spec-alignment`: COMPONENT_SPECS / component-plans 与实现及 **dumi（`docs-dumi/docs`）** 文档的对齐流程、优先级（Table / Upload / Menu / Modal 等）及 DoD（lint / typecheck / test / build:ui / build:docs）。
- `nova-ui-evolution-items`: MANIFEST 与各方案 §7.2 的 P1/P2 演进项清单化与分批交付约定。
- `feedback-inline-layout`: Feedback 分类下 inline 子目录的物理结构与 barrel 导出契约（保持公共 API 稳定）。

### Modified Capabilities

<!-- openspec/specs/ 当前无既有 capability；若后续增加 baseline spec，再于此列出 delta。 -->

## Impact

- **代码**：`packages/ui/src/components/**`（对齐规格时的 API / a11y / token）、可能的 **`feedback/`** 目录迁移。
- **文档**：**`docs-dumi/docs/components/*.md`**、`COMPONENT_SPECS.md` 小节同步。
- **工具链**：沿用现有 `npm run lint:ui`、`typecheck:ui`、`test:ui`、`build:ui`、`build:docs`；无新运行时依赖要求。
- **破坏性**：默认 **无 BREAKING**；若某方案明确要求 API 变更，须在对应子变更中单独立项并标注 **BREAKING**。
