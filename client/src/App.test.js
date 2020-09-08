import React from 'react'
import { render, cleanup } from '@testing-library/react'
import App from './App'
import { filterToilets } from './App'

afterEach(cleanup)

const testToilets = [
    {
        tags: ['electric']
    },
    {
        tags: ['squat']
    }
]

it('should not filter toilets with no required tags', () => {
    const tags = {
        baby: false,
        wheelchair: false,
        squat: false,
        urinal: false,
        electric: false,
        regular: false
    }
    const filteredToilets = filterToilets(testToilets, tags)
    expect(filteredToilets.length).toBe(2)
})

it('should filter toilets with matching tags', () => {
    const tags = {
        baby: false,
        wheelchair: false,
        squat: false,
        urinal: false,
        electric: true,
        regular: false
    }
    const filteredToilets = filterToilets(testToilets, tags)
    expect(filteredToilets.length).toBe(1)
})
