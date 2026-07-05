import {
  forwardRef,
  useState,
  useEffect,
  useCallback,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { cn } from '../../../utils/cn'

export interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  items: ReactNode[]
  autoplay?: boolean
  autoplaySpeed?: number
  dots?: boolean
  arrows?: boolean
}

function isTextEditingTarget(target: EventTarget | null) {
  return target instanceof HTMLElement
    ? Boolean(target.closest('input, textarea, select, [contenteditable="true"]'))
    : false
}

export const Carousel = forwardRef<HTMLDivElement, CarouselProps>(function Carousel(
  {
    className,
    items,
    autoplay = false,
    autoplaySpeed = 3000,
    dots = true,
    arrows = true,
    onKeyDown,
    role = 'region',
    tabIndex = 0,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-roledescription': ariaRoleDescription = 'carousel',
    ...props
  },
  ref,
) {
  const [current, setCurrent] = useState(0)
  const count = items.length
  const resolvedAriaLabel = ariaLabel ?? (ariaLabelledBy ? undefined : 'Slides')

  const goTo = useCallback(
    (index: number) => {
      if (count === 0) return
      setCurrent(((index % count) + count) % count)
    },
    [count],
  )

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event)
      if (event.defaultPrevented || count <= 1 || isTextEditingTarget(event.target)) return

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        goTo(current - 1)
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        goTo(current + 1)
      } else if (event.key === 'Home') {
        event.preventDefault()
        goTo(0)
      } else if (event.key === 'End') {
        event.preventDefault()
        goTo(count - 1)
      }
    },
    [count, current, goTo, onKeyDown],
  )

  useEffect(() => {
    if (!autoplay || count <= 1) return
    const timer = setInterval(() => goTo(current + 1), autoplaySpeed)
    return () => clearInterval(timer)
  }, [autoplay, autoplaySpeed, current, count, goTo])

  return (
    <div
      ref={ref}
      role={role}
      aria-label={resolvedAriaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-roledescription={ariaRoleDescription}
      tabIndex={tabIndex}
      onKeyDown={handleKeyDown}
      className={cn('relative overflow-hidden rounded-lg', className)}
      {...props}
    >
      <span className="sr-only" aria-live={autoplay ? 'off' : 'polite'} aria-atomic="true">
        {count > 0 ? `Slide ${current + 1} of ${count}` : 'No slides'}
      </span>
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            className="w-full shrink-0"
          >
            {item}
          </div>
        ))}
      </div>
      {arrows && count > 1 ? (
        <>
          <button
            type="button"
            onClick={() => goTo(current - 1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 px-2 py-1 text-white hover:bg-black/50"
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => goTo(current + 1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 px-2 py-1 text-white hover:bg-black/50"
            aria-label="Next slide"
          >
            ›
          </button>
        </>
      ) : null}
      {dots && count > 1 ? (
        <div
          role="group"
          aria-label="Choose slide"
          className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2"
        >
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              className={cn(
                'h-2 w-2 rounded-full transition',
                i === current ? 'bg-white' : 'bg-white/50',
              )}
              aria-current={i === current ? 'true' : undefined}
              aria-label={`Show slide ${i + 1} of ${count}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
})
