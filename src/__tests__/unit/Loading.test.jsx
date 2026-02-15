import React from 'react'
import { render } from '@testing-library/react'
import Loading from '../../app/Commons/Component/Loading/loading'

describe('Loading', () => {
    it('renders without crashing', () => {
        const { container } = render(<Loading />)
        expect(container).toBeInTheDocument()
        // Check for specific structure if needed, e.g., class names
        expect(container.getElementsByClassName('content').length).toBe(1)
    })
})
