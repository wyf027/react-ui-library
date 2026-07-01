import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '../../../../utils/cn'
import { useControllableState } from '../../../../utils/useControllableState'

export interface ColorPickerProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'defaultValue' | 'onChange'> {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  showValue?: boolean
}

export const ColorPicker = forwardRef<HTMLInputElement, ColorPickerProps>(function ColorPicker(
  {
    className,
    value,
    defaultValue = '#2459ff',
    onChange,
    showValue = true,
    disabled,
    ...props
  },
  ref,
) {
  const [innerValue, setInnerValue] = useControllableState<string>({
    value,
    defaultValue,
    onChange,
  })

  return (
    <div className="flex items-center gap-2">
      <input
        ref={ref}
        type="color"
        value={innerValue}
        disabled={disabled}
        onChange={(event) => setInnerValue(event.target.value)}
        className={cn('h-10 w-12 cursor-pointer rounded border border-slate-300 bg-transparent p-1 dark:border-slate-700', className)}
        {...props}
      />
      {showValue ? <span className="font-mono text-sm text-slate-600 dark:text-slate-300">{innerValue}</span> : null}
    </div>
  )
})
