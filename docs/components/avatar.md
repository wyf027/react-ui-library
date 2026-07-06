# Avatar 头像

用户头像组件。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Space>
      <Avatar name='Alice' />
      <Avatar name='Bob' size={48} />
      <Avatar src='https://i.pravatar.cc/40' alt='Demo user' />
    </Space>
  )
}
`" />

## 可访问性

- 图片头像使用 `alt` 作为替代文本；未传 `alt` 时会回退到 `name`。
- 首字母 fallback 会在存在 `name` 或 `alt` 时暴露为 `role="img"`，并使用对应文本作为可访问名称。
- 未提供 `name` 和 `alt` 的匿名 fallback 保持装饰语义。

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 名称（显示首字母） | `string` | - |
| src | 图片地址 | `string` | - |
| alt | 图片或 fallback 的替代文本 | `string` | - |
| size | 尺寸（像素） | `number` | `36` |