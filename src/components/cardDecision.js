import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import '../App.css';
import { Box, Container, Grid, Button, List, ListItem } from '@mui/material';
import Context from '../context/context';

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

                <p className="text_bolder text_uppercase text_space_min">{decisiones.asunto}</p>
                <p className="text_bolder text_space_min">{decisiones.nombreDecision}</p>
                <p className="text_space_min">{decisiones.salaOSeccion}</p>
                {isButtonInfoEnabled && (
                    <Button className="link_primary text_lowercase" onClick={toggleButtonInfo}>ver más</Button>)}

                {!isButtonInfoEnabled && (
                    <div className={`collapsible-content ${!isButtonInfoEnabled ? 'expanded' : ''}`}>
                        <p className="text_space_min">• Pertenece a:  <span className="text_bolder"> {decisiones.grupoPertence}</span> </p>
                        <p className="text_space_min">• Lugar de los hechos: <span className="text_bolder"> {decisiones.lugarHechos}</span></p>
                        <p className="text_space_min">• Magistrado: <span className="text_bolder">{decisiones.magistrado}</span></p>
                        <p className="text_space_min">• Macrocaso: <span className="text_bolder">{decisiones.macrocaso}</span></p>
                        <p className="text_space_min">• Conclusión de la decisión: <span className="text_bolder">{decisiones.conclusionDecision}</span></p>
                        <div className="width_100 justify_end margin_top_m margin_bottom_m">
                            <Button className="button_secondary margin_xs" >ver ficha</Button>
                            <Button className="button_primary margin_xs" >Descargar decisión</Button>
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