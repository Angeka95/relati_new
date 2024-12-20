import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import '../App.css';
import { Box, Container, Grid, Button, List, ListItem } from '@mui/material';
import Context from '../context/context';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

export default function CardDecision({ decisiones }) {

    const [isButtonInfoEnabled, setIsButtonInfoEnabled] = useState(true);
    const { verMasDecisionesRecientes, setVerMasDecisionesRecientes } = useContext(Context);
    // Función para alternar el estado del boton ver mas (Decisiones recientes)
    const toggleButtonInfo = () => {
        setIsButtonInfoEnabled(prev => !prev);
        setVerMasDecisionesRecientes(verMasDecisionesRecientes + 1);
    };



    return (
        <div className="margin_bottom_l card_medium  wrap masonry-item">



            <div key={decisiones.id} className=" width_100 card-content">

                {((typeof decisiones.asunto === 'string' ) && (decisiones.asunto.trim() !== '')) && (
                    <p className="text_bolder text_uppercase text_space_min">{decisiones.asunto}</p>
                )}
                {((typeof decisiones.nombreDecision === 'string' ) && (decisiones.nombreDecision.trim() !== '')) && (
                    <p className="text_bolder text_space_min">{decisiones.nombreDecision}</p>
                )}
                {((typeof decisiones.salaOSeccion === 'string' ) && (decisiones.salaOSeccion.trim() !== '')) && (
                    <p className="text_space_min">• Sala/Sesión:  <span className="text_bolder">{decisiones.salaOSeccion}</span></p>
                )}
                {isButtonInfoEnabled && (
                    <Button className="link_primary text_lowercase" onClick={toggleButtonInfo}>ver más</Button>)}

                {!isButtonInfoEnabled && (
                    <div className={`collapsible-content ${!isButtonInfoEnabled ? 'expanded' : ''}`}>
                        {((typeof decisiones.tipoSujeto === 'string' ) && (decisiones.tipoSujeto.trim() !== '')) && (
                            <p className="text_space_min">• Pertenece a:  <span className="text_bolder"> {decisiones.tipoSujeto}</span> </p>
                        )}
                        {((typeof decisiones.hechos === 'string' ) && (decisiones.hechos.trim() !== '')) && (
                            <p className="text_space_min">• Lugar de los hechos: <span className="text_bolder"> {decisiones.lugarHechos}</span></p>
                        )}
                        {((typeof decisiones.magistrado === 'string' ) && (decisiones.magistrado.trim() !== '')) && (
                            <p className="text_space_min">• Magistrado: <span className="text_bolder">{decisiones.magistrado}</span></p>
                        )}
                        {((typeof decisiones.caso === 'string' ) && (decisiones.caso.trim() !== '')) && (
                            <p className="text_space_min">• Macrocasos: <span className="text_bolder">{decisiones.caso}</span></p>
                        )}
                        {/*((typeof decisiones.resuelve === 'string' ) && (decisiones.resuelve.trim() !== '')) && (
                            <p className="text_space_min">• Conclusión de la decisión: <span className="text_bolder">{decisiones.resuelve}</span></p>
                        )*/}
                        {((typeof decisiones.delitos === 'string' ) && (decisiones.delitos.trim() !== '')) && (
                            <p className="text_space_min">• Delitos: <span className="text_bolder">{decisiones.delitos}</span></p>
                        )}
                        
                        <div className="width_100 justify_end margin_top_m margin_bottom_m">
                            {((typeof decisiones.hipervinculoFichaJuris === 'string' ) && (decisiones.hipervinculoFichaJuris.trim() !== '')) && (
                                <a href={decisiones.hipervinculoFichaJuris} target='_blank' rel="noreferrer">
                                    <Button className="button_secondary margin_xs"  startIcon={<FileDownloadOutlinedIcon/>}>Ver Ficha</Button>
                                </a> 
                            )}
                            {((typeof decisiones.hipervinculo === 'string' ) && (decisiones.hipervinculo.trim() !== '')) && (
                                <a href={decisiones.hipervinculo} target='_blank' rel="noreferrer">
                                    <Button startIcon={<FileDownloadOutlinedIcon/>} className="button_primary margin_xs " >Descargar decisión</Button>
                                </a> 
                            )}
                        </div>


                        <Button
                            className="link_primary text_lowercase"
                            onClick={toggleButtonInfo}>
                            {!isButtonInfoEnabled && 'ver menos'}
                        </  Button>
                    </div>
                )}
            </div>

        </div>

    );
}