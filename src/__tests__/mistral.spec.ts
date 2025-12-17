import { describe, it, expect } from 'vitest'
import { isChatAvailable } from '../lib/mistral'

describe('mistral env validation', () => {
  it('returns boolean based on DEV flag', () => {
    expect(typeof isChatAvailable()).toBe('boolean')
  })
})

