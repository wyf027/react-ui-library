import { forwardRef, type ImgHTMLAttributes } from 'react'
import { cn } from '../../../utils/cn'

export interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  name?: string
  size?: number
}

export const Avatar = forwardRef<HTMLImageElement, AvatarProps>(function Avatar(
  { className, name, src, alt, size = 36, ...props },
  ref,
) {
  const fallback = name?.trim().slice(0, 1).toUpperCase() ?? '?'
  const fallbackLabel = alt ?? name

  if (!src) {
    return (
      <span
        role={fallbackLabel ? 'img' : undefined}
        aria-label={fallbackLabel || undefined}
        className={cn(
          'inline-flex items-center justify-center rounded-full bg-brand-500 text-sm font-semibold text-white',
          className,
        )}
        style={{ width: size, height: size }}
      >
        {fallback}
      </span>
    )
  }

  return (
    <img
      ref={ref}
      src={src}
      alt={alt ?? name ?? 'avatar'}
      className={cn('rounded-full object-cover', className)}
      style={{ width: size, height: size }}
      {...props}
    />
  )
})