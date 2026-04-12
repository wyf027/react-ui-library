# Transfer 穿梭框

双栏穿梭选择框。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Transfer
      dataSource={[
        { key: '1', title: '选项 A' },
        { key: '2', title: '选项 B' },
        { key: '3', title: '选项 C' },
      ]}
    />
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dataSource | 数据源 | `TransferItem[]` | - |
| targetKeys | 右侧已选 key 列表 | `string[]` | - |
| defaultTargetKeys | 默认已选 key 列表 | `string[]` | - |
| onChange | 变化回调 | `(targetKeys) => void` | - |
