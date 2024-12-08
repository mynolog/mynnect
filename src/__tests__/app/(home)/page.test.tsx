import { render, screen } from '@testing-library/react'
import Home from '@/app/(home)/page'

describe('Home 컴포넌트 테스트', () => {
  test('로고 레이블이 "mynnect."로 표시되어야 한다.', () => {
    render(<Home />)
    expect(screen.getByText('mynnect.')).toBeInTheDocument()
  })
})
