import { forwardRef, useState, type HTMLAttributes } from 'react'
import { cn } from '../../../utils/cn'

export interface PaginationProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  current?: number
  defaultCurrent?: number
  total: number
  pageSize?: number
  onChange?: (page: number) => void
}

export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(function Pagination(
  { className, current, defaultCurrent = 1, total, pageSize = 10, onChange, ...props },
  ref,
) {
  const [internalPage, setInternalPage] = useState(defaultCurrent)
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const page = Math.min(Math.max(1, current ?? internalPage), totalPages)
  const pages = Array.from({ length: totalPages }, (_, idx) => idx + 1)
  const changePage = (nextPage: number) => {
    const boundedPage = Math.min(Math.max(1, nextPage), totalPages)

    if (current === undefined) {
      setInternalPage(boundedPage)
    }

    onChange?.(boundedPage)
  }

  return (
    <nav
      ref={ref}
      aria-label="Pagination"
      className={cn('flex items-center gap-2', className)}
      {...props}
    >
      <button
        type="button"
        onClick={() => changePage(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
        className="nova-focus-ring rounded border px-2 py-1 text-sm disabled:opacity-50"
      >
        Prev
      </button>
      {pages.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => changePage(item)}
          aria-current={item === page ? 'page' : undefined}
          aria-label={item === page ? `Page ${item}, current page` : `Go to page ${item}`}
          className={cn(
            'nova-focus-ring rounded border px-3 py-1 text-sm',
            item === page
              ? 'border-brand-500 bg-brand-500 text-white'
              : 'border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900',
          )}
        >
          {item}
        </button>
      ))}
      <button
        type="button"
        onClick={() => changePage(page + 1)}
        disabled={page >= totalPages}
        aria-label="Next page"
        className="nova-focus-ring rounded border px-2 py-1 text-sm disabled:opacity-50"
      >
        Next
      </button>
    </nav>
  )
})
