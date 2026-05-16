import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Upload } from './Upload'

function flushMicrotasks() {
  return Promise.resolve()
}

describe('Upload', () => {
  it('calls onChange with items and raw File objects', async () => {
    const onChange = vi.fn()
    render(<Upload onChange={onChange} />)

    const input = screen.getByLabelText(/Choose file to upload/i) as HTMLInputElement

    const file = new File(['x'], 'a.txt', { type: 'text/plain' })
    fireEvent.change(input, { target: { files: [file] } })

    await flushMicrotasks()

    expect(onChange).toHaveBeenCalledTimes(1)
    const [items, raw] = onChange.mock.calls[0] as [unknown, unknown]
    expect(Array.isArray(items)).toBe(true)
    expect(items).toHaveLength(1)
    expect((items as { name: string }[])[0].name).toBe('a.txt')
    expect(raw).toEqual([file])
  })

  it('respects beforeUpload returning false', async () => {
    const onChange = vi.fn()
    render(<Upload onChange={onChange} beforeUpload={() => false} />)

    const input = document.querySelector('input[type="file"]') as HTMLInputElement
    const file = new File(['x'], 'skip.txt', { type: 'text/plain' })
    fireEvent.change(input, { target: { files: [file] } })

    await flushMicrotasks()

    expect(onChange).not.toHaveBeenCalled()
  })

  it('honors maxCount against current fileList', async () => {
    const onChange = vi.fn()
    render(
      <Upload
        maxCount={1}
        fileList={[{ uid: '1', name: 'existing.txt' }]}
        onChange={onChange}
      />,
    )

    const input = document.querySelector('input[type="file"]') as HTMLInputElement
    const file = new File(['x'], 'new.txt', { type: 'text/plain' })
    fireEvent.change(input, { target: { files: [file] } })

    await flushMicrotasks()

    expect(onChange).not.toHaveBeenCalled()
  })

  it('invokes onRemove when remove is clicked', () => {
    const onRemove = vi.fn()
    render(
      <Upload
        fileList={[{ uid: 'u1', name: 'a.txt' }]}
        onRemove={onRemove}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Remove a.txt' }))
    expect(onRemove).toHaveBeenCalledWith({ uid: 'u1', name: 'a.txt' })
  })

  it('skips files larger than maxSize', async () => {
    const onChange = vi.fn()
    render(<Upload onChange={onChange} maxSize={2} />)

    const input = document.querySelector('input[type="file"]') as HTMLInputElement
    const file = new File(['hello'], 'big.txt', { type: 'text/plain' })
    fireEvent.change(input, { target: { files: [file] } })

    await flushMicrotasks()

    expect(onChange).not.toHaveBeenCalled()
  })

  it('associates label with file input for keyboard users', () => {
    render(<Upload triggerText="Pick files" />)

    const input = document.querySelector('input[type="file"]') as HTMLInputElement
    const label = screen.getByText('Pick files').closest('label')
    expect(label).toHaveAttribute('for', input.id)
  })
})
