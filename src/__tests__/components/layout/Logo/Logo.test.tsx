import { render, screen } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import Logo from '@/components/layout/Logo/Logo'

jest.mock('next/font/google', () => ({
  Righteous: jest.fn().mockReturnValue({
    className: 'righteous-font',
  }),
}))

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('Logo 컴포넌트 유닛 테스트', () => {
  beforeEach(() => {
    ;(useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    })
  })

  test('Logo 컴포넌트가 "mynnect." 텍스트를 올바르게 렌더링해야 한다. (type="full")', () => {
    render(<Logo type="full" />)
    const logoElement = screen.getByTestId('logo')
    expect(logoElement).toBeInTheDocument()
    expect(logoElement).toHaveTextContent('mynnect.')
  })

  test('Logo 컴포넌트가 "my." 텍스트를 올바르게 렌더링해야 한다. (type="short")', () => {
    render(<Logo type="short" />)
    const logoElement = screen.getByTestId('logo')
    expect(logoElement).toBeInTheDocument()
    expect(logoElement).toHaveTextContent('my.')
  })
})
