import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  wrap?: boolean
  gap?: number | string
  vertical?: boolean
}

const alignMap: Record<string, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
}

const justifyMap: Record<string, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
}

export const Flex = forwardRef<HTMLDivElement, FlexProps>(function Flex(
  {
    className,
    direction,
    align,
    justify,
    wrap = false,
    gap,
    vertical = false,
    style,
    ...props
  },
  ref,
) {
  const dir = direction ?? (vertical ? 'column' : 'row')
  const dirCls: Record<string, string> = {
    row: 'flex-row',
    column: 'flex-col',
    'row-reverse': 'flex-row-reverse',
    'column-reverse': 'flex-col-reverse',
  }

  return (
    <div
      ref={ref}
      className={cn(
        'flex',
        dirCls[dir],
        align && alignMap[align],
        justify && justifyMap[justify],
        wrap && 'flex-wrap',
        className,
      )}
      style={{ gap: gap !== undefined ? (typeof gap === 'number' ? `${gap}px` : gap) : undefined, ...style }}
      {...props}
    />
  )
})
