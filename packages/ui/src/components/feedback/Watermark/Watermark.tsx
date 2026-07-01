import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export interface WatermarkProps extends HTMLAttributes<HTMLDivElement> {
  content?: string
  children?: ReactNode
}

export const Watermark = forwardRef<HTMLDivElement, WatermarkProps>(function Watermark(
  { className, content = 'NOVA UI', children, style, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn('relative overflow-hidden', className)}
      style={{
        backgroundImage: `repeating-linear-gradient(45deg, rgba(148,163,184,0.15) 0, rgba(148,163,184,0.15) 1px, transparent 1px, transparent 24px)`,
        ...style,
      }}
      {...props}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          placeItems: 'center',
          fontSize: '2rem',
          fontWeight: 700,
          color: 'rgba(100,116,139,0.12)',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {content}
      </div>
      <div className="relative">{children}</div>
    </div>
  )
})
