import { forwardRef, useEffect, useId, useRef, useState, type HTMLAttributes } from 'react'
import { cn } from '../../../../utils/cn'

export interface TimePickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string
  defaultValue?: string
  format?: '12' | '24'
  disabled?: boolean
  placeholder?: string
  onChange?: (value: string) => void
  size?: 'sm' | 'md' | 'lg'
}

export const TimePicker = forwardRef<HTMLDivElement, TimePickerProps>(function TimePicker(
  {
    className,
    value: controlledValue,
    defaultValue = '',
    format = '24',
    disabled = false,
    placeholder = '选择时间',
    onChange,
    onKeyDown,
    id,
    'aria-describedby': ariaDescribedBy,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    size = 'md',
    ...props
  },
  ref,
) {
  const [internal, setInternal] = useState(defaultValue)
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const panelId = useId()
  const val = controlledValue ?? internal

  const update = (v: string) => {
    setInternal(v)
    onChange?.(v)
  }

  const closePanel = () => setOpen(false)

  const togglePanel = () => {
    if (!disabled) setOpen((current) => !current)
  }

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) closePanel()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  })

  const hours = Array.from({ length: format === '24' ? 24 : 12 }, (_, i) =>
    format === '24' ? i : i + 1,
  )
  const minutes = Array.from({ length: 60 }, (_, i) => i)

  const [selH, selM] = val ? val.split(':').map(Number) : [null, null]

  const heightCls = { 'h-8': size === 'sm', 'h-10': size === 'md', 'h-11': size === 'lg' }
  const formatTime = (hour: number, minute: number) =>
    `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`

  return (
    <div ref={wrapperRef} className={cn('relative inline-block', className)} {...props}>
      <div
        id={id}
        ref={ref}
        role="combobox"
        tabIndex={disabled ? -1 : 0}
        aria-describedby={ariaDescribedBy}
        aria-label={ariaLabel ?? (ariaLabelledBy ? undefined : placeholder)}
        aria-labelledby={ariaLabelledBy}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls={open ? panelId : undefined}
        aria-disabled={disabled || undefined}
        className={cn(
          'nova-focus-ring inline-flex w-40 cursor-pointer items-center rounded-md border border-slate-300 bg-white px-3 text-sm transition dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100',
          heightCls,
          disabled && 'cursor-not-allowed opacity-60',
        )}
        onClick={togglePanel}
        onKeyDown={(event) => {
          onKeyDown?.(event)
          if (event.defaultPrevented || disabled) return

          if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
            event.preventDefault()
            setOpen(true)
            return
          }

          if (event.key === 'Escape') {
            event.preventDefault()
            closePanel()
          }
        }}
      >
        <span className={val ? '' : 'text-slate-400'}>{val || placeholder}</span>
        <span className="ml-auto text-slate-400">🕐</span>
      </div>
      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-label="Time picker panel"
          className="absolute z-50 mt-1 flex rounded-md border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800"
        >
          <div
            role="group"
            aria-label="Hours"
            className="h-48 w-14 overflow-auto border-r border-slate-200 py-1 dark:border-slate-700"
          >
            {hours.map((h) => (
              <button
                key={h}
                type="button"
                aria-pressed={selH === h}
                className={cn(
                  'block w-full cursor-pointer px-2 py-1 text-center text-sm hover:bg-brand-50 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:hover:bg-brand-900/20',
                  selH === h && 'bg-brand-500 text-white hover:bg-brand-600',
                )}
                onClick={() => {
                  const m = selM ?? 0
                  update(formatTime(h, m))
                }}
              >
                {String(h).padStart(2, '0')}
              </button>
            ))}
          </div>
          <div role="group" aria-label="Minutes" className="h-48 w-14 overflow-auto py-1">
            {minutes.map((m) => (
              <button
                key={m}
                type="button"
                aria-pressed={selM === m}
                className={cn(
                  'block w-full cursor-pointer px-2 py-1 text-center text-sm hover:bg-brand-50 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:hover:bg-brand-900/20',
                  selM === m && 'bg-brand-500 text-white hover:bg-brand-600',
                )}
                onClick={() => {
                  const h = selH ?? hours[0] ?? 0
                  update(formatTime(h, m))
                  closePanel()
                }}
              >
                {String(m).padStart(2, '0')}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
})
