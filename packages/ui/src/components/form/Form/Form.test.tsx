import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import type { FormRule } from './Form.types'
import { Form, FormItem } from './Form'

const emailRequiredRules: FormRule[] = [{ required: true, message: 'Email is required' }]
const emailRequiredOnly: FormRule[] = [{ required: true }]

describe('Form', () => {
  it('shows validation error on submit when field is required and empty', () => {
    render(
      <Form validateTrigger="onSubmit">
        <FormItem name="email" label="Email" rules={emailRequiredRules}>
          <input id="email" />
        </FormItem>
        <button type="submit">Submit</button>
      </Form>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }))
    expect(screen.getByText('Email is required')).toBeInTheDocument()

    const field = screen.getByRole('textbox')
    expect(field).toHaveAttribute('aria-invalid', 'true')

    const alert = screen.getByRole('alert')
    expect(field.getAttribute('aria-describedby')).toBe(alert.id)
  })

  it('calls onSubmit with values when validation passes', () => {
    const onSubmit = vi.fn()

    render(
      <Form onSubmit={onSubmit} initialValues={{ email: '' }}>
        <FormItem name="email" label="Email" rules={emailRequiredOnly}>
          <input id="email" />
        </FormItem>
        <button type="submit">Submit</button>
      </Form>,
    )

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'a@b.co' } })
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }))

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ email: 'a@b.co' }))
  })

  it('associates FormItem label with control via htmlFor when child has no id', () => {
    render(
      <Form initialValues={{ email: '' }}>
        <FormItem name="email" label="Email" rules={emailRequiredOnly}>
          <input />
        </FormItem>
        <button type="submit">Submit</button>
      </Form>,
    )

    const field = screen.getByRole('textbox', { name: /^Email/ })
    expect(field).toBeInTheDocument()
    expect(field).toHaveAttribute('id')
  })

  it('links help text to the control with aria-describedby when there is no error', () => {
    render(
      <Form initialValues={{ note: '' }}>
        <FormItem name="note" label="Note" help="Optional hint">
          <input id="note" />
        </FormItem>
      </Form>,
    )

    const field = screen.getByRole('textbox')
    const hint = screen.getByText('Optional hint')
    expect(field.getAttribute('aria-describedby')).toBe(hint.id)
    expect(field).not.toHaveAttribute('aria-invalid')
  })

  it('includes validateStatus success and warning text ids in aria-describedby', () => {
    const { rerender } = render(
      <Form initialValues={{ x: '' }}>
        <FormItem name="x" label="Field" validateStatus="success">
          <input id="x" />
        </FormItem>
      </Form>,
    )

    let field = screen.getByRole('textbox')
    let status = screen.getByText('Looks good')
    expect(field.getAttribute('aria-describedby')).toBe(status.id)

    rerender(
      <Form initialValues={{ x: '' }}>
        <FormItem name="x" label="Field" validateStatus="warning">
          <input id="x" />
        </FormItem>
      </Form>,
    )

    field = screen.getByRole('textbox')
    status = screen.getByText('Please review this field')
    expect(field.getAttribute('aria-describedby')).toBe(status.id)
  })

  it('combines help and validateStatus success in aria-describedby', () => {
    render(
      <Form initialValues={{ x: '' }}>
        <FormItem name="x" label="Field" help="Hint text" validateStatus="success">
          <input id="x" />
        </FormItem>
      </Form>,
    )

    const field = screen.getByRole('textbox')
    const hint = screen.getByText('Hint text')
    const status = screen.getByText('Looks good')
    const ids = field.getAttribute('aria-describedby')?.split(/\s+/).filter(Boolean) ?? []

    expect(ids).toEqual(expect.arrayContaining([hint.id, status.id]))
    expect(ids).toHaveLength(2)
  })

  it('includes extra slot in aria-describedby', () => {
    render(
      <Form initialValues={{ x: '' }}>
        <FormItem name="x" label="Field" extra="Extra note">
          <input id="x" />
        </FormItem>
      </Form>,
    )

    const field = screen.getByRole('textbox')
    const slotId = field.getAttribute('aria-describedby')
    expect(slotId).toBeTruthy()
    expect(document.getElementById(slotId!)).toHaveTextContent('Extra note')
  })

  it('combines help, validateStatus, and extra in aria-describedby', () => {
    render(
      <Form initialValues={{ x: '' }}>
        <FormItem name="x" label="Field" help="Hint text" extra="Extra note" validateStatus="success">
          <input id="x" />
        </FormItem>
      </Form>,
    )

    const field = screen.getByRole('textbox')
    const ids = field.getAttribute('aria-describedby')?.split(/\s+/).filter(Boolean) ?? []

    expect(ids).toHaveLength(3)
    expect(document.getElementById(ids[0])).toHaveTextContent('Hint text')
    expect(document.getElementById(ids[1])).toHaveTextContent('Looks good')
    expect(document.getElementById(ids[2])).toHaveTextContent('Extra note')
  })

  it('exposes field group semantics when label is set', () => {
    render(
      <Form initialValues={{ email: '' }}>
        <FormItem name="email" label="Email" rules={emailRequiredOnly}>
          <input id="email" />
        </FormItem>
      </Form>,
    )

    const label = screen.getByText(/^Email/).closest('label')
    expect(label).toHaveAttribute('id')
    const group = label?.closest('[data-nova-form-item]')
    expect(group).toHaveAttribute('role', 'group')
    expect(group).toHaveAttribute('aria-labelledby', label?.getAttribute('id') ?? '')
  })

  it('does not use role=group when label is omitted', () => {
    render(
      <Form initialValues={{ code: '' }}>
        <FormItem name="code" rules={emailRequiredOnly}>
          <input id="code" />
        </FormItem>
      </Form>,
    )

    const wrap = document.querySelector('[data-nova-form-item]')
    expect(wrap).not.toHaveAttribute('role')
    expect(wrap).not.toHaveAttribute('aria-labelledby')
  })

  it('uses explicit child id for label htmlFor when id is provided', () => {
    render(
      <Form initialValues={{ email: '' }}>
        <FormItem name="email" label="Work email" rules={emailRequiredOnly}>
          <input id="work-email" />
        </FormItem>
      </Form>,
    )

    expect(document.getElementById('work-email')).toBeInTheDocument()
    const label = screen.getByText('Work email').closest('label')
    expect(label).toHaveAttribute('for', 'work-email')
  })
})
