import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Progress } from './Progress'

describe('Progress', () => {
  it('exposes determinate progressbar semantics from percent', () => {
    render(<Progress percent={42} aria-label="Upload progress" />)

    const progress = screen.getByRole('progressbar', { name: 'Upload progress' })

    expect(progress).toHaveAttribute('aria-valuemin', '0')
    expect(progress).toHaveAttribute('aria-valuemax', '100')
    expect(progress).toHaveAttribute('aria-valuenow', '42')
    expect(progress).toHaveAttribute('aria-valuetext', '42%')
  })

  it('keeps progressbar values in sync with the clamped visual percentage', () => {
    render(<Progress percent={120} />)

    const progress = screen.getByRole('progressbar', { name: 'Progress' })

    expect(progress).toHaveAttribute('aria-valuenow', '100')
    expect(progress).toHaveAttribute('aria-valuetext', '100%')
    expect(screen.getByText('100%')).toBeInTheDocument()
  })

  it('uses custom formatted text for visible and accessible value text', () => {
    render(<Progress percent={75} format={(value) => `${value} days`} />)

    const progress = screen.getByRole('progressbar', { name: 'Progress' })

    expect(progress).toHaveAttribute('aria-valuenow', '75')
    expect(progress).toHaveAttribute('aria-valuetext', '75 days')
    expect(screen.getByText('75 days')).toBeInTheDocument()
  })

  it('keeps explicit value text when custom formatted content is visual only', () => {
    render(
      <Progress
        percent={75}
        format={(value) => <span>{value} days</span>}
        aria-valuetext="75 days remaining"
      />,
    )

    const progress = screen.getByRole('progressbar', { name: 'Progress' })

    expect(progress).toHaveAttribute('aria-valuetext', '75 days remaining')
    expect(screen.getByText('75 days')).toBeInTheDocument()
  })

  it('supports external labelling and custom value text', () => {
    render(
      <div>
        <span id="sync-progress-label">Sync progress</span>
        <Progress
          percent={64}
          aria-labelledby="sync-progress-label"
          aria-valuetext="64 percent complete"
          showInfo={false}
        />
      </div>,
    )

    const progress = screen.getByRole('progressbar', { name: 'Sync progress' })

    expect(progress).toHaveAttribute('aria-valuenow', '64')
    expect(progress).toHaveAttribute('aria-valuetext', '64 percent complete')
    expect(screen.queryByText('64%')).not.toBeInTheDocument()
  })
})