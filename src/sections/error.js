import '../App.css';
import { Container, Box, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';



export default function Mantenimiento() {

    const navigate = useNavigate();

    const goToHomePage = () => {
        navigate('/');
        window.scrollTo(0, 0);
    };
   
   

    return (
        <Container>
            <div className="justify_center flex-wrap ">
                <div className="margin_top_l">
                <ErrorOutlineIcon className="icon_error"></ErrorOutlineIcon>
                </div>
            <h1 className="text_center w-100 margin_top_m">Lo sentimos</h1>
            
            <h2 className="text_center w-100">En este momento no podemos procesar su búsqueda</h2>
            
            <h3 className="text_center w-100">Estamos trabajando para reestablecer el servicio</h3>
                <p className="text_center w-100 margin_top_l ">Por favor intente nuevamente más tarde</p>
                <Button onClick={goToHomePage} className="button_primary border_none margin_bottom_l">Volver al Inicio</Button>
            </div>

        </Container>
    );
}
