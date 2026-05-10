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
  useRef,
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
  triggerFieldValidation: (name: string, trigger: FormValidateTrigger, nextValue?: unknown) => void
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
  validateTrigger?: FormValidateTrigger
}

export type FormValidateTrigger = 'onSubmit' | 'onChange' | 'onBlur'

export interface FormItemProps {
  name: string
  label?: ReactNode
  rules?: FormRule[]
  dependencies?: string[]
  children: ReactNode
  requiredMark?: boolean
}

export const Form = forwardRef<HTMLFormElement, FormProps>(function Form(
  { className, initialValues = {}, onSubmit, validateTrigger = 'onSubmit', children, ...props },
  ref,
) {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [rulesMap, setRulesMap] = useState<Record<string, FormRule[]>>({})
  const errorUpdateTimerRef = useRef<number | null>(null)

  const scheduleErrorsUpdate = useCallback((updater: (prev: Record<string, string>) => Record<string, string>) => {
    if (errorUpdateTimerRef.current !== null) {
      window.clearTimeout(errorUpdateTimerRef.current)
    }
    errorUpdateTimerRef.current = window.setTimeout(() => {
      setErrors((prev) => updater(prev))
      errorUpdateTimerRef.current = null
    }, 120)
  }, [])

  useEffect(
    () => () => {
      if (errorUpdateTimerRef.current !== null) {
        window.clearTimeout(errorUpdateTimerRef.current)
      }
    },
    [],
  )

  const getFieldError = useCallback((name: string, nextValues: FormValues) => {
    const rules = rulesMap[name] ?? []
    const value = nextValues[name]

    for (const rule of rules) {
      if (rule.required && (value === undefined || value === null || value === '')) {
        return rule.message ?? `${name} is required`
      }
      if (rule.when && !rule.when(nextValues)) {
        continue
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
        const message = rule.validator(value, nextValues)
        if (message) return message
      }
    }

    return ''
  }, [rulesMap])

  const setFieldValue = useCallback((name: string, value: unknown) => {
    setValues((prev) => ({ ...prev, [name]: value }))
    if (validateTrigger === 'onSubmit') {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }, [validateTrigger])

  const setFieldRules = useCallback((name: string, rules: FormRule[]) => {
    setRulesMap((prev) => (prev[name] === rules ? prev : { ...prev, [name]: rules }))
  }, [])

  const triggerFieldValidation = useCallback((name: string, trigger: FormValidateTrigger, nextValue?: unknown) => {
    if (validateTrigger !== trigger) return
    setValues((prevValues) => {
      const nextValues = nextValue === undefined ? prevValues : { ...prevValues, [name]: nextValue }
      const relatedFields = Object.keys(rulesMap).filter((field) => {
        if (field === name) return true
        return (rulesMap[field] ?? []).some((rule) => rule.deps?.includes(name))
      })

      scheduleErrorsUpdate((prevErrors) => {
        const nextErrors = { ...prevErrors }
        relatedFields.forEach((field) => {
          const message = getFieldError(field, nextValues)
          if (message) {
            nextErrors[field] = message
          } else {
            delete nextErrors[field]
          }
        })
        return nextErrors
      })

      return prevValues
    })
  }, [getFieldError, rulesMap, scheduleErrorsUpdate, validateTrigger])

  const validate = useCallback(() => {
    const nextErrors: Record<string, string> = {}

    Object.keys(rulesMap).forEach((name) => {
      const message = getFieldError(name, values)
      if (message) nextErrors[name] = message
    })

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }, [getFieldError, rulesMap, values])

  const contextValue = useMemo<FormContextValue>(
    () => ({
      values,
      errors,
      setFieldValue,
      triggerFieldValidation,
      setFieldRules,
    }),
    [errors, setFieldRules, setFieldValue, triggerFieldValidation, values],
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
        onChange?: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
        onBlur?: (event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void
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
              ctx.triggerFieldValidation(name, 'onChange', nextValue)
              const originOnChange =
                childNode.props.onChange as ((eventOrValue: unknown) => void) | undefined
              originOnChange?.(eventOrValue)
            },
            onBlur: (event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
              ctx.triggerFieldValidation(name, 'onBlur')
              const originOnBlur =
                childNode.props.onBlur as
                  | ((event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void)
                  | undefined
              originOnBlur?.(event)
            },
          }) as ReactElement)
        : children}
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  )
}
