import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Home component', () => {
  it('renders the correct text', () => {
    render(<Home />)
    expect(screen.getByText('mynnect')).toBeInTheDocument()
  })
})
