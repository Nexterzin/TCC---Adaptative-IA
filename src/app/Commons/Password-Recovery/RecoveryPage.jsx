'use client'

import '@/app/globals.css'
import 'react-toastify/dist/ReactToastify.css';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from 'react-toastify';
import { Box, TextField, Typography, Grid, Link, Stack, Divider } from "@mui/material";
import DefaultaButton from '../Component/ComponentButton/DefaultButton';

const Conditional = ({
    shoWhen,
    children,
}) => {
    if (shoWhen) return <>{children}</>;
    return<></>
};

const RecoveryPasswordPage = () => {
    const router = useRouter();

    const [senhaRecuperadaSucesso, setsenhaRecuperadaSucesso] = useState(false);

    const goToLogin = () => {
        router.push('/PagesRouter/Login');
    };

    const goToRecoveryPassword = () => {
        router.push('/PagesRouter/Password-recovery');
    };

return (
    <>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=lock" />
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

            <Grid container spacing={0} alignItems="end" justifyContent="center">

                {/* Imagem */}

                {/* TODO : Colocar o medico mais pro lado do form */}

                <Grid size={{ xs: 0, sm: 4, md: 4, lg: 5 }} className='medicoImagem'>
                    <Box
                        component="img"
                        alt="Imagem Médico"
                        src="/RecoveryDoctor.png"
                        sx={{
                            height: 'auto',
                            width: { md: '30vw', lg: '25vw' },
                            display: { xs: 'none', sm: 'none', md: 'block', lg: 'flex' },
                        }}
                    />
                </Grid>

                {/* Card de Registre-se como Grid */}

                <Grid size={{ xs: 11, md: 6, lg: 6 }} >
                    <Conditional shoWhen={senhaRecuperadaSucesso} >
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
                                <span class="material-symbols-outlined md-100">
                                    lock
                                </span>
                            </Typography>
                        </Grid>


                        <Grid size={12} >
                            <Stack color={'rgba(255, 255, 255, 1)'} className="labelForm">
                                Digite um e-mail ou celular em uso
                            </Stack>

                        </Grid>


                        <Grid size={12}>
                            <Stack color={'rgba(255, 255, 255, 1)'} className="labelForm">
                                Digite uma senha
                            </Stack>

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

                        </Grid>

                        <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
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
                    </Conditional>
                    <Conditional shoWhen={!senhaRecuperadaSucesso} >
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
                                <span class="material-symbols-outlined md-100">
                                    lockdd
                                </span>
                            </Typography>
                        </Grid>


                        <Grid size={12} >
                            <Stack color={'rgba(255, 255, 255, 1)'} className="labelForm">
                                Digite um e-mail ou celular em uso
                            </Stack>

                        </Grid>


                        <Grid size={12}>
                            <Stack color={'rgba(255, 255, 255, 1)'} className="labelForm">
                                Digite uma senha
                            </Stack>

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

                        </Grid>

                        <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
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
                    </Conditional>

                </Grid>
                <Grid size={{ xs: 0, md: 4, lg: 4 }} className='medicoImagem'>

                </Grid>
            </Grid>
            <ToastContainer />
        </Box >
    </>
);
}

export default RecoveryPasswordPage