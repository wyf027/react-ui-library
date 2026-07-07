import { forwardRef, type ButtonHTMLAttributes, type MouseEvent, useEffect, useState } from 'react'
import { cn } from '../../../utils/cn'

type BackTopTarget = HTMLElement | Window

export interface BackTopProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  visibilityHeight?: number
  /** 自定义滚动容器，默认监听并滚动 window */
  target?: () => BackTopTarget | null
}

const getScrollTop = (target: BackTopTarget) => (target === window ? window.scrollY : target.scrollTop)

const scrollToTop = (target: BackTopTarget) => {
  target.scrollTo({ top: 0, behavior: 'smooth' })
}

export const BackTop = forwardRef<HTMLButtonElement, BackTopProps>(function BackTop(
  {
    className,
    visibilityHeight = 200,
    target,
    children = '↑ Top',
    onClick,
    'aria-label': ariaLabel = 'Back to top',
    ...props
  },
  ref,
) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const scrollTarget = target?.() ?? window
    const onScroll = () => {
      setVisible(getScrollTop(scrollTarget) > visibilityHeight)
    }

    scrollTarget.addEventListener('scroll', onScroll)
    onScroll()

    return () => scrollTarget.removeEventListener('scroll', onScroll)
  }, [target, visibilityHeight])

  if (!visible) return null

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event)
    if (event.defaultPrevented) {
      return
    }

    scrollToTop(target?.() ?? window)
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
