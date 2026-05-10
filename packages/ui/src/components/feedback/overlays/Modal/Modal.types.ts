import type { HTMLAttributes, ReactNode } from 'react'

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean
  onClose?: () => void
  title?: string
  children?: ReactNode
}
