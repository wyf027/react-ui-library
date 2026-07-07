# BackTop 回到顶部

返回页面顶部的按钮。

## 示例

<LivePlayground :code="`
() => {
  return (
    <div className='relative min-h-24 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900'>
      <Text>滚动超过阈值后显示回到顶部按钮。</Text>
      <BackTop visibilityHeight={0} aria-label='回到页面顶部'>顶部</BackTop>
    </div>
  )
}
`" />

## 可访问性

`BackTop` 默认渲染为带有 `aria-label="Back to top"` 的按钮，避免辅助技术读取装饰性箭头符号。可以通过 `aria-label` 提供本地化或更贴合业务语境的按钮名称。

点击按钮时组件会先调用传入的 `onClick`，如果事件未被 `preventDefault()` 阻止，再执行平滑滚动到页面顶部。

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visibilityHeight | 滚动高度达到此参数值才出现 | `number` | `200` |
| children | 自定义按钮内容 | `ReactNode` | `'↑ Top'` |
| aria-label | 按钮可访问名称 | `string` | `'Back to top'` |
| onClick | 点击回调；可通过 `event.preventDefault()` 阻止默认滚动 | `(event: MouseEvent<HTMLButtonElement>) => void` | - |
