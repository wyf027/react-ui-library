# 详细设计：Nova UI 文档自 VitePress 迁移至 dumi（OpenSpec）

| 元数据 | 说明 |
| --- | --- |
| 状态 | 已完成（默认文档站为 **`docs-dumi/`**，任务见 **`tasks.md`**） |
| 适用范围 | 立项时针对仓库旧 **`docs/`（VitePress）**；终态不影响 `packages/ui` 发布包默认导出 |
| 关联变更包 | `openspec/changes/migrate-docs-to-dumi/` |

> **说明**：下文 §1「As-Is」为立项时的仓库快照，便于对照痛点与约束；当前事实来源以 **`docs-dumi/`**、**`archive/vitepress-site/`** 与根 **`package.json` scripts** 为准。

---

## 1. 背景与现状（As-Is）

### 1.1 当前栈

| 层级 | 现状 |
| --- | --- |
| 文档框架 | **VitePress**（`docs/.vitepress/config.ts`） |
| 示例运行 | 自定义 **`LivePlayground`** + **`react-live`**，Markdown 内 `<LivePlayground :code="\`...\`" />` 内联大段字符串 |
| 样式 | `custom.css` + VitePress CSS 变量做暗色适配 |
| 依赖 UI 包 | `docs/package.json` → `"@wuyangfan/nova-ui": "file:../packages/ui"` |
| Base | **`/react-ui-library/`**（部署子路径） |
| 语言 | 文档 `lang: 'zh-CN'` |

### 1.2 主要痛点

1. **示例与源码脱节**：内联字符串非独立 `.tsx`，IDE 补全/格式化/类型检查弱。
2. **与 Ant Design 等实践不一致**：业界组件库普遍 **dumi + demo 文件**，利于 CR 与机器检索。
3. **主题能力**：VitePress 偏通用文档；dumi 对 **组件库 API 表、demo 分组、移动端预览** 等有更成熟插件生态（需评估版本）。

### 1.3 约束（必须保留）

- **构建顺序**：任意 **`dev:docs` / `build:docs`** 前须 **`build:ui`**（或等价的 workspace 依赖解析），否则无法解析本地包。
- **Base path**：若线上仍为 GitHub Pages 子路径，新站点须 **`base` 等价配置**，避免静态资源 404。
- **React 18**：与当前 `packages/ui` 一致。
- **Tailwind**：组件依赖 Tailwind；文档页预览须注入 **`nova-ui` 构建样式**（`dist/styles.css` 或源码 CSS pipeline），见 §5。

---

## 2. 目标架构（To-Be）

### 2.1 总体结构（推荐）

```
react-ui-library/
├── packages/ui/                 # 不变（发布包）
├── docs-dumi/                   # 推荐：新 workspace 名，避免与旧 docs 并行混淆
│   ├── .dumi/
│   ├── package.json             # dumi、react、@wuyangfan/nova-ui file: 依赖
│   └── docs/                    # dumi 默认文档根（或按 dumi 版本约定）
├── docs/                        # 迁移期可保留只读或删除；终态二选一
└── package.json                 # workspaces + scripts 指向 docs-dumi
```

**备选**：在原 `docs/` 目录内「清空 VitePress、改写为 dumi」，减少目录改名带来的链接迁移成本；代价是 PR 体积大、回滚略难。

### 2.2 版本选型原则

- 以 **`dumi` 当前主版本** 与 **React 18** 兼容性为准（迁移启动时用 `npm info dumi peerDependencies` 核对）。
- 锁定 **次要版本范围** 写入 `package.json`，避免无痛升级破坏主题 API。
- 若团队希望稳定优先，可先锁定 **Ant Design / ProComponents 同款大版本线** 附近的 dumi 2.x（需启动时实测）。

### 2.3 与 Ant Design「代码实例」对齐度（能力映射）

| Ant Design 常见能力 | Nova UI 迁移后在 dumi 中的对应 |
| --- | --- |
| 独立 `demo/*.tsx` | dumi 默认 demo 管线；每个 demo 文件导出组件或默认导出渲染函数 |
| 预览 + 源码展示 | dumi 内置 CodePreview；必要时 **自定义 theme token** |
| Live 编辑 | **可选**：保留 `react-live` 或采用 dumi 生态中的 live 方案（见 §6），在 `.dumi/theme` 扩展预览器 |
| iframe 隔离 | dumi 配置项或自定义预览容器（复杂 demo 防样式污染） |

---

## 3. 文档与路由映射

### 3.1 URL 策略

