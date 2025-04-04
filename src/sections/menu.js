import '../App.css';
import React, { useState, useEffect } from 'react';
import { AppBar,  Collapse, Toolbar, Typography, Button, Drawer, List, ListItem, ListItemText, IconButton, Divider, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';  
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import LogoRelati from '../assets/images/logo_Relativ4.png';
import Escudo from '../assets/images/escudo.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useCleanLocalStorageVars } from '../hooks/useCleanLocalStorageVars';

export default function MenuBar() {

    const [openDrawer, setOpenDrawer] = useState(false);  // Para abrir/cerrar el Drawer / version mobile
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Detecta si es un dispositivo móvil
    
    const handleDrawerToggle = () => {
      setOpenDrawer(!openDrawer);  // Maneja el estado del drawer  (abrir/cerrar)
    };
  
    const handleCloseDrawer = () => {
      setOpenDrawer(false);  // Cierra el drawer
    };

// Estado para manejar si el menú está expandido o no
  const [anchor, setAnchor] = useState(null);
  const [anchor2, setAnchor2] = useState(null);
  const [anchor3, setAnchor3] = useState(null);
  const open = Boolean(anchor);
  const open2 = Boolean(anchor2);
  const open3 = Boolean(anchor3);
  // Función para alternar el estado expandido/contraído
  const handleToggleMenu1 = (event) => {
    setAnchor(event.currentTarget);
  };
  const handleClose = () => {
    setAnchor(null);
  };


  const handleToggleMenu2 = (event) => {
    setAnchor2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchor2(null);
  };


  const handleToggleMenu3 = (event) => {
    setAnchor3(event.currentTarget);
  };
  const handleClose3 = () => {
    setAnchor3(null);
  };

  const podcastURL = () => {
    var anchor = document.createElement('a');
    anchor.href = 'https://www.spreaker.com/podcast/relatos-de-la-jep--5701029';
    anchor.target="_blank";
    anchor.rel="noreferrer";
    anchor.click();
  };

  const scrollToSection = () => {
    if(window.location.pathname === "/"){
      const section = document.getElementById('seccion_caso');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = "/#seccion_caso";
    }
  };
  
  useEffect(() => {
    if((window.location.pathname === "/") && (window.location.hash === "#seccion_caso")){
      const section = document.getElementById('seccion_caso');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  },[]);
  
  const [openSubMenu, setOpenSubMenu] = useState({
    sobreRelatoria: false,
    publicaciones: false,
    analisis: false,
    concurso: false
  });


  const toggleSubMenu = (menu) => {
    setOpenSubMenu((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu]
    }));
  };
  
  // Hook personalizado para limpiar variables en storage
  useCleanLocalStorageVars();

    return (
        <div>
             <>
      {/* AppBar (Menú superior en desktop) */}
      <AppBar position="sticky" className="menu_container shadow_smoother">
        <Toolbar >
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <div> 
            <Link to="/">
                <img src={LogoRelati} className="logo_relati_min" >
                </img>    
            </Link>
            </div> 
            </Typography>

          {/* Menú para desktop */}
          {!isMobile ? (
            <div className="justify_center">
            <div className="justify_center">
              <Button className="text_black menu_text text_center" onClick={handleToggleMenu1}  startIcon={anchor ? <ExpandLessIcon /> : <ExpandMoreIcon />} >Sobre la Relatoría </Button> 
                <Menu
                    
                    id="basic-menu"
                    anchorEl={anchor}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                >
                    <Link to="/acerca-de-nosotros">
                        <MenuItem className="text_decoration_none text_black menu_text" >Acerca de Nosotros</MenuItem>
                    </Link>
                    <Link to="/glosario">
                        <MenuItem className="text_decoration_none text_black menu_text" >Glosario</MenuItem>
                    </Link>
                    <Link to="/preguntas-frecuentes">
                        <MenuItem className="text_decoration_none text_black menu_text" >Preguntas Frecuentes</MenuItem>
                    </Link>
                </Menu>
              <Button  className=" text_black menu_text text_center"  onClick={handleToggleMenu2} startIcon={anchor ? <ExpandLessIcon /> : <ExpandMoreIcon />} >Nuestras Publicaciones</Button>
              <Menu
                    id="basic-menu2"
                    anchorEl={anchor2}
                    open={open2}
                    onClose={handleClose2}
                    MenuListProps={{
                    'aria-labelledby': 'menu',
                    }}
                >
                    <Link to="/boletines">
                        <MenuItem className="text_decoration_none text_black menu_text " >Boletines</MenuItem>
                    </Link>
                    <Link to="/libros">
                        <MenuItem className="text_decoration_none text_black menu_text " >Libros</MenuItem>
                    </Link>
                  
                    <MenuItem className="text_decoration_none text_black menu_text" onClick={podcastURL} target="_blank" rel="noreferrer">Podcast</MenuItem>
                    
                    {/* <Link to="/mapa-jurisprudencial">
                        <MenuItem className="text_decoration_none text_black menu_text" >Libros</MenuItem>
                    </Link> */}
                </Menu>
             
                    <Button  className=" text_black menu_text text_center" onClick={handleToggleMenu3} startIcon={anchor ? <ExpandLessIcon /> : <ExpandMoreIcon />} >Análisis Jurisprudencial</Button>
           
              <Menu
                    id="basic-menu2"
                    anchorEl={anchor3}
                    open={open3}
                    onClose={handleClose3}
                    MenuListProps={{
                    'aria-labelledby': 'menu',
                    }}
                >
                    <Link to="/tesauro">
                        <MenuItem className="text_decoration_none text_black menu_text" >Tesauro</MenuItem>
                    </Link>
                    <Link to="/mapa-jurisprudencial">
                        <MenuItem className="text_decoration_none text_black menu_text" >Mapa Jurisprudencial</MenuItem>
                    </Link>
                     
                        <MenuItem onClick={scrollToSection} className="text_decoration_none text_black menu_text" >Macrocasos</MenuItem>
                        
                    <Link to="/analisis-tematico">
                        <MenuItem className="text_decoration_none text_black menu_text " >Análisis Temático</MenuItem>
                    </Link>
                </Menu>

              <Button component="a"  className=" text_blue menu_text margin_left_xs text_center"  href="https://relatoria.jep.gov.co/concurso" target="_blank" rel="noreferrer">Concurso Universitario</Button>
              </div>

              <img src={Escudo} className="logo_escudo_min margin_left_s" >
              </img>    
              
 
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
            {/* ListItem principal: "Sobre la Relatoría" */}
            <ListItem button onClick={() => toggleSubMenu('sobreRelatoria')}>
              <ListItemText primary="Sobre la Relatoría" />
            </ListItem>
            <Collapse in={openSubMenu.sobreRelatoria} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button component={Link} to="/acerca-de-nosotros">
                  <ListItemText primary="Acerca de Nosotros" />
                </ListItem>
                <ListItem button component={Link} to="/glosario">
                  <ListItemText primary="Glosario" />
                </ListItem>
                <ListItem button component={Link} to="/preguntas-frecuentes">
                  <ListItemText primary="Preguntas frecuentes" />
                </ListItem>
              </List>
            </Collapse>

            {/* ListItem principal: "Nuestras Publicaciones" */}
            <ListItem button onClick={() => toggleSubMenu('publicaciones')}>
              <ListItemText primary="Nuestras Publicaciones" />
            </ListItem>
            <Collapse in={openSubMenu.publicaciones} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button component={Link} to="/boletines">
                  <ListItemText primary="Boletines" />
                </ListItem>
                <ListItem button component={Link} to="/libros">
                  <ListItemText primary="Libros" />
                </ListItem>
                <ListItem button component={Link} to="https://www.spreaker.com/podcast/relatos-de-la-jep--5701029">
                  <ListItemText primary="Podcast" />
                </ListItem>
              </List>
            </Collapse>

            {/* ListItem principal: "Análisis Jurisprudencial" */}
            <ListItem button onClick={() => toggleSubMenu('analisis')}>
              <ListItemText primary="Análisis Jurisprudencial" />
            </ListItem>
            <Collapse in={openSubMenu.analisis} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button component={Link} to="/tesauro">
                  <ListItemText primary="Tesauro" />
                </ListItem>
                <ListItem button component={Link} to="/mapa-jurisprudencial">
                  <ListItemText primary="Mapa Jurisprudencial" />
                </ListItem>
                <ListItem button component={Link} to="/macrocasos">
                  <ListItemText primary="Macrocasos" />
                </ListItem>
                <ListItem button component={Link} to="/analisis-tematico">
                  <ListItemText primary="Análisis Temático" />
                </ListItem>
              </List>
            </Collapse>

            {/* ListItem principal: "Concurso Universitario" */}
            <ListItem  button component={Link} to="https://relatoria.jep.gov.co/concurso">
              <ListItemText primary="Concurso Universitario" />
            </ListItem>
            
          </List>
          <Divider />
        </div>
      </Drawer>

    </>

        </div>
    );
}
