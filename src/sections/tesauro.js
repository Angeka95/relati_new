import '../App.css';
import { Container, Grid, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';


export default function Tesauro() {
    
  
    return (  
        <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <div className="justify_center wrap"> 
            <h1 className="width_100 text_center">Teusaro </h1> 
            <p className="width_100 text_center">Encuentre las decisiones a través de conceptos clave </p>
            <Button className="button_terciary shadow button_alphabet" >
                A
            </Button>
            <Button className="button_terciary shadow button_alphabet">
                B
            </Button>
            <Button className="button_terciary shadow button_alphabet">
                C
            </Button>
            <Button className="button_terciary shadow button_alphabet">
                D
            </Button>
            <Button className="button_terciary shadow button_alphabet">
                E
            </Button>
        </div> 
        </Grid>
        </Grid> 

    );
}
