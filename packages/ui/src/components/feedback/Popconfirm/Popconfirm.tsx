import {
  cloneElement,
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react'
import { cn } from '../../../utils/cn'

export interface PopconfirmProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode
  description?: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onConfirm?: () => void
  onCancel?: () => void
  onOpenChange?: (open: boolean) => void
  okText?: string
  cancelText?: string
  children: ReactElement
}

export const Popconfirm = forwardRef<HTMLDivElement, PopconfirmProps>(function Popconfirm(
  {
    className,
    title,
    description,
    open: controlledOpen,
    defaultOpen = false,
    onConfirm,
    onCancel,
    onOpenChange,
    okText = '确定',
    cancelText = '取消',
    children,
    ...props
  },
  ref,
) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isOpen = controlledOpen ?? internalOpen
  const wrapperRef = useRef<HTMLDivElement>(null)
  const popupId = useId()
  const titleId = useId()
  const descriptionId = useId()

  const setOpen = useCallback(
    (val: boolean) => {
      setInternalOpen(val)
      onOpenChange?.(val)
    },
    [onOpenChange],
  )

  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, setOpen])

  const trigger = cloneElement(children, {
    'aria-controls': isOpen ? popupId : undefined,
    'aria-expanded': isOpen,
    'aria-haspopup': 'dialog',
  })

  return (
    <div ref={wrapperRef} className={cn('relative inline-block', className)} {...props}>
      <div onClick={() => setOpen(!isOpen)}>{trigger}</div>
      {isOpen ? (
        <div
          ref={ref}
          id={popupId}
          role="dialog"
          aria-labelledby={titleId}
          aria-describedby={description ? descriptionId : undefined}
          className="absolute bottom-full left-1/2 z-50 mb-2 w-56 -translate-x-1/2 rounded-lg border border-slate-200 bg-white p-4 shadow-lg dark:border-slate-700 dark:bg-slate-800"
        >
          <div className="mb-1 flex items-start gap-2">
            <span className="mt-0.5 text-amber-500" aria-hidden="true">
              ⚠️
            </span>
            <div>
              <div id={titleId} className="text-sm font-medium text-slate-900 dark:text-slate-100">
                {title}
              </div>
              {description ? (
                <div id={descriptionId} className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {description}
                </div>
              ) : null}
            </div>
          </div>
          <div className="mt-3 flex justify-end gap-2">
            <button
              type="button"
              className="rounded border border-slate-300 px-3 py-1 text-xs text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
              onClick={() => {
                setOpen(false)
                onCancel?.()
              }}
            >
              {cancelText}
            </button>
            <button
              type="button"
              className="rounded bg-brand-500 px-3 py-1 text-xs text-white hover:bg-brand-600"
              onClick={() => {
                setOpen(false)
                onConfirm?.()
              }}
            >
              {okText}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
})
