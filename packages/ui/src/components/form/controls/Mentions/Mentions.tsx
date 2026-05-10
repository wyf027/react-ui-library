import { forwardRef, type TextareaHTMLAttributes, useMemo } from 'react'
import { cn } from '../../../../utils/cn'
import { useControllableState } from '../../../../utils/useControllableState'

export interface MentionsOption {
  value: string
  label?: string
}

export interface MentionsProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'defaultValue' | 'onChange'> {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  options?: MentionsOption[]
}

export const Mentions = forwardRef<HTMLTextAreaElement, MentionsProps>(function Mentions(
  {
    className,
    value,
    defaultValue = '',
    onChange,
    options = [],
    placeholder = 'Type @ to mention...',
    ...props
  },
  ref,
) {
  const [innerValue, setInnerValue] = useControllableState<string>({
    value,
    defaultValue,
    onChange,
  })

  const hint = useMemo(() => options.map((opt) => `@${opt.value}`).join('  '), [options])

  return (
    <div className="space-y-1">
      <textarea
        ref={ref}
        value={innerValue}
        onChange={(event) => setInnerValue(event.target.value)}
        placeholder={placeholder}
        className={cn('nova-focus-ring min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100', className)}
        {...props}
      />
      {hint ? <div className="text-xs text-slate-500 dark:text-slate-400">Suggestions: {hint}</div> : null}
    </div>
  )
})
