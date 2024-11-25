

import { AppBar, Tabs, Tab, Box, Container } from '@mui/material';
import React, { useState, useEffect, useContext } from 'react';
import IconFacebook from '../assets/images/icons/facebook.png';
import IconTwitter from '../assets/images/icons/twitter.png';
import IconMail from '../assets/images/icons/gmail.png';
import IconEnglish from '../assets/images/icons/english.png';
import ShareOptions from '../components/shareOptions.js';



export default function CustomTab({ boletines}) {
    const [value, setValue] = React.useState(0);
    
    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };

    // Años del boletin

    const añoBoletin = [...new Set(boletines.map(boletin => new Date(boletin.fecha).getUTCFullYear()))];

    // Estado para el tab activo

    const handleChangeAño = (event, newValue) => {
        setValue(newValue);
    };

    // if (!Array.isArray(boletines)) {
    //     return <p className="justify_center text_bolder">No hay boletines disponibles.</p>;
    //   }


    return (
        <div>
            <Box className="width_100 list_boletines" >
         
                <>
                
                <Container>
                
                    <AppBar position="static" className="noshadow ">
                        <Tabs value={value} onChange={handleChangeTab} className='light_white ' classes={{ indicator: 'custom_indicator' }}>
                            {añoBoletin.map((año, index) => (
                                <Tab key={año} label={año} className={`tab ${value === año ? 'tab_active' : ''}`} />

                            ))}
                        </Tabs>
                        <div className="separator_tab"> </div>
                    </AppBar>
                    <Box p={3}>
                        <div >
                       
                            
                            <Container className='width_100 margin_bottom_l'>
                                <div className="wrap justify_center item_boletin_container">
                                    <h2 className="width_100 text_center margin_m text_bolder">Boletines {añoBoletin[value]}</h2>
                                    {boletines
                                        .filter(boletin => new Date(boletin.fecha).getUTCFullYear() === añoBoletin[value]) // Filtrar por año del tab activo
                                        .map(boletin => (

                                            <div key={boletin.id}>
                                               

                                                <div>
                                                    <a href={boletin.pdf} target='_blank' rel="noreferrer">
                                                        {(boletin.imagenPortada ) ?
                                                        <img className="item_boletin" src={boletin.imagenPortada} alt={boletin.nombreWithExt}>
                                                        </img>
                                                        : 
                                                        <div className="item_boletin" style={{backgroundColor: "#808080"}}>
                                                            <p style={{color: "#ffffff"}}>{boletin.nombreWithExt}</p>
                                                        </div>
                                                        }
                                                    </a>
                                                    <ShareOptions boletines={boletines} currentBoletinId={boletin.id} > </ShareOptions>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </Container>
                            
                        </div>
                    </Box>

                </Container>
                </>

            </Box>
        </div>
    );

}