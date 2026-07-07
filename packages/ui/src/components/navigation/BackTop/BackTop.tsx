import { forwardRef, type ButtonHTMLAttributes, type MouseEvent, useEffect, useState } from 'react'
import { cn } from '../../../utils/cn'

export interface BackTopProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  visibilityHeight?: number
}

export const BackTop = forwardRef<HTMLButtonElement, BackTopProps>(function BackTop(
  {
    className,
    visibilityHeight = 200,
    children = '↑ Top',
    onClick,
    'aria-label': ariaLabel = 'Back to top',
    ...props
  },
  ref,
) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > visibilityHeight)
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [visibilityHeight])

  if (!visible) return null

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event)
    if (event.defaultPrevented) {
      return
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel}
      className={cn('fixed bottom-6 right-6 rounded-full bg-brand-500 px-3 py-2 text-sm text-white shadow-lg', className)}
      {...props}
    >
      {children}
    </button>
  )
})
