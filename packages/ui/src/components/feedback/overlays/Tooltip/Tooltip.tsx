import {
  cloneElement,
  forwardRef,
  isValidElement,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
  useId,
  useState,
} from 'react'
import { cn } from '../../../../utils/cn'

export type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left'

export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  content: ReactNode
  disabled?: boolean
  placement?: TooltipPlacement
}

const tooltipPlacementClasses: Record<TooltipPlacement, string> = {
  top: 'bottom-full left-1/2 mb-2 -translate-x-1/2',
  right: 'left-full top-1/2 ml-2 -translate-y-1/2',
  bottom: 'left-1/2 top-full mt-2 -translate-x-1/2',
  left: 'right-full top-1/2 mr-2 -translate-y-1/2',
}

function mergeAriaDescribedBy(...ids: Array<string | undefined>) {
  return ids
    .flatMap((id) => id?.split(/\s+/) ?? [])
    .filter(Boolean)
    .join(' ')
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(function Tooltip(
  { className, content, children, disabled, placement = 'bottom', onKeyDown, ...props },
  ref,
) {
  const tooltipId = useId()
  const [open, setOpen] = useState(false)
  const describedBy = open && !disabled ? tooltipId : undefined
  const trigger = isValidElement<Record<string, unknown>>(children)
    ? cloneElement(children, {
        'aria-describedby':
          mergeAriaDescribedBy(
            typeof children.props['aria-describedby'] === 'string'
              ? children.props['aria-describedby']
              : undefined,
            describedBy,
          ) || undefined,
      })
    : children

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event)

    if (event.defaultPrevented) {
      return
    }

    if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div
      ref={ref}
      className={cn('relative inline-flex', className)}
      onMouseEnter={() => !disabled && setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => !disabled && setOpen(true)}
      onBlur={() => setOpen(false)}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {trigger}
      {open ? (
        <div
          id={tooltipId}
          role="tooltip"
          className={cn(
            'absolute z-40 rounded bg-slate-900 px-2 py-1 text-xs text-white',
            tooltipPlacementClasses[placement],
          )}
        >
          {content}
        </div>
      ) : null}
    </div>
  )
})
