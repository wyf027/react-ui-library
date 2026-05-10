import { createElement, forwardRef, type ElementType, type HTMLAttributes } from 'react'

import { cn } from '../../../utils/cn'

/** 与 Ant Design 栅格 / 内容区命名习惯对齐的最大宽度预设（基于 Tailwind `max-w-*`） */
export type ContainerMaxWidth = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

export type ContainerPadding = 'none' | 'sm' | 'md' | 'lg'

const maxWidthClass: Record<ContainerMaxWidth, string> = {
  xs: 'max-w-xl',
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  xxl: 'max-w-[1600px]',
}

const paddingXClass: Record<ContainerPadding, string> = {
  none: 'px-0',
  sm: 'px-3 sm:px-4',
  md: 'px-4 sm:px-5',
  lg: 'px-4 sm:px-6 lg:px-8',
}

const paddingYClass: Record<ContainerPadding, string> = {
  none: 'py-0',
  sm: 'py-2 sm:py-3',
  md: 'py-4 sm:py-5',
  lg: 'py-6 sm:py-8 lg:py-10',
}

export interface ContainerProps extends Omit<HTMLAttributes<HTMLElement>, 'className'> {
  /** 根节点标签，便于输出 `main` / `section` 等语义化结构（类似 antd 部分组件的 `component`） */
  component?: ElementType
  /** 是否铺满可视宽度（取消最大宽度约束） */
  fluid?: boolean
  /** 在存在最大宽度时是否水平居中（`mx-auto`） */
  centered?: boolean
  /** 内容区最大宽度预设，`fluid` 为 true 时忽略 */
  maxWidth?: ContainerMaxWidth
  /** 水平内边距预设 */
  padding?: ContainerPadding
  /** 垂直内边距预设 */
  verticalPadding?: ContainerPadding
  className?: string
}

export const Container = forwardRef<HTMLElement, ContainerProps>(function Container(
  {
    className,
    component = 'div',
    fluid = false,
    centered = true,
    maxWidth = 'xl',
    padding = 'lg',
    verticalPadding = 'none',
    ...props
  },
  ref,
) {
  return createElement(component, {
    ref,
    className: cn(
      'w-full',
      paddingXClass[padding],
      verticalPadding !== 'none' ? paddingYClass[verticalPadding] : undefined,
      fluid ? 'max-w-full' : maxWidthClass[maxWidth],
      centered && !fluid && 'mx-auto',
      className,
    ),
    ...props,
  })
})
