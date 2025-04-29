'use client'

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import GoogleIcon from '@mui/icons-material/Google';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useState } from "react";
import { Box, Button, TextField, Typography, Grid, Link, Hidden } from "@mui/material";
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
        router.push('/PagesRouter/Register');
    };

    return (
        <>
            <Box
                sx={{
                    minHeight: '100vh',
                    width: '100vw',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundImage: 'url("/FundoLogin.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    m: 0,
                    p: 0, // padding zero!

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
                                display: { xs: 'none', md: 'block' },
                                margin: '0 auto'
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
                                borderRadius: 3,
                                background: 'rgba(54, 116, 181, 1)',
                                boxShadow: 4,
                                marginLeft: { xs: '50px', md: '0px' },
                                width: { md: '80%', xs: '400px' },
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
                                    placeholder="Insira sua Senha"
                                    type="password"
                                    fullWidth
                                    value={senha}
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
                                    onClick={goToHome}
                                    fullWidth
                                    variant="contained"
                                    endIcon={<SendIcon />}
                                    color="success"
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
