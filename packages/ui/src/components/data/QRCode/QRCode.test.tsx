import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { QRCode } from './QRCode'

describe('QRCode', () => {
  it('exposes the generated code as an image by default', () => {
    render(<QRCode value="https://leno23.github.io/react-ui-library/" />)

    const qrCode = screen.getByRole('img', { name: 'QR code' })

    expect(qrCode).toBeInTheDocument()
    expect(qrCode.querySelector('span')).toHaveAttribute('aria-hidden', 'true')
  })

  it('allows consumers to provide a specific accessible label', () => {
    render(
      <QRCode
        value="https://leno23.github.io/react-ui-library/"
        aria-label="Scan to open Nova UI docs"
      />,
    )

    expect(screen.getByRole('img', { name: 'Scan to open Nova UI docs' })).toBeInTheDocument()
  })

  it('supports external labelling without adding the default label', () => {
    render(
      <div>
        <span id="qr-label">Nova UI docs QR code</span>
        <QRCode
          value="https://leno23.github.io/react-ui-library/"
          aria-labelledby="qr-label"
        />
      </div>,
    )

    const qrCode = screen.getByRole('img', { name: 'Nova UI docs QR code' })

    expect(qrCode).not.toHaveAttribute('aria-label')
  })
})