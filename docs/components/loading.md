# Loading 加载中

加载状态指示器。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Space>
      <Loading size='sm' text='加载中...' />
      <Loading size='md' />
      <Loading size='lg' text='请稍候' />
    </Space>
  )
}
`" />

## 可访问性

Loading 默认渲染为 `role="status"` 的 polite live region，并将纯视觉旋转图形从辅助技术中隐藏。需要区分多个加载状态时，可通过 `aria-label` 或 `aria-labelledby` 提供可访问名称；需要更高通知优先级时，可调整 `aria-live`。

## API

| 属性            | 说明                     | 类型                               | 默认值         |
| --------------- | ------------------------ | ---------------------------------- | -------------- |
| text            | 加载文本                 | `string`                           | `'Loading...'` |
| size            | 尺寸                     | `'sm' \| 'md' \| 'lg'`             | `'md'`         |
| aria-label      | 加载状态可访问名称       | `string`                           | -              |
| aria-labelledby | 使用外部标签命名加载状态 | `string`                           | -              |
| aria-live       | 加载状态通知优先级       | `'off' \| 'polite' \| 'assertive'` | `'polite'`     |
