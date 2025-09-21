'use client'

import '@/app/globals.css'
import 'react-toastify/dist/ReactToastify.css'

import { useState } from "react"
import { toast, ToastContainer } from 'react-toastify'
import { useRouter } from "next/navigation"
import { Box, TextField, Grid, Stack } from "@mui/material"

import Loading from '../Component/Loading/loading'
import LockOutlineIcon from '@mui/icons-material/LockOutline'
import DefaultaButton from '../Component/ComponentButton/DefaultButton'

const RecoveryPasswordPage = () => {
    const router = useRouter();

    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const handleRecover = async () => {
        setLoading(true)

        if (!email) {
            setLoading(false)
            toast.error('Favor inserir email para envio de recuperação de senha!')
            return
        }

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        try {
            const res = await fetch(`${apiUrl}/api/usuarios/recuperar-senha`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });



            if (res.ok) {
                toast.success('E-mail de recuperação de senha enviado!')
                setTimeout(() => {
                    setLoading(false)
                    router.push('/PagesRouter/Login');
                }, 2000);
            } else {
                setLoading(false)
                toast.error('E-mail de recuperação de senha ja enviado ou erro no servidor!')
            }
        } catch (error) {
            setLoading(false)
            toast.error("Erro ao enviar solicitação.");
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

                <Grid container spacing={0} alignItems="end" justifyContent="center">
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

                    <Grid size={{ xs: 11, md: 6, lg: 6 }} >

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

                            <Grid container justifyContent="center" alignContent="center">
                                <LockOutlineIcon sx={{ fontSize: 80 }} /> {/* aumenta o tamanho para 40px */}
                            </Grid>

                            <Grid size={12} >
                                <Stack color={'rgba(255, 255, 255, 1)'} className="labelForm">
                                    Digite o e-mail que estava utilizando
                                </Stack>
                                <TextField
                                    fullWidth
                                    value={email}
                                    placeholder="Insira seu E-mail"
                                    onChange={(e) => setEmail(e.target.value)}
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

                            </Grid>

                            <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                                <DefaultaButton
                                    onClick={handleRecover}
                                    content={'Avançar'}
                                    widthButton='380px'
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid size={{ xs: 0, md: 4, lg: 4 }} className='medicoImagem' />

                </Grid>
                <ToastContainer />
            </Box >

            {loading && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 9999,
                    }}
                >
                    <Loading />
                </Box>
            )}
        </>
    );
}

export default RecoveryPasswordPage