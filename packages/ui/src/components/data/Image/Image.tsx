import {
  forwardRef,
  useEffect,
  useState,
  type ImgHTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { cn } from '../../../utils/cn'

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string
  placeholder?: ReactNode
  preview?: boolean
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(function Image(
  {
    className,
    fallback = '',
    placeholder,
    preview = true,
    src,
    alt = '',
    onError,
    onKeyDown,
    role,
    tabIndex,
    'aria-label': ariaLabel,
    ...props
  },
  ref,
) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)

  const imgSrc = failed ? fallback : src
  const previewTriggerLabel = ariaLabel ?? (alt ? `Preview ${alt}` : 'Preview image')
  const previewDialogLabel = alt ? `${alt} preview` : 'Image preview'

  useEffect(() => {
    if (!previewOpen) return

    const handleDocumentKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPreviewOpen(false)
      }
    }

    document.addEventListener('keydown', handleDocumentKeyDown)
    return () => document.removeEventListener('keydown', handleDocumentKeyDown)
  }, [previewOpen])

  const handlePreviewKeyDown = (event: KeyboardEvent<HTMLImageElement>) => {
    onKeyDown?.(event)
    if (event.defaultPrevented || !preview) return

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setPreviewOpen(true)
    }
  }

  return (
    <>
      <span className={cn('relative inline-block overflow-hidden', className)}>
        {!loaded && placeholder ? <span className="absolute inset-0 flex items-center justify-center">{placeholder}</span> : null}
        <img
          ref={ref}
          src={imgSrc}
          alt={alt}
          role={preview ? (role ?? 'button') : role}
          tabIndex={preview ? (tabIndex ?? 0) : tabIndex}
          aria-label={preview ? previewTriggerLabel : ariaLabel}
          onLoad={() => setLoaded(true)}
          onError={(e) => {
            setFailed(true)
            onError?.(e)
          }}
          onClick={preview ? () => setPreviewOpen(true) : undefined}
          onKeyDown={handlePreviewKeyDown}
          className={cn('block max-w-full', preview && 'cursor-pointer', !loaded && 'opacity-0')}
          {...props}
        />
      </span>
      {previewOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={previewDialogLabel}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70"
          onClick={() => setPreviewOpen(false)}
        >
          <img src={imgSrc} alt={alt} className="max-h-[90vh] max-w-[90vw] rounded shadow-2xl" />
        </div>
      ) : null}
    </>
  )
})