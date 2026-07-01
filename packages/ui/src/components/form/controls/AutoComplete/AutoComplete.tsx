import { forwardRef, useEffect, useId, useRef, useState, type InputHTMLAttributes } from 'react'
import { cn } from '../../../../utils/cn'

export interface AutoCompleteOption {
  value: string
  label?: string
}

export interface AutoCompleteProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'onSelect'
> {
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
    onFocus,
    onKeyDown,
    filterOption = true,
    allowClear = false,
    placeholder,
    ...props
  },
  ref,
) {
  const [internal, setInternal] = useState(defaultValue)
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const generatedId = useId()
  const listboxId = `${generatedId}-listbox`
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

  const isListOpen = open && filtered.length > 0
  const activeOption = isListOpen && activeIndex >= 0 ? filtered[activeIndex] : undefined

  const getOptionId = (index: number) => `${generatedId}-option-${index}`

  const selectOption = (option: AutoCompleteOption) => {
    update(option.value)
    onSelect?.(option.value)
    setOpen(false)
    setActiveIndex(-1)
  }

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  })

  useEffect(() => {
    if (!isListOpen) {
      setActiveIndex(-1)
      return
    }

    setActiveIndex((current) => {
      if (current >= 0 && current < filtered.length) return current
      return 0
    })
  }, [filtered.length, isListOpen])

  return (
    <div ref={wrapperRef} className={cn('relative inline-block w-full', className)}>
      <div className="relative">
        <input
          ref={ref}
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={isListOpen}
          aria-controls={isListOpen ? listboxId : undefined}
          aria-activedescendant={activeOption ? getOptionId(activeIndex) : undefined}
          value={val}
          placeholder={placeholder}
          onChange={(e) => {
            update(e.target.value)
            setOpen(true)
            setActiveIndex(0)
          }}
          onFocus={(event) => {
            onFocus?.(event)
            setOpen(true)
          }}
          onKeyDown={(event) => {
            onKeyDown?.(event)
            if (event.defaultPrevented) return

            if (event.key === 'ArrowDown') {
              event.preventDefault()
              if (filtered.length === 0) return
              setOpen(true)
              setActiveIndex((current) => (current < 0 ? 0 : (current + 1) % filtered.length))
              return
            }

            if (event.key === 'ArrowUp') {
              event.preventDefault()
              if (filtered.length === 0) return
              setOpen(true)
              setActiveIndex((current) =>
                current < 0
                  ? filtered.length - 1
                  : (current - 1 + filtered.length) % filtered.length,
              )
              return
            }

            if (event.key === 'Enter' && activeOption) {
              event.preventDefault()
              selectOption(activeOption)
              return
            }

            if (event.key === 'Escape') {
              setOpen(false)
              setActiveIndex(-1)
            }
          }}
          className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
          {...props}
        />
        {allowClear && val ? (
          <button
            type="button"
            aria-label="Clear input"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => {
              update('')
              setOpen(false)
              setActiveIndex(-1)
            }}
          >
            ✕
          </button>
        ) : null}
      </div>
      {isListOpen ? (
        <ul
          id={listboxId}
          role="listbox"
          className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-800"
        >
          {filtered.map((opt, index) => (
            <li
              key={opt.value}
              id={getOptionId(index)}
              role="option"
              aria-selected={index === activeIndex}
              className={cn(
                'cursor-pointer px-3 py-2 text-sm hover:bg-brand-50 dark:hover:bg-brand-900/20',
                index === activeIndex && 'bg-brand-50 dark:bg-brand-900/20',
              )}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseDown={() => {
                selectOption(opt)
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
