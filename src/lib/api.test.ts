import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getCharacters, getCharacter, getEpisodes } from './api'

describe('API Services', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  describe('getCharacters', () => {
    it('should fetch characters successfully', async () => {
      const mockResponse = { results: [{ id: 1, name: 'Rick Sanchez' }] }
      
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      }))

      const data = await getCharacters(1)
      expect(data).toEqual(mockResponse)
      expect(fetch).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character?page=1')
    })

    it('should throw an error when response is not ok', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: false,
      }))

      await expect(getCharacters(1)).rejects.toThrow('Failed to fetch characters')
    })
  })

  describe('getCharacter', () => {
    it('should fetch a single character successfully', async () => {
      const mockCharacter = { id: 1, name: 'Rick Sanchez' }

      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockCharacter,
      }))

      const data = await getCharacter('1')
      expect(data).toEqual(mockCharacter)
      expect(fetch).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character/1')
    })

    it('should throw an error when character fetch fails', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: false,
      }))

      await expect(getCharacter('1')).rejects.toThrow('Failed to fetch character details')
    })
  })

  describe('getEpisodes', () => {
    it('should return empty array if ids list is empty', async () => {
      const data = await getEpisodes([])
      expect(data).toEqual([])
    })

    it('should fetch multiple episodes as an array successfully', async () => {
      const mockEpisodes = [{ id: 1, name: 'Pilot' }, { id: 2, name: 'Lawnmower Dog' }]

      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockEpisodes,
      }))

      const data = await getEpisodes(['1', '2'])
      expect(data).toEqual(mockEpisodes)
      expect(fetch).toHaveBeenCalledWith('https://rickandmortyapi.com/api/episode/1,2')
    })

    it('should wrap single episode object into an array', async () => {
      const singleEpisode = { id: 1, name: 'Pilot' }

      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: true,
        json: async () => singleEpisode,
      }))

      const data = await getEpisodes(['1'])
      expect(data).toEqual([singleEpisode])
    })

    it('should throw an error when episodes fetch fails', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: false,
      }))

      await expect(getEpisodes(['1'])).rejects.toThrow('Failed to fetch episodes')
    })
  })
})