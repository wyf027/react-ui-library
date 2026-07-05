# Menu 菜单

菜单导航组件。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Menu mode='horizontal' items={[
      { key: 'home', label: '首页' },
      { key: 'docs', label: '文档' },
      { key: 'about', label: '关于' },
    ]} />
  )
}
`" />

## API

| 属性        | 说明     | 类型                         | 默认值 |
| ----------- | -------- | ---------------------------- | ------ |
| items       | 菜单项   | `MenuItem[]`                 | -      |
| selectedKey | 选中 key | `string`                     | -      |
| mode        | 模式     | `'horizontal' \| 'vertical'` | -      |
| onChange    | 选中回调 | `(key: string) => void`      | -      |

## 可访问性

`Menu` 在垂直模式使用 `role="menu"`，在水平模式使用 `role="menubar"`，并通过 `aria-orientation` 描述方向。当前项会设置 `aria-current="page"` 且只有当前项位于 Tab 键顺序中。垂直模式下可用 <kbd>ArrowUp</kbd>/<kbd>ArrowDown</kbd> 切换可用项；水平模式下可用 <kbd>ArrowLeft</kbd>/<kbd>ArrowRight</kbd> 切换可用项；<kbd>Home</kbd> / <kbd>End</kbd> 会移动到第一个或最后一个可用项。
