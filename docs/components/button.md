# Button 按钮

按钮用于开始一个即时操作。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Space direction='vertical' size={12}>
      <Space>
        <Button>主按钮</Button>
        <Button variant='outline'>描边按钮</Button>
        <Button variant='ghost'>文字按钮</Button>
      </Space>
      <Space>
        <Button color='danger'>危险按钮</Button>
        <Button color='neutral'>中性按钮</Button>
        <Button loading>加载中</Button>
        <Button disabled>禁用</Button>
      </Space>
      <Space>
        <Button size='sm'>小按钮</Button>
        <Button size='md'>中按钮</Button>
        <Button size='lg'>大按钮</Button>
      </Space>
    </Space>
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| variant | 按钮样式 | `'solid' \| 'outline' \| 'ghost'` | `'solid'` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| color | 颜色 | `'primary' \| 'neutral' \| 'danger'` | `'primary'` |
| loading | 加载状态 | `boolean` | `false` |
| disabled | 禁用状态 | `boolean` | `false` |
| icon | 图标 | `ReactNode` | - |
