
import React, { useState } from 'react';
import { Modal, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';



export default function ModalFloat({ openModal, handleCloseModal }) {


    return (
        <div>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                >
                <div > 
                    <Box className="modal_box justify-center">
                        <div className="display_flex justify_end">
                            <Button onClick={handleCloseModal}  className="modal_close_button">
                            x
                            </Button>
                        </div>
                        <h3 className="text_center margin_bottom_m">Uso de parámetros de búsqueda </h3> 
                        <div className="display_flex flex_wrap justify_between  modal_double_border "> 
                            <div className="width_50"> 
                                <p className="text_bolder text_modal">Frase exacta</p>
                                <p className="text_modal">Búsqueda de dos o más términos </p> 
                            </div> 
                            <div className="width_50"> 
                                <p className="text_center text_modal">ej: “falsos positivos”</p>
                                <p className="text_center text_modal">• Use comillas dobles:   “”</p> 
                            </div> 
                            
                        </div> 
                        <div className="display_flex flex_wrap justify_between  modal_border "> 
                            <div className="width_50"> 
                                <p className="text_bolder text_modal">Todas las palabras  clave</p>
                                <p className="text_modal" >Búsqueda que contenga dos o más términos</p> 
                            </div> 
                            <div className="width_50"> 
                                <p className="text_center text_modal">ej: ley <strong> *y* </strong> acto</p>
                                <p className="text_center text_modal">• Use la expresión:   <strong>*y* </strong></p> 
                            </div> 
                            
                        </div> 
                        <div className="display_flex flex_wrap justify_between  modal_border "> 
                            <div className="width_50"> 
                                <p className="text_bolder text_modal">Alguna de las palabras </p>
                                <p className="text_modal">Búsqueda que contenga uno u otro término</p> 
                            </div> 
                            <div className="width_50"> 
                                <p className="text_center text_modal">ej: ley <strong> *o* </strong> norma</p>
                                <p className="text_center text_modal">• Use la expresión:   <strong>*o* </strong></p> 
                            </div> 
                            
                        </div> 
                        <div className="display_flex flex_wrap justify_between  modal_border "> 
                            <div className="width_50"> 
                                <p className="text_bolder text_modal">Ninguna de las palabras</p>
                                <p className="text_modal">Eliminar de la búsqueda uno o más términos</p> 
                            </div> 
                            <div className="width_50"> 
                                <p className="text_center text_modal">ej: <strong> *excluir*</strong> demanda</p>
                                <p className="text_center text_modal">• Use la expresión: <strong>*excluir*</strong></p> 
                            </div> 
                            
                        </div> 
                        <div> 
                         <div>
                            <h4 className="text_center text_bolder margin_top_m margin_bottom_s">Realice su búsqueda más fácil usando parámetros de búsqueda automáticos en:</h4>

                           </div>
                        </div> 
                        <div className="justify_center width_100 flex_nowrap">
                        <Link to="/busqueda-avanzada">
                            <Button className="text_capitalize button_primary margin_bottom_s">Búsqueda Avanzada</Button> 
                        </Link>
                        </div>



                    </Box>
                </div> 
                </Modal>
        </div>
    );

}