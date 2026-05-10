import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'

import { cn } from '../../../utils/cn'

export type DividerOrientation = 'horizontal' | 'vertical'

export type DividerVariant = 'solid' | 'dashed' | 'dotted'

/** 带文案时的位置（对标 Ant Design 中带文案分割线的 `orientation`） */
export type DividerTitlePlacement = 'start' | 'center' | 'end'

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: DividerOrientation
  variant?: DividerVariant
  /** 朴素样式（减小外边距），对标 Ant Design `plain` */
  plain?: boolean
  /** 横向且存在 `children` 时文案位置 */
  titlePlacement?: DividerTitlePlacement
  children?: ReactNode
}

const borderVariant: Record<DividerVariant, string> = {
  solid: 'border-solid',
  dashed: 'border-dashed',
  dotted: 'border-dotted',
}

export const Divider = forwardRef<HTMLDivElement, DividerProps>(function Divider(
  {
    className,
    orientation = 'horizontal',
    variant = 'solid',
    plain = false,
    titlePlacement = 'center',
    children,
    ...props
  },
  ref,
) {
  const marginY = plain ? 'my-2' : 'my-3'
  const marginX = plain ? 'mx-2' : 'mx-3'

  const lineClass = cn(
    'border-slate-200 dark:border-slate-700',
    borderVariant[variant],
    orientation === 'horizontal' ? 'border-t' : 'border-l',
  )

  if (orientation === 'horizontal' && children != null) {
    const line = <div className={cn('min-h-0 flex-1 border-0', lineClass)} aria-hidden />
    const label = (
      <span className="shrink-0 px-3 text-sm text-slate-500 dark:text-slate-400">{children}</span>
    )

    const inner =
      titlePlacement === 'center' ? (
        <>
          {line}
          {label}
          {line}
        </>
      ) : titlePlacement === 'start' ? (
        <>
          {label}
          {line}
        </>
      ) : (
        <>
          {line}
          {label}
        </>
      )

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation="horizontal"
        className={cn('flex w-full items-center', marginY, className)}
        {...props}
      >
        {inner}
      </div>
    )
  }

  return (
    <div
      ref={ref}
      role="separator"
      aria-orientation={orientation === 'vertical' ? 'vertical' : 'horizontal'}
      className={cn(
        'border-0',
        lineClass,
        orientation === 'horizontal' ? cn('h-0 w-full', marginY) : cn('box-border min-h-4 w-0 self-stretch', marginX),
        className,
      )}
      {...props}
    />
  )
})
