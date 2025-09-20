'use client'

import '@/app/globals.css'

import { useRef, useState } from 'react';
import { Box, Stack, Typography, CircularProgress } from "@mui/material"

import DefaultaButton from '../Component/ComponentButton/DefaultButton'

const mockPredictionData = [
    {
        prediction: 'Diabetes Tipo 1',
        predictionDesc: 'Diabetes autoimune que destrói as células produtoras de insulina. Mais comum em jovens. Mas lembre-se de levar em consideração as informações do seu médico.'
    },
    {
        prediction: 'Diabetes Tipo 2',
        predictionDesc: 'Mais comum em adultos, associada à resistência à insulina e obesidade. Mas lembre-se de levar em consideração as informações do seu médico.'
    },
];

const HomePage = () => {
    const [currentResult, setCurrentResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const inputFileRef = useRef(null);

    const randomTest = () => {
        const randomIndex = Math.floor(Math.random() * mockPredictionData.length);
        setCurrentResult(mockPredictionData[randomIndex]);
    };

    const donwload = () => {
        if (!currentResult) return;

        const fileName = getPdfFilename(currentResult.prediction);
        const fileUrl = `/pdfs/${fileName}`;

        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileName;
        link.click();
    };

    const getPdfFilename = (prediction) => {
        switch (prediction) {
            case 'Diabetes Tipo 1': return 'tipo_1.pdf';
            case 'Diabetes Tipo 2': return 'tipo_2.pdf';
            // ... Adicionar outros casos futuramente, verificar IA
            default: return '';
        }
    };

    const handleButtonClick = () => {
        inputFileRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLoading(true);
            setCurrentResult(null);

            setTimeout(() => {
                const fileName = file.name.toLowerCase();

                let prediction;
                if (fileName.includes('tipo_1')) {
                    prediction = mockPredictionData.find(item => item.prediction === 'Diabetes Tipo 1');
                } else if (fileName.includes('tipo_2')) {
                    prediction = mockPredictionData.find(item => item.prediction === 'Diabetes Tipo 2');
                } else {
                    prediction = {
                        prediction: 'Nenhum sinal de diabetes identificado',
                        predictionDesc: 'Com base no arquivo enviado, não foi possível identificar sinais claros de diabetes.'
                    };
                }

                setCurrentResult(prediction);
                setLoading(false);
            }, 2000);
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
                            <Stack className="spinner1">
                            </Stack>
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
                        {currentResult ? 'Seus resultados mostraram que você está com' : ''}
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
                            {currentResult?.prediction}
                        </Typography>
                    </Stack>
                </Stack>

                <Stack>
                    <Typography sx={{ color: '#333', fontSize: 20, px: 5, textAlign: 'center' }}>
                        {currentResult?.predictionDesc?.split('Mas lembre-se')[0]}
                    </Typography>

                    {loading && (
                        <Stack
                            sx={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                mt: 5,
                            }}
                        >
                            <CircularProgress />
                            <Typography sx={{ mt: 2, fontWeight: 'bold', color: '#2a9df4' }}>
                                Processando seu laudo...
                            </Typography>
                        </Stack>
                    )}

                    {currentResult && !loading && (
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
                                {"\n"}Para resultados mais detalhados baixe nosso pdf
                            </Typography>

                            <Stack sx={{ justifyContent: 'center', alignItems: 'center', mt: '30px' }}>
                                <DefaultaButton
                                    height={45}
                                    onClick={donwload}
                                    content={'Baixar arquivo'}
                                    widthButton="300px"
                                    hoverBackgroundColor=' rgba(109, 189, 235, 1)'
                                />
                            </Stack>
                        </Stack>
                    )}
                </Stack>

                {!currentResult && !loading && (
                    <Stack
                        sx={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 2,
                        }}
                    >
                        {/* <Stack>
                            <DefaultButton
                                height={35}
                                onClick={randomTest}
                                content={<SendIcon sx={{ transform: 'rotate(-20deg)', mt: -0.5 }} />}
                            />
                        </Stack> */}

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

                        <Typography sx={{ color: 'rgba(83, 182, 239, 1)', fontWeight: 'bold', textAlign: 'center', whiteSpace: 'pre-line' }}>
                            Envie seu laudo médico para análise. {"\n"}A IA irá interpretar os dados futuramente.
                        </Typography>
                    </Stack>
                )}
            </Stack>
        </Box >
    );
};

export default HomePage;