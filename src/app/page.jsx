'use client'

import { Box, Button, Grid2, Stack, TextField, Typography } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';

const Login = () => {
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '98vh', // ocupa a altura total da tela
                    backgroundImage: 'url("/FundoLogin.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <Stack sx={{ width: 450, height: 500, background: 'rgba(144, 202, 249, 0.43)', border: 1, borderRadius: 3 }}>
                    <Typography gutterBottom variant="h2" component="div" textAlign={'center'} sx={{ fontWeight: 'bold', mt: 2 }}>
                        LOGIN
                    </Typography>
                    <Grid2 container sx={{ p: 2 }}>
                        <Grid2 size={12} sx={{ mb: 3 }}>
                            <TextField
                                id="outlined-textarea"
                                label="E-mail"
                                placeholder="Insira seu E-mail"
                                fullWidth
                            />
                        </Grid2>
                        <Grid2 size={12}>
                            <TextField
                                id="outlined-textarea"
                                label="Senha"
                                placeholder="Insira sua Senha"
                                fullWidth
                                type="password"
                            />
                        </Grid2>
                        <Grid2 size={12} sx={{textAlign: 'center', mt: 5}}>
                            <Button sx={{width: 200, height: 45}} variant="contained" endIcon={<SendIcon />} color="success">
                                Login
                            </Button>
                        </Grid2>
                        <Grid2 size={12} sx={{textAlign: 'center', mt: 5}}>
                            <Typography>
                                Não tem uma conta?
                            </Typography>
                            <Typography color="blue">
                                Registre-se
                            </Typography>
                        </Grid2>
                    </Grid2>
                </Stack>
            </Box>
        </>
    )
}

export default Login