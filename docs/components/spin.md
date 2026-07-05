# Spin 加载动画

全局加载动画组件，对齐 Ant Design Spin，可包裹子元素。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Space direction='vertical' size={12}>
      <Spin tip='加载中...' />
      <Spin spinning={true}>
        <Card title='卡片标题'>被 Spin 包裹的内容区域</Card>
      </Spin>
    </Space>
  )
}
`" />

## 可访问性

Spin 在加载中时会渲染为 `role="status"` 的 polite live region。纯视觉旋转图形会从辅助技术中隐藏；当包裹子元素时，外层容器会根据 `spinning` 同步 `aria-busy`。当页面中存在多个加载状态时，建议通过 `tip`、`aria-label` 或 `aria-labelledby` 提供可区分名称。

## API

| 属性            | 说明                     | 类型                               | 默认值                   |
| --------------- | ------------------------ | ---------------------------------- | ------------------------ |
| spinning        | 是否加载中               | `boolean`                          | `true`                   |
| size            | 尺寸                     | `'sm' \| 'md' \| 'lg'`             | `'md'`                   |
| tip             | 提示文字                 | `ReactNode`                        | -                        |
| aria-label      | 加载状态可访问名称       | `string`                           | `tip` 文本或 `'Loading'` |
| aria-labelledby | 使用外部标签命名加载状态 | `string`                           | -                        |
| aria-live       | 加载状态通知优先级       | `'off' \| 'polite' \| 'assertive'` | `'polite'`               |
