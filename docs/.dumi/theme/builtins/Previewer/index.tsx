import React from 'react'
import { usePrefersColor, type IPreviewerProps } from 'dumi'
import DefaultPreviewer from 'dumi/theme-default/builtins/Previewer'
import { ThemeProvider } from '@wuyangfan/nova-ui'

export default function Previewer(props: IPreviewerProps) {
  const [mode] = usePrefersColor()

  return (
    <ThemeProvider mode={mode}>
      <div className={`w-full min-w-0 ${mode === 'dark' ? 'dark' : ''}`} data-theme={mode}>
        <DefaultPreviewer {...props} />
      </div>
    </ThemeProvider>
  )
}
