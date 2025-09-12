'use client'

import '@/app/globals.css'
import 'react-toastify/dist/ReactToastify.css';

import DefaultaButton from '../Component/ComponentButton/DefaultButton';

import XIcon from '@mui/icons-material/X';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from 'react-toastify';
import { Box, TextField, Typography, Grid, Stack, Divider } from "@mui/material";

const RegisterPage = () => {
    const router = useRouter();

    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [email, setEmail] = useState('');
    const [senhaAgain, setSenhaAgain] = useState('');

    const handleRegister = async () => {
        if (!nome) {
            toast.error("Por favor, preencha seu nome.");
            return;
        }
        if (!email) {
            toast.error("Por favor, preencha o seu e-mail.");
            return;
        }
        if (!senha) {
            toast.error("Por favor, preencha sua senha.");
            return;
        }

        if (senha != senhaAgain) {
            toast.warning('As senhas não estão iguais.')
        }

        try {
            const response = await fetch('http://localhost:8080/api/usuarios/registrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, email, senha }),
            });

            if (response.ok) {
                toast.success("Usuário registrado com sucesso!");
                setTimeout(() => {
                    router.push('/PagesRouter/Login');
                }, 3000);

            } else {
                const errorData = await response.json();
                toast.error(errorData.message || "Falha no registro. Por favor, tente novamente.");
            }
        } catch (error) {
            console.error("Erro ao registrar:", error);
            toast.error("Ocorreu um erro ao tentar se conectar ao servidor.");
        }
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
                    backgroundPosition: { xs: '-123px -150px', sm: 'center', md: 'center', lg: 'center' },
                    backgroundImage: 'url("/FundoLogin.png")',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: { xs: "#7be4ff" }
                }}
            >

                <Grid container spacing={0} alignItems="center" justifyContent="center">
                    <Grid size={{ xs: 0, sm: 4, md: 4, lg: 4 }} className='medicoImagem'>
                        <Box
                            component="img"
                            alt="Imagem Médico"
                            src="/RegisterDoctor.png"
                            sx={{
                                height: 'auto',
                                width: { md: '30vw', lg: '20vw' },
                                display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' },
                                ml: { lg: '0px' }

                            }}
                        />
                    </Grid>

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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                            handleRegister();
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

                            <Grid size={12}>
                                <Stack color={'rgba(255, 255, 255, 1)'} className="labelForm">
                                    Repita sua senha
                                </Stack>
                                <TextField
                                    fullWidth
                                    value={senhaAgain}
                                    type="password"
                                    onChange={(e) => setSenhaAgain(e.target.value)}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter') {
                                            handleRegister();
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
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
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

                            <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                                <DefaultaButton
                                    onClick={handleRegister}
                                    content={'Avançar'}
                                    widthButton='380px'
                                />
                            </Grid>

                            {/* <Grid size={12}>
                                <Grid container spacing={2} justifyContent="center">
                                    {[FacebookIcon, InstagramIcon, GoogleIcon, XIcon, LinkedInIcon].map((Icon, index) => (
                                        <Grid key={index}>
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

export default RegisterPage;
