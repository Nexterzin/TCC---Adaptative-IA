import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import RecoveryPage from '../../app/Commons/Password-Recovery/RecoveryPage'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

// Mock next/navigation
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}))

// Mock react-toastify
jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
    ToastContainer: () => <div>ToastContainer</div>
}))

// Mock fetch
global.fetch = jest.fn()

describe('RecoveryPage', () => {
    const mockPush = jest.fn()

    beforeEach(() => {
        useRouter.mockReturnValue({ push: mockPush })
        jest.clearAllMocks()
    })

    it('renders recovery form', () => {
        render(<RecoveryPage />)
        expect(screen.getByPlaceholderText(/insira seu e-mail/i)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /avançar/i })).toBeInTheDocument()
    })

    it('validates empty email', async () => {
        render(<RecoveryPage />)
        fireEvent.click(screen.getByRole('button', { name: /avançar/i }))

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Favor inserir email para envio de recuperação de senha!')
        })
    })

    it('handles successful recovery request', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({}),
        })

        render(<RecoveryPage />)

        fireEvent.change(screen.getByPlaceholderText(/insira seu e-mail/i), { target: { value: 'test@example.com' } })
        fireEvent.click(screen.getByRole('button', { name: /avançar/i }))

        await waitFor(() => {
            expect(toast.success).toHaveBeenCalledWith('E-mail de recuperação de senha enviado!')
        })

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith('/PagesRouter/Login')
        }, { timeout: 3000 })
    })

    it('handles recovery failure', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: false,
            json: async () => ({ message: 'Email not found' }),
        })

        render(<RecoveryPage />)

        fireEvent.change(screen.getByPlaceholderText(/insira seu e-mail/i), { target: { value: 'test@example.com' } })
        fireEvent.click(screen.getByRole('button', { name: /avançar/i }))

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Email not found')
        })
    })
})
