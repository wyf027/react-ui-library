import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export interface BreadcrumbItem {
  key: string
  label: ReactNode
  href?: string
  onClick?: () => void
  current?: boolean
}

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[]
  separator?: ReactNode
}

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(function Breadcrumb(
  { className, items, separator = '/', ...props },
  ref,
) {
  const hasExplicitCurrent = items.some((item) => item.current)

  return (
    <nav ref={ref} aria-label="Breadcrumb" className={cn('text-sm', className)} {...props}>
      <ol className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
        {items.map((item, index) => {
          const isCurrent = hasExplicitCurrent ? item.current === true : index === items.length - 1
          const itemClassName = cn(
            isCurrent
              ? 'font-medium text-slate-700 dark:text-slate-200'
              : 'hover:text-brand-600 dark:hover:text-brand-400',
          )

          return (
            <li key={item.key} className="inline-flex items-center gap-2">
              {item.href ? (
                <a
                  href={item.href}
                  aria-current={isCurrent ? 'page' : undefined}
                  onClick={item.onClick}
                  className={itemClassName}
                >
                  {item.label}
                </a>
              ) : item.onClick ? (
                <button
                  type="button"
                  aria-current={isCurrent ? 'page' : undefined}
                  onClick={item.onClick}
                  className={itemClassName}
                >
                  {item.label}
                </button>
              ) : (
                <span aria-current={isCurrent ? 'page' : undefined} className={itemClassName}>
                  {item.label}
                </span>
              )}
              {index < items.length - 1 ? <span aria-hidden="true">{separator}</span> : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
})
