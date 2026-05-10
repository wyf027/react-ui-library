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

1. **文件选择**：隐藏 **`input type="file"`**，外显 **`label`** 触发区（虚线框 + **`triggerText`**）。  
2. **受控列表展示**：**`fileList: UploadFileItem[]`** 渲染 **`<ul><li>`** 文件名列表。  
3. **变更回调**：选择文件后 **`onChange(files: UploadFileItem[])`**，其中 **`files`** 由本次 **`input.files`** 映射而来（**`uid`/`name`/`size`**）。  
4. **可选约束**：**`accept`**、**`multiple`**、**`disabled`** 透传 **`input`**。  
5. **类型导出**：**`UploadFileItem`** 作为稳定展示/提交结构（与仓库「Upload 对象不进业务态」治理方向一致：此处为 **元数据项**，非浏览器 **`File`** 本体）。

### 2.2 非目标

1. **真实拖拽上传（dragover/drop）**：文案含「drag」为 **营销式占位**，当前 **无 drop 事件**；拖拽行为依赖浏览器对 `label` 聚焦文件选择的行为差异，**不可靠**。  
2. **内置上传请求**：无 **`action`/`customRequest`/`beforeUpload`**。  
3. **分片、进度条、重试 UI**：未实现。  
4. **内部合并 `fileList`**：**`onChange` 后不会自动把新文件追加进内部 state**；**`fileList` 完全由父级驱动**（见 §6）。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 选文件后交父级上传 | **`onChange`** 内取 **`File`** 需 **`input` ref` 或 `DataTransfer`**——当前 **未暴露 `input` ref**；父级通常另存 **`FileList`** 或从 **`event` 拿不到**（回调只有 **`UploadFileItem[]`**），**需在演进中暴露 `onChange` 带 `File[]` 或 ref**（见 §14）。 |
| 仅记录已选文件名 | **`fileList` + `onChange`** 更新父 state 即可。 |
| 表单字段 | 与 **`FormItem`** 组合时，**`value` 注入的是子元素**；本组件 **`ref` 在 `div`**，**非典型 `cloneElement` 单 input 形态**，需 **`FormItem` 包一层适配** 或 **不用 `FormItem` 注入** 而手写 **`values`**。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 根 | **`<div ref={ref} className="space-y-2">`** |
| 触发区 | **`<label className="... border-dashed ...">`** 包裹 **隐藏 `input[type=file]`** + **`triggerText`**（隐式 label 关联，**无需 `htmlFor`**） |
| 列表 | **`fileList.length > 0`** 时 **`<ul>`**，项 **`<li key={file.uid}>`** 展示 **`file.name`** |
| `input` | **`className="hidden"`**，无独立 **`id`**（演进可加 **`useId`**） |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| 内部 state | **无**；**`fileList` 仅展示 props** |
| `handleChange` | 从 **`event.target.files`** 映射 **`UploadFileItem[]`**，调用 **`onChange?.(files)`**；**不**清空 **`input.value`**（重复选同文件可能不触发 `change`，见 §14） |
| `disabled` | **`input` + `label` 样式**（`cursor-not-allowed opacity-60`） |

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| 列表数据源 | **`fileList` 必须由父组件在 `onChange` 后更新** 才会出现在 UI；否则仅触发回调、列表不变。 |
| 映射规则 | **`uid: \`${file.name}-${file.lastModified}\``**，**`name`**，**`size`** |
| 与 **`File`** | 回调 **不含** **`File` 对象**；若需上传 **`originFileObj`**，须演进 **`onChange(files, rawFiles)`** 或 **`input` ref**。 |

---

## 7. API 规范

### 7.1 `UploadFileItem`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `uid` | `string` | 当前由 **`name-lastModified`** 生成 |
| `name` | `string` | 文件名 |
| `size` | `number`（可选） | 字节 |

