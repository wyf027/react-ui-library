import {
  forwardRef,
  useCallback,
  useLayoutEffect,
  useRef,
  type MutableRefObject,
  type Ref,
} from 'react'

import { Portal } from '../../../../utils/portal'
import { useEscapeKey } from '../../../../hooks/useEscapeKey'
import { useClickOutside } from '../../../../hooks/useClickOutside'

import type { ModalProps } from './Modal.types'
import { ModalDialog } from './parts/ModalDialog'

function assignRef<T>(ref: Ref<T> | undefined, value: T | null) {
  if (!ref) {
    return
  }
  if (typeof ref === 'function') {
    ref(value)
  } else {
    ;(ref as MutableRefObject<T | null>).current = value
  }
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(function Modal(
  {
    className,
    open = false,
    onClose,
    title,
    children,
    maskClosable = true,
    keyboard = true,
    ...props
  },
  forwardedRef,
) {
  const internalPanelRef = useRef<HTMLDivElement | null>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const setPanelRef = useCallback(
    (node: HTMLDivElement | null) => {
      internalPanelRef.current = node
      assignRef(forwardedRef, node)
    },
    [forwardedRef],
  )

  useEscapeKey(() => onClose?.(), open && keyboard)
  useClickOutside(internalPanelRef, () => onClose?.(), open && maskClosable)

  useLayoutEffect(() => {
    if (!open) {
      return undefined
    }

    const active = document.activeElement
    if (active instanceof HTMLElement && document.body.contains(active)) {
      previousFocusRef.current = active
    }

    const frame = requestAnimationFrame(() => {
      internalPanelRef.current?.focus({ preventScroll: true })
    })

    return () => {
      cancelAnimationFrame(frame)
      const restore = previousFocusRef.current
      previousFocusRef.current = null
      restore?.focus?.({ preventScroll: true })
    }
  }, [open])

  if (!open) {
    return null
  }

  return (
    <Portal>
      <ModalDialog panelRef={setPanelRef} title={title} onClose={onClose} className={className} dialogProps={props}>
        {children}
      </ModalDialog>
    </Portal>
  )
})
