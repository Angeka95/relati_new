import '../App.css';
import { Container, TextField, Button, Snackbar, Alert, Box, Grid } from '@mui/material';

import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import Carousel from '../components/carousel.js';
import TabCustom from '../components/tab.js';
import boletinesService from '../services/boletines.js';
import processingDataModal from '../components/processingDataModal.js';
import ProcessingDataModal from '../components/processingDataModal.js';
import { Captcha } from "navid-react-captcha-generator";

export default function Suscripcion() {

    const objErrors = {
        nombre: {
            message: "",
            error: false
        },
        email: {
            message: "",
            error: false
        },
        ocupacion: {
            message: "",
            error: false
        },
        captcha: {
            message: "",
            error: false
        },
    };

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);


    const [nombre, setNombre] = useState('');
    const [ocupacion, setOcupacion] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState({ message: "", classname: "" });
    const [errors, setErrors] = useState(objErrors);

    const [captcha, setCaptcha] = useState('');
    const [captchaValue, setCaptchaValue] = useState("");
    const [regenerate, setRegenerate] = useState(false);

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };

    const regenerateCaptcha = () => {
        setRegenerate((prev) => !prev);
    };

    const postSuscription = (objNewSuscription) => {
        let message_ = { message: "", classname: "" };
        boletinesService
            .postSuscription(objNewSuscription)
            .then(response => { 
                if(response.status_info.status === 201){
                    message_ = { message: response.data, classname: "success" };
                } else if(response.status_info.status === 200){
                    message_ = { message: response.data, classname: "warning" };
                } else {
                    message_ = { message: response.data, classname: "error" };
                }
                handleOpenModal();
                setMessage({ message: "", classname: "" });  
                setTimeout(function(){ 
                    if(message_.classname === "success"){
                        setNombre('');
                        setEmail('');
                        setOcupacion('');
                    }
                    setCaptcha('');
                    handleCloseModal();
                    setMessage(message_);
                }, 3000);
                setTimeout(() => {
                    setMessage({ message: "", classname: "" }); 
                }, 6000);
            })
            .catch(error => console.log(error));
    };

    const handleChangeSuscribe = (event) => {
        setEmail(event.target.value);
        setErrors({ ...errors, email: { ...errors.email, error: (event.target.value.length > 0 && event.target.value.trim() !== "") ? false : true } });  // Reiniciar error al cambiar el valor
    };

    const handleNombreChangeSuscribe = (event) => {
        setNombre(event.target.value);
        setErrors({ ...errors, nombre: { ...errors.nombre, error: (event.target.value.length > 0 && event.target.value.trim() !== "") ? false : true } }); // Reiniciar error al cambiar el valor
    };

    const handleOcupacionChangeSuscribe = (event) => {
        setOcupacion(event.target.value);
        setErrors({ ...errors, ocupacion: { ...errors.ocupacion, error: (event.target.value.length > 0 && event.target.value.trim() !== "") ? false : true } }); // Reiniciar error al cambiar el valor
    };

    const handleCaptchaChangeSuscribe = (event) => {
        setCaptcha(event.target.value);
        setErrors({ ...errors, captcha: { ...errors.captcha, error: (event.target.value.length > 0 && event.target.value.trim() !== "") ? false : true } });  // Reiniciar error al cambiar el valor
    };

    const validateForm = () => {
        const newErrors = objErrors;
    
        /*if(nombre.trim() === "") {
          newErrors.nombre.message = 'Por favor, ingrese un nombre.';
          newErrors.nombre.error = true;  
        } else */
        if (!/^[a-zA-Z\s]{2,50}$/.test(nombre)) {
          newErrors.nombre.message = 'El nombre solo debe contener letras y espacios.';
          newErrors.nombre.error = false; //true
        } 
    
        if(email.trim() === "") {
            newErrors.email.message = 'Por favor, ingrese un correo válido.';
            newErrors.email.error = true;  
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
          newErrors.email.message = 'El correo no es válido.';
          newErrors.email.error = true;
        }

        /*if(ocupacion.trim() === "") {
            newErrors.ocupacion.message = 'Por favor, ingrese una ocupación.';
            newErrors.ocupacion.error = true;  
        } else */
        if (!/^[a-zA-Z\s]{2,50}$/.test(ocupacion)) {
          newErrors.ocupacion.message = 'La ocupación solo debe contener letras y espacios.';
          newErrors.ocupacion.error = false; //true
        }

        if(captcha.trim() === "") {
            newErrors.captcha.message = 'Por favor, ingrese un captcha válido.';
            newErrors.captcha.error = true;  
        } else if (!/^[a-zA-Z\s]{2,50}$/.test(captcha)) {
            newErrors.captcha.message = 'Por favor, ingrese un captcha válido.';
            newErrors.captcha.error = true; //true
        }
        
        setErrors({...newErrors});

        return ((newErrors.nombre.error === false) && (newErrors.email.error === false) && (newErrors.ocupacion.error === false) && (newErrors.captcha.error === false));
    };


    const handleSubmit = () => {
        if(validateForm()) {
            const captchaFieldVal = DOMPurify.sanitize(captcha);
            if(captchaFieldVal === captchaValue){
                const objNewSuscription = {
                    "nombre": DOMPurify.sanitize(nombre),
                    "ocupacion": DOMPurify.sanitize(ocupacion),
                    "email": DOMPurify.sanitize(email)
                };
                postSuscription(objNewSuscription);
                setErrors(objErrors);
            } else {
                const newErrors = objErrors;
                newErrors.captcha.message = 'El captcha no coincide.';
                newErrors.captcha.error = true; 
                setErrors({...newErrors});
                setCaptcha('');
            }
        } else {
            setOpenSnackbar(true);
        }
    };
  
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

  return (
    <div>
        <Container >
        <h1 className="width_100 text_center margin_top_l">Suscripción</h1>
        <h5 className="text_center margin_bottom_m title_description ">
        Suscríbase y reciba en su correo electrónico los boletínes jurisprudenciales con las decisiones más relevantes de la JEP. 
        </h5>
        <div className="justify_center">
            <div className="form_container"> 
            <div className=" text_right margin_right_m"> 
                <p> *  Los campos con asterísco son obligatorios</p>
            </div>
            <div className="justify_center"> 
                <TextField className="form_item "
                    label="Nombre completo"
                    variant="outlined"
                    onChange={handleNombreChangeSuscribe}
                    error={errors.nombre.error}
                    value={nombre}
                    helperText={(errors.nombre.error) ? errors.nombre.message  : ''}
                />
            </div> 
            <div className="justify_center"> 
                <TextField className="form_item "
                    label="Correo electrónico *"
                    variant="outlined"
                    onChange={handleChangeSuscribe}
                    error={errors.email.error}
                    value={email}
                    helperText={(errors.email.error) ? errors.email.message : ''}
                    
                />
            </div> 
            <div className="justify_center"> 
                <TextField className="form_item "
                    label="Ocupación"
                    variant="outlined"
                    onChange={handleOcupacionChangeSuscribe}
                    error={errors.ocupacion.error}
                    value={ocupacion}
                    helperText={(errors.ocupacion.error) ? errors.ocupacion.message: ''}
                />
            </div> 

            <div className="justify_center text_center text_legal"> 
                <p>Al suscribirse, está aceptando la política de <a  className="link_secondary" href="https://conti.jep.gov.co/mercurio/ViewerJS/FrameRedirect2.jsp?Tipo=Normal">tratamiento de datos </a> de la Jurisdicción Especial para la Paz  </p>

            </div>
        
            <Box sx={{ flexGrow: 1, padding: 0, marginTop: 0 }}>
                {/* Primera fila con dos columnas */}
                <Grid container spacing={0} alignItems="center">
                    <Grid item xs={6}>
                    <Box
                        sx={{
                        padding: 2,
                        textAlign: "center",
                        }}
                    >
                        <Captcha
                                onChange={handleCaptchaChange}
                                regenerate={regenerate}
                                width={150}
                                height={50}
                                length={4}
                                fontSize={24}
                                bgColor="#c0c0c0"
                                textColor="#000"
                                noise={false}
                                lines={false}
                                distortion={false}
                                charStyles={{
                                    0: { color: "#ff0000" },
                                    1: { color: "#008000" },
                                    2: { color: "#0000ff" },
                                    3: { color: "#ff00ff" },
                                }}
                                />
                            
                    </Box>
                    </Grid>
                    <Grid item xs={6}>
                    <Box
                        sx={{
                        padding: 2,
                        textAlign: "center",
                        }}
                    >
                        <Button onClick={regenerateCaptcha} variant="contained" size="small">Regenerar Captcha</Button>
                    </Box>
                    </Grid>
                </Grid>

                {/* Segunda fila con una sola columna */}
                <Grid container spacing={0} mt={0}>
                    <Grid item xs={12}>
                    <Box
                        sx={{
                        padding: 0,
                        textAlign: "center"
                        }}
                    >
                        <TextField className="form_item"
                                label="Ingrese el captcha:"
                                variant="outlined"
                                onChange={handleCaptchaChangeSuscribe}
                                error={errors.captcha.error}
                                value={captcha}
                                helperText={(errors.captcha.error) ? errors.captcha.message: ''}
                        />
                        <p>Captcha Value: {captchaValue}</p>
                    </Box>
                    </Grid>
                </Grid>
            </Box>
            <div className="justify_center">
                {(message.message.trim() !== '') ? (
                        <Alert variant="outlined" severity={message.classname}>
                            {message.message}
                        </Alert>
                ): (
                        <Button
                        className="button_primary"
                        onClick={handleSubmit}
                        >
                            Suscribirme
                        </Button>
                        
                    
                )}
                </div>
                <Snackbar
                            open={openSnackbar}
                            autoHideDuration={6000}
                            onClose={handleCloseSnackbar}
                            message="Algunos campos del formulario no son válidos."
                        /> 
            </div> 
        </div> 
        <ProcessingDataModal openModal={openModal} handleOpenModal={handleOpenModal} handleCloseModal={handleCloseModal}/>
        </Container>

    </div>
  );
}
