import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../../../utils/cn'

export interface PaginationProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  current?: number
  defaultCurrent?: number
  total: number
  pageSize?: number
  onChange?: (page: number) => void
}

export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(function Pagination(
  {
    className,
    current = 1,
    defaultCurrent = 1,
    total,
    pageSize = 10,
    onChange,
    ...props
  },
  ref,
) {
  const page = current ?? defaultCurrent
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const pages = Array.from({ length: totalPages }, (_, idx) => idx + 1)

  return (
    <nav ref={ref} aria-label="Pagination" className={cn('flex items-center gap-2', className)} {...props}>
      <button
        type="button"
        onClick={() => onChange?.(Math.max(1, page - 1))}
        disabled={page <= 1}
        className="nova-focus-ring rounded border px-2 py-1 text-sm disabled:opacity-50"
      >
        Prev
      </button>
      {pages.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onChange?.(item)}
          aria-current={item === page ? 'page' : undefined}
          className={cn(
            'nova-focus-ring rounded border px-3 py-1 text-sm',
            item === page ? 'border-brand-500 bg-brand-500 text-white' : 'border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900',
          )}
        >
          {item}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onChange?.(Math.min(totalPages, page + 1))}
        disabled={page >= totalPages}
        className="nova-focus-ring rounded border px-2 py-1 text-sm disabled:opacity-50"
      >
        Next
      </button>
    </nav>
  )
})
