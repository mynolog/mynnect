import { render, screen } from '@testing-library/react'
import Home from '../page'

describe('Home component', () => {
  it('renders the correct text', () => {
    render(<Home />)
    expect(screen.getByText('mynnect')).toBeInTheDocument()
  })
})
