'use client'

import { toast } from 'react-toastify'
import { useRef, useState } from 'react'
import { Box, Stack, Typography, CircularProgress } from "@mui/material"

import '@/app/globals.css'
import * as pdfjsLib from "pdfjs-dist"

import DefaultaButton from '../Component/ComponentButton/DefaultButton'

// Configura o worker do pdf.js direto pela CDN (garante que o build do Next.js funcione)
pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;

const HomePage = () => {
    const inputFileRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [hasDiabete, setHasDiabete] = useState(null);
    const [probabilities, setProbabilities] = useState(null);

    const handleButtonClick = () => {
        inputFileRef.current?.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoading(true);
        setHasDiabete(null);
        setProbabilities(null);

        pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;

        const extractTextFromPDF = async (file) => {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            let textContent = "";

            for (let i = 0; i < pdf.numPages; i++) {
                const page = await pdf.getPage(i + 1);
                const text = await page.getTextContent();
                text.items.forEach(item => textContent += item.str + " ");
            }

            return textContent.toLowerCase();
        };

        const text = await extractTextFromPDF(file);

        const gravidez = parseInt(text.match(/gravidez\s*[:\-]?\s*(\d+)/)?.[1] || 0);
        const glicose = parseFloat(text.match(/glicose\s*[:\-]?\s*(\d+(\.\d+)?)/)?.[1] || 0);
        const imc = parseFloat(text.match(/imc\s*[:\-]?\s*(\d+(\.\d+)?)/)?.[1] || 0);
        const idade = parseInt(text.match(/idade\s*[:\-]?\s*(\d+)/)?.[1] || 0);

        try {
            const response = await fetch("iapythontcc-production.up.railway.app", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ gravidez, glicose, imc, idade }),
            });

            if (!response.ok) { 
                throw new Error(`Erro da API: ${response.statusText}`);
            }

            const result = await response.json();

            setHasDiabete(result.classe);
            setProbabilities((result.probabilidade * 100).toFixed(1));

        } catch (error) {
            console.error("Erro ao enviar para API:", error);
            toast.error("Erro ao processar o PDF. Verifique o arquivo e tente novamente.");
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

                <Stack sx={{ mb: 30 }}>
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

                <Stack>
                    <Typography sx={{ color: '#333', fontSize: 20, px: 5, textAlign: 'center' }}>
                        {hasDiabete === 1 ? `A análise indicou uma probabilidade de ${probabilities}% de diabetes.` :
                            hasDiabete === 0 ? `A análise indicou uma baixa probabilidade de diabetes.` :
                                '' }
                    </Typography>

                    {loading && (
                        <Stack sx={{ justifyContent: 'center', alignItems: 'center', mt: 5 }}>
                            <CircularProgress />
                            <Typography sx={{ mt: 2, fontWeight: 'bold', color: '#2a9df4' }}>
                                Processando seu laudo...
                            </Typography>
                        </Stack>
                    )}

                    {hasDiabete !== null && !loading && (
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
                    )}
                </Stack>

                {hasDiabete === null && !loading && (
                    <Stack sx={{ alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                        <DefaultaButton
                            content="Enviar arquivo (PDF, JPG, PNG)"
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
                            accept=".pdf,.jpg,.jpeg,.png"
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