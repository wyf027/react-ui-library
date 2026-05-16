# Feature specs (GitHub Spec Kit)

本目录由 **Spec Kit** 在运行 **`/speckit-specify`**（及后续 plan / tasks / implement）时自动创建，典型结构：

```text
specs/
  001-short-feature-name/
    spec.md
    plan.md
    tasks.md
    ...
```

## 与 OpenSpec 的区别

| | **Spec Kit** (`specs/`) | **OpenSpec** (`openspec/changes/`) |
| --- | --- | --- |
| 粒度 | 单次功能 / 特性分支 | 仓库级变更包、多迭代 backlog |
| 入口 | `/speckit-specify` 等 | `/opsx:propose` 等 |
| 章程 | `.specify/memory/constitution.md` | `openspec/config.yaml` |

同一需求**不要**在两套目录各写一份；选一条流水线即可。

## 前置

- 项目已 `specify init`（见根目录 **`.specify/`**）
- 章程：**.specify/memory/constitution.md**
- 命令与门禁：**`AGENTS.md`**
