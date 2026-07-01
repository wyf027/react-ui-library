import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export interface BreadcrumbItem {
  key: string
  label: ReactNode
  href?: string
  onClick?: () => void
}

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[]
  separator?: ReactNode
}

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(function Breadcrumb(
  { className, items, separator = '/', ...props },
  ref,
) {
  return (
    <nav ref={ref} aria-label="Breadcrumb" className={cn('text-sm', className)} {...props}>
      <ol className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
        {items.map((item, index) => (
          <li key={item.key} className="inline-flex items-center gap-2">
            {item.href ? (
              <a href={item.href} onClick={item.onClick} className="hover:text-brand-600 dark:hover:text-brand-400">
                {item.label}
              </a>
            ) : (
              <button type="button" onClick={item.onClick} className="hover:text-brand-600 dark:hover:text-brand-400">
                {item.label}
              </button>
            )}
            {index < items.length - 1 ? <span>{separator}</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  )
})
