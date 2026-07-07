import {
  forwardRef,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { cn } from '../../../../utils/cn'

export interface PopoverProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  trigger: ReactNode
  content: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpen?: () => void
  onClose?: () => void
}

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(function Popover(
  {
    className,
    trigger,
    content,
    open: controlledOpen,
    defaultOpen = false,
    onOpen,
    onClose,
    onKeyDown,
    'aria-label': ariaLabel,
    ...props
  },
  ref,
) {
  const [innerOpen, setInnerOpen] = useState(defaultOpen)
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const popoverId = useId()
  const open = controlledOpen ?? innerOpen

  useImperativeHandle(ref, () => rootRef.current as HTMLDivElement, [])

  const setOpen = useCallback(
    (next: boolean) => {
      if (controlledOpen === undefined) {
        setInnerOpen(next)
      }
      if (next) {
        onOpen?.()
      } else {
        onClose?.()
      }
    },
    [controlledOpen, onClose, onOpen],
  )

  const handleToggle = () => {
    setOpen(!open)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event)

    if (event.defaultPrevented) {
      return
    }

    if (event.key !== 'Escape' || !open) {
      return
    }

    setOpen(false)
    triggerRef.current?.focus()
  }

  useEffect(() => {
    if (!open) {
      return
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
    }
  }, [open, setOpen])

  return (
    <div
      ref={rootRef}
      className={cn('relative inline-flex', className)}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <button
        ref={triggerRef}
        type="button"
        onClick={handleToggle}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls={open ? popoverId : undefined}
        className="inline-flex"
      >
        {trigger}
      </button>
      {open ? (
        <div
          id={popoverId}
          role="dialog"
          aria-label={ariaLabel ?? 'Popover content'}
          className="absolute left-0 top-full z-40 mt-2 min-w-48 rounded-lg border border-slate-200 bg-white p-3 text-sm shadow-lg dark:border-slate-700 dark:bg-slate-900"
        >
          {content}
        </div>
      ) : null}
    </div>
  )
})
