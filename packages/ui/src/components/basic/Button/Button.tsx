import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type MouseEvent,
  type ReactNode,
  type Ref,
} from 'react'

import type { ComponentSize, ComponentVariant } from '../../../types/common'
import { cn } from '../../../utils/cn'

export type ButtonColor = 'primary' | 'neutral' | 'danger'
export type ButtonShape = 'default' | 'round' | 'circle'

type SharedButtonProps = {
  size?: ComponentSize
  variant?: ComponentVariant
  color?: ButtonColor
  loading?: boolean
  icon?: ReactNode
  /** 图标相对文案的位置；loading 时占位与图标一致 */
  iconPosition?: 'start' | 'end'
  /** 宽度占满父级 */
  block?: boolean
  /** default 小圆角；round 胶囊；circle 正圆（适合仅图标） */
  shape?: ButtonShape
  /** a 标签模式下仍可视作禁用（阻止跳转） */
  disabled?: boolean
}

type ButtonNativeProps = SharedButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'href'> & {
    href?: undefined
  }

type ButtonLinkProps = SharedButtonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'color' | 'type'> & {
    href: string
  }

export type ButtonProps = ButtonNativeProps | ButtonLinkProps

const spinner = (
  <span
    className="inline-block h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-current border-r-transparent"
    aria-hidden
  />
)

function useButtonClassName(
  props: Pick<
    ButtonProps,
    'size' | 'variant' | 'color' | 'shape' | 'block' | 'className'
  >,
) {
  const { size = 'md', variant = 'solid', color = 'primary', shape = 'default', block, className } = props

  return cn(
    'nova-focus-ring inline-flex items-center justify-center gap-2 border font-medium transition',
    block && 'w-full',
    shape === 'default' && 'rounded-md',
    shape === 'round' && 'rounded-full',
    shape === 'circle' && 'rounded-full',
    shape === 'circle' && {
      'h-8 min-w-8 px-0': size === 'sm',
      'h-10 min-w-10 px-0': size === 'md',
      'h-11 min-w-11 px-0': size === 'lg',
    },
    shape !== 'circle' && {
      'h-8 px-3 text-sm': size === 'sm',
      'h-10 px-4 text-sm': size === 'md',
      'h-11 px-5 text-base': size === 'lg',
    },
    {
      'border-transparent bg-brand-500 text-white hover:bg-brand-600': variant === 'solid' && color === 'primary',
      'border-slate-300 bg-white text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800':
        variant === 'solid' && color === 'neutral',
      'border-transparent bg-red-600 text-white hover:bg-red-700': variant === 'solid' && color === 'danger',
      'border-brand-500 text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950/30': variant === 'outline' && color === 'primary',
      'border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800':
        variant === 'outline' && color === 'neutral',
      'border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30': variant === 'outline' && color === 'danger',
      'border-transparent bg-transparent text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950/30':
        variant === 'ghost' && color === 'primary',
      'border-transparent bg-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800':
        variant === 'ghost' && color === 'neutral',
      'border-transparent bg-transparent text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30':
        variant === 'ghost' && color === 'danger',
    },
    className,
  )
}

function isLinkProps(props: ButtonProps): props is ButtonLinkProps {
  return typeof props.href === 'string'
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(function Button(props, ref) {
  const {
    className,
    size = 'md',
    variant = 'solid',
    color = 'primary',
    shape = 'default',
    block,
    loading = false,
    icon,
    iconPosition = 'start',
    disabled,
    children,
  } = props

  const rootClass = useButtonClassName({ size, variant, color, shape, block, className })
  const isDisabled = Boolean(disabled || loading)
  const showIconStart = iconPosition === 'start' && !loading && icon
  const showIconEnd = iconPosition === 'end' && !loading && icon
  const startSlot = loading ? spinner : showIconStart ? icon : null
  const endSlot = loading ? null : showIconEnd ? icon : null

  if (isLinkProps(props)) {
    const { href, onClick, rel, target, ...rest } = props
    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
      if (isDisabled) {
        e.preventDefault()
        return
      }
      onClick?.(e)
    }

    const computedRel = target === '_blank' ? (rel?.includes('noopener') ? rel : `${rel ?? ''} noopener noreferrer`.trim()) : rel

    return (
      <a
        ref={ref as Ref<HTMLAnchorElement>}
        className={cn(
          rootClass,
          isDisabled && 'pointer-events-none cursor-not-allowed opacity-60',
          !isDisabled && 'cursor-pointer',
        )}
        href={isDisabled ? undefined : href}
        aria-busy={loading || undefined}
        aria-disabled={isDisabled || undefined}
        tabIndex={isDisabled ? -1 : undefined}
        rel={computedRel}
        target={target}
        data-nova-button="true"
        data-variant={variant}
        data-size={size}
        data-color={color}
        onClick={handleClick}
        {...rest}
      >
        {iconPosition === 'end' ? (
          <>
            {children}
            {endSlot ?? (loading ? spinner : null)}
          </>
        ) : (
          <>
            {startSlot}
            {children}
            {endSlot}
          </>
        )}
      </a>
    )
  }

  const { type = 'button', ...rest } = props

  return (
    <button
      ref={ref as Ref<HTMLButtonElement>}
      type={type}
      className={cn(rootClass, 'disabled:cursor-not-allowed disabled:opacity-60')}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      data-nova-button="true"
      data-variant={variant}
      data-size={size}
      data-color={color}
      {...rest}
    >
      {iconPosition === 'end' ? (
        <>
          {children}
          {endSlot ?? (loading ? spinner : null)}
        </>
      ) : (
        <>
          {startSlot}
          {children}
          {endSlot}
        </>
      )}
    </button>
  )
})
