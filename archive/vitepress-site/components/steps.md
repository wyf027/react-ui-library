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

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 步骤项 | `StepItem[]` | - |
| current | 当前步骤 | `number` | `0` |