| 现状（VitePress） | 目标（dumi） |
| --- | --- |
| `/react-ui-library/guide/introduction` | `base` + `/guide/introduction`（具体路径依 dumi `sidebar` / `routes` 配置） |
| `/react-ui-library/components/button` | 对齐组件文档 slug；建议 **保持 slug 不变** 以减少外链失效 |

**要求**：产出一份 **路由对照表**（CSV/Markdown），迁移验收时逐条 spot-check。

### 3.2 内容分层

- **指南**：纯 Markdown，表格/代码块与现稿兼容度高。
- **组件**：每组件一页 + 多个 demo 文件；API 表可用 Markdown 表格或 dumi 插件生成（若引入 API 解析再单列迭代）。

---

## 4. Demo 契约（核心设计）

### 4.1 目录约定（建议）

以 Button 为例：

```
packages/ui/src/components/basic/Button/
docs/
  button.md              # 或集中在 docs-dumi/docs/components/button.md
  demos/
    basic.tsx
    loading.tsx
```

**决策点**：demo 文件放在 **组件包旁**（Monorepo 共址）还是 **仅放在 docs 仓库**。推荐：

- **优先**：`docs-dumi/docs/components/button/demos/*.tsx` —— 文档库独占，避免 UI 包发布 tarball 体积膨胀。
- **备选**：与源码共址 —— 便于「示例即真理」，需在 `packages/ui` `package.json` **files** 字段排除 demo（避免打进 npm）。

### 4.2 Demo 文件最小契约

- 每个 demo **默认导出** React 组件或使用 dumi 约定的导出形式（以选定 dumi 版本文档为准）。
- **import 路径**与用户对库的用法一致：例如 `import { Button } from '@wuyangfan/nova-ui'`。
- 禁止依赖未导出的内部路径（与当前文档要求一致）。

### 4.3 从内联 LivePlayground 迁移策略

1. **机械迁移**：每个 `<LivePlayground :code="..."/>` → 提取为 `demos/xxx.tsx`，Markdown 用 dumi 语法引用。
2. **语义校验**：运行站点 + 视觉回归关键页（Button、Form、Dark mode）。
3. **Live 能力**：若第一期不做 live，可用「仅展示源码 + 静态预览」；第二期再接 live。

---

## 5. 样式与 Tailwind / Nova UI CSS

### 5.1 问题

Nova UI 组件依赖 **Tailwind** 与 **`dist/styles.css`**（或 dev 下等价样式）。dumi 构建链必须：

- 在 **预览 iframe / 页面根** 引入全局样式；
- 开发模式热更新与生产构建一致。

### 5.2 可选实现路径

| 方案 | 做法 | 优点 | 风险 |
| --- | --- | --- | --- |
| A. 引入构建产物 | `docs-dumi` 依赖 UI 包，在 `.dumi/app.tsx` 或全局入口 `import '@wuyangfan/nova-ui/dist/styles.css'`（路径以实际导出为准） | 与消费者一致 | 需每次 `build:ui` |
| B. Tailwind 编译进文档站 | `docs-dumi` 单独配 `tailwind.config` content 包含 `packages/ui` | HMR 友好 | 配置 duplicate，需与 UI 包 token 同步策略 |
| **推荐 MVP** | **A + predev 脚本**：`dev:docs` = `build:ui && dumi dev` 或 workspace 脚本保证顺序 | 简单可靠 | dev 冷启动略慢 |

具体 import 路径须对照 **`packages/ui/package.json` `exports`** 或文档现有写法核对。

---

## 6. Live 预览（可选阶段）

### 6.1 目标

保留现有「可编辑示例」体验，或明确降级为静态 demo。

### 6.2 技术选项

1. **沿用 react-live**：在 `.dumi/theme/slots` 或自定义 `Previewer` 内嵌现有 `LiveCodeEditor` 逻辑。
2. **dumi 官方 / 社区 live**：若与 React 18 兼容，可减少自维护代码。
3. **仅服务端编译 snippet**：编辑后用 **sucrase/babel stand-alone** 在浏览器执行（参考 antd 站点演进，注意包体与 CSP）。

**落地（与 §7 / P3）**：第一期曾以静态 demo 为主；**P3** 已在 **`docs-dumi`** 引入 **`react-live`**（仅文档 workspace），**`/playground`** 使用 **`docs/demos/playground-live.tsx`**（客户端挂载 + `LiveProvider`）。详见 **`tasks.md`** P3 与 **`docs-dumi/README.md`**。

