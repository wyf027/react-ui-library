# 在线示例 Playground

<div class="playground-note">
你可以直接在线编辑下面代码，实时查看组件渲染结果。
</div>

<LivePlayground :code="`
() => {
  return (
    <ThemeProvider mode='light'>
      <Space direction='vertical' size={12}>
        <Title level={3}>Interactive Playground</Title>
        <Input label='Email' placeholder='hello@nova-ui.dev' />
        <Space>
          <Button>Submit</Button>
          <Button variant='outline'>Cancel</Button>
        </Space>
        <Card title='Stats'>This area can render any combination of components.</Card>
      </Space>
    </ThemeProvider>
  )
}
`" />
