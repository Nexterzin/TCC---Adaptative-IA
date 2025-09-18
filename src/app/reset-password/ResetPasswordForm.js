'use client'

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { Box, TextField, Typography, Grid, Stack } from "@mui/material";
import DefaultaButton from "../Commons/Component/ComponentButton/DefaultButton";
import styles from "./PageUserRecovery.module.css";
import Loading from "../Commons/Component/Loading/loading";

const ResetPasswordForm = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");

    const [novaSenha, setNovaSenha] = useState("");
    const [loading, setLoading] = useState(false);

    const handleReset = async () => {
        setLoading(true);

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
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Box className={styles.recoveryPage}>
            </Box>
            {loading && ( <Loading /> )}
            <ToastContainer />
        </>
    );
}

export default ResetPasswordForm;