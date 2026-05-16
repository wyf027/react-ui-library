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

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 面包屑项 | `BreadcrumbItem[]` | - |
| separator | 分隔符 | `string` | `'/'` |
