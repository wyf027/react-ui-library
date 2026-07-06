import { forwardRef, useEffect, useRef } from 'react'

import { Portal } from '../../../../utils/portal'
import { useEscapeKey } from '../../../../hooks/useEscapeKey'
import { useClickOutside } from '../../../../hooks/useClickOutside'
import { useLockBodyScroll } from '../../../../hooks/useLockBodyScroll'

import type { ModalProps } from './Modal.types'
import { ModalDialog } from './parts/ModalDialog'

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

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

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return

      const panel = panelRef.current
      if (!panel) return

      const focusableElements = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((element) => element.getAttribute('aria-hidden') !== 'true')

      if (focusableElements.length === 0) {
        event.preventDefault()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]
      const activeElement = document.activeElement as HTMLElement | null

      if (event.shiftKey) {
        if (activeElement === firstElement || !panel.contains(activeElement)) {
          event.preventDefault()
          lastElement.focus()
        }
        return
      }

      if (activeElement === lastElement || !panel.contains(activeElement)) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
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
