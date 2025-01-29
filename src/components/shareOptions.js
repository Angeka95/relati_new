import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import boletinesService from './../services/boletines.js';
import { Box, Container, Snackbar, TextField, Button } from '@mui/material'
import IconFacebook from '../assets/images/icons/facebook.png';
import IconTwitter from '../assets/images/icons/twitter.png';
import IconMail from '../assets/images/icons/gmail.png';
import IconEnglish from '../assets/images/icons/english.png';
import ShareOutlined from '@mui/icons-material/ShareOutlined';
import '../App.css';

export default function ShareOptions({ boletines, currentBoletinId }) {

    const objErrors = {
        email: {
            message: "",
            error: false
        }
    };

    // email input

    const [showEmailInput, setShowEmailInput] = useState(false);
    const [boletinId, setBoletinId] = useState(currentBoletinId);
    const [email, setEmail] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState({ message: "", classname: "" });
    const [errors, setErrors] = useState(objErrors);
    
    // Boletin actual usando id
    const currentBoletin = boletines.find(boletin => boletin.id === currentBoletinId);

    if (!currentBoletin) {
        return <p> </p>;
    }
    
    const postSendBoletin = (objNewSuscription) => {
            let newMessage = { message: "", classname: "" };
            let newErrors = objErrors;
            boletinesService
                .sendBoletin(objNewSuscription)
                .then(response => { 
                    if(response.status_info.status === 202){
                        newMessage = { message: response.data, classname: "success" };
                        newErrors.email.message = newMessage.message;
                        newErrors.email.error = false; 
                    } else if(response.status_info.status === 500){
                        newMessage = { message: response.data, classname: "warning" };
                        newErrors.email.message = "Error interno. Intenta nuevamente.";
                        newErrors.email.error = true; 
                    } else {
                        newMessage = { message: response.data, classname: "error" };
                        newErrors.email.message = "Error interno. Intenta nuevamente.";
                        newErrors.email.error = true; 
                    }
                })
                .catch(error => { 
                        newMessage = { message: "Lo sentimos, ha ocurrido un error en nuestro servidor. Por favor, intenta nuevamente más tarde.", classname: "warning" };    
                        newErrors.email.message = "Error interno. Intenta nuevamente.";
                        newErrors.email.error = true;  
                });
                setTimeout(function(){ 
                    if(newMessage.classname === "success"){
                        setEmail('');
                    }
                    setErrors(newErrors);
                    setMessage(newMessage);
                    setOpenSnackbar(true);
                }, 3000);
                setTimeout(() => {
                    setErrors(objErrors);
                    setMessage({ message: "", classname: "" });
                    setOpenSnackbar(false);
                }, 9000);
    };
    
    const handleEmailChangeSuscribe = (event) => {
        setEmail(event.target.value);
        setErrors({ ...errors, email: { ...errors.email, error: (event.target.value.length > 0 && event.target.value.trim() !== "") ? false : true } });  // Reiniciar error al cambiar el valor
    };
    
    const validateForm = () => {
        const newErrors = objErrors;
        if(email.trim() === "") {
            newErrors.email.message = 'Por favor, ingrese un correo válido.';
            newErrors.email.error = true;  
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
          newErrors.email.message = 'El correo no es válido.';
          newErrors.email.error = true;
        }
        setErrors({...newErrors});
        return ((newErrors.email.error === false));
    };
    
    const handleSubmit = () => {
        if(validateForm()) {
                const objNewSuscription = {
                    "boletin_id": boletinId,
                    "email": DOMPurify.sanitize(email)
                };
                postSendBoletin(objNewSuscription);
                setErrors(objErrors);
        } 
    };
    
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };
    
    return (
        <div>
            <Box className="width_100 list_boletines margin_bottom_m"  >
                <div >
                    <Container className='width_100 padding_none justify_center'>
                        <div className="share_options_container bg_green margin_bottom_m margin_top_s text_white wrap justify_center">
                            {currentBoletin.versionIngles.length > 1 && (
                                <div className="icons_group2 vertical_align wrap">
                                    <div className="justify_center align_center ">
                                        <a href={currentBoletin.versionIngles} target='_blank' rel="noreferrer">
                                            <img src={IconEnglish} className=" icon_bigger icon_round icon_english vertical_align" alt="English"/>
                                        </a>
                                    </div>
                                    <div className="width_100 text_center ">English </div>
                                </div>
                            )}
                            {currentBoletin.versionIngles && (
                                <div className="icon_border">
                                </div>
                            )}
                            <div className="icons_group1 vertical_align wrap">
                                <div className="justify_around icons_group_position width_100">
                                    {currentBoletin.twitter && (
                                        <a href={currentBoletin.twitter} target='_blank'rel="noreferrer">
                                            <img src={IconTwitter} className="icon_round icon_bigger" alt="Twitter">
                                            </img>
                                        </a>
                                    )}
                                    {currentBoletin.facebook && (
                                        <a href={currentBoletin.facebook} target='_blank' rel="noreferrer">
                                            <img src={IconFacebook} className="icon_round icon_bigger" alt="Facebook">
                                            </img>
                                        </a>
                                    )}
                                    {currentBoletin.mail && (
                                        <img onClick={() => setShowEmailInput(!showEmailInput)} src={IconMail} className="icon_round icon_bigger" alt="E-mail">
                                        </img>
                                    )}
                                    {showEmailInput && (
                                        <>
                                        <form id={`boletin_form_${boletinId}`} className="input_float">
                                            <TextField
                                                label="Ingrese un correo"
                                                className="input_float_style"
                                                type="email"
                                                onChange={handleEmailChangeSuscribe}
                                                error={errors.email.error}
                                                value={email}
                                                helperText={(errors.email.error) ? errors.email.message : ''}
                                                margin="normal"
                                            />
                                            <Button className=" button_primary button_icon" onClick={handleSubmit}><ShareOutlined /></Button>
                                        </form>
                                        <Snackbar
                                            open={openSnackbar}
                                            onClose={handleCloseSnackbar}
                                            message={message.message}
                                        />                        
                                        </>
                                    )}
                                </div>
                                {(currentBoletin.facebook || currentBoletin.mail || currentBoletin.twitter) && (
                                    <div className="width_100 text_center icon_space2">Compartir </div>
                                )}
                            </div>
                        </div>
                    </Container>
                </div>
            </Box>
        </div>
    );
}