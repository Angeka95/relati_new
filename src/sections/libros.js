import '../App.css';
import { Container, Box, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Carousel from '../components/carousel';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';



export default function Libros() {

    const libros = [
        {
            id : 1,
            pdf: `${process.env.REACT_APP_API_SERVER_DOMAIN}/documentos/libros/TOMO_1_Las-SENIT-1-2-3.pdf`, 
            fecha: "2024-01", 
            qr: `${process.env.REACT_APP_API_SERVER_DOMAIN}/img/libros/qr-tomo-1.png`, 
            title: ` Tomo I </br>
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
            cover: `${process.env.REACT_APP_API_SERVER_DOMAIN}/img/libros/TOMO_1_Las-SENIT-1-2-3.jpg`
         },
         {
            id : 2,
            pdf: `${process.env.REACT_APP_API_SERVER_DOMAIN}/documentos/libros/Tomo_2_lineamientos_analisis_tematico.pdf`, 
            fecha: "2024-01", 
            qr: `${process.env.REACT_APP_API_SERVER_DOMAIN}/img/libros/qr-tomo-2.jpeg`, 
            title: `Tomo II </br>
            Lineamientos para el análisis temático de las decisiones de la JEP: reflexiones desde la teoría jurídica y la práctica judicial`,
            text:`Es un libro orientado a público jurídico o académico con interés en el desarrollo de las temáticas de la Jurisdicción Especial para la Paz. Se ha estructurado de la siguiente forma:</br> En un primer apartado se explica de manera detallada el fundamento teórico y conceptual de la metodología, para entender, primero, el rol del juez dentro del derecho para el establecimiento de reglas y subreglas jurídicas a través del precedente y, segundo, cómo esto fundamenta la necesidad del levantamiento de líneas jurisprudenciales.</br> Posteriormente, en el segundo apartado se explican cada uno de los pasos contemplados dentro de la metodología, junto con algunos ejemplos de su aplicabilidad.  </br> Por último, se incorporan dos anexos para la comprensión de la creación del Banco de decisiones y la elaboración del documento analítico, que hacen parte de los resultados esperados dentro del desarrollo de las líneas jurisprudenciales. 
                `, 
            cover:`${process.env.REACT_APP_API_SERVER_DOMAIN}/img/libros/portada_tomo_II.jpg`
         },
         {
            id : 3,
            pdf: `${process.env.REACT_APP_API_SERVER_DOMAIN}/documentos/libros/Tomo_III_Macrocasos_versión_final.pdf`, 
            fecha: "2025-05", 
            qr: `${process.env.REACT_APP_API_SERVER_DOMAIN}/img/libros/QR_TOMO_III.png`, 
            title: `Tomo III </br>
            Lineamientos para el análisis temático de las decisiones de la JEP: reflexiones desde la teoría jurídica y la práctica judicial`,
            text:`Este tomo se centra en los macrocasos de la JEP, en donde diferentes autores de la entidad dan una perspectiva analítica de estas investigaciones judiciales, que se pueden agrupar en cuatro ejes temáticos: (i) el análisis contextual del proceso investigativo
 de los macrocasos; (ii) la formulación de la jurisprudencia transicional en cada macrocaso; (iii) los principales avances y resultados en las investigaciones, al igual que sus retos estructurales y (iv) los conceptos esenciales en las investigaciones, como
 el de máxima responsabilidad. 

La JEP abrió 11 macrocasos con el fin de investigar quiénes fueron los máximos responsables y para satisfacer el derecho a la verdad justicia, reparación y garantías de no repetición de las víctimas. Un macrocaso agrupa una gran cantidad de casos en un patrón,
 esto es, la repetición no accidental de una conducta delictiva similar en cuanto a su finalidad, modo de comisión y características de las víctimas. Es una figura novedosa en Colombia, que ayuda a estudiar conductas delictivas relacionadas con crímenes de
 guerra y de lesa humanidad
                `, 
            cover:`${process.env.REACT_APP_API_SERVER_DOMAIN}/img/libros/portada_tomo3.jpeg`
         },
    
    
    ]

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
      if (currentIndex < libros.length - 1) {
        setCurrentIndex(currentIndex + 1); // 
      } else {
          setCurrentIndex(0);
        }
    };
    
    const handlePrevious = () => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1); // 
      }
      else {
          setCurrentIndex(libros.length - 1);
        }
    };

    useEffect(() => {
      const timer = setTimeout(() => {
        handleNext(); 
      }, 8000); 
  
      return () => clearTimeout(timer);
    }, [currentIndex]); 


   

    return (
        <div>
            <Container className="margin_bottom_xl">
            <h1 className="text_center margin_top_l">Libros</h1>
            <h5 className="text_center ">Explora nuestros libros que cuentan con la colaboración de magistradas, magistrados y profesionales de la JEP, para reflexionar y dar a conocer aspectos jurídicos relevantes a público jurídico y académico. </h5>

            <div className="display_flex  book_margin_top  vertical_align query_wrap"> 
                <div className="book_container justify_center"> 
                    <div className="book_container_text ">
                        <h2 className="text_bolder margin_top_s text_center_mobile">Código de la Jurisdicción Especial para la paz</h2>
                        <p className="text_center_mobile ">
                        Esta publicación electrónica, de acceso libre, es una guía práctica con la que se espera facilitar el estudio y/o conocimiento, por parte de un público amplio, sobre el desarrollo normativo, procesal y jurisprudencial de la Jurisdicción Especial para la Paz.
                        </p>
                        <a href="https://xperta.legis.co/intermedia/intermedia_jep.html" target="_blank"  className="margin_top_s link_primary  display_none_mobile"> Saber más de esta publicación
                        </a> 
                    </div>
                </div> 
                <div className="book_container justify_center d-flex flex-wrap " > 
                    <a href={`${process.env.REACT_APP_API_SERVER_DOMAIN}/documentos/libros/CODIGO_JURISDICCION_ESPECIAL_PAZ_1A_ED.pdf`} target="_blank" rel="noreferrer" className="justify_center">
                    <img className="cover_container" src={`${process.env.REACT_APP_API_SERVER_DOMAIN}/img/libros/portada_codigo_JEP_c.png`}/> 
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

                <Container maxWidth="lg" disableGutters className="margin_top_xl ">
                <div className="align_center coleccion_container " >
                    <div> 
                    
                            <div  className="display_flex flex_wrap width_100 book_margin_bottom query_wrap">
                                <div className="book_container display_flex justify_center_mobile flex_nowrap position_relative"> 
                                    <a href={libros[currentIndex].pdf} target="_blank" rel="noreferrer" className='justify_center_mobile'>
                                        <img className="cover_container" src={libros[currentIndex].cover}></img>
                                    </a>
                                    <div className="position_float qr_position query_none"> 
                                        <div className="qr_size  "> 
                                        <h4 className="text_white qr_text text_bolder text_right">Escanee el QR para ver el libro en su celular </h4>
                                         <img src={libros[currentIndex].qr} className="qr_container margin_top_s" />
                                         </div>
                                    </div> 
                                </div>

                                <div className="book_container">
                                    <div className="collection_container_text">
                                    <div className="text_bolder title_text text_white text_center margin_bottom_m  book_margin_mobile carrousel_title_mobile" dangerouslySetInnerHTML={{__html: libros[currentIndex].title}}></div>
                                        <div className="text_white padding_m book_margin_mobile" dangerouslySetInnerHTML={{__html: libros[currentIndex].text}}></div>
                                        
                                    </div> 
                                </div>

                            </div>


                    </div>

                    <div className="width_100 display_flex justify_center carrousel_button_container"> 
                        <a className="main_carrousel_button" onClick={handlePrevious}><KeyboardArrowLeftIcon/> </a> 
                        <a className="main_carrousel_button" onClick={handleNext}><KeyboardArrowRightIcon/> </a>
                    </div>
                    <div className="separator margin_top_xl">
                    </div>
                </div>




            </Container>
                   




                </div>
            </Box>

            
                
            
        </div>
    );
}
