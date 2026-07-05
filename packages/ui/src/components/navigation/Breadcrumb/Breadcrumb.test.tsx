import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Breadcrumb } from './Breadcrumb'

const items = [
  { key: 'home', label: 'Home', href: '/' },
  { key: 'library', label: 'Library', href: '/library' },
  { key: 'current', label: 'Current page' },
]

describe('Breadcrumb', () => {
  it('renders a labelled navigation landmark with ordered items', () => {
    render(<Breadcrumb items={items} />)

    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument()
    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
  })

  it('marks the last item as the current page by default', () => {
    render(<Breadcrumb items={items} />)

    expect(screen.getByText('Current page')).toHaveAttribute('aria-current', 'page')
    expect(screen.getByText('Current page').tagName).toBe('SPAN')
  })

  it('allows an explicit current item', () => {
    render(
      <Breadcrumb
        items={[
          { key: 'home', label: 'Home', href: '/' },
          { key: 'reports', label: 'Reports', href: '/reports', current: true },
          { key: 'detail', label: 'Detail', href: '/reports/detail' },
        ]}
      />,
    )

    expect(screen.getByRole('link', { name: 'Reports' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'Detail' })).not.toHaveAttribute('aria-current')
  })

  it('hides separators from the accessibility tree', () => {
    render(<Breadcrumb items={items} separator=">" />)

    const separators = screen.getAllByText('>')

    expect(separators).toHaveLength(2)
    expect(separators[0]).toHaveAttribute('aria-hidden', 'true')
  })

  it('keeps clickable non-link items interactive', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(
      <Breadcrumb
        items={[
          { key: 'home', label: 'Home', href: '/' },
          { key: 'action', label: 'Open menu', onClick },
        ]}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Open menu' }))

    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
