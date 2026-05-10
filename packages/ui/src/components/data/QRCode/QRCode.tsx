import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../../../utils/cn'

export interface QRCodeProps extends HTMLAttributes<HTMLDivElement> {
  value: string
  size?: number
}

function hashValue(input: string): number {
  let hash = 0
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

export const QRCode = forwardRef<HTMLDivElement, QRCodeProps>(function QRCode(
  { className, value, size = 128, ...props },
  ref,
) {
  const matrixSize = 21
  const seed = hashValue(value)

  return (
    <div
      ref={ref}
      className={cn('grid overflow-hidden rounded border border-slate-300 bg-white p-2 dark:border-slate-700', className)}
      style={{
        width: size,
        height: size,
        gridTemplateColumns: `repeat(${matrixSize}, minmax(0, 1fr))`,
      }}
      {...props}
    >
      {Array.from({ length: matrixSize * matrixSize }, (_, index) => {
        const fill = ((index * 31 + seed) % 7) < 3
        return <span key={index} className={fill ? 'bg-slate-900' : 'bg-white'} />
      })}
    </div>
  )
})
