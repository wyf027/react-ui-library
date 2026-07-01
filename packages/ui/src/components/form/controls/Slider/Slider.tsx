import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '../../../../utils/cn'
import { useControllableState } from '../../../../utils/useControllableState'

export interface SliderProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'defaultValue' | 'onChange'> {
  min?: number
  max?: number
  step?: number
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
  showValue?: boolean
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(function Slider(
  {
    className,
    min = 0,
    max = 100,
    step = 1,
    value,
    defaultValue = 0,
    onChange,
    showValue = true,
    disabled,
    ...props
  },
  ref,
) {
  const [innerValue, setInnerValue] = useControllableState<number>({
    value,
    defaultValue,
    onChange,
  })

  return (
    <div className="flex items-center gap-3">
      <input
        ref={ref}
        type="range"
        min={min}
        max={max}
        step={step}
        value={innerValue}
        disabled={disabled}
        onChange={(event) => setInnerValue(Number(event.target.value))}
        className={cn('h-2 w-full cursor-pointer accent-brand-500', className)}
        {...props}
      />
      {showValue ? <span className="w-10 text-right text-sm text-slate-600 dark:text-slate-300">{innerValue}</span> : null}
    </div>
  )
})
