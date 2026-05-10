import { forwardRef, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react'

import { cn } from '../../../utils/cn'
import { badgeStatusBgClass, type BadgeStatus } from '../../../theme/componentTokens'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  count?: number
  dot?: boolean
  children?: ReactNode
  /** 超过该值显示 `${overflowCount}+`，对标 Ant Design `overflowCount` */
  overflowCount?: number
  /** count 为 0 时是否展示徽标，对标 Ant Design `showZero` */
  showZero?: boolean
  /** 状态色，对标 Ant Design `status` */
  status?: BadgeStatus
  /** 徽标相对默认位置的偏移 `[x, y]`（px） */
  offset?: [number, number]
  /** 自定义背景色（优先于 `status`） */
  color?: string
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    className,
    count = 0,
    dot = false,
    children,
    overflowCount = 99,
    showZero = false,
    status,
    offset,
    color,
    style,
    ...props
  },
  ref,
) {
  const showBadge = dot || count > 0 || showZero
  const display =
    typeof count === 'number' && count > overflowCount ? `${overflowCount}+` : count

  const bgClass = color ? undefined : status ? badgeStatusBgClass[status] : 'bg-red-500'

  const badgeStyle: CSSProperties = {
    ...(color ? { backgroundColor: color } : {}),
    ...(offset ? { transform: `translate(${offset[0]}px, ${offset[1]}px)` } : {}),
    ...style,
  }

  return (
    <span ref={ref} className={cn('relative inline-flex', className)} {...props}>
      {children}
      {showBadge ? (
        <span
          className={cn(
            'absolute -right-2 -top-2 inline-flex items-center justify-center rounded-full text-[10px] font-semibold text-white',
            dot ? 'h-2 w-2 min-h-0 min-w-0 p-0' : 'min-h-5 min-w-5 px-1',
            !color && bgClass,
          )}
          style={badgeStyle}
        >
          {dot ? null : display}
        </span>
      ) : null}
    </span>
  )
})
