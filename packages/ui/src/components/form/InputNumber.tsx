import { forwardRef, useState, type HTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export interface InputNumberProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  controls?: boolean
  precision?: number
  placeholder?: string
  onChange?: (value: number | null) => void
}

export const InputNumber = forwardRef<HTMLDivElement, InputNumberProps>(function InputNumber(
  {
    className,
    value: controlledValue,
    defaultValue,
    min = -Infinity,
    max = Infinity,
    step = 1,
    disabled = false,
    size = 'md',
    controls = true,
    precision,
    placeholder,
    onChange,
    ...props
  },
  ref,
) {
  const [internal, setInternal] = useState<number | null>(defaultValue ?? null)
  const val = controlledValue ?? internal

  const clamp = (n: number) => {
    let v = Math.max(min, Math.min(max, n))
    if (precision !== undefined) v = Number(v.toFixed(precision))
    return v
  }

  const update = (n: number | null) => {
    const clamped = n !== null ? clamp(n) : null
    setInternal(clamped)
    onChange?.(clamped)
  }

  const heightCls = { 'h-8': size === 'sm', 'h-10': size === 'md', 'h-11': size === 'lg' }

  return (
    <div
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-md border border-slate-300 bg-white transition focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20 dark:border-slate-600 dark:bg-slate-800',
        disabled && 'cursor-not-allowed opacity-60',
        heightCls,
        className,
      )}
      {...props}
    >
      {controls ? (
        <button
          type="button"
          disabled={disabled || (val !== null && val <= min)}
          onClick={() => update((val ?? 0) - step)}
          className="shrink-0 border-r border-slate-300 px-2 text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-40 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          −
        </button>
      ) : null}
      <input
        type="text"
        inputMode="decimal"
        value={val ?? ''}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => {
          const raw = e.target.value
          if (raw === '' || raw === '-') { update(null); return }
          const n = Number(raw)
          if (!isNaN(n)) update(n)
        }}
        onBlur={() => { if (val !== null) update(clamp(val)) }}
        className="w-16 min-w-0 flex-1 bg-transparent px-2 text-center text-sm outline-none dark:text-slate-100"
      />
      {controls ? (
        <button
          type="button"
          disabled={disabled || (val !== null && val >= max)}
          onClick={() => update((val ?? 0) + step)}
          className="shrink-0 border-l border-slate-300 px-2 text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-40 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          +
        </button>
      ) : null}
    </div>
  )
})
