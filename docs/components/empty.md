# Empty 空状态

空状态占位组件，补充属性对齐 Ant Design `Empty`。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Empty description='暂无数据' />
  )
}
`" />

### 轻量样式（simple）

<LivePlayground :code="`
() => {
  return (
    <Empty simple description='无内容' image={<span style={{fontSize:28}}>📄</span>} imageStyle={{ opacity: 0.85 }} />
  )
}
`" />

## API

| 属性            | 说明                                     | 类型            | 默认值      |
| --------------- | ---------------------------------------- | --------------- | ----------- |
| description     | 描述文字                                 | `ReactNode`     | `'No Data'` |
| image           | 自定义图标                               | `ReactNode`     | -           |
| simple          | 无边框轻量样式                           | `boolean`       | `false`     |
| imageStyle      | 图标容器样式                             | `CSSProperties` | -           |
| imageAriaHidden | 图片区域是否作为装饰内容从辅助技术中隐藏 | `boolean`       | `true`      |

## 可访问性

Empty 默认将图片区域视为装饰内容并设置 `aria-hidden="true"`，由 `description` 传达空状态含义。若自定义 `image` 本身包含不可替代的信息，可设置 `imageAriaHidden={false}`，并确保图片内容具备可访问名称。
