import '../App.css';
import { Container, TextField, Button, Snackbar } from '@mui/material';

import React, { useState, useEffect } from 'react';
import Carousel from '../components/carousel.js';
import TabCustom from '../components/tab.js';



export default function Suscripcion() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleChangeSuscribe = (event) => {
        setEmail(event.target.value);
        setError(false); // Reiniciar error al cambiar el valor
      };


      const handleSubmit = () => {
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!isValidEmail) {
          setError(true);
          setOpenSnackbar(true);
        } else {
          // Aquí puedes manejar el envío del formulario
          console.log("Correo válido:", email);
        }
      };
  
      const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
      };

  return (
    <div>
        <Container >
        <h1 className="width_100 text_center margin_top_m">Suscripción</h1>
        <p className="text_center margin_bottom_m title_description ">
        Suscríbase y reciba en su correo electrónico los boletínes jurisprudenciales con las decisiones más relevantes de la JEP, analizadas mes a mes. 
        </p>
        <div className="justify_center"> 
            <div className="form_container"> 
            <div className=" text_right margin_right_m"> 
                <p> *  Los campos con asterísco son obligatorios</p>

            </div>
            <div className="justify_center"> 
                <TextField className="form_item "
                    label="Nombre completo"
                    variant="outlined"
                />
            </div> 
            <div className="justify_center"> 
                <TextField className="form_item "
                    label="Correo electrónico *"
                    variant="outlined"
                    onChange={handleChangeSuscribe}
                    error={error}
                     helperText={error ? 'Por favor, ingrese un correo válido.' : ''}
                    
                />
            </div> 
            <div className="justify_center"> 
                <TextField className="form_item "
                    label="Ocupación"
                    variant="outlined"
                />
            </div> 

            <div className="justify_center text_center text_legal"> 
                <p>Al suscribirse, está aceptando la política de <a  className="link_secondary" href="https://conti.jep.gov.co/mercurio/ViewerJS/FrameRedirect2.jsp?Tipo=Normal">tratamiento de datos </a> de la Jurisdicción Especial para la Paz  </p>

            </div>
            <div className="justify_center"> 
            <Button
            className="button_primary"
            onClick={handleSubmit}
            >
                Suscribirme
            </Button>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message="Correo electrónico no válido."
            />
            </div> 
            </div> 
        </div> 

        
        </Container>

    </div>
  );
}
