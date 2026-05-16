import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'

import { cn } from '../../../utils/cn'

interface IconBaseProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'aria-hidden' | 'aria-label' | 'role'> {
  size?: number
  name?: string
  /** Adds Tailwind `animate-spin` for loading-style indicators. */
  spin?: boolean
  children?: ReactNode
}

export type IconProps =
  | (IconBaseProps & { decorative?: true })
  | (IconBaseProps & { decorative: false; 'aria-label': string })

export const Icon = forwardRef<HTMLSpanElement, IconProps>(function Icon(props, ref) {
  const {
    className,
    size = 16,
    children,
    name,
    spin = false,
    decorative = true,
    'aria-label': ariaLabelProp,
    ...rest
  } = props as IconBaseProps & {
    decorative?: boolean
    spin?: boolean
    'aria-label'?: string
  }

  const isDecorative = decorative !== false

  return (
    <span
      ref={ref}
      aria-hidden={isDecorative ? true : undefined}
      role={isDecorative ? undefined : 'img'}
      aria-label={isDecorative ? undefined : ariaLabelProp}
      data-icon={name}
      style={{ width: size, height: size }}
      className={cn('inline-flex items-center justify-center', spin && 'animate-spin', className)}
      {...rest}
    >
      {children ?? '•'}
    </span>
  )
})
