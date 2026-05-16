import React, { useContext, useEffect, useRef } from 'react'

import { LiveContext, LiveEditor } from 'react-live'

function lineCount(code: string) {
  if (!code) {
    return 1
  }
  return code.split('\n').length
}

function languageBadge(language: string) {
  const normalized = language.trim().toLowerCase()

  if (normalized === 'tsx') {
    return 'TSX'
  }
  if (normalized === 'typescript' || normalized === 'ts') {
    return 'TS'
  }
  if (normalized === 'jsx') {
    return 'JSX'
  }
  if (normalized === 'javascript' || normalized === 'js') {
    return 'JS'
  }

  return normalized.toUpperCase() || 'TSX'
}

export function LiveCodeEditor() {
  const ctx = useContext(LiveContext)

  if (!ctx) {
    return null
  }

  const { code, language } = ctx
  const lines = Math.max(lineCount(code), 1)

  const mainRef = useRef<HTMLDivElement>(null)
  const gutterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false
    let removeListener: (() => void) | undefined

    const tryBind = () => {
      const root = mainRef.current
      const gutter = gutterRef.current
      if (!root || !gutter || cancelled) {
        return
      }

      const pre = root.querySelector('pre')
      if (!pre) {
        requestAnimationFrame(tryBind)
        return
      }

      const syncScroll = () => {
        gutter.scrollTop = pre.scrollTop
      }

      pre.addEventListener('scroll', syncScroll)
      syncScroll()
      removeListener = () => pre.removeEventListener('scroll', syncScroll)
    }

    tryBind()

    return () => {
      cancelled = true
      removeListener?.()
    }
  }, [code])

  return (
    <div className="live-code-editor">
      <div className="live-code-editor-toolbar">
        <span className="live-code-editor-lang">{languageBadge(language)}</span>
      </div>
      <div className="live-code-editor-main" ref={mainRef}>
        <div className="live-code-editor-gutter" ref={gutterRef} aria-hidden="true">
          {Array.from({ length: lines }, (_, index) => (
            <div key={index} className="live-code-editor-gutter-line">
              {index + 1}
            </div>
          ))}
        </div>
        <div className="live-code-editor-editor">
          <LiveEditor className="live-code-editor-live" />
        </div>
      </div>
    </div>
  )
}
