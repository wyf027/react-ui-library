import {
  createContext,
  cloneElement,
  forwardRef,
  isValidElement,
  type FormHTMLAttributes,
  type ReactElement,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { cn } from '../../utils/cn'

export type FormValues = Record<string, unknown>
export type ValidateTrigger = 'onSubmit' | 'onChange' | 'onBlur'

export interface FormRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  when?: (values: FormValues) => boolean
  deps?: string[]
  message?: string
  validator?: (value: unknown, values: FormValues) => string | null
}

interface FormContextValue {
  values: FormValues
  errors: Record<string, string>
  validateTrigger: ValidateTrigger
  setFieldValue: (name: string, value: unknown) => void
  setFieldRules: (name: string, rules: FormRule[]) => void
  validateField: (name: string) => boolean
}

const FormContext = createContext<FormContextValue | null>(null)

export interface FormProps extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  initialValues?: FormValues
  validateTrigger?: ValidateTrigger
  onSubmit?: (values: FormValues) => void
}

export interface FormItemProps {
  name: string
  label?: ReactNode
  rules?: FormRule[]
  dependencies?: string[]
  children: ReactNode
  requiredMark?: boolean
  help?: ReactNode
  extra?: ReactNode
  validateStatus?: 'error' | 'success' | 'warning'
}

const getRuleError = (name: string, value: unknown, values: FormValues, rules: FormRule[]) => {
  for (const rule of rules) {
    if (rule.when && !rule.when(values)) continue
    if (rule.required && (value === undefined || value === null || value === '')) {
      return rule.message ?? `${name} is required`
    }
    if (typeof value === 'string' && rule.minLength !== undefined && value.length < rule.minLength) {
      return rule.message ?? `${name} length must be >= ${rule.minLength}`
    }
    if (typeof value === 'string' && rule.maxLength !== undefined && value.length > rule.maxLength) {
      return rule.message ?? `${name} length must be <= ${rule.maxLength}`
    }
    if (typeof value === 'string' && rule.pattern && !rule.pattern.test(value)) {
      return rule.message ?? `${name} format is invalid`
    }
    if (rule.validator) {
      const message = rule.validator(value, values)
      if (message) return message
    }
  }
  return ''
}

export const Form = forwardRef<HTMLFormElement, FormProps>(function Form(
  { className, initialValues = {}, validateTrigger = 'onSubmit', onSubmit, children, ...props },
  ref,
) {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [rulesMap, setRulesMap] = useState<Record<string, FormRule[]>>({})

  const setFieldValue = useCallback((name: string, value: unknown) => {
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => {
      const next = { ...prev }
      delete next[name]
      return next
    })
  }, [])

  const setFieldRules = useCallback((name: string, rules: FormRule[]) => {
    setRulesMap((prev) => ({ ...prev, [name]: rules }))
  }, [])

  const validateField = useCallback(
    (name: string) => {
      const fieldRules = rulesMap[name] ?? []
      const nextMessage = getRuleError(name, values[name], values, fieldRules)
      setErrors((prev) => {
        const next = { ...prev }
        if (nextMessage) next[name] = nextMessage
        else delete next[name]
        return next
      })
      return !nextMessage
    },
    [rulesMap, values],
  )

  const validate = useCallback(() => {
    const nextErrors: Record<string, string> = {}

    Object.entries(rulesMap).forEach(([name, rules]) => {
      const message = getRuleError(name, values[name], values, rules)
      if (message) nextErrors[name] = message
    })

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }, [rulesMap, values])

  const contextValue = useMemo<FormContextValue>(
    () => ({
      values,
      errors,
      validateTrigger,
      setFieldValue,
      setFieldRules,
      validateField,
    }),
    [errors, setFieldRules, setFieldValue, validateField, validateTrigger, values],
  )

  return (
    <FormContext.Provider value={contextValue}>
      <form
        ref={ref}
        className={cn('space-y-4', className)}
        onSubmit={(event) => {
          event.preventDefault()
          if (validate()) {
            onSubmit?.(values)
          }
        }}
        {...props}
      >
        {children}
      </form>
    </FormContext.Provider>
  )
})

export function FormItem({
  name,
  label,
  rules = [],
  dependencies = [],
  children,
  requiredMark = true,
  help,
  extra,
  validateStatus,
}: FormItemProps) {
  const ctx = useContext(FormContext)

  if (!ctx) {
    throw new Error('FormItem must be used inside Form')
  }

  useEffect(() => {
    ctx.setFieldRules(name, rules)
  }, [ctx, name, rules])

  dependencies.forEach((dep) => {
    void ctx.values[dep]
  })

  const value = ctx.values[name]
  const error = ctx.errors[name]
  const required = rules.some((rule) => rule.required)

  const childNode = isValidElement(children)
    ? (children as ReactElement<{
        value?: unknown
        onChange?: (arg: unknown) => void
        onBlur?: (arg: unknown) => void
      }>)
    : null

  const extractFieldValue = (arg: unknown) => {
    if (arg && typeof arg === 'object' && 'target' in arg) {
      const eventTarget = (arg as { target?: { type?: string; value?: unknown; checked?: boolean } }).target
      if (eventTarget?.type === 'checkbox') {
        return eventTarget.checked
      }
      return eventTarget?.value
    }
    return arg
  }

  return (
    <div className="space-y-1.5">
      {label ? (
        <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
          {label}
          {required && requiredMark ? <span className="ml-0.5 text-red-500">*</span> : null}
        </label>
      ) : null}
      {childNode
        ? (cloneElement(childNode, {
            value: value as never,
            onChange: (arg: unknown) => {
              const nextValue = extractFieldValue(arg)
              ctx.setFieldValue(name, nextValue)
              if (ctx.validateTrigger === 'onChange') {
                ctx.validateField(name)
              }
              childNode.props.onChange?.(arg)
            },
            onBlur: (arg: unknown) => {
              if (ctx.validateTrigger === 'onBlur') {
                ctx.validateField(name)
              }
              childNode.props.onBlur?.(arg)
            },
          }) as ReactElement)
        : children}
      {error || help ? <p className={cn('text-xs', error ? 'text-red-600' : 'text-slate-500')}>{error ?? help}</p> : null}
      {extra ? <div className="text-xs text-slate-500">{extra}</div> : null}
      {validateStatus === 'success' ? <div className="text-xs text-emerald-600">Looks good</div> : null}
      {validateStatus === 'warning' ? <div className="text-xs text-amber-600">Please review this field</div> : null}
    </div>
  )
}
