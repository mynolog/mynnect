import { render, screen } from '@testing-library/react'
import AuthButton from '@/components/common/Button/AuthButton'

describe('AuthButton 컴포넌트 유닛 테스트', () => {
  test('AuthButton 컴포넌트의 label 속성이 "login"일 때, 버튼 라벨에 "로그인"이 표시되어야 한다.', () => {
    render(<AuthButton label="login" />)
    const AuthButtonElement = screen.getByTestId('auth-button')
    expect(AuthButtonElement).toBeInTheDocument()
    expect(AuthButtonElement).toHaveTextContent('로그인')
  })

  test('AuthButton 컴포넌트의 label 속성이 "signup"일 때, 버튼 라벨에 "회원가입"이 표시되어야 한다.', () => {
    render(<AuthButton label="signup" />)
    const AuthButtonElement = screen.getByTestId('auth-button')
    expect(AuthButtonElement).toBeInTheDocument()
    expect(AuthButtonElement).toHaveTextContent('회원가입')
  })
})
