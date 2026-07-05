# Pagination 分页

分页组件。

## 示例

<LivePlayground :code="`
() => {
  return (
    <div className='flex flex-col gap-4'>
      <Pagination total={100} />
      <Pagination defaultCurrent={3} total={100} />
    </div>
  )
}
`" />

## 可访问性

- 根节点渲染为带有 `aria-label="Pagination"` 的导航区域，可通过 `aria-label` 覆盖为页面内唯一名称。
- 当前页按钮带有 `aria-current="page"`，页码按钮提供“跳转到第几页”的可访问名称。
- `defaultCurrent` 用于非受控分页的初始页；传入 `current` 时组件进入受控模式，由调用方负责更新页码。

## API

| 属性           | 说明         | 类型                     | 默认值 |
| -------------- | ------------ | ------------------------ | ------ |
| current        | 当前页       | `number`                 | -      |
| defaultCurrent | 默认页       | `number`                 | `1`    |
| total          | 总数         | `number`                 | -      |
| pageSize       | 每页条数     | `number`                 | `10`   |
| onChange       | 页码变化回调 | `(page: number) => void` | -      |
