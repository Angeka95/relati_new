
import React, { useState } from 'react';
import { Modal, Button, Box } from '@mui/material';



export default function ModalInfo({ openModal, handleCloseModal }) {
    console.log('openModal:', openModal);
    console.log('handleCloseModal:', handleCloseModal);

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
                        <Button onClick={handleCloseModal}  className="modal_close_button">
                        X
                        </Button>
                        <h3 className="text_center margin_bottom_m">Uso de parámetros de búsqueda </h3> 
                        <div className="display_flex flex_wrap justify_between  modal_double_border "> 
                            <div className="width_50"> 
                                <h3>Frase exacta</h3>
                                <h4>Búsqueda de dos o más términos </h4> 
                            </div> 
                            <div className="width_50"> 
                                <h4 className="text_center">“falsos positivos”</h4>
                                <h4 className="text_center">• Use comillas dobles:   “”</h4> 
                            </div> 
                            
                        </div> 
                        <div className="display_flex flex_wrap justify_between  modal_border "> 
                            <div className="width_50"> 
                                <h3>Todas las palabras  clave</h3>
                                <h4>Búsqueda que contenga dos o más términos</h4> 
                            </div> 
                            <div className="width_50"> 
                                <h4 className="text_center">ley <strong> *y* </strong> acto</h4>
                                <h4 className="text_center">• Use la expresión:   <strong>*y* </strong></h4> 
                            </div> 
                            
                        </div> 
                        <div className="display_flex flex_wrap justify_between  modal_border "> 
                            <div className="width_50"> 
                                <h3>Alguna de las palabras </h3>
                                <h4>Búsqueda que contenga uno u otro término</h4> 
                            </div> 
                            <div className="width_50"> 
                                <h4 className="text_center">ley <strong> *o* </strong> norma</h4>
                                <h4 className="text_center">• Use la expresión:   <strong>*o* </strong></h4> 
                            </div> 
                            
                        </div> 
                        <div className="display_flex flex_wrap justify_between  space_border "> 
                            <div className="width_50"> 
                                <h3>Frase exacta</h3>
                                <h4 >Búsqueda de dos o más términos </h4> 
                            </div> 
                            <div className="width_50"> 
                                <h4 className="text_center"><strong> *excluir*</strong> demanda</h4>
                                <h4 className="text_center">• Use la expresión: <strong>*excluir*</strong></h4> 
                            </div> 
                            
                        </div> 





                    </Box>
                </div> 
                </Modal>
        </div>
    );

}