---
title: Upload 上传
---

# Upload 上传

文件选择与列表展示；`onChange` 每次返回**本次选择**映射后的条目与原始 `File[]`，由调用方合并进 `fileList`。

## 示例

<code src="./demos/upload-basic.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| accept | `input` accept | `string` | - |
| multiple | 多选 | `boolean` | - |
| disabled | 禁用 | `boolean` | - |
| maxCount | 列表最大条数（超出不再追加） | `number` | - |
| maxSize | 单文件最大字节（超限跳过） | `number` | - |
| fileList | 当前列表 | `UploadFileItem[]` | `[]` |
| onChange | 本次选择成功后的条目与文件 | `(items: UploadFileItem[], files: File[]) => void` | - |
| onRemove | 移除某项 | `(file: UploadFileItem) => void` | - |
| beforeUpload | 返回 `false` 跳过该文件；支持异步 | `(file: File) => boolean \| Promise<boolean>` | - |
| triggerText | 触发器文案 | `ReactNode` | `'Choose file to upload'` |
| inputRef | 原生 file input 的 ref | `Ref<HTMLInputElement>` | - |

`UploadFileItem`：`{ uid: string; name: string; size?: number }`。

其余属性继承外层容器 `div`（`className` 等）。
