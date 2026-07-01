import { forwardRef, useState, useRef, useEffect, type InputHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export interface AutoCompleteOption {
  value: string
  label?: string
}

export interface AutoCompleteProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onSelect'> {
  options?: AutoCompleteOption[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  onSelect?: (value: string) => void
  filterOption?: boolean | ((input: string, option: AutoCompleteOption) => boolean)
  allowClear?: boolean
}

export const AutoComplete = forwardRef<HTMLInputElement, AutoCompleteProps>(function AutoComplete(
  {
    className,
    options = [],
    value: controlledValue,
    defaultValue = '',
    onChange,
    onSelect,
    filterOption = true,
    allowClear = false,
    placeholder,
    ...props
  },
  ref,
) {
  const [internal, setInternal] = useState(defaultValue)
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const val = controlledValue ?? internal

  const filtered = options.filter((opt) => {
    if (!filterOption) return true
    if (typeof filterOption === 'function') return filterOption(val, opt)
    return (opt.label ?? opt.value).toLowerCase().includes(val.toLowerCase())
  })

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

  return (
    <div ref={wrapperRef} className={cn('relative inline-block w-full', className)}>
      <div className="relative">
        <input
          ref={ref}
          value={val}
          placeholder={placeholder}
          onChange={(e) => {
            update(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
          {...props}
        />
        {allowClear && val ? (
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            onClick={() => { update(''); setOpen(false) }}
          >
            ✕
          </button>
        ) : null}
      </div>
      {open && filtered.length > 0 ? (
        <ul className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-800">
          {filtered.map((opt) => (
            <li
              key={opt.value}
              className="cursor-pointer px-3 py-2 text-sm hover:bg-brand-50 dark:hover:bg-brand-900/20"
              onMouseDown={() => {
                update(opt.value)
                onSelect?.(opt.value)
                setOpen(false)
              }}
            >
              {opt.label ?? opt.value}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
})
