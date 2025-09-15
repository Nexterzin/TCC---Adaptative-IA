'use client'

import './globals.css'
import 'react-toastify/dist/ReactToastify.css'

import DefaultaButton from './Commons/Component/ComponentButton/DefaultButton'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'
import {
    Box,
    TextField,
    Typography,
    Grid,
    Link,
    Stack,
} from '@mui/material'
import Loading from './Commons/Component/Loading/loading'

const LoginPage = () => {
    const router = useRouter()

    const [senha, setSenha] = useState('')
    const [email, setUsuario] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        setLoading(true)

        try {
            const response = await fetch('http://localhost:8080/api/usuarios/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, senha: senha }),
            })

            if (response.ok) {
                toast.success('Usuário logado com sucesso!')

                setTimeout(() => {
                    router.push('/PagesRouter/Home')
                }, 1000)
            } else {
                const errorMsg = await response.text()
                toast.error(errorMsg)
                setLoading(false)
            }
        } catch (error) {
            toast.error('Erro ao conectar com o servidor')
            setLoading(false)
        }
    }

    const goToRegister = () => {
        setLoading(true)

        setTimeout(() => {
            router.push('/PagesRouter/Register')
            setLoading(true)
        }, 1000);
    }

    const goToRecoveryPassword = () => {
        setLoading(true)

        setTimeout(() => {
            router.push('/PagesRouter/Password-recovery')
        }, 1000);
    }

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
                    position: 'relative', // necessário para overlay funcionar
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
                            <Typography
                                variant="h4"
                                textAlign="center"
                                fontWeight="bold"
                                color="white"
                                mb={2}
                            >
                                Entrar
                            </Typography>

                            <Stack width="100%">
                                <Stack color="rgba(255, 255, 255, 1)" sx={{ opacity: 0.48 }}>
                                    Insira seu e-mail
                                </Stack>
                                <TextField
                                    fullWidth
                                    value={email}
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
                                            handleLogin()
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
                                        onClick={handleLogin}
                                        content={'Avançar'}
                                        widthButton="300px"
                                    />
                                </Box>

                                <Stack direction="row" justifyContent="center" pt={4}>
                                    <Typography color="white">É novo por aqui?</Typography>
                                    <Typography>
                                        <Link
                                            component="button"
                                            onClick={goToRegister}
                                            sx={{ color: 'rgba(83, 182, 239, 1)', fontWeight: 'bold', pl: 1 }}
                                        >
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
                        </Box>
                    </Grid>
                </Grid>

                {/* ✅ Overlay de loading */}
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
            </Box>

            <ToastContainer />
        </>
    )
}

export default LoginPage
