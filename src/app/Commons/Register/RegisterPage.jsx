'use client'

import '@/app/globals.css'
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
import { Box, TextField, Typography, Grid, Link, Stack, Divider } from "@mui/material";
import DefaultaButton from '../Component/ComponentButton/DefaultButton';

const RegisterPage = () => {
    const router = useRouter();

    const [senha, setSenha] = useState('');
    const [usuario, setUsuario] = useState('');

    const goToLogin = () => {
        router.push('/PagesRouter/Login');
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

                    <Grid size={{ xs: 12, md: 1.5 }} className='medicoImagem'>
                        <Box
                            component="img"
                            alt="Imagem Médica"
                            src="/RegisterDoctor.png"
                            sx={{
                                height: 'auto',
                                ml: { md: '50px', lg: '400px' },
                                width: { md: '30vw', lg: '20vw' },
                                // mr: {md: '1200px', lg:'70px'},
                                display: { xs: 'none', md: 'none', lg: 'block' },
                            }}
                        />
                    </Grid>

                    {/* Card de Registre-se como Grid */}

                    <Grid size={{ xs: 12, md: 8 }}>
                        <Grid
                            container
                            spacing={3}
                            sx={{
                                p: { xs: 2, sm: 3, md: 4,lg: 6 },
                                boxShadow: 10,
                                borderRadius: 3,
                                background: 'rgba(54, 116, 181, 1)',
                                width: { xs: '90vw', sm: '80vw', md: '60vw', lg: '30vw', xl: '25vw' },
                                ml: { xs: '5%', md: '60px', lg: '44%' },
                                maxWidth: { xs: '400px', sm: '500px', md: '600px', lg: '700px', xl: '800px' },
                                mt: { xs: 2, sm: 4, md: 6 },

                            }}
                        >
                            <Grid size={12}>
                                <Typography variant="h4" textAlign="center" fontWeight="bold" color="white">
                                    Registre-se
                                </Typography>
                            </Grid>

                            <Grid size={12}>
                                <Stack color={'rgba(255, 255, 255, 1)'} sx={{ opacity: '0.48' }}>
                                    Digite um e-mail ou celular em uso
                                </Stack>
                                <TextField
                                    fullWidth
                                    value={usuario}
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

                            <Grid size={12}>
                                <Stack color={'rgba(255, 255, 255, 1)'} sx={{ opacity: '0.48' }}>
                                    Digite uma senha
                                </Stack>
                                <TextField
                                    fullWidth
                                    value={senha}
                                    type="password"
                                    onChange={(e) => setSenha(e.target.value)}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter') {
                                            goToLogin();
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

                            {/* Linha divisoria */}

                            <Grid size={12}>
                                <Box sx={{ width: '100%', py: 2 }}>
                                    <Divider sx={{ bgcolor: "#fff", opacity: 1, borderBottomWidth: 1 }} />
                                </Box>
                            </Grid>

                            <Grid size={12}>
                                <Stack color={'rgba(255, 255, 255, 1)'} sx={{ opacity: '0.48' }}>
                                    Como prefere ser chamado?
                                </Stack>
                                <TextField
                                    fullWidth
                                    value={senha}
                                    type="password"
                                    onChange={(e) => setSenha(e.target.value)}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter') {
                                            goToLogin();
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
                                    onClick={goToLogin}
                                    content={'Avançar'}
                                    widthButton='380px'
                                />
                            </Grid>

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

export default RegisterPage
