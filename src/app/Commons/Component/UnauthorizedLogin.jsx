'use client'

import { Box, Button, Stack, Typography } from "@mui/material";
import LockOutlineIcon from '@mui/icons-material/LockOutline';
import { useRouter } from "next/navigation";

const UnauthorizedLogin = () => {
    const router = useRouter();

    const handleReturnLogin = () => {
        router.push('/');
    };

    return (
        <Box
            height="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor="rgb(172, 172, 172)"
        >
            <Stack
                spacing={4}
                alignItems="center"
                bgcolor="rgba(228, 226, 226, 0.86)"
                p={6}
                borderRadius={3}
                boxShadow={3}
            >
                <LockOutlineIcon color="error" sx={{ fontSize: 60 }} />
                <Typography variant="h4" fontWeight="bold">
                    Acesso Restrito
                </Typography>
                <Typography textAlign="center" color="text.secondary">
                    Desculpe, mas você não tem permissão para acessar esta página. <br />
                    Por favor, verifique suas credenciais.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleReturnLogin}
                >
                    Voltar para Página Inicial
                </Button>
            </Stack>
        </Box>
    );
}

export default UnauthorizedLogin;
