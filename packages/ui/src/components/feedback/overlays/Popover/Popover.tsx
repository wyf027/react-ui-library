import { forwardRef, type HTMLAttributes, type ReactNode, useState } from 'react'
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
    ...props
  },
  ref,
) {
  const [innerOpen, setInnerOpen] = useState(defaultOpen)
  const open = controlledOpen ?? innerOpen

  const handleToggle = () => {
    const next = !open
    if (controlledOpen === undefined) {
      setInnerOpen(next)
    }
    if (next) {
      onOpen?.()
    } else {
      onClose?.()
    }
  }

  return (
    <div ref={ref} className={cn('relative inline-flex', className)} {...props}>
      <button type="button" onClick={handleToggle} className="inline-flex">
        {trigger}
      </button>
      {open ? (
        <div className="absolute left-0 top-full z-40 mt-2 min-w-48 rounded-lg border border-slate-200 bg-white p-3 text-sm shadow-lg dark:border-slate-700 dark:bg-slate-900">
          {content}
        </div>
      ) : null}
    </div>
  )
})
