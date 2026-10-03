import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CharacterCard from './CharacterCard'
import { Character } from '@/types/rickandmorty'

const mockCharacter: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth', url: '' },
  location: { name: 'Citadel of Ricks', url: '' },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: [],
  url: '',
  created: '',
}

describe('CharacterCard Component', () => {
  it('renders character details and link correctly', () => {
    const { getByText, getByRole, getByAltText } = render(<CharacterCard character={mockCharacter} />)

    // Aserciones nativas compatibles con TypeScript
    expect(getByText('Rick Sanchez')).toBeTruthy()
    expect(getByText('Alive - Human')).toBeTruthy()
    expect(getByText('Citadel of Ricks')).toBeTruthy()

    const link = getByRole('link')
    expect(link.getAttribute('href')).toBe('/character/1')

    const image = getByAltText('Rick Sanchez')
    expect(image).toBeTruthy()
  })

  it('renders correct status color style for Dead status', () => {
    const deadCharacter = { ...mockCharacter, status: 'Dead' as const }
    const { container } = render(<CharacterCard character={deadCharacter} />)
    
    expect(container.querySelector('.bg-red-500')).not.toBeNull()
  })

  it('renders fallback style for unknown status', () => {
    const unknownCharacter = { ...mockCharacter, status: 'unknown' as const }
    const { container } = render(<CharacterCard character={unknownCharacter} />)
    
    expect(container.querySelector('.bg-gray-500')).not.toBeNull()
  })
})