import { forwardRef, type HTMLAttributes, useMemo } from 'react'
import { cn } from '../../../utils/cn'
import { useControllableState } from '../../../utils/useControllableState'

export interface CascaderOption {
  value: string
  label: string
  children?: CascaderOption[]
  disabled?: boolean
}

export interface CascaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: CascaderOption[]
  value?: string[]
  defaultValue?: string[]
  onChange?: (value: string[], labels: string[]) => void
}

export const Cascader = forwardRef<HTMLDivElement, CascaderProps>(function Cascader(
  { className, options, value, defaultValue = [], onChange, ...props },
  ref,
) {
  const [paths, setPaths] = useControllableState<string[]>({
    value,
    defaultValue,
    onChange: (next) => {
      const labels: string[] = []
      let currentOptions = options
      next.forEach((val) => {
        const node = currentOptions.find((opt) => opt.value === val)
        if (node) {
          labels.push(node.label)
          currentOptions = node.children ?? []
        }
      })
      onChange?.(next, labels)
    },
  })

  const levelOptions = useMemo(() => {
    const levels: CascaderOption[][] = [options]
    let current = options
    paths.forEach((path) => {
      const node = current.find((item) => item.value === path)
      if (node?.children?.length) {
        levels.push(node.children)
        current = node.children
      }
    })
    return levels
  }, [options, paths])

  return (
    <div ref={ref} className={cn('flex gap-2', className)} {...props}>
      {levelOptions.map((opts, levelIndex) => (
        <select
          key={`lv-${levelIndex}`}
          value={paths[levelIndex] ?? ''}
          onChange={(event) => {
            const next = [...paths.slice(0, levelIndex), event.target.value].filter(Boolean)
            setPaths(next)
          }}
          className="nova-focus-ring h-10 min-w-36 rounded-md border border-slate-300 bg-white px-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        >
          <option value="">请选择</option>
          {opts.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
      ))}
    </div>
  )
})
