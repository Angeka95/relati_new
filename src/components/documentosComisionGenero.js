import React from 'react';
import { useState, useEffect, useRef, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Grid, Tooltip, Alert } from '@mui/material';
import './../App.css';

const DocumentosComisionGenero = ({ docsSentencias = [] }) => {
  
      const documentos = [
      {
        "nombre": "Concepto comisión de género (04 de Mayo de 2022)",
        "href": `${process.env.REACT_APP_API_SERVER_DOMAIN}/documentos/providencias/14/13/Concepto_comisi%C3%B3n-g%C3%A9nero_04-mayo-2022.pdf`,
        "fecha": "04/05/2022"
      },
      {
        "nombre": "Concepto comisión de género (28 de Febrero de 2022)",
        "href": `${process.env.REACT_APP_API_SERVER_DOMAIN}/documentos/providencias/14/13/Concepto_comisi%C3%B3n-g%C3%A9nero_28-febrero-2022`,
        "fecha": "28/02/2022"
      },
      {
        "nombre": "Concepto comisión de género (24 de enero de 2022)",
        "href": `${process.env.REACT_APP_API_SERVER_DOMAIN}/documentos/providencias/14/13/Concepto_comisi%C3%B3n-g%C3%A9nero_24-enero-2022`,
        "fecha": "24/01/2022"
      },
      {
        "nombre": "Concepto comisión de género (02 de Diciembre de 2021)",
        "href": `${process.env.REACT_APP_API_SERVER_DOMAIN}/documentos/providencias/14/13/Concepto_comisi%C3%B3n-g%C3%A9nero_02-diciembre-2021`,
        "fecha": "02/12/2021"
      },
      {
        "nombre": "Concepto comisión de género (22 de Septiembre de 2021)",
        "href": `${process.env.REACT_APP_API_SERVER_DOMAIN}/documentos/providencias/14/13/Concepto_comisi%C3%B3n-g%C3%A9nero_22-septiembre-2021`,
        fecha: "22/09/2021"
      },
      {
        "nombre": "Concepto comisión de género (14 de Julio de 2021)",
        "href": `${process.env.REACT_APP_API_SERVER_DOMAIN}/documentos/providencias/14/13/Concepto_comisi%C3%B3n-g%C3%A9nero_14-julio-2021`,
        "fecha": "14/07/2021"
      },
      {
        "nombre": "Concepto comisión de género (22 de Diciembre de 2020)",
        "href": `${process.env.REACT_APP_API_SERVER_DOMAIN}/documentos/providencias/14/13/Concepto_comisi%C3%B3n-g%C3%A9nero_22-diciembre-2020`,
        "fecha": "22/12/2020"
      },
      {
        "nombre": "Concepto comisión de género (03 de Septiembre de 2020)",
        "href": `${process.env.REACT_APP_API_SERVER_DOMAIN}/documentos/providencias/14/13/Concepto_comisi%C3%B3n-g%C3%A9nero_03-septiembre-2020`,
        "fecha": "03/09/2020"
      },
      {
        "nombre": "Concepto comisión de género (19 de Mayo de 2020)",
        "href": `${process.env.REACT_APP_API_SERVER_DOMAIN}/documentos/providencias/14/13/Concepto_comisi%C3%B3n-g%C3%A9nero_19-mayo-2020`,
        "fecha": "19/05/2020"
      },
      {
        "nombre": "Concepto comisión de género (02 de Diciembre de 2019)",
        "href": `${process.env.REACT_APP_API_SERVER_DOMAIN}/documentos/providencias/14/13/Concepto_comisi%C3%B3n-g%C3%A9nero_02-diciembre-2019`,
        "fecha": "02/12/2019"
      },
      {
        "nombre": "Concepto Comisión Género (25 De Junio De 2018)",
        "href": "https://relatoria.jep.gov.co/documentos/providencias/14/13/Concepto_comisión-genero_25-junio-2018.pdf",
        "fecha": "25/06/2018"
      },
      {
        "nombre": "Concepto Comisión Género (06 De Marzo De 2019)",
        "href": "https://relatoria.jep.gov.co/documentos/providencias/14/13/Concepto_comisión-género_06-marzo-2019.pdf",
        "fecha": "06/03/2019"
      },
      {
        "nombre": "Concepto Comisión género (29 De Noviembre De 2022)",
        "href": "https://relatoria.jep.gov.co/documentos/providencias/14/13/Concepto_comisión-género_29-noviembre-2022.pdf",
        "fecha": "29/11/2022"
      },
      {
        "nombre": "Concepto Comisión Género (26 De Abril De 2023)",
        "href": "https://relatoria.jep.gov.co/documentos/providencias/14/13/Concepto_comisión-género_26-abril-2023.pdf",
        "fecha": "26/04/2023"
      },
      {
        "nombre": "Concepto Comisión Género (20 De Noviembre De 2024)",
        "href": "https://relatoria.jep.gov.co/documentos/providencias/14/13/Concepto_comisión-género_20-noviembre-2024.pdf",
        "fecha": "20/11/2024"
      },
      {
        "nombre": "Concepto Comisión Género (28 De Febrero De 2025)",
        "href": "https://relatoria.jep.gov.co/documentos/providencias/14/13/Concepto_comisión-género_28-febrero-2025.pdf",
        "fecha": "28/02/2025"
      }
    ];

    function sortDocumentosByFechaDesc(arr) {
      return arr.slice().sort((a, b) => {
        // Convert "DD/MM/YYYY" to "YYYY-MM-DD" for comparison
        const parseFecha = (fecha) => {
          const [day, month, year] = fecha.split('/');
          return new Date(`${year}-${month}-${day}`);
        };
        return parseFecha(b.fecha) - parseFecha(a.fecha);
      });
    }

  const documentosOrdenados = sortDocumentosByFechaDesc(documentos);

  return (
        <div className="margin_top_s"> 
            {/*<p>• <a target="_blank" rel="noreferrer" className="link_secondary text_capitalize " href={`${process.env.REACT_APP_API_SERVER_DOMAIN}/documentos/providencias/14/13/Concepto_comisi%C3%B3n-g%C3%A9nero_04-mayo-2022.pdf`}>  Concepto comisión de género (04 de Mayo de 2022) </a></p>*/}
            {/* Documentos mapeados */}
            {documentosOrdenados.map((doc, idx) => (
              <p key={doc.href}>
                • <a
                  target="_blank"
                  rel="noreferrer"
                  className="link_secondary text_capitalize"
                  href={doc.href}
                >
                  {doc.nombre}
                </a>
              </p>
            ))}
        </div>
  );
};

export default DocumentosComisionGenero;