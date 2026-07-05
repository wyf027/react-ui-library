# Tabs 标签页

选项卡切换组件。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Tabs items={[
      { key: 'tab1', label: '标签 1', content: '内容 1' },
      { key: 'tab2', label: '标签 2', content: '内容 2' },
      { key: 'tab3', label: '标签 3', content: '内容 3' },
    ]} />
  )
}
`" />

## API

| 属性             | 说明     | 类型                    | 默认值 |
| ---------------- | -------- | ----------------------- | ------ |
| items            | 标签项   | `TabItem[]`             | -      |
| activeKey        | 当前激活 | `string`                | -      |
| defaultActiveKey | 默认激活 | `string`                | -      |
| onChange         | 切换回调 | `(key: string) => void` | -      |

## 可访问性

`Tabs` 使用 `tablist`、`tab` 和 `tabpanel` 语义，并通过 `aria-controls` 与 `aria-labelledby` 关联标签和内容面板。只有当前激活标签位于 Tab 键顺序中；焦点在标签上时，按 <kbd>ArrowLeft</kbd>/<kbd>ArrowUp</kbd> 或 <kbd>ArrowRight</kbd>/<kbd>ArrowDown</kbd> 可切换到上一个或下一个可用标签，按 <kbd>Home</kbd> / <kbd>End</kbd> 可切换到第一个或最后一个可用标签。
