# Breadcrumb 面包屑

面包屑导航。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Breadcrumb items={[
      { key: '1', label: '首页' },
      { key: '2', label: '组件库' },
      { key: '3', label: 'Breadcrumb' },
    ]} />
  )
}
`" />

## 可访问性

组件使用带有 `Breadcrumb` 名称的导航 landmark 和有序列表。最后一项默认表示当前页并设置 `aria-current="page"`，分隔符会从辅助技术中隐藏。

## API

| 属性      | 说明     | 类型               | 默认值 |
| --------- | -------- | ------------------ | ------ |
| items     | 面包屑项 | `BreadcrumbItem[]` | -      |
| separator | 分隔符   | `ReactNode`        | `'/'`  |

## BreadcrumbItem

| 属性    | 说明         | 类型         | 默认值            |
| ------- | ------------ | ------------ | ----------------- |
| key     | 唯一标识     | `string`     | -                 |
| label   | 面包屑内容   | `ReactNode`  | -                 |
| href    | 链接地址     | `string`     | -                 |
| onClick | 点击回调     | `() => void` | -                 |
| current | 标记为当前页 | `boolean`    | 最后一项为 `true` |
