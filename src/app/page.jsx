'use client'

import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

import XIcon from '@mui/icons-material/X';
import SendIcon from '@mui/icons-material/Send';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from 'react-toastify';
import { Box, Button, TextField, Typography, Grid, Link } from "@mui/material";

const Login = () => {
    const router = useRouter();
    
    const [senha, setSenha] = useState('');
    const [usuario, setUsuario] = useState('');

    const goToHome = () => {
        if (usuario === 'bruno' && senha === 'admin') {
            router.push('/PagesRouter/Home');
        } else {
            toast.warning("Usuário ou senha inválidos!");
        }
    };

    const goToRegister = () => {
        router.push('/PagesRouter/Register');
    };

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    minWidth: '100vw',
                    minHeight: '100vh',
                    alignItems: 'center',
                    backgroundSize: 'cover',
                    justifyContent: 'center',
                    backgroundPosition: 'center',
                    backgroundImage: 'url("/FundoLogin.png")',
                }}
            >

                <Grid container spacing={0} alignItems="center" justifyContent="center" marginRight={'100px'}>
                    {/* Imagem */}
                    <Grid item xs={12} md={2}>
                        <Box
                            component="img"
                            src="/MedicaLogin.svg"
                            alt="Imagem Médica"
                            sx={{
                                width: '100%',
                                maxWidth: 400,
                                height: 'auto',
                                margin: '0 auto',
                                display: { xs: 'none', md: 'block' },
                            }}
                        />
                    </Grid>

                    {/* Card de Login como Grid */}
                    <Grid item xs={12} md={4}>
                        <Grid
                            container
                            spacing={3}
                            sx={{
                                p: 4,
                                boxShadow: 4,
                                borderRadius: 3,
                                width: { md: '80%', xs: '400px' },
                                marginLeft: { xs: '50px', md: '0px' },
                                background: 'rgba(54, 116, 181, 1)',
                            }}
                        >
                            <Grid item xs={12}>
                                <Typography variant="h4" textAlign="center" fontWeight="bold" color="white">
                                    Logo
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    placeholder="Insira seu E-mail"
                                    fullWidth
                                    value={usuario}
                                    onChange={(e) => setUsuario(e.target.value)}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: "10px",
                                            backgroundColor: 'rgba(255, 255, 255, 0.87)',
                                        },
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    value={senha}
                                    type="password"
                                    placeholder="Insira sua Senha"
                                    onChange={(e) => setSenha(e.target.value)}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: "10px",
                                            backgroundColor: 'rgba(255, 255, 255, 0.87)',
                                        },
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    color="success"
                                    onClick={goToHome}
                                    variant="contained"
                                    endIcon={<SendIcon />}
                                    sx={{ height: 45, borderRadius: "10px" }}
                                >
                                    Login
                                </Button>
                            </Grid>

                            <Grid item xs={12} textAlign="center">
                                <Typography variant="body2" color="black">
                                    Não tem uma conta?
                                </Typography>
                                <Link
                                    component="button"
                                    variant="h6"
                                    onClick={goToRegister}
                                    sx={{ color: 'blue', fontWeight: 'bold', mt: 1 }}
                                >
                                    Registre-se
                                </Link>
                            </Grid>

                            <Grid item xs={12}>
                                <Grid container spacing={2} justifyContent="center">
                                    {[FacebookIcon, InstagramIcon, GoogleIcon, XIcon, LinkedInIcon].map((Icon, index) => (
                                        <Grid item key={index}>
                                            <Icon sx={{ fontSize: 40, cursor: 'pointer', color: 'black' }} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <ToastContainer />
            </Box>
        </>
    );
}

export default Login;
