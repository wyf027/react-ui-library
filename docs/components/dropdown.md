# Dropdown 下拉菜单

下拉菜单组件。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Dropdown
      trigger={<Button variant='outline'>下拉菜单</Button>}
      options={[
        { key: 'profile', label: '个人信息' },
        { key: 'settings', label: '设置' },
        { key: 'logout', label: '退出' },
      ]}
    />
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| trigger | 触发元素 | `ReactNode` | - |
| options | 选项列表 | `DropdownOption[]` | - |
| open | 是否显示 | `boolean` | - |
| defaultOpen | 默认显示 | `boolean` | - |
| onOpen | 打开回调 | `() => void` | - |
| onClose | 关闭回调 | `() => void` | - |
| onChange | 选中回调 | `(key: string) => void` | - |
