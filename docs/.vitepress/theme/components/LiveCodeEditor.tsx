import React, { useContext, useEffect, useRef } from 'react'

import { LiveContext, LiveEditor } from 'react-live'
import { Flex, Tag, Text } from '@wuyangfan/nova-ui'

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
  const badge = languageBadge(language)

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
    <Flex vertical className="live-code-editor">
      <Flex className="live-code-editor-toolbar" align="center" justify="between">
        <Text className="live-code-editor-title">Code</Text>
        <Tag className="live-code-editor-lang" aria-label={`${badge} example code`}>
          {badge}
        </Tag>
      </Flex>
      <Flex className="live-code-editor-main" ref={mainRef}>
        <Flex vertical className="live-code-editor-gutter" ref={gutterRef} aria-hidden="true">
          {Array.from({ length: lines }, (_, index) => (
            <Text key={index} className="live-code-editor-gutter-line">
              {index + 1}
            </Text>
          ))}
        </Flex>
        <Flex vertical className="live-code-editor-editor">
          <LiveEditor className="live-code-editor-live" />
        </Flex>
      </Flex>
    </Flex>
  )
}