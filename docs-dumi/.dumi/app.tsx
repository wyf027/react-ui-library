import '@wuyangfan/nova-ui/styles.css'
import './comp-overview.css'
import './doc-theme.css'

import React, { useEffect, useLayoutEffect } from 'react'

/**
 * dumi 主题切换写在 `html[data-prefers-color]`；Nova UI 的 Tailwind 产物按 `darkMode: 'class'`
 * 生成 `.dark …` 选择器。将二者同步，文档页与 demo 预览区的暗色样式才能一致。
 */
function syncNovaDarkClassFromDumi() {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  const isDark = root.getAttribute('data-prefers-color') === 'dark'
  root.classList.toggle('dark', isDark)
}

function NovaDarkModeSync() {
  useLayoutEffect(() => {
    syncNovaDarkClassFromDumi()
  }, [])

  useEffect(() => {
    const observer = new MutationObserver(syncNovaDarkClassFromDumi)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-prefers-color'],
    })
    return () => observer.disconnect()
  }, [])

  return null
}

/** Umi 运行时插件：包裹根节点，勿使用 default 导出 React 组件 */
export function rootContainer(container: React.ReactNode) {
  return (
    <>
      <NovaDarkModeSync />
      {container}
    </>
  )
}
