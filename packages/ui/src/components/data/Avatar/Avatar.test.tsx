import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Avatar } from './Avatar'

describe('Avatar', () => {
  it('exposes fallback initials as an image when a name is available', () => {
    render(<Avatar name="Ada Lovelace" />)

    const avatar = screen.getByRole('img', { name: 'Ada Lovelace' })

    expect(avatar).toHaveTextContent('A')
  })

  it('uses alt text as the fallback accessible name when provided', () => {
    render(<Avatar name="Ada Lovelace" alt="Profile photo for Ada" />)

    expect(screen.getByRole('img', { name: 'Profile photo for Ada' })).toHaveTextContent('A')
  })

  it('keeps an anonymous fallback decorative when no name or alt is provided', () => {
    render(<Avatar />)

    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(screen.getByText('?')).toBeInTheDocument()
  })
})