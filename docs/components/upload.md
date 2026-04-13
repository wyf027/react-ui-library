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

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| accept | 接受的文件类型 | `string` | - |
| multiple | 是否多选 | `boolean` | `false` |
| fileList | 文件列表 | `UploadFileItem[]` | - |
| onChange | 文件变化回调 | `(files) => void` | - |
