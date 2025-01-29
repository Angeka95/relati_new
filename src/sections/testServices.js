import React, { useState, useEffect, useContext } from 'react';
import { Container, Box } from '@mui/material';
import '../App.css';
import { convertObjFiltroJurisToQuery } from '../helpers/utils.js';
import mapaJurisprudencialService from '../services/mapa_jurisprudencial.js';
import boletinesService from '../services/boletines.js';
import { responsivePropType } from 'react-bootstrap/esm/createUtilityClasses.js';


export default function TestServices() {
    
    const [datos, setDatos] = useState([]);
    const [message, setMessage] = useState({ message: "", classname: "" });
    const [resultFunction, setResultFunction] = useState(null);
    
    /*const getTestService = () => {
        mapaJurisprudencialService
            //.getDepartamentos()
            .getDetailsGraph("anio_hecho=2019,2020&dpto=DEPARTAMENTO+CAUCA,DEPARTAMENTO+TOLIMA")
            .then(response => {
                setDatos(JSON.stringify(response.data, null, 2));
             }
            )
            .catch(error => console.log(error));
    }*/
    
    const sendBoletinService = () => {
        const objToSend = {
            "boletin_id": "100",
            "email": "juanadiaz0001@gmail.com"
        };
        const newMessage = { message: "", classname: "" };
        boletinesService
            .sendBoletin(objToSend)
            .then(response => {
                newMessage["message"] =  `${response.data} ${response.status_info.status}`;
                newMessage["classname"] = "error";
                setMessage(newMessage);
             }
            )
            .catch(error => console.log(error));
    }
    
    const testUtilsFunction = () => {
        const objTest =  {
            "departamentos": [
                "CAUCA",
                "TOLIMA"
            ],
            "anios": [
                "2020",
                "2019"
            ],
            "salas": [
                "S - Sala de Reconocimiento de Verdad, de Responsabilidad y de Determinación de los Hechos y Conductas",
                "T - Sección de Reconocimiento de Verdad y Responsabilidad"
            ],
            "delitos": [
                "CALUMNIA",
                "COHECHO PROPIO",
                "HOMICIDIO"
            ],
            "macrocasos": [
                "Caso 001",
                "Caso 002"
            ],
            "comparecientes": [
                "FARC-EP",
                "TERCERO CIVIL"
            ],
            "procedimientos": [
                "ACCIÓN DE TUTELA",
                "PRECLUSIÓN"
            ]
        };
        const newResult = convertObjFiltroJurisToQuery(objTest);
        setResultFunction(newResult);
    }
       
    useEffect(() => {
        if(datos.length === 0){
            //getTestService();
            //testUtilsFunction();
        } 
    }, [datos]);
    
    useEffect(() => {
        if(message.message.length === 0){
            sendBoletinService();
        } 
    }, [message]);
    
    return (
        <Container>
            <Box sx={{ flexGrow: 1, marginTop: "1rem", marginBottom: "1rem", paddingLeft: "1rem", paddingRight: "1rem" }}>
                {(datos.length > 0) ?
                    <div>
                        <pre>{datos}</pre>
                        <pre>{resultFunction}</pre>
                    </div>
                    :
                    <p>Cargando datos...</p>
                }
                {(message.message.length > 0) ?
                    <div>
                        <pre>{message.message}</pre>
                    </div>
                    :
                    <p>Esperando mensaje...</p>
                }
            </Box>
        </Container>
    );
  }