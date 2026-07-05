# Upload 上传

文件上传组件。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Upload onChange={(files) => console.log(files)} />
  )
}
`" />

## 键盘操作

触发区关联原生文件输入，支持通过 `Tab` 聚焦，并使用浏览器默认的文件选择快捷键打开文件选择器。

## API

| 属性        | 说明           | 类型               | 默认值                         |
| ----------- | -------------- | ------------------ | ------------------------------ |
| accept      | 接受的文件类型 | `string`           | -                              |
| multiple    | 是否多选       | `boolean`          | `false`                        |
| disabled    | 禁用上传       | `boolean`          | `false`                        |
| fileList    | 文件列表       | `UploadFileItem[]` | -                              |
| triggerText | 触发区内容     | `ReactNode`        | `Click or drag file to upload` |
| onChange    | 文件变化回调   | `(files) => void`  | -                              |
