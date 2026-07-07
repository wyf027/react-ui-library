import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Carousel } from './Carousel'

describe('Carousel', () => {
  const items = [
    <div key="one">First slide</div>,
    <div key="two">Second slide</div>,
    <div key="three">Third slide</div>,
  ]

  it('exposes carousel and slide semantics', () => {
    render(<Carousel items={items} aria-label="Featured stories" />)

    const carousel = screen.getByRole('region', { name: 'Featured stories' })
    expect(carousel).toHaveAttribute('aria-roledescription', 'carousel')
    expect(carousel).toHaveAttribute('tabindex', '0')

    expect(screen.getByRole('group', { name: '1 of 3' })).toHaveAttribute(
      'aria-roledescription',
      'slide',
    )
    expect(screen.getByText('Slide 1 of 3')).toHaveAttribute('aria-live', 'polite')
  })

  it('marks the active dot and updates it when a dot is chosen', async () => {
    const user = userEvent.setup()
    render(<Carousel items={items} aria-label="Gallery" />)

    const firstDot = screen.getByRole('button', { name: 'Show slide 1 of 3' })
    const thirdDot = screen.getByRole('button', { name: 'Show slide 3 of 3' })

    expect(firstDot).toHaveAttribute('aria-current', 'true')
    expect(thirdDot).not.toHaveAttribute('aria-current')

    await user.click(thirdDot)

    expect(firstDot).not.toHaveAttribute('aria-current')
    expect(thirdDot).toHaveAttribute('aria-current', 'true')
    expect(screen.getByText('Slide 3 of 3')).toBeInTheDocument()
  })

  it('supports keyboard slide navigation from the carousel region', async () => {
    const user = userEvent.setup()
    render(<Carousel items={items} aria-label="Gallery" />)

    const carousel = screen.getByRole('region', { name: 'Gallery' })
    carousel.focus()

    await user.keyboard('{ArrowRight}')
    expect(screen.getByText('Slide 2 of 3')).toBeInTheDocument()

    await user.keyboard('{End}')
    expect(screen.getByText('Slide 3 of 3')).toBeInTheDocument()

    await user.keyboard('{Home}')
    expect(screen.getByText('Slide 1 of 3')).toBeInTheDocument()

    await user.keyboard('{ArrowLeft}')
    expect(screen.getByText('Slide 3 of 3')).toBeInTheDocument()
  })

  it('does not announce automatic slide changes as live updates', () => {
    render(<Carousel items={items} aria-label="Gallery" autoplay />)

    expect(screen.getByText('Slide 1 of 3')).toHaveAttribute('aria-live', 'off')
  })

  it('lets users stop automatic slide rotation', async () => {
    const user = userEvent.setup()
    render(<Carousel items={items} aria-label="Gallery" autoplay />)

    const stopButton = screen.getByRole('button', { name: 'Stop slide rotation' })
    expect(stopButton).toHaveTextContent('Stop')
    expect(screen.getByText('Slide 1 of 3')).toHaveAttribute('aria-live', 'off')

    await user.click(stopButton)

    expect(screen.getByRole('button', { name: 'Start slide rotation' })).toHaveTextContent('Start')
    expect(screen.getByText('Slide 1 of 3')).toHaveAttribute('aria-live', 'polite')
  })

  it('stops automatic rotation when focus enters slide controls', async () => {
    render(<Carousel items={items} aria-label="Gallery" autoplay />)

    screen.getByRole('button', { name: 'Next slide' }).focus()

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Start slide rotation' })).toBeInTheDocument()
    })
    expect(screen.getByText('Slide 1 of 3')).toHaveAttribute('aria-live', 'polite')
  })

  it('pauses automatic rotation while the pointer is over the carousel', async () => {
    const user = userEvent.setup()
    render(<Carousel items={items} aria-label="Gallery" autoplay />)

    const carousel = screen.getByRole('region', { name: 'Gallery' })

    await user.hover(carousel)
    expect(screen.getByText('Slide 1 of 3')).toHaveAttribute('aria-live', 'polite')

    await user.unhover(carousel)
    expect(screen.getByText('Slide 1 of 3')).toHaveAttribute('aria-live', 'off')
  })
})
