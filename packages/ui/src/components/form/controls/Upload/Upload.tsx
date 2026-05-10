import { forwardRef, type ChangeEvent, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../../../utils/cn'

export interface UploadFileItem {
  uid: string
  name: string
  size?: number
}

export interface UploadProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  accept?: string
  multiple?: boolean
  disabled?: boolean
  fileList?: UploadFileItem[]
  onChange?: (files: UploadFileItem[]) => void
  triggerText?: ReactNode
}

export const Upload = forwardRef<HTMLDivElement, UploadProps>(function Upload(
  {
    className,
    accept,
    multiple,
    disabled,
    fileList = [],
    onChange,
    triggerText = 'Click or drag file to upload',
    ...props
  },
  ref,
) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []).map((file) => ({
      uid: `${file.name}-${file.lastModified}`,
      name: file.name,
      size: file.size,
    }))
    onChange?.(files)
  }

  return (
    <div ref={ref} className={cn('space-y-2', className)} {...props}>
      <label className={cn('flex cursor-pointer items-center justify-center rounded-lg border border-dashed border-slate-300 px-4 py-6 text-sm text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-900', disabled && 'cursor-not-allowed opacity-60')}>
        <input
          type="file"
          className="hidden"
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
            <li key={file.uid} className="rounded bg-slate-100 px-2 py-1 dark:bg-slate-800">
              {file.name}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
})
