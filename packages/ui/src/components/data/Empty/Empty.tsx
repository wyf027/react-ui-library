import { forwardRef, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react'

import { cn } from '../../../utils/cn'

export interface EmptyProps extends HTMLAttributes<HTMLDivElement> {
  description?: ReactNode
  image?: ReactNode
  /** 无边框轻量样式，对标 Ant Design `simple` */
  simple?: boolean
  /** 自定义图片区域样式，对标 Ant Design `imageStyle` */
  imageStyle?: CSSProperties
  /** 图片区域是否作为装饰内容从辅助技术中隐藏 */
  imageAriaHidden?: boolean
}

export const Empty = forwardRef<HTMLDivElement, EmptyProps>(function Empty(
  {
    className,
    description = 'No Data',
    image,
    simple = false,
    imageStyle,
    imageAriaHidden = true,
    children,
    ...props
  },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col items-center justify-center rounded-lg p-6 text-center',
        simple
          ? 'border-0 bg-transparent'
          : 'border border-dashed border-slate-300 dark:border-slate-700',
        className,
      )}
      {...props}
    >
      <div className="mb-2 text-3xl" style={imageStyle} aria-hidden={imageAriaHidden}>
        {image ?? '📭'}
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
      {children ? <div className="mt-3">{children}</div> : null}
    </div>
  )
})
