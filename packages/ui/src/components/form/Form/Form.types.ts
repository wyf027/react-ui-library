import type { FormHTMLAttributes, ReactNode } from 'react'

export type FormValues = Record<string, unknown>
export type FormValidateTrigger = 'onSubmit' | 'onChange' | 'onBlur'
export type ValidateTrigger = FormValidateTrigger

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

export interface FormProps extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  initialValues?: FormValues
  validateTrigger?: FormValidateTrigger
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
