import { forwardRef, type CSSProperties, type HTMLAttributes } from 'react'

import { cn } from '../../../utils/cn'

export type GridGap = number | [number, number]

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  cols?: number
  gap?: GridGap
}

function gapToStyle(gap: GridGap): Pick<CSSProperties, 'gap'> {
  const [horizontal, vertical] = Array.isArray(gap) ? gap : [gap, gap]
  return { gap: `${vertical}px ${horizontal}px` }
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid(
  { className, cols = 3, gap = 12, style, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        ...gapToStyle(gap),
        ...style,
      }}
      className={cn('grid', className)}
      {...props}
    />
  )
})
