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
import { Box, TextField, Typography, Grid, Link, Stack } from "@mui/material";
import DefaultaButton from './Commons/Component/ComponentButton/DefaultButton';

const LoginPage = () => {
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

    const goToRecoveryPassword = () => {
        router.push('/PagesRouter/Password-recovery');
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
                    <Grid size={{xs:12, md:2}}>
                        <Box
                            component="img"
                            alt="Imagem Médica"
                            src="/loginDoctor.png"
                            sx={{
                                height: 'auto',
                                ml: { md: '50px', lg: '190px' },
                                width: { md: '100%', lg: '190%' },
                                display: { xs: 'none', md: 'none', lg: 'block' },
                            }}
                        />
                    </Grid>

                    {/* Card de Login como Grid */}
                    <Grid size={{xs:12, md:8}}>
                        <Grid
                            container
                            spacing={3}
                            sx={{
                                p: 4,
                                boxShadow: 10,
                                borderRadius: 3,
                                background: 'rgba(54, 116, 181, 1)',
                                width: { md: '80%', xs: '400px', lg: '40%' },
                                marginLeft: { xs: '5px', md: '60px', lg: '500px' },
                            }}
                        >
                            <Grid size={12}>
                                <Typography variant="h4" textAlign="center" fontWeight="bold" color="white">
                                    Entrar
                                </Typography>
                            </Grid>

                            <Grid size={12}>
                                <Stack color={'rgba(255, 255, 255, 1)'} sx={{ opacity: '0.48' }}>
                                    Insira seu e-mail
                                </Stack>
                                <TextField
                                    fullWidth
                                    value={usuario}
                                    placeholder="Insira seu E-mail"
                                    onChange={(e) => setUsuario(e.target.value)}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: "10px",
                                            backgroundColor: 'transparent',
                                            color: "#fff",
                                            "& fieldset": {
                                                borderColor: "#fff",
                                            },
                                            "&:hover fieldset": {
                                                borderColor: "#fff",
                                                opacity: 0.48
                                            },
                                            "&.Mui-focused fieldset": {
                                                borderColor: "#fff",
                                            },
                                        },
                                        input: {
                                            color: "#fff",
                                        },
                                        "& .MuiInputLabel-root": {
                                            color: "#fff",
                                        },
                                    }}
                                />
                            </Grid>

                            <Grid  size={12}>
                                <Stack color={'rgba(255, 255, 255, 1)'} sx={{ opacity: '0.48' }}>
                                    Insira sua senha
                                </Stack>
                                <TextField
                                    fullWidth
                                    value={senha}
                                    type="password"
                                    placeholder="Insira sua Senha"
                                    onChange={(e) => setSenha(e.target.value)}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter') {
                                            goToHome();
                                        }
                                    }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: "10px",
                                            backgroundColor: 'transparent',
                                            color: "#fff",
                                            "& fieldset": {
                                                borderColor: "#fff",
                                            },
                                            "&:hover fieldset": {
                                                borderColor: "#fff",
                                                opacity: 0.48
                                            },
                                            "&.Mui-focused fieldset": {
                                                borderColor: "#fff",
                                            },
                                        },
                                        input: {
                                            color: "#fff",
                                        },
                                        "& .MuiInputLabel-root": {
                                            color: "#fff",
                                        },
                                    }}
                                />
                            </Grid>

                            <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <DefaultaButton
                                    height={45}
                                    onClick={goToHome}
                                    content={'Avançar'}
                                    widthButton='300px'
                                />
                            </Grid>

                            <Stack direction="row" justifyContent="center" pt={4} width="100%">
                                <Stack color="rgba(255, 255, 255, 1)" sx={{ fontWeight: 'bold' }}>
                                    É novo por aqui?
                                </Stack>
                                <Stack pl={1}>
                                    <Link
                                        component="button"
                                        onClick={goToRegister}
                                        sx={{ color: 'rgba(83, 182, 239, 1)', fontWeight: 'bold' }}
                                    >
                                        Registre-se
                                    </Link>
                                </Stack>
                            </Stack>

                            <Stack width={'100%'} justifyContent={'center'} pt={2}>
                                <Link
                                    component="button"
                                    onClick={goToRecoveryPassword}
                                    sx={{ color: 'rgba(83, 182, 239, 1)', fontWeight: 'bold' }}
                                >
                                    Esqueceu sua senha?
                                </Link>
                            </Stack>

                            {/* <Grid size={12}>
                                <Grid container spacing={2} justifyContent="center">
                                    {[FacebookIcon, InstagramIcon, GoogleIcon, XIcon, LinkedInIcon].map((Icon, index) => (
                                        <Grid  key={index}>
                                            <Icon sx={{ fontSize: 40, cursor: 'pointer', color: 'black' }} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid> */}
                        </Grid>
                    </Grid>
                </Grid>
                <ToastContainer />
            </Box >
        </>
    );
}

export default LoginPage
