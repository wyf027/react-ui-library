import type { HTMLAttributes, ReactNode } from 'react'

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean
  onClose?: () => void
  title?: string
  children?: ReactNode
  /** 点击遮罩（面板外）是否触发 `onClose`。默认 `true`。 */
  maskClosable?: boolean
  /** 是否启用 Esc 关闭。默认 `true`。 */
  keyboard?: boolean
}
