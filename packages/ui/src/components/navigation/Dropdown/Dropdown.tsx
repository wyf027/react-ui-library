import {
  forwardRef,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useClickOutside } from '../../../hooks/useClickOutside'
import { cn } from '../../../utils/cn'

export interface DropdownOption {
  key: string
  label: ReactNode
  disabled?: boolean
}

export interface DropdownProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  trigger: ReactNode
  options: DropdownOption[]
  onChange?: (key: string) => void
  open?: boolean
  defaultOpen?: boolean
  onOpen?: () => void
  onClose?: () => void
}

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(function Dropdown(
  {
    className,
    trigger,
    options,
    onChange,
    open: controlledOpen,
    defaultOpen = false,
    onOpen,
    onClose,
    onKeyDown,
    ...props
  },
  ref,
) {
  const [innerOpen, setInnerOpen] = useState(defaultOpen)
  const [activeIndex, setActiveIndex] = useState(-1)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const optionRefs = useRef(new Map<string, HTMLButtonElement>())
  const menuId = useId()
  const open = controlledOpen ?? innerOpen
  const enabledOptions = useMemo(() => options.filter((item) => !item.disabled), [options])

  const setOpen = (next: boolean) => {
    if (controlledOpen === undefined) {
      setInnerOpen(next)
    }
    if (next) {
      onOpen?.()
    } else {
      onClose?.()
    }
  }

  useClickOutside(rootRef, () => setOpen(false), open)

  const setCombinedRef = (node: HTMLDivElement | null) => {
    rootRef.current = node
    if (typeof ref === 'function') {
      ref(node)
      return
    }
    if (ref) {
      ;(ref as { current: HTMLDivElement | null }).current = node
    }
  }

  useEffect(() => {
    if (!open) {
      setActiveIndex(-1)
      return
    }
    setActiveIndex((current) => (current >= 0 ? current : 0))
  }, [open])

  const focusOption = (option?: DropdownOption) => {
    if (!option) {
      return
    }

    requestAnimationFrame(() => {
      optionRefs.current.get(option.key)?.focus()
    })
  }

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setOpen(true)
      setActiveIndex(0)
      focusOption(enabledOptions[0])
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setOpen(true)
      setActiveIndex(enabledOptions.length - 1)
      focusOption(enabledOptions[enabledOptions.length - 1])
    }
  }

  const handleMenuKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      setOpen(false)
      triggerRef.current?.focus()
      return
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (enabledOptions.length > 0) {
        setActiveIndex((prev) => {
          const next = (prev + 1) % enabledOptions.length
          focusOption(enabledOptions[next])
          return next
        })
      }
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (enabledOptions.length > 0) {
        setActiveIndex((prev) => {
          const next = (prev - 1 + enabledOptions.length) % enabledOptions.length
          focusOption(enabledOptions[next])
          return next
        })
      }
    }
  }

  const handleRootKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event)

    if (event.defaultPrevented) {
      return
    }

    if (event.key === 'Escape' && open) {
      setOpen(false)
      triggerRef.current?.focus()
    }
  }

  return (
    <div
      ref={setCombinedRef}
      className={cn('relative inline-flex', className)}
      onKeyDown={handleRootKeyDown}
      {...props}
    >
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(!open)}
        onKeyDown={handleTriggerKeyDown}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        className="inline-flex"
      >
        {trigger}
      </button>
      {open ? (
        <ul
          id={menuId}
          role="menu"
          onKeyDown={handleMenuKeyDown}
          className="absolute right-0 top-full z-40 mt-2 min-w-40 rounded-lg border border-slate-200 bg-white p-1 shadow-lg dark:border-slate-700 dark:bg-slate-900"
        >
          {options.map((item) => (
            <li key={item.key} role="none">
              <button
                type="button"
                role="menuitem"
                ref={(node) => {
                  if (node) {
                    optionRefs.current.set(item.key, node)
                  } else {
                    optionRefs.current.delete(item.key)
                  }
                }}
                tabIndex={enabledOptions[activeIndex]?.key === item.key ? 0 : -1}
                disabled={item.disabled}
                onClick={() => {
                  onChange?.(item.key)
                  setOpen(false)
                  triggerRef.current?.focus()
                }}
                className="nova-focus-ring w-full rounded px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 disabled:opacity-50 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
})
