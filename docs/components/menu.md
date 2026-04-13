# Menu 菜单

菜单导航组件。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Menu mode='horizontal' items={[
      { key: 'home', label: '首页' },
      { key: 'docs', label: '文档' },
      { key: 'about', label: '关于' },
    ]} />
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 菜单项 | `MenuItem[]` | - |
| selectedKey | 选中 key | `string` | - |
| mode | 模式 | `'horizontal' \| 'vertical'` | - |
| onChange | 选中回调 | `(key: string) => void` | - |
