# Upload 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/form/controls/Upload/Upload.tsx`

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Upload` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/form/controls/Upload` |
| 分类 | Form |
| 依赖 | `cn` |
| 关联组件 | **`Form`/`FormItem`**（需自行把 **`fileList`** 写入 **`FormValues`**）、**`Button`**（替代触发区可演进） |

---

## 2. 目标与非目标

### 2.1 目标（与当前实现对齐）

1. **文件选择**：**`sr-only` `input type="file"`**（可 Tab），外显 **`label`** 触发区（虚线框 + **`triggerText`**）。  
2. **受控列表展示**：**`fileList: UploadFileItem[]`** 渲染 **`<ul><li>`** 文件名列表。  
3. **变更回调**：每次选择后 **`onChange(items: UploadFileItem[], files: File[])`** — **`items`** 为本次 **`input.files`** 映射（经 **`beforeUpload`/`maxSize`/`maxCount`** 过滤），**`files`** 为与之同序的 **`File`**，供上传使用。  
4. **可选约束**：**`accept`**、**`multiple`**、**`disabled`**、**`maxCount`**、**`maxSize`**、**`beforeUpload`**；透传 **`input`**。  
5. **列表移除**：可选 **`onRemove`** → 每项 **`button`**（**`aria-label`**）。  
6. **类型导出**：**`UploadFileItem`** 作为稳定展示/提交结构（与仓库「Upload 对象不进业务态」治理方向一致：此处为 **元数据项**，非浏览器 **`File`** 本体）。

### 2.2 非目标

1. **真实拖拽上传（dragover/drop）**：文案含「drag」为 **营销式占位**，当前 **无 drop 事件**；拖拽行为依赖浏览器对 `label` 聚焦文件选择的行为差异，**不可靠**。  
2. **内置上传请求**：无 **`action`**；无 Ant Design 风格 **`customRequest` 协议**（业务用 **`onChange` 第二参 `File[]`** 自行上传）。  
3. **分片、进度条、重试 UI**：未实现。  
4. **内部合并 `fileList`**：**`onChange` 后不会自动把新文件追加进内部 state**；**`fileList` 完全由父级驱动**（见 §6）。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 选文件后交父级上传 | **`onChange(items, files)`** 第二参 **`File[]`** 可直接 **`fetch`/`FormData`**；可选 **`inputRef`**。 |
| 仅记录已选文件名 | **`fileList` + `onChange`** 更新父 state 即可。 |
| 表单字段 | 与 **`FormItem`** 组合时，**`value` 注入的是子元素**；本组件 **`ref` 在 `div`**，**非典型 `cloneElement` 单 input 形态**，需 **`FormItem` 包一层适配** 或 **不用 `FormItem` 注入** 而手写 **`values`**。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 根 | **`<div ref={ref} className="space-y-2">`** |
| 触发区 | **`<label htmlFor={id}>`** + **`sr-only` `input[type=file]`** + **`triggerText`**；**`focus-within:ring`** |
| 列表 | **`fileList.length > 0`** 时 **`<ul>`**，项 **`<li>`** + 可选 **`onRemove`** **`button`** |
| `input` | **`useId`** 生成 **`id`**；**`inputRef`** 合并 |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| 内部 state | **无**；**`fileList` 仅展示 props** |
| `handleChange` | 映射 **`UploadFileItem[]`** + **`File[]`**；**`beforeUpload`/`maxSize`/`maxCount`** 过滤；末尾 **`input.value = ''`** |
| `disabled` | **`input` + `label` 样式**（`cursor-not-allowed opacity-60`） |

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| 列表数据源 | **`fileList` 必须由父组件在 `onChange` 后更新** 才会出现在 UI；否则仅触发回调、列表不变。 |
| 映射规则 | **`uid`**：**`makeUid(file)`**（**`randomUUID`** + 后缀）；**`name`**；**`size`** |
| 与 **`File`** | **`onChange` 第二参** 提供 **`File[]`**；**`uid`** 优先 **`crypto.randomUUID()`** |

---

## 7. API 规范

### 7.1 `UploadFileItem`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `uid` | `string` | **`crypto.randomUUID()`**（不可用则降级随机后缀） |
| `name` | `string` | 文件名 |
| `size` | `number`（可选） | 字节 |

