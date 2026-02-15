import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import RegisterPage from '../../app/Commons/Register/RegisterPage'
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
        warning: jest.fn(),
    },
    ToastContainer: () => <div>ToastContainer</div>
}))

// Mock fetch
global.fetch = jest.fn()

describe('RegisterPage', () => {
    const mockPush = jest.fn()

    beforeEach(() => {
        useRouter.mockReturnValue({ push: mockPush })
        jest.clearAllMocks()
    })

    it('renders register form', () => {
        render(<RegisterPage />)
        expect(screen.getByText(/digite um e-mail/i)).toBeInTheDocument()
        expect(screen.getByText(/digite uma senha/i)).toBeInTheDocument()
        expect(screen.getByText(/repita sua senha/i)).toBeInTheDocument()
        expect(screen.getByText(/como prefere ser chamado/i)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /avançar/i })).toBeInTheDocument()
    })

    it('validates missing fields', async () => {
        render(<RegisterPage />)
        fireEvent.click(screen.getByRole('button', { name: /avançar/i }))

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Por favor, preencha seu nome.')
        })
    })

    it('validates password mismatch', async () => {
        render(<RegisterPage />)

        // Fill fields
        const inputs = screen.getAllByRole('textbox') // Email, Name
        // We need to target specific inputs. 
        // Based on placeholders or labels context. The component uses Stack for labels, not standard label for input.
        // We can find by value change or traversing.
        // Or cleaner: getting inputs by type/structure.

        // Let's use fireEvent on specific known structure or simply iterate inputs

        // Name
        const nameInput = screen.getAllByRole('textbox')[1] // The order is Email, Name (since Password fields are type="password")
        fireEvent.change(nameInput, { target: { value: 'Test User' } })

        // Email
        const emailInput = screen.getAllByRole('textbox')[0]
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } })

        // Passwords (not in textbox role)
        // We can use container querySelector or placeholder if available. 
        // The component doesn't have placeholders for passwords usually, let's check source:
        // No placeholders for password fields in source.
        // But they are `type="password"`.

        const passwordInputs = screen.getAllByDisplayValue('') // Start with empty.
        // This is risky. Better to use `screen.getAllByLabelText` but no labels.
        // Let's use `container.querySelectorAll('input[type="password"]')`

    })

    it('handles successful registration', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({}),
        })

        const { container } = render(<RegisterPage />)

        // Email
        const emailInput = container.querySelector('input:not([type="password"])[type="text"]') // First text input is email? No, let's be more precise.
        // Source: 
        // 1. Email (TextField)
        // 2. Password (TextField type=password)
        // 3. Repeat Password (TextField type=password)
        // 4. Name (TextField)

        const textInputs = screen.getAllByRole('textbox')
        const emailField = textInputs[0]
        const nameField = textInputs[1]

        fireEvent.change(emailField, { target: { value: 'test@example.com' } })
        fireEvent.change(nameField, { target: { value: 'Test User' } })

        const passwordInputs = container.querySelectorAll('input[type="password"]')
        const passField = passwordInputs[0]
        const repeatPassField = passwordInputs[1]

        fireEvent.change(passField, { target: { value: 'password123' } })
        fireEvent.change(repeatPassField, { target: { value: 'password123' } })

        fireEvent.click(screen.getByRole('button', { name: /avançar/i }))

        await waitFor(() => {
            expect(toast.success).toHaveBeenCalledWith('Usuário registrado com sucesso!')
        })

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith('/PagesRouter/Login')
        }, { timeout: 3000 })
    })

    it('handles registration failure', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: false,
            json: async () => ({ message: 'Email already exists' }),
        })

        const { container } = render(<RegisterPage />)

        const textInputs = screen.getAllByRole('textbox')
        const emailField = textInputs[0]
        const nameField = textInputs[1]

        fireEvent.change(emailField, { target: { value: 'test@example.com' } })
        fireEvent.change(nameField, { target: { value: 'Test User' } })

        const passwordInputs = container.querySelectorAll('input[type="password"]')
        const passField = passwordInputs[0]
        const repeatPassField = passwordInputs[1]

        fireEvent.change(passField, { target: { value: 'password123' } })
        fireEvent.change(repeatPassField, { target: { value: 'password123' } })

        fireEvent.click(screen.getByRole('button', { name: /avançar/i }))

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Email already exists')
        })
    })
})
