# Spin 加载动画

全局加载动画组件，对齐 Ant Design Spin，可包裹子元素。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Space direction='vertical' size={12}>
      <Spin tip='加载中...' />
      <Spin spinning={true}>
        <Card title='卡片标题'>被 Spin 包裹的内容区域</Card>
      </Spin>
    </Space>
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| spinning | 是否加载中 | `boolean` | `true` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| tip | 提示文字 | `ReactNode` | - |
