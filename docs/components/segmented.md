# Segmented 分段控制器

分段控制器组件。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Segmented
      options={[
        { label: '日', value: 'day' },
        { label: '周', value: 'week' },
        { label: '月', value: 'month' },
      ]}
      defaultValue='day'
    />
  )
}
`" />

## 键盘操作

组件按单选组语义暴露给辅助技术。聚焦选项后，可使用方向键切换选项，`Home` 跳到第一个可用选项，`End` 跳到最后一个可用选项。

## API

| 属性         | 说明               | 类型                      | 默认值  |
| ------------ | ------------------ | ------------------------- | ------- |
| options      | 选项列表           | `SegmentedOption[]`       | -       |
| value        | 当前值             | `string`                  | -       |
| defaultValue | 默认值             | `string`                  | -       |
| disabled     | 禁用整个分段控制器 | `boolean`                 | `false` |
| onChange     | 变化回调           | `(value: string) => void` | -       |

## SegmentedOption

| 属性     | 说明     | 类型        | 默认值  |
| -------- | -------- | ----------- | ------- |
| label    | 选项内容 | `ReactNode` | -       |
| value    | 选项值   | `string`    | -       |
| disabled | 禁用选项 | `boolean`   | `false` |
