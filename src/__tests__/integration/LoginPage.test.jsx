import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import LoginPage from '../../app/page'
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

describe('LoginPage', () => {
    const mockPush = jest.fn()

    beforeEach(() => {
        useRouter.mockReturnValue({ push: mockPush })
        jest.clearAllMocks()
    })

    it('renders login form', () => {
        render(<LoginPage />)
        expect(screen.getByPlaceholderText(/insira seu e-mail/i)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/insira sua senha/i)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /avançar/i })).toBeInTheDocument()
    })

    it('handles input changes', () => {
        render(<LoginPage />)
        const emailInput = screen.getByPlaceholderText(/insira seu e-mail/i)
        const passwordInput = screen.getByPlaceholderText(/insira sua senha/i)

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
        fireEvent.change(passwordInput, { target: { value: 'password123' } })

        expect(emailInput.value).toBe('test@example.com')
        expect(passwordInput.value).toBe('password123')
    })

    it('handles successful login', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ token: 'fake-token' }),
        })

        render(<LoginPage />)

        fireEvent.change(screen.getByPlaceholderText(/insira seu e-mail/i), { target: { value: 'test@example.com' } })
        fireEvent.change(screen.getByPlaceholderText(/insira sua senha/i), { target: { value: 'password123' } })

        fireEvent.click(screen.getByRole('button', { name: /avançar/i }))

        await waitFor(() => {
            expect(toast.success).toHaveBeenCalledWith('Usuário logado com sucesso!')
        })

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith('/PagesRouter/Home')
        }, { timeout: 2000 }) // The component has a 1000ms delay
    })

    it('handles failed login', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: false,
            text: async () => 'Invalid credentials',
        })

        render(<LoginPage />)

        fireEvent.change(screen.getByPlaceholderText(/insira seu e-mail/i), { target: { value: 'test@example.com' } })
        fireEvent.change(screen.getByPlaceholderText(/insira sua senha/i), { target: { value: 'wrongpassword' } })

        fireEvent.click(screen.getByRole('button', { name: /avançar/i }))

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Invalid credentials')
        })

        expect(mockPush).not.toHaveBeenCalled()
    })

    it('navigates to register page', async () => {
        render(<LoginPage />)
        const registerLink = screen.getByText(/registre-se/i)
        fireEvent.click(registerLink)

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith('/PagesRouter/Register')
        }, { timeout: 1500 })
    })

    it('navigates to recovery page', async () => {
        render(<LoginPage />)
        const recoveryLink = screen.getByText(/esqueceu sua senha\?/i)
        fireEvent.click(recoveryLink)

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith('/PagesRouter/Password-recovery')
        }, { timeout: 1500 })
    })
})
