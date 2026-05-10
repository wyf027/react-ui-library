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
  useMemo,
  useState,
} from 'react'
import type { ChangeEvent } from 'react'
import { cn } from '../../utils/cn'

export type FormValues = Record<string, unknown>

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
  setFieldValue: (name: string, value: unknown) => void
  setFieldRules: (name: string, rules: FormRule[]) => void
}

const FormContext = createContext<FormContextValue | null>(null)

type MaybeNativeChangeEvent =
  | ChangeEvent<HTMLInputElement | HTMLSelectElement>
  | { target?: { value?: unknown; checked?: unknown; type?: string } }

export function extractFieldValue(input: unknown) {
  if (typeof input === 'object' && input !== null && 'target' in input) {
    const event = input as MaybeNativeChangeEvent
    if (event.target?.type === 'checkbox') {
      return Boolean(event.target.checked)
    }
    if (event.target && 'value' in event.target) {
      return event.target.value
    }
  }

  return input
}

export interface FormProps extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  initialValues?: FormValues
  onSubmit?: (values: FormValues) => void
}

export interface FormItemProps {
  name: string
  label?: ReactNode
  rules?: FormRule[]
  dependencies?: string[]
  children: ReactNode
  requiredMark?: boolean
}

export const Form = forwardRef<HTMLFormElement, FormProps>(function Form(
  { className, initialValues = {}, onSubmit, children, ...props },
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

  const validate = useCallback(() => {
    const nextErrors: Record<string, string> = {}

    Object.entries(rulesMap).forEach(([name, rules]) => {
      const value = values[name]
      rules.forEach((rule) => {
        if (nextErrors[name]) return
        if (rule.required && (value === undefined || value === null || value === '')) {
          nextErrors[name] = rule.message ?? `${name} is required`
          return
        }
        if (rule.when && !rule.when(values)) {
          return
        }
        if (typeof value === 'string' && rule.minLength !== undefined && value.length < rule.minLength) {
          nextErrors[name] = rule.message ?? `${name} length must be >= ${rule.minLength}`
          return
        }
        if (typeof value === 'string' && rule.maxLength !== undefined && value.length > rule.maxLength) {
          nextErrors[name] = rule.message ?? `${name} length must be <= ${rule.maxLength}`
          return
        }
        if (typeof value === 'string' && rule.pattern && !rule.pattern.test(value)) {
          nextErrors[name] = rule.message ?? `${name} format is invalid`
          return
        }
        if (rule.validator) {
          const message = rule.validator(value, values)
          if (message) {
            nextErrors[name] = message
          }
        }
      })
    })

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }, [rulesMap, values])

  const contextValue = useMemo<FormContextValue>(
    () => ({
      values,
      errors,
      setFieldValue,
      setFieldRules,
    }),
    [errors, setFieldRules, setFieldValue, values],
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
}: FormItemProps) {
  const ctx = useContext(FormContext)

  if (!ctx) {
    throw new Error('FormItem must be used inside Form')
  }

  ctx.setFieldRules(name, rules)

  dependencies.forEach((dep) => {
    void ctx.values[dep]
  })

  const value = ctx.values[name]
  const error = ctx.errors[name]
  const required = rules.some((rule) => rule.required)

  const childNode = isValidElement(children)
    ? (children as ReactElement<{
        value?: unknown
        onChange?: (eventOrValue: unknown) => void
      }>)
    : null

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
            onChange: (eventOrValue: unknown) => {
              const nextValue = extractFieldValue(eventOrValue)
              ctx.setFieldValue(name, nextValue)
              const originOnChange =
                childNode.props.onChange as ((eventOrValue: unknown) => void) | undefined
              originOnChange?.(eventOrValue)
            },
          }) as ReactElement)
        : children}
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  )
}
