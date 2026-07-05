import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Upload } from './Upload'

describe('Upload', () => {
  it('exposes a focusable file input through the visible trigger text', async () => {
    const user = userEvent.setup()

    render(<Upload triggerText="Select files" />)

    const input = screen.getByLabelText('Select files')
    expect(input).toHaveAttribute('type', 'file')

    await user.tab()
    expect(input).toHaveFocus()
  })

  it('calls onChange with selected file metadata', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const file = new File(['hello'], 'report.txt', {
      lastModified: 123,
      type: 'text/plain',
    })

    render(<Upload triggerText="Upload report" onChange={onChange} />)

    await user.upload(screen.getByLabelText('Upload report'), file)

    expect(onChange).toHaveBeenCalledWith([
      {
        uid: 'report.txt-123',
        name: 'report.txt',
        size: 5,
      },
    ])
  })

  it('passes accept, multiple, and disabled attributes to the input', () => {
    render(<Upload triggerText="Upload images" accept="image/png" multiple disabled />)

    const input = screen.getByLabelText('Upload images')

    expect(input).toHaveAttribute('accept', 'image/png')
    expect(input).toHaveAttribute('multiple')
    expect(input).toBeDisabled()
  })

  it('renders the controlled file list with list semantics', () => {
    render(
      <Upload
        fileList={[
          { uid: '1', name: 'first.pdf' },
          { uid: '2', name: 'second.pdf' },
        ]}
      />,
    )

    expect(screen.getByRole('list', { name: 'Uploaded files' })).toBeInTheDocument()
    expect(screen.getByText('first.pdf')).toBeInTheDocument()
    expect(screen.getByText('second.pdf')).toBeInTheDocument()
  })
})
