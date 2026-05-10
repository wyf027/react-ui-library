import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../../../utils/cn'

export interface AnchorItem {
  key: string
  href: string
  title: string
}

export interface AnchorProps extends HTMLAttributes<HTMLElement> {
  items: AnchorItem[]
}

export const Anchor = forwardRef<HTMLElement, AnchorProps>(function Anchor(
  { className, items, ...props },
  ref,
) {
  return (
    <nav ref={ref} className={cn('rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900', className)} {...props}>
      <ul className="space-y-1 text-sm">
        {items.map((item) => (
          <li key={item.key}>
            <a href={item.href} className="text-slate-600 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400">
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
})
