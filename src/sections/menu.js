import '../App.css';
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Drawer, List, ListItem, ListItemText, IconButton, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';  
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';



export default function Menu() {

    const [openDrawer, setOpenDrawer] = useState(false);  // Para abrir/cerrar el Drawer
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Detecta si es un dispositivo móvil
    
    const handleDrawerToggle = () => {
      setOpenDrawer(!openDrawer);  // Maneja el estado del drawer (abrir/cerrar)
    };
  
    const handleCloseDrawer = () => {
      setOpenDrawer(false);  // Cierra el drawer
    };

      // Estado para manejar si el menú está expandido o no
  const [expanded, setExpanded] = useState(false);

  // Función para alternar el estado expandido/contraído
  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

    return (
        <div>
             <>
      {/* AppBar (Menú superior en desktop) */}
      <AppBar position="sticky" className="menu_container">
        <Toolbar >
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Mi Aplicación
          </Typography>

          {/* Menú para desktop */}
          {!isMobile ? (
            <div>
              <Button color="inherit" onClick={handleToggleExpand}  endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />} >Sobre la Relatoría </Button> 
              <Button color="inherit">Nuestras Publicaciones</Button>
              <Button color="inherit">Análisis Jurisprudencial</Button>
              <Button color="inherit">Concurso Universitario</Button>
            </div>
          ) : (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ ml: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer (Menú lateral para mobile) */}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={handleCloseDrawer}
      >
        <div style={{ width: 250 }}>
          <List>
            <ListItem button onClick={handleCloseDrawer}>
              <ListItemText primary="Inicio" />
            </ListItem>
            <ListItem button onClick={handleCloseDrawer}>
              <ListItemText primary="Servicios" />
            </ListItem>
            <ListItem button onClick={handleCloseDrawer}>
              <ListItemText primary="Nosotros" />
            </ListItem>
            <ListItem button onClick={handleCloseDrawer}>
              <ListItemText primary="Contacto" />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button onClick={handleCloseDrawer}>
              <ListItemText primary="Cerrar sesión" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>

        </div>
    );
}
