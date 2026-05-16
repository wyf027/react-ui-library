import {
  forwardRef,
  useId,
  type ChangeEvent,
  type HTMLAttributes,
  type MutableRefObject,
  type ReactNode,
  type Ref,
} from 'react'

import { cn } from '../../../../utils/cn'

function assignRef<T>(ref: Ref<T> | undefined, value: T | null) {
  if (!ref) {
    return
  }
  if (typeof ref === 'function') {
    ref(value)
  } else {
    ;(ref as MutableRefObject<T | null>).current = value
  }
}

function makeUid(file: File) {
  const suffix = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`
  return `${file.name}-${file.lastModified}-${suffix}`
}

export interface UploadFileItem {
  uid: string
  name: string
  size?: number
}

export interface UploadProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  accept?: string
  multiple?: boolean
  disabled?: boolean
  /** Maximum total list size after a successful selection (parent merges `onChange` payloads into `fileList`). */
  maxCount?: number
  /** Maximum size per file in bytes; larger files are skipped silently. */
  maxSize?: number
  fileList?: UploadFileItem[]
  /**
   * Fires after each native file selection. First argument: mapped items from **this** selection only (parent merges into `fileList`).
   * Second argument: parallel `File[]` for upload (`xhr` / `fetch`), same order and length as the first argument.
   */
  onChange?: (items: UploadFileItem[], files: File[]) => void
  /** When set, each list row shows a focusable remove control. */
  onRemove?: (file: UploadFileItem) => void
  /** Return `false` to skip adding that file. Async supported. */
  beforeUpload?: (file: File) => boolean | Promise<boolean>
  triggerText?: ReactNode
  /** Ref to the native `<input type="file">` (focus for keyboard activation). */
  inputRef?: Ref<HTMLInputElement>
}

export const Upload = forwardRef<HTMLDivElement, UploadProps>(function Upload(
  {
    className,
    accept,
    multiple,
    disabled,
    maxCount,
    maxSize,
    fileList = [],
    onChange,
    onRemove,
    beforeUpload,
    triggerText = 'Choose file to upload',
    inputRef,
    ...props
  },
  ref,
) {
  const reactId = useId()
  const inputId = `nova-upload-${reactId.replace(/:/g, '')}`

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget
    const rawFiles = Array.from(input.files ?? [])
    input.value = ''

    const items: UploadFileItem[] = []
    const keptFiles: File[] = []

    const remainingSlots =
      maxCount === undefined ? Number.POSITIVE_INFINITY : Math.max(0, maxCount - fileList.length)

    let slots = remainingSlots

    for (const file of rawFiles) {
      if (slots <= 0) {
        break
      }

      if (maxSize !== undefined && file.size > maxSize) {
        continue
      }

      if (beforeUpload) {
        const result = beforeUpload(file)
        const ok = result instanceof Promise ? await result : result
        if (!ok) {
          continue
        }
      }

      items.push({
        uid: makeUid(file),
        name: file.name,
        size: file.size,
      })
      keptFiles.push(file)
      slots -= 1
    }

    if (items.length > 0) {
      onChange?.(items, keptFiles)
    }
  }

  const setInputRef = (node: HTMLInputElement | null) => {
    assignRef(inputRef, node)
  }

  return (
    <div ref={ref} className={cn('space-y-2', className)} {...props}>
      <label
        htmlFor={inputId}
        className={cn(
          'group flex cursor-pointer items-center justify-center rounded-lg border border-dashed border-slate-300 px-4 py-6 text-sm text-slate-600 outline-none hover:bg-slate-50 focus-within:ring-2 focus-within:ring-brand-500 focus-within:ring-offset-2 dark:border-slate-700 dark:text-slate-300 dark:focus-within:ring-offset-slate-950 dark:hover:bg-slate-900',
          disabled && 'cursor-not-allowed opacity-60',
        )}
      >
        <input
          id={inputId}
          ref={setInputRef}
          type="file"
          className="sr-only"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={handleChange}
        />
        {triggerText}
      </label>
      {fileList.length > 0 ? (
        <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
          {fileList.map((file) => (
            <li
              key={file.uid}
              className="flex items-center justify-between gap-2 rounded bg-slate-100 px-2 py-1 dark:bg-slate-800"
            >
              <span className="min-w-0 truncate">{file.name}</span>
              {onRemove ? (
                <button
                  type="button"
                  className="shrink-0 rounded px-2 py-0.5 text-xs font-medium text-slate-600 underline-offset-2 hover:underline focus-visible:outline focus-visible:ring-2 focus-visible:ring-brand-500 dark:text-slate-300"
                  onClick={() => onRemove(file)}
                  aria-label={`Remove ${file.name}`}
                >
                  Remove
                </button>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
})
