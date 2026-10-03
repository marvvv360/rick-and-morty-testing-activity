import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Pagination from './Pagination'

describe('Pagination Component', () => {
  it('renders current page and total pages text correctly', () => {
    const { getByText } = render(<Pagination currentPage={2} totalPages={5} />)
    
    expect(getByText('Page 2 of 5')).toBeTruthy()
  })

  it('renders both previous and next links when in a middle page', () => {
    const { getByText } = render(<Pagination currentPage={3} totalPages={5} />)
    
    const prevLink = getByText(/Previous/i).closest('a')
    const nextLink = getByText(/Next/i).closest('a')

    expect(prevLink?.getAttribute('href')).toBe('/?page=2')
    expect(nextLink?.getAttribute('href')).toBe('/?page=4')
  })

  it('disables previous button when on the first page', () => {
    const { getByText } = render(<Pagination currentPage={1} totalPages={5} />)
    
    const prevElement = getByText(/Previous/i)
    const nextLink = getByText(/Next/i).closest('a')

    // En la primera página, "Previous" se renderiza como span (deshabilitado)
    expect(prevElement.tagName).toBe('SPAN')
    expect(nextLink?.getAttribute('href')).toBe('/?page=2')
  })

  it('disables next button when on the last page', () => {
    const { getByText } = render(<Pagination currentPage={5} totalPages={5} />)
    
    const prevLink = getByText(/Previous/i).closest('a')
    const nextElement = getByText(/Next/i)

    expect(prevLink?.getAttribute('href')).toBe('/?page=4')
    // En la última página, "Next" se renderiza como span (deshabilitado)
    expect(nextElement.tagName).toBe('SPAN')
  })
})