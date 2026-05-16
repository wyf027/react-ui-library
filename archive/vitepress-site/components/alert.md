# Alert 警告提示

警告提示组件，对齐 Ant Design Alert。`type` 对应的背景/边框/文字色由 `packages/ui/src/theme/componentTokens.ts` 中的 `alertTypeSurfaceClass` 统一维护，避免在组件内散落色板 class。

## 示例

<LivePlayground :code="`
() => {
  return (
    <Space direction='vertical' size={8}>
      <Alert type='info' message='提示信息' description='这是一条信息提示。' />
      <Alert type='success' message='操作成功' closable />
      <Alert type='warning' message='警告信息' showIcon />
      <Alert type='error' message='错误信息' description='请检查后重试。' closable />
    </Space>
  )
}
`" />

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
| onClose | 关闭回调 | `() => void` | - |
