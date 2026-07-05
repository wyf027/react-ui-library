# Steps 步骤条

引导用户按照流程完成任务的步骤条。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Steps items={[
      { key: '1', title: '创建' },
      { key: '2', title: '审核' },
      { key: '3', title: '完成' },
    ]} current={1} />
  )
}
`" />

## 可访问性

组件渲染为有序列表，默认使用 `Steps` 作为列表名称。当前步骤会设置 `aria-current="step"`，完成、当前和待处理状态会提供给屏幕阅读器。

## API

| 属性    | 说明     | 类型         | 默认值 |
| ------- | -------- | ------------ | ------ |
| items   | 步骤项   | `StepItem[]` | -      |
| current | 当前步骤 | `number`     | `0`    |

## StepItem

| 属性        | 说明         | 类型        | 默认值 |
| ----------- | ------------ | ----------- | ------ |
| key         | 步骤唯一标识 | `string`    | -      |
| title       | 步骤标题     | `ReactNode` | -      |
| description | 步骤描述     | `ReactNode` | -      |
