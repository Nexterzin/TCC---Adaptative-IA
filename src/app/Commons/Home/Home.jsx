'use client'

import '@/app/globals.css'
import { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { Box, Stack, Typography } from "@mui/material"
import DefaultButton from '../Component/ComponentButton/DefaultButton';

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

                <Stack sx={{ mb: 40 }}>
                    <Stack sx={{ mb: -10 }}>
                        <Typography
                            sx={{
                                color: 'rgba(83, 182, 239, 1)',
                                fontWeight: 'bold',
                                p: 7, fontSize: 32,
                                textAlign: 'center'
                            }}>
                            {currentResult ? 'Seus resultados mostraram que você está com' : ''}
                        </Typography>
                    </Stack>
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
                    <Stack>
                        <Typography sx={{ color: '#333', fontSize: 20, px: 5, textAlign: 'center' }}>
                            {currentResult?.predictionDesc?.split(' Mas lembre-se')[0]}
                        </Typography>
                        {currentResult &&
                            <Typography sx={{ color: '#555', fontSize: 16, fontStyle: 'italic', px: 5, pt: 1, textAlign: 'center' }}>
                                Mas lembre-se de levar em consideração as informações do seu médico.
                            </Typography>
                        }
                    </Stack>
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
