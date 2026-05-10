import type { ReactNode } from 'react'

import { cn } from '../../../utils/cn'

export interface DialogHeaderProps {
  title?: ReactNode
  onClose?: () => void
  /** 外层容器额外 class（如 mb-3 / mb-4） */
  contentClassName?: string
  closeAriaLabel?: string
}

export function DialogHeader({
  title,
  onClose,
  contentClassName,
  closeAriaLabel = 'Close',
}: DialogHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between', contentClassName ?? 'mb-3')}>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
      <button
        type="button"
        onClick={onClose}
        className="rounded p-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
        aria-label={closeAriaLabel}
      >
        ✕
      </button>
    </div>
  )
}
