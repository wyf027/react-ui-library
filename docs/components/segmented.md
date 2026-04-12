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

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options | 选项列表 | `SegmentedOption[]` | - |
| value | 当前值 | `string` | - |
| defaultValue | 默认值 | `string` | - |
| onChange | 变化回调 | `(value: string) => void` | - |
