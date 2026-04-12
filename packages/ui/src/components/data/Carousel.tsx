import { forwardRef, useState, useEffect, useCallback, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../utils/cn'

export interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  items: ReactNode[]
  autoplay?: boolean
  autoplaySpeed?: number
  dots?: boolean
  arrows?: boolean
}

export const Carousel = forwardRef<HTMLDivElement, CarouselProps>(function Carousel(
  {
    className,
    items,
    autoplay = false,
    autoplaySpeed = 3000,
    dots = true,
    arrows = true,
    ...props
  },
  ref,
) {
  const [current, setCurrent] = useState(0)
  const count = items.length

  const goTo = useCallback(
    (index: number) => setCurrent(((index % count) + count) % count),
    [count],
  )

  useEffect(() => {
    if (!autoplay || count <= 1) return
    const timer = setInterval(() => goTo(current + 1), autoplaySpeed)
    return () => clearInterval(timer)
  }, [autoplay, autoplaySpeed, current, count, goTo])

  return (
    <div ref={ref} className={cn('relative overflow-hidden rounded-lg', className)} {...props}>
      <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${current * 100}%)` }}>
        {items.map((item, i) => (
          <div key={i} className="w-full shrink-0">
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
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => goTo(current + 1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 px-2 py-1 text-white hover:bg-black/50"
            aria-label="Next"
          >
            ›
          </button>
        </>
      ) : null}
      {dots && count > 1 ? (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              className={cn('h-2 w-2 rounded-full transition', i === current ? 'bg-white' : 'bg-white/50')}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
})
