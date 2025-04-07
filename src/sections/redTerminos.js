import '../App.css';
import { Container, Box, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import ResponsiveIframe from '../components/responseIframe';

export default function RedTerminos() {

    

    return (
        <>
        <Container className="margin_bottom_m">
             <h1 className="width_100 text_center margin_top_l">Red de Términos</h1>
             <h5 className="width_100 text_center margin_bottom_m">Lorem ipsum dolor ... </h5>
             <ResponsiveIframe  src="https://relatoria.jep.gov.co/red/index.php" title="Red de términos clave" />
        </Container>  
        </>
    );
}
