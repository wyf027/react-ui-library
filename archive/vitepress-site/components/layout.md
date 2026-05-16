# Layout 页面骨架

用于搭建中后台常见的**顶栏 + 侧栏 + 内容区**结构，与 [Container](./container.md) 互补：`Layout*` 负责**区域与折叠**，`Container` 负责**版心与内边距**。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Layout>
      <LayoutHeader>
        <span className='text-sm font-medium text-slate-800 dark:text-slate-100'>顶栏</span>
      </LayoutHeader>
      <Layout direction='horizontal'>
        <LayoutSider width={200} collapsible defaultCollapsed={false}>
          <div className='text-xs text-slate-600 dark:text-slate-300'>侧栏菜单占位</div>
        </LayoutSider>
        <LayoutContent>
          <div
            style={{
              background: 'var(--vp-c-bg-alt)',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid var(--vp-c-divider)',
            }}
          >
            主内容区（默认渲染为 main）
          </div>
        </LayoutContent>
      </Layout>
    </Layout>
  )
}
`" />

### 与 Container 组合

<LivePlayground :code="`
() => {
  return (
    <Layout>
      <LayoutHeader>
        <span className='text-sm font-medium'>顶栏</span>
      </LayoutHeader>
      <Layout direction='horizontal'>
        <LayoutSider width={180}>侧栏</LayoutSider>
        <LayoutContent className='p-0'>
          <Container maxWidth='xl' padding='md' verticalPadding='md'>
            <div
              style={{
                background: 'var(--vp-c-bg-soft)',
                padding: '12px',
                borderRadius: '8px',
              }}
            >
              版心在内容区内居中
            </div>
          </Container>
        </LayoutContent>
      </Layout>
    </Layout>
  )
}
`" />

## API

除下表外，各组件还支持对应原生 HTML 属性（如 `id`、`style`、`role`、`aria-*` 等）。

### Layout

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| direction | `vertical` 为整页纵向壳；`horizontal` 为侧栏+内容一行 | `'vertical' \| 'horizontal'` | `'vertical'` |
| className | 自定义类名 | `string` | - |

### LayoutHeader

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| component | 根元素类型 | `React.ElementType` | `'header'` |
| className | 自定义类名 | `string` | - |

### LayoutSider

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| component | 根元素类型 | `React.ElementType` | `'aside'` |
| width | 展开宽度（px） | `number` | `220` |
| collapsedWidth | 折叠宽度（px） | `number` | `64` |
| collapsible | 是否展示折叠按钮 | `boolean` | `false` |
| collapsed | 受控折叠 | `boolean` | - |
| defaultCollapsed | 非受控初始折叠 | `boolean` | `false` |
| onCollapse | 折叠状态变化 | `(collapsed: boolean) => void` | - |
| triggerSlot | 折叠按钮旁附加节点 | `ReactNode` | - |
| className | 自定义类名 | `string` | - |

### LayoutContent

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| component | 根元素类型 | `React.ElementType` | `'main'` |
| className | 自定义类名 | `string` | - |
