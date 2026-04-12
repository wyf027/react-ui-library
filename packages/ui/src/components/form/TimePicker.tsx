import { forwardRef, useState, useRef, useEffect, type HTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

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
    size = 'md',
    ...props
  },
  ref,
) {
  const [internal, setInternal] = useState(defaultValue)
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const val = controlledValue ?? internal

  const update = (v: string) => {
    setInternal(v)
    onChange?.(v)
  }

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  })

  const hours = Array.from({ length: format === '24' ? 24 : 12 }, (_, i) => format === '24' ? i : i + 1)
  const minutes = Array.from({ length: 60 }, (_, i) => i)

  const [selH, selM] = val ? val.split(':').map(Number) : [null, null]

  const heightCls = { 'h-8': size === 'sm', 'h-10': size === 'md', 'h-11': size === 'lg' }

  return (
    <div ref={wrapperRef} className={cn('relative inline-block', className)} {...props}>
      <div
        ref={ref}
        className={cn(
          'inline-flex w-40 cursor-pointer items-center rounded-md border border-slate-300 bg-white px-3 text-sm transition dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100',
          heightCls,
          disabled && 'cursor-not-allowed opacity-60',
        )}
        onClick={() => !disabled && setOpen(!open)}
      >
        <span className={val ? '' : 'text-slate-400'}>{val || placeholder}</span>
        <span className="ml-auto text-slate-400">🕐</span>
      </div>
      {open ? (
        <div className="absolute z-50 mt-1 flex rounded-md border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800">
          <div className="h-48 w-14 overflow-auto border-r border-slate-200 py-1 dark:border-slate-700">
            {hours.map((h) => (
              <div
                key={h}
                className={cn(
                  'cursor-pointer px-2 py-1 text-center text-sm hover:bg-brand-50 dark:hover:bg-brand-900/20',
                  selH === h && 'bg-brand-500 text-white hover:bg-brand-600',
                )}
                onMouseDown={() => {
                  const m = selM ?? 0
                  update(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)
                }}
              >
                {String(h).padStart(2, '0')}
              </div>
            ))}
          </div>
          <div className="h-48 w-14 overflow-auto py-1">
            {minutes.map((m) => (
              <div
                key={m}
                className={cn(
                  'cursor-pointer px-2 py-1 text-center text-sm hover:bg-brand-50 dark:hover:bg-brand-900/20',
                  selM === m && 'bg-brand-500 text-white hover:bg-brand-600',
                )}
                onMouseDown={() => {
                  const h = selH ?? 0
                  update(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)
                  setOpen(false)
                }}
              >
                {String(m).padStart(2, '0')}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
})
