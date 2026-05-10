import { Children, Fragment, forwardRef, isValidElement, type HTMLAttributes, type ReactNode } from 'react'

import { cn } from '../../../utils/cn'

/** 与 Ant Design `Space` 的 `size` 预设接近 */
export type SpaceSizePreset = 'small' | 'middle' | 'large'

export type SpaceSize = number | SpaceSizePreset | [number, number]

export interface SpaceProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'horizontal' | 'vertical'
  size?: SpaceSize
  wrap?: boolean
  /** 交叉轴对齐（横向时为纵向对齐），对齐 Ant Design `Space` 的 `align` */
  align?: 'start' | 'end' | 'center' | 'baseline'
  /** 子元素之间的分隔符，对标 Ant Design `Space` 的 `split` */
  split?: ReactNode
}

const sizePresetPx: Record<SpaceSizePreset, number> = {
  small: 8,
  middle: 16,
  large: 24,
}

function sizeToGapCss(size: SpaceSize, direction: 'horizontal' | 'vertical'): string {
  if (Array.isArray(size)) {
    const [first, second] = size
    if (direction === 'horizontal') {
      return `${second}px ${first}px`
    }
    return `${first}px ${second}px`
  }
  const px = typeof size === 'number' ? size : sizePresetPx[size]
  return `${px}px`
}

const alignClass = {
  start: 'items-start',
  end: 'items-end',
  center: 'items-center',
  baseline: 'items-baseline',
} as const

function injectSplit(children: ReactNode, split: ReactNode): ReactNode {
  const items = Children.toArray(children).filter((child) => child != null)
  if (items.length <= 1 || split == null) {
    return children
  }

  return items.flatMap((child, index) => {
    if (index === 0) {
      return [child]
    }
    const key =
      isValidElement(child) && child.key != null ? `space-split-${String(child.key)}` : `space-split-${index}`
    return [<Fragment key={key}>{split}</Fragment>, child]
  })
}

export const Space = forwardRef<HTMLDivElement, SpaceProps>(function Space(
  {
    className,
    direction = 'horizontal',
    size = 8,
    wrap = true,
    align = 'center',
    split,
    style,
    children,
    ...props
  },
  ref,
) {
  const gapCss = sizeToGapCss(size, direction)
  const content = split !== undefined ? injectSplit(children, split) : children

  return (
    <div
      ref={ref}
      style={{ gap: gapCss, ...style }}
      className={cn(
        'flex',
        direction === 'horizontal' ? 'flex-row' : 'flex-col',
        alignClass[align],
        direction === 'horizontal' && wrap ? 'flex-wrap' : 'flex-nowrap',
        className,
      )}
      {...props}
    >
      {content}
    </div>
  )
})
