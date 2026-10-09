import { forwardRef, type HTMLAttributes, useMemo } from 'react'
import qrcode from 'qrcode-generator'
import { cn } from '../../../utils/cn'

export interface QRCodeProps extends HTMLAttributes<HTMLDivElement> {
  value: string
  size?: number
}

export const QRCode = forwardRef<HTMLDivElement, QRCodeProps>(function QRCode(
  {
    className,
    value,
    size = 128,
    role = 'img',
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    ...props
  },
  ref,
) {
  const matrix = useMemo(() => {
    const code = qrcode(0, 'M')
    // Pass UTF-8 bytes without changing the encoder's shared string conversion.
    const bytes = Array.from(new TextEncoder().encode(value), (byte) => String.fromCharCode(byte)).join('')
    code.addData(bytes, 'Byte')
    code.make()
    return code
  }, [value])
  const modules = matrix.getModuleCount()
  const matrixSize = modules + 8
  const accessibleLabel = ariaLabelledBy ? ariaLabel : (ariaLabel ?? 'QR code')

  return (
    <div
      ref={ref}
      role={role}
      aria-label={accessibleLabel}
      aria-labelledby={ariaLabelledBy}
      className={cn(
        'grid shrink-0 overflow-hidden bg-white',
        className,
      )}
      style={{
        width: size,
        height: size,
        gridTemplateRows: `repeat(${matrixSize}, minmax(0, 1fr))`,
        gridTemplateColumns: `repeat(${matrixSize}, minmax(0, 1fr))`,
      }}
      {...props}
    >
      {Array.from({ length: matrixSize * matrixSize }, (_, index) => {
        const row = Math.floor(index / matrixSize) - 4
        const col = index % matrixSize - 4
        const fill = row >= 0 && col >= 0 && row < modules && col < modules && matrix.isDark(row, col)
        return (
          <span
            key={index}
            aria-hidden="true"
            className={fill ? 'bg-black' : 'bg-white'}
          />
        )
      })}
    </div>
  )
})