### 7.2 `UploadProps`

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `accept` | 可选文件类型 | `string` | - | 透传 **`input`** |
| `multiple` | 多选 | `boolean` | - | 透传 **`input`** |
| `disabled` | 禁用 | `boolean` | - | |
| `fileList` | 已选/已展示列表 | `UploadFileItem[]` | `[]` | **展示用** |
| `onChange` | 选择后回调 | `(files: UploadFileItem[]) => void` | - | **每次为本次选择映射结果** |
| `triggerText` | 触发区文案 | `ReactNode` | `'Click or drag file to upload'` | 与真实能力不一致见 §2.2 |
| `className` | 根 `div` | `string` | - | |
| 继承 | `Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>` | - | - | 其余 div 属性透传根 |

### 7.3 建议演进（可选）

| 能力 | 优先级 |
| --- | --- |
| **`onChange(files, fileList: File[])`** 或 **`beforeUpload`** | P1 |
| **`inputRef` / 合并 ref** | P1 |
| **拖拽区 `onDrop`** | P2 |
| **清空 `input.value` 以支持重复选择** | P2 |
| **列表项删除按钮** | P2 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| Ref | **`forwardRef<HTMLDivElement, UploadProps>`** → **外层 `div`**，**不**指向 **`input`** |
| 访问文件 | 当前 **无法通过 ref 取 `HTMLInputElement`**；需演进 |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| 标签 | **`label` 包裹 `input`**，点击触发区可打开文件选择器。 |
| 键盘 | 焦点需能落在 **`label`/`input`** 上；**`input` hidden** 时各浏览器焦点策略不同，**需实测**。 |
| 列表 | **`ul`/`li`** 有利于读屏列举文件名。 |
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
| 与 **`Form`** | **`FormItem` + `cloneElement`** 假设子组件接受 **`value`/`onChange`**；**`Upload` 的 `onChange` 签名是文件数组**，与 **`Input` 字符串** 不一致，**不能无适配直接 clone**；建议 **表单 state 手写** 或 **演进 `FormItem` 分支**。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| 选文件 | **`onChange`** 收到正确 **`name`/`size`**。 |
| `fileList` | 父传入两项则渲染两项。 |
| `multiple` | 多文件映射数组长度。 |
| `disabled` | 不可选文件。 |
| Ref | **`HTMLDivElement`**。 |

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
| **无法拿到 `File` 上传** | **P1 演进回调或 ref** |
| **`uid` 碰撞** | 用 **`crypto.randomUUID()`** 或自增 id |
| **同文件再次选择不触发 `change`** | **`input.value = ''`** 于 `handleChange` 末尾 |
| **`FormItem` 不兼容** | 文档示例用手写 state |

---

## 15. 结论

`Upload` 当前为 **轻量文件选择 + 受控列表展示**：**适合「选完即把元数据交给父级」**；**不适合「开箱即上传」**（缺 **`File` 出口、拖拽、进度**）。与 **Button** 无 API 继承关系；**与 Form 深度集成前需补齐 `onChange`/`ref` 契约**。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | Upload 结论 |
| --- | --- |
| 职责 | 选文件、展示 fileList 元数据 |
| DOM/语义 | div + label + hidden file input + ul |
| 状态与交互 | 无内部列表 state；disabled |
| 数据与受控 | fileList 父控；onChange 映射本次 files |
| API | accept、multiple、disabled、fileList、onChange、triggerText |
| 类型与 Ref | HTMLDivElement |
| 无障碍 | label 包裹；hidden input 焦点策略 |
| 样式与主题 | 虚线区 + 列表条 |
| 文档与验证 | 无 File、无拖拽、Form 适配 |

---

## 附录 B：参考实现片段（当前仓库）

文件：`packages/ui/src/components/form/controls/Upload/Upload.tsx`。

要点：**`handleChange` 映射**、**`fileList.map`**、**`ref` → 根 div**。

（以仓库实际代码为准。）
