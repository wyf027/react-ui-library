# Progress 进度条

进度展示组件。

## 示例

<LivePlayground :code="`
() => {
  return (
    <div className='flex flex-col gap-3'>
      <Progress percent={30} />
      <Progress percent={70} status='success' format={(value) => value === 100 ? '完成' : value + '%'} />
      <Progress percent={50} status='exception' format={(value) => value + ' tasks'} aria-valuetext='50 tasks completed' />
    </div>
  )
}
`" />

## 可访问性

Progress 默认渲染为 `role="progressbar"`，并根据 `percent` 同步 `aria-valuemin`、`aria-valuemax`、`aria-valuenow` 和 `aria-valuetext`。当页面中有多个进度条时，建议通过 `aria-label` 或 `aria-labelledby` 提供可区分名称。

`format` 会自定义可见进度文本；当 `format` 返回字符串或数字时，该内容也会作为默认 `aria-valuetext`。如果格式化结果是复杂节点，或需要让屏幕阅读器读取更完整的上下文，请显式传入 `aria-valuetext`。

## API

| 属性            | 说明                           | 类型                                   | 默认值        |
| --------------- | ------------------------------ | -------------------------------------- | ------------- |
| percent         | 百分比                         | `number`                               | -             |
| status          | 状态                           | `'normal' \| 'success' \| 'exception'` | `'normal'`    |
| showInfo        | 显示百分比文字                 | `boolean`                              | `true`        |
| format          | 自定义进度文本                 | `(percent: number) => ReactNode`       | -             |
| aria-label      | 进度条可访问名称               | `string`                               | `'Progress'`  |
| aria-labelledby | 使用外部标签命名进度条         | `string`                               | -             |
| aria-valuetext  | 自定义屏幕阅读器读取的进度文本 | `string`                               | `${percent}%` |
