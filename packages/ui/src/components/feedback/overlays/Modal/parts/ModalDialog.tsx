import { type HTMLAttributes, type ReactNode, type Ref } from 'react'

import { DialogHeader } from '../../../../_internal/DialogHeader'
import { cn } from '../../../../../utils/cn'

export interface ModalDialogProps {
  panelRef: Ref<HTMLDivElement>
  title?: string
  onClose?: () => void
  className?: string
  children?: ReactNode
  dialogProps: Omit<HTMLAttributes<HTMLDivElement>, 'children'>
}

export function ModalDialog({ panelRef, title, onClose, className, children, dialogProps }: ModalDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" aria-hidden={false}>
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={cn('w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl outline-none dark:bg-slate-900', className)}
        {...dialogProps}
      >
        <DialogHeader title={title} onClose={onClose} contentClassName="mb-3" closeAriaLabel="Close modal" />
        <div>{children}</div>
      </div>
    </div>
  )
}
