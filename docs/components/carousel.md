# Carousel 走马灯

轮播组件，对齐 Ant Design Carousel。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Carousel
      items={[
        <div style={{background:'#3b82f6',color:'#fff',padding:'40px',textAlign:'center',borderRadius:'8px'}}>Slide 1</div>,
        <div style={{background:'#10b981',color:'#fff',padding:'40px',textAlign:'center',borderRadius:'8px'}}>Slide 2</div>,
        <div style={{background:'#f59e0b',color:'#fff',padding:'40px',textAlign:'center',borderRadius:'8px'}}>Slide 3</div>,
      ]}
    />
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 轮播内容 | `ReactNode[]` | - |
| autoplay | 自动播放 | `boolean` | `false` |
| autoplaySpeed | 自动播放速度(ms) | `number` | `3000` |
| dots | 显示指示点 | `boolean` | `true` |
| arrows | 显示箭头 | `boolean` | `true` |
