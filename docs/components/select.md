# Select 选择器

下拉选择组件。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Space direction='vertical' size={8}>
      <Select
        label='角色'
        options={[
          { label: 'Admin', value: 'admin' },
          { label: 'Editor', value: 'editor' },
          { label: 'Viewer', value: 'viewer' },
        ]}
      />
    </Space>
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options | 选项列表 | `{ label: string; value: string }[]` | - |
| value | 当前值 | `string` | - |
| defaultValue | 默认值 | `string` | - |
| onChange | 值变化回调 | `(value: string) => void` | - |
| label | 标签 | `string` | - |
| placeholder | 占位文本 | `string` | - |
