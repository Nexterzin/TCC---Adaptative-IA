'use client'

import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

// import XIcon from '@mui/icons-material/X';
// import SendIcon from '@mui/icons-material/Send';
// import GoogleIcon from '@mui/icons-material/Google';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import InstagramIcon from '@mui/icons-material/Instagram';
import DefaultaButton from './Commons/Component/ComponentButton/DefaultButton';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from 'react-toastify';
import { Box, TextField, Typography, Grid, Link, Stack } from "@mui/material";

const LoginPage = () => {
    const router = useRouter();

    const [senha, setSenha] = useState('');
    const [usuario, setUsuario] = useState('');

    const goToHome = () => {
        if (usuario === 'bruno' && senha === 'admin') {
            router.push('/PagesRouter/Home');
        } else {
            toast.warning("Usuário ou senha inválidos!", {
                style: {
                    backgroundColor: '#333',
                    color: '#fdd835',
                    fontWeight: 'bold',
                    fontSize: '16px',
                }
            });
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
                    justifyContent: 'center',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundImage: 'url("/FundoLogin.png")',
                }}
            >
                <Grid container spacing={0} alignItems="center" justifyContent="center" sx={{ px: 2 }}>
                    {/* Imagem */}
                    <Grid item md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
                        <Box
                            component="img"
                            alt="Imagem Médica"
                            src="/loginDoctor.png"
                            sx={{
                                height: 'auto',
                                width: '100%',
                                maxWidth: '500px',
                                margin: '0 auto',
                            }}
                        />
                    </Grid>

                    {/* Card de Login */}
                    <Grid item xs={12} md={6} alignItems="center" justifyContent="center">
                        <Box
                            sx={{
                                p: 4,
                                boxShadow: 10,
                                borderRadius: 3,
                                background: 'rgba(54, 116, 181, 1)',
                                display: 'flex',
                                flexDirection: 'column',
                                margin: '0 auto',
                            }}
                        >
                            <Typography variant="h4" textAlign="center" fontWeight="bold" color="white" mb={2}>
                                Entrar
                            </Typography>

                            <Stack width="100%">
                                <Stack color="rgba(255, 255, 255, 1)" sx={{ opacity: 0.48 }}>
                                    Insira seu e-mail
                                </Stack>
                                <TextField
                                    fullWidth
                                    value={usuario}
                                    placeholder="Insira seu E-mail"
                                    onChange={(e) => setUsuario(e.target.value)}
                                    sx={{
                                        mb: '20px',
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: "10px",
                                            backgroundColor: 'transparent',
                                            color: "#fff",
                                            "& fieldset": { borderColor: "#fff" },
                                            "&:hover fieldset": { borderColor: "#fff", opacity: 0.48 },
                                            "&.Mui-focused fieldset": { borderColor: "#fff" },
                                        },
                                        input: { color: "#fff" },
                                    }}
                                />

                                <Stack color="rgba(255, 255, 255, 1)" sx={{ opacity: 0.48 }}>
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
                                        mb: '20px',
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: "10px",
                                            backgroundColor: 'transparent',
                                            color: "#fff",
                                            "& fieldset": { borderColor: "#fff" },
                                            "&:hover fieldset": { borderColor: "#fff", opacity: 0.48 },
                                            "&.Mui-focused fieldset": { borderColor: "#fff" },
                                        },
                                        input: { color: "#fff" },
                                    }}
                                />

                                <Box display="flex" justifyContent="center" mt={2}>
                                    <DefaultaButton
                                        height={45}
                                        onClick={goToHome}
                                        content={'Avançar'}
                                        widthButton="300px"
                                    />
                                </Box>

                                <Stack direction="row" justifyContent="center" pt={4}>
                                    <Typography color="white">É novo por aqui?</Typography>
                                    <Typography>
                                        <Link onClick={goToRegister} sx={{ color: 'rgba(83, 182, 239, 1)', fontWeight: 'bold', pl: 1 }}>
                                            Registre-se
                                        </Link>
                                    </Typography>
                                </Stack>

                                <Stack justifyContent="center" alignItems={'center'} pt={2}>
                                    <Typography>
                                        <Link
                                            component="button"
                                            onClick={goToRecoveryPassword}
                                            sx={{ color: 'rgba(83, 182, 239, 1)', fontWeight: 'bold' }}
                                        >
                                            Esqueceu sua senha?
                                        </Link>
                                    </Typography>
                                </Stack>
                            </Stack>
                            {/* Redes sociais (comentado) */}
                            {/* 
                                <Grid item xs={12}>
                                    <Grid container spacing={2} justifyContent="center">
                                    {[FacebookIcon, InstagramIcon, GoogleIcon, XIcon, LinkedInIcon].map((Icon, index) => (
                                        <Grid item key={index}>
                                        <Icon sx={{ fontSize: 40, cursor: 'pointer', color: 'black' }} />
                                        </Grid>
                                    ))}
                                    </Grid>
                                </Grid> 
                            */}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <ToastContainer />
        </>
    );
}

export default LoginPage;