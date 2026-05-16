# Cascader 级联选择

级联选择框。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Cascader
      options={[
        { value: 'zj', label: '浙江', children: [{ value: 'hz', label: '杭州' }] },
        { value: 'js', label: '江苏', children: [{ value: 'nj', label: '南京' }] },
      ]}
    />
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options | 级联数据 | `CascaderOption[]` | - |
| value | 当前值 | `string[]` | - |
| defaultValue | 默认值 | `string[]` | - |
| onChange | 变化回调 | `(value) => void` | - |
