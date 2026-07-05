# Skeleton 骨架屏

加载占位组件，对齐 Ant Design Skeleton。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Space direction='vertical' size={12}>
      <Skeleton />
      <Skeleton avatar />
      <Skeleton title paragraph={{ rows: 2 }} />
    </Space>
  )
}
`" />

## 可访问性

Skeleton 加载态默认渲染为 `role="status"` 的 polite live region，并通过 `aria-busy="true"` 标记内容仍在加载。视觉占位块会从辅助技术中隐藏；当页面中存在多个骨架屏时，建议通过 `aria-label` 或 `aria-labelledby` 提供可区分名称。

## API

| 属性            | 说明                                    | 类型                               | 默认值              |
| --------------- | --------------------------------------- | ---------------------------------- | ------------------- |
| active          | 是否展示动画                            | `boolean`                          | `true`              |
| avatar          | 显示头像占位                            | `boolean`                          | `false`             |
| title           | 显示标题占位                            | `boolean`                          | `true`              |
| paragraph       | 显示段落占位                            | `boolean \| { rows?: number }`     | `true`              |
| loading         | 为 true 时显示骨架屏，否则显示 children | `boolean`                          | `true`              |
| aria-label      | 骨架屏加载状态可访问名称                | `string`                           | `'Loading content'` |
| aria-labelledby | 使用外部标签命名骨架屏加载状态          | `string`                           | -                   |
| aria-live       | 加载状态通知优先级                      | `'off' \| 'polite' \| 'assertive'` | `'polite'`          |
