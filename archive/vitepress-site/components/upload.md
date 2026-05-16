# Upload 上传

基于原生 **`input[type=file]`** 的文件选择器，配合可选的 **`fileList`** 展示与 **`onRemove`** 列表操作。适合「父组件持有列表并发上传」；**不涉及内置 HTTP 上传、`customRequest`、拖拽投递、进度条**（见下文与 SPEC 边界）。

## 示例

<LivePlayground :code="`
() => {
  const [items, setItems] = React.useState([])
  return (
    <Upload
      accept='image/*'
      multiple
      maxCount={5}
      maxSize={1024 * 1024}
      fileList={items}
      beforeUpload={(file) => file.type.startsWith('image/')}
      onChange={(next, files) => {
        console.log('selected files for upload', files)
        setItems((prev) => [...prev, ...next])
      }}
      onRemove={(f) => setItems((prev) => prev.filter((x) => x.uid !== f.uid))}
      triggerText='选择图片（示例）'
    />
  )
}
`" />

## API

### UploadProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| accept | 传给原生 `input` | `string` | - |
| multiple | 是否多选 | `boolean` | - |
| disabled | 禁用选择 | `boolean` | - |
| maxCount | **当前 `fileList` 长度 + 本次选中** 不得超过该值；超出部分不会触发 `onChange` | `number` | - |
| maxSize | 单文件最大字节；超限文件静默跳过 | `number` | - |
| fileList | 展示用列表（受控） | `UploadFileItem[]` | `[]` |
| onChange | **每次**文件选择且至少保留一个文件时调用；参数为 **本次新增** 的 `UploadFileItem[]` 与同序的 **`File[]`**（用于 `fetch`/`xhr`） | `(items, files) => void` | - |
| onRemove | 若传入，每项右侧渲染可聚焦的 **Remove** | `(file: UploadFileItem) => void` | - |
| beforeUpload | 返回 `false`（或 reject 意义的 async `false`）则跳过该文件 | `(file: File) => boolean \| Promise<boolean>` | - |
| triggerText | 触发区域文案 | `ReactNode` | `'Choose file to upload'` |
| inputRef | 指向原生文件 `input`（便于自动化或聚焦） | `Ref<HTMLInputElement>` | - |
| className | 根容器 `div` | `string` | - |

其余合法的 `HTMLAttributes<HTMLDivElement>` 透传到根 **`div`**（根 **`ref`** 亦落在 **`div`**）。

### UploadFileItem

| 字段 | 说明 |
| --- | --- |
| uid | 唯一 id（内部随每次选中生成） |
| name | 文件名 |
| size | 字节（可选） |

### 受控用法

- **`onChange` 只传达本次选中的批次**；要让列表更新，请在回调里 **`setFileList((prev) => [...prev, ...items])`**（或按业务替换）。
- **`File[]`** 与 **`items`** 一一对应，可直接用于上传；上传成功后是否从列表移除由业务决定。
- 选择同一路径文件再次打开对话框：组件在每次 `change` 后会 **清空 `input.value`**，便于重复触发。

### 无障碍

- 文件控件使用 **`sr-only`** 保留在 Tab 顺序内，外轮廓通过 **`label` + `focus-within:ring`** 可见。
- **`label`** 使用 **`htmlFor`** 与 **`input` id** 关联。
- 列表为 **`ul`/`li`**；移除为 **`button`**，带 **`aria-label`**。

### 与 COMPONENT_SPECS §3.10 的边界

当前 **未实现**：真实 **拖拽（drag/drop）**、**`customRequest`**、内置 **上传进度 / 重试 UI**、**`listType`** 卡片密度假名 API。若需要拖拽或统一上传管线，在业务层封装或在后续迭代扩展本组件。
