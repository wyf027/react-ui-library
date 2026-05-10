import { forwardRef, type ButtonHTMLAttributes, useEffect, useState } from 'react'
import { cn } from '../../../utils/cn'

export interface BackTopProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  visibilityHeight?: number
}

export const BackTop = forwardRef<HTMLButtonElement, BackTopProps>(function BackTop(
  { className, visibilityHeight = 200, ...props },
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

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={cn('fixed bottom-6 right-6 rounded-full bg-brand-500 px-3 py-2 text-sm text-white shadow-lg', className)}
      {...props}
    >
      ↑ Top
    </button>
  )
})
