'use client'

import { toast } from 'react-toastify'
import { useRef, useState } from 'react'
import { Box, Stack, Typography, CircularProgress } from "@mui/material"

import '@/app/globals.css'
import * as pdfjsLib from "pdfjs-dist"
import DefaultaButton from '../Component/ComponentButton/DefaultButton'

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.mjs`;

const HomePage = () => {
    const inputFileRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [hasDiabete, setHasDiabete] = useState(null);
    const [probabilities, setProbabilities] = useState(null);

    const handleButtonClick = () => {
        inputFileRef.current?.click();
    };

    const handleReset = () => {
        setHasDiabete(null);
        setProbabilities(null);
        setLoading(false);
        if (inputFileRef.current) {
            inputFileRef.current.value = ""; 
        }
    };

    // const handleDownloadFile = () => {
    //     if (hasDiabete === null || probabilities === null) {
    //         toast.info("Por favor, analise um laudo antes de baixar o arquivo.");
    //         return;
    //     }

    //     const probNum = parseFloat(probabilities);
    //     const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    //     let fileUrl = '';

    //     if (hasDiabete === 1 && probNum >= 80.00) {
    //         fileUrl = `${apiUrl}/api/documentos/orientacao-alto-risco`;
    //     } else if (hasDiabete === 1) {
    //         fileUrl = `${apiUrl}/api/documentos/orientacao-medio-risco`;
    //     } else if (hasDiabete === 0) {
    //         fileUrl = `${apiUrl}/api/documentos/orientacao-prevencao`;
    //     }

    //     if (fileUrl) {
    //         window.open(fileUrl, '_blank');
    //     } else {
    //         toast.error("Não foi possível determinar o documento de orientação.");
    //     }
    // };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoading(true);
        setHasDiabete(null);
        setProbabilities(null);

        const formData = new FormData();
        formData.append("arquivo", file);

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        try {
            const response = await fetch(`${apiUrl}/api/usuarios/analisar-laudo`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Erro do servidor: ${errorData.message || response.statusText}`);
            }

            const result = await response.json();

            setHasDiabete(result.classe);
            setProbabilities((result.probabilidade * 100).toFixed(1));

        } catch (error) {
            console.error("Erro ao enviar para API:", error);
            toast.error(`Erro ao processar o laudo. ${error.message || 'Verifique o arquivo e tente novamente.'}`);
        } finally {
            setLoading(false);
            e.target.value = null;
        }
    };

    return (
        <Box
            sx={{
                minWidth: '100vw',
                minHeight: '100vh',
                color: 'black',
                backgroundColor: 'rgb(212, 226, 241)',
            }}
        >
            <Stack className="loader">
                <Stack className='spin-wrapper'>
                    <Stack className="box-1">
                        <Stack className="spinner">
                            <Stack className="spinner1"></Stack>
                        </Stack>
                    </Stack>
                </Stack>

                <Stack sx={{ mb: 35 }}>
                    <Typography
                        sx={{
                            color: 'rgba(83, 182, 239, 1)',
                            fontWeight: 'bold',
                            fontSize: 32,
                            textAlign: 'center'
                        }}>
                        {hasDiabete === 1 ? 'Seus resultados mostraram que você está com' : hasDiabete === 0 ? 'Seus resultados mostraram que você está' : ''}
                    </Typography>

                    <Stack>
                        <Stack mt={-5}>
                            <Typography
                                sx={{
                                    p: 7,
                                    fontSize: 38,
                                    color: '#2a9df4',
                                    fontWeight: '900',
                                    textAlign: 'center',
                                    letterSpacing: '1.5px',
                                    textTransform: 'uppercase',
                                    textShadow: '2px 2px 8px rgba(0,0,0,0.2)',
                                }}
                            >
                                {hasDiabete !== null && (
                                    hasDiabete === 1 ? (
                                        'Diabetes'
                                    ) : (
                                        'Sem diabetes'
                                    )
                                )}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>

                <Stack>
                    <Stack mt={-13}>
                        <Typography sx={{ color: '#333', fontSize: 20, textAlign: 'center' }}>
                            {hasDiabete === 1 && parseFloat(probabilities) >= 80.00 ?
                                `A análise indicou um ALTO RISCO com probabilidade de ${probabilities}% de diabetes.` :
                                hasDiabete === 1 ?
                                    `A análise indicou uma probabilidade de ${probabilities}% de diabetes.` :
                                    hasDiabete === 0 ?
                                        `A análise indicou uma baixa probabilidade de diabetes com ${probabilities}% de diabetes.` : ''
                            }
                        </Typography>
                    </Stack>

                    {loading && (
                        <Stack sx={{ justifyContent: 'center', alignItems: 'center', mt: 15 }}>
                            <CircularProgress />
                            <Typography sx={{ mt: 2, fontWeight: 'bold', color: '#2a9df4' }}>
                                Processando seu laudo...
                            </Typography>
                        </Stack>
                    )}

                    {hasDiabete !== null && !loading && (
                        <Stack>
                            <Stack>
                                <Typography
                                    sx={{
                                        color: '#555',
                                        fontSize: 16,
                                        fontStyle: 'italic',
                                        px: 5,
                                        pt: 1,
                                        textAlign: 'center',
                                        whiteSpace: 'pre-line',
                                    }}
                                >
                                    Mas lembre-se de levar em consideração as informações do seu médico.
                                </Typography>
                            </Stack>
                            
                            <Stack justifyContent={'center'} alignItems={'center'} mt={4}>
                                <DefaultaButton 
                                    content={'Analisar outro arquivo'} 
                                    onClick={handleReset} 
                                    height={45}
                                    widthButton="250px"
                                    backgroundColor="#2a9df4"
                                    colorText="#fff"
                                    hoverBackgroundColor="rgba(42, 157, 244, 0.8)"
                                />
                            </Stack>

                        </Stack>
                    )}
                </Stack>

                {hasDiabete === null && !loading && (
                    <Stack sx={{ alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                        <DefaultaButton
                            content="Enviar arquivo (PDF)"
                            onClick={handleButtonClick}
                            height={45}
                            widthButton="300px"
                            backgroundColor="#2a9df4"
                            colorText="#fff"
                            hoverBackgroundColor="rgba(42, 157, 244, 0.8)"
                        />

                        <input
                            ref={inputFileRef}
                            id="fileUpload"
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />

                        <Typography sx={{
                            color: 'rgba(83, 182, 239, 1)',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            whiteSpace: 'pre-line'
                        }}>
                            Envie seu laudo médico para análise. {"\n"}A IA irá interpretar os dados futuramente.
                        </Typography>
                    </Stack>
                )}
            </Stack>
        </Box>
    );
};

export default HomePage;
