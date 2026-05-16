import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'

import { cn } from '../../../utils/cn'

function ellipsisTitleAttr(title: string | undefined, ellipsis: boolean | undefined, children: ReactNode) {
  if (title !== undefined) {
    return title
  }
  if (ellipsis && typeof children === 'string') {
    return children
  }
  return undefined
}

export interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5
  /** Single-line truncation (`truncate` + `min-w-0`). When `children` is a string and `title` is omitted, `title` is set for native tooltip. */
  ellipsis?: boolean
}

export const Title = forwardRef<HTMLHeadingElement, TitleProps>(function Title(
  { className, level = 2, children, ellipsis, title, ...props },
  ref,
) {
  const Tag = `h${level}` as const
  const resolvedTitle = ellipsisTitleAttr(title, ellipsis, children)

  return (
    <Tag
      ref={ref}
      title={resolvedTitle}
      className={cn(
        'font-semibold tracking-tight text-slate-900 dark:text-slate-100',
        {
          'text-3xl': level === 1,
          'text-2xl': level === 2,
          'text-xl': level === 3,
          'text-lg': level === 4,
          'text-base': level === 5,
        },
        ellipsis && 'min-w-0 truncate',
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
})

export interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  /** Single-line truncation. When `children` is a string and `title` is omitted, `title` is set for native tooltip. */
  ellipsis?: boolean
}

export const Text = forwardRef<HTMLSpanElement, TextProps>(function Text(
  { className, children, ellipsis, title, ...props },
  ref,
) {
  const resolvedTitle = ellipsisTitleAttr(title, ellipsis, children)

  return (
    <span
      ref={ref}
      title={resolvedTitle}
      className={cn('text-sm text-slate-700 dark:text-slate-300', ellipsis && 'min-w-0 truncate', className)}
      {...props}
    >
      {children}
    </span>
  )
})

export type ParagraphProps = HTMLAttributes<HTMLParagraphElement>

export const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(function Paragraph({ className, ...props }, ref) {
  return <p ref={ref} className={cn('text-sm leading-7 text-slate-600 dark:text-slate-400', className)} {...props} />
})
