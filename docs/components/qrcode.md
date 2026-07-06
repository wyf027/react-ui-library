# QRCode 二维码

二维码组件。

## 示例

<LivePlayground :code="`
() => {
  return (
    <QRCode value='https://leno23.github.io/react-ui-library/' aria-label='Scan to open Nova UI docs' />
  )
}
`" />

## 可访问性

- 根节点默认暴露为 `role="img"`，默认名称为 `QR code`。
- 推荐通过 `aria-label` 或 `aria-labelledby` 提供页面内唯一、面向业务的二维码说明。
- 内部用于绘制的网格单元会被标记为 `aria-hidden="true"`，避免辅助技术逐个读取装饰节点。

## API

| 属性  | 说明     | 类型     | 默认值 |
| ----- | -------- | -------- | ------ |
| value | 编码内容 | `string` | -      |
| size  | 尺寸     | `number` | `128`  |