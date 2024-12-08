import { render, screen } from '@testing-library/react'
import Logo from '@/components/layout/Logo/Logo'

describe('Logo 컴포넌트 유닛 테스트', () => {
  test('Logo 컴포넌트의 type 속성이 "full"일 때, "mynnect."가 표시되어야 한다.', () => {
    render(<Logo type="full" />)
    const logoElement = screen.getByTestId('logo')
    expect(logoElement).toBeInTheDocument()
    expect(logoElement).toHaveTextContent('mynnect.')
  })

  test('Logo 컴포넌트의 type 속성이 "short"일 때, "my."가 표시되어야 한다.', () => {
    render(<Logo type="short" />)
    const logoElement = screen.getByTestId('logo')
    expect(logoElement).toBeInTheDocument()
    expect(logoElement).toHaveTextContent('my.')
  })
})