### 7.2 `UploadProps`

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `accept` | 可选文件类型 | `string` | - | 透传 **`input`** |
| `multiple` | 多选 | `boolean` | - | 透传 **`input`** |
| `disabled` | 禁用 | `boolean` | - | |
| `fileList` | 已选/已展示列表 | `UploadFileItem[]` | `[]` | **展示用** |
| `maxCount` | 相对 **`fileList`** 剩余槽位 | `number` | - | 满则本次 **`onChange` 不触发** |
| `maxSize` | 单文件字节上限 | `number` | - | 超限跳过 |
| `beforeUpload` | 过滤 | `(file: File) => boolean \| Promise<boolean>` | - | **`false`** 跳过 |
| `onRemove` | 列表移除回调 | `(file) => void` | - | 传入则渲染 **`button`** |
| `onChange` | 批次回调 | `(items, files: File[]) => void` | - | **本次选中** |
| `triggerText` | 触发区文案 | `ReactNode` | `'Choose file to upload'` | |
| `inputRef` | 指向 **`input`** | `Ref<HTMLInputElement>` | - | |
| `className` | 根 `div` | `string` | - | |
| 继承 | `Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>` | - | - | 其余 div 属性透传根 |

### 7.3 建议演进（可选）

| 能力 | 优先级 |
| --- | --- |
| **拖拽区 `onDrop`** | P2 |
| **`customRequest` / 内置 `action`** | P2 |
| **进度条、重试 UI** | P2 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| Ref | **`forwardRef<HTMLDivElement, UploadProps>`** → **外层 `div`** |
| 访问 **`input`** | **`inputRef`** → **`HTMLInputElement`** |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| 标签 | **`label htmlFor` + `sr-only` `input`**；**`focus-within` ring**。 |
| 键盘 | **`input` 可 Tab**；激活打开系统文件选择器（浏览器实现为准）。 |
| 列表 | **`ul`/`li`**；**`onRemove`** **`button`** + **`aria-label`**。 |
| 错误/约束 | **`accept` 被拒** 由浏览器处理；业务校验在 **`onChange`** 后提示。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 触发区 | 虚线边框、圆角、hover 浅底、暗色适配 |
| 列表 | **`bg-slate-100` / `dark:bg-slate-800`** 条 |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| 与 **`Form`** | **`FormItem` + `cloneElement`** 与 **`Upload` 的 `onChange(items, files)`** 仍 **不一致**；建议 **表单 state 手写** 或 **演进 `FormItem` 分支**。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| 选文件 | **`onChange`** **`items` + `File[]`**；**`beforeUpload`** / **`maxSize`** / **`maxCount`**。 |
| `fileList` | 父传入则渲染；**`onRemove`** **`button`**。 |
| `multiple` | 多文件映射数组长度（手测或补测）。 |
| `disabled` | 不可选文件（手测）。 |
| Ref | **`HTMLDivElement`** + **`inputRef`**。 |
| 无障碍 | **`label`/`for`**、**`sr-only` `input`**。 |

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | 受控 **`fileList`**、**`onChange` 合并列表**（若需累加）、**`accept`**。 |
| 诚实说明 | **无真实拖拽**、**无内置上传**、**回调无 `File`**、**`triggerText` 与能力对齐**。 |

---

## 14. 风险与开放问题

| 风险 | 缓解 |
| --- | --- |
| **无法拿到 `File` 上传** | 已由 **`onChange` 第二参 `File[]`** 缓解 |
| **`uid` 碰撞** | **`randomUUID`** + 后缀 |
| **同文件再次选择不触发 `change`** | **`input.value = ''`** 于 **`handleChange`** 开头后清空（取完 **`files`** 后） |
| **`FormItem` 不兼容** | 文档示例用手写 state |

---

## 15. 结论

`Upload` 为 **轻量文件选择 + 受控列表展示 + `File[]` 出口**：**`beforeUpload`/`maxCount`/`maxSize`**、**`onRemove`**、**键盘可达 `input`**；**无拖拽、无内置 HTTP、无 `customRequest`**。与 **Form** 深度集成仍可能需 **`FormItem` 分支**（`onChange` 签名与 **`Input`** 不同）。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | Upload 结论 |
| --- | --- |
| 职责 | 选文件、展示 fileList 元数据 |
| DOM/语义 | div + label + hidden file input + ul |
| 状态与交互 | 无内部列表 state；disabled |
| 数据与受控 | fileList 父控；onChange 映射本次 files |
| API | accept、multiple、disabled、maxCount、maxSize、fileList、onChange(items,files)、beforeUpload、onRemove、triggerText、inputRef |
| 类型与 Ref | `HTMLDivElement` + **`inputRef`** |
| 无障碍 | **sr-only input**、**focus-within**、移除 **button** |
| 样式与主题 | 虚线区 + 列表条 |
| 文档与验证 | 无 File、无拖拽、Form 适配 |

---

## 附录 B：参考实现片段（当前仓库）

文件：`packages/ui/src/components/form/controls/Upload/Upload.tsx`。

要点：**`handleChange` 过滤与 `input.value` 清空**、**`onChange(items, files)`**、**`sr-only` + `htmlFor`**、**`onRemove` 按钮**、**`inputRef`**。

（以仓库实际代码为准。）
