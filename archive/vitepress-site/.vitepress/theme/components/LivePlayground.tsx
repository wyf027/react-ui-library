import React from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { LiveError, LivePreview, LiveProvider } from 'react-live'
import * as NovaUI from '@wuyangfan/nova-ui'
import { defineComponent, h, onBeforeUnmount, onMounted, ref, watch } from 'vue'

import { LiveCodeEditor } from './LiveCodeEditor'

const scope = {
  React,
  ...NovaUI,
}

function resolvePrismLanguage(lang: string): string {
  const key = lang.trim().toLowerCase()

  if (key === 'js') {
    return 'javascript'
  }
  if (key === 'ts') {
    return 'typescript'
  }
  if (key === 'jsx') {
    return 'jsx'
  }
  if (key === 'tsx') {
    return 'tsx'
  }

  return 'tsx'
}

function resolveEnableTypeScript(lang: string): boolean {
  const key = lang.trim().toLowerCase()

  return key === 'tsx' || key === 'ts'
}

/** 文档里曾用 () => { return ( <JSX/> ) }；react-live 已会用 return 包裹，剥离后编辑器只展示组件模板。 */
function unwrapLiveTemplate(code: string): string {
  const s = code.trim()
  if (!/^\(\)\s*=>\s*\{/.test(s)) {
    return s
  }

  let inner = s.replace(/^\(\)\s*=>\s*\{\s*/, '').replace(/^return\s*\(\s*/, '')
  inner = inner.replace(/\s*\)\s*\}\s*$/, '')

  return inner.trim()
}

const ReactLiveMount = defineComponent({
  name: 'ReactLiveMount',
  props: {
    code: {
      type: String,
      required: true,
    },
    /** 传给 Prism / Sucrase：`tsx` | `jsx` | `ts` | `js` */
    language: {
      type: String,
      default: 'tsx',
    },
  },
  setup(props) {
    const containerRef = ref<HTMLElement | null>(null)
    let root: Root | null = null

    const renderLive = () => {
      if (!containerRef.value) {
        return
      }

      if (!root) {
        root = createRoot(containerRef.value)
      }

      const liveCode = unwrapLiveTemplate(props.code)
      const prismLanguage = resolvePrismLanguage(props.language)

      root.render(
        React.createElement(
          'div',
          { className: 'live-wrap' },
          React.createElement(
            LiveProvider,
            {
              code: liveCode,
              scope,
              language: prismLanguage,
              enableTypeScript: resolveEnableTypeScript(props.language),
            },
            React.createElement('div', { className: 'live-pane live-preview' }, React.createElement(LivePreview, null)),
            React.createElement('div', { className: 'live-pane live-editor' }, React.createElement(LiveCodeEditor, null)),
            React.createElement(LiveError, { className: 'live-error' }),
          ),
        ),
      )
    }

    onMounted(renderLive)

    watch(
      () => [props.code, props.language],
      () => renderLive(),
    )

    onBeforeUnmount(() => {
      root?.unmount()
      root = null
    })

    return () => h('div', { ref: containerRef })
  },
})

export default ReactLiveMount
