import { forwardRef, type HTMLAttributes, useState } from 'react'
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

  return (
    <>
      <div ref={ref} className={cn('inline-flex', className)} {...props}>
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          onClick={() => setOpen(true)}
          className="cursor-zoom-in rounded-lg border border-slate-200 object-cover dark:border-slate-700"
        />
      </div>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setOpen(false)}>
          <img src={src} alt={alt} className="max-h-[90vh] max-w-[90vw] rounded-lg" />
        </div>
      ) : null}
    </>
  )
})
