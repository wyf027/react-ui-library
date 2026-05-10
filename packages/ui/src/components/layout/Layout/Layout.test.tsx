import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Layout } from './Layout'
import { LayoutContent } from './LayoutContent'
import { LayoutHeader } from './LayoutHeader'
import { LayoutSider } from './LayoutSider'

describe('Layout', () => {
  it('applies vertical column classes by default', () => {
    render(
      <Layout data-testid="layout">
        <span>child</span>
      </Layout>,
    )

    expect(screen.getByTestId('layout')).toHaveClass('flex-col')
    expect(screen.getByText('child')).toBeInTheDocument()
  })

  it('applies horizontal row classes when direction is horizontal', () => {
    render(
      <Layout direction="horizontal" data-testid="layout">
        <span>a</span>
      </Layout>,
    )

    expect(screen.getByTestId('layout')).toHaveClass('flex-row')
  })

  it('composes header, sider, and content regions', () => {
    render(
      <Layout data-testid="root">
        <LayoutHeader>顶栏</LayoutHeader>
        <Layout direction="horizontal">
          <LayoutSider data-testid="sider">侧栏</LayoutSider>
          <LayoutContent>内容</LayoutContent>
        </Layout>
      </Layout>,
    )

    expect(screen.getByTestId('root')).toHaveClass('flex-col')
    expect(screen.getByRole('banner')).toHaveTextContent('顶栏')
    expect(screen.getByTestId('sider')).toHaveTextContent('侧栏')
    expect(screen.getByRole('main')).toHaveTextContent('内容')
  })
})
