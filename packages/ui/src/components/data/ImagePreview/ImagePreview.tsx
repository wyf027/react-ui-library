import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
} from 'react'
import { cn } from '../../../utils/cn'

export interface ImagePreviewProps extends HTMLAttributes<HTMLDivElement> {
  src: string
  alt?: string
  width?: number
  height?: number
}

export const ImagePreview = forwardRef<HTMLDivElement, ImagePreviewProps>(function ImagePreview(
  { className, src, alt = 'preview', width = 160, height = 120, ...props },
  ref,
) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLImageElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const wasOpenRef = useRef(false)
  const previewTriggerLabel = alt ? `Preview ${alt}` : 'Preview image'
  const previewDialogLabel = alt ? `${alt} preview` : 'Image preview'

  const closePreview = useCallback(() => {
    setOpen(false)
  }, [])

  useEffect(() => {
    if (!open) {
      if (wasOpenRef.current) {
        triggerRef.current?.focus()
        wasOpenRef.current = false
      }
      return
    }

    wasOpenRef.current = true
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        closePreview()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [closePreview, open])

  const handlePreviewKeyDown = (event: KeyboardEvent<HTMLImageElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setOpen(true)
    }
  }

  return (
    <>
      <div ref={ref} className={cn('inline-flex', className)} {...props}>
        <img
          ref={triggerRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          role="button"
          tabIndex={0}
          aria-label={previewTriggerLabel}
          onClick={() => setOpen(true)}
          onKeyDown={handlePreviewKeyDown}
          className="cursor-zoom-in rounded-lg border border-slate-200 object-cover dark:border-slate-700"
        />
      </div>
      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={previewDialogLabel}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={closePreview}
        >
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close image preview"
            className="nova-focus-ring absolute right-4 top-4 rounded bg-white/90 px-2 py-1 text-sm font-medium text-slate-900 shadow hover:bg-white"
            onClick={(event) => {
              event.stopPropagation()
              closePreview()
            }}
          >
            X
          </button>
          <img
            src={src}
            alt={alt}
            className="max-h-[90vh] max-w-[90vw] rounded-lg"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}
    </>
  )
})
