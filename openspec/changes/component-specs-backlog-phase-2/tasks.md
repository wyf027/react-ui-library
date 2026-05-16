# Tasks — component-specs-backlog-phase-2

## 1. Backlog queue and scope

- [x] 1.1 Confirm priority order with stakeholders (default: Modal overlay behavior → Table → Upload → Menu)：**采用 design §Decisions 默认顺序**；§2 已按 **Modal → Table → Upload → Menu** 完成对齐迭代。
- [x] 1.2 For the first alignment target, open `COMPONENT_SPECS.md` and any matching `component-plans/*.md`; record gaps in the PR description：**已在 §2 各组件迭代中按 SOP 对照 SPEC / plan 并更新对应 `docs/components/*.md`**（与「首个目标」同流程，逐篇落实）。

## 2. COMPONENT_SPECS alignment (repeat per component iteration)

- [x] 2.1 Modal: align focus management, `aria-*`, keyboard close, and Portal behavior with SPEC/plan; update `docs/components/modal.md` if gaps exist
- [x] 2.2 Table: align columns, pagination, empty/search/filter behaviors with SPEC; update `docs/components/table.md`
- [x] 2.3 Upload: align controlled/uncontrolled and accessibility with SPEC; update `docs/components/upload.md` (add page if missing)
- [x] 2.4 Menu: align keyboard navigation and semantics with SPEC; update `docs/components/menu.md`
- [x] 2.5 After each iteration run `npm run lint:ui && npm run typecheck:ui && npm run test:ui && npm run build:ui`; if docs touched run `npm run build:ui && npm run build:docs`

## 3. MANIFEST P1/P2 evolution (one PR per bullet)

- [x] 3.1 Icon: implement `spin` and/or `decorative` per plan §7.2 (if in scope); extend `Icon.test.tsx` and `docs/components/icon.md`
- [x] 3.2 Typography (Title/Text): implement `ellipsis` or related P2 per plan; extend tests and typography docs

## 4. Feedback `inline/` directory structure

- [x] 4.1 Create `packages/ui/src/components/feedback/inline/` and move Alert, Skeleton, Spin via `git mv` (add Popconfirm/Loading/Tour/etc. only if explicitly agreed)
- [x] 4.2 Update `packages/ui/src/components/feedback/index.ts` exports to `./inline/...` barrels; fix internal imports across repo
- [x] 4.3 Run `npm run lint:ui && npm run typecheck:ui && npm run test:ui && npm run build:ui`

## 5. OpenSpec wrap-up

- [x] 5.1 When above slices complete, run `openspec validate component-specs-backlog-phase-2` and address findings（可用：`npx @fission-ai/openspec@latest validate component-specs-backlog-phase-2`）
- [ ] 5.2 Archive or supersede this change per team workflow (`/opsx:archive` when implementation is merged)：**代码与文档切片已完成**；合并到主分支后由维护者在 CLI / Cursor 中执行归档命令即可勾选此项。
