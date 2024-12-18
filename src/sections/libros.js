import '../App.css';
import { Container, Box, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Carousel from '../components/carousel';



export default function Libros() {

    const libros = [
        {
            id : 1,
            pdf: 'https://relatoria.jep.gov.co/documentos/libros/TOMO_1_Las-SENIT-1-2-3.pdf', 
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
            <h5 className="text_center ">Explora nuestros libros que cuentan con la colaboración de magistradas, magistrados y profesionales de la JEP, para reflexionar y dar a conocer aspectos jurídicos relevantes a público jurídico y académico. </h5>

            <div className="display_flex  book_margin_top  vertical_align query_wrap"> 
                <div className="book_container "> 
                    <h2 className="text_bolder margin_top_s text_center_mobile">Código de la Jurisdicción Especial para la paz</h2>
                    <p className="text_center_mobile ">
                    Esta publicación electrónica, de acceso libre, es una guía práctica con la que se espera facilitar el estudio y/o conocimiento, por parte de un público amplio, sobre el desarrollo normativo, procesal y jurisprudencial de la Jurisdicción Especial para la Paz.
                    </p>
                </div> 
                <div className="book_container justify_center" > 
                    <a href="https://xperta.legis.co/intermedia/intermedia_jep.html" target="_blank" rel="noreferrer" className="justify_center">
                    <img className="cover_container" src="https://relatoria.jep.gov.co/img/libros/portada_codigo_JEP_c.png"/> 

                    </a>
                    
                </div> 
            </div> 
            
            </Container>
            <Box className="secondary_blue  ">
            
                <div className=" ">.
                <h2 className="text_bolder text_center book_margin_top text_white ">Colecciones Editoriales</h2> 
                <h2 className="coleccion_title text_center text_bolder  margin_top_l">"Decisiones de la JEP: Aportes a la justicia transicional y restaurativa"</h2> 
                
                <p className="text_white text_center text_uppercase text_spacing_max  ">Colección </p>
                </div>
                <div>

                <Container maxWidth="lg" disableGutters className="margin_top_xl margin_bottom_s">
                <div className="align_center coleccion_container " >
                    <div> 
                        {libros.map(libro => (
                            <div key={libro.id} className="display_flex flex_wrap width_100 book_margin_bottom query_wrap">
                                <div className="book_container display_flex justify_center_mobile flex_nowrap position_relative"> 
                                    <a href={libro.pdf} target="_blank" rel="noreferrer" className='justify_center_mobile'>
                                        <img className="cover_container" src={libro.cover}></img>
                                    </a>
                                    <div className="position_float qr_position query_none"> 
                                        <div className="qr_size  "> 
                                        <h4 className="text_white qr_text text_bolder text_right">Escanee el QR para ver el libro en su celular </h4>
                                         <img src={libro.qr} className="qr_container margin_top_s" />
                                         </div>
                                    </div> 
                                </div>

                                <div className="book_container">
                                    <h3 className="text_bolder text_white text_center margin_bottom_l  book_margin_mobile " >{libro.title}</h3>
                                    <div className="text_white padding_m text_center_mobile" dangerouslySetInnerHTML={{__html: libro.text}}></div>
                                  
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
