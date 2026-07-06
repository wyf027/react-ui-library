# DatePicker 日期选择

基于原生 `<input type="date">` 的日期选择；值为 **`YYYY-MM-DD` 字符串**，与 `<input type="date">` 的 `value` 格式一致。

## 示例

<LivePlayground :code="`
() => {
  return (
    <DatePicker aria-label='选择日期' />
  )
}
`" />

## 可访问性

- 请为日期输入提供外部 `<label>`、`aria-label` 或 `aria-labelledby`，避免只有浏览器原生日期控件而没有可访问名称。
- 需要补充格式、范围或错误提示时，可以通过 `aria-describedby` 关联外部说明文本。
- 原生 `type="date"` 的输入与弹出 UI 在不同浏览器和操作系统中表现不一致，提交值始终保持 `YYYY-MM-DD` 字符串。

## API

继承除 **`type`**、**`onChange`** 以外的 [`InputHTMLAttributes<HTMLInputElement>`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLInputElement)（如 `className`、`disabled`、`name`、`id` 等）。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 受控值；合法格式为 `YYYY-MM-DD` | `string` | - |
| defaultValue | 非受控初始值 | `string` | `''` |
| onChange | 值变化回调（与原生 `input` 的字符串一致） | `(value: string) => void` | - |

### 说明

- **标签**：组件不内置独立 label；若需要可见标签，请在业务侧用 `FormItem` / 外层布局包裹，或提供外部 `<label htmlFor>`。
- **`placeholder`**：原生 `type="date"` 在各浏览器展示不一致，组件未单独封装占位文案行为；如需占位语义，优先用标签或旁注文案。
- **国际化 / 高级面板**：非当前范围；需要日历浮层、区间选择等时请使用专门日期库或演进方案。
