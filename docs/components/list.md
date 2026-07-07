# List 列表

通用列表组件，对齐 Ant Design List。

## 示例

<LivePlayground :code="`
() => {
  return (
    <div className='space-y-4'>
      <List
        header='用户列表'
        dataSource={[
          { key: '1', title: 'Alice', description: '管理员' },
          { key: '2', title: 'Bob', description: '编辑者' },
          { key: '3', title: 'Charlie', description: '访客' },
        ]}
        footer='共 3 人'
      />
      <List header='加载中' loading aria-label='用户列表加载状态' />
    </div>
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dataSource | 数据源 | `ListItem[]` | `[]` |
| header | 头部 | `ReactNode` | - |
| footer | 底部 | `ReactNode` | - |
| bordered | 是否有边框 | `boolean` | `true` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| loading | 加载中 | `boolean` | `false` |
| renderItem | 自定义渲染 | `(item, index) => ReactNode` | - |
| grid | 网格配置 | `{ cols?: number; gap?: number }` | - |

## 可访问性

- `loading` 开启时，根节点会设置 `aria-busy="true"`，加载文案会以 `role="status"` 和 `aria-live="polite"` 暴露，便于辅助技术感知列表内容正在更新。
- 加载中不会渲染 `dataSource` 条目，避免用户在过期内容和加载状态之间产生混淆。
- 可通过 `aria-label` 为外层列表容器提供页面内唯一名称，尤其适用于同页存在多个列表的场景。
