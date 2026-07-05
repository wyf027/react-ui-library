# Result 结果

结果状态页组件。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Result status='success' title='操作成功' subTitle='一切正常。' />
  )
}
`" />

## API

| 属性           | 说明                           | 类型                                          | 默认值 |
| -------------- | ------------------------------ | --------------------------------------------- | ------ |
| status         | 状态                           | `'success' \| 'error' \| 'info' \| 'warning'` | -      |
| title          | 标题                           | `ReactNode`                                   | -      |
| subTitle       | 副标题                         | `ReactNode`                                   | -      |
| extra          | 操作区                         | `ReactNode`                                   | -      |
| iconAriaHidden | 是否从无障碍树隐藏内置状态图标 | `boolean`                                     | `true` |

## 可访问性

`Result` 默认使用标题与副标题传达状态含义，并将内置 emoji 状态图标标记为装饰性内容，避免屏幕阅读器重复朗读符号。若业务需要让图标本身参与语义表达，可设置 `iconAriaHidden={false}` 并确保周围文案仍能清晰说明结果状态。
