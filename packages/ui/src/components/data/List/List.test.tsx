import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { List } from './List'

describe('List', () => {
  const dataSource = [
    { key: '1', title: 'Alice', description: 'Admin', content: 'Primary owner' },
    { key: '2', title: 'Bob', description: 'Editor', content: 'Content reviewer' },
  ]

  it('renders list items with header and footer', () => {
    render(<List header="Users" footer="2 people" dataSource={dataSource} />)

    expect(screen.getByText('Users')).toBeInTheDocument()
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('Content reviewer')).toBeInTheDocument()
    expect(screen.getByText('2 people')).toBeInTheDocument()
  })

  it('announces loading state while marking the list busy', () => {
    render(<List loading aria-busy={false} dataSource={dataSource} />)

    const status = screen.getByRole('status')

    expect(status).toHaveTextContent('Loading...')
    expect(status).toHaveAttribute('aria-live', 'polite')
    expect(status.parentElement).toHaveAttribute('aria-busy', 'true')
    expect(screen.queryByText('Alice')).not.toBeInTheDocument()
  })
})
