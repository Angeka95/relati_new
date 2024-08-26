import * as React from 'react';
import { Card, CardContent, Button, CardMedia } from '@mui/material';
import { Container, Grid } from '@mui/material';





export default function filterLarge() {
  return (
    <div>

        <h1 className="text_center">Mapa Jurisprudencial </h1>  
        <p className="text_center">Encuentre las decisiones de la JEP y conozca la actividad judicial en el territorio Colombiano</p>

        <Card className="margin_bottom_s card_filter_large">

        <CardContent className="text_center text_bolder ">

        Seleccione un filtro para mostrarle decisiones y datos limitados a su interés
        
        </CardContent>
    </Card>


    </div>


  );
}


