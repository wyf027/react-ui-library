# ImagePreview 图片预览

图片预览组件。

## 示例

<LivePlayground :code="`
() => {
  return (
    <div className='inline-flex rounded-lg bg-slate-50 p-3 dark:bg-slate-900'>
      <ImagePreview
        src='https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600'
        alt='Mountain landscape'
      />
    </div>
  )
}
`" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| src | 图片地址 | `string` | - |
| alt | 替代文本 | `string` | - |
| width | 宽度 | `number` | `160` |
| height | 高度 | `number` | `120` |

## 可访问性

- 缩略图会以 `role="button"` 暴露，并支持 <kbd>Enter</kbd> / <kbd>Space</kbd> 打开预览。
- 预览层使用 `role="dialog"` 和 `aria-modal="true"`，打开后焦点会移动到关闭按钮。
- 按 <kbd>Escape</kbd> 或点击关闭按钮会关闭预览，并将焦点返回缩略图。
- 预览打开期间会锁定 `document.body` 滚动，关闭后恢复原始滚动状态。
