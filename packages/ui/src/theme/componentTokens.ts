/**
 * Semantic Tailwind class groups for components (design-token oriented).
 * Prefer importing these maps instead of scattering palette strings in JSX.
 */

export type AlertType = 'info' | 'success' | 'warning' | 'error'

export const alertTypeSurfaceClass: Record<AlertType, string> = {
  info: 'border-sky-200 bg-sky-50 text-sky-900 dark:border-sky-800 dark:bg-sky-950/30 dark:text-sky-200',
  success:
    'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200',
  warning:
    'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200',
  error: 'border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950/30 dark:text-red-200',
}

export type BadgeStatus = 'default' | 'success' | 'processing' | 'error' | 'warning'

export const badgeStatusBgClass: Record<BadgeStatus, string> = {
  default: 'bg-slate-500',
  success: 'bg-green-500',
  processing: 'bg-brand-500',
  error: 'bg-red-500',
  warning: 'bg-amber-500',
}
