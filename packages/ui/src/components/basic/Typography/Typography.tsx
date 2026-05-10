import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../../../utils/cn'

export interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5
}

export const Title = forwardRef<HTMLHeadingElement, TitleProps>(function Title(
  { className, level = 2, children, ...props },
  ref,
) {
  const Tag = `h${level}` as const
  return (
    <Tag
      ref={ref}
      className={cn(
        'font-semibold tracking-tight text-slate-900 dark:text-slate-100',
        {
          'text-3xl': level === 1,
          'text-2xl': level === 2,
          'text-xl': level === 3,
          'text-lg': level === 4,
          'text-base': level === 5,
        },
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
})

export type TextProps = HTMLAttributes<HTMLSpanElement>

export const Text = forwardRef<HTMLSpanElement, TextProps>(function Text({ className, ...props }, ref) {
  return <span ref={ref} className={cn('text-sm text-slate-700 dark:text-slate-300', className)} {...props} />
})

export type ParagraphProps = HTMLAttributes<HTMLParagraphElement>

export const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(function Paragraph({ className, ...props }, ref) {
  return <p ref={ref} className={cn('text-sm leading-7 text-slate-600 dark:text-slate-400', className)} {...props} />
})
