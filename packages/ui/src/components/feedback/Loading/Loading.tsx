import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../../../utils/cn'

export interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
  text?: string
  size?: 'sm' | 'md' | 'lg'
}

export const Loading = forwardRef<HTMLDivElement, LoadingProps>(function Loading(
  { className, text = 'Loading...', size = 'md', ...props },
  ref,
) {
  return (
    <div ref={ref} role="status" aria-live="polite" className={cn('inline-flex items-center gap-2', className)} {...props}>
      <span
        className={cn('inline-block animate-spin rounded-full border-2 border-current border-r-transparent', {
          'h-4 w-4': size === 'sm',
          'h-5 w-5': size === 'md',
          'h-6 w-6': size === 'lg',
        })}
      />
      <span className="text-sm text-slate-600 dark:text-slate-300">{text}</span>
    </div>
  )
})
