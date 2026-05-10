# DatePicker 日期选择

基于原生 `<input type="date">` 的日期选择；值为 **`YYYY-MM-DD` 字符串**，与 `<input type="date">` 的 `value` 格式一致。

## 示例

<LivePlayground :code="`
() => {
  return (
    <DatePicker />
  )
}
`" />

## API

继承除 **`type`**、**`onChange`** 以外的 [`InputHTMLAttributes<HTMLInputElement>`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLInputElement)（如 `className`、`disabled`、`name`、`id` 等）。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 受控值；合法格式为 `YYYY-MM-DD` | `string` | - |
| defaultValue | 非受控初始值 | `string` | `''` |
| onChange | 值变化回调（与原生 `input` 的字符串一致） | `(value: string) => void` | - |

### 说明

- **无独立 label**：若需要标签，请在业务侧用 `FormItem` / 外层布局包裹。
- **`placeholder`**：原生 `type="date"` 在各浏览器展示不一致，组件未单独封装占位文案行为；如需占位语义，优先用标签或旁注文案。
- **国际化 / 高级面板**：非当前范围；需要日历浮层、区间选择等时请使用专门日期库或演进方案。
