import '../App.css';
import { Container, Box, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Carousel from '../components/carousel';



export default function Libros() {

    const libros = [
        {
            id : 1,
            pdf: 'https://relatoria.jep.gov.co/documentos/providencias/17/23/boletin_01_enero-2024.pdf', 
            fecha: "2024-01", 
            qr: 'https://relatoria.jep.gov.co/img/libros/qr-tomo-1.png', 
            title: ` Tomo I: 
            Las Sentencias Interpretativas - SENIT 1, 2 Y 3`,
            text:`Las Sentencias Interpretativas (SENIT) son providencias que buscan: </br>
                <strong> • Asegurar la unidad de la interpretación del derecho </strong> </br> 
                <strong> • Garantizar la seguridad jurídica </strong></br>
                <strong>• Garantizar la igualdad en la aplicación de la ley</strong> </br>
                </br>
                En la JEP, estas son expedidas por la Sección de Apelación, por ser ella el órgano de cierre hermeneútico de nuestra corte transicional.   
                </br></br>
                La Relatoría General, al reconocer la importancia de dichas providencias, publicó este tomo para desarrollar las temáticas de las tres primeras Senit expedidas, las cuales desarrollan temas como: </br>
                <strong> • Beneficios provisionales </strong></br> 
                <strong> • Régimen de condicionalidad</strong></br> 
                <strong> • Participación de víctimas</strong></br> 
                <strong> • Revisar y supervisar beneficios provisionales de los exmiembros </strong></br> 
                <strong> • Régimen de notificaciones, comunicaciones y recursos de los trámites ordinarios ante la JEP.</strong></br> 
                `, 
            cover: 'https://relatoria.jep.gov.co/img/libros/TOMO_1_Las-SENIT-1-2-3.jpg'
         },
    
    
    ]


   

    return (
        <div>
            <Container className="margin_bottom_xl">
            <h1 className="text_center margin_top_l">Libros</h1>
            <h5 className="text_center ">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis</h5>
            <div className="display_flex  margin_top_xl  vertical_align"> 
                <div className="width_50 padding_l"> 
                    <h2 className="text_bolder margin_top_s ">Código de la Jurisdicción Especial para la paz</h2>
                    <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis.  <br/> Lorem ipsum dolor, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque.
                    </p>
                </div> 
                <div className="width_50 justify_center" > 

                    <img className="cover_container" src="https://relatoria.jep.gov.co/img/libros/portada_codigo_JEP_c.png"/> 
                    
                </div> 
            </div> 
            <h2 className="text_bolder text_center margin_top_xxl">Colecciones Editoriales</h2> 
            <h5 className="text_center">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis na.</h5>
            </Container>
            <Box className="secondary_blue  ">
                <div className=" ">.
                    
                <h2 className="coleccion_title text_center text_bolder  margin_top_xl">"Decisiones de la JEP: Aportes a la justicia transicional y restaurativa"</h2> 
                
                <p className="text_white text_center text_uppercase text_spacing_max  ">Colección </p>
                </div>
                <div>

                <Container maxWidth="lg" disableGutters className="margin_top_xl margin_bottom_s">
                <div className="align_center coleccion_container " >
                    <div> 
                        {libros.map(libro => (
                            <div key={libro.id} className="display_flex flex_wrap width_100 margin_bottom_xl">
                                <div className="width_50 display_flex  flex_nowrap position_relative"> 
                                    <a href={libro.pdf} >
                                        <img className="cover_container" src={libro.cover}></img>
                                    </a>
                                    <div className="position_float qr_position"> 
                                        <div className="qr_size  "> 
                                        <h4 className="text_white qr_text text_bolder text_right">Escanee el QR para ver el libro en su celular </h4>
                                         <img src={libro.qr} className="qr_container margin_top_s" />
                                         </div>
                                    </div> 
                                </div>

                                <div className="width_50">
                                    <h3 className="text_bolder text_white text_center margin_bottom_l" >{libro.title}</h3>
                                    <div className="text_white padding_m" dangerouslySetInnerHTML={{__html: libro.text}}></div>
                                  
                                </div>

                            </div>
                        ))}

                    </div>


                </div>



            </Container>
                   




                </div>
            </Box>

            
                
            
        </div>
    );
}
