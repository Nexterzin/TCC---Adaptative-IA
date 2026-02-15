import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import DefaultSnackBar from '../../app/Commons/Component/SnackBar/DefaultSnackBar'
import { SnackbarProvider } from 'notistack'

describe('DefaultSnackBar', () => {
    it('renders buttons to show snackbars', () => {
        render(
            <SnackbarProvider>
                <DefaultSnackBar />
            </SnackbarProvider>
        )
        expect(screen.getByText(/show success snackbar/i)).toBeInTheDocument()
        expect(screen.getByText(/show error snackbar/i)).toBeInTheDocument()
    })

    it('displays a snackbar when a button is clicked', async () => {
        render(
            <SnackbarProvider>
                <DefaultSnackBar />
            </SnackbarProvider>
        )

        const successButton = screen.getByText(/show success snackbar/i)
        fireEvent.click(successButton)

        // Wait for snackbar to appear
        expect(await screen.findByText(/this is a success message!/i)).toBeInTheDocument()
    })
})
