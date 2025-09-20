'use client'

import React from 'react';
import { Button } from '@mui/material';
import { useSnackbar } from 'notistack';

function MyApp() {
    const { enqueueSnackbar } = useSnackbar();

    const handleClickVariant = (message, variant) => {
        enqueueSnackbar(message, { variant });
    };

    return (
        <React.Fragment>
            <Button onClick={() => handleClickVariant('This is a success message!', 'success')}>
                Show success snackbar
            </Button>
            <Button onClick={() => handleClickVariant('This is an error message!', 'error')}>
                Show error snackbar
            </Button>
            <Button onClick={() => handleClickVariant('This is a warning message!', 'warning')}>
                Show warning snackbar
            </Button>
            <Button onClick={() => handleClickVariant('This is an info message!', 'info')}>
                Show info snackbar
            </Button>
            <Button onClick={() => handleClickVariant('This is a default message!', 'default')}>
                Show default snackbar
            </Button>
        </React.Fragment>
    );
}

export default MyApp;
