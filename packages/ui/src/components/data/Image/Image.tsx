import { forwardRef, useState, type ImgHTMLAttributes, type ReactNode } from 'react'
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
    ...props
  },
  ref,
) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)

  const imgSrc = failed ? fallback : src

  return (
    <>
      <span className={cn('relative inline-block overflow-hidden', className)}>
        {!loaded && placeholder ? <span className="absolute inset-0 flex items-center justify-center">{placeholder}</span> : null}
        <img
          ref={ref}
          src={imgSrc}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={(e) => {
            setFailed(true)
            onError?.(e)
          }}
          onClick={preview ? () => setPreviewOpen(true) : undefined}
          className={cn('block max-w-full', preview && 'cursor-pointer', !loaded && 'opacity-0')}
          {...props}
        />
      </span>
      {previewOpen ? (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70"
          onClick={() => setPreviewOpen(false)}
        >
          <img src={imgSrc} alt={alt} className="max-h-[90vh] max-w-[90vw] rounded shadow-2xl" />
        </div>
      ) : null}
    </>
  )
})
