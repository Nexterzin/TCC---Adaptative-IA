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
            <Box className='background'
                sx={{
                    display: 'flex',
                    minWidth: '100vw',
                    minHeight: '100vh',
                    alignItems: 'center',
                    backgroundSize: 'cover',
                    justifyContent: 'center',
                    backgroundPosition: {xs:'-123px -150px', lg: 'center'},
                    backgroundImage: 'url("/FundoLogin.png")',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: {xs: "#7be4ff"}
                }}
            >

                <Grid container spacing={0} alignItems="center" justifyContent="center">

                    {/* Imagem */}

                    {/* TODO : Colocar o medico mais pro lado do form */}

                    <Grid size={{ xs: 0, sm: 4, md: 4, lg: 4 }} className='medicoImagem'>
                        <Box
                            component="img"
                            alt="Imagem Médico"
                            src="/RegisterDoctor.png"
                            sx={{
                                height: 'auto',
                                width: { md: '30vw', lg: '20vw' },
                                mb: {lg: '30px'},
                                display: { xs: 'none', md: 'block', lg: 'block' },
                                ml: { lg: '0px' }

                            }}
                        />
                    </Grid>

                    {/* Card de Registre-se como Grid */}

                    <Grid size={{ xs: 11, md: 6, lg: 6 }}>
                        <Grid
                            container
                            spacing={1}
                            sx={{
                                p: { xs: 2, sm: 3, md: 4, lg: 6 },
                                boxShadow: 10,
                                borderRadius: 3,
                                background: 'rgba(54, 116, 181, 1)',
                                display: 'flex',
                                flexDirection: 'column',
                                width: { lg: '500px' },
                                position: 'relative'

                            }}
                        >
                            <Grid size={12} className="labelForm">
                                <Typography variant="h4" textAlign="center" fontWeight="bold" color="white">
                                    Registre-se
                                </Typography>
                            </Grid>


                            <Grid size={12} >
                                <Stack color={'rgba(255, 255, 255, 1)'} className="labelForm">
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
                                <Stack color={'rgba(255, 255, 255, 1)'} className="labelForm">
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
                                <Stack color={'rgba(255, 255, 255, 1)'} className="labelForm">
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

                            <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px'}}>
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
                    <Grid size={{ xs: 0, md: 4, lg: 4 }} className='medicoImagem'>

                    </Grid>
                </Grid>
                <ToastContainer />
            </Box >
        </>
    );
}

export default RegisterPage
