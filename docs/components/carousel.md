# Carousel 走马灯

轮播组件，对齐 Ant Design Carousel。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Carousel
      aria-label='Featured product stories'
      items={[
        <div className='rounded-lg bg-blue-500 px-6 py-10 text-center text-lg font-semibold text-white'>Slide 1</div>,
        <div className='rounded-lg bg-emerald-500 px-6 py-10 text-center text-lg font-semibold text-white'>Slide 2</div>,
        <div className='rounded-lg bg-amber-500 px-6 py-10 text-center text-lg font-semibold text-white'>Slide 3</div>,
      ]}
    />
  )
}
`" />

## 可访问性

- 根节点默认使用 `role="region"` 和 `aria-roledescription="carousel"`，可通过 `aria-label` 为页面中的多个轮播提供清晰名称。
- 每个 slide 会暴露为 `role="group"`，并使用 `1 of 3` 这类位置标签帮助读屏用户理解当前位置。
- 非自动播放时，当前 slide 位置会通过 `aria-live="polite"` 轻量播报；启用 `autoplay` 时会切换为 `aria-live="off"`，避免连续轮播打断读屏。
- 指示点会用 `aria-current="true"` 标记当前项；当轮播或其控制按钮获得焦点时，支持 `ArrowLeft`、`ArrowRight`、`Home`、`End` 切换。

## API

| 属性          | 说明             | 类型          | 默认值  |
| ------------- | ---------------- | ------------- | ------- |
| items         | 轮播内容         | `ReactNode[]` | -       |
| autoplay      | 自动播放         | `boolean`     | `false` |
| autoplaySpeed | 自动播放速度(ms) | `number`      | `3000`  |
| dots          | 显示指示点       | `boolean`     | `true`  |
| arrows        | 显示箭头         | `boolean`     | `true`  |
