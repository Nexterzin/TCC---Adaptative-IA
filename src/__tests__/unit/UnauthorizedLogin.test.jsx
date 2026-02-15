import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import UnauthorizedLogin from '../../app/Commons/Component/UnauthorizedLogin'
import { useRouter } from 'next/navigation'

// Mock next/navigation
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}))

describe('UnauthorizedLogin', () => {
    it('renders access restricted message', () => {
        useRouter.mockReturnValue({ push: jest.fn() })
        render(<UnauthorizedLogin />)
        expect(screen.getByText(/Acesso Restrito/i)).toBeInTheDocument()
        expect(screen.getByText(/não tem permissão/i)).toBeInTheDocument()
    })

    it('navigates to home when button is clicked', () => {
        const pushMock = jest.fn()
        useRouter.mockReturnValue({ push: pushMock })

        render(<UnauthorizedLogin />)
        const button = screen.getByRole('button', { name: /Voltar para Página Inicial/i })
        fireEvent.click(button)

        expect(pushMock).toHaveBeenCalledWith('/')
    })
})
