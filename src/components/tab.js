

import { AppBar, Tabs, Tab, Box, Container, Button } from '@mui/material';
import React, { useState, useEffect, useContext } from 'react';
import IconFacebook from '../assets/images/icons/facebook.png';
import IconTwitter from '../assets/images/icons/twitter.png';
import IconMail from '../assets/images/icons/gmail.png';
import IconEnglish from '../assets/images/icons/english.png';
import ShareOptions from '../components/shareOptions.js';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';



export default function CustomTab({ boletines, title}) {
    

    // Anios del boletin
  
    const anioBoletin = [...new Set(boletines.map(boletin => { return new Date(boletin.fecha).getUTCFullYear(); }))];
  
    anioBoletin.sort((a, b) => b - a); // Ordenar de mayor a menor
    
    const [value, setValue] = React.useState(0);
    
    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };
    
    // Estado para el tab activo

    const handleChangeAnio = (event, newValue) => {
        setValue(newValue);
    };

    // if (!Array.isArray(boletines)) {
    //     return <p className="justify_center text_bolder">No hay boletines disponibles.</p>;
    //   }

    const [isMoreInfoOpen, setIsMoreInfoOpen] = useState([]);

    const toggleDetailsBoletin = (boletin_id) => {
        if(isMoreInfoOpen.includes(boletin_id)) {
            setIsMoreInfoOpen(isMoreInfoOpen.filter(id => id !== boletin_id));
        }
        else {
            setIsMoreInfoOpen([...isMoreInfoOpen, boletin_id]);
        }
    }

        // mostrar y ocular boletines
        const [showAll, setShowAll] = useState(false);

        const boletinesFiltrados = boletines.filter(
            boletin => new Date(boletin.fecha).getUTCFullYear() === anioBoletin[value]
          );

            
         const boletinesToShow = showAll ? boletinesFiltrados : boletinesFiltrados.slice(0, 3);

        const handleToggleShowAll = () => {
            setShowAll(prevState => !prevState);
        };



    return (
        <div>
            <Box className="width_100 list_boletines" >
         
                <>
                
                <Container>
                
                    <AppBar position="static" className="noshadow ">
                        <Tabs value={value} onChange={handleChangeTab} className='light_white ' classes={{ indicator: 'custom_indicator' }}>
                            {anioBoletin.map((anio, index) => (
                                <Tab key={anio} label={anio} className={`tab ${value === index ? 'tab_active' : ''}`} />
                            ))}
                        </Tabs>
                        <div className="separator_tab"> </div>
                    </AppBar>
                    <Box p={3}>
                        <div >
                       
                            
                            <Container className='width_100 margin_bottom_l'>
                                <div className="wrap justify_center item_boletin_container">
                                    <h2 className="width_100 text_center margin_m text_bolder">{title} {anioBoletin[value]}</h2>
                                    {boletinesToShow.map(boletin => (

                                            <div key={boletin.id}>
                                               

                                                <div className="item_boletin_size">
                                                    <a href={boletin.pdf} target='_blank' rel="noreferrer">
                                                        {(boletin.imagenPortada ) ?
                                                        <img className="item_boletin" src={boletin.imagenPortada} alt={boletin.nombreWithExt}>
                                                        </img>
                                                        : 
                                                        <div className="item_boletin light_grey">
                                                            <p className="text_black padding_s">{boletin.nombreWithExt}</p>
                                                        </div>
                                                        }
                                                    </a>

                                                 {/* Informacion tecnica boletines */}

                                                    <a className="justify_center cursor_pointer"  onClick={() => toggleDetailsBoletin(boletin.id)}>
                                                    {isMoreInfoOpen.includes(boletin.id) ?   
                                                    <div className="link_secondary">
                                                        <ExpandLessOutlinedIcon />
                                                        <span>Ocultar información</span>
                                                     </div> 
                                                     :  
                                                     <div className="link_secondary">
                                                     <ExpandMoreOutlinedIcon />
                                                     <span>Saber más del boletín</span>
                                                  </div> 
                                              
                                                
                                                }

                                                    </a>
                                                    {isMoreInfoOpen.includes(boletin.id) && (
                                                        <div className="margin_top_s">
                                                        <p><strong>Temas:</strong> {boletin.tema || 'No disponible'}</p>
                                                        <p><strong>Palabras clave:</strong> {boletin.palabrasClave || 'No disponible'}</p>
                                                        <p><strong>Rango Temporal:</strong> {boletin.rango || 'No disponible'}</p>
                                                        </div>
                                                    )}
                                                    <ShareOptions boletines={boletines} currentBoletinId={boletin.id} > </ShareOptions>
                                                </div>
                                            </div>
                                        
                                        ))}

                                            <div  className="width_100 justify_center"> 
                                                    {!showAll && boletines.length > 3 && (
                                                    <button onClick={handleToggleShowAll} className="button_primary border_none">Ver más {title} </button>
                                                    )}
                                            
                                            </div> 

                                                    <div className="width_100 justify_center"> 
                                                        {showAll && boletines.length > 3 && (
                                                        <button onClick={handleToggleShowAll} className="button_primary border_none">Ocultar {title}</button>
                                                        )}

                                                    </div>


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