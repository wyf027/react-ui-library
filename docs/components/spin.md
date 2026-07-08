# Spin 加载动画

全局加载动画组件，对齐 Ant Design Spin，可包裹子元素。

## 示例

<LivePlayground :code="`
() => {
  return (
    <div className='flex flex-col gap-4'>
      <Spin tip='加载中...' delay={200} />
      <Spin spinning={true} delay={200}>
        <div className='rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'>
          被 Spin 包裹的内容区域
        </div>
      </Spin>
    </div>
  )
}
`" />

## 可访问性

Spin 在加载中时会渲染为 `role="status"` 的 polite live region。纯视觉旋转图形会从辅助技术中隐藏；当包裹子元素时，外层容器会根据 `spinning` 同步 `aria-busy`。当页面中存在多个加载状态时，建议通过 `tip`、`aria-label` 或 `aria-labelledby` 提供可区分名称。

当设置 `delay` 时，Spin 会延迟显示视觉 spinner 和 `status` live region；如果 `spinning` 在延迟结束前变为 `false`，则不会显示 spinner。包裹子元素时，`aria-busy` 仍会立即反映真实加载状态。

## API

| 属性            | 说明                     | 类型                               | 默认值                   |
| --------------- | ------------------------ | ---------------------------------- | ------------------------ |
| spinning        | 是否加载中               | `boolean`                          | `true`                   |
| size            | 尺寸                     | `'sm' \| 'md' \| 'lg'`             | `'md'`                   |
| tip             | 提示文字                 | `ReactNode`                        | -                        |
| delay           | 延迟显示加载状态的毫秒数 | `number`                           | `0`                      |
| aria-label      | 加载状态可访问名称       | `string`                           | `tip` 文本或 `'Loading'` |
| aria-labelledby | 使用外部标签命名加载状态 | `string`                           | -                        |
| aria-live       | 加载状态通知优先级       | `'off' \| 'polite' \| 'assertive'` | `'polite'`               |
