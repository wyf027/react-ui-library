import {
  createContext,
  cloneElement,
  forwardRef,
  isValidElement,
  type ChangeEvent,
  type ReactElement,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'

import { cn } from '../../../utils/cn'

import { extractFieldValue } from './extractFieldValue'
import type {
  FormItemProps,
  FormProps,
  FormRule,
  FormValidateTrigger,
  FormValues,
} from './Form.types'

function mergeAriaDescribedBy(existing: string | undefined, appendId: string | undefined): string | undefined {
  const trimmed = existing?.trim()
  if (!appendId) return trimmed || undefined
  return trimmed ? `${trimmed} ${appendId}` : appendId
}

interface FormContextValue {
  values: FormValues
  errors: Record<string, string>
  validateTrigger: FormValidateTrigger
  setFieldValue: (name: string, value: unknown) => void
  triggerFieldValidation: (name: string, trigger: FormValidateTrigger, nextValue?: unknown) => void
  setFieldRules: (name: string, rules: FormRule[]) => void
  clearFieldRules: (name: string) => void
}

const FormContext = createContext<FormContextValue | null>(null)

const EMPTY_RULES: FormRule[] = []
const EMPTY_DEPS: string[] = []

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

  const clearFieldRules = useCallback((name: string) => {
    setRulesMap((prev) => {
      if (!(name in prev)) return prev
      const next = { ...prev }
      delete next[name]
      return next
    })
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
      validateTrigger,
      setFieldValue,
      triggerFieldValidation,
      setFieldRules,
      clearFieldRules,
    }),
    [clearFieldRules, errors, setFieldRules, setFieldValue, triggerFieldValidation, validateTrigger, values],
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
  rules = EMPTY_RULES,
  dependencies = EMPTY_DEPS,
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

  const dependencySignature = useMemo(
    () => dependencies.map((dep) => ctx.values[dep]),
    [dependencies, ctx.values],
  )

  const generatedControlId = useId()
  const messageId = useId()
  const validateSuccessId = useId()
  const validateWarningId = useId()
  const extraSlotId = useId()
  const labelSlotId = useId()

  const { setFieldRules, clearFieldRules } = ctx

  useEffect(() => {
    setFieldRules(name, rules)
    return () => {
      clearFieldRules(name)
    }
  }, [clearFieldRules, dependencySignature, name, rules, setFieldRules])

  const value = ctx.values[name]
  const error = ctx.errors[name]
  const required = rules.some((rule) => rule.required)

  const childNode = isValidElement(children)
    ? (children as ReactElement<{
        id?: string
        'aria-describedby'?: string
        'aria-invalid'?: boolean | 'true' | 'false'
        value?: unknown
        onChange?: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
        onBlur?: (event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void
      }>)
    : null

  const controlId =
    childNode && typeof childNode.props.id === 'string' && childNode.props.id !== ''
      ? childNode.props.id
      : generatedControlId

  const statusFeedbackId =
    validateStatus === 'success' ? validateSuccessId : validateStatus === 'warning' ? validateWarningId : undefined

  const describedBy = mergeAriaDescribedBy(
    mergeAriaDescribedBy(
      mergeAriaDescribedBy(childNode?.props['aria-describedby'], error || help ? messageId : undefined),
      statusFeedbackId,
    ),
    extra ? extraSlotId : undefined,
  )

  return (
    <div
      className="space-y-1.5"
      data-nova-form-item="true"
      role={label ? 'group' : undefined}
      aria-labelledby={label ? labelSlotId : undefined}
    >
      {label ? (
        <label
          id={labelSlotId}
          htmlFor={childNode ? controlId : undefined}
          className="text-sm font-medium text-slate-700 dark:text-slate-200"
        >
          {label}
          {required && requiredMark ? <span className="ml-0.5 text-red-500">*</span> : null}
        </label>
      ) : null}
      {childNode
        ? (cloneElement(childNode, {
            id: controlId,
            'aria-invalid': error ? true : undefined,
            'aria-describedby': describedBy,
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
      {error || help ? (
        <p
          id={messageId}
          role={error ? 'alert' : undefined}
          className={cn('text-xs', error ? 'text-red-600' : 'text-slate-500')}
        >
          {error ?? help}
        </p>
      ) : null}
      {extra ? (
        <div id={extraSlotId} className="text-xs text-slate-500">
          {extra}
        </div>
      ) : null}
      {validateStatus === 'success' ? (
        <div id={validateSuccessId} className="text-xs text-emerald-600">
          Looks good
        </div>
      ) : null}
      {validateStatus === 'warning' ? (
        <div id={validateWarningId} className="text-xs text-amber-600">
          Please review this field
        </div>
      ) : null}
    </div>
  )
}
