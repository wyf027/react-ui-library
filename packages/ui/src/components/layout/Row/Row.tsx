import { forwardRef, type CSSProperties, type HTMLAttributes } from 'react'

import { cn } from '../../../utils/cn'

/** 与 Ant Design `Row` 的 `gutter` 一致：`[水平间距, 垂直间距]`（ flex 换行时的行间距为垂直间距） */
export type RowGap = number | [number, number]

export interface RowProps extends HTMLAttributes<HTMLDivElement> {
  gap?: RowGap
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
  wrap?: boolean
}

function gapToStyle(gap: RowGap): Pick<CSSProperties, 'gap'> {
  const [horizontal, vertical] = Array.isArray(gap) ? gap : [gap, gap]
  return { gap: `${vertical}px ${horizontal}px` }
}

export const Row = forwardRef<HTMLDivElement, RowProps>(function Row(
  { className, gap = 12, justify = 'start', align = 'stretch', wrap = true, style, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      style={{ ...gapToStyle(gap), ...style }}
      className={cn(
        'flex',
        wrap ? 'flex-wrap' : 'flex-nowrap',
        {
          'justify-start': justify === 'start',
          'justify-center': justify === 'center',
          'justify-end': justify === 'end',
          'justify-between': justify === 'between',
          'justify-around': justify === 'around',
          'justify-evenly': justify === 'evenly',
          'items-start': align === 'start',
          'items-center': align === 'center',
          'items-end': align === 'end',
          'items-stretch': align === 'stretch',
          'items-baseline': align === 'baseline',
        },
        className,
      )}
      {...props}
    />
  )
})
