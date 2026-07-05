import { forwardRef, useEffect, useRef } from 'react'

import { Portal } from '../../../../utils/portal'
import { useEscapeKey } from '../../../../hooks/useEscapeKey'
import { useClickOutside } from '../../../../hooks/useClickOutside'
import { useLockBodyScroll } from '../../../../hooks/useLockBodyScroll'

import type { ModalProps } from './Modal.types'
import { ModalDialog } from './parts/ModalDialog'

export const Modal = forwardRef<HTMLDivElement, ModalProps>(function Modal(
  { className, open = false, onClose, title, children, ...props },
  _ref,
) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const lastActiveElementRef = useRef<HTMLElement | null>(null)
  useEscapeKey(() => onClose?.(), open)
  useClickOutside(panelRef, () => onClose?.(), open)
  useLockBodyScroll(open)

  useEffect(() => {
    if (!open) return

    lastActiveElementRef.current = document.activeElement as HTMLElement | null
    closeButtonRef.current?.focus()

    return () => {
      lastActiveElementRef.current?.focus()
    }
  }, [open])

  if (!open) {
    return null
  }

  return (
    <Portal>
      <ModalDialog
        panelRef={panelRef}
        closeButtonRef={closeButtonRef}
        title={title}
        onClose={onClose}
        className={className}
        dialogProps={props}
      >
        {children}
      </ModalDialog>
    </Portal>
  )
})
