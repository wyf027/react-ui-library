import { forwardRef, useRef } from 'react'

import { Portal } from '../../../../utils/portal'
import { useEscapeKey } from '../../../../hooks/useEscapeKey'
import { useClickOutside } from '../../../../hooks/useClickOutside'

import type { ModalProps } from './Modal.types'
import { ModalDialog } from './parts/ModalDialog'

export const Modal = forwardRef<HTMLDivElement, ModalProps>(function Modal(
  { className, open = false, onClose, title, children, ...props },
  _ref,
) {
  const panelRef = useRef<HTMLDivElement>(null)
  useEscapeKey(() => onClose?.(), open)
  useClickOutside(panelRef, () => onClose?.(), open)

  if (!open) {
    return null
  }

  return (
    <Portal>
      <ModalDialog panelRef={panelRef} title={title} onClose={onClose} className={className} dialogProps={props}>
        {children}
      </ModalDialog>
    </Portal>
  )
})
