import { type HTMLAttributes, type ReactNode, type RefObject, useEffect, useId } from 'react'

import { DialogHeader } from '../../../../_internal/DialogHeader'
import { cn } from '../../../../../utils/cn'

export interface ModalDialogProps {
  panelRef: RefObject<HTMLDivElement>
  closeButtonRef: RefObject<HTMLButtonElement>
  title?: string
  onClose?: () => void
  className?: string
  children?: ReactNode
  dialogProps: Omit<HTMLAttributes<HTMLDivElement>, 'children'>
}

export function ModalDialog({
  panelRef,
  closeButtonRef,
  title,
  onClose,
  className,
  children,
  dialogProps,
}: ModalDialogProps) {
  const titleId = useId()

  useEffect(() => {
    const activeElement = document.activeElement as HTMLElement | null

    if (!panelRef.current?.contains(activeElement)) {
      closeButtonRef.current?.focus()
    }
  }, [closeButtonRef, panelRef])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      aria-hidden={false}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        className={cn(
          'w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl dark:bg-slate-900',
          className,
        )}
        {...dialogProps}
      >
        <DialogHeader
          title={title}
          titleId={titleId}
          closeButtonRef={closeButtonRef}
          onClose={onClose}
          contentClassName="mb-3"
          closeAriaLabel="Close modal"
        />
        <div>{children}</div>
      </div>
    </div>
  )
}
