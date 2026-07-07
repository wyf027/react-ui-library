import { forwardRef, type HTMLAttributes, useEffect, useId, useLayoutEffect, useRef } from 'react'

import { DialogHeader } from '../../../_internal/DialogHeader'
import { useEscapeKey } from '../../../../hooks/useEscapeKey'
import { useLockBodyScroll } from '../../../../hooks/useLockBodyScroll'
import { Portal } from '../../../../utils/portal'
import { cn } from '../../../../utils/cn'

export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom'

export interface DrawerProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean
  onClose?: () => void
  placement?: DrawerPlacement
  title?: string
}

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

const placementClassName: Record<DrawerPlacement, string> = {
  left: 'left-0 top-0 h-full w-80',
  right: 'right-0 top-0 h-full w-80',
  top: 'left-0 right-0 top-0 h-80 w-full',
  bottom: 'bottom-0 left-0 right-0 h-80 w-full',
}

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(function Drawer(
  { className, open = false, onClose, placement = 'right', title, children, ...props },
  ref,
) {
  const titleId = useId()
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const lastActiveElementRef = useRef<HTMLElement | null>(null)

  useEscapeKey(() => onClose?.(), open)
  useLockBodyScroll(open)

  useLayoutEffect(() => {
    if (!open) {
      return
    }

    lastActiveElementRef.current = document.activeElement as HTMLElement | null
    closeButtonRef.current?.focus()

    return () => {
      lastActiveElementRef.current?.focus()
    }
  }, [open])

  useEffect(() => {
    if (!open) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') {
        return
      }

      const drawer = closeButtonRef.current?.closest<HTMLElement>('[role="dialog"]')
      if (!drawer) {
        return
      }

      const focusableElements = Array.from(
        drawer.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((element) => element.getAttribute('aria-hidden') !== 'true')

      if (focusableElements.length === 0) {
        event.preventDefault()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]
      const activeElement = document.activeElement as HTMLElement | null

      if (event.shiftKey) {
        if (activeElement === firstElement || !drawer.contains(activeElement)) {
          event.preventDefault()
          lastElement.focus()
        }
        return
      }

      if (activeElement === lastElement || !drawer.contains(activeElement)) {
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
      <div className="fixed inset-0 z-50 bg-black/40" onClick={onClose}>
        <aside
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? titleId : undefined}
          className={cn(
            'absolute bg-white p-5 shadow-2xl dark:bg-slate-900',
            placementClassName[placement],
            className,
          )}
          onClick={(event) => event.stopPropagation()}
          {...props}
        >
          <DialogHeader
            title={title}
            titleId={titleId}
            closeButtonRef={closeButtonRef}
            closeButtonAutoFocus
            onClose={onClose}
            contentClassName="mb-4"
            closeAriaLabel="Close drawer"
          />
          {children}
        </aside>
      </div>
    </Portal>
  )
})
