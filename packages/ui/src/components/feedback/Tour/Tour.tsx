import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../../utils/cn'
import { useControllableState } from '../../../utils/useControllableState'

export interface TourStep {
  key: string
  title: ReactNode
  description?: ReactNode
}

export interface TourProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  steps: TourStep[]
  open?: boolean
  defaultOpen?: boolean
  current?: number
  defaultCurrent?: number
  onClose?: () => void
  onChange?: (current: number) => void
}

export const Tour = forwardRef<HTMLDivElement, TourProps>(function Tour(
  {
    className,
    steps,
    open,
    defaultOpen = false,
    current,
    defaultCurrent = 0,
    onClose,
    onChange,
    ...props
  },
  ref,
) {
  const [isOpen, setIsOpen] = useControllableState<boolean>({
    value: open,
    defaultValue: defaultOpen,
  })
  const [index, setIndex] = useControllableState<number>({
    value: current,
    defaultValue: defaultCurrent,
    onChange,
  })

  if (!isOpen || steps.length === 0) return null

  const step = steps[Math.max(0, Math.min(steps.length - 1, index))]

  return (
    <div ref={ref} className={cn('fixed inset-0 z-[100] bg-black/30 p-4', className)} {...props}>
      <div className="mx-auto mt-20 max-w-md rounded-xl bg-white p-4 shadow-xl dark:bg-slate-900">
        <p className="text-xs text-slate-500">Step {index + 1} / {steps.length}</p>
        <h3 className="mt-1 text-base font-semibold text-slate-900 dark:text-slate-100">{step.title}</h3>
        {step.description ? <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{step.description}</p> : null}
        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            disabled={index <= 0}
            onClick={() => setIndex(index - 1)}
            className="rounded border px-3 py-1 text-sm disabled:opacity-40"
          >
            Prev
          </button>
          <div className="space-x-2">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false)
                onClose?.()
              }}
              className="rounded border px-3 py-1 text-sm"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                if (index >= steps.length - 1) {
                  setIsOpen(false)
                  onClose?.()
                } else {
                  setIndex(index + 1)
                }
              }}
              className="rounded bg-brand-500 px-3 py-1 text-sm text-white"
            >
              {index >= steps.length - 1 ? 'Done' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
})
