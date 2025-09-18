'use client'

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import {
    Box,
    TextField,
    Typography,
    Grid,
    Stack,
} from "@mui/material";
import DefaultaButton from "../Commons/Component/ComponentButton/DefaultButton";
import styles from "./PageUserRecovery.module.css";
import Loading from "../Commons/Component/Loading/loading";

const PageUserRecovery = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");

    const [novaSenha, setNovaSenha] = useState("");
    const [loading, setLoading] = useState(false)

    const handleReset = async () => {
        setLoading(false)

         const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        try {
            const res = await fetch(`${apiUrl}/api/usuarios/resetar-senha`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, novaSenha })
            });

            const data = await res.text();

            if (res.ok) {
                toast.success(data);
                setTimeout(() => router.push("/PagesRouter/Login"), 2000);
            } else {
                toast.error(data);
            }
        } catch (error) {
            toast.error("Erro ao redefinir senha.");
        }
    };

    return (
        <>
            <Box className={styles.recoveryPage}>
                <Grid container spacing={0} alignItems="center" justifyContent="center" sx={{ px: 2 }}>
                    {/* Card de Redefinição */}
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
                                Redefinir Senha
                            </Typography>

                            <Stack width="100%">
                                <Stack color="rgba(255, 255, 255, 1)" sx={{ opacity: 0.48 }}>
                                    Digite a nova senha
                                </Stack>
                                <TextField
                                    fullWidth
                                    type="password"
                                    value={novaSenha}
                                    placeholder="Digite a nova senha"
                                    onChange={(e) => setNovaSenha(e.target.value)}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter') {
                                            handleReset()
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
                                        onClick={handleReset}
                                        content={'Confirmar'}
                                        widthButton="300px"
                                    />
                                </Box>
                            </Stack>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
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

            <ToastContainer />
        </>
    )
}

export default PageUserRecovery;
