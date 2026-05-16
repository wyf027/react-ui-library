import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'

import { cn } from '../../../utils/cn'

import { Spin } from '../../feedback/inline/Spin'

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode
  extra?: ReactNode
  /** 封面区域，对标 Ant Design `Card` 的 `cover` */
  cover?: ReactNode
  /** 底部操作区，对标 Ant Design `Card` 的 `actions` */
  actions?: ReactNode
  /** 加载状态，对标 Ant Design `loading` */
  loading?: boolean
  /** 是否显示边框 */
  bordered?: boolean
  /** 悬浮加深阴影，对标 Ant Design `hoverable` */
  hoverable?: boolean
  /** 尺寸 */
  size?: 'default' | 'small'
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    className,
    title,
    extra,
    cover,
    actions,
    children,
    loading = false,
    bordered = true,
    hoverable = false,
    size = 'default',
    ...props
  },
  ref,
) {
  const paddingCls = size === 'small' ? 'p-3' : 'p-4'
  const footerPadding = size === 'small' ? 'px-3 py-2' : 'px-4 py-3'

  return (
    <section
      ref={ref}
      className={cn(
        'overflow-hidden rounded-xl bg-white shadow-sm dark:bg-slate-900',
        bordered && 'border border-slate-200 dark:border-slate-700',
        hoverable && 'transition-shadow duration-200 hover:shadow-md',
        className,
      )}
      {...props}
    >
      <Spin spinning={loading}>
        <div className="relative">
          {cover ? <div className="block w-full overflow-hidden">{cover}</div> : null}
          <div
            className={cn(
              paddingCls,
              cover && 'border-t border-slate-100 dark:border-slate-800',
            )}
          >
            {(title || extra) && (
              <header className="mb-3 flex items-center justify-between gap-2">
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
                {extra}
              </header>
            )}
            <div>{children}</div>
          </div>
          {actions ? (
            <footer
              className={cn(
                'flex flex-wrap items-center gap-2 border-t border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50',
                footerPadding,
              )}
            >
              {actions}
            </footer>
          ) : null}
        </div>
      </Spin>
    </section>
  )
})
