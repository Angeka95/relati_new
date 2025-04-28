import React from 'react';
import { useState, useEffect, useRef, useContext } from 'react';
import aplicacion from '../../services/aplicacion';
import { Container, Grid, Tooltip, Alert } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import Snackbar from '@mui/material/Snackbar';

import '../../App.css';

const LikeDislike = ({providenciaId}) => {

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleService = (providenciaId, type) => {
    aplicacion
        .getLikeDislike(providenciaId, type)
        .then(response => {
            console.log(type);
        })
    .catch(error => {
    console.error(error);
    });
  };

  const handleClick = (type) => {
    setSelected(type);
    setOpen(true);
    handleService(providenciaId, type);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
      <div>
        <div className="width_100 ">
            <div className="feedback_float  display_flex flex_wrap">
                <p className="feedback_text">¿Fue útil esta decisión? </p> 
                <div className="width_50  justify_end"> 
                <Tooltip title="Si">
                <a
                    href={void(0)}
                    className={`feedback_button feedback_approve ${selected === 'like' ? 'feedback_check' : ''}`}
                    onClick={(e) => {
                    e.preventDefault(); 
                    handleClick('like');
                    }}
                >     <ThumbUpOffAltIcon className="feedback_icon" />
                    </a>
                </Tooltip> 
                <Tooltip title="No">
                <a
                    href={void(0)}
                    className={`feedback_button feedback_disapprove ${selected === 'unlike' ? 'feedback_check_thumbdown' : ''}`}
                    onClick={(f) => {
                    f.preventDefault(); 
                    handleClick('unlike');
                    }}
                >     <ThumbDownOffAltIcon className="feedback_icon" />
                </a>
                </Tooltip>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center',  color: '#fff' }}
                >
                    <Alert onClose={handleClose} severity="success" className="snackbar_feedback">
                    Su respuesta ha sido registrada. ¡Gracias por contribuir!
                </Alert>
                </Snackbar>
                </div>
            </div>
        </div>
    </div>  
  );
};

export default LikeDislike;