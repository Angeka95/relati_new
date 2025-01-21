import React, { useState, useEffect, useContext } from 'react';
import { Container, Box } from '@mui/material';
import '../App.css';
import mapaJurisprudencialService from '../services/mapa_jurisprudencial.js';
import enfoqueGeneroService from '../services/enfoque_genero.js';

export default function TestServices() {
    
    const [datos, setDatos] = useState([]);
    
    const getTestServiceEnfoqueGenero = () => {
        enfoqueGeneroService
            .getEnfoqueGeneroData()
            .then(response => {
                console.log(response.status_info);
                setDatos(JSON.stringify(response.data, null, 2));
             }
            )
            .catch(error => console.log(error));
    }
    
    const getTestService = () => {
        mapaJurisprudencialService
            .getDepartamentos()
            //.getDetailsGraph("anio_hecho=2019,2020&dpto=DEPARTAMENTO+CAUCA,DEPARTAMENTO+TOLIMA")
            .then(response => {
                setDatos(JSON.stringify(response.data, null, 2));
             }
            )
            .catch(error => console.log(error));
    }
       
    useEffect(() => {
        if(datos.length === 0){
            //getTestService();
            getTestServiceEnfoqueGenero();
        } 
    }, [datos])
    
    return (
        <Container>
            <Box sx={{ flexGrow: 1, marginTop: "1rem", marginBottom: "1rem", paddingLeft: "1rem", paddingRight: "1rem" }}>
                {(datos.length > 0) ?
                    <div><pre>{datos}</pre></div>
                    :
                    <p>Cargando datos...</p>
                }
            </Box>
        </Container>
    );
  }