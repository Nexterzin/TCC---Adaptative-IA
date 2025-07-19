'use client'

import '@/app/globals.css'

import { useState } from 'react';
import { Box, Stack, Typography } from "@mui/material"

import SendIcon from '@mui/icons-material/Send'
import DefaultButton from '../Component/ComponentButton/DefaultButton'
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
    {
        prediction: 'Diabetes Gestacional',
        predictionDesc: 'Desenvolvida durante a gravidez, pode desaparecer após o parto. Mas lembre-se de levar em consideração as informações do seu médico.'
    },
    {
        prediction: 'Diabetes LADA',
        predictionDesc: 'Forma autoimune em adultos, evolução lenta parecida com o Tipo 1. Mas lembre-se de levar em consideração as informações do seu médico.'
    },
    {
        prediction: 'Diabetes MODY',
        predictionDesc: 'Rara e hereditária, aparece em jovens mas não é autoimune. Mas lembre-se de levar em consideração as informações do seu médico.'
    },
    {
        prediction: 'Diabetes Secundário a Doença Pancreática',
        predictionDesc: 'Decorrente de pancreatite ou cirurgias no pâncreas. Mas lembre-se de levar em consideração as informações do seu médico.'
    },
    {
        prediction: 'Diabetes Induzido por Medicamentos',
        predictionDesc: 'Causado por uso prolongado de medicamentos como corticoides. Mas lembre-se de levar em consideração as informações do seu médico.'
    },
    {
        prediction: 'Diabetes por Doenças Hormonais',
        predictionDesc: 'Relacionada a distúrbios hormonais como a síndrome de Cushing. Mas lembre-se de levar em consideração as informações do seu médico.'
    },
    {
        prediction: 'Diabetes Neonatal',
        predictionDesc: 'Muito rara, aparece nos primeiros meses de vida do bebê. Mas lembre-se de levar em consideração as informações do seu médico.'
    },
    {
        prediction: 'Diabetes Autoimune Fulminante',
        predictionDesc: 'Tipo agressivo que destrói rapidamente as células do pâncreas. Mas lembre-se de levar em consideração as informações do seu médico.'
    },
    {
        prediction: 'Nenhum sinal de diabetes identificado',
        predictionDesc: 'Com base nos dados fornecidos, não foram encontrados indícios de diabetes. Continue mantendo hábitos saudáveis! Mas lembre-se de levar em consideração as informações do seu médico.'
    },
];

const HomePage = () => {
    const [currentResult, setCurrentResult] = useState(null);

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
            case 'Diabetes Gestacional': return 'gestacional.pdf';
            case 'Diabetes LADA': return 'lada.pdf';
            case 'Diabetes MODY': return 'mody.pdf';
            case 'Diabetes Secundário a Doença Pancreática': return 'pancreatica.pdf';
            case 'Diabetes Induzido por Medicamentos': return 'medicamento.pdf';
            case 'Diabetes por Doenças Hormonais': return 'endocrinopatia.pdf';
            case 'Diabetes Neonatal': return 'neonatal.pdf';
            case 'Diabetes Autoimune Fulminante': return 'fulminante.pdf';
            case 'Nenhum sinal de diabetes identificado': return 'sem_diabete.pdf';
            default: return '';
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
                    {currentResult && (
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

                {!currentResult &&
                    <Stack sx={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Stack sx={{ mb: 2 }}>
                            <DefaultButton
                                height={35}
                                onClick={randomTest}
                                content={<SendIcon sx={{ transform: 'rotate(-20deg)', mt: -0.5 }} />}
                            />
                        </Stack>
                        <Stack>
                            <Typography sx={{ color: 'rgba(83, 182, 239, 1)', fontWeight: 'bold' }}>
                                Arraste ou envie pelo ícone seu laudo médico para análise.
                            </Typography>
                        </Stack>
                    </Stack>
                }
            </Stack>
        </Box >
    );
};

export default HomePage;
