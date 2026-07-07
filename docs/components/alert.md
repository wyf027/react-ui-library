# Alert 警告提示

警告提示组件，对齐 Ant Design Alert。`type` 对应的背景/边框/文字色由 `packages/ui/src/theme/componentTokens.ts` 中的 `alertTypeSurfaceClass` 统一维护，避免在组件内散落色板 class。

## 示例

<LivePlayground :code="`
() => {
  return (
    <div className='flex flex-col gap-2'>
      <Alert type='info' message='提示信息' description='这是一条信息提示。' />
      <Alert type='success' message='操作成功' closable />
      <Alert type='warning' message='警告信息' showIcon />
      <Alert
        type='error'
        message='错误信息'
        description='请检查后重试。'
        closable
        closeIcon='关闭'
        closeAriaLabel='关闭错误提示'
      />
    </div>
  )
}
`" />

## 可访问性

Alert 使用 `role='alert'` 暴露重要提示内容。默认状态图标仅作视觉辅助，会从辅助技术树中隐藏；需要传达给读屏用户的信息应放在 `message` 或 `description` 中。传入自定义 `icon` 时，组件不会自动隐藏它。

可关闭 Alert 的默认关闭按钮使用 `aria-label='Close alert'`。当使用文字、图标或本地化关闭控件时，可以通过 `closeIcon` 和 `closeAriaLabel` 保持视觉内容与可访问名称一致。

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 类型 | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` |
| message | 提示内容 | `ReactNode` | - |
| description | 描述文案 | `ReactNode` | - |
| closable | 可关闭 | `boolean` | `false` |
| showIcon | 显示图标 | `boolean` | `true` |
| icon | 自定义图标 | `ReactNode` | - |
| banner | 横幅模式 | `boolean` | `false` |
| action | 操作区域 | `ReactNode` | - |
| closeIcon | 自定义关闭控件内容 | `ReactNode` | `'✕'` |
| closeAriaLabel | 关闭按钮的可访问名称 | `string` | `'Close alert'` |
| onClose | 关闭回调 | `(event: MouseEvent<HTMLButtonElement>) => void` | - |
