# Badge 徽标

徽标数组件，常用行为对齐 Ant Design `Badge`。`status` 默认背景 class 由 `packages/ui/src/theme/componentTokens.ts` 中的 `badgeStatusBgClass` 维护。

## 示例

<LivePlayground :code="`
() => {
  return (
    <div className='flex flex-wrap items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900'>
      <Badge count={5} badgeLabel='5 条未读消息'><Avatar name='U' /></Badge>
      <Badge dot badgeLabel='有新的状态更新'><Avatar name='V' /></Badge>
      <Badge count={99} badgeLabel='99 条通知'><Avatar name='W' /></Badge>
    </div>
  )
}
`" />

### 封顶与状态色

<LivePlayground :code="`
() => {
  return (
    <div className='flex flex-wrap items-center gap-6 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900'>
      <Badge count={120} overflowCount={99} badgeLabel='99 条以上未读消息'><Avatar name='A' /></Badge>
      <Badge count={0} showZero badgeLabel='0 条待处理事项'><Avatar name='B' /></Badge>
      <Badge dot status='success' badgeLabel='在线'><Avatar name='C' /></Badge>
      <Badge count='new' badgeLabel='新内容'><Avatar name='D' /></Badge>
    </div>
  )
}
`" />

## 可访问性

`Badge` 的数字和圆点本身只是视觉提示，建议用 `badgeLabel` 为业务语境补充可访问名称，例如“5 条未读消息”或“在线”。当 `dot` 没有提供 `badgeLabel` 时，圆点会被标记为装饰性内容，避免辅助技术读出没有语义的空状态。

## API

| 属性          | 说明                                                                    | 类型                                                             | 默认值  |
| ------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------- | ------- |
| count         | 展示内容；数字会参与 `overflowCount` 截断，字符串或自定义节点会直接渲染 | `ReactNode`                                                      | `0`     |
| dot           | 显示小圆点                                                              | `boolean`                                                        | `false` |
| overflowCount | 超过后显示为 `${overflowCount}+`                                        | `number`                                                         | `99`    |
| showZero      | `count` 为 0 时是否展示                                                 | `boolean`                                                        | `false` |
| status        | 状态色（作用于圆点或数字徽标背景）                                      | `'default' \| 'success' \| 'processing' \| 'error' \| 'warning'` | -       |
| offset        | 相对默认位置的偏移 `[x, y]`（px）                                       | `[number, number]`                                               | -       |
| color         | 自定义背景色                                                            | `string`                                                         | -       |
| badgeLabel    | 徽标可访问名称，用于说明数字或圆点的业务含义                            | `string`                                                         | -       |
