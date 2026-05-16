## Context

Nova UI 为单包 `@wuyangfan/nova-ui`，源码在 `packages/ui`，文档站为 **`docs-dumi/`（dumi）**。已有 `component-plans/MANIFEST.md` 批次闭环、`AGENTS.md` 命令、`packages/ui/TESTING.md` 与 Vitest。OpenSpec 变更用于约束后续多迭代 backlog，而非单次巨型 PR。

## Goals / Non-Goals

**Goals:**

- 将「组件与规格」backlog 拆成可验收的迭代：**规格对齐**、**P1/P2 演进**、**feedback inline 目录**三条线可并行但各自独立合并。
- 对齐作业沿用 MANIFEST **agent-sop**：读方案 → 对照实现 → 最小改动 → 更新 docs → 运行门禁。
- `feedback/inline` 迁移保持 **公共导出符号不变**，仅调整内部路径与 barrel。

**Non-Goals:**

- 不在本设计中单次落地所有 COMPONENT_SPECS 中的组件。
- 不引入新测试框架或替换当前 **dumi** 文档栈；不强制子路径 `package.json exports`（除非单独变更）。

## Decisions

1. **优先级队列**：默认顺序 **Modal 行为 / 焦点与可访问性约定** → **Table**（数据展示高频）→ **Upload** → **Menu**；可根据业务在一个迭代内只取队列前 1～2 项。
2. **规格来源**：以 `COMPONENT_SPECS.md` 与 `component-plans/*.md`（若存在对应篇）为准；二者冲突时在 PR 中显式修订 SPEC 或文档并记录。
3. **P1/P2**：每项演进单独 PR（或 OpenSpec 子 change），便于 review；Icon `spin`/`decorative`、Typography ellipsis 等互不捆绑。
4. **feedback/inline**：采用 `git mv` 保留历史；更新 `packages/ui/src/components/feedback/index.ts` 与跨包相对 import；完成后全仓 `lint:ui && typecheck:ui && test:ui && build:ui`。

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| 目录迁移误伤深层 import | 迁移后用 ripgrep 扫 `feedback/Alert` 等旧路径；CI 跑全量 build |
| 规格与实现偏差过大导致超长 PR | 严格遵守「一篇方案 / 一能力」粒度；超大差异拆 change |
| Modal/焦点行为牵涉多个 overlay | 先写共享约定（或 `_internal` 原语），再改 Modal/Drawer |

## Migration Plan

- **规格对齐**：无用户侧迁移；若有 API 变更须在组件文档标注 **BREAKING** 与迁移说明。
- **feedback/inline**：消费者仍 `import { Alert } from '@wuyangfan/nova-ui'`；仅内部路径变。

## Open Questions

- Modal **焦点陷阱（focus trap）** 是否在首轮对齐中强制，或拆成独立 capability。
- `inline` 是否纳入 **Popconfirm**、**Loading** 等组件的最终清单需产品/维护者确认。
