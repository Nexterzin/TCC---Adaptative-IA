'use client'

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import GoogleIcon from '@mui/icons-material/Google';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useState } from "react";
import { Box, Button, Stack, TextField, Typography, Grid2, Link } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const router = useRouter();

    const goToHome = () => {
        if (usuario === 'bruno' && senha === 'admin') {
            router.push('/PagesRouter/Home');
        } else {
            toast.warning("Usuário ou senha inválidos!");
        }
    };

    const goToRegister = () => {
        router.push('/PagesRouter/Register')
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundImage: 'url("/FundoLogin.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                gap: 1,
            }}
        >
            <Box
                component="img"
                src="/MedicaLogin.svg"
                alt="Imagem Médica"
                sx={{
                    width: 400,
                    height: 'auto',
                    display: { xs: 'none', md: 'block' },
                }}
            />

            <Stack
                sx={{
                    width: 450,
                    height: 550,
                    background: 'rgba(54, 116, 181, 0.80)',
                    border: 1,
                    borderRadius: 3,
                    marginRight: 50
                }}
            >
                <Typography variant="h2" textAlign={'center'} sx={{ fontWeight: 'bold', mt: 2, mb: 4 }}>
                    LOGIN
                </Typography>
                <Grid2 container sx={{ p: 2 }}>
                    <Grid2 size={12} sx={{ mb: 3 }}>
                        <TextField
                            placeholder="Insira seu E-mail"
                            fullWidth
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "10px",
                                    background: 'rgba(255, 255, 255, 0.87)',
                                },
                            }}
                        />
                    </Grid2>
                    <Grid2 size={12}>
                        <TextField
                            placeholder="Insira sua Senha"
                            fullWidth
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "10px",
                                    background: 'rgba(255, 255, 255, 0.87)',
                                },
                            }}
                        />
                    </Grid2>
                    <Grid2 size={12} sx={{ textAlign: 'center', mt: 5 }}>
                        <Button
                            onClick={goToHome}
                            sx={{ width: 200, height: 45, borderRadius: "10px" }}
                            variant="contained"
                            endIcon={<SendIcon />}
                            color="success"
                        >
                            Login
                        </Button>
                    </Grid2>
                    <Grid2 size={12} sx={{ textAlign: 'center', mt: 5 }}>
                        <Typography>Não tem uma conta?</Typography>
                        <Link sx={{ color: 'blue' }}
                            component="button"
                            variant="h6"
                            onClick={goToRegister}
                        >
                            Registre-se
                        </Link>
                    </Grid2>
                    <Grid2 container spacing={2} size={12} sx={{ mt: 3, justifyContent: 'center' }}>
                        <Grid2>
                            <FacebookIcon sx={{ fontSize: 40, cursor: 'pointer' }} />
                        </Grid2>
                        <Grid2>
                            <InstagramIcon sx={{ fontSize: 40, cursor: 'pointer' }} />
                        </Grid2>
                        <Grid2>
                            <GoogleIcon sx={{ fontSize: 40, cursor: 'pointer' }} />
                        </Grid2>
                        <Grid2>
                            <XIcon sx={{ fontSize: 40, cursor: 'pointer' }} />
                        </Grid2>
                        <Grid2>
                            <LinkedInIcon sx={{ fontSize: 40, cursor: 'pointer' }} />
                        </Grid2>
                    </Grid2>
                </Grid2>
            </Stack>
            <ToastContainer />
        </Box>
    );
}

export default Login;