---

## 7. 站点配置清单（迁移完成后回填）

以下与当前 **`docs-dumi/.dumirc.ts`**、**`.dumi/app.tsx`** 一致；立项时的勾选清单在此收口为已完成。

- [x] **`base`**：`/react-ui-library/` — **`.dumirc.ts`** 中 **`base`**、**`publicPath`**。
- [x] **标题 / 语言 / 主题色**：**`title: 'Nova UI'`**、**`locales: zh-CN`**；品牌色随 dumi 主题与全局样式。
- [x] **侧边栏**：**`themeConfig.sidebar`**（指南 / 开发 / 组件分组）。
- [x] **导航**：**`themeConfig.nav`**（指南、组件、API、在线示例）。
- [x] **暗色模式**：**`prefersColor`** + **`.dumi/app.tsx`** 同步 **`data-prefers-color`** → **`html.dark`**（与 Nova UI **`darkMode: 'class'`** 对齐）。
- [x] **搜索**：采用 **dumi 默认文档搜索**（内置本地检索）；未单独接入 VitePress 本地搜索插件。

---

## 8. Monorepo 与 npm workspaces

### 8.1 `package.json`（根）

- `workspaces` 包含新文档包路径。
- `scripts.dev:docs` / `build:docs` 指向 dumi。

### 8.2 依赖

- `@wuyangfan/nova-ui`: **`file:../packages/ui`**（与现一致）。
- 移除 VitePress、`vue`（若仅 React 文档且无 Vue demo）相关依赖；以最终 lockfile 为准。

---

## 9. CI/CD 与验收

### 9.1 CI

- **Lint**：文档站若引入 ESLint，可与根共享或独立。
- **构建**：`npm run build`（`build:ui && build:docs`）必须通过。
- **可选**：Broken link checker 对路由对照表抽样。

### 9.2 验收标准（DoD）

1. `npm run build:ui && npm run build:docs` 在干净环境下成功。
2. 核心路由（指南首页、≥3 个组件页、Playground 若有）可访问，控制台无 ERROR。
3. **Dark mode** 下预览区无灾难性对比度问题。
4. 对外部署路径下 **静态资源无 404**（base 正确）。

---

## 10. 风险与缓解

| 风险 | 缓解 |
| --- | --- |
| dumi 与 React 18 / Vite 版本摩擦 | 启动 POC：`create-dumi` 最小站点 + 引入 `@wuyangfan/nova-ui` 一点测试 |
| Tailwind 与 demo 样式不一致 | MVP 走 **`dist/styles.css`**；文档补充「开发须先 build:ui」 |
| 迁移周期长、双栈并存 | 短期可用 **`docs-vitepress-archive/`** 只读归档；或分支迁移 |
| SEO / 旧链接失效 | **slug 不变** + 服务端或静态 **redirect 映射**（若路径仍变化） |

---

## 11. 分阶段 rollout（建议）

| 阶段 | 内容 | 产出 |
| --- | --- | --- |
| **P0 POC** | 新建最小 dumi 工程，跑通依赖 `@wuyangfan/nova-ui` + 一页 demo | Go / No-go |
| **P1 骨架** | 侧边栏、指南迁移、1～3 个组件全量 demo 范式 | 可合并主线 |
| **P2 批量** | 其余组件页迁移；删除 VitePress | `build:docs` 稳定 |
| **P3 增强** | Live、iframe、API 自动生成（可选） | 体验对齐 antd |

---

## 12. 回滚策略

- **Git**：迁移全程保持可回退分支；合并前 tag 当前 VitePress 可构建版本。
- **产物**：若部署自动化，保留上一版静态产物切换指针。

---

## 13. 开放问题（需决策）

1. 文档目录最终命名：`docs/` 原地替换 vs 新建 `docs-dumi/`？
2. demo 与源码 **共址 vs 仅在 docs 仓库**？
3. **英文文档**是否在 dumi 侧一并启用 locale？
4. 是否必须 **第一期** 保留 Live 编辑，抑或接受第二期？

---

## 14. 附录：与现有仓库命令对照

| 命令 | 现状 | 迁移后（预期） |
| --- | --- | --- |
| `npm run dev:docs` | VitePress dev | `dumi dev`（或封装脚本） |
| `npm run build:docs` | VitePress build | `dumi build` |
| 本地 URL | `http://localhost:5173/react-ui-library/` | 以 dumi 默认端口为准，**base** 一致即可 |

（端口与 dev host 以实施时 `package.json` 脚本为准。）
