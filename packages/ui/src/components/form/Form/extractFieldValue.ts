import type { ChangeEvent } from 'react'

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
