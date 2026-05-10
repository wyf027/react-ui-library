# Navigation 组件技术方案

> 与 **Button 技术方案**同维度。

## 0. 仓库现状说明

在 **`packages/ui`** 内 **未检索到** 名为 **`Navigation`** 的组件实现或导出（**无 `Navigation.tsx` / 无 `Navigation` 符号**）。**`main.tsx` 演示** 使用 **`Menu`、`Tabs`、`Breadcrumb`、`Dropdown`** 等完成导航场景。

## 1. 文档信息（占位）

| 项 | 内容 |
| --- | --- |
| 组件名 | `Navigation`（**不存在独立实现**） |
| 建议 | 需求映射：**横向菜单**→**`Menu` `mode="horizontal"`**；**页签**→**`Tabs`**；**路径**→**`Breadcrumb`**；**下拉**→**`Dropdown`** |

## 15. 结论

**当前 Nova UI 无 `Navigation` 技术实现可写**；若产品需要 **统一 Navigation 壳组件**，需在 **`packages/ui/src/components/navigation`** **新增实现** 后再补本文件 **§4–§14** 与 **`component-plans/MANIFEST.md`** 登记。

## 附录 B

可参阅：**`Menu.tsx`**、**`Tabs.tsx`**、**`Breadcrumb.tsx`**。
