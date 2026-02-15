import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import HomePage from '../../app/Commons/Home/Home'
import { toast } from 'react-toastify'

// Mock toast
jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
        info: jest.fn(),
    },
}))

// Mock pdfjs-dist
jest.mock('pdfjs-dist', () => ({
    GlobalWorkerOptions: {
        workerSrc: ''
    },
    version: '1.0.0'
}))

// Mock fetch
global.fetch = jest.fn()

describe('HomePage', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders upload button', () => {
        render(<HomePage />)
        expect(screen.getByText(/enviar arquivo \(pdf\)/i)).toBeInTheDocument()
    })

    it('handles file upload and displays result (Diabetes)', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                classe: 1,
                probabilidade: 0.85
            }),
        })

        const { container } = render(<HomePage />)

        // Find the hidden file input
        // Using container to find by id or type since it's hidden
        const fileInput = container.querySelector('input[type="file"]')

        const file = new File(['dummy content'], 'test.pdf', { type: 'application/pdf' })

        fireEvent.change(fileInput, { target: { files: [file] } })

        expect(screen.queryByText(/processando seu laudo/i)).toBeInTheDocument()

        await waitFor(() => {
            expect(screen.getByText(/seus resultados mostraram que você está com/i)).toBeInTheDocument()
            expect(screen.getByText(/diabetes/i)).toBeInTheDocument()
            expect(screen.getByText(/85.0%/i)).toBeInTheDocument()
        })
    })

    it('handles file upload and displays result (No Diabetes)', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                classe: 0,
                probabilidade: 0.10
            }),
        })

        const { container } = render(<HomePage />)
        const fileInput = container.querySelector('input[type="file"]')
        const file = new File(['dummy content'], 'test.pdf', { type: 'application/pdf' })

        fireEvent.change(fileInput, { target: { files: [file] } })

        await waitFor(() => {
            expect(screen.getByText(/seus resultados mostraram que você está/i)).toBeInTheDocument()
            expect(screen.getByText(/sem diabetes/i)).toBeInTheDocument()
        })
    })

    it('handles upload error', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: false,
            json: async () => ({ message: 'Invalid file' }),
        })

        const { container } = render(<HomePage />)
        const fileInput = container.querySelector('input[type="file"]')
        const file = new File(['dummy content'], 'test.pdf', { type: 'application/pdf' })

        fireEvent.change(fileInput, { target: { files: [file] } })

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith(expect.stringContaining('Erro ao processar o laudo'))
        })
    })
})
