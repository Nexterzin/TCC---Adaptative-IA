'use client'

import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HomeIcon from '@mui/icons-material/Home';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';

const drawerWidth = 240;

function Home(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);
    const [selectedTab, setSelectedTab] = React.useState('Pagina inicial'); // Estado para a aba selecionad

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const renderContent = () => {
        switch (selectedTab) {
            case 'Oque é diabetes':
                return (
                    <Stack spacing={2}>
                        <Stack spacing={2}>
                            <Typography>
                                Seu José, imagine que o corpo da gente funciona como uma grande máquina, que precisa de combustível pra trabalhar direitinho. Esse combustível vem da comida que a gente come, principalmente do açúcar. Mas o açúcar não entra nas nossas células sozinho, não. Ele precisa de uma chave chamada <strong>insulina</strong>, que é feita por um órgão chamado <strong>pâncreas</strong>. Essa insulina abre as portinhas das células pra que o açúcar entre e vire energia.
                            </Typography>

                            <Typography>
                                Agora, o que é diabetes? <strong>Diabetes é quando esse processo aí começa a dar problema</strong>. Ou o pâncreas não faz insulina direito, ou ele faz, mas o corpo não usa como devia. E aí o açúcar fica sobrando no sangue, rodando por aí sem ser aproveitado, o que não é bom.
                            </Typography>

                            <Typography>
                                Tem dois tipos mais comuns, viu?
                            </Typography>

                            <Typography>
                                <strong>Diabetes tipo 1:</strong> é mais raro, costuma aparecer em gente mais nova. O corpo simplesmente para de produzir insulina. A pessoa precisa tomar insulina todo dia, senão o açúcar não entra nas células.
                            </Typography>

                            <Typography>
                                <strong>Diabetes tipo 2:</strong> esse é mais comum em quem já passou dos 40, especialmente se a pessoa tá um pouco acima do peso ou leva uma vida mais parada, sem muita caminhada. Nesse caso, o corpo até produz insulina, mas ela não funciona direito. Às vezes precisa de remédio, às vezes precisa de insulina também, mas o mais importante é cuidar da alimentação e se mexer um pouco todos os dias.
                            </Typography>

                            <Typography>
                                Quando a diabetes não é controlada, ela pode dar problema em várias partes do corpo, tipo: visão, rins, coração, pés e até a mente. Mas se a gente cuida direitinho, dá pra viver muito bem com ela, viu? Comer com moderação, evitar muito doce, fazer uma caminhadinha, tomar os remédios direitinho... essas coisinhas já ajudam muito.
                            </Typography>

                            <Typography>
                                Então é isso, seu José. <strong>Diabetes não é um bicho de sete cabeças</strong>, mas também não é pra brincar. Cuidando bem, a vida segue firme e forte.
                            </Typography>
                        </Stack>

                    </Stack>
                );
            case 'Como podemos prevenir?':
                return (
                    <Stack spacing={2}>
                        <Typography>
                            Prevenção é a chave para controlar o diabetes. Aqui estão algumas dicas para ajudar a prevenir o diabetes tipo 2...
                        </Typography>
                    </Stack>
                );
            case 'Verificar saúde':
                return (
                    <Stack spacing={2}>
                        <Typography>
                            Para verificar sua saúde, é importante controlar níveis de glicose no sangue, realizar exames regulares e manter uma alimentação saudável...
                        </Typography>
                    </Stack>
                );
            default:
                return <Typography>Selecione uma opção do menu para ver mais informações.</Typography>;
        }
    };

    const drawer = (
        <Stack>
            <Toolbar />
            <Divider />
            <List>
                {[ 'Pagina inicial', 'Oque é diabetes', 'Como podemos prevenir?', 'Verificar saúde'].map((text) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={() => setSelectedTab(text)}>
                            <ListItemIcon>
                                {text === 'Pagina inicial' ? <HomeIcon /> : null}
                                {text === 'Oque é diabetes' ? <InboxIcon /> : null}
                                {text === 'Como podemos prevenir?' ? <MedicalServicesIcon /> : null}
                                {text === 'Verificar saúde' ? <InboxIcon /> : null}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Stack>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {selectedTab}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    slotProps={{
                        root: {
                            keepMounted: true,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                {renderContent()}
            </Box>
        </Box>
    );
}

export default Home;
