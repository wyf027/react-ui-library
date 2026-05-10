import { forwardRef, type HTMLAttributes } from 'react'

import { cn } from '../../../utils/cn'

export interface ColProps extends HTMLAttributes<HTMLDivElement> {
  span?: number
  offset?: number
  /** 与 Ant Design `Col` 一致：设置后按 flex 布局，`span` / `offset` 不再生效 */
  flex?: string | number
  /** flex 排序，对应 CSS `order` */
  order?: number
}

export const Col = forwardRef<HTMLDivElement, ColProps>(function Col(
  { className, span = 12, offset = 0, flex, order, style, ...props },
  ref,
) {
  const width = `${(span / 12) * 100}%`
  const marginLeft = `${(offset / 12) * 100}%`

  const flexStyle =
    flex !== undefined
      ? {
          flex: typeof flex === 'number' ? `${flex} ${flex} auto` : flex,
          minWidth: 0 as const,
          order,
        }
      : {
          width,
          marginLeft,
          order,
        }

  return <div ref={ref} style={{ ...flexStyle, ...style }} className={cn('min-w-0', className)} {...props} />
})
