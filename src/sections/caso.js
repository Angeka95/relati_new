import '../App.css';
import { Container, TextField, Button, Snackbar, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Caso() {

  const macrocasos = [
    { numeroCaso: '01',
      descripcionCaso: 'Toma de rehenes, graves privaciones de la libertad y otros crímenes concurrentes cometidos por las Farc-EP',
      enQueVa: 'La Sala de Reconocimiento (SRVR) activó el componente de reparación integral y requirió a la Unidad de Víctimas revisar la inclusión en el Registro Único de Víctimas (RUV) de 664 víctimas de secuestro de las Farc-EP representadas por IIRESOHD. En febrero de 2024 se finalizaron las versiones voluntarias de todos los comparecientes de los cuales se conocía su paradero.',
      pdfInfografia: 'https://relatoria.jep.gov.co/documentos/infografias/macrocaso001.pdf',
     },
     { numeroCaso: '02',
      descripcionCaso: 'Toma de rehenes, graves privaciones de la libertad y otros crímenes concurrentes cometidos por las Farc-EP',
      enQueVa: 'La Sala de Reconocimiento (SRVR) activó el componente de reparación integral y requirió a la Unidad de Víctimas revisar la inclusión en el Registro Único de Víctimas (RUV) de 664 víctimas de secuestro de las Farc-EP representadas por IIRESOHD. En febrero de 2024 se finalizaron las versiones voluntarias de todos los comparecientes de los cuales se conocía su paradero.',
      pdfInfografia: 'https://relatoria.jep.gov.co/documentos/infografias/macrocaso001.pdf',
     }
  ]

    const timeLine = [
        { mes: 'Abril', 
          año: '2024',
          hecho: 'Audiencia Pública de Reconocimiento', 
          actor: '' ,
          enlace: ''
        },
        { mes: 'Marzo', 
          año: '2024',
          hecho: 'Auto que Decreta Audiencia Pública de Reconocimiento', 
          actor: '' ,
          enlace: ''
        },
        { mes: 'Diciembre', 
          año: '2023',
          hecho: 'Tercer auto de determinación de hechos y conductas: ', 
          actor: 'Comando Conjunto de Occidente' ,
          enlace: 'https://relatoria.jep.gov.co/documentos/providencias/1/1/Auto_SRVR-08_19-diciembre-2023.pdf'
        },
        { mes: 'Noviembre', 
          año: '2023',
          hecho: 'Audiencia Pública de Reconocimiento', 
          actor: '' ,
          enlace: ''
        },
        { mes: 'Julio', 
          año: '2023',
          hecho: 'Audiencia Pública de Reconocimiento', 
          actor: '' ,
          enlace: ''
        },
        { mes: 'Junio', 
          año: '2023',
          hecho: 'Audiencia Pública de Reconocimiento', 
          actor: '' ,
          enlace: ''
        },
        { mes: 'Enero', 
          año: '2023',
          hecho: 'Audiencia Pública de Reconocimiento', 
          actor: 'Descripción del evento 1' ,
          enlace: ''
        },
        { mes: 'Noviembre', 
          año: '2022',
          hecho: 'Audiencia Pública de Reconocimiento', 
          actor: 'Descripción del evento 1' ,
          enlace: ''
        },
        { mes: 'Febrero', 
          año: '2022',
          hecho: 'Audiencia Pública de Reconocimiento', 
          actor: 'Descripción del evento 1' ,
          enlace: ''
        },
        
        { mes: 'Octubre', 
          año: '2021',
          hecho: 'Audiencia Pública de Reconocimiento', 
          actor: 'Descripción del evento 1' ,
          enlace: ''
        },
        { mes: 'Agosto', 
          año: '2021',
          hecho: 'Audiencia Pública de Reconocimiento', 
          actor: 'Descripción del evento 1' ,
          enlace: ''
        },

        { mes: 'Enero', 
          año: '2021',
          hecho: 'Audiencia Pública de Reconocimiento', 
          actor: 'Descripción del evento 1' ,
          enlace: ''
        },

        { mes: 'Julio', 
          año: '2018',
          hecho: 'Audiencia Pública de Reconocimiento', 
          actor: 'Descripción del evento 1' ,
          enlace: ''
        },
        
      ];

  return (
    <div>
    <Box className="secondary_blue caso_intro "> 
        <div className="width_100 justify_center"> 
        <h1 className=" text_center text_white underline_green ">Caso 01</h1>
        </div> 
        <h4 className="width_100 text_center margin_bottom_m text_white text_bold title_description">Toma de rehenes, graves privaciones de la libertad y otros crímenes concurrentes cometidos por las Farc-EP</h4>
    </Box>
    <Container> 
        <div className="wrap margin_top_l justify_center"> 
            <h2 className="text_bolder subtitulo_caso">En qué va el Caso 01</h2>
            <div className="actualizacion_caso"> 
            <p>La Sala de Reconocimiento (SRVR) activó el componente de reparación integral y requirió a la Unidad de Víctimas revisar la inclusión en el Registro Único de Víctimas (RUV) de 664 víctimas de secuestro de las Farc-EP representadas por IIRESOHD. En febrero de 2024 se finalizaron las versiones voluntarias de todos los comparecientes de los cuales se conocía su paradero. </p>
            <Button className="button_terciary shadow text_transform_none">Saber más del Caso</Button> 
            </div>
        </div> 
    </Container> 
    <Container className="margin_top_l"> 
     <div className="timeline">
     <div className="timeline_dot_initial" />
      {timeLine.map((event, index) => (
        
        <div className="timeline_item" key={index}>
          <h6 className="timeline_month">{event.mes}</h6>
          <h6 className="timeline_date text_bolder">{event.año}</h6>
          <div className="timeline_line" />
          <div className="timeline_dot" />
          <div className="timeline_content">
            {event.enlace.length > 0 ? (
            <a href={event.enlace} target="_blank" className="link_primary link_nounderline ">
            <h6>{event.hecho}</h6>
            <p className="margin_bottom_l">{event.actor}</p>
          </a>
            ) : ( 
              <>
              <h6>{event.hecho}</h6>
              <p className="margin_bottom_l">{event.actor}</p>
              </>
            )
            }


          </div>
          
        </div>
      ))}
       <div className="timeline_dot_end" />
       
    </div>
   

    </Container>


    </div>
  );
}
